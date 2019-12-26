<template>
    <div class="PayText">
        <!-- 头部组件 -->
		<TopHeader custom-title="支付协议">
			<i slot="backBtn" class="iconfont icon-fanhui"></i>
		</TopHeader>
    </div>
</template>

<script>
    // 公共头部
    import TopHeader from "@/pages/common/header/TopHeader"
    export default {
        name:'PayText',
        components:{
            TopHeader
        },
        data(){
            return{

            }
        }
    }
</script>

<style lang="stylus" scoped>
.PayText
    width 100vw
    height 100vh
    padding-bottom 114px
    box-sizing border-box
    overflow auto
    background #fef6d7
</style>