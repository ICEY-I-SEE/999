<template>
    <div class="User">
        <div class="header-wrap">
            <div class="header">
            <!-- <div class="user-card">会员卡</div> -->
            <div class="user-info">
                    <div class="avatar">
                        <router-link :to="'/UserInfo?id='+userData.id">
                            <img :src="userData.avatar"/>  
                        </router-link>
                        <img class="lv" v-if="personalData.level === 1" src="/static/images/user/level-1.png" alt="">
                        <img class="lv" v-if="personalData.level === 2" src="/static/images/user/level-1.png" alt="">
                        <img class="lv" v-if="personalData.level === 3||personalData.level === 4" src="/static/images/user/level-1.png" alt="">
                    </div>
                    <div class="info">
                        <p class="user-name">{{userData.realname}}</p>
                        <p class="user-id">
                            <span>ID：{{userData.id}}</span> 
                        </p>
                        <p class="level level-1 nolineHeight">{{personalData.levelname}}</p>
                    </div>
                </div>
                <router-link class="set-up" to="/user/personalData"></router-link>
            </div>
            <div class="order-area">
                <div class="headline">
                    <h3>我的订单</h3>
                    <router-link to="/order?type=0">查看全部订单<img class="more" src="static/images/user/address/right-arrow.png"/></router-link>
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
                            <span class="num" v-if="userData.count">{{userData.count}}</span>
                        </div>
                    </router-link>
                    <router-link to="/user/AfterSale">
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
        </div>
        <div class="content">
             <!-- 订单 -->
            
            <div class="link-list">
                <div class="after"></div>
                <router-link to="/user/appointment" tag="div" class="link-item">
                    <span>预约</span>
                    <span class="more"></span>
                </router-link>
                <!-- <router-link to="/user/myWallet" tag="div" class="link-item">
                    <span>个人账户</span>
                    <span class="more"></span>
                </router-link> -->
                <!-- <router-link to="/BuyCard" tag="div" class="link-item">
                    <span>升级会员</span>
                    <span class="more"></span>
                </router-link> -->
                <!-- <router-link to="/user/MyBenefits" tag="div" class="link-item">
                    <span>收益记录</span>
                    <span class="more"></span>
                </router-link> -->
                <router-link to="/user/Team" tag="div" class="link-item">
                    <span>酒庄中心</span>
                    <span class="more"></span>
                </router-link>
                <router-link to="/user/myTeam" tag="div" class="link-item">
                    <span>所有酒庄</span>
                    <span class="more"></span>
                </router-link>

                <!-- <router-link to="/user/Collect">
                    <div class="link-item">
                        <span>我的收藏</span>
                        <span class="more"></span>
                    </div>
                </router-link> -->
               
                <router-link to="/notice/NoticeList" tag="div"  class="link-item">
                    <span>官方资讯</span>
                    <span class="more"></span>
                </router-link>
                <router-link :to="'/UserInfo?id='+userData.id" class="link-item" tag="div">
                    <span>个人资料</span>
                    <span class="more"></span>
                </router-link>
                <router-link to="/user/Address" tag="div" class="link-item">
                    <span>地址管理</span>
                    <span class="more"></span>
                </router-link>
                <div @click="musharing" class="link-item">
                    <span>我要分享</span>
                    <span class="more"></span>
                </div>
                <div class="link-item" v-if="userData.mobile">
                    <span>手机号</span>
                    <span class="item-mobile">{{userData.mobile}}</span>
                    <span class="more" style="background:transparent;"></span>
                </div>
                

                <!-- <router-link to="/DownloadPage" tag="div" class="link-item border-none">
                    <span>APP下载</span>
                    <span class="more"></span>
                </router-link> -->
            </div>
        </div>
        <div class="content" v-show="isTips">
            <div class="link-list" :style="{margin:'0 auto 0',padding:'20px 0'}">
                <div class="after"></div>
                <div class="tips">
                    <img src="/static/images/user/tips.png" alt="">
                    <span>您的会员卡数量不足，下级正在等待您操作补卡，请尽快哦！</span>
                </div>
            </div>
        </div>

        <van-overlay :show="isTc" z-index="110"/>
        <div class="tc" v-if="isTc">
            <div class="tc-wrap">
                <div class="tc-wrap-text"><p>{{tcText}}</p></div>
                 <div class="btn">
                    <button class="lj" @click="buyCard">确定</button>
                </div>
                <!-- <div class="close" @click="close"><van-icon name="cross" size="30" color="#df51c8" /></div> -->
            </div> 
        </div>

        <!-- 底部 -->
        <TopHeader></TopHeader>
    </div>
</template>

<script>
    import TopHeader from "@/pages/common/footer/Navigate"
    import { Dialog } from 'vant';
    export default {
        name: "User",
        components: {
            TopHeader,
        },
        data() {
            return {
                isTc:false,
                isTips:false,
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
            buyCard(){
                this.isTc = false;
                // this.$router.push('/BuyCard')
            },
            close(){
                this.isTc=false;
            },
            musharing(){
                if(Number(this.personalData.level) !== 0 || this.personalData.level=='1'){
                    this.$router.push('/user/mySharing')
                }else{
                    this.isTc = true
                    this.tcText = '购买任意产品过后，即可拥有自己的专属二维码~'
                }
            },
            reqUser() {
                let url = 'user/user_info'
                this.$axios.post(url,{
                    token:this.$store.getters.optuser.Authorization
                })
                .then((res)=>{   
                    let info = Object.freeze(res);
                    this.$store.commit('hideLoading')
                    if(info.data.status === 200){
                        this.userData = info.data.data;
                        this.isTips = info.data.data.patch_card;
                    }
                    else if(info.data.status === 999){
                        this.$store.commit('del_token'); //清除token;
                        this.$router.push('/Home')
                    }
                    else{
                        this.$toast(info.data.msg)
                    }
                })
            },
            reqPersonal() {
                var that = this;
                let url = 'user/personal'
                this.$axios.post(url,{
                    token:this.$store.getters.optuser.Authorization
                })
                .then((res)=>{  
                    let info = Object.freeze(res);
                    if(info.data.status === 200){
                        this.personalData = info.data.data;
                    }else{
                        that.$toast(info.msg)
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
        width 100vw
        height 100vh
        padding-bottom 114px
        box-sizing border-box
        overflow auto
        background linear-gradient(#f6de8d, #fef6d7)
        .header-wrap
            width 100%
            position relative
            .user-card
                color #fff
                text-align center
                position absolute
                left 0
                right 0
                font-size 30px
                top 30px
            .header
                width 100%
                height 300px
                // background url(/static/images/user/topHeader-bg.png) no-repeat
                background-size 100% 100%
                display flex
                justify-content space-between
                padding 50px 32px 0
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
                    height 110px
                    display flex
                    .avatar
                        position relative
                        width 122px
                        height 122px
                        box-sizing border-box
                        img 
                            width 100%
                            height 100%
                            border-radius 50%
                        .lv
                            position absolute
                            right 0
                            bottom 0
                            width 40px
                            height 40px
                    .info
                        float left
                        margin-left 20px
                        p
                            margin-bottom 5px
                        .level
                            float left
                            display block
                            color #fff
                            text-align center
                            vertical-align middle
                            padding 5px 15px
                            border-radius 15px
                            background #d90000
                .member-msg
                    font-size 20px
                    color #ffffff
            
            .order-area 
                position absolute
                z-index 100
                bottom -120px
                left 0
                right 0
                margin auto
                width 648px
                height 200px
                background-color #fff
                border-radius 10px
                padding 6px 20px 0 20px
                box-sizing border-box
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
                        font-weight bold
                        color #000
                    .more 
                        margin 0 10px
                        width 10px
                        height 20px
                .user-msg
                    text-align center
                    .user-name
                        font-size 35px
                        line-height 60px
                        color #474747
                        // font-family 'PangMenZhengDao'
                        font-weight bold
                    .user-id
                        // font-family: 'Cassannet-Bold'
                        font-weight bold
                        font-size 25.5px
                        color #bd8cdf
                .member-msg
                    width 235px
                    position absolute
                    top -66px
                    bottom 100%
                    right 20px
                    color #ffa900
                    font-family 'PangMenZhengDao'
                    background rgba(255,255,255,0.8)
                    border-radius: 20px 20px 0 0;
                    display flex
                    justify-content center
                    flex-direction:column
                    overflow hidden
                    .name
                        overflow hidden
                        display flex
                        justify-content center
                        font-size 28px
                        // .level
                        //     vertical-align bottom
                        //     padding-left 50px
                        img
                            margin-right 15px
                            width 40px
                            height 40px
                        // .level-0
                        //     background url(/static/images/user/zhuanshi.png) left center no-repeat 
                        //     background-size 38px 39px
                        // .level-1
                        //     background url(/static/images/user/level-1.png) left center no-repeat 
                        //     background-size 31px 40px
                        // .level-2
                        //     background url(/static/images/user/level-2.png) left center no-repeat
                        //     background-size 31px 40px
                        // .level-3
                        //     background url(/static/images/user/level-3.png) left center no-repeat
                        //     background-size 31px 40px
                        // .level-4
                        //     background url(/static/images/user/level-4.png) left center no-repeat
                        //     background-size 49px 48px
                        // .level-5
                        //     background url(/static/images/user/level-5.png) left center no-repeat
                        //     background-size 50px 37px
                .date
                    // position absolute
                    overflow hidden
                    font-size 16px
                    color #9a9a9a
                    margin-top 2px
                    
                    // right 10px
                    // top -24px
                    white-space nowrap
                    text-align: center;
                    font-family 'PangMenZhengDao'
                    span
                        // transform:scale(0.85);
                        display block
                .list 
                    height 114px
                    display -webkit-box
                    display -ms-flexbox
                    display flex
                    align-items center
                    justify-content space-between
                    margin-top 15px
                    justify-content: space-around;
                    .item 
                        font-size 18px
                        text-align center
                        border-right 1px solid #efece9
                        position relative
                        color #000
                        margin-bottom 20px
                        font-family 'SourceHanSansHWSC-Regular'
                        &:last-child
                            border-right none
                        .num 
                            width 25px
                            height 25px
                            text-align center
                            line-height 25px
                            display inline-block
                            border 2px solid #d90000
                            border-radius 50%
                            color #d90000
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
        .content
            position relative
            padding 0 0 40px
            box-sizing border-box
            position relative
            // height calc(100vh - 380px)
            // background linear-gradient(#f1f1f1, #dfe1f3)
            // z-index 2
            .link-list
                position relative
                margin 140px auto 0
                width 648px
                // background-color #fff
                // border-radius 40px
                color #7d7d7d
                // padding 0 24px
                box-sizing border-box
                font-family 'PangMenZhengDao'
                // box-shadow:0px 4px 20px #ccc;
                // .after
                //     position absolute
                //     top 28px
                //     left -10px
                //     width 10px
                //     height 45px
                //     border-top-left-radius 5px
                //     border-bottom-left-radius 5px
                //     background linear-gradient(#e972aa, #d44ec2)
                .link-item 
                    position relative
                    height 95px
                    font-size 28px
                    display flex
                    align-items center
                    text-indent 90px
                    justify-content space-between
                    background-color #fff
                    color #000
                    border-bottom 1px solid #e6e6e6
                    font-weight:bold
                    span
                        display inline-block
                        height 100%
                        line-height 95px
                    &::before
                        content ''
                        display block
                        position absolute
                        left 32px
                        top 0
                        bottom 0
                        margin auto
                        width 40px
                        height 40px
                        background url(/static/images/user/item-1.png) no-repeat
                        background-size contain
                        z-index 1
                    &:nth-of-type(3)::before
                        background url(/static/images/user/item-2.png) no-repeat
                        background-size contain
                    &:nth-of-type(4)::before
                        background url(/static/images/user/item-3.png) no-repeat
                        background-size contain
                    &:nth-of-type(5)::before
                        background url(/static/images/user/item-4.png) no-repeat
                        background-size contain
                    &:nth-of-type(6)::before
                        background url(/static/images/user/item-5.png) no-repeat
                        background-size contain
                    &:nth-of-type(7)::before
                        background url(/static/images/user/item-6.png) no-repeat
                        background-size contain
                    &:nth-of-type(8)::before
                        background url(/static/images/user/item-7.png) no-repeat
                        background-size contain
                    &:nth-of-type(9)::before
                        background url(/static/images/user/item-8.png) no-repeat
                        background-size contain
                    &:nth-of-type(2),&:nth-of-type(6)
                        border-top-left-radius 20px
                        border-top-right-radius 20px
                        border-bottom 2px solid #e6e6e6
                    &:nth-of-type(5)
                        border-bottom-left-radius 20px
                        border-bottom-right-radius 20px
                        margin-bottom 20px
                    &:nth-last-of-type(1)
                        border 0
                        border-bottom-left-radius 20px
                        border-bottom-right-radius 20px
                    .more 
                        width 10px
                        height 20px
                        background url(/static/images/user/address/right-arrow.png) no-repeat
                        background-size contain
                        padding-right 30px
                    .item-mobile
                        margin-left 20%
                        font-family none
                .border-none 
                    border-bottom none
                .tips
                    padding 0 20px
                    display flex
                    justify-content space-between
                    align-items center
                    img
                        display block
                        width 40px
                        height 40px
                        margin-right 20px
.tc
    position fixed
    z-index 999
    top 30%
    left 0
    right 0
    bottom 0
    .tc-wrap
        margin 0 auto
        width 615px
        height 450px
        background-image url('/static/images/login/tips-bg.png')
        background-size 100% 100%
        position relative
        .tc-wrap-text
            padding 240px 80px 20px 80px
            p
                font-family: 'PangMenZhengDao';
                text-align justify
                line-height 40px
                font-size 26px
                height 110px
                display block
        .btn
            display flex
            justify-content space-around
            button
                color #fff
                border-radius 30px
                line-height 60px
                width 160px
                border none
                display block
            .lj
                background-image: linear-gradient(90deg, #e63100,#d90000);
            .bk
                background-image: linear-gradient(90deg, #CBB3FD,#CBB3FD);
        .close
            position absolute	
            right 10px
            top 10px

            
</style>