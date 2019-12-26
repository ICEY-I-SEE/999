<template>
   <div class="shipping-FreeZone" :style="bg">
       <headerSearch />
       <div class="FreeZone-inner" :style="bg" >

            <!-- <img class="bannerImg" :src="banner" alt=""> -->
            <div :class="typeId==59?'lk':typeId==58?'boq':typeId==56?'ys':typeId==57?'zs':typeId==48?'jj':typeId==65?'jfx':typeId==66?'skii':typeId==49?'wz':typeId==74?'cpb':typeId==69?'mac':typeId==73?'whoo':typeId==81?'xhx':typeId==72?'da':typeId==80?'xne':typeId==76?'sll':typeId==82?'hy':typeId==79?'hln':typeId==77?'qb':typeId==78?'amn':typeId==70?'hl':typeId==71?'jys':'mr'">

                <div class="content" :class="typeId==49?'wz-content':''"  v-if="freeList.length >0">

                <van-list
                v-model="loading"
                :finished="finished"
                :offset="300"
                @load="onLoad"
                :immediate-check="false"
                >
            
                <div class="free-zone-list">

                    <div class="single-item" v-for="(item,index) in freeList" :key="index" @click="linkToDetail(item.goods_id)">
                        <div class="img-wrap">
                            <div class="img-inn">       
                                <img :src="item.img" /> 
                            </div>
                        </div>
                        <div class="main">
                            <div class="row-line">
                                <div class="price">
                                    <div class="img-inn">       
                                        <p class="discount-price">
                                            ￥{{item.price}}
                                            <!-- {{item.price!='0.00'?item.price:'免费商品'}} -->
                                        </p>
                                        <del class="del-price">￥{{item.original_price}}</del>
                                    </div>
                                </div>
                            </div>
                            <div class="img-inn">    
                                <h3 class="title">{{item.goods_name}} </h3>
                            </div>
                        </div>
                        
                    </div>

                    <!-- <div v-show="showMore" class="look-more-wrap" @click="showMoreData()">
                        <img src="/static/images/freeZone/down.png" />
                    </div> -->

                    <!-- 无数据 -->
                    <!-- <div class="end-wrap" v-show="isBotom">
                        <p>没有数据咯~~</p>
                    </div> -->
                    <div class="end-wrap" v-show="isBotom">
                        <p>没有数据咯~~</p>
                    </div>
                </div>

                </van-list>
            
            </div>
            <div class="no-data" v-else>
                <!-- <img src="/static/images/public/no-shop.png" alt="" /> -->
                <p>暂无商品...</p>
            </div>


            </div>
            
            
        </div>
   </div>
</template>
<script>
import headerSearch from '@/pages/common/header/headerSearch'
export default {
    name:'FreeZone',
    data(){
        return{
            typeId:'',
            page:1,
            isBotom:false,
            // showMore:false,
            rows:8,
            freeList:[],
            banner:'',
            loading: false,
            finished: false
        }
    },
    computed:{
        bg(){
            let color;
            switch(this.typeId){
                case '59':
                    color = "#A2B9CC"
                    break;
                case '58':
                    color = "#16404E"
                    break;
                case '56':
                    color = "#D1B07E"
                    break;
                case '57':
                    color = "#C0E9F9"
                    break;
                case '48':
                    color = "#EBDED1"
                    break;
                case '65':
                    color = "#E6717C"
                    break;
                case '66':
                    color = "#AC1816"
                    break;
                case '74':
                    color = "#ECDCCB"
                    break;
                case '69':
                    color = "#D9D1CE"
                    break;
                case '73':
                    color = "#FEF4D1"
                    break;
                case '81':
                    color = "#E2BF9A"
                    break;
                case '72':
                    color = "#B7812C"
                    break;
                case '80':
                    color = "#EAEAEC"
                    break;
                case '76':
                    color = "#4D2567"
                    break;
                case '82':
                    color = "#481C63"
                    break;
                case '79':
                    color = "#ECDECF"
                    break;
                case '77':
                    color = "#CB9B98"
                    break;
                case '78':
                    color = "#363636"
                    break;
                case '70':
                    color = "#266765"
                    break;
                case '71':
                    color = "#F2A64F"
                    break;
                default:
                    color = "#6A42CC"
            }
            let bgcolor = "background:"+color;
            return bgcolor;
        }
    },
    components:{
        headerSearch
    },
    activated(){
        if(sessionStorage.getItem('categoryListScroll')){
            document.documentElement.scrollTop = sessionStorage.getItem('categoryListScroll')
            sessionStorage.removeItem('categoryListScroll')
        }else{
            this.$store.commit('showLoading')//加载loading
            this.typeId = this.$route.query.id
            this.page = 1;
            this.freeList = [];
            this.loading = false,
            this.finished = false,
            this.isBotom = false,
            this.reqData();
        }
        
    },
    methods:{
        onLoad(){
            var _this = this;
            setTimeout(() => {
                _this.reqData();
            }, 500); 
        },
        linkToDetail(goods_id){
            sessionStorage.setItem('categoryListScroll',document.documentElement.scrollTop)
			this.$router.push('/Details?goods_id='+goods_id)
        },

        backAction(){
            this.$router.go(-1)
        },
        reqData(){
            var that =this;
            let url = 'goods/goods_list';
            this.$axios.post(url,{
                token:this.$store.getters.optuser.Authorization,
                cat_id:this.$route.query.id,
                page:this.page
            })
            .then((res) => {
                let info = res.data
                if(info.status === 200){
                    var lastPage = info.data.lastPage;
                    that.banner = info.data.banner.img;
                    info.data.list.forEach(item => {
                        that.freeList.push(item);
                    });
                    if(this.page >= lastPage){
                        this.isBotom = true;
                        this.finished = true;
                    }
                    

                    this.loading = false;
                    this.page ++;

                    that.$store.commit('hideLoading');
                    
                }
                else if(res.data.status == 999){
                    that.$store.commit('hideLoading');
					that.$store.commit('del_token'); //清除token
					setTimeout(()=>{
						that.$router.push('/Home')
					},1000)
				}
				else{
					that.$toast(res.data.msg)
				}
            })
        }
        // showMoreData(){
        //     this.$toast({message:'正在加载...',duration:1000})
        //     this.page ++;
        //     this.reqData()
        // }
    }
}
</script>

<style lang="stylus" scoped>
/deep/  .f-title-wrap
            padding 0 20px 20px !important
.shipping-FreeZone
    width 100%
    min-height 100%
    padding-bottom 40px
    .FreeZone-inner
        border-radius 40px 40px 0 0
        margin-top: 94px;
        width 100%
        min-height 100%
        position relative
        z-index 9999
        border-radius: 14px;
        overflow: hidden;
    .mr
        background url('/static/images/special/SpecialBgs.png') no-repeat
        background-size 100%
    .jj
        background url('/static/images/bg/jj.png') no-repeat
        background-size 100%
    .boq
        background url('/static/images/bg/boq.png') no-repeat
        background-size 100%
    .lk
        background url('/static/images/bg/lks.png') no-repeat
        background-size 100%
    .ys
        background url('/static/images/bg/ys.png') no-repeat
        background-size 100%
    .zs
        background url('/static/images/bg/zst.png') no-repeat
        background-size 100%
    .jfx
        background url('/static/images/bg/jfxs.png') no-repeat
        background-size 100%
    .skii
        background url('/static/images/bg/skii.png') no-repeat
        background-size 100%
    .wz
        background url('/static/images/bg/wz.png') no-repeat
        background-size 100%
    .cpb
        background url('/static/images/bg/cpb.png') no-repeat
        background-size 100%
    .mac
        background url('/static/images/bg/mac.png') no-repeat
        background-size 100%
    .whoo
        background url('/static/images/bg/whoo.png') no-repeat
        background-size 100%
    .xhx
        background url('/static/images/bg/xhx.png') no-repeat
        background-size 100%
    .da
        background url('/static/images/bg/da.png') no-repeat
        background-size 100%
    .hln
        background url('/static/images/bg/hln.png') no-repeat
        background-size 100%
    .hy
        background url('/static/images/bg/hy.png') no-repeat
        background-size 100%
    .qb
        background url('/static/images/bg/qb.png') no-repeat
        background-size 100%
    .sll
        background url('/static/images/bg/sll.png') no-repeat
        background-size 100%
    .xne
        background url('/static/images/bg/xne.png') no-repeat
        background-size 100%
    .amn
        background url('/static/images/bg/amn.png') no-repeat
        background-size 100%
    .jys
        background url('/static/images/bg/jys.png') no-repeat
        background-size 100%
    .hl
        background url('/static/images/bg/hl.png') no-repeat
        background-size 100%
    .kys
        background url('/static/images/bg/kys.png') no-repeat
        background-size 100%
    .bannerImg
        width 706px
        margin 0 auto 20px auto
        display block
        height:260px;
        border-radius:10px;
    .f-title-wrap
        padding 20px 24px 0
        line-height 80px
        text-align center
        position relative
        color #fff
        margin-bottom 120px
        .icon-fanhui
            position absolute
            left 24px
            font-size 42px
        .free-test
            width 300px
        .f-cont-title
            position absolute
            top 149px
            width 298px
            height 56px
            line-height 58px
            border-top-left-radius 32px
            border-top-right-radius 32px
            text-align center
            font-size 30px
            letter-spacing 2px  
            transform scale(1,1.1)
            font-family PangMenZhengDao
            font-weight:700
            font-weight:bold
        .f-cont-title1
            left 27px
            margin-left 24px
            background-image linear-gradient(90deg,#fc8cfa 0%,  #a281ed 59%,  #737cf6 84%,  #4377ff 100%)
        .f-cont-title2
            right 27px
            margin-right 24px
            background-image: linear-gradient(90deg, #df51c8 0%, #e964bb 62%, #f376ad 100%);
    .wz-content
        padding 200px 24px 26px !important
    .content
        position relative
        width 100%
        padding 420px 24px 0
        box-sizing border-box
        // height calc(100vh - 235px)
        // background-image: linear-gradient(#fff 0%, #e7e4fc 60%, #c2cffd 100%); 
        .free-zone-list
            background-color #ffffff
            padding 30px 24px 0
            box-sizing border-box
            border-radius 32px
            min-height calc(100vh - 235px)
            margin-bottom: 26px
            display flex
            flex-wrap wrap
            .single-item
                width 48.5%
                max-height 430px
                background-color #fdf1fe
                border-radius 8px
                overflow hidden
                margin 0 3% 22px 0
                padding 20px 0
                box-sizing border-box
                &:nth-child(2n)
                    margin-right 0
                .img-wrap
                    margin 0 auto
                    width 288px
                    height 288px
                    border-radius 10px
                    overflow hidden
                    .img-inn
                        width 100%
                        height 100%
                        display block
                        img 
                            width 100%
                            height 100%
                            display block
                            border-radius 10px
                .main
                    padding 0 20px
                    margin-top 10px
                    .title
                        width 100%
                        font-size 22px
                        color #151515
                        overflow hidden    
                        text-overflow ellipsis    
                        white-space nowrap
                        margin 15px 0 0
                    .row-line
                        .price
                            .img-inn
                                display flex
                                align-items center
                                justify-content space-between
                                .del-price
                                    color: #888
                                    margin-left 10px
                                    font-size 22px
                                    font-family 'SourceHanSansHWSC-Bold'
                            .discount-price
                                font-size 22px
                                color #fff
                                letter-spacing 1px
                                background-image linear-gradient(90deg,#df51c8 0%, #e964bb 62%, #f376ad 100%)
                                border-radius 22px
                                text-align center
                                // height 48px
                                line-height 48px
                                font-weight normal
                                width 140px
                                font-family 'SourceHanSansHWSC-Bold'
                            .original-price
                                font-size 24px
                                color #a1a1a1
                        .add-cart
                            width 50px
                            height 50px
                            background url(/static/images/home/add-cart.png) no-repeat
                            background-size 100%
        .look-more-wrap
            position absolute
            bottom 20px
            left 24px
            right 24px
            text-align center
            width 702px
            // background rgba(255,255,255,0.5)
            img 
                width 100%
                // max-height 150px
        .end-wrap
            width 100%
            color #888888
            text-align center
            margin 30px auto
            overflow hidden
            .more-msg
                font-size 30px
                color #666
    .no-data
        text-align center
        font-size 30px
        padding-top 200px
        font-weight bold
        color #fff
        img
            display block
            width 200px
            height 200px
</style>