<template>
    <div class="CardWrap">
        <!-- 头部组件 -->
        <CardHeader custom-title="会员卡">
            <i slot="backBtn" class="iconfont icon-fanhui"></i>
        </CardHeader>
        <div class="content">
            <div class="swipe_wrap">
                <div class="header-pic-wrap">
                   <img class="header-pic" :src="memberData.avatar" :initial-swipe="1" />
                   <p class="-pic-msg">剩下{{memberData.card_num}}张卡</p>
                </div>
                <div class="s-con-iner">
                    <div class="swiper-container">
                        <div class="swiper-wrapper banner-wrap">   
                            <!-- @click="buyCard()" -->
                            <div class="swiper-slide banner"  v-for="(item,index) in listData.slice(0,3)" :key="index">
                                <!-- <div > -->
                                    <span class="swiper-icon">{{item.levelname}}</span>
                                    <img class="img_03" :src="item.patch_img" @click="buyCard()" />
                                    <div class="state-1" v-if="item.level_type === 1">当前</div>
                                    <div class="state" v-if="item.level_type === 2">已升级</div>
                                    <div class="state_not" v-if="item.level_type === 0">未升级</div>
                                <!-- <div> -->
                            </div>
                        </div>
                        
                        <div class="swiper-button-prev"></div>
                        <div class="swiper-button-next"></div>
                    </div>
                </div>
            </div>
            <div class="price_wrap">
                <!-- <div class="price">
                    <span>会员卡:</span>
                    <span>￥{{infoData.card_one_money}}</span>
                </div> -->
                <div class="price">
                    <p class="-card-a-msg">
                        会员卡：<label class="delstyle">￥</label>
                        <span class="c-active">{{infoData.card_one_money}}</span>
                    </p>
                     <p class="-card-a-msg">
                        购买数量：<label class="delstyle">￥</label>
                        <span class="c-active">{{infoData.cardnum}}</span>
                    </p>
                </div>
                <!-- <div class="buy">购买数量：{{infoData.cardnum}}</div> -->
               <div class="num"> 
                   <p class="-card-a-msg">
                    总价：<label class="delstyle">￥</label>
                    <span class="c-active"> {{sumPrice}}</span>
                    </p>
                </div>

                <!-- <div class="patch-card">
                    <span class="link" @click="linkSJReissueCard()">联系上级补卡</span>
                    <span @click="linkReissueCard()" class="link">立即补卡</span>
                </div> -->
                <!-- <p class="height180"></p> -->
                <!-- <div class="btn" @click="linkReissueBtn()">立即补卡</div> -->
            </div>
        </div>
    </div>
</template>
<script>
// 公共头部
import CardHeader from "@/pages/common/header/NewHeader";
import Swiper from "swiper"
import "swiper/dist/css/swiper.css"
export default {
  name: "membershipCard",
    data() {
        return {
            state: "",
            listData:[],
            memberData:[],
            index:0,
            levelId:'',
            infoData:{},
            token:this.$store.getters.optuser.Authorization
        };
    },
    computed: {
        info(){
            var data = this.listData[this.index];
        },
        sumPrice() {
            var num =new Number(this.infoData.cardnum)
            var price =new Number(this.infoData.card_one_money)
            return num * price;
        }
    },
    created(){ 
        this.$store.commit('showLoading')       //加载loading
        this.getData()
    },
    methods: {
        buyCard(){
            this.$router.push({
                path: '/Pay/PayWay?level_id=' + this.levelId+'&isCard=1'+'&price='+this.sumPrice,
            })
        },
        priceData(key){
            this.infoData =this.listData[key];
            this.levelId =this.infoData.level
        },
        imGinfo() {
            return this.imgData[this.index];
        },

        getData(){
            var _that=this
            _that.$axios.post('card/card_member_info',{
                'token':this.token
            })
            .then((res)=>{
                var info =res.data
                if(info.status == 200){
                    _that.listData =info.data.list
                    _that.memberData=info.data.member
                    _that.$store.commit('hideLoading')
                    _that.priceData(_that.index)
                    new Swiper('.swiper-container', {
                        direction: 'horizontal',
                        initialSlide :0,
                        observer:true,          //修改swiper自己或子元素时，自动初始化swiper
                        observeParents:true,            //修改swiper的父元素时，自动初始化swiper
                        slidesPerView: "auto",
                        centeredSlides:true,
                        spaceBetween: 20,
                        navigation:{
                            prevEl:'.swiper-button-prev',
                            nextEl:'.swiper-button-next'
                        },
                        on: { 
                            slidePrevTransitionEnd:function(){
                                _that.priceData(this.activeIndex)
                            },
                            slideNextTransitionEnd:function(){
                                _that.priceData(this.activeIndex)
                            },
                        }
                    });
                }
                else if(res.data.status == 999){
                    _that.$store.commit('del_token'); //清除token
                    setTimeout(()=>{
                        _that.$router.push('/Login')
                    },1000)
                }
                else{
                    _that.$toast(info.msg)
                }
                _that.$store.commit('hideLoading')
            })
        },

		/**
		 * 联系上级补卡
		 */
        linkSJReissueCard(){		
           	var url ='card/patch_card_edit',
            	that = this
            that.$axios.post(url,{         // 传给后台的参数
                'token':that.token,
                'card_num':0
            })
            .then((res)=>{
                var info = res.data
                if(info.status==200){
                    this.$router.push('/sjReissueCard')
                }
                else if(res.data.status == 999){
                    that.$store.commit('del_token'); //清除token
                    setTimeout(()=>{
                        this.$router.push('/Login')
                    },1000)
                }else{
                    that.$toast(res.data.msg)
                }
            })
        },
		/**
		 * 立即补卡
		 */

        linkReissueBtn(){
            this.$router.push('/NewReissueCard')
        },
		linkReissueCard(){
           var url ='card/card_edit_now',
                that =this
            that.$axios.post(url,{         // 传给后台的参数
                'token':that.token
            })
            .then((res)=>{
                var info =res.data
                if(info.status1!=315){
                    this.$router.push('/ReissueCard')
                }else{
                    that.$toast(res.data.msg)
                }
            })
        },
        swipeChange(index) {
            this.index = index;
        }
    },
    components: {
        CardHeader
    }
};
</script>

<style lang="stylus" scoped>
    .CardWrap
        width 100%
        height 100vh
        background url('/static/images/membershipCard/buka_bg.png') no-repeat
        background-size 100% 100%
        overflow auto
        .f-title-wrap
            margin-bottom 0 !important
        .content
            color #fff
            font-family PangMenZhengDao
            .swipe_wrap
                padding 0 0 58px
                width 100%
                .header-pic-wrap
                    text-align center
                    padding 17px 0 0
                    .header-pic
                        width 174px
                        height 175px
                        border-radius 50%
                        border 3px solid #fff
                        margin-bottom 30px
                    .-pic-msg
                        font-family PangMenZhengDao
                        font-size 24px
                        letter-spacing 2px
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
            .img_01
                width 325px
                height 35px
            .img_02 
                padding 29px 0 81px
                width 470px
                height 35px
            .s-con-iner
                width 100%
                overflow hidden
            .swiper-container 
                margin-top 20px
                // width 750px
                width 100%
                // max-height 400px
                margin-bottom 10px
                overflow visible!important
            .swiper-button-prev, .swiper-button-next
                outline none 
                z-index 1000
                margin-top -100px
                width 60px
            .swiper-button-prev
                background url('/static/images/membershipCard/le_arrow.png') no-repeat
                background-size 60px 69px
                left 16px
            .swiper-button-next
                background url('/static/images/membershipCard/ri_arrow.png') no-repeat
                background-size 60px 69px
                right 16px
            .banner-wrap /deep/ .swiper-slide
               width 620px !important
               border-radius 20px
            .banner
                position relative
                .swiper-icon
                    transform scale(1,1.2)
                    font-size 24px
                    letter-spacing 3px
                    position absolute
                    top 50%
                    right 14px
                    display inline-block
                    padding 0 15px
                    background-image linear-gradient(90deg,#df51c8 0%, #e964bb 62%, #f376ad 100%)
                    box-shadow 0px 0px 10px 0px rgba(153, 134, 251, 0.36)
                    border-top-left-radius 27px
                    border-bottom-left-radius 27px
                    height 50px
                    line-height 54px
                    color #fff
                    font-family PangMenZhengDao
                .state, .state_not,.state-1
                    position absolute
                    top 0
                    left 15px
                    width 98px
                    height 44px
                    border-radius 4px
                    font-size 26px
                    color #fff
                    text-align center
                    line-height 44px
                .state-1
                    background #e39417
                .state
                    background #2689c0
                .state_not 
                   background #b9c4c5
            .price_wrap 
                padding 0 0 25px 0
                .price 
                    display flex
                    align-items center
                    .-card-a-msg:nth-child(1)
                        border-top-left-radius 0
                        border-bottom-left-radius 0
                        margin-right 30px
                .-card-a-msg
                    display inline-block
                    padding 0 40px
                    height 70px
                    line-height 70px
                    background rgba(255,255,255,0.17)
                    border-radius 32px
                    text-align center
                    font-size 24px
                    margin-top 22px
                    letter-spacing 3px
                    transform scale(1,1.1)
                    .delstyle
                        font-size 20px
                .num 
                    text-align right
                    margin-right 20px
                .patch-card
                    display flex
                    justify-content space-around
                    padding 20px 24px
                    box-sizing border-box
                    margin-top 58px
                    .link
                        width 238px
                        height 64px
                        text-align center
                        line-height 64px
                        color #151515
                        font-size 28px
                        display block
                        background url(/static/images/home/links-bg.png) no-repeat
                        background-size 100% 
                        font-weight 500
                .btn 
                    width 571px
                    height 76px
                    line-height 76px
                    margin 58px auto 30px
                    text-align center
                    background-image: linear-gradient(90deg, #df51c8 0%, #e964bb 62%, #f376ad 100%);
                    border-radius 32px
                    font-size 32px
                    letter-spacing 7px
                    color #fff
                    font-family PangMenZhengDao
                    box-shadow 0px 10px 38px 0px rgba(75, 84, 142, 0.66)
           
</style>


