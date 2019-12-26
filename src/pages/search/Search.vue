<template>
  	<div class="Search">
		<!-- 搜索框  -->
		<div class="search">
			<i  class="iconfont icon-fanhui" style="color:#b3b3b3;" @click="jumpTo()"></i>
			<form class="searchForm">
				<i class="iconfont icon-sousuo"></i>
				<input
					v-focus
					v-model="searchVal"
					type="text"
					maxlength="40"
					class="keyword"
					name="keyword"
					ref="keyword"
					@keyup="getAssociate(searchVal)"
				/>
				<div class="keyword-del" @click="emptyVal()">
					<i class="iconfont icon-ai54"></i>
				</div>
			</form>
			<button class="search-btn" @click="onSearch()">搜索</button>
		</div>
		<!-- 搜索关键字 -->
		<div class="search-associate" style="display:none">
			<ul class="associate-list">
				<li class="item">
					<span class="keyword">空调</span>
					<span class="iconfont icon-arrow-left-top"></span>
				</li>
				<li class="item">
					<span class="keyword">界面</span>
					<span class="iconfont icon-arrow-left-top"></span>
				</li>
				<li class="item">
					<span class="keyword">护肤</span>
					<span class="iconfont icon-arrow-left-top"></span>
				</li>
			</ul>
		</div>
		<div v-show="selectResult.length<1 && searchVal==''">
			<!-- 最近搜索 -->
			<div class="search-item">
				<h3>最近搜索</h3>
				<div class="search-list">
					<div v-for="(item,key) in history" class="list-item" :key="key" @click="checkedKeywords(item.keywords)">{{item.keywords}}</div>
				</div>
			</div>
			<!-- <div style="border:0.5px solid #E0E0E0;"></div> -->
			<!-- 热搜 -->
			<div class="search-item">
				<h3>热搜</h3>
				<div class="search-list">
					<div v-for="(item,key) in hot" class="list-item" :key="key" @click="checkedKeywords(item.keywords)">{{item.keywords}}</div>
				</div>
			</div>
		</div>

		<!-- 搜索内容 -->


		<!-- 暂无数据 -->

		<div class="no-data" v-show="isShow && searchVal!=''">
			 <p>暂无数据....</p>
	    </div>
		<!-- 搜索内容 -->
		<div class="hot-wrap">
			<div class="hot-list">
				<div class="single-item" v-for="(item,index) in selectResult" :key="index">
					<router-link :to="'/Details?goods_id='+item.goods_id">
						<div class="img-wrap">
							<img :src="item.img" />
						</div>
						<div class="main">
							<h3>{{item.goods_name}}</h3>
							<div class="price">
								<p class="original-price apostrophe">{{item.desc}}</p>
								<p class="discount-price">￥{{item.price}}<img class="cart" src="/static/images/home/cart.png" /></p>
								<!-- <p class="original-price">原价:{{item.original_price}}</p> -->
							</div>
						</div>
					</router-link>
				</div>
			</div>
		</div>

  </div>
</template>

<script>
import TopHeader from "@/pages/common/header/TopHeader";
export default {
	name: "Search",
	components: {
		TopHeader
	},
	data(){
		return{
			history:[],
			hot:[],
			searchVal:'',
			isShow:false,
			selectResult:[],
			token:this.$store.getters.optuser.Authorization
		}
	},
	created(){
		this.getData()
	},
	methods:{
		/**
		 * 清空搜索框
		 */
		emptyVal(){
			this.searchVal = ''
			this.$refs.keyword.focus()
			// this.onSearch()
		},

		checkedKeywords(keywords){		//关键字搜索
			this.searchVal =keywords
			this.onSearch()
		},


		onSearch(){
			let _that =this
			let url = 'search/search';
			_that.$axios.post(url,{
				token:_that.token,
				keywords:_that.searchVal
			}).then((res)=>{
				var list =res.data
				if(list.status === 200){    
					_that.selectResult =list.data.goods_list
					if(_that.selectResult.length<1 || _that.selectResult==""){
						_that.isShow=true
					}
					else{
						_that.isShow=false
					}
				}
				else if(res.data.status == 999){
					this.$store.commit('del_token'); //清除token
					setTimeout(()=>{
						this.$router.push('/Home')
					},1000)
				}
				else{
					_that.$toast(list.msg)
						
				}
			})
		},

		getData(){
			var _that =this
            let url = 'search/get_search?token='+_that.token;
            _that.$axios.get(url)
            .then( (res) => {
                var list =res.data
                if(list.status === 200){
					_that.history =list.data.history
					_that.hot=list.data.hot
				}
				else if(res.data.status == 999){
					this.$toast(res.data.msg)
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
		/**
		 * 获取关联数据
		 */
		getAssociate(e){
			console.log(e)
		},



		jumpTo(path,name,id){
			// 商品路由跳转
			if(path && name && id){
				this.$router.push(path+'?'+ name +'=' + id);
				return false;
			}
			// 跳转指定路由
			if(path && !name && !id){
				this.$router.push(path);
				return false;
			}
			//后退
			else{
				this.$router.go(-1)
			}
		}

	},
};
</script>

<style lang="stylus" scoped>
.Search
	width 100%
	min-height 100vh
	background-color: #fef6d7;
	.no-data
		margin:150px 20px 20px
		text-align center
		font-size 32px
		color:#888
	.search
		padding  20px 24px 20px 0
		box-sizing border-box
		border-bottom 1px solid #eeeeee
		display flex
		background #fff
		margin-bottom 20px
		.icon-fanhui
			width 10%
			height 60px
			color #db9bf5
			font-size 36px
			display flex
			align-items center
			justify-content center
		.searchForm
			flex 1
			height 60px
			background-color #eee
			display flex
			align-items center
			margin 0 auto
			border-radius 5px
			.icon-sousuo
				width 10%
				height 100%
				display flex
				align-items center
				justify-content center
				font-size 34px
				color #d2d2d2
			.keyword
				flex 1
			.keyword-del
				width 10%
				height 100%
				display flex
				align-items center
				justify-content center
				.icon-ai54
					font-size 40px
					color #b2b2b2
		.search-btn
			width 100px
			height 60px
			display inline-block
			background linear-gradient(to right,#e63100, #d90000)
			color #ffffff
			font-size 24px
			border-radius 5px
			margin-left 20px
			border none 
			outline none
	.search-associate
		.associate-list
			.item
				height 80px
				line-height 80px
				color #666
				font-size 28px
				background-color #f9f9f9
				border-bottom 1px solid #dedede
				padding 0 30px
				box-sizing border-box
				display flex
				justify-content space-between
				.icon-arrow-left-top
					color #999999
					font-size 28px
	.search-item
		padding 0 30px
		box-sizing border-box
		margin-bottom 30px
		h3
			line-height 60px
			font-size 31px
			color: #151515
			margin-bottom 15px
		.search-list
			display flex
			flex-wrap wrap
			.list-item
				height 60px
				line-height 60px
				text-align center
				width 100px
				/* overflow hidden
    			text-overflow ellipsis
    			white-space nowrap */
				padding 0 35px 
				margin-right 38px
				margin-bottom 58px
				background #ffffff
				border-radius: 50px;

	.hot-wrap
		padding 0 32px
		box-sizing border-box
		.hot-list
			display flex
			flex-wrap wrap
			.single-item
				margin-bottom 20px
				width 100%
				height 190px
				background-color #fff
				border-radius 8px
				overflow hidden
				padding 16px 65px
				box-sizing border-box
				&:nth-child(2n)
					margin-right 0
				.img-wrap
					float left
					margin-right 45px
					width 200px
					height 160px
					border-radius 10px
					overflow hidden
					img 
						max-width 100%
						max-height 100%
				.main
					flex 1
					h3
						font-size 22px
						color #151515
						height 40px
						-webkit-box-orient vertical
						-webkit-line-clamp 2
						display -webkit-box
						overflow hidden
						text-overflow ellipsis
					.price
						.discount-price
							margin-top 5px
							font-size 30px
							color #ed0d0d
							line-height 50px
							.cart 
								float right
								margin-top 10px
								width 30px
								height 30px
						.original-price
							font-size 24px
							color #a1a1a1
							height 68px
	

</style>
<style scoped>
.list-item{
	 overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
}
</style>