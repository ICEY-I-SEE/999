<template>
    <div style="height:75px;width:100%;">
        <van-sticky :style="fenlei?'position:fixed;top:54px;width:100%;z-index:999;':''">
            <div class="TopHeader">
                <div class="backBtn" @click="backAction">
                    <slot name="backBtn"></slot>
                </div>
                <div class="title">{{customTitle}}</div>
                <div class="rightBtn">
                    <slot name="rightBtn"></slot>
                </div>
            </div>
        </van-sticky>
    </div>
</template>

<script>
export default {
    name:'TopHeader',
    props:{
        "backUrl":{
            type:String
        },
        'customTitle':{
            type:String,
            default:'标题'
        },
        'customFixed':{
            type:Boolean,
            default:false
        }
    },
    data(){
        return{
            fenlei:false
        }
    },
    mounted(){
        console.log(this.customTitle)
        if(this.customTitle == '分类'){
            this.fenlei = true
        }
        
    },
    methods:{
        // 后退按钮
        backAction(){
            if(this.backUrl){
                this.$router.push(this.backUrl)
            }else{
                this.$router.go(-1)
            }
        },
        sstd(){
			  this.$router.push({path:'/Search'})
		},
    }

}
</script>

<style lang="stylus" scoped>
.TopHeader
    width 100%
    height 150px
    line-height 150px
    color #ffffff
    font-size 40px
    background-color #F18BF8
    /* background-image linear-gradient(90deg,#fc8cfa 0%,  #a281ed 47%, #737cf6 68%, #4377ff 100%) */
    box-shadow 0px 21px 58px 10px rgba(134, 126, 240, 0.63)
    display flex
    justify-content space-between
    align-items center
    position relative
    top 0
    left 0
    z-index 9
    .backBtn
        width 10%
        text-align center
        position absolute
        left 0
        top 0
        .iconfont 
            font-size 45px
    .title
        text-align center
        width 70%
        font-family "PangMenZhengDao"
        letter-spacing 4px
        margin 0 auto
        white-space nowrap
        overflow hidden
        text-overflow ellipsis
    .rightBtn
        padding-right 30px
        position absolute
        right 0
        top 0
        .iconfont
            font-size 46px

	.banner-ss
		border: 1px solid black;
</style>
<style scoped>
/* TopHeader{
	display: flex;
	justify-content:center;
	align-items: center;
}
.banner-ss{
	height: 30px;
	width: 350px;
    margin-left: 100px;
    margin-top: 10px;
    border:1px solid white;
} */
</style>