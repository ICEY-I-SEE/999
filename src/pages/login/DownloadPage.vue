<template>
    <div class="Download">
        <TopHeader custom-title="APP下载">
            <i slot="backBtn" class="iconfont icon-fanhui"></i>
        </TopHeader>
        <!-- <div class="pack"></div> -->
        <div class="wrap">
            <img class="wrap-img" src="/static/images/login/logo.png" alt="">
            <div class="down-text">
                <img src="/static/images/login/ld.png" alt="">
                <img src="/static/images/login/zd.png" alt="">
            </div>
            <div class="btn" @click="an">
                <img class="an" src="/static/images/login/an.png" alt="">
                <span class="an-text"> Android版下载</span>
            </div>
            <div class="btn ios-bg" @click="ios">
                <img class="ios" src="/static/images/login/ios.png" alt="">
                <span class="ios-text"> iphone版下载</span>
            </div>
        </div>
        
    </div>
</template>
<script>
import TopHeader from "@/pages/common/header/TopHeader"
export default {
    name:'Download',
    components:{
        TopHeader
    },
    data(){
        return{

        }
    },
    created(){
    },
    methods:{
        an(){
            window.location = 'https://fir.im/mj4p'
        },
        ios(){
            window.location = 'https://fir.im/79gj' 
        }
    }
}
</script>
<style>
    body, html, #app {
        background-color: #fff;
    }
</style>
<style lang="stylus" scoped>
.Download
    width 100%
    background #fff
    .pack
        position fixed
        top 0
        right 0
        left 0
        bottom 0
        background-image url('/static/images/login/download.png')
        background-size 100%
        z-index 1
    .wrap
        position relative
        z-index 999
        background-image url('/static/images/login/download.png')
        background-size 100%
        padding-top 370px
        padding-bottom 300px
        .wrap-img
            margin 0 auto 
            width: 208px;
            height: 208px;
            display block
        .down-text
            display flex
            margin-top 106px
            justify-content space-around
            img
                width 250px
                height 50px
                display block
        .btn
            margin:60px auto 0 auto
            width 340px
            height 88px
            background-color #ffffff
            border-radius 30px
            border solid 1px #00a0e8
            display flex
            align-items center
            padding-left 80px
            .an
                width 37px
                height 42px
                display block
                margin-right 20px
            .an-text
                color: #00a0e8;
                font-size 30px
        .ios-bg
            background-color: #00a0e8;
            .ios
                width 35px
                height 42px
                display block
                margin-right 20px
            .ios-text
                color: #fff;
                font-size 30px
</style>
