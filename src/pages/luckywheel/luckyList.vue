<template>
  <div class="luckyDemo">
        <div class="pack">
            <div class="top_back">
                <van-icon name="arrow-left" color="#fff" size="22" @click="back" />
                <div class="title">获奖记录</div>
                <div></div>
            </div>
            <ul class="cont">
                <li class="item" v-for="(item,index) in list" :key="index">
                    <div>
                        <p class="title">{{item.luck_name}}</p>
                        <p class="time">{{item.create_time | filterTime}}</p>
                    </div>
                    <button class="dh-btn" v-if="item.ling_type == 0" @click="draw(item.tt_id,item.id)">兑换</button>
                    <button class="dh-btn b" v-if="item.ling_type == 1">已兑换</button>
                    <button class="dh-btn b" v-if="item.ling_type == 2">兑换中</button>
                </li>
            </ul>
        </div>
  </div>
</template>

<script>
import { Dialog } from 'vant';
export default {
    name:'luckyDemo',
    data(){
        return{
            list:[]
        }
    },
    created(){
        this.reqTurntable();
    },
    methods:{
        back(){
            this.$router.back();
        },
        // 获取转盘列表数据
		reqTurntable(){
			let url = 'turntable/luck_user_list';
			this.$axios.post(url,{
				token:this.$store.getters.optuser.Authorization
			})
			.then((res) => {
				if(res.data.status === 200){
                   this.list = res.data.data;
				}
			})
        },
        draw(tt_id,id){
            var _this = this;
            let url = 'turntable/user_exchange';
            this.$axios.post(url,{
                tt_id:tt_id,
                id:id,
                token:this.$store.getters.optuser.Authorization
            })
            .then((res) => {
                var info = res.data.data;
                if(res.data.status === 200){
                    this.$toast('领取优惠卷成功')
                    _this.reqTurntable();
                }else if(res.data.status === 9100){
                    this.add_cart(info.sku_id
                    ,info.cart_number,info.session_id,info.turntable_id)
                }else if(res.data.status === 999){
                    _this.$store.commit('del_token'); //清除token
                    setTimeout(()=>{
                        _this.$router.push('/Home')
                    },1000)
                }else{
                    _this.$toast(res.data.msg)
                }
            })
        },
        add_cart(sku_id,cart_number,session_id,turntable_id){
            var _this = this;
            let url = 'cart/addCart';
            _this.$axios.post(url,{
                'sku_id':sku_id,
                'cart_number':cart_number,
                'token':_this.$store.getters.optuser.Authorization, 
                'session_id':session_id,  //直接购买
                'turntable_id':turntable_id
            })
            .then((res)=>{
                var list = res.data;
                if(list.status == 200){
                    console.log(list.data.cart_id)
                    sessionStorage.setItem('cartInfo',JSON.stringify({'cart_id': list.data.cart_id}))
                    _this.$router.push({
                        path: '/pay/ConfirmOrder',
                        name:'ConfirmOrder',
                    })
                }else{
                    _this.$toast(list.msg)
                }
            })
        },
    },
    filters:{
        filterTime(val){
            var date = new Date(val * 1000)
            var y=date.getFullYear(); 
            var m=date.getMonth()+1; 
            var d=date.getDate(); 
            var h=date.getHours(); 
            var i=date.getMinutes(); 
            var s=date.getSeconds(); 
            return y+"-"+m+"-"+d+" "+h+":"+i+":"+s;
        }
    }
}
</script>

<style lang="stylus" scoped>
.luckyDemo
    width 100%
    min-height 100vh
    background #4977FE
    position relative
    padding-bottom 60px
    .pack
        background url('/static/images/luckywheel/news/bg.png') no-repeat
        background-size 100%
        width 100%
        min-height 100vh
        .top_back
            display flex
            justify-content space-between
            padding 20px 24px 0
            align-items center
            height 100px
            .title
                font-size:36px;
                color #fff
        .cont
            width 100%
            li
                display flex
                align-items center
                justify-content space-between
                padding 20px 86px
                margin-bottom 10px
                background:rgba(255,255,255,0.3);
                color #fff
                .title
                    font-size 24px
                .time
                    font-size 14px
                .dh-btn
                    width:109px;
                    height:41px;
                    background:linear-gradient(90deg,rgba(248,139,249,1) 0%,rgba(68,119,255,1) 100%);
                    border-radius:21px;
                    border none
                    font-size 24px
                .b
                    background #C4C4C4;
</style>