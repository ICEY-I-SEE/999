<template>
   <div class="shipping-FreeZone">
       <headerSearch />
        <div class="FreeZone-inner">
            <div class="f-title-wrap">
                <!-- <div class="f-cont-title f-cont-title1">国货精选专区</div>
                <div class="f-cont-title f-cont-title2">低价抢购</div> -->
            </div>     
            <img class="bannerImg" v-lazy="banner" alt="">

            <div class="content" v-if="freeList.length > 0">
                <van-list
                v-model="loading"
                :finished="finished"
                :offset="600"
                @load="onLoad"
                :immediate-check="false"
                >
                    <ul class="free-zone-list">
                        <li class="single-item" v-for="(item,index) in freeList" :key="index" @click="linkToDetail(item.goods_id)">
                            <div class="img-wrap">
                                <div class="img-inn">       
                                    <img v-lazy="item.img" /> 
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
                        </li>

                        <!-- <div v-show="showMore" class="look-more-wrap" @click="showMoreData()">
                            <img src="/static/images/freeZone/down.png" />
                        </div> -->
                        <!-- 无数据 -->
                        <li class="end-wrap" v-show="isBotom">
                            <p>没有数据咯~~</p>
                        </li>
                    </ul>

                </van-list>
            </div>
            <div class="no-data" v-else>
                <!-- <img src="/static/images/public/no-shop.png" alt="" /> -->
                <p>暂无商品...</p>
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
            page:1,
            isBotom:false,
            rows:8,
            freeList:[],
            banner:'',
            loading: false,
            finished: false
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
            this.page = 1;
            this.freeList = [];
            this.loading = false,
            this.finished = false,
            this.isBotom = false,
            this.reqData();
        }
        
    },
    methods:{
        onLoad() {
            // 异步更新数据
            setTimeout(() => {
                this.reqData();
            }, 1000); 
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
						that.$router.push('/Login')
					},1000)
				}
				else{
					that.$toast(res.data.msg)
				}
            })
        }
    }
}
</script>

<style lang="stylus" scoped>
.shipping-FreeZone
    width 100%
    min-height 100vh
    background-image: linear-gradient(#fff 0%, #e7e4fc 60%, #c2cffd 100%);
    background-size 100%
    padding-bottom 20px
    .FreeZone-inner
        width 100%
        min-height 100%
        background url('/static/images/freeZone/everyday_bg2.png') no-repeat
        background-size 100% 230px
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
    .content
        position relative
        width 100%
        padding 0 24px 0
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
            font-size 18px
            color #888888
            text-align center
            margin 30px auto
            overflow hidden
            .more-msg
                font-size 28px
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