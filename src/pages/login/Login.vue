<template>
    <div class="Login global-login-wrap" id="login-wrp">
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

                <div class="global-form-group" v-if="signinTypes == 2">
                    <i class="icon password-icon"></i>
                    <input :type="isHide?'password':'text' " placeholder="输入密码" v-model="password">
                    <div class="eyes" @click="handleEyes()">
                        <i :class="isHide?'close-eyes':'open-eyes'"></i>
                    </div>
                </div>

                <div class="global-form-group" v-if="signinTypes == 1">
                    <i class="icon verify-icon"></i>
                    <input class="verify-inp" type="text" placeholder="输入验证码" v-model="verifyCode" autocomplete="off" maxlength="6">
                    <button class="verifyCode global-option-style" :disabled="disabled" @click="getVerifyCode()">{{verifyText}}</button>
                </div>


                <div class="login-tip">
                    未注册用户，手机验证后<br>登录即同意
                    <router-link tag="span" to="/UserTreal" class="-text-active">《用户协议》</router-link>
                    与
                    <router-link tag="span" to="/PrivacyPolicy" class="-text-active">《隐私政策》</router-link>
                </div>
                <div class="global-option-btn global-option-style"  @click="saveUserInfo()">登录</div>
                <div class="login-signinTypes">
                    <div v-if="signinTypes == 2" @click="handelSigninTypes(1)">验证码登录</div>
                    <div v-else  @click="handelSigninTypes(2)">密码登录</div>
                    <div @click="download()">APP下载</div>
                </div>
                <!-- <p class="global-farget-btn">
                    <router-link to="/EditPassword" class="global-farget-pawsd">忘记密码</router-link>
                </p> -->
               
                <!-- <div class="global-option-btn global-option-style"  @click="saveUserInfo(true)">游客浏览</div> -->

            </div>
            <!-- <router-link to="/Register" class="global-cont-2"><span class="color-ff">还没有玖酒久账号？立即注册</span></router-link> -->
        </div>
    </div>
</template>
<script>
import md5 from 'js-md5';
export default {
    name:'Login',
    data(){
        return{
            signinTypes:1,//2密码登录，1验证码登录
            phone:'',//手机号
            password:'',//密码
            isHide:true,  //是否显示密码
            disabled:false,
            verifyCode:'',//验证码
            disabled:false,
            verifyText:'获取验证码',
            uid:'',
            uid_code:''
        }
    },
    created(){
        this.uid=this.$route.query.uid
        this.uid_code=this.$route.query.uid_code
        const height = document.documentElement.clientHeight
      // 在页面整体加载完毕时
        window.onload = function () {
            document.getElementById('login-wrp').style.height = `${height}px`;

        }
        if(this.$store.getters.optuser.Authorization){       //返回登录页 如果有token 就返回首页
            this.$router.push('/Home')
        }
        let code = this.getCode('code');
        let user_id = this.getCode('user_id');
        if(code){
            let url = 'weixin/get_openid'
                this.$axios.post(url,{
                    'code':code,
                    'user_id':user_id?user_id:'0'
                })
            .then((res)=>{
                let _that = this;
                if(res.data.status==200){
                    _that.$toast({message:"登录成功,正在跳转...",duration:1000})
                    localStorage.removeItem('Authorization');
                    var tokens = res.data.data.token
                    _that.$store.commit('set_token',{Authorization: tokens})  //保存token
                    setTimeout(()=>{
                        // if(localStorage.getItem('details_url')){
                        //     _that.$router.push(localStorage.getItem('details_url'))
                        // }else{
                        //     _that.$router.push('/Home?is_pwd='+res.data.data.is_pwd+'&is_reads='+res.data.data.is_reads+'&is_vip_free_read='+res.data.data.is_vip_free_read)
                        // }
                        _that.$router.push('/Home')
                    },1000)
                }else{
                    console.log('----+++++---')                    
                    console.log(res.data)
                    console.log(res.data.status)
                    console.log('----+++++---')
                    this.$toast(res.data.msg)
                }
            })
            .catch((error) => {
                console.log('请求错误:'+ error)
            }) 
        }else{
            this.getIsWxClient();
        }
        this.getlocalStorage()
        
    },
    methods:{
        /**
         * 判断是否是微信环境
         */
        getIsWxClient () {
            var ua = navigator.userAgent.toLowerCase(),
                that = this;
            let user_id = this.getCode('user_id');
            if (ua.match(/MicroMessenger/i) == "micromessenger") {
                that.$axios.post('weixin/info_code',{
                    'user_id':user_id?user_id:'0'
                })
                .then((res)=>{
                    var list=res.data;
                    console.log(list)
                    if(list.status==200){
                        window.location.href = list.data;
                    }else{
                        that.$toast(list.msg)
                    }
                })
                .catch((error) => {
                    alert('请求错误:'+ error)
                }) 
            }
            return false;
        },
        getCode (name) {
            var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)');
            var r = window.location.search.substr(1).match(reg);
            if (r != null) return decodeURIComponent(r[2]); return null;
        },
        handelSigninTypes(index){
            this.signinTypes = index;
        },
        saveUserInfo(tourists) {
            var _that=this;
            if(!_that._verifyUserInfo(tourists) && !tourists){ return }
            let param = {}
            if(tourists){
              param = {
                phone: '15181112455',
                user_password: '111111',
                login_type:this.signinTypes,
                uid:this.uid,
                uid_code:this.uic_code
              }
            }else {
              param = {
                phone: _that.phone.replace(/\s+/g, ""),
                user_password: _that.password.replace(/\s+/g, ""),
                login_type:this.signinTypes,
                verify_code:this.verifyCode,
                uid:this.uid,
                uid_code:this.uic_code
              }
            }
            let url = 'user/login'
             _that.$axios.post(url, param)
            .then((res)=>{
                var list=res.data;
                if(list.status==200){
                    _that.setlocalStorage(_that.phone)
                    _that.$toast({message:"登录成功,正在跳转...",duration:1000})
                    localStorage.removeItem('Authorization');
                    var tokens = list.data.token
                    _that.$store.commit('set_token',{Authorization: tokens})  //保存token
                    setTimeout(()=>{
                        if(localStorage.getItem('details_url')){
                            _that.$router.push(localStorage.getItem('details_url'))
                        }else{
                            _that.$router.push('/Home?is_pwd='+list.data.is_pwd+'&is_reads='+list.data.is_reads+'&is_vip_free_read='+list.data.is_vip_free_read)
                        }
                       
                    },1000)


                }else{
                    _that.$toast(list.msg)
                }
            })
            .catch((error) => {
                alert('请求错误:'+ error)
            }) 
        },
        setlocalStorage(c_name) {
            localStorage.siteName = c_name
        },
        getlocalStorage(){
            this.phone = localStorage.getItem('siteName')
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

        _verifyUserInfo(tourists){
            let mobile_reg=/^1[3456789]\d{9}$/
            let pswd_reg =/^[A-Za-z0-9_-]{6,18}$/
            let mobile,password;
            if(!tourists){
                mobile =this.phone.replace(/\s+/g, ""); 
                password =this.password.replace(/\s+/g, ""); 
            }
            if(mobile == '' || !mobile_reg.test(mobile)){
                this.$toast('请填写正确的手机号码')
                return false
            }
            if(password == '' && this.signinTypes == 2){
                this.$toast('密码不能为空')
                return false
            }
            if(!pswd_reg.test(password)  && this.signinTypes == 2 ){
               this.$toast('密码长度为6-18位')
                return false
            }
            return true
        },
        // 判断ios终端/android终端
        download() {
            this.$router.push('/DownloadPage')
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
                        this.countDown();
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
    }
}
</script>

<style lang="stylus" scoped>
.Login
    width 100%
    min-height 100vh
    background-color #ffffff
    overflow auto
    .global-login-inner
        padding:311px 22px 50px !important;
    .login-container
        box-sizing border-box
        .login-tip
            text-align center
            margin-bottom 30px
            .-text-active
                color #e789f7
                text-decoration underline
        .login-signinTypes
            height 100px
            font-size 28px
            color #E789F7
            display flex
            align-items center
            justify-content space-between
        .global-form-group
            .verify-inp
                width 160px
            .verifyCode
                height 90px
                line-height 90px
                font-size 28px
                padding 0 24px
                box-sizing border-box 
                border none
            input 
                height 50px
                flex 1
                font-size 25px
                margin-left: 100px;
            .eyes
                width 82px
                height 100%
                position absolute
                right 20px
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
    .tips
        position fixed
        top 30%
        z-index 101
        background #ffffff
        height 500px
        width 580px	
        left 54px
        border-radius 30px
        padding 30px
        .tips_top
            text-align center
            font-weight 700
            font-size 34px
            padding-bottom 20px
            color #A381ED
        p
            font-size 28px
            color #aaa
        .tips-cont
            padding 40px 0
            font-size 28px
        .tips-item
            align-items center
            display flex
            .-text-active
                color #fc8cfa
        button
            display block
            width 200px
            text-align center
            line-height 60px
            border-radius 40px
            border none
            background-image: linear-gradient(90deg, #fc8cfa 0%, #a281ed 50%, #737cf6 76%, #4377ff 100%), linear-gradient(#fe9d6e, #fe9d6e);
            color #fff
            font-size 30px
            margin 40px auto 0 auto
</style>
