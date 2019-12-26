<template>
    <div class="yrdCardWrap">
        <!-- 头部组件 -->
        <CardHeader custom-title="">
            <i slot="backBtn" class="iconfont icon-fanhui"></i>
        </CardHeader>
        <div class="content">
            <div class="swipe_wrap">
                <div class="header-pic-wrap">
                    <p class="header-pic-mgs">立即补卡</p>
                   <img class="header-pic" :src="memberData.avatar" :initial-swipe="1" />
                   <p>
                       <!-- <span class="header-btn ts-style-bg ts-btn-msg">官方经理人</span> -->
                       <span class="header-btn ts-style-bg ts-btn-msg" v-if="memberData.level==0">普通用户</span>
                       <span class="header-btn ts-style-bg ts-btn-msg" v-if="memberData.level==1">VIP会员</span>
                       <span class="header-btn ts-style-bg ts-btn-msg" v-if="memberData.level==2">官方经理</span>
                       <span class="header-btn ts-style-bg ts-btn-msg" v-if="memberData.level==3">高级经理</span>
                       <span class="header-btn ts-style-bg ts-btn-msg" v-if="memberData.level==4">大区经理</span>
                       <span class="header-btn ts-style-bg ts-btn-msg" v-if="memberData.level==5">执行合伙人</span>
 
                   </p>
                   <p class="-pic-msg">拥有会员卡{{memberData.card_num}}张卡</p>
                </div>
            </div>
            <div class="ss-price_wrap">
                <div>
                    <span class="topT" @click="linkToBuKa()">联系上级补卡</span>
                </div>
                <!-- <div>
                    <span class="topT3" @click="linkToJinJIBuKa()">紧急补卡</span>
                </div> -->
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
                path: '/Pay/PayWay?level_id=' + this.levelId+'&isCard=1',
            })
        },
        linkToBuKa(){
            this.$router.push({
                path: '/ReissueCard?card_type=1',
            })
        },

        linkToJinJIBuKa(){
            //  this.$router.push('/ReissueCard')
            this.$router.push({
                path: '/ReissueCard?card_type=2',
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
                        _that.$router.push('/Home')
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
                        this.$router.push('/Home')
                    },1000)
                }else{
                    that.$toast(res.data.msg)
                }
            })
        },
		/**
		 * 立即补卡
		 */
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
    .yrdCardWrap
        width 100%
        height 100vh
        background url('/static/images/membershipCard/') no-repeat
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
                    .header-pic-mgs
                        font-size 36px
                        letter-spacing 3px
                        margin 83px 0 36px
                        transform scale(1,1.1)
                    .header-pic
                        width 174px
                        height 175px
                        border-radius 50%
                        border 3px solid #fff
                        margin-bottom 17px
                    .-pic-msg
                        font-family PangMenZhengDao
                        font-size 21px
                        letter-spacing 2px
                        transform scale(1,1.1)
                    .header-btn
                        border-radius: 19px;
                        padding 0 30px
                        line-height 40px
                        margin-bottom 14px
                .van-swipe-item
                    padding-left 15px
                    padding-right 15px
                    box-sizing border-box
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
            .ss-price_wrap
                padding 189px 0 25px 0
                text-align right 
                .topT
                    display inline-block
                    width 328px
                    height 89px
                    background #df51c8
                    box-shadow 0px 20px 38px 0px rgba(203, 74, 179, 0.36)
                    border-radius 32px
                    text-align center
                    line-height 89px
                    font-size 43px
                    transform scale(1,1.1)
                    text-align center
                    margin-right 68px
                .topT3
                    width 223px
                    height 76px;
                    line-height 76px
                    display inline-block
                    background #f376ad
                    // background-image linear-gradient(90deg, #f376ad 100%)
                    box-shadow 0px 20px 38px 0px rgba(203, 74, 179, 0.36)
                    border-radius 32px
                    letter-spacing 4px
                    text-align center
                    font-size 36px
                    margin-top 176px
                    transform scale(1,1.1)
                    margin-right 25px
</style>


