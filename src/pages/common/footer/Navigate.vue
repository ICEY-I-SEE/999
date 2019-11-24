 <template>
     <div class="Navigate">
        <ul>
 			<li>
 				<router-link to="/Home" exact>
                    <i class="home-icon"></i>
 					<span class="text">首页</span>
 				</router-link>
 			</li>
 			<li>
 				<router-link to="/Category">
 					<i class="category-icon"></i>
 					<span class="text">分类</span>
 				</router-link>
 			</li>
 			<li>
 				<router-link to="/Cart">
 					<i class="cart-icon"></i>
 					<span class="text">购物车</span>
 				</router-link>
 			</li>
 			<li>
 				<router-link to="/User">
 					<i class="user-icon"></i>
 					<span class="text">个人中心</span>	
 				</router-link>
 			</li>
 		</ul>
    </div>
</template>

<script>
    export default {
        name:'Navigate',
        data(){
            return{
                
            }
        }
        
    }
</script>

<style lang="stylus" scoped>
.Navigate
	width 100%
	height 116px
	border-top 1px solid #f8f2f2
	background #ffffff
	z-index 99
	position fixed
	left 0
	bottom 0
	box-shadow: 0px 8px 45px 1px rgba(166, 130, 237, 0.5);
	border-top-left-radius 20px
	border-top-right-radius 20px
	ul
		display flex
		height inherit
		li
			width 25%
			font-family 'SourceHanSansHWSC-Regular' !important
			a
				width 100%
				height 100%
				display flex
				flex-direction column
				align-items center 
				justify-content center
				i
					width 100%
					height 46px
					margin 4px 0 1px
					display block
				.home-icon
					background url(/static/images/public/nav1s.png) no-repeat center center
					background-size 42px 40px
				.category-icon
					background url(/static/images/public/nav2s.png) no-repeat center center
					background-size 40px 40px
				.cart-icon
					background url(/static/images/public/nav3s.png) no-repeat center center
					background-size 36px 40px
				.user-icon
					background url(/static/images/public/nav4s.png) no-repeat center center
					background-size 38px 40px
				span
					color #898989
					font-size 16px
					margin-bottom 2px
			.router-link
				.home-icon
					background url(/static/images/public/nav1.png) no-repeat center center
					background-size 49px 46px
				.category-icon
					background url(/static/images/public/nav2.png) no-repeat center center
					background-size 46px 46px
				.cart-icon
					background url(/static/images/public/nav3.png) no-repeat center center
					background-size 42px 46px
				.user-icon
					background url(/static/images/public/nav4.png) no-repeat center center
					background-size 43px 46px
				span
					color #898989
</style>


