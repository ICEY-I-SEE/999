<template>
    <div class="Register global-login-wrap" id="regist-wrap">
        <div class="global-login-inner">
            <div class="register-container global-login-cont">
                <div class="register-title-wrap">
                    <img class="r-title-icon0" src="/static/images/login/logo_icon.png"/>
                    <img class="r-title-icon1" src="/static/images/login/regist_msg.png" />
                </div>
                <!-- <div class="global-form-group" v-if="isUid">
                    <i class="icon tel-icon"></i>
                    <input type="number" placeholder="输入邀请码" v-model="uid_code">
                </div> -->
                <div class="global-form-group">
                    <i class="icon tel-icon"></i>
                    <input type="number" placeholder="输入手机号" v-model="phone">
                </div>
                <div class="global-form-group">
                    <i class="icon verify-icon"></i>
                    <input class="verify-inp" type="text" placeholder="输入验证码" v-model="verifyCode" autocomplete="off" maxlength="6">
                    <button class="verifyCode global-option-style" :disabled="disabled" @click="getVerifyCode()">{{verifyText}}</button>
                </div>
                <div class="global-form-group">
                    <i class="icon password-icon"></i>
                    <input type="password" placeholder="输入密码" v-model="password">
                </div>
                <div class="global-form-group">
                    <i class="icon password-icon"></i>
                    <input type="password" placeholder="确认密码" v-model="password2">
                </div>
                <div class="agreen-wrap">
                    <van-checkbox v-model="isAgrren" @click="UpdAgrren" checked-color="#a281ed">我已阅读并接受</van-checkbox>
                    <router-link tag="span" to="/UserTreal" class="-text-active">《用户协议》</router-link>与
                    <router-link tag="span" to="/PrivacyPolicy" class="-text-active">《隐私政策》</router-link>
                </div>
                <div class="global-option-btn global-option-style"  @click="registerClick()">注册</div>
            </div>
            <div class="global-cont-2">
                <router-link to="/Login" class="global-regist-btn1">登录</router-link>
                <router-link to="/EditPassword" class="global-regist-btn1">忘记密码</router-link>
            </div>
        </div>
    </div>
</template>

<script>
import md5 from 'js-md5';
import '../../../static/js/public.js';
export default {
    name:'Register',
    data(){
        return{
            phone:'',//手机号
            verifyCode:'',//验证码
            disabled:false,
            verifyText:'获取验证码',
            password:'',//密码
            password2:'',//重复密码,
            uid:'',
            isUid:false,
            isClick:false,
            isAgrren:false,
            flag:false,
            uid_code:''
        }
    },
    created(){
        this.uid=this.$route.query.uid;
        this.uid_code = this.$route.query.uid_code;
        this.$router.push('/Login?uid='+this.uid+'&uid_code='+this.uid_code)
        // console.log('adasdsa')
        // if(!this.$route.query.uid){
        //     this.isUid = true;
        // }

    },
    methods:{
          /**
         * 获取验证码
         */
        UpdAgrren(){
            this.isAgrren = !this.isAgrren
        },
        lookAgreen(){

        },
      
        getVerifyCode(){
            if(this.validatePhone()){
                if(this.isClick){
                    return;
                }
                this.isClick =true
                // 发送网络请求
                var $phone = this.phone.replace(/\s+/g, "");
                var $temp = 'sms_reg';
                var $md = md5($phone+$temp)
                this.$axios.post('user/sendVerifyCode',{
                    phone:this.phone,
                    temp:$temp,
                    auth:$md,
                    type:1
                })
                .then( (res)=>{
                    // this.isClick = false;
                    var status = res.data.status
                    if(status === 200){
                        // 开启倒计时
                        // this.countDown();
                        this.$toast(res.data.data)
                    }else{
                        this.$toast(res.data.msg)
                    }
                    this.isClick = false;
                })
                .catch((error) => {
                    this.isClick = false;
                    alert('请求错误:'+ error)
                })

            }
        },
       
        /**
         * 校验手机号
         */
        validatePhone(){
            var phone =this.phone.replace(/\s+/g, "")
            if(!phone){
                this.$toast('手机号码不能为空')
                return false;
            }else if(!/^1[3456789]\d{9}$/.test(phone)){
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
        download(){
            let ua = navigator.userAgent.toLowerCase();
            let isAndroid = ua.indexOf('Android') > -1 || ua.indexOf('Adr') > -1; //android终端
            let isiOS = !!ua.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);//ios终端
            if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
                window.location = 'https://fir.im/79gj'
                
            } else if (/(Android)/i.test(navigator.userAgent)) {
                window.location = 'https://fir.im/mj4p'
            }

            function isWeixinBrowser() {
                return (/micromessenger/.test(ua)) ? true : false;
            }
        },
        /**
         * 校验注册
         */
        registerClick(){
            var that =this
            var phone =this.phone.replace(/\s+/g, "")
            var pawd =this.password.replace(/\s+/g, "")
            var pawd2 =this.password2.replace(/\s+/g, "")
            var uid ="",uid_code;
            if(localStorage.getItem('details_url')){
                var reg = new RegExp("(^|&?)u_code=([^&]*)(&|$)");
                var r = localStorage.getItem('details_url').substr(1).match(reg);
                uid_code = r[2];
            }else{
                uid_code = this.uid_code;
            }

            if('undefined' !=typeof(this.uid)){
                uid =new Number(this.uid)
            }
            if(phone == ''){
                this.$toast('手机号码不能为空')
                return false
            }else if(!/^1[3456789]\d{9}$/.test(phone)){
                this.$toast('请填写正确的手机号码')
                return false
            }else if(this.verifyCode == ''){
                this.$toast('验证码不能为空')
                return false
            }else if(pawd == ''){
                this.$toast('密码不能为空')
                return false
            }else if(!/^[A-Za-z0-9_-]{6,18}$/.test(pawd)){
                this.$toast('密码长度为6-18位')
                return false
            }else if(pawd2==""){
                this.$toast('确认密码不能为空')
                return false
            }else if(pawd != pawd2){
                this.$toast('两次密码不一致')
                return false
            }else{

                if(!this.isAgrren){
                    return this.$toast('注册需要勾选用户协议')
                }
                if(this.flag){
                    return;
                }
                this.flag = true;
                // 请求数据
                this.$axios.post('user/register',{
                    phone:phone,
                    verify_code:this.verifyCode,
                    user_password:pawd,
                    confirm_password:pawd2,
                    uid:uid,
                    uid_code:uid_code
                })
                .then( (res)=>{
                    var status = res.data.status
                    if(status === 200){

                        this.$toast('注册成功') 
                        setTimeout(() => {
                           this.$router.push("/Login");
                        }, 1000);
                        
                    }else{
                        this.flag = false;
                        this.$toast(res.data.msg) 
                    }
                })
                .catch((error) => {
                    this.flag = false;
                    this.$toast('请求错误')
                })
            }

        }

    }
}
</script>

<style lang="stylus" scoped>
    .Register
        width 100%
        min-height 100vh
        background url('/static/images/login/reg.png') no-repeat
        background-size 100% 100%
        overflow auto
        .global-login-inner
            padding:200px 22px 50px;
        .register-container
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
                    box-sizing border-box 
                    border none
            .agreen-wrap
                margin-bottom 30px
                line-height 40px
                color #666
                font-size 25px
            .agreen-wrap /deep/ .van-checkbox__icon
                height auto
                border-color #b397ef;
                margin-top 4px
            .agreen-wrap /deep/ .van-checkbox__label
                margin-left 10px
                color #666
                font-size 25px
            .agreen-wrap /deep/ .van-checkbox__icon .van-icon
                width 36px
                height 36px
                line-height 38px
                font-size 28px
            .agreen-wrap
                // font-size 30px
                display flex
                align-items center
                    
                    
</style>
