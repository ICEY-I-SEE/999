<template>
    <div class="EditPassword global-login-wrap" id="edit-wrap">
        <div class="global-login-inner">
            <div class="edit-container global-login-cont">
                <div class="register-title-wrap">
                    <img class="r-title-icon0" src="/static/images/login/logo_icon.png"/>
                    <img class="r-title-icon2" src="/static/images/login/edit_pawd_msg.png" />
                </div>
                <div class="global-form-group">
                    <i class="icon tel-icon"></i>
                    <input type="number" placeholder="输入手机号" v-model="phone">
                </div>
                <div class="global-form-group">
                    <i class="icon verify-icon"></i>
                    <input type="text" class="verify-inp" placeholder="输入验证码" v-model="verifyCode" maxlength="6">
                    <button class="verifyCode global-option-style" :disabled="disabled" @click="getVerifyCode()">{{verifyText}}</button>
                </div>
                <div class="global-form-group">
                    <i class="icon password-icon"></i>
                    <input type="password" placeholder="输入密码" v-model="password" >
                </div>
                <div class="global-form-group">
                    <i class="icon password-icon"></i>
                    <input type="password" placeholder="再次输入密码" v-model="password2" >
                </div>
                <div class="global-option-btn global-option-style" @click="confirmClick()">确定</div>
            </div>
            <router-link to="/Login" class="global-cont-2">返回登录</router-link>
        </div>
       
    </div>
</template>

<script>
/* md5 */
import md5 from 'js-md5';
import { Dialog } from 'vant';
export default {
    name:'EditPassword',
    data(){
        return{
            phone:'',//手机号
            verifyCode:'',//验证码
            disabled:false,
            verifyText:'获取验证码',
            password:'',//密码
            password2:'',//重复密码
            isClick:false,
            flag:false
        }
    },
    created(){
        const height = document.documentElement.clientHeight
        // 在页面整体加载完毕时
        window.onload = function () {
             document.getElementById('edit-wrap').style.height = `${height}px`;
        }
    },
    methods:{
        goBack(){
            this.$router.go(-1)
        },
        /**
         * 获取验证码
         */
        getVerifyCode(){
            if(this.validatePhone()){
                if(this.isClick){
                    return;
                }
                this.isClick=true
                // 发送网络请求
                var $phone = this.phone.replace(/\s+/g, "");
                var $temp = 'sms_forget';
                var $md = md5($phone+$temp)
                this.$axios.post('user/sendVerifyCode',{
                    phone:this.phone,
                    temp:$temp,
                    auth:$md,
                    type:1
                })
                .then( (res)=>{
                    var status = res.data.status
                    if(status === 200){
                        // 开启倒计时
                        this.countDown();
                        this.$toast(res.data.data)
                    }
                    else if(res.data.status == 999){
                        this.$toast(res.data.msg)
                        this.$store.commit('del_token'); //清除token
                        setTimeout(()=>{
                            this.$router.push('/Login')
                        },1000)
                    }
                    else{
                        this.$toast(res.data.msg)
                    }
                    this.isClick =false
                })
                .catch((error) => {
                    this.$toast('请求错误')
                    this.isClick =false
                })
            } 
        },
       
        /**
         * 校验手机号
         */
        validatePhone(){
            var phone=this.phone.replace(/\s+/g, "")
            if(!phone){
                this.$toast('手机号码不能为空')
                return false;
            }else if(!/^1[23456789]\d{9}$/.test(phone)){
                this.$toast('请填写正确的手机号码')
                return false;
            }else{
                return true;
            }
        },

        /**
         * 倒计时效果
         */
        countDown(){
            var count = 60;
            var timer = setInterval( () => {
                if(count == 0){
                    clearInterval(timer);
                    this.verifyText = "重新获取";
                    this.disabled = false;
                }
                else if(count < 10){
                    count = "0" + count;
                    this.verifyText =  count + "秒后重试";
                    this.disabled = true;
                    count -- ;
                }
                else{
                    //倒计时
                    this.verifyText = count + "秒后重试";
                    this.disabled = true;
                    count -- ;
                }
            },1000);
        },

        /**
         * 修改密码
         */
        confirmClick(){
            var that = this;
            var phone=that.phone.replace(/\s+/g, "")
            var pawd =that.password.replace(/\s+/g, "")
            var pawd2 =that.password2.replace(/\s+/g, "")
            if(phone == ''){
                that.$toast('手机号码不能为空')
                return false
            }else if(!/^1[3456789]\d{9}$/.test(phone)){
                that.$toast('请填写正确的手机号码')
                return false
            }else if(that.verifyCode == ''){
                that.$toast('验证码不能为空')
                return false
            }else if(pawd == ''){
                that.$toast('密码不能为空')
                return false
            }else if(!/^[A-Za-z0-9_-]{6,18}$/.test(pawd)){
                that.$toast('密码长度为6-18位')
                return false
            }else if(pawd != pawd2){
                that.$toast('两次密码不一致')
                return false
            }else{

                if(this.flag){
                    return;
                }
                this.flag = true;
                // 请求修改密码接口
                var url = "/user/resetPassword"
                var params = new URLSearchParams();
                    params.append('phone', phone);       // 要传给后台的参数值
                    params.append('user_password', pawd);
                    params.append('confirm_password', pawd2);
                    params.append('verify_code', this.verifyCode);  
                this.$axios({
                    method: 'post',
                    url:url,
                    data: params
                })
                .then((res)=>{
                    if(res.data.status === 200){
                        that.$toast('修改成功')                
                        setTimeout(() => {
                            that.$router.push("/Login");
                        }, 1000);
                    }else{
                        Dialog.alert({
                            message: res.data.msg
                        })
                    }
                    this.flag = false;
                }) 
                .catch((error) => {
                    this.$toast('请求错误')
                    this.flag = false;
                }) 
            }
        },

    }

}
</script>

<style lang="stylus" scoped>
    .EditPassword
        width 100%
        min-height 100vh
        background url('/static/images/login/reg.png') no-repeat
        background-size 100% 100%
        overflow:auto
        .iconfont
            position absolute
            top 10px
            left 0
            padding 3px
            height 80px
        .global-login-inner
            padding:200px 22px 50px;
        .global-form-group
            input 
                height 50px
                flex 1
                font-size 25px
                margin-left: 100px;
            .verify-inp
                width 160px
            .verifyCode
                height 90px
                line-height 90px
                font-size 28px
                padding 0 24px
                display inline-block
                border:none

</style>
