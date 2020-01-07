<template>
    <div class="noticeList">
        <!-- 头部组件 -->
		<TopHeader custom-title="资讯列表">
			<i slot="backBtn" class="iconfont icon-fanhui"></i>
		</TopHeader>
        <div class="content">
            <div class="notice-list">
                <ul>
                    <a :href="item.urllink?item.urllink:'/notice/NoticeDetails?item_id='+item.id" tag="li" v-for="(item,index) in NotList" :key="index">
                        <h3 class="publicEllipsis"><img src="/static/images/user/notice.png"> {{item.title}}</h3>
                        <span class="date">{{item.create_time | formatDate}}</span>
                    </a>
                </ul>
            </div>
        </div>

    </div>
</template>

<script>
// 公共头部
import TopHeader from "@/pages/common/header/TopHeader"
export default {
    name:'NoticeList',
    data(){
        return{
           NotList:[],
        }
    },
    mounted() {
        this.NotData()
    },
    methods:{
        NotData() {
            var url = "user/announce_list"
            this.$axios.post(url,{
                token:this.$store.getters.optuser.Authorization
            })
            .then((res)=>{                
                var that = this
                if(res.data.status === 200){
                    that.NotList = res.data.data.list;
                }else{
                    that.$toast(res.msg)
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
    components:{
        TopHeader
    }
}
</script>

<style lang="stylus" scoped>
.noticeList
    background-color #fef6d7
    padding-bottom 20px
    min-height 100vh
    .content
        padding-top 30px
        font-family 'SourceHanSansHWSC-Regular'
        .notice-list
            ul
                a
                    margin-bottom 20px
                    padding 10px 30px
                    font-size 28px
                    line-height 50px
                    box-sizing border-box
                    background #fff
                    display flex
                    justify-content space-between
                    h3
                        width 70%
                        font-weight normal
                        img
                            margin-right 20px
                            vertical-align text-top
                            width 40px
                            height 40px
                    .date
                        display block
                        width  30%
                        color #a4a4a4
                        font-size 24px
                        text-align right 


</style>


