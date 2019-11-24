<template>
    <div class="noticeDetails">
        <!-- 头部组件 -->
		<TopHeader custom-title="详细说明">
			<i slot="backBtn" class="iconfont icon-fanhui"></i>
		</TopHeader>
        <div class="content">
            <div>
                <h1>{{NotiList.title}}</h1>
                <!-- <p>{{NotiList.desc}}</p> -->
                <div v-html="NotiList.desc" class="ttt"></div>
            </div>
        </div>

    </div>
</template>

<script>
// 公共头部
import TopHeader from "@/pages/common/header/TopHeader"
export default {
    name:'NoticeDetails',
    data(){
       return{
        //    announceId:
           NotiList:[],
        }
    },
    mounted() {
        this.NotiData()
    },
    methods:{
        NotiData() {
            var url = "announce/details"
            this.$axios.post(url,{
                token:this.$store.getters.optuser.Authorization,
                'id':this.$route.query.hw_id
            })
            .then((res)=>{          
                var that = this
                if(res.data.status === 200){
                    that.NotiList = res.data.data;
                }else{
                    that.$toast(res.msg)
                }
            })
        },
    },
    components:{
        TopHeader
    }
}
</script>

<style lang="stylus" scoped>
.noticeDetails
    background-color #fff
    min-height 100vh
    .content
        width 80%
        margin 50px auto 0
        h1
            text-align center
            font-size 32px
            font-weight normal
            margin-bottom 20px
            border-bottom 1px solid #ccc
            padding :0 0 20px 0
        .ttt
            line-height 40px
            font-size 26px
            color #666
            letter-spacing 2px
</style>
