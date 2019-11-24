<template>
   <div class="pt-details-wrap">
        <!-- 头部组件 -->
        <TopHeader :custom-title="this.$route.query.title+'明细'">
            <i slot="backBtn" class="iconfont icon-fanhui"></i>
        </TopHeader>

        <div class="content">
            <!-- 无数据 -->
            <div class="none" v-show="isShow">
                <img src="/static/images/public/none-icon.png"/>
                <p>当前还没有相关数据</p>
            </div>

            <!-- <div class="revenue-list" v-for="(item,index) in list" :key="index">
                <div class="single-item">
                    <div class="img-wrap">
                        <img :src="item.avatar" />
                    </div>
                    <div class="main">
                        <div class="user-info row-line">
                            <span class="user-name info-left">ID:{{item.to_user_id}} </span>
                            <p class="info-right size-26"><a :href="'tel:'+ item.mobile">{{item.mobile}}</a></p>
                        </div>
                        <div class="user-info row-line">
                            <span class="user-name info-left size-26">{{item.realname}}</span>
                            <p class="info-right">数量：{{item.num}}</p>
                        </div>
                        <div class="row-line">
                            <span class="date info-left info-tt">{{item.create_time | formatDate}}</span>
                            <span class="profit info-right info-rtt">{{type ==4 ? '奖励' : '利润'}}:￥{{item.money}}</span>
                        </div>
                    </div>
                </div>
            </div> -->
            <div class="revenue-list" >
                <div class="single-item">
                    <!-- <div class="img-wrap">
                        <img :src="list.avatar" />
                    </div> -->
                    <!-- <div class="main">
                        <div class="user-info row-line">
                            <span class="user-name info-left">ID:20000</span>
                            <p class="info-right size-26"><a href="'tel:'+ 136547898788">136547898788</a></p>
                        </div>
                        <div class="user-info row-line">
                            <span class="user-name info-left size-26">小白菜</span>
                            <p class="info-right">数量：1000</p>
                        </div>
                        <div class="row-line">
                            <span class="date info-left info-tt">2019-09-24 12:55:56</span>
                            <span class="profit info-right info-rtt">奖励:￥100</span>
                        </div>
                    </div> -->
                    <div><span class="tit">用户ID：</span><span>{{list.user_id}}</span></div>
                    <div><span class="tit">用户昵称：</span><span>{{list.realname}}</span></div>
                    <div><span class="tit">用户手机：</span><span>{{list.mobile}}</span></div>
                    <div><span class="tit">支付时间：</span><span>{{list.create_time}}</span></div>
                    <div><span class="tit">商品数量：</span><span>{{list.num}}</span></div>
                    <div><span class="tit">订单编号：</span><span>{{list.order_sn}}</span></div>
                    <div><span class="tit">订单金额：</span><span>{{list.money}}</span></div>
                    <div><span class="tit">订单描述：</span><span>{{list.desc}}</span></div>
                </div>
            </div>
        </div>
   </div>
</template>

<script>
import TopHeader from "@/pages/common/header/TopHeaderNew"
export default {
    name:'PDetails',
    data() {
        return {
            list: [],
            isShow:false,
            type:this.$route.query.type,
            token:this.$store.getters.optuser.Authorization
        };
    },
    components: {
		TopHeader,
    },
    created(){
        this.$store.commit('showLoading')       //加载loading
        this.getData()
    },
    methods:{
        getData(){
            var that=this
            that.$axios.post('user/profit_edits',{
                'token':that.token,
                'id':this.$route.query.id,
            })
            .then((res)=>{
                var info =res.data
                if(info.status == 200){
                    // if(info.data.length<1){
                    //     this.isShow=true
                    // }
                    that.list =info.data
                    that.$store.commit('hideLoading')
                }
                else if(res.data.status == 999){
                    that.$store.commit('del_token'); //清除token
                    that.$router.push('/Login')
                }
                else{
                    that.$toast(info.msg)
                }
            })
        }
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

            return y + '-' + MM + '-'+ d+' '+ h +':'+ m +':'+s;
        }
    },
}
</script>

<style lang="stylus" scoped>
.pt-details-wrap
    width 100%
    min-height 100%
    background linear-gradient(#f1f1f1, #dfe1f3)
    .TopHeader
        .iconfont
            font-size 45px
    .content
        margin-top 40px
    .revenue-list
        margin-top 20px
        padding 0 24px
        box-sizing border-box
        display flex
        flex-wrap wrap
        .single-item
            width 100%
            line-height 50px
            font-size 30px
            // height 160px
            color #151515
            font-size 24px
            background-color #fff
            border-radius 10px
            margin-bottom 18px
            box-sizing border-box
            // display flex
            // align-items center
            border-radius 24px
            padding 20px 14px
            box-shadow 0 0 20px #dbdada
            .tit
                font-weight bold
            .img-wrap
                width 80px
                height 80px
                margin-right 20px
                border-radius 50%
                border 1px solid #7d7d7d
                img 
                    width 100%
                    height 100%
                    border-radius 50%
            .main
                font-family 'SourceHanSansHWSC-Regular'
                flex 1
                .user-info
                    font-size 28px
                    margin-bottom 10px
                    .user-name
                        margin-right 20px
                    .size-26
                        font-size 26px
                .row-line
                    display flex
                    justify-content space-between
                    .info-left
                        display block
                        width 48%
                    .info-tt
                        color #7b7b7b
                        font-size 22px
                    .info-right
                        margin-left 2%
                        width 50%
                        text-align right 
                        
                    .info-rtt
                        letter-spacing 4px
                        font-family PangMenZhengDao
    .none
        text-align center
        margin-top 50%
        font-size 24px
        letter-spacing 5px
        font-family 'SourceHanSansHWSC-Regular'
        img
            width 138px
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
