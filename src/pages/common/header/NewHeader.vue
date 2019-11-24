<template>
    <van-sticky>
        <div class="f-title-wrap">
            <i slot="backBtn" class="iconfont icon-fanhui" @click="backAction()"></i>
            <span class="free-test">{{customTitle}}</span>
        </div> 
    </van-sticky>
</template>

<script>
export default {
    name:'NewHeader',
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
        }
    }

}
</script>

<style lang="stylus" scoped>
    .f-title-wrap
        padding 0 24px 0
        line-height 100px
        text-align center
        position relative
        color #fff
        // margin-bottom 60px
        font-family PangMenZhengDao
        .icon-fanhui
            position absolute
            left 24px
            font-size 42px
        .free-test
            font-size 36px
            font-weight 550
            letter-spacing 2px


</style>
