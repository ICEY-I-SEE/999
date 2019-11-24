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
	mounted(){
		localStorage.setItem('ios_url',global.location.pathname)
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
</style>
