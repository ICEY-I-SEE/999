<template>
    <div class="puton-card-wrap">

        <div class="no-card-wrap" v-if="memberData.level == 0" @click="toPayCard()"></div>


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
                       <span class="header-btn ts-style ts-btn-msg" v-if="memberData.level==0">普通用户</span>
                       <span class="header-btn ts-style ts-btn-msg" v-if="memberData.level==1">VIP会员</span>
                       <span class="header-btn ts-style ts-btn-msg" v-if="memberData.level==2">官方经理</span>
                       <span class="header-btn ts-style ts-btn-msg" v-if="memberData.level==3">高级经理</span>
                       <span class="header-btn ts-style ts-btn-msg" v-if="memberData.level==4">大区经理</span>
                       <span class="header-btn ts-style ts-btn-msg" v-if="memberData.level==5">执行合伙人</span>
 
                   </p>
                   <p class="-pic-msg">剩余：{{memberData.card_num}}张卡</p>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
// 公共头部
import CardHeader from "@/pages/common/header/NewHeader";
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
        toPayCard(){
            this.$router.replace('/membershipCard?id='+this.memberData.level)
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
        }
    },
    components: {
        CardHeader
    }
};
</script>

<style lang="stylus" scoped>
    .puton-card-wrap
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
            height 100vh
            background url('/static/images/membershipCard/pop.png') no-repeat
            background-size 100%
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
                        font-size 36px
                        letter-spacing 3px
                        margin 100px 0 36px
                        transform scale(1,1.1)
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


