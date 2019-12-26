<template>
  <div id="app">
	  <!-- <keep-alive>
    <router-view/>
	</keep-alive> -->
	<keep-alive>
		<router-view v-if="$route.meta.keepAlive"></router-view>
	</keep-alive>
	<router-view v-if="!$route.meta.keepAlive"></router-view>
	<!-- loading 加载 -->
	<Loading v-if="isLoading"></Loading>
	<!-- <div v-if="!wx" class="wx"><img src="/static/images/public/wx.jpg" alt=""></div> -->
  </div>
</template>

<script>
import {mapState} from 'vuex'
import Loading from '@/pages/common/loading/Loading'
export default {
	name: 'App',
	computed:{
		...mapState([
		'isLoading'
		])
  	},
	components:{
		Loading
	},
	watch: {
		'$route': function(to,from){
			this.$nextTick(() => {
                document.body.scrollTop = 0
			 	document.documentElement.scrollTop = 0
            }) 
		}
	},
	data(){
		return{
			wx:''
		}
	},
	mounted(){
		localStorage.setItem('ios_url',global.location.pathname)
		var ua = window.navigator.userAgent.toLowerCase();
		if (ua.match(/MicroMessenger/i) == 'micromessenger') {
			this.wx = true;
		} else {
			this.wx = false;
		}
	},
	methods: {
	},
}

</script>

<style lang="stylus">
body,html,#app
	// height 100%
	background-color #fff
	color #151515
	.height-88
		width 100%
		height 88px
	.wx
		position fixed
		top 0
		left 0
		width 100vw
		height 100vh
		background #fff
		z-index 100
		img 
			position absolute
			top 0
			left 0
			right 0
			bottom 0
			margin auto
			width 100%		
</style>
