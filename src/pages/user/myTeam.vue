<template>
    <div class="MyTeam">
        <!-- 头部组件 -->
		<Team-Header custom-title="所有酒庄" style="font-weight:800;">
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

            <!-- 酒庄信息 -->
            <div class="team-info clearfix">
                <div class="info-title">
                    酒庄总人数 {{teamList.team_count}}
                </div>
                <div class="info-item" @click="jumpTo('TeamList','type',1)">
                    游客: <span>{{teamList.vip}}</span>
                </div>
                <div class="info-item" @click="jumpTo('TeamList','type',2)">
                    酒仙: <span>{{teamList.vip_999}}</span>
                </div>
                <div class="info-item" @click="jumpTo('TeamList','type',3)">
                    酒神: <span>{{teamList.svip_1}}</span>
                </div>
                <div class="info-item" @click="jumpTo('TeamList','type',4)">
                    酒祖: <span>{{teamList.svip_2}}</span>
                </div>
            </div>

            <!-- 直推 -->
            <div class="team-list" v-for="(item,key) in zhilist" :key="key">
                <div class="group-item">
                    <div class="avatar">
                        <img :src="item.avatar" />
                    </div>
                    <div class="info">
                        <p class="tel"><a :href="'tel:'+ item.mobile">{{item.mobile}}</a></p>
                        <p class="realname">{{item.realname}}</p>
                        <p class="date">{{item.createtime | formatDate}}</p>
                        
                    </div>
                    <div class="right">
                        <p class="user-id">
                            <span>ID：{{item.id}}</span>
                        </p>
                        <p class="level-name">{{item.level_name}}直推
                        </p>
                        <p class="level-sds">团队人数{{item.lower_num}}
                        </p>
                        
                    </div>
                </div>
            </div>

            <!-- 团队 -->
            <div class="team-list" v-for="(list,index) in tuanlist" :key="index">
                <div class="group-item">
                    <div class="avatar">
                        <img :src="list.avatar" />
                    </div>
                    <div class="info">
                        <p class="tel"><a :href="'tel:'+ list.mobile">{{list.mobile}}</a></p>
                        <p class="realname">{{list.realname}}</p>
                        <p class="date">{{list.createtime | formatDate}}</p>
                    </div>
                    <div class="right">
                        <p class="user-id">
                            <span>ID：{{list.id}}</span>
                        </p>
                        <p class="level-name">{{list.level_name}}团队</p>
                    </div>
                </div>
            </div>

            <!-- 无数据 -->
            <!-- <div class="none" v-show="tuanlist.length == 0 && zhilist.length == 0">
                <img src="/static/images/public/none-icon.png"/>
                <p>当前还没有相关数据</p>
            </div> -->
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
            shanglist:{},
            tuanlist:[],
            zhilist:[]
        };
    },
    created(){
        this.getTeamInfo();
    },
    methods:{
        getTeamInfo(){
            let _that=this,
                url = 'user/team_list';
            _that.$axios.post(url,{
                token:this.$store.getters.optuser.Authorization
            }).then((res)=>{
                var list =res.data
                if(list.status===200){
                    _that.teamList =list.data;
                    _that.shanglist =list.data.shanglist
                    _that.tuanlist =list.data.tuanlist
                    _that.zhilist =list.data.list
                    // console.log( _that.teamList)
                }else{
                    _that.$toast(list.msg)
                }
            })
        },
        /**
		 * 路由跳转
		 */
		jumpTo(path,name,id){
			// 商品路由跳转
			if(path && name && id){
				this.$router.push(path+'?'+ name +'=' + id);
				return false;
			}
			// 跳转指定路由
			if(path && !name && !id){
				this.$router.push(path);
				return false;
			}
			//后退
			else{
				this.$router.go(-1)
			}
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
        width 100vw
        height 100vh
        background #fef6d7
        .TopHeader
            .iconfont
                font-size 45px
        .content
            padding 30px 50px 126px
            box-sizing border-box
            color #151515
            font-size 28px
            .team-top
                width 100%
                height 118px
                border-bottom-left-radius 24px
                border-bottom-right-radius 24px
                background-color #ffffff
                padding 35px 24px 0
                box-sizing border-box
                position relative
                margin-bottom 20px
                &:before
                    content ''
                    display inline-block
                    width 13px
                    height 46px
                    background url("/static/images/user/before-line.png") no-repeat
                    background-size 100% 
                    position absolute
                    left -13px 
                    top 48px
                .inner-wrap
                    height 82px
                    border-top 2px solid #c9c7e2
                    font-family "PangMenZhengDao"
                    letter-spacing 4px
                    font-size 24px
                    box-sizing border-box
                    display flex
                    align-items center
                    justify-content space-between
            .team-info
                margin-bottom 40px
                width 100%
                background #fff
                line-height 100px
                overflow hidden
                border-radius 20px
                box-shadow 0 3px 10px #e63100
                .info-title
                    color #fff
                    text-align center
                    background #e63100
                .info-item
                    float left
                    text-align center
                    width 49.8%
                    height 100px
                    border-top 1px solid #ccc
                    &:nth-of-type(2n)
                        border-right 1px solid #ccc
            .team-list
                margin-bottom 20px
                .group-item
                    width 100%
                    height 182px
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
                        justify-content center
                        flex-direction column
                        font-family "PangMenZhengDao"
                        .user-id
                            width 200px
                            height 50px
                            text-align center
                            font-size 18px
                            color #ffffff
                            border-radius 18px
                            background linear-gradient(to right,#e63100 0%,#d90000 100%)
                            background-size 100%
                            margin-bottom 20px
                            letter-spacing 1px
                            box-shadow 0px 10px 10px #f3d6ee
                            span 
                                width 100%
                                height 50px
                                line-height 50px
                                display inline-block
                        .level-name
                            height 50px
                            line-height 50px
                            font-size 26px
                            padding 0 20px
                            border-radius 18px
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