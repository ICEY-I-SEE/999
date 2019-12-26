<template>
	<div class="Special">
        <!-- <div class="head_top">
            <van-icon color="white" size="24" name="arrow-left" />
            <div></div>
        </div> -->

        <CardHeader custom-title="">
            <i slot="backBtn" class="iconfont icon-fanhui"></i>
        </CardHeader>
        
        <div class="cont" v-if="dataList">

            <div class="box" v-for="(item,index) in dataList" :key="index">
                <img class="box-img"  @click="handelList(item.banner.cat_id)" v-lazy="item.banner.img" alt="">
                <swiper :options="swiperOption">
                    <swiper-slide v-for="(vm,index) in item.goods" :key="index">
                        <router-link :to="'/Details?goods_id='+vm.goods_id" tag="div">
                            <img class="swiper-img" v-lazy="vm.img" alt="">
                            <div  class="swiper-tit publicEllipsis">{{vm.goods_name}}</div>
                            <div class="swiper-price">
                                <div class="xj">￥{{vm.price}}</div>
                                <div class="yj">￥{{vm.original_price}}</div>
                            </div>
                        </router-link>
                    </swiper-slide>
                    <swiper-slide>
                        <router-link :to="'/category/CategoryLists?id='+item.banner.cat_id" tag="div" class="lookMore">查看更多<img src="/static/images/special/re.png" alt=""></router-link>
                    </swiper-slide>
                </swiper>
            </div>

            <div class="noMore">没有更多了</div>

        </div>
	</div>
</template>

<script>
import CardHeader from "@/pages/common/header/NewHeader";
export default {
    name: "Special",
    components: {
        CardHeader,
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
            this.$router.push('/category/CategoryLists?id='+id)
        },
		requestData(){
            let url = 'index/zhuan_index';
            this.$axios.post(url,{
                type:1
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
						this.$router.push('/Home')
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
.Special
    width 100%
    min-height 100vh
    background #342DA8
    .head_top
        padding 30px 24px 0 24px
        line-height 80px
        display flex
        justify-content space-between
    .cont
        background url('/static/images/special/SpecialBgs.png') no-repeat
        background-size 100%
        padding 440px 16px 0
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
