<template>
    <div class="User">
        <div class="header">
           <div class="user-info">
                <div class="avatar">
                    <router-link to="/user/personalData">
                        <img :src="userData.avatar"/>  
                    </router-link>
                </div>
            </div>
            <router-link class="set-up" to="/user/personalData"></router-link>
        </div>
        
        <div class="content">
             <!-- 订单 -->
            <div class="order-area">
                <div class="user-msg">
                    <p class="user-name">{{userData.realname}}</p>
                    <p class="user-id">ID:{{userData.id}}</p>
                </div>
                <div class="member-msg">
                    <div class="level level-0" v-if="personalData.level === 0">普通用户</div>
                    <div class="level level-1" v-if="personalData.level === 1">VIP会员</div>
                    <div class="level level-2" v-if="personalData.level === 2">官方经理</div>
                    <div class="level level-3" v-if="personalData.level === 3">高级经理</div>
                    <div class="level level-4" v-if="personalData.level === 4">大区经理</div>
                    <div class="level level-5" v-if="personalData.level === 5">联合创始人</div>
                    <!-- <div class="date" v-if="personalData.level==1 || personalData.level === 5">{{personalData.vip_time | formatDate}} 到期</div> -->
                </div>
                <div class="headline">
                    <h3>我的订单</h3>
                    <router-link to="/order?type=0">查看全部订单<img class="more" src="static/images/user/leftArrow.png"/></router-link>
                </div>
                <div class="list">
                    <router-link to="/order?type=1">
                        <div class="item">
                            <span class="icon">
                                <img src="/static/images/order/or_2.png" />
                            </span>
                            <span>待付款</span>
                            <span class="num" v-if="userData.not_pay">{{userData.not_pay}}</span>
                        </div>
                    </router-link>
                    <router-link to="/order?type=2">
                        <div class="item">
                            <span class="icon">
                                <img src="/static/images/order/or_4.png" />
                            </span>
                            <span>待发货</span>
                            <span class="num" v-if="userData.not_delivery">{{userData.not_delivery}}</span>
                        </div>
                    </router-link>
                     <router-link to="/order?type=3">
                        <div class="item">
                            <span class="icon">
                                <img src="/static/images/order/or_3.png" />
                            </span>
                            <span>待收货</span>
                            <span class="num" v-if="userData.not_receiving">{{userData.not_receiving}}</span>
                        </div>
                    </router-link>
                    <router-link to="/user/Collect">
                        <div class="item">
                            <span class="icon">
                                <img src="/static/images/order/icon2.png" />
                            </span>
                            <span>收藏</span>
                        </div>
                    </router-link>
                    <router-link to="#">
                        <div class="item">
                            <span class="icon">
                                <img src="/static/images/order/or_6.png" />
                            </span>
                            <span>售后</span>
                        </div>
                    </router-link>
                     <!-- <router-link to="/order?type=4">
                        <div class="item">
                            <span class="icon">
                                <img src="/static/images/user/dpj-icon.png" />
                            </span>
                            <span>待评价</span>
                            <span class="num" v-if="userData.not_evaluate">{{userData.not_evaluate}}</span>
                        </div>
                    </router-link> -->
                     <!-- <router-link to="/Order/ReturnGoods">
                        <div class="item">
                            <span class="icon">
                                <img src="/static/images/user/th-icon.png" />
                            </span>
                            <span>退货</span>
                            <span class="num" v-if="userData.refund">{{userData.refund}}</span>
                        </div>
                    </router-link>   -->
                </div>
            </div>
            <div class="link-list">
                <div class="after"></div>
                <router-link to="/membershipCardSlider">
                    <div class="link-item">
                        <span>会员卡</span>
                        <span class="more"></span>
                    </div>
                </router-link>

                <router-link to="/user/myWallet">
                    <div class="link-item">
                        <span>我的钱包</span>
                        <span class="more"></span>
                    </div>
                </router-link>
                
                <router-link to="/user/MyBenefits">
                    <div class="link-item">
                        <span>我的收益</span>
                        <span class="more"></span>
                    </div>
                </router-link>
                 
                <router-link to="/user/myTeam">
                    <div class="link-item">
                        <span>我的团队</span>
                        <span class="more"></span>
                    </div>
                </router-link>

                <router-link to="/user/Address">
                    <div class="link-item">
                        <span>地址管理</span>
                        <span class="more"></span>
                    </div>
                </router-link>
                <!-- <router-link to="/user/Collect">
                    <div class="link-item">
                        <span>我的收藏</span>
                        <span class="more"></span>
                    </div>
                </router-link> -->
               
                <router-link to="/notice/NoticeList">
                    <div class="link-item">
                        <span>公告</span>
                        <span class="more"></span>
                    </div>
                </router-link>
               
                <div class="link-item">
                    <span>手机号</span>
                    <span class="item-mobile">{{userData.mobile}}</span>
                    <span class="more"></span>
                </div>

                <router-link to="/user/mySharing">
                    <div class="link-item border-none">
                        <span>二维码</span>
                        <span class="more"></span>
                    </div>
                </router-link>
            </div>
        </div>

        <!-- 底部 -->
        <TopHeader></TopHeader>
    </div>
</template>

<script>
    import TopHeader from "@/pages/common/footer/Navigate"
    export default {
        name: "User",
        components: {
            TopHeader,
        },
        data() {
            return {
                userData:[],
                personalData:[],
                nowIndex:0,
            };
        },
        created(){
            this.$store.commit('showLoading')
            this.reqUser();
            this.reqPersonal();
        },
        methods: {
            reqUser() {
                let url = 'user/user_info'
                this.$axios.post(url,{
                    token:this.$store.getters.optuser.Authorization
                })
                .then((res)=>{   
                    this.$store.commit('hideLoading')
                    if(res.data.status === 200){
                        this.userData = res.data.data;
                    }
                    else if(res.data.status === 999){
                        this.$store.commit('del_token'); //清除token;
                        this.$router.push('/Login')
                    }
                    else{
                        this.$toast(res.data.msg)
                    }
                })
            },
            reqPersonal() {
                let url = 'user/personal'
                this.$axios.post(url,{
                    token:this.$store.getters.optuser.Authorization
                })
                .then((res)=>{  
                    if(res.data.status === 200){
                        this.personalData = res.data.data;
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
        }
    };
</script>

<style lang="stylus" scoped>
    .User
        width 100%
        height 100%
        padding-bottom 114px
        .header
            width 100%
            height 354px
            background url(/static/images/user/topHeader-bg.png) no-repeat
            background-size 100%
            display flex
            justify-content space-between
            padding 65px 24px 0
            box-sizing border-box
            position relative
            z-index 1
            .set-up
                width 46px
                height 46px
                background url(/static/images/user/set-up-icon.png) no-repeat
                background-size 100%
                position absolute
                right 48px
                top 30px
                z-index 1
            .user-info
                margin 70px auto 0
                height 110px
                display flex
                align-items center
                .avatar
                    width 180px
                    height 180px
                    border-radius 50%
                    overflow hidden
                    border 4px solid #fff
                    box-sizing border-box
                    img 
                        width 100%
                        height 100%
            .member-msg
                font-size 24px
                color #ffffff
        .content
            position relative
            padding 0 24px
            box-sizing border-box
            position relative
            height calc(100vh - 354px)
            background linear-gradient(#f1f1f1, #dfe1f3)
            z-index 2
            .headline 
                width 100%
                height 60px
                color #333333
                display flex
                font-family 'PangMenZhengDao'
                justify-content space-between
                align-items center
                border-bottom 1px solid #e5e5e5
                a
                    color #9a9a9a
                h3 
                    font-size 28px
                    font-weight normal
                    color #151515
                .more 
                    margin 0 10px
                    width 10px
                    height 20px
            .order-area 
                position absolute
                top -64px
                left 0
                right 0
                margin auto
                // position relative
                width 650px
                // height 280px
                background-color #fff
                border-radius 30px
                // margin-bottom 12px
                padding 0 20px
                box-sizing border-box
                box-shadow:0px 4px 20px #ccc;
                .user-msg
                    text-align center
                    .user-name
                        font-size 32px
                        line-height 60px
                        font-family 'PangMenZhengDao'
                    .user-id
                        margin-top 10px
                        font-family: 'Cassannet-Bold'
                        font-size 24px
                        color #bd8cdf
                .member-msg
                    position absolute
                    top -64px
                    right 20px
                    height 64px
                    line-height 64px
                    padding 0 20px
                    text-align center
                    font-size 32px
                    color #ffa900
                    font-family 'PangMenZhengDao'
                    background rgba(255,255,255,0.8)
                    border-top-left-radius 20px
                    border-top-right-radius 20px
                    .level
                        vertical-align bottom
                        padding-left 50px
                    .level-0
                        // background url(/static/images/user/level-0.png) left center no-repeat 
                        background-size 38px 39px
                    .level-1
                        background url(/static/images/user/level-1.png) left center no-repeat 
                        background-size 31px 40px
                    .level-2
                        background url(/static/images/user/level-2.png) left center no-repeat
                        background-size 31px 40px
                    .level-3
                        background url(/static/images/user/level-3.png) left center no-repeat
                        background-size 31px 40px
                    .level-4
                        background url(/static/images/user/level-4.png) left center no-repeat
                        background-size 49px 48px
                    .level-5
                        background url(/static/images/user/level-5.png) left center no-repeat
                        background-size 40px 40px
                    .date
                        font-size 22px
                .list 
                    height 114px
                    display -webkit-box
                    display -ms-flexbox
                    display flex
                    align-items center
                    justify-content space-between
                    margin-top 15px
                    .item 
                        flex 1
                        font-size 18px
                        text-align center
                        border-right 1px solid #efece9
                        position relative
                        color #909090
                        margin-bottom 14px
                        &:last-child
                            border-right none
                        .num 
                            width 25px
                            height 25px
                            text-align center
                            line-height 25px
                            display inline-block
                            border 1px solid #e164b4
                            border-radius 50%
                            color #e164b4
                            font-size 14px
                            padding 2px
                            background #ffffff
                            position absolute
                            right 5px
                            top -5px
                        span.icon 
                            width 48px
                            height 48px
                            display block
                            margin 0 auto 10px
                            display flex
                            align-items center
                            justify-content center
                            img 
                                max-width 100%
                                max-height 100%
            .link-list
                position relative
                top 244px
                margin 0 auto
                width 572px
                height 590px
                background-color #fff
                border-radius 40px
                color #7d7d7d
                padding 0 24px
                box-sizing border-box
                font-family 'PangMenZhengDao'
                box-shadow:0px 4px 20px #ccc;
                .after
                    position absolute
                    top 28px
                    left -10px
                    width 10px
                    height 45px
                    border-top-left-radius 5px
                    border-bottom-left-radius 5px
                    background linear-gradient(#e972aa, #d44ec2)
                .link-item 
                    height 70px
                    font-size 28px
                    display flex
                    align-items center
                    text-indent 44px
                    justify-content space-between
                    color #909090
                    border-bottom 1px solid #e6e6e6
                    &.border-none 
                        border-bottom none
                    .more 
                        width 10px
                        height 20px
                        background url(/static/images/user/leftArrow.png) no-repeat
                        background-size contain
                        padding-right 30px
                    .item-mobile
                        margin-left 20%
                        font-family none
                

            

</style>
