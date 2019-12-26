<template>
    <div class="sj-reissue-card-wrap">
        <!-- 头部组件 -->
        <CardHeader class="res-card-header" custom-title="联系上级补卡">
            <i slot="backBtn" class="iconfont icon-fanhui"></i>
        </CardHeader>
        <div class="content">
            <div class="res-card-a">
                <div class="-card-a-img"><img  :src="list.patch_img"/></div>
                <!-- <div class="-card-a-img"><img  src="/static/images/membershipCard/car.png"/></div> -->
                <!-- <p class="-card-a-msg">会员卡<span class="c-active">￥{{list.card_one_money}}</span></p> -->
                <!-- <p class="-card-a-msg">会员卡：<label class="delstyle">￥</label><span class="c-active">{{list.card_one_money}}</span></p>
                <p class="-card-a-msg">上级会员卡数量：<label class="delstyle">￥</label><span class="c-active">{{list.leader_num}}</span></p> -->
                <!-- <p class="-card-a-msg2">上级会员卡数量：{{list.leader_num}}</p> -->
            </div> 
            <div class="num-wrap">
                <p class="-card-a-msg">会员卡：<label class="delstyle">￥</label><span class="c-active">{{list.card_one_money}}</span></p>
                <p class="-card-a-msg">上级会员卡数量：<label class="delstyle">￥</label><span class="c-active">{{list.leader_num}}</span></p>
            </div>
            <div class="price-wrap">
                <div class="-option-">
                    <i class="subling iconfont icon-jian-" @click="reducingNumber()"></i>
                    <input class="inp" type="number" v-model="card_num" @change="changNumber($event)"/>
                    <i class="puls iconfont icon-jia" @click="addNumber()"></i>
                </div>
                <div class="btn" @click="saveInfo()">联系上级补卡</div>
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
            init_cart:1,
            list:[],
            c_num:this.$route.query.card_num,
            token:this.$store.getters.optuser.Authorization
        };
    },
    created(){
        this.getData();

        
        
    },
    mounted() {
    // this.NotData()
    },
    methods: {
        getData(){
           var url ='card/patch_card_edit',
                that =this
            that.$axios.post(url,{         // 传给后台的参数
                'token':that.token,
                'card_num':that.init_cart
            })
            .then((res)=>{
                var info =res.data
                // console.log(info.data)
                if(info.status==200){
                    this.list=info.data
                    if(typeof(this.c_num)!='undefined'){
                        // console.log(this.c_num)
                        that.card_num =that.c_num
                    }else{
                        that.card_num =info.data.card_num
                    }
                    // 
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

        reducingNumber(){
            var val =parseInt(this.card_num - 1) 
           if(val<=1){
               val =1
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
            var val =parseInt(this.card_num) + 1
            // val =new Number(val+ 1)
            this.card_num=val
        },
        saveInfo(){
            var url ='card/patch_card',
                that =this
            that.$axios.post(url,{         // 传给后台的参数
                'token':that.token,
                'card_num':that.card_num
            })
            .then((res)=>{
                var list =res.data
                if(list.status==200){
                    that.$toast(res.data.msg)
                    setTimeout(() => {
                        this.$router.push('/Home')
                    }, 2000);
                }
                else if(res.data.status == 999){
                    that.$store.commit('del_token'); //清除token
                   return setTimeout(() => {
                        this.$router.push('/Home')
                    }, 2000);
                }else{
                    that.$toast(res.data.msg)
                }
            })
        },
    },
    components: {
        CardHeader
    }
};
</script>

<style lang="stylus" scoped>
    // html
    //     width 100%
    //     height 100%
    //     background-image: linear-gradient(#eb8af7 0%, #9580ee 60%, #5078fc 100%);  
    .sj-reissue-card-wrap
        width 100%
        min-height 100%
        background url('/static/images/membershipCard/buka_bg.png') no-repeat
        background-size 100% 100%
    .sj-reissue-card-wrap /deep/ .TopHeader
        background #f3b93d
        border-color #f3b93d
    .content
        color #fff
        font-size 30px
        font-weight 550
        .res-card-a
            padding 0 86px 40px
            box-sizing: border-box
            .-card-a-img
                width 580px
                // height 331px
                margin-bottom 19px
                img 
                    width 100%
                    height 100%
                    border-radius 20px
        .num-wrap
            padding 0 21px 25px 0
            font-family: PangMenZhengDao;
            .-card-a-msg:nth-child(1)
                border-top-left-radius 0
                border-bottom-left-radius 0
                margin-right 30px
                text-align left 
            .-card-a-msg
                display inline-block
                padding 0 60px
                height 76px
                line-height 76px
                background rgba(255,255,255,0.17)
                border-radius 32px
                text-align center
                font-size 24px
                margin-top 22px
                letter-spacing 3px
                .delstyle
                    font-size 20px
                .c-active
                    font-size 28px
                    font-weight bold
        .price-wrap 
            position fixed
            bottom 50px
            z-index 111
            left 0
            text-align center
            width 100%
            box-sizing border-box
            font-family: PangMenZhengDao;
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
            .btn 
                width 571px
                height 76px
                line-height 76px
                margin 30px auto 0
                text-align center
                background-image linear-gradient(90deg, #fc8cfa 0%,  #c595fb 67%,   #b1a3fc 77%, #9db0fd 100%)
                border-radius 32px
                font-size 32px
                letter-spacing 7px
                color #fff
                box-shadow 0px 26px 38px 0px rgba(45, 67, 147, 0.36)
</style>


