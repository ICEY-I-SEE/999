<template>
   <div class="myBenefits">
        <!-- 头部组件 -->
        <TopHeader custom-title="我的收益" style="font-weight:800;">
            <i slot="backBtn" class="iconfont icon-fanhui"></i>
        </TopHeader>

        <div class="content">
            <div class="revenue-list">
                <div class="card-item" v-for="(item,index) in list" :key="index">
                    <router-link :to="'/user/ProfitDetails?type='+item.type+'&name='+item.name">
                        <p class="title" style="font-weight:bold;">{{item.name}}</p>
                        <p class="money" style="font-weight:600;">￥{{item.money}}</p>
                    </router-link>
                </div>    
            </div>
        </div>
        <!-- 底部导航 -->
		<!-- <div class="foot-height136"></div> -->
		<Navigate></Navigate>
   </div>
</template>

<script>
import TopHeader from "@/pages/common/header/TopHeaderNew"
import Navigate from "@/pages/common/footer/Navigate";
export default {
    name:'MyBenefits',
    components: {
        TopHeader,
        Navigate
    },
    data() {
        return {
            list:[],
            token:this.$store.getters.optuser.Authorization
        };
    },
    created(){
        this.$store.commit('showLoading')
        this.getData()
    },
    methods:{
        getData(){
           var url ='user/my_profit',
                that =this
            that.$axios.post(url,{         // 传给后台的参数
                'token':that.token
            })
            .then((res)=>{
                var info =res.data
                if(info.status==200){
                    that.list = info.data
                    that.$store.commit('hideLoading')
                }
                else if(res.data.status == 999){
                    that.$store.commit('del_token'); //清除token
                }else{
                    that.$toast(res.data.msg)
                }
            })
        },
    },

}
</script>

<style lang="stylus" scoped>
.myBenefits
    background linear-gradient(#f1f0f1, #e0e0f1)
    width 100%
    height 100%
    .revenue-list
        margin-top 67px
        padding 0 22px
        box-sizing border-box
        display flex
        flex-wrap wrap
        font-family PangMenZhengDao
        .card-item
            width 50%
            height 340px
            color #ffffff
            font-size 34px
            border-radius 10px
            // margin-right 2%
            margin-bottom 2%
            letter-spacing 4px
            a   
                width 100%
                height 100%
                color #ffffff
                display block
                display flex
                flex-direction column
                justify-content center
                align-items center
            &:nth-child(1)
                background url("/static/images/user/sy1.png") no-repeat
                background-size 100%
            &:nth-child(2)
                background url("/static/images/user/sy2.png") no-repeat
                background-size 100%
            &:nth-child(3)
                background url("/static/images/user/sy3.png") no-repeat
                background-size 100%
            &:nth-child(4)
                background url("/static/images/user/sy4.png") no-repeat
                background-size 100%
                letter-spacing 2px
                font-size 32px
            &:nth-child(2n)
                margin-right 0
            .title
                margin-bottom 15px
</style>
