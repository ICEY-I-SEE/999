<template>
    <div class="MyTeam">
        <!-- 头部组件 -->
		<Team-Header custom-title="酒庄中心">
			<!-- 返回按钮 -->
			<i slot="backBtn" class="iconfont icon-fanhui"></i>
		</Team-Header>

        <div class="content">
            <div class="content_num catalog">
                <p>酒的数量</p>
                <strong>{{teamList.distribut_money}}</strong>
            </div>
            <div class="content_num manager">
                <p>余额</p>
                <strong>{{teamList.remainder_money}}</strong>
            </div>
            <router-link to="/user/exchange" tag="div" class="link-item">
                <div class="content_exchange">
                    兑换<img src="/static/images/user/loop.png" alt="">
                </div>
            </router-link>
            <div class="content_btn">
                <router-link to="/user/myWallet/accWithdrawal" class="link">
                    <span>提现</span>
                </router-link>
            </div>
            <div class="content_btn content_right" @click="Rec">
                充值
            </div>
            <div class="clearfix"></div>
            <div class="item">
                <router-link to="/user/Record?type=1" tag="div" class="link-item">
                    <div class="text">收益记录</div>
                    <div class="name_wrap">
                        <i class="iconfont icon-xiangyoujiantou"></i>
                    </div>
                </router-link>
            </div>
            <div class="item">
                <router-link to="/user/Record?type=2" tag="div" class="link-item">
                    <div class="text">提现记录</div>
                    <div class="name_wrap">
                        <i class="iconfont icon-xiangyoujiantou"></i>
                    </div>
                </router-link>
            </div>
            <div class="item">
                <router-link to="/user/Record?type=3" tag="div" class="link-item">
                    <div class="text">充值记录</div>
                    <div class="name_wrap">
                        <i class="iconfont icon-xiangyoujiantou"></i>
                    </div>
                </router-link>
            </div>
            <div class="item">
                <router-link to="/user/Record?type=4" tag="div" class="link-item">
                    <div class="text"> 兑换记录</div>
                    <div class="name_wrap">
                        <i class="iconfont icon-xiangyoujiantou"></i>
                    </div>
                </router-link>
            </div>
            <!-- <ul class="wrap">
                <router-link :to="'/user/TeamList?type='+item.type+'&tit='+item.name" tag="li" class="wrap-item" :class="item.type==1?'catalog':item.type==2?'user':item.type==3?'vip':item.type==4?'manager':'catalog'" v-for="(item,index) in teamList" :key="index">
                    <img class="user-img" :src="item.type==1?src1:item.type==2?src2:item.type==3?src3:item.type==4?src4:src5" alt="" />
                    <div class="tit">{{item.name}}</div>
                    <div class="num">人数：{{item.num}}</div>
                </router-link>
            </ul> -->
        </div>
         <!-- 底部导航 -->
        <Navigate></Navigate>
    </div>
</template>

<script>
    import TeamHeader from "@/pages/common/header/TopHeader"
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
                url = 'user/user_info';
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
        },
        Rec(){
            this.$router.push('/user/myWallet/Recharge');
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
        width 100vw
        height 100vh
        background #fef6d7
        .TopHeader
            .iconfont
                font-size 45px
        .content
            position relative
            padding 65px 44px 126px
            box-sizing border-box
            color #151515
            font-size 28px
            .content_num
                float left
                width 296px
                height 278px
                padding-top 80px
                font-size 36px
                box-sizing border-box
                text-align center
                color #fff
                border-radius 20px
                strong
                    display block
                    margin-top 20px
                    font-size 40px
            .content_num:nth-of-type(2)
                float right     
            .catalog
                    background-image url('/static/images/user/team/catalog-bg.png')
                    background-size 100%
            .user
                background-image url('/static/images/user/team/user-bg.png')
                background-size 100%
            .manager
                background-image url('/static/images/user/team/manager-bg.png')
                background-size 100%
            .content_exchange
                position absolute
                left 0
                right 0
                top 180px
                display flex
                align-items center
                justify-content center
                margin auto
                width 184px
                height 64px
                line-height 64px
                color #e63100
                border-radius 50px
                background #fff
                box-shadow 0 0 10px #fcd3a1
                img 
                    margin-left 20px
                    width 24px
            .content_btn
                margin 40px 0
                float left
                width 296px
                height 80px
                line-height 80px
                box-sizing border-box
                text-align center
                border-radius 50px
                color #fff
                background-image linear-gradient(90deg, #ff6200, #e63100)
                .link
                    display block
                    width 100%
                    height 100%
                    color #ffffff
            .content_right
                float right
                background-image linear-gradient(90deg, #fbcc33, #f8a529)
            .item
                padding 15px 20px
                margin 0 0 30px
                background #fff
                line-height 75px
                border-radius 10px
                box-shadow 0 0 6px #ccc
                .link-item
                    display flex
                    align-items center
                    justify-content space-between
                .text
                    width 130px
                    font-size 30px
                    text-align-last justify
                .name_wrap
                    font-size 30px
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