<template>
    <div class="SetPassword">
        <TopHeader custom-title="手机号设置">
			<i slot="backBtn" class="iconfont icon-fanhui"></i>
		</TopHeader>
        
        
        <!-- <h1>设置密码</h1> -->
        <div class="edit-container">
            <div class="global-form-group">
                <i class="icon tel-icon"></i>
                <input type="number" :placeholder="mobile_type?'输入新手机号':'输入手机号'" v-model="phone">
            </div>
            <div class="global-form-group" v-if="!mobile_type">
                <i class="icon verify-icon"></i>
                <input type="text" class="verify-inp" maxlength="6" placeholder="输入验证码" v-model="verifyCode">
                <button class="verifyCode global-option-style" :disabled="disabled" @click="getVerifyCode()">{{verifyText}}</button>
            </div>
            <div class="btn ts-style" @click="confirmClick()"><span class="ts-btn-msg">确定</span></div>
        </div>
    </div>
</template>

<script>
import TopHeader from "@/pages/common/header/TopHeader";
import md5 from 'js-md5';
export default {
    name:'SetPassword',
 	components: {
		TopHeader
	},
    data(){
        return{
            phone:'',//手机号
            verifyCode:'',//验证码
            disabled:false,
            verifyText:'获取验证码',
            mobile_type:this.$route.query.mobile_type
        }
    },
    methods:{
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
                            this.$router.push('/Home')
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
            if(this.mobile_type){
                if(phone == ''){
                    that.$toast('手机号码不能为空')
                    return false
                }else if(!/^1[3456789]\d{9}$/.test(phone)){
                    that.$toast('请填写正确的手机号码')
                    return false
                }
            }else{
                if(phone == ''){
                    that.$toast('手机号码不能为空')
                    return false
                }else if(!/^1[3456789]\d{9}$/.test(phone)){
                    that.$toast('请填写正确的手机号码')
                    return false
                }else if(that.verifyCode == ''){
                    that.$toast('验证码不能为空')
                    return false
                }
            }
            if(this.flag){
                return;
            }
            this.flag = true;
            // 请求修改密码接口
            var url = this.mobile_type?"/user/verifyphone":"/user/resetphone"
            var params = new URLSearchParams();
                params.append('token', this.$store.getters.optuser.Authorization);       // 要传给后台的参数值
                params.append('phone', phone);       
                params.append('verify_code', this.verifyCode);  
            this.$axios({
                method: 'post',
                url:url,
                data: params
            })
            .then((res)=>{
                if(res.data.status === 200){
                    that.$toast(res.data.data)                
                    setTimeout(() => {
                        if(this.mobile_type){
                            this.mobile_type = false;
                        }else{
                            this.$router.back();
                        }
                    }, 1000);
                }else{
                    Dialog.alert({
                        message: res.data.msg
                    })
                }
                this.flag = false;
            }) 
            .catch((error) => {
                this.$toast('新手机号跟老手机号一致')
                this.flag = false;
            }) 
        },

    }
}
</script>

<style lang="stylus" scoped>
.SetPassword
    width 100%
    min-height 100vh
    background-color #fef6d7
    h1
        height 208px
        line-height 208px
        text-align center
        font-weight normal
        font-size 36px
    .edit-container
        padding 0 24px
        box-sizing border-box
        margin-top 30px
        .global-form-group
            width 100%
            height 90px
            display flex
            align-items center
            input 
                height 50px
                flex 1
                font-size 26px
                margin-left: 100px;
            .verify-inp
                width 160px
            .verifyCode
                height 90px
                line-height 90px
                font-size 28px
                padding 0 24px
                border none
        .btn 
            margin 45px auto
            width 702px
            height 88px
            border-radius 44px
            font-size 30px
            color #fff 
            text-align center
            line-height 88px  
            letter-spacing 4px          
</style>
