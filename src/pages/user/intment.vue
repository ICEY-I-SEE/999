<template>
    <div class="intment">
        <TopHeader custom-title="预约列表">
			<i slot="backBtn" class="iconfont icon-fanhui"></i>
		</TopHeader>
        <div class="intment_item" v-for="(item,index) in list" :key="index">
            <div class="intment_name">
                <p>{{item.yuyue_name}}</p>
                <!-- <p>{{item.end_time | formatDate}}天后截止</p> -->
            </div>
            <div class="intment_time">
                <p v-if="item.type==0">状态:未使用</p>
                <p v-if="item.type==1">状态:预约中</p>
                <p v-if="item.type==2">状态:已使用</p>
                <p v-if="item.type==3">状态:已过期</p>
                <!-- <p>申请时间:2014-11-22</p> -->
                <p>{{item.end_time | formatDate}}天后截止</p>
            </div>
        </div>
    </div>
</template>

<script>
    import TopHeader from "@/pages/common/header/TopHeader";    
    export default {
        name:'intment',
        components: {
            TopHeader
        },
        data(){
            return {
                list:''
            }
        },
        mounted(){
            this.getDate();
        },
        methods:{
            getDate(){
                let url = 'user/yuyue_list'
                this.$axios.post(url,{
                    token:this.$store.getters.optuser.Authorization
                })
                .then((res)=>{   
                    let info = Object.freeze(res);
                    this.$store.commit('hideLoading')
                    if(info.data.status === 200){
                        this.list = info.data.data;
                    }
                    else if(info.data.status === 999){
                        this.$store.commit('del_token'); //清除token;
                        this.$router.push('/Home')
                    }
                    else{
                        this.$toast(info.data.msg)
                    }
                })
            }
        },
        filters: {
            // 日期格式化
            formatDate: function (time) {
                // setInterval(function(){
                var nowTime = new Date();
                var endTime = new Date(time * 1000);
                var t = endTime.getTime() - nowTime.getTime();
                var d=Math.floor(t/1000/60/60/24);
                var hour=Math.floor(t/1000/60/60%24);
                var min=Math.floor(t/1000/60%60);
                var sec=Math.floor(t/1000%60);
    
                if (hour < 10) {
                    hour = "0" + hour;
                }
                if (min < 10) {
                    min = "0" + min;
                }
                if (sec < 10) {
                    sec = "0" + sec;
                }
                return d;
                if(t>0&&d>0){
                    _this.time = d + "天" + hour + ":" + min + ":" + sec;
                }else if(t>0){
                    _this.time = hour + ":" + min + ":" + sec;
                }else{
                    _this.time = false;
                }
                // },1000);
            }
        }
    }
</script>

<style lang="stylus" scoped>
.intment
    width 100%
    height 100%
    min-height 100vh
    background: #fef6d7;
    .intment_item
        margin 20px auto
        display flex
        align-items center
        justify-content space-between
        width 702px
        height 200px
        padding 20px
        box-sizing border-box
        border-radius 20px
        background #fff
        .intment_name
            line-height 40px
</style>