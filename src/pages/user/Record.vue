<template>
    <div class="Record">
        <TopHeader :custom-title="custom_title[type-1]">
			<i slot="backBtn" class="iconfont icon-fanhui"></i>
		</TopHeader>
        <div v-if="type==1">
            <div class="Record_item" v-for="(item,index) in teamList.data" :key="index">
                <div class="time">
                    {{item.create_time | formatDate}}
                    <!-- <span>单号:4564564564564</span> -->
                </div>
                <div class="info">
                    <!-- <img src="http://www.imnebula.com/static/images/headimg/20190711156280864771502.png" alt=""> -->
                    <div class="name" style="width:75%">
                        {{item.note}}
                    </div>
                    <div class="price" style="width:25%">
                        <p>收益</p>
                        <p>{{item.balance}} 斤酒</p>
                    </div>
                </div>
            </div>
        </div>
        
        <div v-if="type==2">
            <div class="Record_item" v-for="(item,index) in teamList.list" :key="index">
                <div class="time">
                    {{item.createtime | formatDate}}
                    <span>订单状态:{{item.status>1?'审批不通过':(item.status==1?'待审批':'通过审批')}}</span>
                </div>
                <div class="info">
                    <!-- <img src="http://www.imnebula.com/static/images/headimg/20190711156280864771502.png" alt=""> -->
                    <div class="name publicEllipsis" style="width:80%;">
                        {{item.type_money==1?'提现':'提酒'}} {{item.money}} {{item.type_money==1?'元':'斤'}}
                        <span v-if="item.type==1&&item.type_money==1"> 到 余额</span>
                        <span v-if="item.type==2&&item.type_money==1"> 到 微信</span>
                        <span v-if="item.type==3&&item.type_money==1"> 到 支付宝</span>
                        <span v-if="item.type==4&&item.type_money==1"> 到 银行卡</span>
                    </div>
                    <div class="price" v-if="item.type_money==1">
                        <p>手续费</p>
                        <p>{{item.taxfee}}￥</p>
                    </div>
                </div>
            </div>
        </div>

        <div v-if="type==3">
            <div class="Record_item" v-for="(item,index) in teamList" :key="index">
                <div class="time">
                    {{item.create_time | formatDate}}
                    <span>单号:{{item.order_sn | order_sn}}</span>
                </div>
                <div class="info">
                    <!-- <img src="http://www.imnebula.com/static/images/headimg/20190711156280864771502.png" alt=""> -->
                    <div class="name" style="width:80%">
                        充值时间 {{item.pay_time | formatDate}}
                    </div>
                    <div class="price">
                        <p>充值</p>
                        <p>{{item.amount}}￥</p>
                    </div>
                </div>
            </div>
        </div>
        <div v-if="type==4">
            <div class="Record_item" v-for="(item,index) in teamList" :key="index">
                <div class="time">
                    {{item.create_time | formatDate}}
                </div>
                <div class="info">
                    <!-- <img src="http://www.imnebula.com/static/images/headimg/20190711156280864771502.png" alt=""> -->
                    <div class="name" style="width:70%">
                        <p>{{item.type==1?'兑换余额':'兑换酒'}}</p>
                        {{item.description}}
                    </div>
                    <div class="price">
                        <p>兑换数量</p>
                        <p v-if="item.type==1">{{item.money}}斤酒</p>
                        <p v-else>{{item.money}}元</p>
                    </div>
                </div>
            </div>
        </div>
        <!-- 无数据 -->
        <div class="none" v-if="teamList.list == '' ||teamList.data == '' ||teamList == ''">
            <img src="/static/images/public/none-icon.png"/>
            <p class="dian"><span>您还没相关订单</span></p>
        </div>
    </div>
</template>

<script>
    import TopHeader from "@/pages/common/header/TopHeader";
    export default {
        name:'IncomeRecord',
        components: {
            TopHeader
        },
        data(){
            return{
                type:'',
                custom_title:['收益记录','提现记录','充值记录','兑换记录'],
                teamList:''
            }
        },
        mounted(){
            this.type = this.$route.query.type;
            this.getInfo();
            window.addEventListener('scroll', this.scrollHander)
        },
        destroyed () {
            window.removeEventListener('scroll',this.scrollHander)
        },
        methods:{
            getInfo(){
                let _that=this,
                url = '';
                switch(this.type){
                    case '1':
                        url = 'user/distribut_list'
                        break;
                    case '2':
                        url = 'user/withdrawal_list'
                        break;
                    case '3':
                        url = 'user/recharge_list'
                        break;
                    case '4':
                        url = 'user/exchange_money'
                        break;
                }
                _that.$axios.post(url,{
                    token:this.$store.getters.optuser.Authorization
                }).then((res)=>{
                    var list =res.data
                    if(list.status===200){
                        _that.teamList = list.data;
                        this.$store.commit('hideLoading')
                    }else{
                        _that.$toast(list.msg)
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

                return y + '-' + MM + '-' + d + ' ' + h + ':' + m + ':' + s;
            },
            order_sn:function (sn){
                return sn.replace('recharge','');
            }
        },
    }
</script>

<style lang="stylus" scoped>
.Record
    width 100%
    height 100vh
    overflow-y scroll
    background #fef6d7
    .TopHeader
        .iconfont
            font-size 45px
    .Record_item
        margin 20px auto
        width 702px
        height 240px
        border-radius 20px
        background #fff
        .time
            padding 0 20px
            line-height 50px
            border-bottom 1px solid #ccc
            span
                float right 
        .info
            display flex
            height 180px
            padding 0 20px
            justify-content flex-start
            align-items center
            img 
                margin-right 20px
                width 100px
                height 100px
                border-radius 50%
                box-shadow 0 2px 5px 2px #ccc 
        .name
            margin-right 20px
            width 55%
        .price
            text-align center
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
            img
                width 15px
                height 15px
            span
                display inline-block
                transform scale(1,1.1)
                font-size 24px
                letter-spacing 5px
                font-family 'SourceHanSansHWSC-Regular'
</style>