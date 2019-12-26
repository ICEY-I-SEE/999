<template>
    <div class="MyTeam">
        <!-- 头部组件 -->
		<Team-Header :custom-title="customTitle">
			<!-- 返回按钮 -->
			<i slot="backBtn" class="iconfont icon-fanhui"></i>
		</Team-Header>


        <div class="content">
            <!-- <div class="team-top">
                <div class="inner-wrap">
                    <span class="superior-name">上级:{{shanglist.realname}}</span>
                    <span class="superior-id">上级ID:{{shanglist.id}}</span>
                </div>
            </div> -->

            <!-- <div class="query">
                <van-icon name="search" size="16" color="BABDBB" />
                <input class="in-query" type="text" v-model="queryVal" placeholder="请输入用户ID或昵称查询">
            </div> -->

            <van-loading color="#F18BF8" v-show="isQuery"/>

            <!-- 直推 -->
            <div v-show="!isQuery">
                <div class="team-list" v-for="(item,key) in teamList" :key="key">
                    <div class="group-item">
                        <div class="avatar" @click="teamDetails(item.id)">
                            <img :src="item.avatar" />
                        </div>
                        <div class="info" @click="teamDetails(item.id)">
                            <p class="tel"><a :href="'tel:'+ item.mobile">{{item.mobile}}</a></p>
                            <p class="realname">{{item.realname}}</p>
                            <p class="date">{{item.createtime | formatDate}}</p>
                            
                        </div>
                        <div class="right">
                            <p class="user-id" @click="teamDetails(item.id)">
                                <span>ID：{{item.id}}</span>
                            </p>
                            <!-- <p class="level-name">{{item.level_name}}
                            </p> -->
                            <!-- <p class="level-name">{{item.leader}}</p> -->
                            <button class="give_btn" v-if="item.level==0 && item.is_vip_free==0 && type==2" @click="giveUser(item.id)">赠送会员体验卡</button>
                            <button class="give_btn" v-if="item.is_vip_free==1 && type==2">会员体验用户</button>
                            <!-- <p class="level-sds">会员卡数量：{{item.card_num}}</p> -->
                            <div class="date" v-if="type==5"><span>到期时间{{item.vip_time | formatDate}}</span></div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- 无数据 -->
            <div class="none" v-show="teamList.length == 0">
                <img src="/static/images/public/none-icon.png"/>
                <p>当前还没有相关数据</p>
            </div>
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
            customTitle:'',
            teamList:[],
            type:this.$route.query.type,
            queryVal:'',
            isQuery:false,
        };
    },
    created(){
        switch(this.type){
            case '1':
                this.customTitle = '游客列表'
                break;
            case '2':
                this.customTitle = '酒仙列表'
                break;
            case '3':
                this.customTitle = '酒神列表'
                break;
            case '4':
                this.customTitle = '酒祖列表'
                break;
        }
        this.$store.commit('showLoading')
        this.getTeamInfo();
    },
    watch: {
        queryVal(curVal, oldVal) {
            this.isQuery = true;
            clearTimeout(this.timeout);
            this.timeout = setTimeout(() => {
                this.getTeamInfo(curVal);
            }, 1000);
        }
    },
    methods:{
        giveUser(user_id){
            let url = 'user/team_info',_that=this;
             _that.$axios.post(url,{
                token:this.$store.getters.optuser.Authorization,
                user_id:user_id
            }).then((res)=>{
                var list =res.data
                if(list.status===200){
                    _that.$toast('赠送体验卡成功')
                    _that.$store.commit('showLoading')
                    _that.getTeamInfo();
                }
                else{
                    _that.$toast(list.msg)
                }
            })

        },
        teamDetails(id){
            return false;
            this.$router.push('/user/TeamDetails?id='+id)
        },
        getTeamInfo(queryVal){
            let _that=this,
                url = 'user/team_info',
                type_name = '';
            switch(this.type){
                case '1':
                    type_name = 'vip'
                    break;
                case '2':
                    type_name = 'vip_999'
                    break;
                case '3':
                    type_name = 'svip_1'
                    break;
                case '4':
                    type_name = 'svip_2'
                    break;
            }
            _that.$axios.post(url,{
                token:this.$store.getters.optuser.Authorization,
                type_name:type_name
            }).then((res)=>{
                var list =res.data
                if(list.status===200){
                    _that.teamList =list.data;
                    this.$store.commit('hideLoading');
                    this.isQuery = false;
                }
                else if(res.data.status === 999){
                    this.$store.commit('del_token'); //清除token;
                    this.$router.push('/Home')
                }
                else{
                    _that.$toast(list.msg)
                }
            })
        },
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
        min-height 100vh
        background #fef6d7
        .TopHeader
            .iconfont
                font-size 45px
        .content
            padding 60px 50px 126px
            box-sizing border-box
            color #151515
            font-size 28px
            .query
                background #F7F9F8
                height 80px
                border-radius 24px
                margin-bottom 20px
                display flex
                align-items center
                padding 0 20px
                .in-query
                    margin-left 20px
                    width 90%
                    height 70px
                    font-size 26px
            .van-loading__spinner
                display block
                margin 200px auto
            .team-list
                margin-bottom 20px
                .group-item
                    width 100%
                    background-color #ffffff
                    border-radius 24px
                    padding 24px
                    box-sizing border-box
                    display flex
                    align-items center
                    .avatar
                        width 130px
                        height 130px
                        border-radius 50%
                        overflow hidden
                        // margin-right 34px
                        margin-right 28px
                        img 
                            width 100%
                            height 100%
                    .info
                        flex 1
                        .tel
                            font-size 30px
                            margin-bottom 10px
                        .realname
                            font-size 24px
                            margin-bottom 10px
                        .date
                            font-size 18px
                            color #7b7b7b
                    .right
                        display flex
                        align-items center
                        flex-direction column
                        font-family "PangMenZhengDao"
                        .date
                            overflow hidden
                            font-size 16px
                            color #9a9a9a
                            margin-top 2px
                            white-space nowrap
                            text-align: center;
                            font-family 'PangMenZhengDao'
                            span
                                display block
                        .user-id
                            width 200px
                            height 50px
                            text-align center
                            font-size 18px
                            margin-bottom 10px
                            color #ffffff
                            border-radius 18px
                            background linear-gradient(to right,#e63100 0%,#d90000 100%)
                            background-size 100%
                            letter-spacing 1px
                            box-shadow 0px 10px 10px #f3d6ee
                            span 
                                width 100%
                                height 50px
                                line-height 50px
                                display inline-block
                        .give_btn
                            padding 0 10px
                            height 50px
                            text-align center
                            font-size 16px
                            color #ffffff
                            border-radius 18px
                            background linear-gradient(to right,#e63100 0%,#d90000 100%)
                            background-size 100%
                            letter-spacing 1px
                            box-shadow 0px 10px 10px #f3d6ee
                            border none
                        .leader
                            font-size 24px
                            line-height 40px
                        .level-name
                            height 40px
                            line-height 40px
                            font-size 24px
                            padding 0 20px
                            border-radius 18px
                            margin-bottom 10px
                            background #ebe9f3
                            letter-spacing 2px
                            color #959595  
                        .level-sds
                            font-size 24px
                            color #7b7b7b
                            margin-top 5px
                            letter-spacing 2px
            .none
                text-align center
                margin-top 50%
                font-size 24px
                img
                    width 138px
                p
                    color #909090
                    font-family 'SourceHanSansHWSC-Regular'
                    margin 20px 14px
                    display flex
                    align-items center
                    justify-content center
                    letter-spacing 5px
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