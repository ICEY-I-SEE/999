<template>
    <div class="nodata-wrap">
        <img class="-info-img" :src="nodatas.imgSrc"/>
        <!--  -->
        <p class="zanwu"></p>
        <p class="-info-txt">{{nodatas.text}}~</p>
        <router-link class="-info-btn ts-style" v-if="nodatas.showBtn" :to="nodatas.link">
            <!-- <input  type="button" value="去逛逛" /> -->
            <span class="info-btn-msg">去逛逛</span>
        </router-link>
    </div>
</template>
<script>
    export default {
        props:{
            nodatas:{
                type:Object,
                required:true
            }
        }
    }
</script>

<style lang="stylus" scoped>
#app .-info-img{
            width:170px !important
            height auto !important
            margin-bottom: 10px !important;
            margin-top: 6rem;
}
#app .-info-txt{
    font-size 13px !important; 
    margin-top: 6px;
}
    .nodata-wrap
        text-align :center
        background: #eee;
        min-height: 93vh;
        .zanwu
            font-size: 30px;
            font-weight: normal;
            font-stretch: normal;
            line-height: 40px;
            letter-spacing: 0px;
            margin-top: 2px;
            margin-bottom: 10px;
            color: #333333;
        .-info-img
            width:290px !important
            height:290px
            margin:145px 0 50px
        .-info-txt
            color:#b9b7b7
            font-size:28px
            margin-bottom:90px
            transform scale(1,1.1)
            letter-spacing 5px
            font-family 'SourceHanSansHWSC-Regular'
        .-info-btn
            width: 310px
            height: 80px
            line-height 80px
            display inline-block
            // background-image linear-gradient(90deg,#df51c8 0%, #e964bb 62%, #f376ad 100%)
            border-radius: 50px
            font-size 40px
            letter-spacing 4px
            color:#fff
            .info-btn-msg
                transform: scale(1,1.2);
                display block
                font-weight 700
                font-size 30px
            // font-family 'SourceHanSansHWSC-Bold'
</style>
