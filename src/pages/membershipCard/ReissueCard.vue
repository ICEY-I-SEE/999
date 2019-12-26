<template>
    <div class="reissue-card-wrap">
        <!-- 头部组件 -->
        <CardHeader class="res-card-header" custom-title="补卡">
            <i slot="backBtn" class="iconfont icon-fanhui"></i>
        </CardHeader>
        <div class="content">
            <!-- <div class="swipe_wrap">
                <div class="header-pic-wrap">
                    <img class="header-pic" :src="memberData.avatar" :initial-swipe="1" />
                   <p>
                       <span class="header-btn ts-style ts-btn-msg" v-if="memberData.level==0">普通用户</span>
                       <span class="header-btn ts-style ts-btn-msg" v-if="memberData.level==1">VIP会员</span>
                       <span class="header-btn ts-style ts-btn-msg" v-if="memberData.level==2">官方经理</span>
                       <span class="header-btn ts-style ts-btn-msg" v-if="memberData.level==3">高级经理</span>
                       <span class="header-btn ts-style ts-btn-msg" v-if="memberData.level==4">大区经理</span>
                       <span class="header-btn ts-style ts-btn-msg" v-if="memberData.level==5">执行合伙人</span>
 
                   </p>
                   <p class="-pic-msg">拥有会员卡：{{memberData.card_num}}张卡</p>
                </div>
            </div> -->
            <div class="res-card-a">
                <div class="-card-a-img">
                    <!-- <span class="swiper-icon"></span> -->
                    <img  :src="patch_img"/>
                </div>
                 <!-- <div class="-card-a-img"><img  src="/static/images/membershipCard/car.png"/></div> -->
                <p class="-card-a-msg">会员卡：<label class="delstyle">￥</label><span class="c-active">{{levelInfo.card_one_money}}</span></p>
            </div> 
            <!-- <div class="link-wrap"> <span class="link" @click="linkSJReissueCard()">联系上级补卡</span></div> -->
            <ul class="res-card-b">
                <!-- <p class="-card-b-title">补卡提醒记录</p>
                <li class="-card-b-list" v-for='(item,index) in patch_list.data' :key="index">
                   <img class="-b-msg-img" :src="item.avatar"/> 
                   <div class="-b-list-msg">
                       <span>ID:{{item.user_id}} - {{item.mobile}}提醒您补卡</span>
                       <span class="c-active2">X {{item.card_num}}</span>
                       <p class="-b-list-date">{{item.create_time | formatDate}}</p>
                   </div>
                </li>
                <p class="t-center"><router-link to="/MoreReissueCard" class="look-more">查看更多</router-link> </p> -->
            </ul>
           
            <div class="price-wrap">
                <!-- <div class="num-wrap"> -->
                <div class="-option-">
                    <i class="subling iconfont icon-jian-" @click="reducingNumber()"></i>
                    <input class="inp" type="number" v-model="card_num" @change="changNumber($event)" readonly/>
                    <i class="puls iconfont icon-jia" @click="addNumber()"></i>
                </div>
                <!-- </div> -->
                <div class="num">总价：￥{{computeMoney}}</div>
            </div>
             <p class="height180"></p>
            <div class="btn" @click="saveInfo()">立即补卡</div>
            <div class="hint-msg">
                <p>补卡须知</p>
                平台提醒您，如果您的会员卡剩余数量不⾜，下级将直接通过平台补卡。为保证各位经理⼈
                的利润收益，建议保持后台会员卡数量充⾜，便于下级补卡哦~
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
//   name: "ReissueCard",
    data() {
        return {
            card_num:1,
            cardInfo:[],
            patch_list:[],
            levelInfo:{},
            patch_img:'',
            card_one_money:0,
            cardType:this.$route.query.card_type,
            token:this.$store.getters.optuser.Authorization,
            cardLeve:50,
            level:0,
            memberData:[],
        };
    },
    computed: {
         computeMoney() {
            var totalMoney = new Number(this.card_one_money) * new Number(this.card_num)
            return totalMoney.toFixed(2)
        }
    },
    mounted() {
    // this.NotData()
    },
    created(){
        this.$store.commit('showLoading')
        this.getData()
        this.getMemberInfo()
    },
    methods: {
        getMemberInfo(){
            var that=this
            that.$axios.post('card/card_member_info',{
                'token':this.token
            })
            .then((res)=>{
                var info =res.data
                if(info.status == 200){
                    that.memberData=info.data.member
                    that.$store.commit('hideLoading')
                }
                else if(res.data.status == 999){
                    that.$store.commit('del_token'); //清除token
                    that.$router.push('/Home')
                }
                else{
                    that.$toast(info.msg)
                }
                that.$store.commit('hideLoading')
            })
        },

		/**
		 * 联系上级补卡
		 */
        // linkSJReissueCard(){		
        //    	var url ='card/patch_card_edit',
        //     	that = this
        //     that.$axios.post(url,{         // 传给后台的参数
        //         'token':that.token,
        //         'card_num':0
        //     })
        //     .then((res)=>{
        //         var info = res.data
        //         if(info.status==200){
        //             this.$router.push('/sjReissueCard')
        //         }
        //         else if(res.data.status == 999){
        //             that.$store.commit('del_token'); //清除token
        //             setTimeout(()=>{
        //                 this.$router.push('/Home')
        //             },1000)
        //         }else{
        //             that.$toast(res.data.msg)
        //         }
        //     })
        // },

        getData(){
           var url ='card/card_edit_now',
                that =this
            that.$axios.post(url,{         // 传给后台的参数
                'token':that.token
            })
            .then((res)=>{
                var info =res.data
                if(info.status==200){
                    that.cardInfo=info.data
                    that.levelInfo=info.data.level_info
                    // that.card_num =info.data.level_info.card_num
                    that.patch_list=info.data.patch_list
                    that.card_one_money=info.data.level_info.card_one_money
                    that.patch_img =info.data.level_info.patch_img
                    that.$store.commit('hideLoading')
                    switch(info.data.level_info.id){
                        case 2:
                            that.card_num = 5;
                            that.level=5;
                            break;
                        case 3:
                            that.card_num = 50;
                            that.level=50;
                            break;
                        case 4:
                            that.card_num = 100;
                            that.level=100;
                            break;
                        case 5:
                            that.card_num = 500;
                            that.level=500;
                            break;
                        default:
                            that.card_num =1;
                            that.level=1;
                    }
                }
                else if(res.data.status == 999){
                    that.$store.commit('del_token'); //清除token
                     setTimeout(()=>{
                        this.$router.push('/Home')
                    },100)
                }else{
                    that.$toast(res.data.msg)
                }
            })
        },

        reducingNumber(){
            var leve =this.level
            if(this.level==0){
                leve =1
            }
            var val =parseInt(this.card_num - leve) 
           if(val<this.level){
               val =this.level
           }
           this.card_num=val
        },
        changNumber(e){
            var _that =this
            var val =e.target.value;
            if(val<=1 || isNaN(val)){
                return _that.$toast('请输入正确的数量');
            }
            this.card_num=val
        },
        addNumber(){
            var leve =this.level
            if(this.level==0){
                leve =1
            }
            var val =parseInt(this.card_num) + leve
            this.card_num=val
        },
        saveInfo(){
            if(this.card_num<this.level){
                return this.$toast('补卡数量须大于'+this.level)
            }
            this.$router.push({
                path: '/Pay/PayWay?level_id=' + this.levelInfo.id+'&card_num='+this.card_num+'&isReissue=1'+'&cardType='+this.cardType+'&price='+this.computeMoney,
            })
        }
    },
    filters: {
        // 日期格式化
        formatDate: function (time) {
            let date = new Date(time*1000);
            let y = date.getFullYear();

            let MM = date.getMonth() + 1;
            MM = MM < 10 ? ('0' + MM) : MM;

            let d = date.getDate();
            d = d < 10 ? ('0' + d) : d;

            let h = date.getHours();
            h = h < 10 ? ('0' + h) : h;

            let m = date.getMinutes();
            m = m < 10 ? ('0' + m) : m;

            let s = date.getSeconds();
            s = s < 10 ? ('0' + s) : s;

            return y + '-' + MM + '-' + d + ' ' + h + ':' + m + ':' + s;
        }
    },
    components: {
        CardHeader
    }
};
</script>

<style lang="stylus" scoped>
    .reissue-card-wrap
        width 100%
        min-height 100%
        background url('/static/images/membershipCard/buka_bg.png') no-repeat
        background-size 100% 100%
    .content
        color #fff
        font-size 30px
        margin 47px 0 0
        padding-bottom 60px
        font-family PangMenZhengDao
        .res-card-a
            padding 0 86px 0
            box-sizing: border-box
            .-card-a-img
                width 580px
                margin-bottom 10px
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
                img 
                    width 100%
                    height 100%
                    border-radius 20px
            .-card-a-msg
                height 70px
                line-height 70px
                background rgba(255,255,255,0.17)
                border-radius 32px
                text-align center
                font-size 24px
                // margin-top 10px
                letter-spacing 3px
                padding 0 40px
                display inline-block
                transform scale(1,1.1)
                .delstyle
                    font-size 20px
        .res-card-b
            padding 74px 130px 90px
            font-family: 'SourceHanSansHWSC-Bold'
            .-card-b-title
                text-align center 
                font-size 30px
                margin-bottom 20px
                letter-spacing 3px
                .-b-msg-img
                    margin-right 21px
                    width 60px
                	height 60px
                    border solid 1px #f7f7f7
                .-b-list-msg
                    font-size 26px
                    .c-active2
                        font-size 30px
                        color #fff
                        margin-left 10px
                    .b-list-date
                        margin-top 5px
                        font-size 24px
            .t-center
                text-align center
            .look-more
                font-size 24px
                text-align center
                font-family "微软雅黑"
                color: #bfbfbf
        .link-wrap
            width 100%
            overflow hidden 
            .link
                float right
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
                margin-right 20px
        .price-wrap 
            padding 0 21px
            text-align center
            .-option-
                width 244px
                height 76px
                line-height 76px
                background-color #ffffff
                box-shadow 0px 10px 21px 0px rgba(203, 74, 179, 0.26)
                border-radius 20px
                border solid 3px #f376ae
                display flex
                color #f376ae
                justify-content center
                align-items center
                margin auto
                .iconfont
                    width 50px
                    height 100%
                .puls
                    border-left solid 3px #f376ae
                .subling
                    border-right solid 3px #f376ae 
                .inp
                    width 138px
                    height inherit
                    text-align center
                    font-weight bold
            .buy 
                font-weight 550
                line-height 65px
            .num 
                margin 50px 0 41px
                font-size 30px
                font-weight 550
    .btn 
        width 571px
        height 76px
        line-height 76px
        margin 0 auto
        text-align center
        background-image: linear-gradient(90deg, #df51c8 0%, #e964bb 62%, #f376ad 100%);
        border-radius 32px
        font-size 32px
        letter-spacing 7px
        color #fff
        font-family PangMenZhengDao
        box-shadow 0px 26px 38px 0px rgba(45, 67, 147, 0.3)
    .hint-msg
        width 571px
        margin 30px auto 0
        box-sizing border-box
        padding 14px
        font-size 24px
        letter-spacing 3px
        border-radius 4px
        background rgba(255,255,255,0.17)
        font-family PangMenZhengDao
        transform scale(1,1.1)
</style>



