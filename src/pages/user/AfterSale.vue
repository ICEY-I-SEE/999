<template>
    <div class="after-sale-wrap">
        <!-- 头部组件 -->
        <CardHeader custom-title="">
            <i slot="backBtn" class="iconfont icon-fanhui"></i>
        </CardHeader>
        <div class="content">
            <div class="swipe_wrap">
                <div class="header-pic-wrap">
                    <p class="header-pic-mgs">售后服务</p>
                    <div class="header-pic-inner">
                        <img class="header-pic" src="/static/images/user/active.png" :initial-swipe="1" />
                        <span class="header-btn ts-style ts-btn-msg">联系售后</span>
                        </div>
                   
                   <p>
                       
                   </p>
                </div>
            </div>
            <div class="ss-price_wrap">
               <p class="ss-price-msg">关注微信公众号“<span class="color-yellow">玖酒久商城</span>”</p>
               <img class="ss-price-img" src="/static/images/user/sale_codes.png" />
            </div>
        </div>
    </div>
</template>
<script>
// 公共头部
import CardHeader from "@/pages/common/header/NewHeader";
export default {
    data() {
        return {
            userData:[],
            token:this.$store.getters.optuser.Authorization
        };
    },
    created(){ 
        this.$store.commit('showLoading')       //加载loading
        this.getData()
    },
    methods: {
        getData(){
            var _that=this
            _that.$axios.post('user/user_info',{
                'token':this.token
            })
            .then((res)=>{
                var info =res.data
                if(info.status == 200){
                    this.userData = res.data.data;
                }
                else if(res.data.status == 999){
                    _that.$store.commit('del_token'); //清除token
                    setTimeout(()=>{
                        _that.$router.push('/Home')
                    },1000)
                }
                else{
                    _that.$toast(info.msg)
                }
                _that.$store.commit('hideLoading')
            })
        },
    },
    components: {
        CardHeader
    }
};
</script>

<style lang="stylus" scoped>
    .after-sale-wrap
        width 100%
        height 100vh
        background #f4d67b
        background-size 100% 100%
        overflow auto
        .f-title-wrap
            margin-bottom 0 !important
        .content
            color #fff
            font-family PangMenZhengDao
            letter-spacing 4px
            .swipe_wrap
                padding 0 0 62px
                width 100%
                .header-pic-wrap
                    text-align center
                    padding 17px 0 0
                    .header-pic-mgs
                        font-size 36px
                        margin 88px 0 35px
                        transform scale(1,1.1)
                    .header-pic-inner
                        width 278px
                        height 246px
                        background url("/static/images/user/c_bg.png")
                        background-size 100% 100%
                        margin auto
                        .header-pic
                            width 174px
                            height 174px
                            border-radius 50%
                            border 3px solid #fff
                            margin 32px 0 20px
                    .header-btn
                        border-radius: 19px;
                        height 37px
                        padding 0 32px
                        line-height 37px
                        margin-bottom 14px
                        letter-spacing 2px
                        font-size 24px
            .ss-price_wrap
                width 552px
                height 552px
                background url('/static/images/user/kk_bg.png')
                background-size 550px 548px
                box-shadow: 0 0 40px 0 rgba(119, 66, 164, 0.2);
                border-radius 32px
                position relative
                margin 20px auto 10px
                text-align center
                .ss-price-msg
                    padding 20px 0
                    transform scale(1,1.2)
                    letter-spacing 5px
                    .color-yellow
                        color #d90000
                .ss-price-img
                    width 452px
                    height 452px
                    vertical-align middle
</style>


