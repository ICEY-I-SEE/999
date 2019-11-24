<template>
    <div class="MyTeam">
        <!-- 头部组件 -->
		<Team-Header custom-title="我的团队">
			<!-- 返回按钮 -->
			<i slot="backBtn" class="iconfont icon-fanhui"></i>
		</Team-Header>

        <div class="content">
            <ul class="wrap">
                <router-link :to="'/user/TeamList?type='+item.type+'&tit='+item.name" tag="li" class="wrap-item" :class="item.type==1?'catalog':item.type==2?'user':item.type==3?'vip':item.type==4?'manager':'catalog'" v-for="(item,index) in teamList" :key="index">
                    <img class="user-img" :src="item.type==1?src1:item.type==2?src2:item.type==3?src3:item.type==4?src4:src5" alt="" />
                    <div class="tit">{{item.name}}</div>
                    <div class="num">人数：{{item.num}}</div>
                </router-link>
            </ul>
        </div>
         <!-- 底部导航 -->
        <Navigate></Navigate>
    </div>
</template>

<script>
    import TeamHeader from "@/pages/common/header/TopHeaderNew"
    import Navigate from "@/pages/common/footer/Navigate"
    export default {
    name: "myTeam",
    components: {
        TeamHeader,
        Navigate
	},
	data() {
		return {
            teamList:[],
            src1:'/static/images/user/team/catalog.png',
            src2:'/static/images/user/team/user.png',
            src3:'/static/images/user/team/vip.png',
            src4:'/static/images/user/team/manager.png',
            src5:'/static/images/user/team/user.png',
        };
    },
    created(){
        this.$store.commit('showLoading')
        this.getTeamInfo();
    },
    methods:{
        getTeamInfo(){
            let _that=this,
                url = 'user/team';
            _that.$axios.post(url,{
                token:this.$store.getters.optuser.Authorization
            }).then((res)=>{
                var list =res.data
                if(list.status===200){
                    _that.teamList =list.data;
                    /*_that.teamList.push({
                        type:5,
                        num:9,
                        name:'会员体验卡用户'
                    })
                    */
                    // console.log( _that.teamList)
                    this.$store.commit('hideLoading')
                }else{
                    _that.$toast(list.msg)
                }
            })
        }
    },
    filters: {
        formatDate(time) {
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

            // return y + '-' + MM + '-' + d + ' ' + h + ':' + m + ':' + s;
            return y + '-' + MM + '-' + d + ' ' + h+'时' ;
        }
    },

};
</script>

<style lang="stylus" scoped>
    .MyTeam
        width 100%
        height 100%
        background linear-gradient(#f1f1f1, #dfe1f3)
        .TopHeader
            .iconfont
                font-size 45px
        .content
            padding 65px 44px 126px
            box-sizing border-box
            color #151515
            font-size 28px
            .wrap
                display flex
                flex-wrap wrap
                justify-content space-between
                .catalog
                    background-image url('/static/images/user/team/catalog-bg.png')
                    background-size 100%
                .user
                    background-image url('/static/images/user/team/user-bg.png')
                    background-size 100%
                .vip
                    background-image url('/static/images/user/team/vip-bg.png')
                    background-size 100%
                .manager
                    background-image url('/static/images/user/team/manager-bg.png')
                    background-size 100%
                li
                    padding 32px
                    width 247px
                    height 247px
                    display block
                    border-radius 14px
                    margin-bottom 38px
                    .catalog-img
                        width 61px
                        height 63px
                    .user-img
                        width 66px
                        height 67px
                    .vip-img
                        width 72px
                        height 68px
                    .manager-img
                        width 72px
                        height 61px
                    .tit
                        font-family: 'PangMenZhengDao';
                        color #ffffff
                        font-size 36px
                        font-weight bold
                        text-align center
                        padding-top 20px
                        letter-spacing 6px
                    .num
                        color #fff
                        font-family: 'PangMenZhengDao';
                        padding-top 20px
                        text-align center
                        letter-spacing 2px

                
</style>