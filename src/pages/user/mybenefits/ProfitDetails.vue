<template>
   <div class="ProfitDetails">
        <!-- 头部组件 -->
        <TopHeader :custom-title="name">
            <i slot="backBtn" class="iconfont icon-fanhui"></i>
        </TopHeader>

        <div class="content">
            <!-- 无数据 -->
            <div class="none" v-show="isShow">
                <img src="/static/images/public/none-icon.png"/>
                <p>当前还没有相关数据</p>
            </div>

            <div class="revenue-list" v-for="(item,index) in list" :key="index" @click="linkToDetail(item.id)">
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
            </div>
        </div>
   </div>
</template>

<script>
import TopHeader from "@/pages/common/header/TopHeaderNew"
export default {
    name:'ProfitDetails',
    data() {
        return {
            list: [],
            isShow:false,
            type:this.$route.query.type,
            name:this.$route.query.name,
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
        linkToDetail(id){
            this.$router.push('/user/pDetails?title='+this.name+'&id='+id)
        },
        getData(){
            var _that=this
            _that.$axios.post('user/profit_edit',{
                'token':_that.token,
                'type':_that.type
            })
            .then((res)=>{
                var info =res.data
                if(info.status == 200){
                    if(info.data.length<1){
                        this.isShow=true
                    }
                    _that.list =info.data
                    // console.log(_that.swipeData)
                    _that.$store.commit('hideLoading')
                }
                else if(res.data.status == 999){
                    _that.$store.commit('del_token'); //清除token
                    setTimeout(()=>{
                        _that.$router.push('/Login')
                    },1000)
                }
                else{
                    _that.$toast(info.msg)
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
.ProfitDetails
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
            height 160px
            color #151515
            font-size 24px
            background-color #fff
            border-radius 10px
            margin-bottom 18px
            box-sizing border-box
            display flex
            align-items center
            border-radius 24px
            padding 0 14px
            box-shadow 0 0 20px #dbdada
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
