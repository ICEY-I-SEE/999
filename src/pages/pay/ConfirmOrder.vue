<template>
    <div class="confrim-order">
      	<!-- 头部组件 -->
		<TopHeader custom-title="订单确认">
            <i slot="backBtn" class="iconfont icon-fanhui"></i>
		</TopHeader>

         <!-- No INFO START -->
        <div v-show="goodsList==''" class="no-info" >
            <Nodata :nodatas="nodatas"></Nodata>
        </div>
       <!-- GOODS LIST START -->

        <div v-if="goodsList!=''" class="com-list">
            <div class="content">
                <div class="user-info-wrap mb-10">

                    <router-link to="/user/Address?edit_address=1"  class="user-info" v-if="addrRes.length !== 0    ">
                        <i class="iconfont icon-ditu"></i>
                        <div class="-info-list">
                            <p class="-list-a">
                                <strong class="mr-44">{{addrRes.consignee}}</strong>
                                <strong>{{addrRes.mobile}}</strong>
                            </p>
                            <p class="-list-b">
                                {{addrRes.address}}
                            </p>
                        </div>
                        <div class="-list-edit"><i class="iconfont icon-bianji"></i></div>
                    </router-link>


                    <router-link to="/user/Address?edit_address=1"  class="user-info" v-else>
                        <i class="iconfont icon-ditu"></i>
                        <div class="-info-list">
                            <p>暂无收货地址</p>
                        </div>
                        <div class="-list-edit"><i class="iconfont icon-bianji"></i></div>
                    </router-link>


                    <div class="id-card" v-if="goodsList.is_overseas==1">
                        <div class="id-card-nub">
                            <span class="id-card-subitle"><i class="iconfont icon-credentials_icon"></i>身份证</span>
                            <span class="height-line">*</span>
                            <input type="text" class="id-card-inp" placeholder="请输入身份证" v-model="idCard"/>
                        </div>
                        <div>
                            <p class="id-card-msg">{{goodsList.hw_tishi}}</p>
                            <p class="id-card-link"><router-link :to="'/pay/IdCardExplain?hw_id='+goodsList.hw_id" class="look-detail">查看详情>></router-link></p>
                        </div>
                    </div>


                </div>
                <!-- GOODS START -->
                <div class="goods-list">
                    <router-link :to="'/Details?goods_id='+item.goods_id"  v-for="(item,index) in goodsList.goods_res" :key="index" class="g-list-a">
                        <img class="-list-img" :src="item.img" />
                        <div class="-detial-">
                            <p class="-d-msg apostrophe">{{item.goods_name}} {{item.spec_key_name}}</p>
                            <div class="-d-msg2">
                                <span>￥ {{item.goods_price}}</span>
                                <span>x {{item.goods_num}}</span>
                                <p v-if="Number(item.vip_money)>0">会员折扣价 ￥{{item.vip_money}}</p>
                            </div>
                        </div>
                    </router-link>
                    <div class="g-list-b">
                        <!-- <div class="-list-1">
                            <span class="-b-subtitle">购买数量</span>
                            <span class="-option-">
                                <i class="subling iconfont icon-jian-" @click="reducingNumber()"></i>
                                <input class="inp" type="number" :value="goodsNumber" @change="changNumber($event)"/>
                                <i class="puls iconfont icon-jia"  @click="addNumber()"></i>
                            </span>
                        </div> -->
                          <!-- 代金券 -->
                        <div class="row-line" v-show="this.couponList.length > 0 || couponArray.length > 0  ">
                            <van-cell-group class="goods-cell-group">
                                <!-- 优惠券单元格 -->
                                <van-cell is-link  @click="getCoupon = true" v-if="is_free!=1 && goodsList.turntable_id ==0">
                                    <template slot="title">
                                        <span class="subtitle" style="margin-right: 10px;">代金券</span>
                                        <span class="text" style="float:right" ref="text">{{couponsPrice}}</span>
                                    </template>
                                </van-cell>

                                <!-- 优惠券列表 -->
                                <div class="coupon-drawer" :class="{open:getCoupon}" >
                                    <div class="coupon-drawer-dialog">
                                        <div class="body">
                                            <div class="coupon-list">
                                                <div class="single-item" v-for="(item,index) in couponList" @click="useCoupon(item)" :key="index">
                                                    <div class="coupon-amount">{{item.price | formatPrice}}<span class="unit">元</span></div>
                                                    <div class="coupon-info">
                                                        <p class="coupon-name">{{item.title}}</p>
                                                        <!-- <p class="validity-date">永久有效</p> -->
                                                        <p class="get-date">{{item.add_time | formatDate}} 获得</p>
                                                        <p class="validity-date">{{item.use_time | formatDate}} 失效</p>
                                                    </div>
                                                </div>
                                            </div>                                            
                                            <!-- 暂无可使用优惠券 -->
                                            <div class="none" v-if="couponList.length<1 || couponArray.length <1">
                                                <img src="/static/images/public/none.png" >
                                                <p>暂无可使用代金券</p>
                                            </div>
                                        </div>
                                        <div class="un-use" @click="closeCoupon()">不使用代金券</div>
                                    </div>

                                    <div class="coupon-drawer-mask" @click="getCoupon=false" @touchmove.prevent></div>

                                </div>
                            </van-cell-group>   

                        </div>

                        <ul>
                            <li class="op-list">
                                <span>运费</span>
                                <div>
                                    <span class="-freight" v-if="shipping_price ==0 ">免运费</span>
                                    <span class="" v-else="">快递 {{shipping_price}} 元</span>
                                </div>
                            </li>
                            <li class="op-list">
                                <span>数量</span>
                                <span>{{count}} 件</span>
                            </li>
                            <li class="op-list">
                                <span>共计：</span>
                                <span>￥ {{updatePrice | payPrice(checkedYh)}} </span>
                            </li>
                            <li class="op-list">
                                <span>订单备注</span>
                                <div>
                                    <input type="text" class="-b-inp" placeholder-class="placehor" v-model="userNote" placeholder="选填 请先和商家协商一致" />  
                                </div>
                            </li>
                            <li class="op-list" v-if="is_free==1">
                                <span :style="'font-weight:bold'">暖冬福利(<span :style="'color:#f70a0a;font-size:14px'">仅需加1.00元</span>)</span>
                                <van-checkbox v-model="checkedYh" :checked-color="'#df51c8'"></van-checkbox>
                            </li>
                        </ul>
                        <img src="/static/images/pay/yh.gif" alt="" srcset="" class="yh">
                        <!-- <div class="goods-price">
                            <span>共 {{count}} 件</span>
                            <span>共计：</span>
                            <span>￥ {{updatePrice}} </span>
                        </div> -->
                    </div>
                </div>
                <!--  -->
            </div>
            <!-- FOOTER START -->
            <div class="footer-height"></div>
            <div class="footer">
                <div class="footer-a">
                    <strong class="f-a-a"> 实付款：</strong>
                    <div class="f-a-b">
                        <span class="colorRed size-20">￥<strong class="size-36">{{updatePrice | payPrice(checkedYh)}}</strong></span>
                        <!-- <span class="-freight">免运费</span> -->
                        <!-- <span class="-freight">{if goodsList.shipping_price ==0} 免运费 {else} {{goodsList.shipping_price}} {/if}</span> -->
                    </div>
                </div>
                <div class="footer-b" @click="topay()">提交订单</div>
            </div>
        </div>
    </div>
</template>
<script>
import TopHeader from "@/pages/common/header/TopHeader"
import Nodata from "@/pages/common/nodata/Nodata";

export default {
    components:{
        TopHeader,
        Nodata
    },
    data() {
        return {
            checkedYh:0,
            checked: true,
            count:0,             //下单商品件数
            goodsList:[],        //商品列表
            userNote:"",         //下单备注
            addrRes:{},          //地址列表
            pay_type:1,         //支付方式
            carId:"",           //购物车id
            token:this.$store.getters.optuser.Authorization,
            getCoupon:false, //显示代金券
            couponList: [], //代金券列表
            couponArray:[], //可使用优惠券
            couponsPrice:'',    
            coupon_id:'', //优惠券id  
            idCard:'',
            shipping_price:'',
            is_free:0,
            isClick:false,
            nodatas:{
                'imgSrc':'/static/images/cart/cart_icon.png',
                'text':'没有订单信息~',
                'link':'/Hone',
                'showBtn':true
            },
        };
    },
     
    created(){
        // console.log(goodsList)
        this.$store.commit('showLoading')       //加载loading
        // this.reqCashCoupon();
        
        var info =JSON.parse(sessionStorage.getItem('cartInfo'))
        if(typeof(info.cart_id)!="undifined"){
            this.carId=info.cart_id
        }
    },

    mounted(){  
        this._getCartInfo()
    },

    methods:{
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
            // console.log(this.coupon_id)
        },
        // 不使用代金券
        closeCoupon(){
            this.couponsPrice = '';
            this.getCoupon = false;
        },
        _getCartInfo(){
            var _that =this
            _that.$axios.post('Order/temporary',{
                'cart_id':this.carId,
                'token':_that.token
            })
            .then((res)=>{
                var list = res.data;
                if(list.status == 200){
                    _that.goodsList =list.data
                    _that.coupon = list.data.coupon //代金券    
                    _that.addrRes =list.data.addr_res
                    _that.shipping_pric =list.data.shipping_price
                    _that.is_free =list.data.goods_res[0].is_free
                    _that.pay_data = list.data.pay_type
                    let num = '';
                    list.data.goods_res.forEach(item => {
                        if(!item.goods_num) return num;
                        num = Number(num)+Number(item.goods_num)
                    });
                    _that.count = num
                    // console.log(list.data.shipping_price)
                    // _that.getShipping()
                    this.$store.commit('hideLoading')       //加载loading
                }
                else if(res.data.status == 999){
					this.$toast(res.data.msg)
					this.$store.commit('del_token'); //清除token
					setTimeout(()=>{
						this.$router.push('/Home')
					},1000)
				}
                else{
                    _that.$toast(list.msg)
                }
                this.$store.commit('hideLoading')       //加载loading
            })
        },
        getShipping(){
            var _that =this
            if(this.addrRes==""){
                return
            }
            _that.$axios.post('order/get_shipping_price',{
                'cart_id':this.carId,
                'address_id':this.addrRes.address_id,
                'token':_that.token
            })
            .then((res)=>{
                var list = res.data;
                if(list.status == 200){
                   _that.shipping_price =list.data
                }
                else if(res.data.status == 999){
					this.$toast(res.data.msg)
					this.$store.commit('del_token'); //清除token
					setTimeout(()=>{
						this.$router.push('/Home')
					},1000)
				}
                else{
                    _that.$toast(list.msg)
                }
            })
        },


        topay(){
            var _that =this,checkedYh,
                card =_that.idCard,
                reg =/^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/
            if(_that.goodsList.is_overseas==1){
                if(card=="" || !reg.test(card)){
                    return _that.$toast('请正确输入身份证号')
                }
            }
            if(this.checkedYh){
                checkedYh = 1;
            }else{

                checkedYh = 0;
            }
            if(_that.payPassword == ''&&_that.pay_type == 1){
                this.showPwd = true;
                this.showKeyboard = true;
                this.paswPopup =true
                return false;
            }
            if(!_that.addrRes.address_id){
                _that.$toast('请选择收货地址!')
                return false;
            }
            if(_that.goodsList.mobile==0){
                _that.$toast('请绑定手机号码!')
                setTimeout(()=>{
                    _that.$router.push({name:'SetPhone'})
                },1000)
                return false;
            }
            _that.$axios.post('Order/submitOrder',{
                'cart_id': _that.carId, 
                'address_id': _that.addrRes.address_id,
                'pay_type':_that.pay_type,
                'user_note':_that.userNote,
                'token': _that.token,
                'coupon_id':_that.coupon_id,
                'idon':card,
                'welfare':checkedYh,
                'pwd':_that.payPassword
            })
            .then((res)=>{
                var list = res.data,updatePrice;
                if(list.status == 200){
                    this.order_id = list.data
                    if(_that.checkedYh==1){
                        var row = Number(this.updatePrice) + 1;
                        updatePrice = row.toFixed(2)
                    }else{
                        updatePrice =this.updatePrice
                    }
                    // _that.$toast('下单成功!')
                    // setTimeout(() => {                   
                    //     this.$router.push('/Order/OrderDetails?order_id=' + this.order_id)
                    // },2000)
                    this.$router.push({
                        path: '/Pay/PayWay?order_id=' +this.order_id+'&price='+updatePrice+'&pwd='+this.goodsList.pwd,
                    })
                }
                else if(res.data.status == 999){
					this.$toast(res.data.msg)
					this.$store.commit('del_token'); //清除token
					setTimeout(()=>{
						this.$router.push('/Home')
					},1000)
                }
                else{
                    _that.$toast(list.msg)
                }
            })
        },
        /**
         * 删除密码
         */
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
        JumpTo(){   
            this.$router.push('/Home')
        },
    },
    computed:{
        updatePrice(){
            var _that =this
            var goods_res = _that.goodsList.goods_res,
                price =0,
                subtotal =0,
                totalPrice
            for(var i in goods_res){
                price = new Number(price) + new Number(goods_res[i].vip_money>0?goods_res[i].vip_money:goods_res[i].goods_price)
                 console.log(price)
            }
            totalPrice = price + new Number(_that.shipping_price) - this.couponsPrice
            return (totalPrice||0).toFixed(2)
        }
    },
   filters: {
        payPrice:function(val,status){
            if(status){
                let total = Number(val) + 1;
                return Number(total).toFixed(2)
            }else{
                return val
            }
        },
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
}
</script>

<style lang="stylus" scoped>
    .confrim-order
        .colorRed
            color:#f70a0a
        .size-20
            font-size:20px
        .size-36
            font-size:36px
        .placehor
            font-size 18px
            color:#999
        .mr-44
            margin-right :44px
        .mb-10
            margin-bottom:10px
        .content
            font-family: 'SourceHanSansHWSC-Regular';
            padding:24px
            color:#151515
            .user-info-wrap
                position:relative
                padding:20px 20px 25px
                background: #fff
                border-radius:10px
                .user-info
                    display:flex
                    align-items :center
                    .icon-ditu
                        font-size:40px
                        color: #43c439
                        margin-right:55px
                    .-info-list
                        margin-right:20px
                        .-list-a
                            color:#151515
                            font-size:28px
                            margin-bottom:25px
                        .-list-b
                            font-size 24px
                            color:#555555
                    .-list-edit
                        margin-left :auto
                        .iconfont
                            font-size 30px
                            color #7f7f7f
                .id-card
                    margin 24px
                    .id-card-nub
                        display flex
                        align-items center
                        border-top 1px solid #f5f5f5
                        border-bottom 1px solid #f5f5f5
                        padding 20px 0
                        .id-card-subitle
                            margin-top 8px
                        .iconfont
                            vertical-align middle
                        .id-card-inp
                            width 68%
                            height 50px
                            font-size 28px
                        .height-line
                            font-size 30px
                            line-height 30px
                            color red
                            margin 0 10px 0 30px
                            vertical-align middle
                    .id-card-msg,.id-card-link a
                        font-size 24px
                        color #f30c0c
                        line-height 40px
                    .id-card-link
                        text-align right
            .goods-list      
                padding 20px
                border-radius:10px
                .g-list-a
                    display :flex
                    align-items :center
                    color: #151515;
                    margin-bottom: 15px
                    .-list-img
                        width: 220px
                        height: 165px
                        border-radius 10px
                    .-detial-
                        margin-left:25px
                        .-d-msg
                            font-size 28px
                            font-weight bold
                            margin-bottom 30px
                            overflow hidden
                        .-d-msg2
                            font-size 24px
                        
                .g-list-b
                    margin-top:25px
                    .op-list
                        display flex
                        justify-content space-between
                        align-items center
                        font-size 26px
                        margin-bottom 20px
                        padding-bottom 20px
                        flex-wrap wrap
                        // border-bottom 1px solid #f8f8f8
                        .-b-inp
                            text-align right
                            height 60px 
                        .-b-subtitle
                            margin:0 25px 0 10px
                            font-size:26px
                        .-option-
                            border: 2px solid #e6e6e6;
                            width: 200px;
                            height: 40px;
                            line-height :40px;
                            display :flex;
                            align-items :center;
                            justify-content:space-between;
                            border-radius: 20px;
                            text-align:center;
                            margin-left:115px
                            .iconfont
                                width:41px;
                                height:100%;
                                font-size: 12px;
                            .puls
                                border-left:1px solid #e6e6e6;
                            .subling
                                border-right:1px solid #e6e6e6;
                            .inp
                                width:121px;
                                text-align: center;
                                height:inherit;
                                font-size:24px;
                                font-weight:bold;
                    .-b-msg
                        color:#999
                        margin-right:40px
                    .pay-price
                        padding 20px 0
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
                    .pay-way /deep/ .van-cell
                        padding 20px 0
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
                                background none
                                margin-bottom 20px
                                padding-bottom 20px
                                // border-bottom 1px solid #f8f8f8
                            
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
                                                font-size 146px
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
                    .yh
                        width 100%
                        display block
                    .goods-price
                        font-size 26px
                        text-align center
                        span nth-child(1)
                            color #9d9d9d
                        span nth-child(3)
                            font-size  30px
                            color  #ff112f
            .goods-list2
                margin-top 25px
                display flex
                align-items  center
                justify-content space-between
                flex-wrap  wrap
                font-size 30px
                .goods-list-a
                    width  100%
                    display  flex
                    justify-content  space-between
                    margin-bottom  15px
                    font-size 28px
                    .-list-a-
                        width 89%
                        .van-field__control
                        .-list-a-a
                            display flex
                            align-items center
                            color #757575
                            font-size 28px
                            .van-cell
                                padding 0
                                color  #151515
            .-list2-msg
                color #757575
                margin-top 25px
            .van-radio__icon .van-icon
                border-color #434343
            .van-radio__icon--checked .van-icon
                background-color  #ff7800
                border-color  #ff7800
        .popup
            width 100%
            .van-password-input__security li first-child
                border-left 1px solid #999
            .van-password-input__security li
                border 1px solid #999
                border-left 0
            .van-password-input
                padding 30px 0 20px
        .van-number-keyboard
            z-index 3000!important
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
        .footer-height
            width 100%
            height 140px
        .footer
            position :fixed;
            bottom:0;
            width :100%;
            height:120px;
            left:0;
            background:#fff;
            z-index :2;
            box-shadow: 0px 0px 5px 0px #cccccc;
            display :flex;
            align-items:center
            .footer-a
                width:530px;
                padding-left:28px;
                display:flex;
                .f-a-a
                    display:flex;
                    align-items:center;
                    margin-right: 40px;
                .f-a-b
                    .-freight
                        margin:0 35px
                        font-size 24px
                        color: #757575;
            .footer-b
                width:221px;
                background-image: linear-gradient(90deg,#e63100 0%, #d90000 100%);
                color:#fff;
                line-height:120px;
                text-align: center;
                font-size:30px;
                font-family: 'SourceHanSansHWSC-Bold'
         
</style>



