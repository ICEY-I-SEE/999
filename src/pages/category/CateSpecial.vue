<template>
	<div class="CateSpecial">
        <headerSearch />
        <div class="FreeZone-inner">

             <div class="cont">

                <div class="box" v-if="dataList.goods1">
                    <img class="box-img"  @click="handelList(dataList.goods1.banner.cat_id)" :src="dataList.goods1.banner.img" alt="">
                    <swiper :options="swiperOption">
                        <swiper-slide v-for="(item,index) in dataList.goods1.goods" :key="index">
                            <router-link :to="'/Details?goods_id='+item.goods_id" tag="div">
                                <img class="swiper-img" :src="item.img" alt="">
                                <div  class="swiper-tit publicEllipsis">{{item.goods_name}}</div>
                                <div class="swiper-price">
                                    <div class="xj">￥{{item.price}}</div>
                                    <div class="yj">￥{{item.original_price}}</div>
                                </div>
                            </router-link>
                        </swiper-slide>
                        <swiper-slide>
                            <router-link :to="'/home/RushBuy?id='+dataList.goods1.banner.cat_id" tag="div" class="lookMore">查看更多<img src="/static/images/special/re.png" alt=""></router-link>
                        </swiper-slide>
                    </swiper>
                </div>

                <div class="box" v-if="dataList.goods2">
                    <img class="box-img"  @click="handelList(dataList.goods2.banner.cat_id)" :src="dataList.goods2.banner.img" alt="">
                    <swiper :options="swiperOption">
                        <swiper-slide v-for="(item,index) in dataList.goods2.goods" :key="index">
                            <router-link :to="'/Details?goods_id='+item.goods_id" tag="div">
                                <img class="swiper-img" :src="item.img" alt="">
                                <div  class="swiper-tit publicEllipsis">{{item.goods_name}}</div>
                                <div class="swiper-price">
                                    <div class="xj">￥{{item.price}}</div>
                                    <div class="yj">￥{{item.original_price}}</div>
                                </div>
                            </router-link>
                        </swiper-slide>
                        <swiper-slide>
                            <router-link :to="'/home/RushBuy?id='+dataList.goods2.banner.cat_id" tag="div" class="lookMore">查看更多<img src="/static/images/special/re.png" alt=""></router-link>
                        </swiper-slide>
                    </swiper>
                </div>

                <div class="box" v-if="dataList.goods3">
                    <img class="box-img"  @click="handelList(dataList.goods3.banner.cat_id)"  :src="dataList.goods3.banner.img" alt="">
                    <swiper :options="swiperOption">
                        <swiper-slide v-for="(item,index) in dataList.goods3.goods" :key="index">
                            <router-link :to="'/Details?goods_id='+item.goods_id" tag="div">
                                <img class="swiper-img" :src="item.img" alt="">
                                <div  class="swiper-tit publicEllipsis">{{item.goods_name}}</div>
                                <div class="swiper-price">
                                    <div class="xj">￥{{item.price}}</div>
                                    <div class="yj">￥{{item.original_price}}</div>
                                </div>
                            </router-link>
                        </swiper-slide>
                        <swiper-slide>
                            <router-link :to="'/home/RushBuy?id='+dataList.goods3.banner.cat_id" tag="div" class="lookMore">查看更多<img src="/static/images/special/re.png" alt=""></router-link>
                        </swiper-slide>
                    </swiper>
                </div>

                <div class="box" v-if="dataList.goods4">
                    <img class="box-img"  @click="handelList(dataList.goods4.banner.cat_id)"  :src="dataList.goods4.banner.img" alt="">
                    <swiper :options="swiperOption">
                        <swiper-slide v-for="(item,index) in dataList.goods4.goods" :key="index">
                            <router-link :to="'/Details?goods_id='+item.goods_id" tag="div">
                                <img class="swiper-img" :src="item.img" alt="">
                                <div  class="swiper-tit publicEllipsis">{{item.goods_name}}</div>
                                <div class="swiper-price">
                                    <div class="xj">￥{{item.price}}</div>
                                    <div class="yj">￥{{item.original_price}}</div>
                                </div>
                            </router-link>
                        </swiper-slide>
                        <swiper-slide>
                            <router-link :to="'/home/RushBuy?id='+dataList.goods3.banner.cat_id" tag="div" class="lookMore">查看更多<img src="/static/images/special/re.png" alt=""></router-link>
                        </swiper-slide>
                    </swiper>
                </div>

                <div class="noMore">没有更多了</div>

            </div>
        </div>

	</div>
</template>

<script>
import CardHeader from "@/pages/common/header/NewHeader";
import headerSearch from '@/pages/common/header/headerSearch';
export default {
    name: "CateSpecial",
    components: {
        CardHeader,
        headerSearch
    },
	data() {
		return {
            token: this.$store.getters.optuser.Authorization,
            swiperOption: {
                slidesPerView: 3.5,
                spaceBetween: 20
            },
            dataList:[]
		};
	},
  	created(){
		this.$store.commit('showLoading')//加载loading
		this.requestData();
	},
	methods:{
        handelList(id){
            this.$router.push('/home/RushBuy?id='+id)
        },
		requestData(){
            let url = 'index/zhuan_index';
            this.$axios.post(url,{
                type:2
            })
            .then( (res) => {
                if(res.data.status === 200){
                    var info =res.data.data;
                    this.dataList = info;
                    this.$store.commit('hideLoading');
				}
				else if(res.data.status == 999){
					this.$store.commit('del_token'); //清除token
					setTimeout(()=>{
						this.$router.push('/Login')
					},1000)
				}
				else{
					this.$toast(res.data.msg)
				}
            })
            .catch((error) => {
                alert('请求错误:'+ error)
			})
			
		},
	},
	filters:{
		//格式化金钱
        formatMoney:function(val){
            return "¥" + Number(val).toFixed(2)
        }
	},
	watch: {
		
	}
	
};
</script>


<style lang="stylus" scoped>
.CateSpecial
    width 100%
    min-height 100vh
    background-image: linear-gradient(#fff,#e7e4fc 60%,#c2cffd);
    .FreeZone-inner
        width 100%
        min-height 100%
        background url('/static/images/freeZone/everyday_bg2.png') no-repeat
        background-size 100% 230px
    .head_top
        padding 30px 24px 0 24px
        line-height 80px
        display flex
        justify-content space-between
    .cont
        padding 200px 16px 0 16px
        .box
            padding 14px
            background #fff
            border-radius 18px
            margin-bottom 30px
            .box-img
                height 234px
                width  100%
                margin-bottom 20px
            .lookMore
                width 40px 
                padding 10px
                height:202px;
                background:rgba(238,238,238,1);
                border-radius:28px;
                text-align center
                color #6756EA
                display flex
                flex-wrap wrap
                justify-content center
                align-items center
                img
                    display block
                    width 32px
                    height 32px
            .swiper-img
                display block
                width 100%
                height 168px
            .swiper-tit
                font-size 22px
                padding-top 10px
                margin-bottom 10px
            .swiper-price
                display flex
                align-items flex-end
                .xj
                    font-size 20px
                    color #FF0010
                    margin-right 10px
                .yj
                    font-size 16px
                    color #999999
                    text-decoration line-through
        .noMore
            padding-bottom 20px
            color #fff
            text-align center
            font-szie 26px
</style>
