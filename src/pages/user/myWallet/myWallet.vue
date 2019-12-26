<template>
	<div class="accs_wrap">
        <div class="header">
            <!-- 头部组件 -->
            <!-- <Acc-Header custom-title="" class="head">
                
            </Acc-Header> -->
            <div class="head" @click="backAction()"><i slot="backBtn" class="iconfont icon-fanhui"></i></div>
            <div class="amount">
                <router-link to="/user/myWallet/BillingDetails" class="acc-link ts-style-bg" >账单明细</router-link>
                <div class="total-txt">我的钱包 </div>
                <div class="total">{{moneyInfo.remainder_money}}元</div>
                
                <!-- <div class="acc">账单余额</div> -->
                <div class="list_wrap">
                    <div class="list">
                        <router-link to="/user/myWallet/accWithdrawal">
                            <span>提现</span>
                        </router-link>
                    </div>
                    <div class="list">
                        <router-link to="/user/myWallet/Recharge">
                            <span>充值</span>
                        </router-link>
                    </div>
                    <div class="list">
                        <router-link to="/user/CashCoupon">
                            <span>代金券</span>
                        </router-link>
                    </div>
                </div>
            </div>
        </div>
        <div class="content">
            <div class="the_wrap">
                <div class="the">
                    <div class="time ts-style" v-show="withdrawal.length>0">提现</div>
                    <div class="info_wrap" v-for="(item,index) in withdrawal" :key="index"> 
                        <div class="info">
                            <div>提现</div>
                            <div>-{{item.money}}</div>
                        </div>
                        <div class="info">
                            <p>
                                <span v-if="item.status=== -1">审批拒绝</span>
                                <span v-if="item.status== 1">待审批</span>
                                <span v-if="item.status== 2">通过审批</span>
                            </p>
                            <div>{{item.createtime | formatDate}}</div>
                        </div>
                        <div class="info info2" v-if="item.status=== -1"><span>原因：</span><span class="info2t-list">{{item.content}}</span></div>
                    </div>
                </div>

                <div class="the">
                    <div class="time ts-style" v-show="recharge.length >0">充值</div>
                    <div class="info_wrap"  v-for="(item,index) in recharge" :key="index"> 
                        <div class="info">
                            <div>
                                <span v-if="item.status=== -1">不通过审批</span>
                                <span v-if="item.status== 1">待审批</span>
                                <span v-if="item.status== 2">通过审批</span>
                                {{item.source==2 ? '微信充值' : '支付宝充值'}}   
                            </div>
                            <div>+{{item.amount}}</div>
                        </div>
                        <div class="info">
                            <p>
                                <span v-if="item.order_status=== 0">未支付</span>
                                <span v-if="item.order_status== 1">已支付</span>
                                <span v-if="item.order_status== 2">待确认</span>
                                <span v-if="item.order_status== 4">已关闭</span>
                            </p>
                            <div>{{item.pay_time | formatDate}}</div>
                        </div>
                    </div>
                </div>
                <div v-show="showMore" class="end-wrap"  @click="showMoreData()">
                    <p class="more-msg">点击加载更多</p>
                </div>
                
            </div>

            <div class="end-wrap" v-show="isBotom">
                <p>我是有底线哦~~</p>
            </div>

            <!-- 无数据 -->
            <div class="none" v-show="page==1 && (withdrawal.length <1 && recharge.length <1)">
                <img class="none-icon" src="/static/images/public/none-icon.png"/>
                <p class="none-msg">当前还没有相关数据</p>
            </div>
        </div>
        <!-- 底部导航 -->
		<div class="foot-height136"></div>
		<Navigate></Navigate>
	</div>
</template>

<script>
    import AccHeader from "@/pages/common/header/TopHeader"
    import Navigate from "@/pages/common/footer/Navigate";
    import { Toast } from 'vant'
	export default {
        name: 'theAccountBalance',
        components: {
            AccHeader,
            Navigate
		},
		data() {
			return{
                moneyInfo:{},
                infoList:{},
                withdrawal:[],
                recharge:[],
                page:1,             //页数
                isBotom:false,
                showMore:false,
                token:this.$store.getters.optuser.Authorization
			}
        },
        created(){
            this.$store.commit('showLoading')
            this.getData()
            this.getUserAlipayInfo()
        },
        methods: {
            backAction(){
                this.$router.go(-1)
            },
            showMoreData(){
                Toast.loading({
                    mask: true,
                    message: '加载中...',
                    duration:1000
                });
                this.page ++;
                this.getData()
            },
            getData(){        //获取消费账单
                var that =this,
                    url ='user/wallet_detailed'
				that.$axios.post(url,{         // 传给后台的参数
                    'token':that.token,
                    'page':that.page
				})
				.then((res)=>{
                    var list =res.data
                    if(list.status==200){
                        that.infoList = list.data  
                        if(this.page == 1){ 
                            that.withdrawal=list.data.withdrawal
                            that.recharge=list.data.recharge        
                        }else{
                            if(list.data.withdrawal.length > 0){        //如果有数据,拼接数组
                                that.withdrawal =that.withdrawal.concat(res.data.data.withdrawal)
                                // that.recharge = [...that.recharge, ...res.data.data.recharge]
                            }
                            if(list.data.recharge.length > 0){          //如果有数据,拼接数组
                                that.recharge =that.recharge.concat(res.data.data.recharge)
                            }
                            
                            if(list.data.withdrawal.length <1 && list.data.recharge.length <1){         //提现与充值数组都没有数据时‘没有更多数据显示’
                                  this.isBotom=true
                            }else{
                                this.showMore=false
                            }
                        }
                        that.$store.commit('hideLoading')   //数据成功获取后关闭loading
                    }
                    else if(res.data.status == 999){
                        that.$store.commit('hideLoading')   //数据成功获取后关闭loading
                        that.$store.commit('del_token');    //清除token
                        setTimeout(()=>{
                            this.$router.push('/Home')
                        },1000)
                    }else{
                        that.$toast(res.data.msg)
                    }
				})
            },
            getUserAlipayInfo(){    //获取余额
                var that =this,
                    url ='user/wallet_info'
				that.$axios.post(url,{         // 传给后台的参数
					'token':that.token
				})
				.then((res)=>{
                    var list =res.data
                    if(list.status==200){
                        that.moneyInfo =list.data
                    }
                    else if(res.data.status == 999){
                        that.$store.commit('del_token'); //清除token
                        setTimeout(()=>{
                            this.$router.push('/Home')
                        },1000)
                    }else{
                        that.$toast(res.data.msg)
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

                return y + '-' + MM + '-' + d + ' ' + h + ':' + m + ':' + s;
            }
        },
        destroyed() {
            window.removeEventListener('scroll', this.handleScroll, true);
        },
	}
</script>

<style lang="stylus" scoped>
    .accs_wrap
        width 100%
        min-height 100%
        background: linear-gradient(#f1f1f1, #dfe1f3)
        .header
            height 587px
            background url('/static/images/myWallet/wallet_bg.png') no-repeat
            background-size 100% 100%
            color #fff
        .header .head /deep/ .van-sticky--fixed
                background #fff
                border-bottom 1.5px solid #e6e6e6
            .head
                padding-left 50px
                color #fff
                padding-top 80px
            .amount
                position relative
                padding-top 20px
                color #fff
                font-family PangMenZhengDao
                letter-spacing 3px
                text-align center
                .total-txt
                    font-size 50px
                    margin-bottom 60px
                    font-weight 800
                .total 
                    font-size 36px
                    font-weight 700
                .acc-link   
                    display inline-block
                    width 186px
                    height 60px
                    border-radius 30px 0px 0px 30px
                    font-size 30px
                    text-align center
                    line-height 60px 
                    color #fff
                    position absolute
                    right 0
                    top 0px
                .list_wrap
                    padding 70px 0 53px
                    display flex
                    line-height 75px
                    justify-content space-around
                    .list 
                        font-size 30px
                        text-align center
                        width 185px
                        height 60px 
                        line-height 60px 
                        border-radius 30px
                        background #fff
                        a 
                            color #ea65b9
        .content
            padding 40px 24px 88px 
            font-family 'SourceHanSansHWSC-Regular'
            .the_wrap
                .the 
                    margin-bottom 20px
                    .time
                        width 204px
                        height 55px
                        font-family PangMenZhengDao
                        font-size 30px
                        line-height 55px
                        letter-spacing 4px
                        color #ffffff
                        text-align center
                    .info_wrap
                        padding 20px 0
                        font-size 26px
                        border-bottom 1.5px solid #e3dfd9
                        .info
                            display flex
                            justify-content space-between
                            line-height 55px
                            overflow hidden
                            div 
                                // font-size 30px
                                color #151515
                        .info2
                            display inline-block
                            display flex
                            justify-content flex-start
                            // float left
                            
                            .info2t-list
                                width 82%
                                display -webkit-box
                                -webkit-box-orient vertical
                                -webkit-line-clamp 1
                                overflow hidden
                        .list2
                            font-size 24px
                            color #424242  
                            line-height 55px   
            .end-wrap
                font-size 18px
                color #888888
                text-align center
                margin 30px auto
                .more-msg
                    font-size 28px
                    color #666
            .none
                text-align center
                margin-top 113px
                font-size 24px
                .none-icon
                    width 138px
                .none-msg
                    color #909090
                    letter-spacing 5px
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
<style lang="stylus">
.accs_wrap
    .head
        .TopHeader
            background-color transparent !important 
            border none
        
</style>
