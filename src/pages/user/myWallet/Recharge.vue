<template>
   <div class="Recharge">
        <!-- 头部组件 -->
        <TopHeader custom-title="充值">
            <i slot="backBtn" class="iconfont icon-fanhui"></i>
        </TopHeader>

        <div class="content">
            <div class="input-amount"><input type="number" readonly="readonly" @touchstart.stop="show1=true" v-model="money" oninput="if(value.length > 10)value = value.slice(0, 12)"  placeholder="请输入充值金额" @input="changAmount($event)" /></div>
            <div class="tips">充值金额只能为100的倍数,不输入默认为100元。</div>
            <div class="amount-list">
                <div class="amount-item" 
                    v-for="(item,index) in amountList"
                    :class="{active:index == nowIndex}"
                    @click="handleClick(index,$event,item.id)"
                    :key="index">
                    {{item.amount}}元
                    <span class="isCheck"></span>
                </div>
            </div>
            <div class="foot-info">
                <div class="recharge-amount">{{rechargeAmount | formatMoney}}元</div>
                <div class="confirm-btn ts-style" @click="linkToPay()">确定付款</div>
            </div>
        </div>

        <van-number-keyboard
            :show="show1"
            extra-key="."
            close-button-text="完成"
            @blur="show1 = false"
            @input="onInput1"
            @delete="onDelete1"
        />
   </div>
</template>

<script>
import TopHeader from "@/pages/common/header/TopHeader"
export default {
    name:'Recharge',
    components: {
        TopHeader,
    },
    data(){
        return{
            nowIndex:0,
            amountList:[],
            rechargeAmount:100,
            token:this.$store.getters.optuser.Authorization,
            goods_id:'',
            money:'',
            isClick:false,
            show1: false,
        }
    },
    created(){
        // this.$store.commit('showLoading')       //加载loading
        // this.getRechargeData();
        
    },
    methods:{
        onInput1(value){
            this.money = (this.money + value);
            if(isNaN(this.money) || this.money==""){
                return this.rechargeAmount = 0
            }
            this.rechargeAmount = (this.money)
        },
        onDelete1(){
            this.money = this.money.slice(0, this.money.length - 1);
        },
        linkToPay(){
            let goodsId = this.goods_id;
            if(this.money != ''){
                goodsId = 0
            }
            if(this.isClick){
                return
            }
            this.isClick=true;
            let url = 'pay/recharge_pay',
                that = this;
            this.$axios.post(url,{
                token:this.$store.getters.optuser.Authorization,
                pay_type:2,
                money:this.rechargeAmount,
            })
            .then((res) => {
                // console.log(res)
                if(res.data.status == 200){
                    that.wxpay(res.data.data.url);
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
        getRechargeData(){
            var _that=this
             _that.$axios.post('user/good',{
                'token':this.token
            })
            .then((res)=>{
                var info =res.data;
                if(info.status == 200){
                    this.amountList = info.data.list;
                    this.goods_id = info.data.list[0].id;
                    this.rechargeAmount = info.data.list[0].amount;
                    this.$store.commit('hideLoading')
                }
                else if(res.data.status == 999){
                    this.$store.commit('del_token'); //清除token
                    setTimeout(()=>{
                        this.$router.push('/Home')
                    },1000)
                }
                else{
                    _that.$toast(info.msg)
                }
            })
        },
         /**
         * 输入充值金额
         */
        changAmount(e){
            if(isNaN(e.currentTarget.value) || e.currentTarget.value==""){
                return this.rechargeAmount = 0
            }
            this.rechargeAmount = e.currentTarget.value
        },
        /**
         * 选择充值金额
         */
        handleClick(index,e,goodsId){
            this.nowIndex = index;
            this.rechargeAmount = e.target.innerText;
            this.goods_id = goodsId;
            this.money = ''
        },     
        wxpay(pay_params) {
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
                        setTimeout(()=>{
                            that.$router.go(-1)
                        },1000)
                    }
                }
            ); 
        },  
    },
    filters:{
		//格式化金钱
        formatMoney:function(val){
            return "¥" + parseInt(val)
        }
	}
 

}
</script>

<style lang="stylus" scoped>
.Recharge
    width 100%
    min-height 100vh
    background #fef6d7
    .content
        padding 0 24px
        box-sizing border-box
        font-family 'SourceHanSansHWSC-Regular'
        .input-amount
            margin 20px auto
            height 90px
            display flex
            align-items center
            border-bottom 1px solid #ccc
            input 
                width 100%
                height 60px
                line-height 60px
                font-size 28px
        .tips
            color #d90000
        .amount-list
            display flex
            flex-wrap wrap
            .amount-item
                width 220px
                height 110px
                font-size 30px
                text-align center
                line-height 110px
                border 2px solid #8c8c8c
                border-radius 8px
                margin-right 20px
                margin-bottom 24px
                box-sizing border-box
                position relative
                &:nth-child(3n)
                    margin-right 0
                &.active
                    border-color #e6b15c
                &.active .isCheck
                    width 41px
                    height 31px
                    position absolute
                    right 0
                    bottom 0
                    background url("/static/images/user/check-gou.png") no-repeat
                    background-size 100%
        .foot-info
            width 100%
            padding 0 24px
            box-sizing border-box
            position fixed
            left 0
            bottom 0
            z-index 9
            .recharge-amount
                font-size 36px
                text-align center
            .confirm-btn
                width 100% 
                height 88px
                line-height 88px
                text-align center
                color #fff
                font-size 30px
                letter-spacing 4px
                border-radius 40px
                margin 34px auto
</style>
