<template>
  <div class="luckyDemo">
        <div class="pack">
            <div class="top_back">
                <van-icon name="arrow-left" color="#fff" size="22" @click="back" />
                <div></div>
            </div>
            <div class="slide">
                <p class="slide_tit">本周大奖(2019.11.18 - 2019.1124)</p>
                <div class="slide_cont">
                    <swiper :options="swiperOption">
                        <swiper-slide v-for="(item,index) in goodsList" :key="index">
                            <div class="slide-item">
                                <img :src="item.img" alt="">
                            </div>
                        </swiper-slide>
                        <swiper-slide></swiper-slide>
                    </swiper>
                </div>
            </div>

            <img class="qq" src="/static/images/luckywheel/news/qq.png" alt="">
            <img class="q" src="/static/images/luckywheel/news/q.png" alt="">

            <div class="luck_draw">
                <div class="luck_draw_notice">
                    <div class="spot"></div>
                    <div class="cont"  v-if="slideList.length > 0">
                        <transition name="slide">
                            <p class="publicEllipsis" :key="slideNotice.id">{{slideNotice.val}}</p>
                        </transition>
                    </div>
                    <div class="spot"></div>
                </div>
                <div class="luck_draw_cont">
                    <div class="award" v-for="(award,index) in turntable" :class="['award'+index,{'active': index==current}]" :key="index">
                        <img class="big" src="/static/images/luckywheel/news/big.png" alt="" v-if="award.big">
                        <img class="shop" :src="award.ico" alt="" srcset="" v-if="award.type == 2">
                        <div class="discount" v-if="award.type == 1">￥{{award.amount}}</div>
                        <div class="patronage" v-if="award.type == 0">{{award.name}}</div>
                        <div class="cc" v-if="award.type != 0">{{award.name}}</div>
                    </div>
                    <div id="start-btn" @click="start"></div>
                </div>
                <div class="luck_draw_friend">
                    <p class="luck_draw_friend_notice">邀请3位好友助力，今天可以再抽1次</p>
                    <div class="friend_cont">
                        <div class="friend_cont_p1">
                            <div class="p1-item" v-for="(item,index) in 3" :key="index">
                                <div class="p1-item-jia"><van-icon name="plus" /></div>
                                <div>待邀请</div>
                            </div>
                        </div>
                        <div class="friend_cont_p2">邀请好友</div>
                    </div>
                </div>
            </div>
            <div class="notice">
                <router-link tag="div" to="/luckyList" class="notice-a">获奖记录</router-link>
                <div class="cut"></div>
                <router-link tag="div" to="/luckyList" class="notice-a">活动规则</router-link>
            </div>

            <van-overlay :show="show" @click="show = false" />
            <div class="prize" v-show="show">
                <div class="prize_cont">
                    <div class="cont">
                        <img class="shop_img" :src="award.img" alt="" v-if="award.type==2">
                        <div class="yh_img" v-if="award.type==1">
                            <p class="price">￥{{award.amount}}</p>
                            <p class="tips">限商品使用</p>
                        </div>
                        <p class="publicEllipsis cc">{{award.name}}</p>
                    </div>
                    <button class="btn" @click="draw">立即领取</button>
                </div>
                <div class="close" @click="show = false"><van-icon name="cross" color="#fff" size="16" /></div>
            </div>
        </div>
  </div>
</template>

<script>
import { Dialog } from 'vant';
export default {
    name:'luckyDemo',
    data(){
        return{
            show:false,
            swiperOption: {
				slidesPerView: 5.5,
				spaceBetween: 24,
				freeMode: true,
            },
            slideList:[],
            number:0,
            current: 0,  
            speed: 100,   // 速度
            diff: 20,   // 速度增加的值
            award: {},   // 抽中的奖品
            time: 0 ,  // 记录开始抽奖时的时间
            goodsList:[],
            turntable:[],
            luckDraw:true
        }
    },
    created(){
        this.reqTurntable();
    },
    computed:{
        slideNotice(){
            return {
                id: this.number,
                val: this.slideList[this.number].luck_name
            }
        }
    },
    methods:{
        draw(){
            var _this = this;
            let url = 'turntable/user_exchange';
            this.$axios.post(url,{
                tt_id:this.award.tt_id,
                id:this.award.id,
                token:this.$store.getters.optuser.Authorization
            })
            .then((res) => {
                var info = res.data.data;
                if(res.data.status === 200){
                    this.$toast('领取优惠卷成功')
                    setTimeout(function(){
                        _this.show = false;
                    },1000)
                }else if(res.data.status === 9100){
                    this.add_cart(info.sku_id,info.cart_number,info.session_id,info.turntable_id)
                }else if(res.data.status === 999){
                    _this.$store.commit('del_token'); //清除token
                    setTimeout(()=>{
                        _this.$router.push('/Login')
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
        // 获取转盘列表数据
		reqTurntable(){
            var _this = this;
			let url = 'turntable/get_goods_list';
			this.$axios.post(url,{
				token:this.$store.getters.optuser.Authorization
			})
			.then((res) => {
				if(res.data.status === 200){
                    _this.goodsList = res.data.data.goods;
                    _this.turntable = res.data.data.turntable;
                    _this.slideList = res.data.data.luck_list;
                    _this.startMove();
				}else if(res.data.status === 999){
                    console.log('1')
                    _this.$store.commit('del_token'); //清除token
                    setTimeout(()=>{
                        _this.$router.push('/Login')
                    },1000)
                }else{
                    _this.$toast(res.data.msg)
                }
			})
        },
        startMove(){
            let timer = setTimeout(()=>{
                if(this.number == this.slideList.length-1){
                    this.number = 0;
                }else{
                    this.number +=1;
                }
                this.startMove();
            },2000)
        },
        back(){
            this.$router.back();
        },
        start(){
            if(this.luckDraw){
                this.luckDraw = false;
                    // 开始抽奖
                this.drawAward();

                this.speed = 100;
                this.diff = 20;
                this.time = Date.now();
            }else{
                this.$toast('正在抽奖中...')
            }
            
        },
        drawAward(){

            let url = 'turntable/get_luck';
            this.$axios.post(url,{
				token:this.$store.getters.optuser.Authorization
			})
			.then((res) => {
				if(res.data.status === 200){
                    setTimeout( () => {
                        this.award = {
                            tt_id: res.data.data.tt_id,
                            name: res.data.data.name,
                            img:res.data.data.img,
                            type:res.data.data.type,
                            amount:res.data.data.amount,
                            id:res.data.data.id
                        };
                    }, 1000 );
                    this.move();
				}else{
                    this.$toast(res.data.msg)
                }
			})
            
            
        },
        move(){
            window.timeout = setTimeout( () => {
                this.current++;
                if ( this.current > 7 ) {
                    this.current = 0;
                }
                if ( this.award.tt_id && ( Date.now() - this.time ) / 1000 > 2 ) {
                    this.speed += this.diff;
                    if ( ( Date.now() - this.time ) / 1000 > 4 && this.award.tt_id == this.turntable[ this.current ].tt_id ) {
                        clearTimeout( window.timeout );
                        setTimeout( () => {
                            if(this.award.type != 0){
                                this.show = true;
                            }else{
                                this.$toast('谢谢参与')
                            }
                            
                            // Dialog.alert({
                            //     message: '恭喜你，抽中了' + this.award.name 
                            // }).then(() => {
                            //     // on close
                            // });
                        }, 500  );
                        this.luckDraw = true;
                        return;
                    }
                }
                // else {
                //     this.speed -= this.diff;
                // }
                
                // console.log( this.speed );

                this.move();
            }, this.speed );
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
    .qq
        position absolute
        right 0
        top 310px
        display block
        width 282px
        height 234px
        z-index 1
    .q
        position absolute
        left 100px
        top 530px
        display block
        width 64px
        height 64px
        display block
        z-index 2
    .pack
        background url('/static/images/luckywheel/news/bg.png') no-repeat
        background-size 100%
        width 100%
        height 100%
        .top_back
            display flex
            justify-content space-between
            padding 20px 24px 0
            align-items center
            height 100px
        .slide
            background url('/static/images/luckywheel/news/slide.png') no-repeat
            background-size 100%
            margin 20px 86px 0
            padding 40px 30px 0
            .slide_tit
                color #EB7AB0
                font-size 22px
                padding 0 0 20px 40px
                font-weight bold
            .slide_cont
                width 100%
                display flex
                padding 0 0 69px 0
                .slide-item
                    width 90px
                    height 90px
                    background:rgba(213,191,253,1);
                    border-radius:10px;
                    border 4px solid #A580ED
                    img
                        width 100%
                        height 100%
                        border-radius:10px;
        .luck_draw
            background url('/static/images/luckywheel/news/luck_draw.png') no-repeat
            background-size 100%
            width 579px
            height 800px
            margin 20px auto
            overflow hidden
            z-index: 1;
            position: relative;
            .luck_draw_notice
                height 40px
                margin 80px 64px 20px 64px
                display flex
                align-items center
                justify-content space-around
                .cont
                    position relative
                    width:260px;
                    height:40px;
                    line-height 40px
                    background:linear-gradient(90deg,rgba(157,128,238,1) 0%,rgba(161,129,237,1) 0%,rgba(121,55,242,1) 0%,rgba(167,129,237,1) 100%);
                    border-radius:20px;
                    overflow hidden
                    color #fff
                    padding 0 20px
                    p
                        position absolute
                        bottom 0
                        height 40px
                        overflow hidden
                        width 270px
                    .slide-enter-active, .slide-leave-active
                        transition: all 0.8s ease;
                    .slide-enter
                        transform: translateY(20px) scale(1);
                    .slide-leave-to
                        transform: translateY(-20px) scale(0.8);
                        opacity: 0;
                .spot
                    width:13px;
                    height:13px;
                    background:linear-gradient(0deg,rgba(157,128,238,1) 0%,rgba(161,129,237,1) 0%,rgba(121,55,242,1) 0%,rgba(167,129,237,1) 100%);
                    border-radius:50%;
            .luck_draw_cont
                width 450px
                height 450px
                position relative
                margin auto
                background:linear-gradient(0deg,rgba(157,128,238,1) 0%,rgba(161,129,237,1) 0%,rgba(121,55,242,1) 0%,rgba(167,129,237,1) 100%);
                border-radius:10px;
                .award
                    width: 120px;
                    height: 120px;
                    text-align: center;
                    float: left;
                    position: absolute;
                    overflow: hidden;
                    background: #FFF;
                    border-radius:10px;
                    overflow hidden
                    .cc
                        overflow hidden
                        height 40px
                        line-height 40px
                    &.active
                        background: url('/static/images/luckywheel/news/active.png') no-repeat
                        background-size 100%
                    &.award0
                        top: 22px;
                        left: 22px;
                    &.award1
                        top: 22px;
                        left: 166px;
                    &.award2
                        top: 22px;
                        right: 22px;
                    &.award3
                        top: 166px;
                        right: 22px;
                    &.award4
                        bottom: 22px;
                        right: 22px;
                    &.award5
                        bottom: 22px;
                        right: 166px;
                    &.award6
                        bottom: 22px;
                        left: 22px;
                    &.award7
                        top: 166px;
                        left: 22px;
                    .patronage
                        line-height 120px
                    .discount
                        background url('/static/images/luckywheel/news/discount.png')
                        background-size 100%
                        width 70px
                        height 40px
                        line-height 40px
                        color #fff
                        margin 30px auto 10px
                    .shop
                        width 70px
                        height 70px
                        margin 10px auto 4px
                        display block
                    .big
                        position absolute
                        top -10px
                        left -10px
                        width 66px
                        height 68px
                #start-btn
                    position: absolute;
                    top: 166px;
                    left: 166px;
                    width: 120px;
                    height: 120px;
                    line-height: 120px;
                    text-align: center;
                    border-radius 50%;
                    overflow hidden
                    background url('/static/images/luckywheel/news/btns.gif') no-repeat 
                    background-size 130px 130px
                    background-position-x -5px
                    background-position-y -5px
            .luck_draw_friend
                width:406px;
                background:linear-gradient(0deg,rgba(157,128,238,1) 0%,rgba(161,129,237,1) 0%,rgba(121,55,242,1) 0%,rgba(167,129,237,1) 100%);
                border-radius:10px;
                padding 16px 22px
                margin 22px auto
                color #fff
                .luck_draw_friend_notice
                    font-size 16px
                .friend_cont
                    margin-top 10px
                    display flex
                    justify-content space-between
                    align-items center
                    .friend_cont_p1
                        display flex
                        align-items center
                        .p1-item
                            text-align center
                            font-size 11px
                            margin-right 10px
                            .p1-item-jia
                                margin auto
                                line-height 46px
                                width:40px;
                                height:40px;
                                background:rgba(121,55,242,1);
                                border:1px solid rgba(255,255,255,1);
                                text-align center
                                border-radius:50%;
                                margin-bottom 6px
                    .friend_cont_p2
                        font-size 16px
                        width:123px;
                        line-height:35px;
                        background:linear-gradient(0deg,rgba(172,130,237,1) 0%,rgba(74,120,253,1) 100%);
                        border-radius:18px;
                        text-align center

        .notice
            margin-top 20px
            padding 0 85px 20px
            display flex
            justify-content space-between
            align-items center
            .notice-a
                width 200px
                text-align center
                color #fff
                font-size 24px
            .cut
                width:4px;
                height:80px;
                background:rgba(255,255,255,1);
        .prize
            position fixed
            background url('/static/images/luckywheel/news/prize.png')
            background-size 100%
            left 0
            right 0
            top 30%
            height 444px
            z-index 101
            .close
                width 36px
                height 36px
                line-height 36px
                text-align center
                border-radius 50%
                border 3px solid #fff
                margin 80px auto 0
            .prize_cont
                width 374px
                height 307.1px
                margin 120px auto 0
                overflow hidden
                .cont
                    text-align center
                    width 100%
                    margin 40px auto 0
                    overflow hidden
                    .shop_img
                        width 120px
                        height 120px
                        display block
                        margin 10px auto 0
                    .yh_img
                        margin 10px auto 0
                        background url('/static/images/luckywheel/news/yh_img.png') no-repeat
                        background-size 100%
                        width:219px;
                        height:122px;
                        overflow hidden
                        p
                            text-align right
                        .price
                            margin-top 20px
                            font-size 36px
                            color #F65477
                            padding-right 50px
                        .tips
                            font-size 16px
                            color #fff
                            padding-right 40px
                    .cc
                        color #fff
                        line-height 60px
                .btn
                    display block
                    margin auto
                    color #fff
                    font-size:31px;
                    width:260px;
                    border none
                    line-height:62px;
                    background:linear-gradient(0deg,rgba(237,156,15,1) 0%,rgba(254,240,15,1) 100%);
                    box-shadow:0px 7px 24px 0px rgba(90,14,193,1);
                    border-radius:30px;
</style>