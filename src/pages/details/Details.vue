<template>
    <div class="Details" id="Details" @click="more=false">
        <!-- 头部组件 -->
		<!-- <TopHeader custom-title="商品详情">
			<i slot="backBtn" class="iconfont icon-fanhui"></i>
		</TopHeader> -->
        

        <!-- <div class="clos-btn-wrap" v-show="isBigImg" @click="closeBigBox()">
            <i class="iconfont icon-ai54"></i>
        </div> -->

        <div class="TopHeader" :style="{'background':`rgba(255,255,255,${opacity})`}">
            <div class="backBtn" @click="JumpTo()">
                <i class="iconfont icon-fanhui"></i>
            </div>
            <div class="title" :style="`opacity:${opacity}`"><span class="title-msg" style="font-weight:bold;">商品详情</span></div>
            <div class="rightBtn" @click.stop="rightBtn()">
                <i class="home-icon"></i>
            </div>
            <div class="more" :style="more?'top:120%;opacity:1;display:block;':''">
                <div class="more-item" @click="more_jump('Home')">
                    <img src="/static/images/public/nav1s.png"> <span>首页</span>
                </div>
                <div class="more-item" @click="more_jump('Category')">
                    <img src="/static/images/public/nav2s.png"> <span>商品分类</span>
                </div>
                <div class="more-item" @click="more_jump('Cart')">
                    <img src="/static/images/public/nav3s.png"> <span>购物车</span>
                </div>
                <div class="more-item" @click="more_jump('User')">
                    <img src="/static/images/public/nav4s.png"> <span>我的</span>
                </div>
            </div>
        </div>
        <!-- <div class="heihgt-88"></div> -->

        <!-- 产品图轮播 -->
        <div class="detailsSwiper" v-if="goodsData !=''">
            <van-swipe indicator-color="white">
                <van-swipe-item v-if="goodsData.goods_video">
                    <video-player  class="video-player vjs-custom-skin"
                        ref="videoPlayer"
                        :playsinline="playsinline" 
                        :options="playerOptions"
                        @play="onPlayerPlay($event)"
                        @pause="onPlayerPause($event)" >
                        </video-player>
                </van-swipe-item>
                <van-swipe-item v-for="(img,key) in this.goodsData.img" :key="key">
                    <img :src="img.picture" class="list-img-wrap" @click="showBigBanner(key)"/>
                </van-swipe-item>
            </van-swipe>
        </div>

         <!-- 主内容 -->
        <div class="content">
            <div class="goodsInfo">
                <div class="price">
                    <span class="discount-price" style="font-weight:bold;">
                        {{this.goodsData.price!='0.00'?this.goodsData.price:'免费商品'}}
                        <span class="original-price">￥{{this.goodsData.original_price}}</span>
                    </span>

                    <div class="collect-btn" @click="changCollect()">
                        <i class="iconfont icon-aixin" :class="{'c-active':isCollect}"></i>
                        <span>收藏</span>
                    </div>
                    <!-- <span class="original-price">原价￥{{this.goodsData.original_price}}</span> -->
                </div>
                <p class="price" v-if="Number(goodsData.vip_money)>0">会员折扣价 <span class="discount-price">￥{{goodsData.vip_money}}</span></p>
                <!-- 商品名称 -->
                <div class="goodsName">
                    <h1 style="font-weight:500;">{{this.goodsData.goods_name}}</h1>
                    <div class="goods-dec" v-if="this.goodsData.desc!=''">{{this.goodsData.desc}}</div>
                    <div class="goods-sto">
                        <span>库存：{{this.goodsData.stock}}</span>
                        <span>销量：{{this.goodsData.number_sales}}</span>
                    </div>
                </div>
                <div class="group-warp">
                    <div class="g-option">
                        <div>
                            <span class="-subtitle"> 配送</span><span class="-text"> {{proCityDistrict}}</span>
                        </div>
                    </div>
                    <div class="g-option marB-0 yf" @click="tips">
                        <div>
                            <span class="-subtitle"> 运费</span><span class="-text"> {{this.goodsData.shipping_price!='0.00'?this.goodsData.shipping_price:'包邮(部分地区需额外加收运费)'}}</span>
                        </div>
                        <span class="iconfont icon-xiangyoujiantou" v-if="isTips===false"></span>
                        <van-icon name="arrow-down"  v-if="isTips" />
                    </div>
                    <div class="yf-tips" v-if="isTips">
                        <div class="tit">
                            <h4>运费说明</h4>
                        </div>
                        <div>{{this.goodsData.shipping_text}}</div>
                    </div>
                </div>
                
                <div class="group-warp2" @click="showSizeBox(0)">
                    <!-- <div class="g-option"> -->
                        <span class="-subtitle"> 规格：{{checkSKU.sku_attr}}</span>
                        <!-- <i class="iconfont icon-youjiantou2"><i> -->
                        <span class="iconfont icon-xiangyoujiantou"></span>
                    <!-- </div> -->
                </div>
            </div>

            <!-- tab切换 -->
            <div class="tab-content">
                <van-tabs v-model="tabActive">
                    <van-tab title="商品详情">
                        <div class="details-wrap">
                            <p class="-desc" v-html="this.goodsData.content"></p>
                        </div>
                    </van-tab>
                    <van-tab :title="'商品评价('+this.goodsData.comment_count+')'">
                        <div class="comment-wrap">
                            <ul class="comment-list">
                                <li v-for="(list,key) in commentList" :key="key">
                                    <div class="eval-user">
                                        <div class="user">
                                            <div class="avatar">
                                                <img :src="list.avatar" />
                                            </div>
                                            <div class="text">
                                                <span class="name">用户：{{list.mobile}}</span>
                                                <span class="date">{{list.times}}</span>
                                            </div>
                                        </div>
                                        <div class="score">
                                            <van-rate
                                                v-model="list.star_rating"
                                                icon="like"
                                                void-icon="like-o"
                                                color="#df0000"
                                                readonly
                                            />
                                        </div>
                                    </div> 
                                    <div class="eval-content">
                                        <p>{{list.content}}</p>
                                        <p class="-e-c">{{list.spec}}</p>
                                    </div>
                                    <div class="imgView">
                                        <span v-for="(imgs,key) in list.img" :key="key" @click="showBigImg(imgs)"><img :src="imgs"></span>
                                    </div>
                                </li>
                            </ul>
                            <p v-show="commentList.length<1" class="none-comment">暂无评论</p>
                             <!-- 数据加载完提示 -->
                            <div class="end-wrap">
                                <p v-show="commentList.length>1">我是有底线哦~~</p>
                            </div>

                        </div>
                    </van-tab>
                </van-tabs>
            </div>
        </div>
        
        <!-- 规格框开始 -->
        <div class="sku-box" v-show="sizeBox">
            <div class="sku-box-bg" @click="sizeBox=false">
            </div>
            <transition name="slide-fade">
                <div v-show="sizeBox" class="sku-box-inner" :class="{'box-active':sizeBox}">
                    
                    <div class="slide-fade-title">
                        <img class="-fade-title-img" :src="checkSKU.img" />
                        <div>
                            <p class="-title-msg-1">￥{{Number(goodsData.vip_money)>0?goodsData.vip_money:checkSKU.price}}</p>
                            <p class="-title-msg-2">库存{{checkSKU.stock}}件</p>
                            <p class="-title-msg-3">选择 <span>{{checkSKU.sku_attr}}</span></p>
                        </div>
                        <span class="-close-"  @click="sizeBox=false"> &times;</span>
                    </div>

                    <div class="sku-box-cont">
                        <div class="box-list mb-30" v-for="(list,index) in this.good" :key="index"> 
                            <p class="-list-title" :spec-id="list.spec_id">{{list.spec_name}}</p>
                            <ul class="-list-info" :style="{'padding-bottom':'130px'}">
                                <li class="-info-a"  v-for="(oItem,key) in list.res" :key="key" :class="[oItem.isShow?'':'noneActive',oItem.isSelect?'chosed':'']" :data-id='oItem.attr_id'  @click="tabInfoChange(index,key,oItem.attr_id,oItem.attr_name)">
                                    <!-- <img class="-info-a-msg" :src="oItem.img"/> -->
                                    {{oItem.attr_name}}
                                </li>
                            </ul>
                        </div>
                    </div>
                    <!-- <input class="sku-btn ts-style" type="button" value="确定" @click="confirmSize()"/> -->
                    <div class="box">
                         <div class="box-list2 mb-30" v-if="this.goodsData.is_free!=true"> 
                            <span class="-list-title"> 购买数量</span>
                            <span class="-option-">
                                <i class="subling iconfont icon-jian-" @click="reducingNumber()"></i>
                                <input class="inp" type="number" :value="goodsNumber" @change="changNumber($event)"/>
                                <i class="puls iconfont icon-jia"  @click="addNumber()"></i>
                            </span>
                        </div>
                        <div class="sku-btn ts-style" @click="confirmSize()">
                            <span class="ts-btn-msg">确定</span>
                        </div>
                    </div>
                </div>
            </transition>
        </div>
       
        <!-- 返回顶部 -->
        <div class="back" v-if="scroll>=400" @click="backTop">
            <img src="/static/images/details/back.png">
        </div>
        <!-- 底部菜单 -->
        
        <div class="bottom-bar">
            <!-- <ul class="-bar-list">
                <li class="-list-a" @click="changCollect()">
                    <i class="iconfont icon-aixin" :class="{'c-active':isCollect}"></i>
                    <span>收藏</span>
                </li>
                <li class="-list-a">
                    <i class="iconfont icon-54"></i>
                    <span>客服</span>
                </li>
            </ul> -->
            <div class="-bar-list -bar-list1" v-if="this.goodsData.is_free">
                <input class="bar-btn-2" type="button" @click="showSizeBox(1)" value="立即领取"/>
            </div>
            <div class="-bar-list -bar-list1" v-else>
                <input class="bar-btn-1" type="button" @click="showSizeBox(0)" value="加入购物车"/>
                <input class="bar-btn-2" type="button" @click="showSizeBox(1)" value="立即购买"/>
            </div>
        </div>
        <div class="bottom-height"></div>

        <van-overlay :show="isTc" z-index="19"/>
        <div class="tc" v-if="isTc">
            <div class="tc-wrap">
                <div class="tc-wrap-text" v-if="tc==1"><p>您是商城新用户，可以领取一次免费商品。成为<span class="akey">VIP会员</span>，即可连续3个月每天都领取一次哦~</p></div>
                <div class="tc-wrap-text" v-if="tc==2"><p>您已领取过一次免费商品。成为<span class="akey">VIP会员</span>，即可连续3个月每天都领取一次哦~</p></div>
                <div class="tc-wrap-text" v-if="tc==3"><p class="p3">您是商城普通用户，不能购买商城会员价商品，成为<span class="akey">VIP会员</span>，即可持续享受玖酒久商城会员全网最低价，无数大牌好物惊爆价等你来~</p></div>
                <div class="btn" v-if="tc==2 || tc == 3">
                    <button class="lj" @click="buyCard">了解会员</button>
                    <button class="bk" @click="close">暂不考虑</button>
                </div>
                <div class="close" @click="close"><van-icon name="cross" size="30" color="#df51c8" /></div>
            </div> 
        </div>
    </div>
</template>
<script>
import Vue from 'vue'
import util from '@/utils'
// import AreaList from './area'
// import TopHeader from "@/pages/common/header/TopHeader"
import { ImagePreview, Toast } from 'vant'
import "video.js/dist/video-js.css";
import { videoPlayer } from "vue-video-player";
import "videojs-flash";
import { Dialog } from 'vant';
export default {
    name:'Details',
    components:{
        // TopHeader,
        videoPlayer
    },
    data(){
        return {
            tc:'',
            tcText:'',
            isTc:false,
            isTips:false,
            isBigImg:false,
            tabActive: 0,//tab选中索引
            isCollect:0,
            goodsNumber:1,
            optionFlag:"", 
            token:this.$store.getters.optuser.Authorization,
            page:'1',
            goodsId:this.$route.query.goods_id, //商品id
            goodsData:[],
            commentList:[], //评论数据
            is_sku: false,  //规格弹窗
            esku:'',
            sku_stock_s: false, //规格.库存状态
            sku_stock: 0,   //规格.库存
            selectArr: '',  //存放被选中的值
            selectArrId:'',
            shopItemInfo:{}, //存放要和选中的值进行匹配的数据
            selectArarr:[],  //发给后台
            goods: [], //渲染的商品,
            good:[],
            sizeBox:false, //规格选择框
            proCityDistrict:'无',
            checkSKU:{
                price:'0.0',
                stock:'0',
                img:'',
                sku_attr:'请选择规格'
            },
            //播放速度
            playerOptions: {
                autoplay:false,      //如果true,浏览器准备好时开始回放。
                muted: false,       // 默认情况下将会消除任何音频。
                loop: false,         // 导致视频一结束就重新开始。
                preload: 'auto',    // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
                language: 'zh-CN',
                aspectRatio: '16:9', // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
                fluid: true,         // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
                sources: [{
                type: "video/mp4",
                src: ""             //你的视频地址（必填）
                }],
                poster: "",         //你的封面地址
                width: document.documentElement.clientWidth,
                notSupportedMessage: '此视频暂无法播放，请稍后再试',    //允许覆盖Video.js无法播放媒体源时显示的默认信息。
            },

            shareImg:'',
            goodsName:'',
            uid:'',
            more:false,
            opacity:'',
            scroll:''
        }
    },
    created(){
        window.localStorage.removeItem('details_url')
        this.$store.commit('showLoading');// 调用loading 
        this._getGoodsData();  //请求商品信息
        this._getCommentList(); //请求评论数据
        this.get_default_address();
        window.addEventListener('scroll', this.handleScroll);
    },
    computed: {
        player() {
            return this.$refs.videoPlayer.player;
        },
        playsinline(){
    		var ua = navigator.userAgent.toLocaleLowerCase();
            //x5内核
            if (ua.match(/tencenttraveler/) != null || ua.match(/qqbrowse/) != null) {
                return false
            }else{
                //ios端
                return true				
            }
        }
    },
    methods:{
        //微信分享
        wechatShare(data){
            util.wxConfig(data.appId,data.timestamp,data.nonceStr,data.signature,()=>{
                util.updateTimelineShareData(this.goodsName,'http://www.rrling.com/Details?goods_id='+this.goodsId+'&uid='+this.uid,this.shareImg,
                ()=>{
                    // this.$toast('分享成功')
                }),
                util.updateAppMessageShareData(this.goodsName,this.goodsName,'http://www.rrling.com/Details?goods_id='+this.goodsId+'&uid='+this.uid,this.shareImg,
                ()=>{
                    // this.$toast('分享成功')
                })
            })
        },
        buyCard(){
            this.$router.push('/membershipCard?id=1')
        },
        close(){
            this.isTc=false;
        },
        rightBtn(){
            this.more = !this.more;
        },
        JumpTo(){   //放回上一页
            var uid = this.$route.query.uid;
            if(uid != undefined){
                this.$router.push('/Category')
            }else{
                this.$router.back();
            }
        },
        handleScroll(){
            this.more = false;
            this.opacity = window.scrollY * 0.0032;
            this.scroll = window.scrollY;
        },
        backTop(){
            window.scrollTo(0,0)
        },
        more_jump(url){
            this.$router.push(`/${url}`);
        },
        tips(){
            this.isTips = !this.isTips;
        },
        onPlayerPlay(player) {
             // console.log('player Canplay!', player)
            //解决自动全屏
            var ua = navigator.userAgent.toLocaleLowerCase();
            //x5内核
            if (ua.match(/tencenttraveler/) != null || ua.match(/qqbrowse/) != null) {
                
                $('body').find('video').attr('x-webkit-airplay',true).attr('x5-playsinline',true).attr('webkit-playsinline',true).attr('playsinline',true)
            }else{
                //ios端
                $('body').find('video').attr('webkit-playsinline',"true").attr('playsinline',"true") 
                
            }
        },
        onPlayerPause(player){
        // alert("pause");
        },
        // closeBigBox(){
        //     instance.close();
        // },
        showBigBanner(type){
            var that =this
            that.isBigImg =true
            var bas =[]
            var bannerImg =that.goodsData.img
            for(var i in bannerImg){
                bas.push(bannerImg[i].picture)
            }
            ImagePreview({
                images:bas,
                startPosition: type,
                onClose() {
                    that.isBigImg =false
                }
            });
        },
        showBigImg(img){
            ImagePreview([''+ img +''])
        },

        /**
         * 获取默认配送地区
         */
        get_default_address(){
            var _that = this;
            _that.$axios.post('address/get_default_city',{
                'token':_that.token         
            })
            .then((res)=>{
                if(res.data.status == 200){
                    // console.log(res.data)
                    _that.proCityDistrict = res.data.data.provincename + res.data.data.cityname + res.data.data.districtname;
                }else{
                    _that.proCityDistrict='暂无地址'
                }
            })
        },

         /*****************************收藏、评论*********************8***** */

        scrollBottom(){
            let innerHeight = document.querySelector('#app').clientHeight
            let outerHeight = document.documentElement.clientHeight
            let scrollTop = document.documentElement.scrollTop
            if (outerHeight + scrollTop === innerHeight + 57) {
                this. _getCommentList()
            }
        },

        /**
         * 时间戳转日期
         */
        _timeStampForwardAate(timestamp){            
            var date;
            if (timestamp == "" || typeof(timestamp) == "undefined"){
                date =  new Date().toLocaleDateString();
            }else{
                date = new Date(parseInt(timestamp) * 1000).toJSON().slice(0,10);
            }
            return date;
        },

        /**
         * 请求评论数据
         */
        _getCommentList(){             
            var _that = this;
            _that.$axios.post('Goods/comment_list',{
                'goods_id':_that.goodsId,
                'page':_that.page,
                'token':_that.token         
            })
            .then((res) => {
                var list = res.data;
                if(list.status == 200){
                    if(res.data.data.length > 0){  
                        this.page ++;
                    }
                    if(this.page == 1){ 
                        _that.commentList = res.data.data                       
                    }else{
                        //如果有数据,拼接数组
                        if(res.data.data.length > 0){        
                            _that.commentList = _that.commentList.concat(res.data.data); 
                        }else{
                            
                        }
                    }

                    for(var i in _that.commentList){
                        _that.commentList[i].times = _that._timeStampForwardAate(_that.commentList[i].add_time)
                    }

                    var star = _that.commentList.star_rating;

                    for(var i = 0;i < star;i ++ ){
                        stars.push(1);
                    }
                }
                else if(list.status == 999){
                    var uid = this.$route.query.uid;
                    this.$store.commit('del_token'); //清除token
                    if(uid != undefined){
                        localStorage.setItem('details_url','/Details?u_code='+uid+'&goods='+this.goodsId)
                    }
                    this.$router.push('/Home')
                    this.$store.commit('hideLoading')
                }
                else{
                    _that.$toast(list.msg)
                }
            })
        },

        /**
         * 收藏
         */
        changCollect(){
            var _that = this;
            _that.isCollect =! _that.isCollect;
            _that.$axios.post('Collection/collection',{
                'goods_id':_that.goodsId,
                'token':_that.token         
            })
            .then((res) => {
                var list = res.data;
                if(list.status == 200){
                    _that.$toast(list.msg)
                }else{
                    _that.$toast(list.msg)
                }
            })
        },

        /*****************************商品详情*********************8***** */
        /**
         * 显示规格框
         */
        showSizeBox(flag){
            this.sizeBox = true
            this.optionFlag = flag
        },

        /**
         * 减减
         */
        reducingNumber(){
            var val = parseInt(this.goodsNumber) - 1; 
            if(val <= 1){
                val =1
            }
            this.goodsNumber = val;
        },

        /**
         * 校验输入数量
         */
        changNumber(e){
            var val = e.target.value;
            if(val<1 || isNaN(val)){
                return this.$toast('请输入正确的数量');
            }
            this.goodsNumber = val;
        },

        /**
         * 加加
         */
        addNumber(){
            var val = parseInt(this.goodsNumber) + 1
            this.goodsNumber=val
        },

        /**
         * 选择规格
         */
        _selecetSku(){
            var _that = this,
                info = "",
                newSku = _that.selectArrId,
                goods_ku = _that.goods.spec.goods_sku;
            if(newSku == ""){
                return ''
            }
            for(var i in goods_ku){
                var sku_attr = goods_ku[i].sku_attr1.split(",");
                if(sku_attr == newSku.sort().toString()){
                    return goods_ku[i]
                }
            }
        },

        /**
         * 加入购物车&立即购买
         */
        confirmSize(){  
            let _that = this;
            let le = [];
            let sele = []
            if(_that.selectArr == ''){
                for (let i = 0; i < _that.good.length; i++) {
                    le.push(_that.good[i].spec_name) 
                }
                return _that.$toast('请先选择商品'+le.join('-')+'噢~')
            }else{
                if(_that.sku_stock == 0){
                    return _that.$toast('您选中的商品已售罄噢~')
                }else{
                    for (let i = 0; i < _that.good.length; i++) {
                        for (let j = 0; j < _that.good[i].res.length; j++) {
                            if(_that.good[i].res[j].isShow){
                                if(_that.good[i].res[j].isSelect){
                                    sele.push(_that.good[i].spec_name)
                                }
                            }
                        }    
                    }
                    for (let i = 0; i < _that.good.length; i++) {
                        if(sele[i]!=_that.good[i].spec_name){
                            return _that.$toast('请选择商品'+_that.good[i].spec_name+'噢~')
                        }     
                    }
                }  
            }

            var sku_id = "";
            if(typeof(this._selecetSku()) == "undefined"){
                sku_id = this.selectArarr.sku_id
            }else{
                sku_id = this._selecetSku().sku_id
            }

            if(this.optionFlag == 1){
                 var t ={
                    'sku_id':sku_id,
                    'cart_number':this.goodsNumber,
                    'token':this.$store.getters.optuser.Authorization, 
                    'session_id':1  //直接购买
                }
            }else{
                 var t ={
                    'sku_id':sku_id,
                    'cart_number':this.goodsNumber,
                    'token':this.$store.getters.optuser.Authorization, 
                }
            }

            _that.$axios.post('cart/addCart',t)
            .then((res)=>{
                var list = res.data;
                if(list.status == 200){
                    if(this.optionFlag==0){
                        this.$toast("添加成功,可直接去购物车下单");
                    }else{
                        sessionStorage.setItem('cartInfo',JSON.stringify({'cart_id': list.data.cart_id}))
                        this.$router.push({
                            path: '/pay/ConfirmOrder',
                            name:'ConfirmOrder',
                        })
                    }
                    this.sizeBox = false
                }else{
                    _that.$toast(list.msg)
                }
            })
        },

        /**
         * 获取商品详情信息
         */
        _getGoodsData(){
            let wx_type = null;
            var ua = window.navigator.userAgent.toLowerCase();
            if (ua.match(/MicroMessenger/i) == 'micromessenger') {
                wx_type = 1
            } else {
                wx_type = 0
            }
            var sha_url = location.href.split('#')[0];
            var that = this;
            var params = new URLSearchParams();
            params.append('wx_type',wx_type);
            params.append('goods_id', this.goodsId);       //你要传给后台的参数值 key/value
            params.append('token', this.token);       //你要传给后台的参数值 key/value
            params.append('sha_url', sha_url);       //你要传给后台的参数值 key/value
            var url = "goods/goodsDetail";
            that.$axios({
                method:"post",
                url:url,
                data: params
            }).then((res) => {
                if(res.data.status === 200){ 
                    that.goodsData = res.data.data; 
                    that.goods = res.data.data;  //商品详情
                    that.good =  res.data.data.spec.spec_attr; //商品规格
                    that.isCollect = that.goods.collection;
                    that.playerOptions.sources[0].src =that.goodsData.goods_video
                    that.playerOptions.poster=that.goodsData.goods_video_img
                    that.checkSKU.price=that.goodsData.price
                    that.checkSKU.stock=that.goodsData.stock
                    that.checkSKU.img=that.goodsData.img[0].picture
                    this.$store.commit('hideLoading')

                    if(wx_type ==1){
                        //调取微信
                        if(res.data.data.is_free == 1){
                            this.goodsName = res.data.data.goods_name+'大牌商品仅需0元免费领取';
                        }else{
                            this.goodsName = '爆款'+res.data.data.goods_name+'到手仅需'+res.data.data.price+'元,限时抢购中';
                        }
                        this.uid = res.data.data.uid;
                        if(res.data.data.img.length > 0){
                            this.shareImg = res.data.data.img[0].picture
                        }
                        // this.wechatShare(res.data.data.package)   
                    }
                    var tc = that.goodsData.popup
                    this.tc = tc
                    if(Number(tc) === 1){
                        this.isTc = true
                        setTimeout(res=>{
                            this.isTc = false
                        },3000)
                    }else if(Number(tc) === 2 || Number(tc) === 3){
                        this.isTc = true
                    }

                    for (var i in that.goods.spec.goods_sku){  
                        that.shopItemInfo[that.goods.spec.goods_sku[i].sku_attr1] = that.goods.spec.goods_sku[i]; //修改数据结构格式，改成键值对的方式，以方便和选中之后的值进行匹配
                    }
                    
                }
                if(res.data.status == 999){

                    var uid = this.$route.query.uid;
                    this.$store.commit('del_token'); //清除token
                    if(uid != undefined){
                        localStorage.setItem('details_url','/Details?u_code='+uid+'&goods_id='+this.goodsId)
                    }
                    this.$router.push('/Home')
                    this.$store.commit('hideLoading')
                }
                //初始化规格
                this.initializeSpecification();
                
            })

            // console.log(that.shopItemInfo)
        },
        initializeSpecification(){
            this.initSKU();         //初始化，得到SKUResult
            var that = this;
            for (let i = 0; i < that.good.length; i++) {
                for (let j = 0; j < that.good[i].res.length; j++) {
                    that.good[i].res[j].isSelect = false;
                    that.good[i].res[j].isShow = true;
                    if (that.shopItemInfo[that.good[i].res[j].attr_id] === null) {      //如果一开始库存为0 默认不可选
                        this.$set(that.good[i].res[j],'isShow',false)
                        this.$set(that.good[i].res[j],'isSelect',true)
                    }
                }
            }
        },
        
        //获得对象的key
        getObjKeys(obj) {
        if (obj !== Object(obj)) throw new TypeError("Invalid object");
        var keys = [];
        for (var key in obj)
            if (Object.prototype.hasOwnProperty.call(obj, key))
            keys[keys.length] = key;
                return keys;
        },
        add2SKUResult(combArrItem, sku) {       //把组合的key放入结果集SKUResult
            var key = combArrItem.join(";");
            if (this.shopItemInfo[key]) {
                //SKU信息key属性·
                this.shopItemInfo[key].inventory += sku.inventory;
                this.shopItemInfo[key].prices.push(sku.price);
            } else {
                this.shopItemInfo[key] = {
                goods_id:sku.goods_id,      //商品Id
                sku_id:sku.sku_id,          //skuId  
                inventory: sku.inventory,   //库存
                prices: [sku.price],        //sku价格
                sku_attr:sku.sku_attr       //sku组合
                };
            }
        },
        //初始化得到结果集
        initSKU() {
            var i,j,skuKeys = this.getObjKeys(this.shopItemInfo);
            for (i = 0; i < skuKeys.length; i++) {
                var skuKey = skuKeys[i];                                //一条SKU信息key
                var sku = this.shopItemInfo[skuKey];                    //一条SKU信息value
                var skuKeyAttrs = skuKey.split(",");                    //SKU信息key属性值数组
                skuKeyAttrs.sort(function(value1, value2) {
                    return parseInt(value1) - parseInt(value2);
                });
                //对每个SKU信息key属性值进行拆分组合
                var combArr = this.combInArray(skuKeyAttrs);
                for (j = 0; j < combArr.length; j++) {
                    this.add2SKUResult(combArr[j], sku);
                }
                this.shopItemInfo[skuKeyAttrs.join(";")] = {         //结果集接放入SKUResult
                    goods_id:sku.goods_id,                           //商品Id
                    sku_id:sku.sku_id,                               //skuId
                    inventory: sku.inventory,                       //库存
                    prices: [sku.price],                            //sku价格
                    sku_attr:sku.sku_attr                           //sku组合
                };
            }
        },

        /**
         * 从数组中生成指定长度的组合
         * 方法: 先生成[0,1...]形式的数组, 然后根据0,1从原数组取元素，得到组合数组
         */
        combInArray(aData) {
            if (!aData || !aData.length) {return [];}
            var len = aData.length;
            var aResult = [];
            for (var n = 1; n < len; n++) {
                var aaFlags = this.getCombFlags(len, n);
                while (aaFlags.length) {
                    var aFlag = aaFlags.shift();
                    var aComb = [];
                    for (var i = 0; i < len; i++) {
                        aFlag[i] && aComb.push(aData[i]);
                    }
                    aResult.push(aComb);
                }
            }
            return aResult;
        },

        /**
         * 得到从 m 元素中取 n 元素的所有组合
         * 结果为[0,1...]形式的数组, 1表示选中，0表示不选
         */
        getCombFlags(m, n) {
            if (!n || n < 1) { return [];}
            var aResult = [];
            var aFlag = [];
            var bNext = true;
            var i, j, iCnt1;
            for (i = 0; i < m; i++) {   ``
                aFlag[i] = i < n ? 1 : 0;
            }
            aResult.push(aFlag.concat());
            while (bNext) {
                iCnt1 = 0;
                for (i = 0; i < m - 1; i++) {
                    if (aFlag[i] == 1 && aFlag[i + 1] == 0) {
                        for (j = 0; j < i; j++) {
                            aFlag[j] = j < iCnt1 ? 1 : 0;
                        }
                        aFlag[i] = 0;
                        aFlag[i + 1] = 1;
                        var aTmp = aFlag.concat();
                        aResult.push(aTmp);
                        if (aTmp.slice(-n).join("") .indexOf("0") == -1) {
                            bNext = false;
                        }
                        break;
                    }
                    aFlag[i] == 1 && iCnt1++;
                }
            }
            return aResult;
        },
        
        /*商品条件筛选*/
        tabInfoChange(n,index,cid,sku_name) {
            var self = this
            let orderInfo = this.good; /*所有规格**所有规格*/
            let orderInfoChild = this.good[n].res; /*当前点击的规格的所有子属性内容*/
            if (orderInfoChild[index].isShow == true) {          //选中自己，兄弟节点取消选中
                for (let i = 0; i < orderInfoChild.length; i++) {
                        orderInfoChild[i].isSelect = false;
                        this.pitch=true;
                    }
                orderInfoChild[index].isSelect = true;
                this.pitch=false; 
                // if (orderInfoChild[index].isSelect == true) {        //取消商品重复点击
                //     orderInfoChild[index].isSelect = false;
                //         // this.sku_num = 1,  //只要取消选中 商品选择数量自动默认为1
                //         this.pitch=true;
                // } else {
                //     for (let i = 0; i < orderInfoChild.length; i++) {
                //         orderInfoChild[i].isSelect = false;
                //         this.pitch=true;
                //     }
                //     orderInfoChild[index].isSelect = true;
                //     this.pitch=false; 
                // }
            }
            self.$forceUpdate(); //重绘
            let li = [],ids=[]
            for(let i = 0; i < this.good.length; i++){          //已选择的显示已选择的规格
                for(let j = 0; j < this.good[i].res.length; j++){
                    if(this.good[i].res[j].isSelect==true){
                        this.pitch=false;
                        ids.push(this.good[i].res[j].attr_id)
                        li.push(this.good[i].res[j].attr_name)
                    }
                }
                this.selectArr=li.join('')
                this.selectArrId=ids
            }
            // //已经选择的节点
            let haveChangedId = [];
            for (let i = 0; i < this.good.length; i++) {
                for (let j = 0; j < this.good[i].res.length; j++) {
                if (this.good[i].res[j].isSelect == true) {
                    haveChangedId.push(this.good[i].res[j].attr_id);
                    
                }
                }
            }
            if (haveChangedId.length) {
                //点击显示库存
                this.sku_stock_s = true;
                //获得组合key价格
                haveChangedId.sort(function(value1, value2) {
                return parseInt(value1) - parseInt(value2);
                });
                var len = haveChangedId.length;
                this.sku_stock = this.shopItemInfo[haveChangedId.join(";")].inventory  //库存
                //用已选中的节点验证待测试节点
                let daiceshi = []; //待测试节点
                let daiceshiId = [];
                for (let i = 0; i < this.good.length; i++) {
                for (let j = 0; j < this.good[i].res.length; j++) {
                    if (this.good[n].res[index].attr_id != this.good[i].res[j].attr_id ) {
                    daiceshi.push({
                        index: i,
                        cindex: j,
                        id: this.good[i].res[j].attr_id
                    }) ;
                    daiceshiId.push(this.good[i].res[j].attr_id);
                    }
                    if(this.good[n].res[index].attr_id.length === this.good[i].res[j].attr_id.length){   //如果规格相等的
                    daiceshi.push({
                        index: i,
                        cindex: j,
                        id: this.good[i].res[j].attr_id
                    }) ;
                    daiceshiId.push(this.good[i].res[j].attr_id);
                    }
                }
                }
                if(haveChangedId.length===1){
                
                }else{
                    for (let i = 0; i < haveChangedId.length; i++) {
                        var indexs = daiceshiId.indexOf(haveChangedId[i]);
                        if (indexs > -1) {
                            daiceshi.splice(indexs, 1);
                        }
                    }
                }
                for (let i = 0; i < daiceshi.length; i++) {
                    let testAttrIds = [];                     //从选中节点中去掉选中的兄弟节点
                    let siblingsId = "";
                    for (let m = 0; m < this.good[daiceshi[i].index].res.length; m++) {
                        if (this.good[daiceshi[i].index].res[m].isSelect == true) {
                        siblingsId = this.good[daiceshi[i].index].res[m].attr_id;
                        }
                    }
                    if (siblingsId != "") {
                        for (let j = 0; j < len; j++) {
                        haveChangedId[j] != siblingsId && testAttrIds.push(haveChangedId[j]);
                        }
                    } else {
                        testAttrIds = haveChangedId.concat();
                    }
                    testAttrIds = testAttrIds.concat(
                        this.good[daiceshi[i].index].res[daiceshi[i].cindex].attr_id
                    );
                    testAttrIds.sort(function(value1, value2) {
                        return parseInt(value1) - parseInt(value2);
                    });
                    if (!this.shopItemInfo[testAttrIds.join(";")] ) {
                        this.good[daiceshi[i].index].res[
                        daiceshi[i].cindex
                        ].isShow = false;
                        this.good[daiceshi[i].index].res[
                        daiceshi[i].cindex
                        ].isSelect = false;
                    } else {
                        this.good[daiceshi[i].index].res[
                        daiceshi[i].cindex
                        ].isShow = true;

                        //如果库存 == 0 的时候 sku组合不可选
                        if(this.shopItemInfo[testAttrIds.join(";")].inventory == 0){
                            this.good[daiceshi[i].index].res[
                            daiceshi[i].cindex
                            ].isShow = false;
                        }else{
                            this.selectArarr =  this.shopItemInfo[testAttrIds.join(";")]    
                        } 
                    }
                }
            } 
            else {
                this.sku_stock = 0 ;             //设置默认库存 
                this.sku_stock_s = false;        //设置默认隐藏库存
                //设置属性状态
                for (let i = 0; i < this.good.length; i++) {
                    for (let j = 0; j < this.good[i].res.length; j++) {
                        if (this.shopItemInfo[this.good[i].res[j].attr_id]) {
                        this.good[i].res[j].isShow = true;
                        } else {
                        this.good[i].res[j].isShow = false;
                        this.good[i].res[j].isSelect = true;
                        }
                    }
                } 
            }

            var chesku=''
           if(typeof(this._selecetSku()) == "undefined"){
                chesku= this.selectArarr
            }else{
                chesku= this._selecetSku()
            }
            this.checkSKU.price=chesku.price
            this.checkSKU.stock=chesku.inventory
            // this.checkSKU.img=chesku.img
            this.checkSKU.sku_attr=sku_name
        },
    }
}
</script>
<style lang="stylus" scoped>
.yf-tips
    background #fff
    padding 10px
    .tit
        line-height 80px
        display flex
        justify-content space-between

.slide-fade-enter-active 
  transition all .3s ease
.slide-fade-leave-active 
  transition all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);

.slide-fade-enter, .slide-fade-leave-to
  transform translateY(100px)
.slide-fade-enter, .slide-fade-leave-to .sku-box-inner
    // bottom 24px
.mb-30
    margin-bottom 30px
a
    color:#151515
.Details
    background-color #ffffff
    .clos-btn-wrap
        position fixed
        top 10px
        left 20px
        color #fff
        z-index 10000
        .iconfont
            font-size 60px
    .TopHeader
        width 100%
        height 88px
        line-height 88px
        color #151515
        font-size 30px
        // background-color #ffffff
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
            opacity 0
            .title-msg
                display inline-block
                transform scale(1,1.1)
        .rightBtn
            width 10%
            height 100%
            text-align center
            position absolute
            right 0
            top 0
            display flex
            justify-content center
            align-items center
            .home-icon
                width 100%
                height 46px
                display block
                background url(/static/images/public/more.png) no-repeat center center
                background-size 42px 40px
        .more
            position absolute
            right 10px
            top 120%
            border-radius 10px
            background #fff
            transition 1s
            opacity 0
            display none
            // box-shadow 0 3px 15px #e01a00
            &::after
                position absolute
                right 10px
                top -40px
                content ''
                display block
                border-left:20px solid transparent;
                border-right:20px solid transparent;
                border-bottom:40px solid #fff;
            .more-item
                display flex
                justify-content space-between
                align-items center
                width 255px
                padding 0 24px
                box-sizing border-box
                border-bottom 1px solid #ccc
                span
                    display block
                    width 140px
                    text-align justify
                    text-align-last justify
                &:nth-of-type(2)
                    img
                        width 20px
                        height 35px
                &:nth-last-of-type(1)
                    border 0
                img
                    width 30px
                    height 30px
    .marB-0
        margin-bottom 0 !important
    .none-comment
        font-size:28px
        color:#151515
        padding:30px
        text-align center
    // 产品主图轮播
    .heihgt-88
        width 100%
        height 88px
    .detailsSwiper
        // padding-top:
        width:100%
        height:750px
        overflow hidden
        .van-swipe
            height 100%
            .video-player
                height 100%
            .video-player /deep/ .video-js.vjs-fluid, .video-js.vjs-16-9, .video-js.vjs-4-3
                height 100%
            .video-player /deep/ .video-js .vjs-big-play-button
                // opacity 0
                top 50%
                left 50%
                width 90px
                height 90px
                border-radius 50%
                margin -45px 0 0 -45px
        .van-swipe__track
            height:100%
            height:100%
            overflow:hidden
            .list-img-wrap
                position: absolute;
                left: 50%;
                top: 50%;
                transform: translate3d(-50%,-50%,0);
                max-width: 100%;
                max-height: 100%;
                line-height: 100%;
                visibility: middle;
    .content
        // padding-bottom 128px
        box-sizing border-box
        font-family: 'SourceHanSansHWSC-Regular'
        .-desc
            padding 20px
            font-size 0
            p 
                img
                    width 100%
        .price
            height 60px
            line-height 60px
            overflow hidden
            .discount-price
                font-size 32px
                color #f30c0c
                margin-right 40px
            .original-price
                font-size 24px
                color #838383
                margin-left 10px
                text-decoration line-through
            .collect-btn
                float right
                display flex
                align-items center
                .icon-aixin
                    margin-right 15px
                .c-active
                    color #f30c0c
                    .icon-54
                        font-size 41px
        .goodsInfo
            padding 0 25px 25px
            box-sizing border-box
            .g-option
                display flex
                align-items center
                font-size 26px
                margin-bottom 18px
                color #3a3a3a
                .-subtitle
                    display inline-block
                    width 88px
            .yf
                justify-content space-between
            .goodsName
                margin 0 auto 30px
                h1
                    font-size 26px
                    color #151515
                    line-height 36px
                    font-weight normal
                    display -webkit-box
                    -webkit-box-orient vertical
                    -webkit-line-clamp 3
                    overflow hidden
                .goods-sto
                    display flex
                    justify-content space-between
                    margin-top 15px
                    color #888
                    font-size 24px
                .goods-dec
                    padding 20px 0 10px
                    font-size 22px
                    color #888
            .group-warp
                background #f8f8f8
                border-radius 8px
                padding 10px
                box-sizing border-box
                .van-cell-group
                    background-color #f8f8f8
                    font-size 24px
                    .van-cell
                        background-color #f8f8f8
                        padding 4px 0
                        .label
                            width 100px
                            font-size 26px
                            margin-right 10px
                            display inline-block
                        .text
                            font-size 26px
                            color #575757
                        .size22
                            font-size 22px
                            float right
                .van-hairline--top-bottom::after,.van-cell:not(:last-child)::after
                    border none
                .select-wrap /deep/ .van-cell__value
                    flex none
            .group-warp2
                background #f8f8f8
                border-radius 8px
                padding 10px
                box-sizing border-box
                margin 20px auto
                display flex
                justify-content space-between
                align-items: center
        .tab-content
            color:#151515
            .van-tabs >>> .van-hairline--top-bottom::after
                border none
            .van-tabs >>> .van-tabs__content
                margin-top 30px
            .van-tabs >>> .van-ellipsis
                width 100%
                height 100%
                font-size 30px
                background url("/static/images/details/line-right.png") right  center no-repeat
                background-size 2px 27px
            .van-tabs >>> .van-tab--active
                color #b98a00
            .van-tabs >>> .van-tabs__line
                background #b98a00
            .van-tabs >>> .van-tab:last-child span
                background none
            // 商品详情
            .details-wrap
                overflow: hidden;
                img
                    width 100% 
            // 参数
            .params-wrap
                width 100%
                padding 0 25px
                box-sizing border-box
                .param-list
                    li  
                        height 58px
                        font-size 26px
                        color #414040
                        display flex
                        align-items center
                        border 1px solid #c1c1c1
                        border-bottom none
                        &:last-child
                            border-bottom 1px solid #c1c1c1
                        .param-name
                            width 175px
                            height 100%
                            line-height 58px
                            border-right  1px solid #c1c1c1
                            padding-left 34px
                            box-sizing border-box
                        .param-value
                            flex 1
                            padding-left 28px
                            box-sizing border-box
            // 商品评论
            .comment-wrap
                .comment-list
                    li
                        color #4a4949
                        background-color #ffffff
                        border-radius 8px
                        margin-bottom 10px
                        border-bottom 2px solid #eeeeee
                        padding 30px 40px
                        box-sizing border-box
                        .eval-user
                            height 60px
                            display flex
                            justify-content space-between
                            align-items center
                            margin-bottom 20px
                            .user
                                display flex
                                align-items center
                                .avatar
                                    width 60px
                                    height 60px
                                    margin-right 20px
                                    img 
                                        width 100%
                                        height 100%
                                        display block
                                .text
                                    font-size 26px
                                    span 
                                        display block
                                        line-height 30px
                                    .date
                                        font-size 20px
                                        color #999 
                                        margin-top 10px
                        .eval-content
                            margin-bottom 20px
                            p
                                font-size 22px
                            .-e-c
                                color:#888
                                margin-top:10px
                        .imgView
                            overflow hidden
                            span
                                width 100px
                                height 100px
                                display flex
                                align-items center
                                justify-content center
                                float left
                                margin-right 20px
                                border-radius 5px
                                overflow hidden
                                img
                                    max-width 100%
                                    max-height 100%
                .end-wrap
                    font-size 20px
                    color #888888
                    text-align center
                    margin 30px auto
    .sku-box
        position fixed
        width 100%
        height 100%
        left 0
        bottom 0
        z-index 101
        font-family: 'SourceHanSansHWSC-Regular'
        .sku-box-bg
            width 100%
            height 100%
            background rgba(0,0,0,0.4)
        .sku-box-inner
            position absolute
            bottom 0
            left 0
            z-index 1
            padding 24px
            box-sizing border-box
            background #fff
            border-top-left-radius 10px
            border-top-right-radius 10px
            height 80%
            width 100%
            color:#151515
            .slide-fade-title
                display flex
                font-size 24px
                margin-bottom 30px
                .-fade-title-img
                    width 130px
                    height 130px
                    margin-right 20px
                .-title-msg-1
                    color #ff2d10
                    font-size 30px
                    margin-bottom 10px
                .-title-msg-2
                    margin-bottom 10px
                    color #999
                .-title-msg-3
                    color #666
            .-close-
                font-size 60px
                padding 0 10px
                position absolute
                right 5px
                top 0px
                color #666
            .sku-box-cont
                overflow-y auto
                max-height 91%
                .-list-title
                    letter-spacing 3px
                    font-size 28px
                    margin-bottom 20px
                    font-family 'PangMenZhengDao'
                .-list-info
                    display flex
                    align-items center
                    flex-wrap wrap
                    .-info-a
                        // flex 0 0 31%
                        padding 2px 16px
                        margin 0 3.5% 3% 0
                        text-align center 
                        border-radius 15px
                        height 55px  
                        line-height 55px 
                        background #f3f3f3  
                        font-size 26px
                        box-sizing border-box
                        display flex
                        align-items center
                        .-info-a-msg
                            width 40px
                            height 40px
                            margin-right 10px
                    :nth-child(3n)
                        margin-right 0
                    .order-sku
                         background #f3f3f3  
                         color:#151515
                   .chosed 
                        background: #d0021b !important
                        border-color: #e10
                        color: #fff !important
                
                    .noneActive
                        background: silver
                        border-color: #e0e0e0
                        opacity: 0.4
                        color: #000
                        pointer-events: none
            .box
                background #fff
                position fixed
                left 0
                right 0
                bottom 0
                padding 20px 24px
                .box-list2
                    background #fff
                    display flex
                    justify-content space-between 
                    align-items center
                    .-option-
                        border 2px solid #e6e6e6
                        width 200px
                        height 50px
                        line-height 50px
                        display flex
                        align-items center
                        justify-content space-between
                        border-radius 20px
                        text-align center
                        .iconfont
                            width 55px
                            height 100%
                            font-size 16px
                        .puls
                            border-left 1px solid #e6e6e6
                        .subling
                            border-right 1px solid #e6e6e6
                            
                        .inp
                            width 121px
                            text-align center
                            height inherit
                            font-size 24px
                            font-weight bold
                .sku-btn
                    height 80px
                    line-height 80px
                    font-size 30px
                    text-align center
    .bottom-height
        width 100%
        height 180px
        align-items  center
    .back
        position fixed
        bottom 10vh
        right 20px
        width 80px
        height 80px
        text-align center
        border-radius 50%
        padding 10px 0
        border 2px solid #ccc
        box-sizing border-box
        background #fff
        img
            width 60px
    .bottom-bar
        border-top 1px solid #eee
        position fixed
        width 100%
        height 98px
        line-height 98px
        background #fff
        bottom 0
        left 0
        z-index 10
        display flex
        .-bar-list
            // flex 0 0 50%
            width:100%
            display flex
            text-align center
            font-size 28px
            font-family: 'PangMenZhengDao';
            transform: scale(1,1.1);
            .bar-btn-1
                background #e63100
                letter-spacing 3px
            .bar-btn-2
                background #d90000
                letter-spacing 3px
            .-list-a
                width 50%
                .iconfont
                    vertical-align: middle;
            input
                width 50%
                color #fff
                border-radius 0
        .-bar-list1
            justify-content flex-end
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
