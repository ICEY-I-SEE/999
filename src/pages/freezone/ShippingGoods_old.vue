<template>
   <div class="FreeZone">
        <!-- 头部组件 -->
        <TopHeader custom-title="限量抢购专区">
            <i slot="backBtn" class="iconfont icon-fanhui"></i>
        </TopHeader>

        <div class="content">
            <div class="free-zone-list">
                <div class="single-item" v-for="(item,index) in freeList" :key="index">
                    <div class="img-wrap">
                        <router-link :to="'/Details?goods_id='+item.goods_id">       
                            <img :src="item.img" /> 
                        </router-link>
                    </div>
                    <div class="main">
                        <router-link :to="'/Details?goods_id='+item.goods_id">    
                            <h3 class="title">{{item.goods_name}} </h3>
                        </router-link>
                        <div class="row-line">
                            <div class="price">
                                <p class="discount-price">
                                    ￥{{item.price}}
                                </p>
                                <!-- <p class="original-price"><del>原价:{{item.original_price}}</del></p> -->
                            </div>
                            <!-- <div class="add-cart"></div> -->
                        </div>
                    </div>
                </div>
            </div>


            <div v-show="showMore" class="end-wrap"  @click="showMoreData()">
                <p class="more-msg">点击加载更多</p>
            </div>
            <div class="end-wrap" v-show="isBotom">
                <p>没有数据咯~~</p>
            </div>

            <!-- 无数据 -->
            <div class="none" v-show="page==1 && (freeList.length <1)">
                <img src="/static/images/public/none.png"/>
                <p>您还没相关记录</p>
            </div>
        </div>
   </div>
</template>

<script>
import TopHeader from "@/pages/common/header/TopHeader"
export default {
    // name:'shipping_goods',
    components: {
		TopHeader,
    },
    data(){
        return{
            page:1,
            freeList:[],
            isBotom:false,
            showMore:false,
            rows:10
        }
    },
    created(){
        this.$store.commit('showLoading')//加载loading
        this.reqData();
    },
    methods:{
        /**
		* 请求数据
        */
        reqData(){
            let that =this
            let url = 'Goods/shipping_goods';
            that.$axios.post(url,{
                token:that.$store.getters.optuser.Authorization,
                page:that.page
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
            this.$toast('正在加载...')
            this.page ++;
            this.reqData()
        }
    }
}
</script>

<style lang="stylus" scoped>

.FreeZone
    .content
        margin-top 20px
        padding 0 24px
        box-sizing border-box
        .free-zone-list
            display flex
            flex-wrap wrap
            .single-item
                width 49%
                height 476px
                background-color #fff
                border-radius 8px
                overflow hidden
                margin 0 2% 22px 0
                padding 10px
                box-sizing border-box
                &:nth-child(2n)
                    margin-right 0
                .img-wrap
                    width 320px
                    height 320px
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
                        margin 15px 0
                    .row-line
                        display flex
                        align-items center
                        justify-content space-between
                        .price
                            .discount-price
                                font-size 30px
                                color #ed0d0d
                            .original-price
                                font-size 24px
                                color #a1a1a1
                        .add-cart
                            width 50px
                            height 50px
                            background url(/static/images/home/add-cart.png) no-repeat
                            background-size 100%
        .end-wrap
            font-size 18px
            color #888888
            text-align center
            margin 30px auto
            .more-msg
                font-size 28px
                color #666
        .none
            text-align center
            margin-top 10%
            font-size 28px
            img
                width 80px
            p
                margin 20px auto   
</style>
