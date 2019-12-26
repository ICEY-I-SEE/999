<template>
    <div class="reissue-card-wrap">
        <!-- 头部组件 -->
        <TopHeader custom-title="补卡记录">
			<!-- 返回按钮 -->
			<i slot="backBtn" class="iconfont icon-fanhui"></i>
		</TopHeader>
        <div class="content">
            <div class="res-card-cont">
                <ul class="res-card-a">
                    <p class="-card-b-title" v-show="!isShow">补卡提醒记录</p>
                    <li class="-card-b-list" v-for="(item,index) in list" :key="index">
                        <img class="-b-msg-img" :src="item.avatar"/> 
                        <div class="-b-list-msg">
                            <span>ID:{{item.user_id}} - {{item.mobile}}提醒您补卡</span>
                            <span class="c-active2">X{{item.card_num}}</span>
                            <p class="-b-list-date">{{item.create_time | formatDate}}</p>
                        </div>
                    </li>
                </ul>
                 <!-- 无数据 -->
                <div class="none" v-show = "isShow">
                    <img src="/static/images/public/none-icon.png"/>
                    <p>当前还没有信息</p>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
// 公共头部
import TopHeader from "@/pages/common/header/TopHeaderNew"
import Swiper from "swiper"
import "swiper/dist/css/swiper.css"
export default {
    // name: "ReissueCard",
    data() {
        return {
            list:[],
            isShow:false,
            token:this.$store.getters.optuser.Authorization
        };
    },
    created(){
        this.$store.commit('showLoading')
        this.getData()
    },
    methods: {
        getData(){
           var url ='card/patch_card_list',
                that =this
            that.$axios.post(url,{         // 传给后台的参数
                'token':that.token
            })
            .then((res)=>{
                var info =res.data
                // console.log(info.data)
                if(info.status==200){
                    if(info.data.length<1){
                        this.isShow=true
                    }
                    that.list=info.data
                    that.$store.commit('hideLoading')
                }
                else if(res.data.status == 999){
                    that.$store.commit('del_token'); //清除token
                     setTimeout(()=>{
                        this.$router.push('/Home')
                    },1000)
                }else{
                    that.$toast(res.data.msg)
                }
            })
        },
    },
    filters: {
        // 日期格式化
        formatDate: function (time) {
            let date = new Date(time*1000);
            let y = date.getFullYear();

            let MM = date.getMonth() + 1;
            MM = MM < 10 ? ('0' + MM) : MM;

            let d = date.getDate();
            d = d < 10 ? ('0' + d) : d;

            let h = date.getHours();
            h = h < 10 ? ('0' + h) : h;

            let m = date.getMinutes();
            m = m < 10 ? ('0' + m) : m;

            let s = date.getSeconds();
            s = s < 10 ? ('0' + s) : s;

            return y + '-' + MM + '-' + d ;
        }
    },
    components: {
        TopHeader
    }
};
</script>

<style lang="stylus" scoped>
    .reissue-card-wrap
        width 100%
        height 100%
        background linear-gradient(#f1f1f1, #dfe1f3)
    .content
        width 100%
        height calc(100% - 150px)
        color #151515
        font-size 30px
        position relative
        .res-card-cont
            width 100%
            height 100%
            .res-card-a
                margin 0 24px 24px
                padding 24px 86px 40px
                box-sizing: border-box
                .-card-b-title
                    text-align center 
                    font-size 28px
                    margin-bottom 70px
                    font-weight 550
                    letter-spacing 2px
                .-card-b-list
                    margin-bottom 40px
                    display flex
                    align-items center
                    .-b-msg-img
                        margin-right 21px
                        width 60px
                        height 60px
                        border solid 1px #f7f7f7
                    .-b-list-msg
                        font-size 26px
                        .c-active2
                            font-size 30px
                            color #f80707
                            margin-left 10px
                        .b-list-date
                            margin-top 5px
                            font-size 24px
            .none
                text-align center
                margin-top 50%
                font-size 24px
                letter-spacing 5px
                font-family 'SourceHanSansHWSC-Regular'
                img
                    width 167px
                p
                    color #909090
                    margin 20px 14px
                    display flex
                    align-items center
                    justify-content center
                    &:before
                        content ''
                        width 13px
                        height 13px
                        display inline-block 
                        background url("/static/images/public/dot-icon.png") no-repeat
                        background-size 100%
                        margin-right 14px
                    &:after
                        content ''
                        width 13px
                        height 13px
                        display inline-block 
                        background url("/static/images/public/dot-icon.png") no-repeat
                        background-size 100%
                        margin-left 14px
           
</style>


