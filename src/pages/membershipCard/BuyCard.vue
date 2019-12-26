<template>
    <div class="buyss-card-wrap">
        <!-- 头部组件 -->
        <CardHeader custom-title="">
            <i slot="backBtn" class="iconfont icon-fanhui"></i>
        </CardHeader>
        <div class="content">
            <div class="swipe_wrap">
                <div class="header-pic-wrap">
                    <p class="header-pic-mgs">会员卡</p>
                    <img class="header-pic" :src="memberData.avatar" :initial-swipe="1" />
                   <p>
                       <!-- <span class="header-btn ts-style-bg ts-btn-msg">官方经理人</span> -->
                       <span class="header-btn ts-style ts-btn-msg" v-if="memberData.level==0">普通用户</span>
                       <span class="header-btn ts-style ts-btn-msg" v-if="memberData.level==1">VIP会员</span>
                       <span class="header-btn ts-style ts-btn-msg" v-if="memberData.level==2">官方经理</span>
                       <span class="header-btn ts-style ts-btn-msg" v-if="memberData.level==3">高级经理</span>
                       <span class="header-btn ts-style ts-btn-msg" v-if="memberData.level==4">大区经理</span>
                       <span class="header-btn ts-style ts-btn-msg" v-if="memberData.level==5">执行合伙人</span>
                       <span class="header-btn ts-style ts-btn-msg" v-if="memberData.level=='-1'">会员体验卡用户</span>
 
                   </p>
                   <p class="-pic-msg">会员卡数量：{{memberData.card_num}}张卡</p>
                   <p class="-pic-msg">体验卡数量：{{memberData.is_vip_free_num}}张卡</p>
                </div>
            </div>
            <div class="ss-price_wrap">
                <router-link :to="'/membershipCard?id='+1" class="ss-price-list1">
                    <img class="ss-img" src="/static/images/membershipCard/mem.png"/>
                </router-link>
                <router-link to="/membershipCardSlider" class="ss-price-list1 ss-price-2">
                    <img class="ss-img" src="/static/images/membershipCard/jlr.png"/>
                </router-link>
                <div class="ss-price-list1" @click="toGeneryCard()">
                    <img class="ss-img" src="/static/images/membershipCard/buka1.png"/>
                </div>
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
        toGeneryCard(){
            if(this.memberData.level==0){
                this.$router.push('/PtBuyCard')
            }else{
                // this.$router.push('/NewReissueCard')
                this.$router.push('/ReissueCard?card_type=1')
            }
            
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
    .buyss-card-wrap
        width 100%
        height 100vh
        background url('/static/images/membershipCard/ht_bg.png') no-repeat
        background-size 100% 100%
        overflow auto
        .no-card-wrap
            position fixed
            top 0
            left 0
            z-index 1000
            width 100%
            height 100%
            background url('/static/images/membershipCard/pop.png') no-repeat
            background-size 100% 100%
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
                    padding 50px 0 0
                    .header-pic-mgs
                        font-size 39px
                        letter-spacing 4px
                        margin 100px 0 36px
                        transform scale(1,1.1)
                        font-weight 800
                    .header-pic
                        width 174px
                        height 175px
                        border-radius 50%
                        border 3px solid #fff
                        margin-bottom 17px
                    .-pic-msg
                        font-family PangMenZhengDao
                        font-size 24px
                        letter-spacing 2px
                        // transform scale(1,1.1)
                    .header-btn
                        border-radius: 19px;
                        // height 37px
                        padding 0 30px
                        line-height 40px
                        margin-bottom 30px
                        font-size: 24px;
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
                padding 80px 0 25px 0
                text-align right 
                .ss-price-list1
                    width 598px
                    // height 102px
                    margin 0 auto 0
                    display block
                    .ss-img
                        width 100%
                        height 100%
                        // box-shadow: 0px 0px 21px 0px rgba(190, 132, 239, 0.36);
                    .ss-price-2
                        margin-bottom 4px
</style>
