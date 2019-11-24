<template>
   <div class="RushBuy">
       <div class="FreeZone-inner">
            <div class="f-title-wraps">
                <i slot="backBtn" class="iconfont icon-fanhui" @click="backAction()"></i>
            </div>     
            
            <img class="bannerImg" :src="banner" alt="">

            <div class="tab">
                <div class="f-cont-title">精选专区</div>
                <div class="f-cont-title">低价抢购</div>
            </div>     

            <div class="content">
                <div class="free-zone-list">
                    <div class="single-item" v-for="(item,index) in freeList" :key="index" @click="handelShop(item.goods_id)">
                        <div class="img-wrap">
                            <div class="img-inn">       
                                <img :src="item.img" /> 
                            </div>
                        </div>
                        <div class="main">
                            <div class="img-inn">    
                                <h3 class="title">{{item.goods_name}} </h3>
                            </div>
                            <div class="row-line">
                                <div class="price">
                                    <div class="img-inn">       
                                        <div>￥{{item.price}}</div>
                                        <del class="del-price">￥{{item.original_price}}</del>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                    </div>
                    <div v-show="showMore" class="look-more-wrap" @click="showMoreData()">
                        <img src="/static/images/freeZone/down.png" />
                    </div>
                    <!-- 无数据 -->
                    <div class="end-wrap" v-show="isBotom">
                        <p>没有数据咯~~</p>
                    </div>
                </div>
            
            </div>
       </div>
   </div>
</template>
<script>
import CardHeader from "@/pages/common/header/NewHeader";
export default {
    name:'RushBuy',
    data(){
        return{
            page:1,
            isBotom:false,
            showMore:false,
            rows:8,
            freeList:[],
            localPage:0,
            sTop:0,
            token:this.$store.getters.optuser.Authorization,
            banner:''
        }
    },
    components:{
        CardHeader
    },
    created(){
        
        this.$store.commit('showLoading')//加载loading
        this.reqData();
        
        
    },
    methods:{
        handelShop(goods_id){
			this.$router.push('/Details?goods_id='+goods_id)
		},
        /**
		* 请求数据
        */
       linkToDetail(goods_id){
            this.$router.push('/Details?goods_id='+goods_id)
        },

       backAction(){
            this.$router.go(-1)
        },
        reqData(sTop){
            var that =this
            let url = 'goods/goods_list';
            this.$axios.post(url,{
                token:this.$store.getters.optuser.Authorization,
                cat_id:this.$route.query.id,
                page:this.page
            })
            .then((res) => {
                if(res.data.status === 200){
                    this.banner = res.data.data.banner.img
                    if(that.page == 1){ 
                        that.freeList = res.data.data.list 
                        if(res.data.data.list.length>=this.rows){
                            that.showMore=true
                        }
                    }else{
                        if(res.data.data.list.length > 0){        //如果有数据,拼接数组
                            that.freeList =that.freeList.concat(res.data.data.list)
                            that.showMore=true
                        }else{
                            that.isBotom=true
                            that.showMore=false
                        }
                    }
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
                that.$store.commit('hideLoading');
            })
        },
        showMoreData(){
            this.$toast({message:'正在加载...',duration:1000})
            this.page ++;
            var sTop =document.documentElement.scrollTop || document.body.scrollTop || window.pageYOffset
            this.reqData(sTop)
        }
    }
}
</script>

<style lang="stylus" scoped>
.RushBuy
    width 100%
    min-height 100%
    background-image: linear-gradient(#fff 0%, #e7e4fc 60%, #c2cffd 100%); 
    overflow: auto;
    .FreeZone-inner
        width 100%
        min-height 100%
        background url(/static/images/freeZone/everyday_bg2.png) no-repeat
        background-size 100% 230px
    .bannerImg
        width 706px
        margin 0 auto
        display block
        height:260px;
        border-radius:10px;
    .tab
        padding 0 24px
        margin-top 56px
        display flex
        align-items center
        justify-content space-around
        line-height 60px
        font-weight bold
        color #fff
        div
            width 298px
            background:linear-gradient(90deg,rgba(223,81,200,1) 0%,rgba(243,118,173,1) 100%);
            border-radius:32px 32px 0 0
            text-align center
            color #fff
            font-size 30px
            &:nth-child(odd)
                background:linear-gradient(90deg,rgba(252,140,250,1) 0%,rgba(162,129,237,1) 59%,rgba(67,119,255,1) 100%);
    .f-title-wraps
        padding 20px 24px 0
        line-height 80px
        text-align center
        position relative
        color #fff
        margin-bottom 80px
        .icon-fanhui
            position absolute
            left 24px
            font-size 42px
        .free-test
            width 300px
        .f-cont-title
            position absolute
            top 149px
            left 27px
            width 298px
            height 56px
            line-height 58px
            background-image linear-gradient(90deg,#fc8cfa 0%,  #a281ed 59%,  #737cf6 84%,  #4377ff 100%)
            border-top-left-radius 32px
            border-top-right-radius 32px
            text-align center
            margin-left 24px
            font-size 30px
            // letter-spacing 1px  
            transform scale(1,1.1)
            font-family PangMenZhengDao
            font-weight:bold
    .content
        position relative
        width 100%
        padding 0 24px 0
        box-sizing border-box
        // background-image: linear-gradient(#fff 0%, #e7e4fc 60%, #c2cffd 100%);  
        .free-zone-list
            width 100%
            background-color #ffffff
            padding 30px 24px 0
            box-sizing border-box
            border-radius 32px
            // box-shadow 0px 93px 54px 75px rgba(96, 113, 186, 0.15)
            min-height calc(100vh - 235px)
            overflow: auto;
            margin-bottom: 26px
            .single-item
                width 48.5%
                float left
                background-color #fdf1fe
                border-radius 8px
                overflow hidden
                margin 0 3% 22px 0
                padding 20px
                box-sizing border-box
                &:nth-child(2n)
                    margin-right 0
                .img-wrap
                    width 100%
                    max-width 288px
                    height 288px
                    border-radius 10px
                    overflow hidden
                    .img-inn
                        width 100%
                        height 100%
                        display block
                        img 
                            max-width 100%
                            max-height 100%
                            display block
                            margin 0 auto
                            border-radius 10px
                .main
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
</style>
<style lang="stylus">
    body,html
        width 100%
        height 100%
    #app
        width 100%
        height 100%
</style>