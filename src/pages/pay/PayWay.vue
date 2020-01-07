<template>
    <div class="PayWay">
      	<!-- 头部组件 -->
        <div class="TopHeader">
            <div class="backBtn" @click="JumpTo()">
                <i class="iconfont icon-fanhui"></i>
            </div>
            <div class="title"><span class="title-msg">支付方式</span></div>
        </div>

        <div class="height-88"></div>
        <div class="content">
            <div class="pay-way">
                <van-radio-group v-model="payDefault">
                    <van-cell-group>
                        <van-cell v-for="(item,index) in payType" :key="index" :title="item.pay_name" clickable @click="selectPay(item)">
                            <van-radio checked-color="#d90000" :name="item.pay_name"/>
                        </van-cell>
                    </van-cell-group>    
                </van-radio-group>
            </div>
            <div class="pay-price">
                <span>支付金额</span>
                <span class="pay-price-red">￥{{(goodsPrice=="" || typeof(goodsPrice)=='undefined') ? '0.0' : goodsPrice}}</span>
            </div>
            <div class="pay-tips">
                <van-checkbox v-model="checked" checked-color="#d90000">
                    我已同意
                    <router-link class="link" to="/Pay/PayText">
                        《玖酒久商城平台快捷支付服务协议》
                    </router-link>
                </van-checkbox>
            </div>
            <!-- 优惠券 -->
            <!--<div class="row-line" v-if="(typeof(this.isCard)!='undefined') || (typeof(this.cardType)!='undefined')">
                <van-cell-group class="goods-cell-group">
                    
                    <van-cell is-link  @click="showCoupomsBox()" >
                        <template slot="title">
                            <span class="subtitle" style="margin-right: 10px;">代金券</span>
                            <span class="text" style="float:right" ref="text">{{couponsPrice}}</span>
                        </template>
                    </van-cell>

                    
                    <div class="coupon-drawer" :class="{open:getCoupon}" >
                        <div class="coupon-drawer-dialog">
                            <div class="body">
                                <div class="coupon-list">
                                    <div class="single-item" v-for="(item,index) in couponList" @click="useCoupon(item)" :key="index">
                                        <div class="coupon-amount">{{item.price | formatPrice}}<span class="unit">元</span></div>
                                        <div class="coupon-info">
                                            <p class="coupon-name">代金劵</p>
                                            
                                            <p class="get-date">{{item.add_time | formatDate}} 获得</p>
                                            <p class="validity-date">{{item.use_time | formatDate}} 失效</p>
                                        </div>
                                    </div>
                                </div>                                            
                                
                            </div>
                            <div class="un-use" @click="closeCoupon()">不使用代金券</div>
                        </div>

                        <div class="coupon-drawer-mask" @click="getCoupon=false" @touchmove.prevent></div>

                    </div>
                </van-cell-group>   
            </div>-->

        </div>
        <div class="payment-btn ts-style" :class="!checked?'payment-bg':''" @click="payment(order_id,pay_id)">立即付款</div>
        <!-- 数字键盘 -->
        <div v-show="paswPopup" class="pasw-popup">
            <div class="popup-inner" @click="paswPopup= false"></div>
            <div class="-popup-cont">
                <van-password-input
                :value="payPassword"
                @focus="showKeyboard = true"
                />
                <div class="fg-password"><router-link to="/user/SetPassword">忘记密码</router-link></div>
                <van-number-keyboard
                :show="showKeyboard"
                @input="onInput"
                @delete="onDelete"
                @blur="showKeyboard = true"
                />
            </div>
        </div>

        <van-overlay :show="idError" z-index="19"/>
        <div class="tc" v-if="idError">
            <div class="tc-wrap">
                <div class="tc-wrap-text">
                    <p v-html="errorText"></p>
                </div>
                <div class="btn">
                    <button class="lj" @click="buyCard">了解会员</button>
                    <button class="bk" @click="close">暂不考虑</button>
                </div>
            </div> 
        </div>
    </div>  
</template>
<script>
import wx from "weixin-js-sdk";
import { Dialog } from 'vant';
export default {
    name:'PayWay',
    data() {
        return {
            wxHj:0,
            payDefault:'',
            isClick:false,
            order_id:this.$route.query.order_id,
            pay_id:'',            //支付方式id
            pay_type:[],        //所有支付方式
            payPassword:'',     //支付密码
            showPwd:false,
            showKeyboard: true,
            paswPopup:false,
            token:this.$store.getters.optuser.Authorization,
            levelId:this.$route.query.level_id,          //会员卡
            isCard:this.$route.query.isCard,             //买卡

            cardNum:this.$route.query.card_num,          //会员卡数量
            goodsId:this.$route.query.goods_id,         //商品id
            rechargeAmount:this.$route.query.rechargeAmount, //充值金额 
            tag:'', //余额支付标记
            cardType:this.$route.query.cardType,

            couponList: [], //代金券列表
            getCoupon:false, //显示代金券
            couponsPrice:'',
            couponArray:[], //可使用优惠券
            coupon_id:'', //优惠券id  
            isReissue:this.$route.query.isReissue,  //是否是补卡支付
            goodsPrice:this.$route.query.price,
            idError:false, //9001,9002,9003
            errorText:'', //错误信息
            checked:false
        }
    },
    created(){
        this.$store.commit('showLoading') //加载loading
        this.requestData();
        if(typeof(this.goodsId)!='undefined'){
            this.tag = 1
        }
        // this.reqCashCoupon()
        console.log(this.goodsPrice)

        var ua = navigator.userAgent.toLowerCase();
        if(ua.match(/MicroMessenger/i) == "micromessenger"){
            this.wxHj = 1;
        }

    },
    computed:{
        payType(){
            let payList=[];
            //微信环境禁止支付宝支付
            var ua = navigator.userAgent.toLowerCase();
            if(ua.match(/MicroMessenger/i) == "micromessenger"){
                let type = this.pay_type;
                type.forEach(item=>{
                    if(item.pay_type != 3){
                        payList.push(item)
                    }
                })

            }else{
                payList = this.pay_type;
            }

            return payList;

        },
    },
    methods:{
        buyCard(){
            this.$router.push('/membershipCard?id=1')
        },
        close(){
            this.idError=false;
        },
        showCoupomsBox(){
            // console.log(this.couponList)
            if(this.couponList.length<1){
                return this.$toast("暂无可使用的优惠券")
            }
            this.getCoupon = true
        },
        // 获取代金券列表
        reqCashCoupon(){
            let url = 'coupon/get_list';
            this.$axios.post(url,{
                token: this.$store.getters.optuser.Authorization
            })
            .then((res) => {
                if(res.data.status == 200){
                    this.couponList = res.data.data;
                    this.couponList.forEach(item => {
                        if(item.is_use == 0 ){
                            this.couponArray.push(item)
                        }
                    });
                    // console.log(this.couponList)
                }
            })
        },
        // 使用代金券
        useCoupon(e){
            this.couponsPrice = e.price;
            this.getCoupon = false;
            this.coupon_id = e.id; //优惠券id
            console.log(this.coupon_id)
        },
        // 不使用代金券
        closeCoupon(){
            this.couponsPrice = '';
            this.getCoupon = false;
            this.coupon_id =''; //优惠券id
        },
        /**
         * 跳转到首页
         */
        JumpTo(){
            this.$router.push('/Home')
        },
        linkSJReissueCard(){		
           	var url ='card/patch_card_edit',
            	that = this
            that.$axios.post(url,{         // 传给后台的参数
                'token':that.token,
                'card_num':0
            })
            .then((res)=>{
                // var info = res.data
                // that.$toast(res.data.msg)
            })
        },
        /**
         * 获取支付方式
         */
        requestData(){
            let url = 'Order/get_pay_type';
            this.$axios.post(url,{
                token:this.$store.getters.optuser.Authorization
            }).then((res) => {
                if(res.data.status === 200){
                    this.pay_type = res.data.data;
                    if(typeof(this.goodsId)!='undefined'){
                        console.log(res.data.data[0].pay_type)
                        this.pay_id = res.data.data[0].pay_type;    //充值接口默认微信
                        this.payDefault="微信支付"
                    }
                    // this.pay_id = res.data.data[0].pay_type;//当前选中支付方式id
                    this.$store.commit('hideLoading')       //加载loading
                } 
                else if(res.data.status == 999){
					this.$store.commit('del_token'); //清除token
					setTimeout(()=>{
						this.$router.push('/Home')
                    },1000)
                    this.$store.commit('hideLoading')       //加载loading
                }
                else{
                    this.$toast(res.data.msg)
                }
            })
        },
        /**
         * 选择支付方式
         */
        selectPay(item){
            this.payDefault = item.pay_name;//当前选中
            this.pay_id = item.pay_type;//当前选中支付方式id
            if(this.$route.query.pwd==0&&this.pay_id==1){
                this.$toast('请设置支付密码!')
                setTimeout(()=>{
                    this.$router.push({name:'SetPassword',query:{order_id:this.$route.query.order_id,price:this.$route.query.price}})
                },1000)
                return false;
            }
        },

        payment(){

            var pay_id=this.pay_id
            if(pay_id == '') return this.$toast('请选择支付方式!');
            if(!this.checked) return this.$toast('请选择勾选支付协议!');
            if(pay_id == 1){
                this.showPwd = true;
                this.showKeyboard = true;
                this.paswPopup =true
            }
            // 微信&支付宝支付
            if(pay_id==2 || pay_id==3){
                // 普通支付
                if(typeof(this.order_id)!='undefined'){
                    this.requestInfo()
                }
                // 购买会员卡
                if(typeof(this.isCard)!='undefined'){
                    this.payMemberCard()
                }
                // 立即补卡
                if(typeof(this.cardNum) !='undefined'){
                    this.reissueCard()
                }
                // 账户充值
                if(typeof(this.goodsId)!='undefined'){
                    this.reqRacharge()  
                }
            }
            
        },
        wxpay(pay_params) {
            // var that = this,
            //     url ='pay/paymenttest';
            // that.$axios.get(url,{
            //     token:that.token
            // })
            // .then((res) => {
            //     if(res.data.status == 311) {
            //         const pay_params = res.data.data.pay_data

                    if (typeof WeixinJSBridge == "undefined"){
                        if( document.addEventListener ){
                            document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false);
                        }else if (document.attachEvent){
                            document.attachEvent('WeixinJSBridgeReady', onBridgeReady); 
                            document.attachEvent('onWeixinJSBridgeReady', onBridgeReady);
                        }
                        }else{

                        this.onBridgeReady(pay_params);
                    }
            //     }else{
            //         alert('微信支付调起失败！');
            //     }
            // }).catch((err) => {
            //     console.log(err);
            // })
        },
        onBridgeReady(params) {
            let that = this;
            WeixinJSBridge.invoke(
                'getBrandWCPayRequest', {
                    "appId": params.appId,  //公众号名称，由商户传入     
                    "timeStamp": params.timeStamp,  //时间戳，自1970年以来的秒数     
                    "nonceStr": params.nonceStr,  //随机串     
                    "package": params.package,     
                    "signType": params.signType,  //微信签名方式：     
                    "paySign": params.paySign  //微信签名 
                },
                function(res){
                    if(res.err_msg == "get_brand_wcpay_request:ok" ){
                        alert('支付成功！');
                        if(that.order_id){
                            that.$router.push('/Order?type=0')
                        }
                    }
                }
            ); 
        },
        reissueCard(){
            if(this.isClick){
                return
            }
            this.isClick=true
            var url ='pay/card_pay',
                that =this
            that.$axios.post(url,{         // 传给后台的参数
                'token':that.token,
                'card_num':that.cardNum,
                'level_id':that.levelId,
                'card_type':that.cardType,
                'coupon_id':that.coupon_id,
                'pwd':that.payPassword,
                'pay_type':that.pay_id,
                'wx_type':that.wxHj
            })
            .then((res)=>{
                var list =res.data
                if(list.status==310){
                    that.$toast(res.data.msg)
                    setTimeout(() => {
                        that.$router.go(-1)
                    }, 2000);
                }
                else if(res.data.status == 311){
                    if(this.wxHj == 1 && this.pay_id == 2){
                        that.wxpay(res.data.data.pay_data);
                    }else{
                        window.location.href =res.data.data.url;
                    }
                }
                // else if(res.data.status == 911){
                //     that.linkSJReissueCard()
                // }
                else if(res.data.status == 999){
                    that.$store.commit('del_token'); //清除token
                }else{
                    that.$toast(res.data.msg)
                }
                that.isClick=false
            })
            .catch((error) => {
                that.$toast('请求错误')
                that.isClick=false
            })
        },
        payMemberCard(){                     //购买会员卡
            if(this.isClick){
                return
            }
            this.isClick=true
            var url ='pay/card_pay',
                that =this
            that.$axios.post(url,{         // 传给后台的参数
                'token':that.token,
                'pay_type':that.pay_id,
                'pwd':that.payPassword,
                'level_id':that.levelId,
                'coupon_id':that.coupon_id,
                'wx_type':that.wxHj
            })
            .then((res)=>{
                var info =res.data
                if(info.status==310){
                    that.$toast(res.data.msg)
                    setTimeout(() => {
                        that.$router.go(-1);
                    }, 1000);
                }
                else if(res.data.status == 308){
                     that.$toast(res.data.msg)
                     setTimeout(()=>{
                        this.$router.push('/user/myWallet/Recharge')
                    },1500)
                }
                else if(res.data.status == 311){
                    if(this.wxHj == 1 && this.pay_id == 2){
                        that.wxpay(res.data.data.pay_data);
                    }else{
                        window.location.href =res.data.data.url;
                    }
                    
                }
                else if(res.data.status == 312){
                   
                    that.linkSJReissueCard()
                    // that.$toast(res.data.msg)
                    setTimeout(()=>{
                        // this.$router.push('/sjReissueCard?card_num='+res.data.data.card_num)
                        this.$router.push('/NewReissueCard')
                        
                    },1500)
                }
                else if(res.data.status == 999){
                    that.$store.commit('del_token'); //清除token
                }else{
                    that.$toast(res.data.msg)
                }
                that.isClick=false
            })
            .catch((error) => {
                that.$toast('请求错误')
                that.isClick=false
            })
        },

        // 账户充值
        reqRacharge(){
            if(this.isClick){
                return
            }
            this.isClick=true
            let url = 'pay/recharge_pay',
                that = this;
            this.$axios.post(url,{
                token:this.$store.getters.optuser.Authorization,
                pay_type:this.pay_id,
                money:this.goodsPrice,
                good_id:this.goodsId,
                wx_type:this.wxHj
            })
            .then((res) => {
                // console.log(res)
                if(res.data.status == 200){
                    if(this.wxHj == 1 && this.pay_id == 2){
                        that.wxpay(res.data.data.url);
                    }
                }
                if(res.data.status == 311){
                    if(this.wxHj == 1 && this.pay_id == 2){
                        that.wxpay(res.data.data.pay_data);
                    }else{
                        window.location.href =res.data.data.url
                    }
                    
                }else{
                    that.$toast(res.data.msg)
                }
                this.isClick=false
            })
            .catch((error) => {
                that.$toast('请求错误')
                that.isClick=false
            })
        },
        /**
         * 余额支付:输入密码
         */
        requestInfo(){   //普通商品
            var that =this
          if(this.isClick){
                return
            }
            this.isClick=true
            let url = 'pay/payment';
            this.$axios.post(url,{
                token:this.$store.getters.optuser.Authorization,
                order_id:this.$route.query.order_id,
                pay_type:this.pay_id, 
                // pay_type:1,                         //默认余额支付
                pwd:this.payPassword,
                wx_type:this.wxHj
            }).then((res) => {
                if(res.data.status === 200){  
                    if(this.pay_id==1){
                         // 余额支付成功               
                        this.$toast.success({message:res.data.msg,duration: 2000});
                        this.requestData();
                        if(res.data.data.is_turntable == 0){ //支付成功，如果是新用户，2s跳转到抽奖页面
                            setTimeout(() => {       
                                this.$router.push('/luckywheel?order_id=' + res.data.data.order_id)
                            },2000)
                        }else{
                            setTimeout(() => {                   
                                this.$router.push('/Order/OrderDetails?order_id=' + res.data.data.order_id+'&flag=1')
                            },2000)
                        }
                    }
                    if(this.pay_id==2) this.wxpay(res.data.data.url);
                } 
                else if(res.data.status == 311){
                    if(this.wxHj == 1 && this.pay_id == 2){
                        that.wxpay(res.data.data.pay_data);
                    }else{
                        window.location.href =res.data.data.url;
                    }
                    
                }
                else if(res.data.status == 308){
                    Dialog.confirm({
                        title: '余额不足!',
                        message: '是否前往充值?'
                    }).then(() => {
                        // on confirm
                        return this.$router.push('/user/myWallet/Recharge')
                    }).catch(() => {
                        // on cancel
                    });
                }  
                else if(res.data.status === 888){
                    // 设置支付密码
                    this.$toast.fail(res.data.msg);
                    this.$router.push('/user/SetPassword')
                }else if(res.data.status == 999){               // token过期
                    this.$store.commit('del_token');              //清除token
                    setTimeout(()=>{
                        this.$router.push('/Home')
                    },1000)
                }
                else if(res.data.status == 9001 || res.data.status ==9002 || res.data.status ==9003){
                    this.idError = true;
                    this.errorText = res.data.msg;
                }
                else{
                    // 支付失败
                    this.$toast.fail(res.data.msg);
                }
                this.isClick=false
            })
            .catch((error) => {
                that.$toast('请求错误')
                that.isClick=false
            })
        },
        onInput(key) {  //密码框
            this.payPassword = (this.payPassword + key).slice(0, 6);
            if(this.payPassword.length === 6){ 
                if(typeof(this.order_id)!='undefined'){      // 普通支付
                    this.requestInfo()
                }
                else if(typeof(this.isCard)!='undefined'){      // 购买会员卡
                    this.payMemberCard()
                }
                else if(typeof(this.cardNum) !='undefined'){      // 立即补卡
                    this.reissueCard()
                }else{
                    this.$toast('请使用其它方式支付!')
                }
                
                // 关闭密码输入
                this.showKeyboard = false
                this.showPwd = false
                this.paswPopup =false
                this.payPassword = ''
            }
        },
        onDelete() {
            this.payPassword = this.payPassword.slice(0, this.payPassword.length - 1);
        },
        /**
         * 关闭密码蒙层，清空密码
         */
        hidePwd(){
            this.showPwd=false;
            this.payPassword = '';
        },
    },
    filters: {
        //格式化金钱
        formatPrice:function(val){
            return parseFloat(val)
        },
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
    // destroyed(){
    //      window.removeEventListener('popstate', this.goAway, false);//false阻止默认事件
    // },
}
</script>

<style lang="stylus" scoped>
.PayWay
    .TopHeader
        width 100%
        height 88px
        line-height 88px
        color #151515
        font-size 30px
        background-color #ffffff
        display flex
        justify-content space-between
        align-items center
        position fixed
        top 0
        left 0
        z-index 9
        font-family "PangMenZhengDao"
        letter-spacing 4px
        .backBtn
            width 10%
            text-align center
            position absolute
            left 0
            top 0
            .iconfont 
                font-size 36px
        .title
            text-align center
            width 70%
            margin 0 auto
            white-space nowrap
            overflow hidden
            text-overflow ellipsis
            .title-msg
                display inline-block
                transform scale(1,1.1)
    .content
        margin-top 20px
        padding 0 24px
        box-sizing border-box
        .pay-price
            padding 20px 30px
            overflow hidden
            color #323233
            font-size 28px
            line-height 28px
            background-color #fff
            margin-top 20px
            display flex
            justify-content space-between
            .pay-price-red
                color #ff2d10
        .pay-tips
            margin 10px auto
            .link
                color #ff2d10
                text-decoration underline
        .pay-way /deep/ .van-cell__value
            flex none
        .row-line /deep/ .van-hairline--top-bottom::after
            border none
        .row-line
            margin-bottom 20px
            //代金券
            .goods-cell-group
                    background none
                .goods-cell-group /deep/ .van-cell:not(:last-child)::after
                    border-bottom none
                .van-cell
                    padding 0
                    font-size 26px
                    margin 20px 0
                    padding 20px 28px
                .coupon-drawer
                    .coupon-drawer-dialog 
                        background-color  #fff
                        bottom  -100%
                        left  0
                        position  fixed
                        right  0
                        transition  all .6s
                        z-index  11
                        .un-use
                            border-top  1px solid #e0e0e0
                            font-size  30px
                            line-height  89px
                            text-align  center
                        .body
                            padding 0 24px
                            box-sizing border-box
                            border-bottom  .5rem solid #fff
                            height  500px
                            overflow  auto
                            .single-item
                                width 100%
                                height 201px
                                margin 30px auto 0
                                background url("/static/images/user/coupon-bg.png") no-repeat
                                background-size 100%
                                padding-top 30px
                                box-sizing border-box
                                display flex
                                align-items center
                                .coupon-amount
                                    width 40%
                                    font-size 80px
                                    text-align center
                                    color #edab47
                                    .unit
                                        font-size 36px
                                .coupon-info
                                    width 60%
                                    text-align center
                                    color #151515
                                    .coupon-name
                                        font-size 36px
                                    .validity-date
                                        font-size 24px
                                        line-height 40px
                                    .get-date
                                        font-size 24px
                            .none
                                text-align center
                                padding-top 20%
                                img 
                                    width 80px
                                p
                                    color #666
                                    line-height 40px
                    .coupon-drawer-mask 
                        background-color  rgba(0,0,0,.6)
                        bottom  0
                        display  none
                        left  0
                        position  fixed
                        right  0
                        top  0
                        z-index  10
                .coupon-drawer.open 
                    .coupon-drawer-dialog 
                        bottom  0
                    .coupon-drawer-mask 
                        display block
                
        .goods-price
            font-size 26px
            text-align center
            span nth-child(1)
                color #9d9d9d
            span nth-child(3)
                font-size  30px
                color  #ff112f

    .payment-btn
        width 70%
        height 70px
        line-height 70px
        text-align center
        font-size 30px
        position fixed
        left 50%
        bottom 50px
        margin-left -35%
        z-index 9
    .payment-bg
        pointer-events none
        background #ccc
    .pasw-popup
        position fixed
        width 100%
        height 100%
        bottom 0
        left 0
        z-index 9999
        .popup-inner
            width 100%
            height 100%
            background rgba(0,0,0,0.5)
        .-popup-cont
            position absolute
            bottom 0
            z-index 1
            left 0
            width 100%
            background #fff
            padding-top 40px
            .fg-password
                text-align right
                margin: 30px
                a
                    color: #1a89fa
            .van-password-input__security 
                height: 100px
            .van-password-input__security li
                border 1px solid #bdbdbd
                border-left 0
            .van-password-input__security li:first-child
                    border-left 1px solid #bdbdbd
            .van-password-input__security li:first-child
                // border-left 1px solid #999
            .van-number-keyboard
                position relative
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
            background-size 100%
            position relative
            .tc-wrap-text
                padding 220px 80px 20px 80px
            p
                    font-family: 'PangMenZhengDao';
                    text-align justify
                    line-height 40px
                    font-size 26px
                    height 110px
                    display block
                    .akey                        
                        color #e054c6
                .p3
                    font-size 22px
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
                    background-image: linear-gradient(90deg, #BC7DF1,#5B60F9);
                .bk
                    background-image: linear-gradient(90deg, #CBB3FD,#CBB3FD);
            .close
                position absolute	
                right 10px
                top 10px
</style>



