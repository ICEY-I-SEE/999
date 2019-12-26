<template>
   <div class="japan-FreeZone">
        <div class="FreeZone-inner">
            <div class="f-title-wrap">
                <i slot="backBtn" class="iconfont icon-fanhui" @click="backAction()"></i>
                <!-- <img class="free-test" src="/static/images/freeZone/free_test.png" /> -->
                <div class="f-cont-title f-cont-title1">日本专区</div>
                <div class="f-cont-title f-cont-title2">敬请期待</div>
            </div>     
            <div class="content">
                
                <div class="free-zone-list">
                    <div class="inner-wrap"><img src="" /></div>
                    <div class="single-item" v-for="(item,index) in freeList" :key="index">
                        <div class="img-wrap">
                            <router-link :to="'/Details?goods_id='+item.goods_id">       
                                <img :src="item.img" /> 
                            </router-link>
                        </div>
                        <div class="main">
                            <div class="row-line">
                                <div class="price">
                                    <router-link :to="'/Details?goods_id='+item.goods_id">       
                                        <p class="discount-price">
                                            <!-- {{item.price!='0.00'?item.price:'免费商品'}} -->
                                            ￥{{item.price}}
                                        </p>
                                    </router-link>
                                </div>
                            </div>
                            <router-link :to="'/Details?goods_id='+item.goods_id">    
                                <h3 class="title">{{item.goods_name}} </h3>
                            </router-link>
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
export default {
    // name:'FreeZone',
    data(){
        return{
            page:1,
            isBotom:false,
            showMore:false,
            rows:8,
            freeList:[]
        }
    },
    created(){
        // this.$store.commit('showLoading')//加载loading
        // this.reqData();
    },
    methods:{
        /**
		* 请求数据
        */
       backAction(){
            this.$router.go(-1)
        },
        reqData(){
            var that =this
            let url = 'Goods/free_goods';
            this.$axios.post(url,{
                token:this.$store.getters.optuser.Authorization,
                page:this.page
            })
            .then((res) => {
                if(res.data.status === 200){
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
        },
        showMoreData(){
            this.$toast({message:'正在加载...',duration:1000})
            this.page ++;
            this.reqData()
        }
    }
}
</script>

<style lang="stylus" scoped>
.japan-FreeZone
    width 100%
    min-height 100%
    background-image: linear-gradient(#fff 0%, #e7e4fc 60%, #c2cffd 100%); 
    overflow: auto;
    .FreeZone-inner
        width 100%
        min-height 100%
        background url(/static/images/freeZone/everyday_bg2.png) no-repeat
        background-size 100% 230px
    .f-title-wrap
        padding 20px 24px 0
        line-height 80px
        text-align center
        position relative
        color #fff
        margin-bottom 187px
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
            letter-spacing 3px  
            transform scale(1,1.1)
            font-family PangMenZhengDao
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
        background-image: linear-gradient(#fff 0%, #e7e4fc 60%, #c2cffd 100%); 
        .free-zone-list
            width 100%
            // background-color #ffffff
            padding 30px 24px 0
            box-sizing border-box
            border-radius 32px
            box-shadow 0px 93px 54px 75px rgba(96, 113, 186, 0.15)
            min-height calc(100vh - 245px)
            overflow auto
            margin-bottom: 26px
            position relative
            .inner-wrap
                position absolute
                top 0
                left 0
                z-index 1000
                width 100%
                height 100%
                background url('/static/images/freeZone/riben.png') no-repeat
                background-size 100% 100%
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
                    a
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
                        display flex
                        align-items center
                        justify-content space-between
                        .price
                            .discount-price
                                font-size 17px
                                color #fff
                                letter-spacing 1px
                                background-image linear-gradient(90deg,#df51c8 0%, #e964bb 62%, #f376ad 100%)
                                border-radius 22px
                                text-align center
                                height 48px
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