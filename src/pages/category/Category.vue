<template>
	<div class="Category">
		<headerSearch />
		<div class="pack">
			<ul class="cate">
				<li @click="handelCate(item.cat_id,index)" :class="cateIndex==item.cat_id?'line':''" v-for="(item,index) in cateTar" :key="index">{{item.cat_name}}</li>
			</ul>
			<div class="shopCont">

				<div class="cateTitBg" v-show="cateIndex == 24">会员免费领取专区</div>
				<div class="cateTitBg" v-show="cateIndex == 54">经理人独享专区</div>
				<p class="ide" v-show="cateIndex == 34|| cateIndex == 32|| cateIndex == 31 || cateIndex == 46 || cateIndex == 55">分类</p>
				
				<!-- 每日经理 -->
				<ul class="likeList" v-show="cateIndex == 54 || cateIndex==24">
					<li @click="handelDetails(item.goods_id)" v-for="(item,index) in cateList.goods" :key="index">
						<img v-lazy="item.img" alt="">
						<p class="publicEllipsis">{{item.goods_name}}</p>
						<p class="price">￥{{item.price}}</p>
					</li>
				</ul>

				<!-- 美妆家居 -->
				<ul class="cateList" v-show="cateIndex == 31 || cateIndex == 46  || cateIndex == 55">
					<li @click="handelCategoryList(item.cat_id)" v-for="(item,index) in cateList.category" :key="index">
						<img :src="item.img" alt="">
						<p>{{item.cat_name}}</p>
					</li>
				</ul>

				<!-- 食品母婴 -->
				<div class="foodList" v-show="cateIndex == 34 || cateIndex == 32">
					<div class="foodListWrap" v-for="(item,index) in cateList.category" :key="index">
						<div class="tit">
							<div class="text">{{item.cat_name}}</div>
							<div @click="handelCategoryList(item.cat_id)" class="more">
								<div>更多</div>
								<van-icon name="arrow" />
							</div>
						</div>
						<ul>
							<li @click="handelDetails(vm.goods_id)"  v-for="(vm,index) in item.goods" :key="index">
								<img v-lazy="vm.img" alt="">
							</li>
						</ul>
					</div>
				</div>

				
				<p class="ide" v-show="cateIndex == 34|| cateIndex == 32|| cateIndex == 31 || cateIndex == 46 || cateIndex == 55">猜你喜欢</p>
				<ul class="likeList" v-show="cateIndex == 34|| cateIndex == 32|| cateIndex == 31 || cateIndex == 46 || cateIndex == 55">
					<li @click="handelDetails(item.goods_id)"  v-for="(item,index) in hostList" :key="index">
						<img v-lazy="item.img" alt="">
						<p class="publicEllipsis">{{item.goods_name}}</p>
						<p class="price">￥{{item.price}}</p>
					</li>
				</ul>

			</div>
		</div>
		
		
		<!-- 底部导航 -->
		<Navigate></Navigate>
	</div>
</template>

<script>
import TopHeader from "@/pages/common/header/TopHeaderNew"
import Navigate from "@/pages/common/footer/Navigate"
import headerSearch from '@/pages/common/header/headerSearch'
export default {
	name: "Category",
	components: {
		TopHeader,
		Navigate,
		headerSearch
	},
	data() {
		return {
			cateIndex:1,
			token: this.$store.getters.optuser.Authorization,
			cate:[
				{name:'每日一领',type:'1'},{name:'美妆个护',type:'2'},{name:'食品饮料',type:'3'},{name:'家居',type:'4'},{name:'母婴',type:'5'},{name:'经理人专属',type:'6'}
			],
			cateTar:[],
			cateList:[],
			hostList:[]
		};
	},
  	created(){
		this.$store.commit('showLoading');// 调用loading 
		this.requestData();//请求数据
	},
	methods:{
		handelDetails(goods_id){
			localStorage.setItem('categoryIndex',this.cateIndex)
			localStorage.setItem('pageScroll',document.documentElement.scrollTop)
			this.$router.push('/Details?goods_id='+goods_id)
		},
		handelCategoryList(cat_id){
			localStorage.setItem('categoryIndex',this.cateIndex)
			localStorage.setItem('pageScroll',document.documentElement.scrollTop)
			this.$router.push('/CategoryList?id='+cat_id)
		},
		handelCate(type,index){
		
			document.documentElement.scrollTop = 0;
			this.cateIndex = type;
			this.cateList = this.cateTar[index];
		},
		// 请求数据
        requestData(){
			let url = 'goods/categoryList';
			var that =this
            this.$axios.get(url)
            .then( (res) => {
				let status = res.data.status;
				let info = Object.freeze(res);
                if(status === 200){
					let cateList = info.data.data.category_list;
					this.cateTar = cateList;
					
					//返回当前页面到选择分类
					if(localStorage.getItem('categoryIndex')){
						this.cateIndex = localStorage.getItem('categoryIndex')
						cateList.forEach((element,index,arr) => {
							if(element.cat_id == this.cateIndex){
								this.cateList = cateList[index];
							}
						});
						localStorage.removeItem('categoryIndex')
					}else{
						this.cateIndex = cateList[0].cat_id;
						this.cateList = cateList[0];
					}
					this.hostList = info.data.data.hot_goods;
					
					this.$nextTick(function(){
						if(localStorage.getItem('pageScroll')){
							document.documentElement.scrollTop = localStorage.getItem('pageScroll')
							localStorage.removeItem('pageScroll')
						}
					})
					
					

					this.$store.commit('hideLoading');

                }else if(info.data.status == 999){
					this.$store.commit('del_token'); //清除token
					setTimeout(()=>{
						this.$router.push('/Login')
					},1000)
				}
				else{
					this.$toast(info.data.msg)
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
.Category
	width 100%
	background linear-gradient(#f1f1f1 0%, #e2e1f1 60%, #e1e4f7 100%)
	.pack
		width 100%
		padding-top 74px
		.cate
			position fixed
			left 0
			top 74px
			bottom 0
			background #fff
			width 200px
			overflow auto
			padding-top 40px
			padding-bottom 180px
			li
				width 160px
				margin 0 auto
				text-align center
				margin-top 52px
				line-height:60px;
				background:rgba(255,255,255,1);
				box-shadow:0px 0px 11px 7px rgba(222,204,237,0.51);
				border-radius:30px;
			.line
				background:linear-gradient(45deg,rgba(146,115,248,1),rgba(231,141,251,1),rgba(146,115,248,1),rgba(101,123,255,1));
				color #fff
		.shopCont
			min-height calc(100vh - 270px)
			background #F7E7FC
			margin-left 200px
			padding-top 40px
			padding-bottom 160px
			overflow hidden
			.cateTitBg
				margin 0 105px
				background-image url('/static/images/category/cate-tit-bg.png')
				background-size 100%
				color #fff
				line-height 45px
				margin-top 20px
				margin-bottom 20px
				text-align center
			.ide
				padding 0 24px
				line-height 80px
				font-size 30px
				font-weight bold
			.cateList
				margin 0 64px
				display flex
				flex-wrap wrap
				border-bottom 2px solid #E1E1E1
				li
					width 180px
					border-radius 10px
					overflow hidden
					&:nth-child(odd)
						margin-right 62px
					img
						display block
						width 180px
						height 180px
						background #fff
					p
						line-height 80px
						text-align center
			.foodList
				margin 0 65px
				.foodListWrap
					padding 20px
					margin-bottom 20px
					background #ffffff
					border-radius 16px	
				.tit
					display flex
					align-items center
					justify-content space-between
					margin-bottom 10px
					.more
						display flex
						align-items center
						justify-content space-between
						background:linear-gradient(90deg,rgba(234,142,251,1) 0%,rgba(87,121,255,1) 100%);
						box-shadow:0px 0px 7px 1px rgba(222,204,237,0.42);
						border-radius 30px
						color #fff
						width 80px
						line-height 44px
						padding 4px 10px
				ul
					display flex
					li
						width 120px
						margin-right 10px
						&:nth-child(3n)
							margin-right 0
						img
							display block
							width 100%
							height 120px
							background #fff
			.likeList
				margin 0 64px
				display flex
				flex-wrap wrap
				border-bottom 2px solid #E1E1E1
				li
					width 180px
					border-radius 10px
					overflow hidden
					background #fff
					margin-bottom 28px
					&:nth-child(odd)
						margin-right 62px
					img
						display block
						width 140px
						height 140px
						margin 20px 20px 0 20px
					p
						padding 10px 20px 0 20px
					.price
						padding-top 0
						padding-bottom 6px
						color #FF0000
			
</style>
