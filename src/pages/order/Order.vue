<template>
    <div class="Order">
        <div class="TopHeader">
            <div class="TopHeader-inner">
                <span class="topheader-msg">我的订单</span>
                <i class="backBtn iconfont icon-fanhui" @click="jumpTo()"></i>
            </div>

             <!-- tab切换标题 -->
            <div class="tab-tit">
                <div class="tab-tit-inner">
                    <ul>
                        <li v-for="(item,index) in tabList"
                            :class="{active:index == nowIndex}"
                            
                            @click="handleClick(index)"
                            :key="index">
                            <span class="tab-tit-icon " :class="'tit-icon-'+index"></span>
                            <span>{{item.tabTitle}}</span>
                            <i class="active-icon"></i>
                        </li>
                    </ul>
                </div>
            </div>
		</div>
        <div class="tab-wrap">
            <!-- tab切换标题 -->
            <!-- <div class="tab-tit">
                <ul>
                    <li v-for="(item,index) in tabList"
                        :class="{active:index == nowIndex}"
                        
                        @click="handleClick(index)"
                        :key="index">
                        {{item.tabTitle}}
                    </li>
                </ul>
            </div> -->

            <div class="tab-con">
                <div v-if="nowIndex < 5">
                    <div class="item-card" v-for="(item,index) in allOrders" :key="index">
                        <div class="card-head">
                            <span class="order-date">{{item.order_sn}}</span>
                            <span class="order-state" v-if="item.status===1">待付款</span>
                            <span class="order-state" v-if="item.status===2">待发货</span>
                            <span class="order-state" v-if="item.status===3">待收货</span>
                            <span class="order-state" v-if="item.status===4 && item.comment == 0">交易成功</span>
                            <span class="order-state" v-if="item.status===5">已取消</span>
                            <!-- <span class="order-state" v-if="item.status===6">待退款</span> -->
                            <!-- <span class="order-state" v-if="item.status===7">已退款</span> -->
                            <!-- <span class="order-state" v-if="item.status===8">拒绝退款</span> -->
                            <span class="order-state" v-if="item.status===4 && item.comment == 1">已评价</span>
                        </div>
                        <router-link :to="'/Order/OrderDetails?order_id=' + item.order_id">
                            <div class="goods-item">
                                <div class="-item-list" v-for="(info,key) in item.goods" :key="key">
                                    <div class="img-wrap">
                                        <img :src="info.img" />
                                    </div>
                                    <div class="text">
                                        <h3>{{info.goods_name}}</h3>
                                        <div class="good-sku">
                                            <span class="sku-coll">{{info.spec_key_name}}</span>
                                            <span class="price">
                                                <p class="tr">{{info.goods_price | formatMoney}}</p>
                                                <p class="tr color-8"> x {{info.goods_num}}</p>
                                                <p class="btn" v-if="item.status == 3"><router-link class="color-8" :to="'/order/LogisticsDetail?order_id='+item.order_id+'&goods_id='+info.goods_id">查看物流</router-link></p>
                                                <p class="btn" v-if="item.status == 4"><router-link class="color-8" :to="'/order/LogisticsDetail?order_id='+item.order_id+'&goods_id='+info.goods_id">查看物流</router-link></p>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        
                        </router-link>
        
                        <div class="total-bar">
                            <div class="total-count">共{{item.goods_num}}件商品 </div>
                            <div class="payment">
                                <span class="label">合计 : </span>
                                <span class="price">{{item.order_amount | formatMoney}}</span>
                                <span class="-price" v-if="item.shipping_price > 0">(含运费{{item.shipping_price}})</span>
                            </div>
                        </div>
                        <div class="order-btn">
                            <!-- 待付款 -->
                            <div v-if="item.status == 1">
                                <span class="btn" @click="cancelOrder(index,item.order_id,item.status)">取消订单</span>
                                <span class="btn red" @click="payment(item.order_id,item.pay_type,item.total_amount)">去付款</span>
                            </div>
                            <!-- 待发货 -->
                            <!-- <div v-if="item.status == 2">
                                <router-link v-if="item.is_refund==1" :to="'/Order/ReturnRequest?order_id='+item.order_id"><span class="btn red">退款</span></router-link>
                            </div> -->
                            <!-- 待收货 -->
                            <div v-if="item.status == 3">
                                <!-- <span class="btn"><router-link class="color-8" :to="'/order/LogisticsDetail?order_id='+item.order_id">查看物流</router-link></span> -->
                                <span class="btn red" @click="confirmReceipt(index,item.order_id,item.status)">确定收货</span>
                            </div>
                            <!-- 交易成功 -->
                            <div v-if="item.status == 4">
                                <!-- <span class="btn">查看物流</span> -->
                                <!-- <span class="btn"><router-link class="color-8" :to="'/order/LogisticsDetail?order_id='+item.order_id">查看物流</router-link></span> -->
                                <span class="btn red" v-if="item.comment == 0"><router-link :to="'/Order/Evaluate?order_id='+item.order_id+'&sku_id='+item.goods[0].sku_id+'&goods_id='+item.goods[0].goods_id">去评价</router-link></span>
                                <!-- <span class="btn red" v-else><router-link :to="'/Order/Evaluate?order_id='+item.order_id">订单已完成</router-link></span> -->
                                <span class="btn red" v-else @click="delOrder(index,item.order_id,item.status)">删除订单</span>
                            </div>
                            <!-- 已取消 -->
                            <div v-if="item.status == 5">
                                <span class="btn" @click="delOrder(index,item.order_id,item.status)">删除订单</span>
                                <span class="btn red"><router-link :to="'/Details?goods_id='+item.goods[0].goods_id">重新购买</router-link></span>
                            </div>
                            <!-- 待退款 -->
                            <!-- <div v-if="item.status == 6">
                                <span class="btn red" @click="cancelRefund(index,item.order_id,item.status)">取消退款</span>
                            </div> -->
                            <!-- 已退款 -->
                            <!-- <div v-if="item.status == 7">
                                <span class="btn red" @click="delOrder(index,item.order_id,item.status)">删除订单</span>
                            </div> -->
                            <!-- 拒绝退款 -->
                            <!-- <div v-if="item.status == 8">
                                <router-link :to="'/Order/ReturnRequest?order_id='+item.order_id"><span class="btn red">重新申请</span></router-link>
                            </div> -->
                        </div>
                    </div>
                </div>

                 <!-- 数据加载完提示 -->
                <div class="end-wrap" v-show="isBotom">
                    <p>我是有底线哦~~</p>
                </div>

                <!-- 无数据 -->
                <div class="none" v-show="allOrders.length == 0">
                    <img src="/static/images/public/none-icon.png"/>
                    <p class="dian"><span>亲！您还没有此类订单哦~~</span></p>
                </div>
            </div>

        </div>
        <!-- 底部导航 -->
		<div class="foot-height136"></div>
        <Navigate></Navigate>
    </div>
</template>

<script>
import TopHeader from "@/pages/common/header/TopHeaderOld"
import Navigate from "@/pages/common/footer/Navigate";
export default {
    name:'Order',
    components: {
        TopHeader,
        Navigate
    },
    data(){
        return{
            nowIndex:0,
            type:this.$route.query.type,
            // tab切换标题
            tabList:[
                {
                    tabTitle:"全部"
                },
                {
                    tabTitle:"待付款"
                },
                {
                    tabTitle:"待发货"
                },
                {
                    tabTitle:"待收货"
                },
                {
                    tabTitle:"待评价"
                }
                // ,
                // {
                //     tabTitle:"50元专区"
                // }
            ],
            baseUrl:'',// 商品图片路径
            allOrders:[],//全部订单
            page:1,//页数
            ispage:true,//是否请求数据
            isBotom:false,
            order_id:'',
            pay_type:'',//支付方式
            token:this.$store.getters.optuser.Authorization,
        }
    },
    created(){
        this.$store.commit('showLoading')               //加载loading
    },
    // 模板渲染完成后执行
    mounted(){
        this.nowIndex = this.$route.query.type;
        this.requestData();
        window.addEventListener('scroll', this.scrollBottom);
    },
    methods:{
        // tab切换标题
        handleClick(index){
            this.nowIndex = index;
            this.$router.replace('/Order?type='+index);
            this.type = this.$route.query.type;
            this.page = 1;
            this.ispage=true
            this.requestData();
        },
        scrollBottom(){
            let _this = this;
            let scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
            let windowHeight = document.documentElement.clientHeight || document.body.clientHeight;
            let scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight;
            if(scrollTop + windowHeight == scrollHeight){
                this.page ++;
                _this.requestData();
            }
        },
        // 页面数据渲染
        requestData(){
            // this.isBotom =false
            let type = null;
            switch(this.$route.query.type){
                case '0':
                    type = 'all'
                    break;
                case '1':
                    type = 'dfk'
                    break;
                case '2':
                    type = 'dfh'
                    break;
                case '3':
                    type = 'dsh'
                    break;
                case '4':
                    type = 'dpj'
                    break;
                // case '5':
                //     type = 'fifty'
                //     break;
            }
            if(this.ispage){
                var url = 'order/order_list';
                this.$axios.post(url,{
                    token:this.token,
                    type:type,
                    page:this.page
                })
                .then( (res)=>{
                    if(res.data.status == 200){
                        if(this.page == 1){ 
                           this.allOrders = res.data.data  
                           this.isBotom =false                         
                        }else{
                            if(res.data.data.length > 0){
                               //如果有数据,拼接数组
                                this.allOrders = this.allOrders.concat(res.data.data); 
                            }else{
                                this.ispage = false
                                this.isBotom =true
                                this.page =1
                            }
                        }                        
                    }else if(res.data.status == 999){
                        this.$store.commit('del_token'); //清除token
                        setTimeout(()=>{
                            this.$router.push('/Home')
                        },1000)
                    }else{
                        this.$toast(res.data.msg)
                    }
                    this.$store.commit('hideLoading')
                })
                .catch((error) => {
                    alert('请求错误:'+ error)
                })
            }
        },
        
        /**
         * 封装修改状态方法
         */
        editStatus(index,order_id,status,items,tips){
            let url = 'Order/edit_status';
            this.$dialog.confirm({
               message: tips
            })
            .then(() => {
                // on confirm
                this.$axios.post(url,{
                    token:this.token,
                    order_id:order_id,
                    status:status
                }).then( (res) => {
                    if(res.data.status === 200){
                        items.splice(index,1)
                        this.$toast(res.data.msg)
                    }
                    else if(res.data.status == 999){
                        this.$toast(res.data.msg)
                        this.$store.commit('del_token'); //清除token
                        setTimeout(()=>{
                            this.$router.push('/Home')
                        },1000)
                    }
                    else{
                        this.$toast(res.data.msg)
                    }
                })
                .catch((error) => {
                    console.log('请求错误:'+ error)
                })
            }).catch(() => {
                // on cancel
               
            })
        },
        /**
         * 取消订单 
         */
        cancelOrder(index,order_id,status){
            var tips = '您确定要取消订单吗？';
            this.editStatus(index,order_id,status,this.allOrders,tips);    
        },
        /**
         * 删除订单
         */
        delOrder(index,order_id,status){
            var tips = '您确定要删除订单吗？'
            this.editStatus(index,order_id,status,this.allOrders,tips) 
        },
        /**
         * 立即付款
         */
        payment(order_id,type,price){
            this.$router.push('/pay/PayWay?order_id='+order_id+'&pay_type='+type+'&price='+price);
        },
        /**
         * 取消申请退款
         */
        cancelRefund(index,order_id){
            this.$dialog.confirm({
               message: '您确定要取消申请退款吗？'
            })
            .then( () => {
                let url = 'Order/cancel_refund';
                this.$axios.post(url,{
                    order_id:order_id,
                    token:this.$store.getters.optuser.Authorization                    
                }).then( (res) => {
                    if(res.data.status === 200){
                        this.allOrders.splice(index,1);  
                        this.$toast("取消申请退款成功！");
                    }
                    else if(res.data.status == 999){
                        this.$toast(res.data.msg)
                        this.$store.commit('del_token'); //清除token
                        setTimeout(()=>{
                            this.$router.push('/Home')
                        },1000)
                    }
                    else{
                        this.$toast(res.data.msg);
                    }
                })
            }).catch(() => {
                // on cancel
            })

        },
    
        /**
         * 确认收货
         */
        confirmReceipt(index,order_id,status){
            var tips = '您要确认收货吗？'
            this.editStatus(index,order_id,status,this.allOrders,tips) 
        },
        /**
         * 评价订单
         */ 
        evaluateOrder(item){
            if(item.comment === 1){
                this.$toast("你已评价过此商品")
            }else{
                this.$router.push('/Order/Evaluate?order_id='+ item.order_id);
            }
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
		}
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

            return y + '-' + MM + '-' + d + ' ' + h + ':' + m + ':' + s;
        },
        //格式化金钱
        formatMoney:function(val){
            return "¥" + Number(val).toFixed(2)
        }
    },
    destroyed: function () {
        window.removeEventListener('scroll', this.scrollBottom);
    },
   

}
</script>

<style lang="stylus" scoped>
.dian
  img:nth-of-type(1)
    margin-right: 7px;
  img:nth-of-type(2)
    margin-left: 7px;
  img
    width 16px !important
    height 16px !important
    position: relative;
    top: -1px;
    
.btn
    height 49px
    line-height 49px
    background-color #ebe9f3
    border-radius 25px
    font-size 20px
    color #959595
    text-align center
    display inline-block
    margin-left 16px
    font-family: 'PangMenZhengDao'
    padding 0 22px
    width 120px
.color-8
    color:#888
.Order
    min-height 100vh
    background #fef6d7
    font-family: 'SourceHanSansHWSC-Regular'
    .TopHeader
        width 100%
        color #151515
        font-size 30px
        // background-color #ffffff
        text-align center
        position fixed
        top 0
        left 0
        z-index 9
        font-family "PangMenZhengDao"
        letter-spacing 4px
        .TopHeader-inner
            height 88px
            line-height 88px
            background #fff
            // background-image linear-gradient(90deg,#fc8cfa 0%,  #a281ed 47%, #737cf6 68%, #4377ff 100%)
            // box-shadow 0px 21px 58px 10px rgba(134, 126, 240, 0.63)
            width 100%
            color #000
            font-weight bold
            letter-spacing 4px
            .topheader-msg
                display inline-block
                transform scale(1,1.2)
            .backBtn
                width 10%
                position absolute
                left 0
                top 0
                font-size 36px
        .tab-tit
            width 650px
            margin auto
            .tab-tit-inner
                background #fff
                // box-shadow 0px 10px 15px 6px rgba(96, 113, 186, 0.1)
                border-bottom-left-radius 32px
                border-bottom-right-radius 32px
            ul
                border-top 1px solid #e6e6e6
                line-height 54px
                background-color #ffffff
                display flex
                align-items center
                justify-content space-between
                padding 24px 24px 0
                box-sizing border-box
                margin-bottom 20px
                // box-shadow 0px 10px 15px 6px rgba(96, 113, 186, 0.3)
                border-bottom-left-radius 32px
                border-bottom-right-radius 32px
                li
                    color #909090
                    font-size 18px
                    margin-bottom -2px
                    border-bottom 10px solid transparent
                    position relative
                    .tab-tit-icon
                        display block
                        width 40px
                        height 40px
                        margin auto
                    .tit-icon-0
                        background url('/static/images/order/or_1.png') no-repeat
                        background-size 100% 100%
                    .tit-icon-1
                        background url('/static/images/order/or_2.png') no-repeat 0 3px
                        background-size 100% 90%
                     .tit-icon-2
                        background url('/static/images/order/or_3.png') no-repeat
                        background-size 100% 100%
                    .tit-icon-3
                        background url('/static/images/order/or_4.png') no-repeat
                        background-size 100% 100%
                    .tit-icon-4
                        background url('/static/images/order/or_5.png') no-repeat
                        background-size 100% 100%
                    &.active
                        .active-icon
                            background #d90000
                            border-bottom-left-radius 6px
                            border-bottom-right-radius 6px
                            position: absolute
                            bottom -18px
                            left 0
                            width 100%
                            height 10px

                        // color #f11010
            // font-size 36px  
    .tab-wrap
        padding-top 260px
        .tr
            text-align: right
        .color-8
            color:#888
        .tab-con
            padding 0 24px
            box-sizing border-box
            .item-card
                width 650px
                background-color #ffffff
                box-shadow 0px 10px 15px 6px rgba(96, 113, 186, 0.1)
                border-radius 32px
                margin 0 auto 20px
                a
                    display block
                .card-head
                    height 55px
                    border-bottom 3px solid #e5e5e5
                    display flex
                    align-items center
                    justify-content space-between
                    padding 0 36px
                    box-sizing border-box
                    .order-date
                        font-size 20px
                        color #000
                    .order-state
                        font-size 20px
                        color #000
                        position relative
                        display flex
                        align-items center
                        &:before
                            content ''
                            width 15px
                            height 15px
                            display inline-block 
                            background url("/static/images/public/dot-icon.png") no-repeat
                            background-size 14px 14px
                            margin-right 7px
                .goods-item
                    display flex
                    padding 25px 38px 10px
                    flex-wrap: wrap;
                    box-sizing border-box
                    .-item-list
                        width: 100%;
                        display: flex;
                        margin-bottom 18px
                    .img-wrap
                        width 200px
                        height 150px
                        text-align center
                        margin-right 20px
                        border-radius 25px
                        img 
                            max-width 100%
                            max-height 100%
                            display block
                            border-radius 25px
                    .text
                        width 410px
                        h3
                            font-size 24px
                            line-height 34px
                            color #313131
                            font-weight normal
                            overflow hidden
                            text-overflow ellipsis
                            display -webkit-box
                            -webkit-line-clamp 2
                            -webkit-box-orient vertical
                            margin-bottom 15px
                        .good-sku
                            color #707070
                            display flex
                            justify-content space-between
                            .sku-coll
                                width 290px
                                font-size 18px
                                overflow hidden
                                text-overflow ellipsis
                                white-space nowrap
                            
                        .count
                            text-align right 
                            font-size 24px
                .total-bar
                    height 40px
                    color #6f6f6f
                    display flex
                    justify-content flex-end
                    align-items center
                    margin-bottom 24px  
                    padding 0 38px
                    box-sizing border-box
                    line-height 26px
                    letter-spacing 1px
                    color #707070
                    .total-count
                        line-height 40px
                    .payment
                        margin-left 20px
                        line-height 40px
                        font-size 24px
                        .label
                            position relative
                            top -2px
                        .price
                            color #1b1b1b
                        .-price
                            color #888
                .order-btn
                    display flex
                    justify-content flex-end
                    padding 0 38px 22px
                    box-sizing border-box
                    .btn
                        // width 144px
                        height 49px
                        line-height 49px
                        background-color #f8f8f8
                        border-radius 25px
                        font-size 26px
                        letter-spacing 3px
                        color #959595
                        text-align center
                        display inline-block
                        margin-left 16px
                        font-family: 'PangMenZhengDao'
                        padding 0 22px
                        &.red
                            color #fff
                            // border-color #f20c0c
                            background-color: #e32600;
                            box-shadow: 0px 5px 10px 0px #e32600;
                            a
                                color #fff
            .fifty_wrap
                padding 25px 20px 0
                background #fff
                margin-bottom 14px
                .time
                    margin-bottom 15px
                    font-size 22px
                    color #151515
                    line-height 55px
                    border-bottom 2px solid #e6e6e6
                .nick_wrap  
                    position relative 
                    .img_wrap     
                        img    
                            margin 0 auto
                            display block
                            width 660px
                            height 280px
                            border-radius 10px
                    .nickname
                        padding 10px 15px
                        position absolute
                        top 0
                        left 0
                        background rgba(0,0,0,0.5)
                        font-size 26px 
                        color #fff
                        border-radius 10px
                        p 
                            text-align center
                            line-height 35px        
                .viewBtn
                    margin 10px 0 15px 505px
                    width 130px
                    height 40px
                    line-height 40px
                    color #888888
                    text-align center
                    display inline-block
                    font-size 26px
                    border-radius 15px
                    border 2px solid #888888
                    a
                        color #888

                .num-bar
                    color #6f6f6f
                    line-height 75px
                .num-bar .total_wrap,.count
                    display inline-block  
                .total_wrap  
                    float right 
                .total_wrap .total-count,.payment
                    display inline-block 
                .payment
                    padding 0 0 0 15px          

            .end-wrap
                font-size 18px
                color #888888
                text-align center
                margin 30px auto
                display none
            .none
                text-align center
                margin-top 64%
                font-size 28px
                img
                    width 135px
                p
                    color #909090
                    margin 20px 14px
                    display flex
                    align-items center
                    justify-content center
                    padding 0 6px
                    // &:before
                    //     content ''
                    //     width 16px
                    //     height 16px
                    //     display inline-block 
                    //     background url("/static/images/public/dot-icon.png") no-repeat
                    //     background-size 14px 14px 
                    //     margin-right 14px
                    // &:after
                    //     content ''
                    //     width 16px
                    //     height 16px
                    //     display inline-block 
                    //     background url("/static/images/public/dot-icon.png") no-repeat
                    //     background-size 14px 14px 
                    //     margin-left 14px
                    span
                        display inline-block
                        transform scale(1,1.1)
                        font-size 24px
                        letter-spacing 5px
                        font-family 'SourceHanSansHWSC-Regular'
            .addBtn
                width 460px
                height 100px
                line-height 100px
                text-align center
                color #ffffff
                font-size 50px
                background-color #ea2028 
                margin 0 auto
                border-radius 46px              
        .popup
            width 100%
            .van-password-input__security li:first-child
                border-left 1px solid #999
            .van-password-input__security li
                border 1px solid #999
                border-left 0
            .van-password-input
                padding 30px 0 20px
        .van-number-keyboard
            z-index 3000!important
        
            


                

</style>
