<template>
    <div class="Login global-login-wrap">
        <!-- <h1>登录</h1> -->
        <div class="global-login-inner">
            <div class="login-container global-login-cont">
                <div class="global-icon-wrap">
                    <img class="global-login-msg" src="/static/images/login/login_msg.png" />
                    <span class="login-icon-inner">
                        <img class="glob-login-icon" src="/static/images/login/logo_icon.png" />
                        <span class="glob-icon-line"></span>
                    </span>
                </div>
                <!-- <h1>登录</h1> -->
                <div class="global-form-group">
                    <i class="icon tel-icon"></i>
                    <input type="text" placeholder="输入手机号" v-model="phone">
                </div>
                <div class="global-form-group">
                    <i class="icon password-icon"></i>
                    <input :type="isHide?'password':'text' " placeholder="输入密码" v-model="password">
                    <div class="eyes" @click="handleEyes()">
                        <i :class="isHide?'close-eyes':'open-eyes'"></i>
                    </div>
                </div>
                <p class="global-farget-btn">
                    <router-link to="/EditPassword" class="global-farget-pawsd">忘记密码</router-link>
                </p>
                <div class="global-option-btn global-option-style"  @click="saveUserInfo()">登录</div>

                <div class="jump-link">
                    <div class="appDown" @click="download()">APP下载</div>
                </div>    

            </div>
            <router-link to="/Register" class="global-cont-2"><span class="color-ff">还没有日日领账号？立即注册</span></router-link>
        </div>
    </div>
</template>
<script>
import md5 from 'js-md5';
export default {
    name:'Login',
    data(){
        return{
            phone:'',//手机号
            password:'',//密码
            isHide:true,  //是否显示密码
            disabled:false
        }
    },
    created(){
        if(this.$store.getters.optuser.Authorization){       //返回登录页 如果有token 就返回首页
            this.$router.push('/Home')
        }
    },
    methods:{
        saveUserInfo() {
            var _that=this;
            if(! _that._verifyUserInfo()){ return }
            let url = 'user/login'
             _that.$axios.post(url,{
                phone: _that.phone.replace(/\s+/g, ""),
                user_password: _that.password.replace(/\s+/g, "")
            })
            .then((res)=>{
                var list=res.data;
                if(list.status==200){
                    _that.$toast({message:"登录成功,正在跳转...",duration:1000})
                    localStorage.removeItem('Authorization');
                    var tokens = list.data.token
                    _that.$store.commit('set_token',{Authorization: tokens})  //保存token
                    setTimeout(()=>{
                        _that.$router.push({path:'/Home',name:'Home'})
                    },1000)
                }else{
                    _that.$toast(list.msg)
                }
            })
            .catch((error) => {
                alert('请求错误:'+ error)
            }) 
        },
        /**
         * 密码显示开关
         */
        handleEyes(){
            this.isHide = !this.isHide
            // ss
        },

        /**
         * 校验登录
         */

        _verifyUserInfo(){
            let mobile_reg=/^1[3456789]\d{9}$/
            let pswd_reg =/^[A-Za-z0-9_-]{6,18}$/
            let mobile =this.phone.replace(/\s+/g, ""); 
            let password =this.password.replace(/\s+/g, ""); 
            if(mobile == '' || !mobile_reg.test(mobile)){
                // return this.$toast('手机号码不能为空')
                this.$toast('请填写正确的手机号码')
                return false
            }
            if(password == ''){
                this.$toast('密码不能为空')
                return false
            }
            if(!pswd_reg.test(password)){
               this.$toast('密码长度为6-18位')
                return false
            }
            return true
        },
        // 判断ios终端/android终端
        download() {
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
    }
}
</script>

<style lang="stylus" scoped>
.Login
    width 100%
    min-height 100vh
    background-color #ffffff
    .login-container
        box-sizing border-box
        .global-form-group
            input 
                height 50px
                flex 1
                font-size 25px
                margin-left: 100px;
            .eyes
                width 82px
                height 100%
                i 
                    width 100%
                    height 100%
                    display inline-block
                .close-eyes
                    width 82px
                    background url(/static/images/login/close-eyes.png) no-repeat center center
                    background-size 36px 17px
                .open-eyes
                    width 82px
                    background url(/static/images/login/open-eyes.png) no-repeat center center
                    background-size 36px 24px
        .jump-link
            width 100%
            font-size 28px
            margin-top 20px
            text-align center
            // padding 0 38px
            // box-sizing border-box
            // display flex
            // justify-content center
            .appDown
                font-size 34px
                text-decoration underline
                color #737cf6
                letter-spacing 4px
    .color-ff
	    color  #fff

</style>
