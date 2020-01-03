<template>
    <div class="CardWrap">
        <!-- 头部组件 -->
        <div class="f-title-wrap">
            <i slot="backBtn" class="iconfont icon-fanhui" @click="backAction()"></i>
            <span class="free-test">会员卡</span>
        </div>  

        <div class="content">
            <div class="swipe_wrap">
                <div class="banner">
                    <img class="img_03" src="/static/images/membershipCard/card_98.png" />
                    <!-- <img class="img_03" :src="swipeData.patch_img" /> -->
                </div>
            </div>
            <div class="price_wrap">
                <div class="price-inner">
                <div class="price">
                    <div class="buy">购买数量：{{swipeData.cardnum}}</div>
                    <span class="">会员卡: <span class="delstyle">￥</span><strong>{{swipeData.card_one_money}}</strong></span>
                </div>
                </div>
                <div class="total-wrap">
                    <div class="desc">
                        <p class="title">玖酒久会员权益：</p>
                        <p><span class="akey">玖酒久商城</span>，只有本商城的<span class="akey">VIP会员</span>才可以在商城内持续低价购买和领取商品。</p>
                        <p><span class="akey">玖酒久，致力于成为中国人自己的商城。尽可能以最低的价格为会员提供一切高品质的商品，为您实现消费降级，品质升级。</span></p>
                        <p>商城的新用户可以在<span class="akey">【每日一领 免费专区】</span>体验领取一次会员免费商品，但无法购买商城会员价商品。成为会员后即可持续享受商城会员全网最低价，同时可在<span class="akey">【每日一领】</span>专区每天任意领取一款会员免费商品，更有无数大牌好物惊爆价为会员准备。</p>
                        <p>按商城会员用户日常消费计算，每<span class="akey">1000元</span>，玖酒久会员可在商城购买市场价<span class="akey">8000元-10000元</span>总额的商品。按商城会员用户免费领取计算，每月可累计为您节省日常生活花销<span class="akey">1000元-2000元</span>。</p>
                        <p>玖酒久商城目前为邀请制，只有通过会员之间分享的二维码才能注册登录。当您成为玖酒久<span class="akey">VIP会员</span>后，您可在<span class="akey">【个人中心】</span>点击<span class="akey">【我要分享】</span>获取您的会员专属二维码，将二维码分享给新用户，即可帮他完成注册登录，为他一同实现消费降级，品质升级。</p>
                    </div>
                    <!-- <p class="total-msg">VIP会员优惠价</p>
                    <p class="total-msg">购买后将升级为<strong>VIP</strong>会员</p>
                    <div class="total-line">
                        <i class="total-line-icon"></i>
                        <i class="total-line-icon"></i>
                    </div>
                    <div class="num">总价：<span class="delstyle">￥</span><strong>{{swipeData.cardmoney}}</strong></div> -->
                    <div class="btn" @click="buyCard()">立即购买</div>
                </div>
         
            </div>
        </div>
    </div>
</template>
<script>
// 公共头部
import CardHeader from "@/pages/common/header/TopHeader";
import Swiper from "swiper"
import "swiper/dist/css/swiper.css"
export default {
    name: "membershipCard",
    components: {
        CardHeader
    },
    data() {
        return {
            state: "",
            swipeData: [],
            levelId:'',
            token:this.$store.getters.optuser.Authorization,
            price:0
        };
    },
    created(){
        this.$store.commit('showLoading')       //加载loading
        if(Number(this.$route.query.id) === 0){
            this.levelId = 1;
        }else{
            this.levelId = new Number(this.$route.query.id);
        }
        this.getData();
    },
    methods: {
        backAction(){
            this.$router.go(-1)
        },
        getData(){
            var _that=this
            _that.$axios.post('card/card_edit',{
                'token':_that.token,
                'level_id':_that.levelId
            })
            .then((res)=>{
                var info = res.data
                if(info.status == 200){
                    _that.price = info.data.cardmoney
                    _that.swipeData = info.data
                    _that.$store.commit('hideLoading')
                }
                else if(res.data.status == 999){
                    _that.$store.commit('del_token'); //清除token
                    setTimeout(() => {
                        _that.$router.push('/Home')
                    },1000)
                }
                else{
                    _that.$toast(info.msg)
                }
            })
        },
        buyCard(){
            this.$router.push({
                path: '/Pay/PayWay?level_id=' + this.levelId+'&isCard=1&price='+this.price,
            })
        },
        swipeChange(index) {
            this.index = index;
        }
    },
  
};
</script>

<style lang="stylus" scoped>
    .CardWrap
        width 100%
        min-height 100%
        background url('/static/images/membershipCard/card_bg1.png') no-repeat
        background-size 100% 100%
        overflow hidden
        font-family PangMenZhengDao
        .f-title-wrap
            padding 20px 24px 0
            line-height 80px
            text-align center
            position relative
            color #fff
            margin-bottom 60px
            .icon-fanhui
                position absolute
                left 24px
                font-size 42px
            .free-test
                font-size 36px
                font-weight 550
                letter-spacing 2px
        .content
            .swipe_wrap
                padding 65px 0 50px
                width 100%
                background-size 100% 100%
                .van-swipe-item
                    padding-left 15px
                    padding-right 15px
                    box-sizing border-box
            .swipe_wrap /deep/ .van-swipe__indicators 
                display none
            .-thumbs-list-
                width: 100% !important;
            .gallery-list
                width:80% !important;
            img 
                margin 0 auto
                display block
                max-width 100%
                height 354px
            .banner
                position relative
                width 100%
                img 
                    max-width: 93%
                .state 
                    position absolute
                    top 0
                    left 0
                    width 98px
                    height 44px
                    background #ff9f2e
                    border-radius 4px
                    font-size 26px
                    color #fff
                    text-align center
                    line-height 44px
                .state_not 
                    position absolute
                    top 0
                    left 0
                    width 98px
                    height 44px
                    background #b9c4c5
                    border-radius 4px
                    font-size 26px
                    color #fff
                    text-align center
                    line-height 44px
            .price_wrap 
                position: relative
                padding 0 0 51px
                .delstyle
                    color:#e053c6
                strong
                    font-size 30px
                    font-weight 600
                    color #e053c6 
                .price-inner
                    position absolute
                    z-index 1
                    width 100%
                    padding 0 24px
                    box-sizing border-box
                .price 
                    justify-content space-between
                    display flex
                    width 100%
                    padding 0 47px
                    line-height 140px
                    height 140px
                    background #fff
                    border-radius 32px
                    box-sizing border-box
                    font-size 30px
                    color #1b1b1b
                    letter-spacing 3px
                    box-shadow 0px 21px 44px 25px rgba(96, 113, 186, 0.1)
                    margin auto
                    font-weight bold
                .total-wrap
                    padding 180px 0 40px
                    width 650px
                    margin auto 
                    background-color #ffffff
                    box-shadow 0px 21px 44px 25px rgba(96, 113, 186, 0.1)
                    border-bottom-left-radius 32px
                    border-bottom-right-radius 32px
                    opacity 0.86
                    .desc
                        padding 0 28px
                        p
                            letter-spacing: 2.3px;
                            font-size 26px
                            text-align justify
                            margin-bottom 14px
                            font-family: 'PangMenZhengDao';
                            color #aaa
                        .title
                            font-size 30px
                            color #e054c6
                        .akey
                            color #e054c6
                    .total-msg
                        color #898989
                        font-size 30px
                        letter-spacing 3px
                        line-height 52px
                    .total-line
                        width 3px
                        height 92px
                        background-color #bfbfbf
                        margin 20px auto 
                        position relative
                        .total-line-icon
                            display block
                            position absolute
                            width 13px
                            height 13px
                            margin -6px
                            border-radius 50%
                            background-image linear-gradient(0deg, #df51c8 0%, #e964bb 62%, #f376ad 100%)   
	                    .total-line-icon:last-child
                            bottom 0
                    .num 
                        font-size 34px
                        color #151515
                        font-weight 550
                        text-align center
                        line-height 75px
                    .btn 
                        width 223px
                        height 76px
                        color #fff
                        letter-spacing 3px
                        font-size 30px
                        line-height 76px
                        background-image linear-gradient(90deg, #fc8cfa 0%, #a281ed 59%, #737cf6 84%, #4377ff 100%)
                        box-shadow 0px 21px 38px 0px rgba(203, 74, 179, 0.36)
                        border-radius 32px
                        margin 30px auto 0
                        font-family PangMenZhengDao
                        text-align center
           
</style>


