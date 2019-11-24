<template>
	<div class="Home">
		<div class="top-wrap">
			<div class="banner-wrap">
				<div class="w-Header">
                    <img class="w-log" src="/static/images/home/new/w_logo.png" />
                </div>
				<p class="rrl-url">www.rrling.com</p>
				<div class="banner">
					<swiper :options="swiperOptionBanner">
						<swiper-slide v-for="(item,index) in bannerData" :key="index">
							<img :src="item.picture" class="swiper-img" />
						</swiper-slide>
					</swiper>
				</div>
			</div>
		</div>

		<transition name="slide">
			<div class="order" :key="this.number" @click="toDetail(or_l.goods_id)" v-if="orderList.length > 0">
				<img :src="or_l.avatar" alt="" class="order_img">
				<span class="publicEllipsis">{{or_l.content}}</span>
			</div>
		</transition>

		<div class="specify-cont-inner">

			<!-- <div class="specify-shop-wrap -bg-img1">
				<router-link to="/FreeZone" class="specify-title">
					<span class="-title-msg1">每日一领</span>
					<img class="-title-msg" src="/static/images/home/new/more.png"/>
				</router-link>
				<ul class="s-shop-list">
					<li class="-shop-list-img" v-for="(item,index) in goodsFree" :key="index">
						<div @click="handelCostFree(item.goods_id)"><img :src="item.img" alt=""></div>
					</li>
				</ul>
			</div> -->

			<span class="-title-msg1 margin-left-m">双十一特惠</span>

			<div class="even11">
				<img class="even11-img" src="/static/images/home/evens.gif" alt="">
				<div @click="handelEven" class="click-div"></div>
				<div class="evenCont"  v-if="shuanggoods.goods != undefined && shuanggoods.goods.length > 0">
					<img class="wares-img" :src="shuanggoods.goods[0].img" alt="" @click="toDetail(shuanggoods.goods[0].goods_id)">
					<div class="wares">
						<div class="wares-item"  @click="toDetail(shuanggoods.goods[1].goods_id)">
							<img :src="shuanggoods.goods[1].img" alt="" class="wares-item-img" />
							<div class="wares-item-text">
								<p class="bold publicEllipsis">{{shuanggoods.goods[1].goods_name}}</p>
								<p class="desc bold">限时抢购{{shuanggoods.goods[1].rush_num}}件</p>
								<p class="jg">
									<span class="price">￥{{shuanggoods.goods[1].price}}</span>
									<!-- <span class="y-price desc">￥{{shuanggoods.goods[2].original_price}}</span> -->
								</p>
							</div>
						</div>
						<div class="wares-item"  @click="toDetail(shuanggoods.goods[2].goods_id)">
							<img :src="shuanggoods.goods[2].img" alt="" class="wares-item-img" />
							<div class="wares-item-text">
								<p class="bold publicEllipsis">{{shuanggoods.goods[2].goods_name}}</p>
								<p class="desc bold">限时抢购{{shuanggoods.goods[2].rush_num}}件</p>
								<p class="jg">
									<span class="price">￥{{shuanggoods.goods[2].price}}</span>
									<!-- <span class="y-price desc">￥{{shuanggoods.goods[2].original_price}}</span> -->
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>

			<!--会员卡 -->
			<router-link :to="'/membershipCard?id='+1" tag="div" class="-item-vip-card">
				<div class="vip-card"><img src="/static/images/home/new/vip_card.gif" /></div>
				<img class="click-jr" src="/static/images/home/new/click-jr.gif" alt="">
			</router-link>

			<div class="collar">
				<div @click="more" class="more"></div>
				<div  class="collarList">
					<swiper :options="swiperEveryday">
						<swiper-slide v-for="(item,index) in goodsFree.goods" :key="index">
							<div @click="toDetail(item.goods_id)">
								<div class="led">免费领取</div>
								<img class="swiper-everyday-img" :src="item.img" alt="">
								<div  class="swiper-everyday-tit publicEllipsis">{{item.goods_name}}</div>
								<div class="swiper-everyday-price">
									<div class="yj">￥{{item.original_price}}</div>
								</div>
							</div>
						</swiper-slide>
						<swiper-slide></swiper-slide>
					</swiper>
				</div>
			</div>


			<div class="-item-vip-card2">
				<img src="/static/images/home/new/h_1.gif" />
			</div>

			<span class="-title-msg1 margin-left-m">口碑推荐</span>

			<div class="opinions" v-if="dapai_goods.banner">
				<img class="opinions-img" :src="dapai_goods.banner.img" @click="handelSpecial(dapai_goods.banner.cat_id)" />
				<div class="opinions-cont">
					<swiper :options="swiperOption">
						<swiper-slide v-for="(item,index) in dapai_goods.goods" :key="index">
							<div @click="toDetail(item.goods_id)">
								<img class="opinions-cont-item-img" :src ="item.img" alt="">
								<div class="opinions-cont-item-tit publicEllipsis">{{item.goods_name}}</div>
								<div class="opinions-cont-item-price">￥{{item.price}}</div> 
							</div>
						</swiper-slide>
						<swiper-slide class="look" v-if="dapai_goods.goods.length > 5">
							<div @click="handelSpecial(dapai_goods.banner.cat_id)" class="lookMore">查看更多<img src="/static/images/special/re.png" alt=""></div>
						</swiper-slide>
						<img class="swiper-button-prev" slot="button-prev" src="/static/images/public/left.gif" alt="">
						<img class="swiper-button-next" slot="button-next" src="/static/images/public/right.gif" alt="">
					</swiper>
				</div>
			</div>

			<div class="opinions" v-if="wazi_goods.banner">
				<img class="opinions-img" :src="wazi_goods.banner.img" @click="handelOpinions(wazi_goods.banner.cat_id)" />
				<div class="opinions-cont">
					<swiper :options="swiperOption">
						<swiper-slide v-for="(item,index) in wazi_goods.goods" :key="index">
							<div @click="toDetail(item.goods_id)">
								<img class="opinions-cont-item-img" :src="item.img" alt="">
								<div class="opinions-cont-item-tit publicEllipsis">{{item.goods_name}}</div>
								<div class="opinions-cont-item-price">￥{{item.price}}</div>
							</div>
						</swiper-slide>
						<swiper-slide class="look" v-if="wazi_goods.goods.length > 5">
							<div @click="handelOpinions(wazi_goods.banner.cat_id)" class="lookMore">查看更多<img src="/static/images/special/re.png" alt=""></div>
						</swiper-slide>
						<img class="swiper-button-prev" slot="button-prev" src="/static/images/public/left.gif" alt="">
						<img class="swiper-button-next" slot="button-next" src="/static/images/public/right.gif" alt="">
					</swiper>
				</div>
			</div>


			<div class="opinions" v-if="mianmo_goods.banner">
				<img class="opinions-img" :src="mianmo_goods.banner.img" @click="handelOpinions(mianmo_goods.banner.cat_id)" />
				<div class="opinions-cont">
					<swiper :options="swiperOption">
						<swiper-slide v-for="(item,index) in mianmo_goods.goods" :key="index">
							<div @click="toDetail(item.goods_id)">
								<img class="opinions-cont-item-img" :src="item.img" alt="">
								<div class="opinions-cont-item-tit publicEllipsis">{{item.goods_name}}</div>
								<div class="opinions-cont-item-price">￥{{item.price}}</div>
							</div>
						</swiper-slide>
						<swiper-slide class="look"  v-if="mianmo_goods.goods.length > 5">
							<div @click="handelOpinions(mianmo_goods.banner.cat_id)" class="lookMore">查看更多<img src="/static/images/special/re.png" alt=""></div>
						</swiper-slide>
						<img class="swiper-button-prev" slot="button-prev" src="/static/images/public/left.gif" alt="">
						<img class="swiper-button-next" slot="button-next" src="/static/images/public/right.gif" alt="">
					</swiper>
				</div>
			</div>

			<div class="opinions"  v-if="jiaju_goods.banner">
				<img class="opinions-img" :src="jiaju_goods.banner.img" @click="handelOpinions(jiaju_goods.banner.cat_id)" />
				<div class="opinions-cont">
					<swiper :options="swiperOption">
						<swiper-slide v-for="(item,index) in jiaju_goods.goods" :key="index">
							<div @click="toDetail(item.goods_id)">
								<img class="opinions-cont-item-img" :src="item.img" alt="">
								<div class="opinions-cont-item-tit publicEllipsis">{{item.goods_name}}</div>
								<div class="opinions-cont-item-price">￥{{item.price}}</div>
							</div>
						</swiper-slide>
						<swiper-slide class="look"  v-if="jiaju_goods.goods.length > 5">
							<div @click="handelOpinions(jiaju_goods.banner.cat_id)" class="lookMore">查看更多<img src="/static/images/special/re.png" alt=""></div>
						</swiper-slide>
						<img class="swiper-button-prev" slot="button-prev" src="/static/images/public/left.gif" alt="">
						<img class="swiper-button-next" slot="button-next" src="/static/images/public/right.gif" alt="">
					</swiper>
				</div>
			</div>

			
			<div class="opinions" v-if="riyonggoods.banner">
				<img class="opinions-img" :src="riyonggoods.banner.img" @click="handelOpinions(riyonggoods.banner.cat_id)" />
				<div class="opinions-cont">
					<swiper :options="swiperOption">
						<swiper-slide v-for="(item,index) in riyonggoods.goods" :key="index">
							<div @click="toDetail(item.goods_id)">
								<img class="opinions-cont-item-img" :src="item.img" alt="">
								<div class="opinions-cont-item-tit publicEllipsis">{{item.goods_name}}</div>
								<div class="opinions-cont-item-price">￥{{item.price}}</div>
							</div>
						</swiper-slide>
						<swiper-slide class="look" v-if="riyonggoods.goods.length > 5">
							<div @click="handelOpinions(riyonggoods.banner.cat_id)" class="lookMore">查看更多<img src="/static/images/special/re.png" alt=""></div>
						</swiper-slide>
						<img class="swiper-button-prev" slot="button-prev" src="/static/images/public/left.gif" alt="">
						<img class="swiper-button-next" slot="button-next" src="/static/images/public/right.gif" alt="">
					</swiper>
				</div>
			</div>

			<div class="opinions"  v-if="shippingGoods.banner">
				<img class="opinions-img" :src="shippingGoods.banner.img" @click="handelOpinions(shippingGoods.banner.cat_id)" />
				<div class="opinions-cont">
					<swiper :options="swiperOption">
						<swiper-slide v-for="(item,index) in shippingGoods.goods" :key="index">
							<div @click="toDetail(item.goods_id)">
								<img class="opinions-cont-item-img" :src="item.img" alt="">
								<div class="opinions-cont-item-tit publicEllipsis">{{item.goods_name}}</div>
								<div class="opinions-cont-item-price">￥{{item.price}}</div>
							</div>
						</swiper-slide>
						<swiper-slide class="look" v-if="shippingGoods.goods.length > 5">
							<div @click="handelOpinions(shippingGoods.banner.cat_id)" class="lookMore">查看更多<img src="/static/images/special/re.png" alt=""></div>
						</swiper-slide>
						<img class="swiper-button-prev" slot="button-prev" src="/static/images/public/left.gif" alt="">
						<img class="swiper-button-next" slot="button-next" src="/static/images/public/right.gif" alt="">
					</swiper>
				</div>
			</div>


		</div>
		<!-- 底部导航 -->
		<div class="foot-height136"></div>
		<Navigate></Navigate>


		<van-overlay :show="isTips" :z-index="100" />
		<div class="tips" v-show="isTips">
			<div class="tips-cont">
				<p class="notice">日日领公告</p>
				<p>亲爱的日日领用户，欢迎进入<span class="akey">日日领会员制商城。</span></p>
				<p>日日领，致力于成为中国人自己的会员制商城。尽可能以最低的价格为会员提供一切高品质的商品，为您实现消费降级，品质升级。</p>
				<p>本商城的普通用户可以在<span class="akey">【每日一领 免费专区】</span>体验领取一次会员免费商品，但无法购买商城会员价商品。成为会员后即可持续享受商城会员全网最低价，同时可在<span class="akey">【每日一领】</span>专区每天任意领取一款会员免费商品，更有无数大牌好物惊爆价为会员准备。</p>
				<p><span class="akey">日日领会员制商城</span>目前为邀请制，只有通过会员之间分享的二维码才能注册登录。当您成为日日领VIP会员后，您可在<span class="akey">【个人中心】</span>【点击】<span class="akey">【我要分享】</span>获取您的会员<span class="akey">专属二维码</span>，将二维码分享给新用户，即可帮他完成注册登录。</p>
			</div>
			<button @click="handelTips">确定</button>
		</div>

		<div class="tips free" v-show="!isTips && is_vip_free_read == 0">
			<div class="tips-wrap">
				<div class="wrap-cont">
					<p>亲爱的日日领用户，恭喜您收到一张会员<span class="akey">7天体验卡</span>，您已自动成为本商城的<span class="akey">VIP会员</span>，开始您的会员惊喜之旅吧~</p>
				</div>
				<div class="free-btn">
					<button class="lj" @click="buyCard">了解会员</button>
					<button class="bk" @click="close">暂不考虑</button>
				</div>
			</div>
		</div>

		

		<!-- 经理人弹窗 -->
		<!-- <van-overlay :show="showBoss" :z-index="100" />
		<div class="tips" v-show="showBoss">
			<div class="tips-cont">如果您有经理人推荐，请使用微信扫描经理人的推广码进入商城，无经理人推荐请点击继续按钮
			</div>
			<button @click="bossNext">下一步</button>
		</div> -->

		<!-- 绑定手机号 -->
		<!-- <van-overlay :show="showBindPhone" :z-index="100" />
		<div class="tips" v-show="showBindPhone">
			<div class="tips-cont">
				<van-cell-group >
					<van-field
						label-class='labelClass'
						v-model="phoneNum"
						center
						clearable
						label="手机号："
						placeholder="请输入手机号"
					>
					</van-field>
				</van-cell-group>
			</div>
			<button @click="bindPhone">绑定</button>
		</div> -->

		<div class="clickWechat" v-show="!isFollow" @click="isFollow = true">点击关注公众号</div>
		<van-overlay :show="isFollow" :z-index="100" />
		<div class="wechat_pack" v-show="isFollow">
			<div class="wrap">
				<div class="cont">
					<div class="cont_tit">日日领会员制商城</div>
					<div class='cont_images'>
						<div class="code_img"><img src="/static/images/public/wechat.png" alt=""></div>
						<div class="sm">扫码关注公众号</div>
					</div>
				</div>
			</div>
			<div class="close" @click="isFollow = false"><van-icon name="cross" color="#fff" size="20" /></div>
		</div>

	</div>

</template>

<script>
import Navigate from "@/pages/common/footer/Navigate";
import {jumpTo} from '../../../static/js/public';
import {mapState} from 'vuex';
import TopHeader from "@/pages/common/header/TopHeaderOld";
import { Dialog, Toast } from 'vant';
import 'swiper/dist/css/swiper.css'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
export default {
	name: "home",
	// computed:{
	// 	...mapState([
	// 	'is_wx'
	// 	])
	// },
	components: {
		Navigate,
		TopHeader,
		swiper,
    	swiperSlide
	},
	data() {
		return {
			swiperOption: {
				slidesPerView: 3,
				spaceBetween: 12,
				freeMode: true,
				navigatiswiperOptionon: {
					nextEl: '.swiper-button-next',
					prevEl: '.swiper-button-prev'
				}
			},
			swiperOptionBanner: {
				effect: 'coverflow',
				centeredSlides: true,
				slidesPerView: 'auto',
				spaceBetween:10,	
				autoplay: {
					delay: 3000,//自动播放速度
					disableOnInteraction: false//鼠标移上去时是否还继续播放
				},
				coverflowEffect: {
					rotate: 10,
					stretch: 0,
					depth:-100,
					modifier: 1,
					slideShadows : false
				},
			},

			swiperEveryday: {
                slidesPerView: 3.5,
                spaceBetween: 6
            },
			isFollow:false,
			isTips:false,
			baseUrl:'',
			bannerData:[],
			levelData:[],
			hotGoods:[],
			newsData:[],
			freeGoods:[],
			goods:[],
			goodsFree:[],
			shippingGoods:[],
			jiaju_goods:[],
			dapai_goods:[],
			mianmo_goods:[],
			riyonggoods:[],
			shuanggoods:[],
			wazi_goods:[],
			page:1,//页数
			showText:true,
			token: this.$store.getters.optuser.Authorization,
			readIndex:0,

			showBoss:false, //经理人
			showBindPhone:false,//绑定手机号
			phoneNum:'',
			wxUserId:'',
			po:'',
			is_vip_free_read:1,
			orderList:[],
			number:0,

			pwd:'',
			read:'',
			is_vip_free_read:''
		};
	},
	created(){
		// this.$store.commit('showLoading')//加载loading
		this.requestData();

		var _this = this;
		this.pwd = this.$route.query.is_pwd;
		this.read = this.$route.query.is_reads;
		let is_vip_free_read = this.$route.query.is_vip_free_read;
		this.is_vip_free_read = is_vip_free_read;
		if(Number(this.read) == 0){
			this.isTips=true
		}

	},
	activated(){
		if(sessionStorage.getItem('homeScroll')){
			document.documentElement.scrollTop = sessionStorage.getItem('homeScroll')
			sessionStorage.removeItem('homeScroll')
		}
		let warrant = this.$store.getters.isWx;
		if(warrant == 0){
			var ua = navigator.userAgent.toLowerCase();
			if(ua.match(/MicroMessenger/i) == "micromessenger"){
				if (window.location.href.indexOf("code") == 0 ||window.location.href.indexOf("code") <= 0) {
						this.$axios({
						method: "get",
						url: "user/GetOpenid?token="+this.token+'&is_pwd='+this.pwd+'&is_reads='+this.read+'&is_vip_free_read='+this.is_vip_free_read
					}).then(res => {
						var url = res.data.data;
						window.location.href = url;
					});
				}else{
					// 存在code 执行
					// getQueryString用来截取code的值
					var code = this.getQueryString("code");
					this.$axios({
						method: "get",
						url: "user/get_code?code=" + code + '&token='+this.token
					}).then(res => {
						console.log('angeng 248')
						this.$store.commit('upd_wx')
					});
				}
			}
		}
	},
	computed:{
		or_l(){
			return{
				avatar:this.orderList[this.number].avatar,
				content:this.orderList[this.number].content,
				goods_id:this.orderList[this.number].goods_id
			}
		}
	},
	methods: {

		handelScroll(){
			
		},
		handelSpecial(id){
			sessionStorage.setItem('homeScroll',document.documentElement.scrollTop)
			if(id == 55){
				this.$router.push('/special/Special?id='+id)
			}else{
				this.$router.push('/category/CateSpecial?id='+id)
			}
		},
		handelEven(){
			sessionStorage.setItem('homeScroll',document.documentElement.scrollTop)
			this.$router.push('/special/Special')
		},
		handelOpinions(id){
			sessionStorage.setItem('homeScroll',document.documentElement.scrollTop)
			if(id == 48 || id == 49){
				this.$router.push('/category/CategoryLists?id='+id)
			}else{
				this.$router.push('/CategoryList?id='+id)
			}
		},
		toDetail(goods_id){
			sessionStorage.setItem('homeScroll',document.documentElement.scrollTop)
			this.$router.push('/Details?goods_id='+goods_id)
		},
		more(){
			this.$router.push('/FreeZone')
		},
		getQueryString(name) {
			var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
			var r = window.location.search.substr(1).match(reg);
			if (r != null) {
				return unescape(r[2]);
			} else {
				return null;
			}
		},
		//经理人推荐下一步
		bossNext(){
			this.showBoss = false
			this.showBindPhone = true
		},
		bindPhone(){
			if(!(/^1[3456789]\d{9}$/.test(this.phoneNum))){ 
				Toast("手机号码格式不正确");  
				return; 
			}
			let params = {}
			params.id = this.wxUserId
			params.mobile  = this.phoneNum
			this.$axios.post('user/binding_mob',params).then((response)=>{
				if(response.code == 200){
					Toast('绑定手机号成功')
					this.showBindPhone = false
				} else {
					Toast(response.data.message)
				}
			})
		},
		handelCostFree(id){
			this.$router.push('/Details?goods_id='+id)
		},
		/**
		 * 联系上级补卡
		 */
        linkSJReissueCard(){		
           	var url ='card/patch_card_edit',
            	that = this
            that.$axios.post(url,{         // 传给后台的参数
                'token':that.token,
                'card_num':0
            })
            .then((res)=>{
                var info = res.data
                if(info.status==200){
                    this.$router.push('/sjReissueCard')
                }
                else if(res.data.status == 999){
                    that.$store.commit('del_token'); //清除token
                    setTimeout(()=>{
                        this.$router.push('/Login')
                    },1000)
                }else{
                    that.$toast(res.data.msg)
                }
            })
        },
		/**
		 * 立即补卡
		 */
		linkReissueCard(){
           var url ='card/card_edit_now',
                that =this
            that.$axios.post(url,{         // 传给后台的参数
                'token':that.token
            })
            .then((res)=>{
                var info =res.data
                if(info.status1!=315){
                    this.$router.push('/ReissueCard')
                }else{
                    that.$toast(res.data.msg)
                }
            })
        },


		/**
		 * 请求数据
		 */
		requestData(){
            let url = 'index/index';
            this.$axios.post(url)
            .then( (res) => {
                if(res.data.status === 200){
					var info =Object.freeze(res.data.data);
					
					this.bannerData =info.banners;
					this.levelData =info.level_list;
					this.goods=info.goods;
					this.goodsFree =info.goods_free;
					this.hotGoods =info.hot_goods;
					this.newsData =info.announce;
					this.freeGoods =info.free_goods;
					this.shippingGoods=info.shiping_goods;
					this.jiaju_goods=info.jiaju_goods;
					this.dapai_goods=info.dapai_goods;
					this.mianmo_goods=info.mianmo_goods;
					this.riyonggoods=info.riyonggoods;
					this.shuanggoods = info.shuanggoods;
					this.wazi_goods = info.wazi_goods;
					this.orderList = info.result;
					this.$store.commit('hideLoading');

					this.move()
				}
				else if(res.data.status == 999){
					this.$store.commit('del_token'); //清除token
					setTimeout(()=>{
						this.$router.push('/Login')
					},1000)
				}
				else{
					this.$toast(res.data.msg)
				}
            })
            .catch((error) => {
                alert('请求错误:'+ error)
			})
			
		},
		move(){
			let timer = setTimeout(()=>{
                if(this.number == this.orderList.length-1){
                    this.number = 0;
                }else{
                    this.number +=1;
                }
                this.move();
            },5000)
		},
		/**
		 * 点击加载更多
		 */
		showMore(){
			let url = 'announce/get_list';
			this.$axios.post(url,{
				page:this.page++,
				token:this.$store.getters.optuser.Authorization,
			})
			.then((res) => {
				if(res.data.status == 200){
					this.newsData = this.newsData.concat(res.data.data.list); 
					this.showText = false;
				}
			})
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
		},
		UpdAgrren(){
            this.isAgrren = !this.isAgrren
		},
		sstd(){
			  this.$router.push({path:'/Search'})
		},	
		handelTips(){
			this.isTips=false
			this.$router.push('/Home?is_pwd='+this.$route.query.is_pwd+'&is_vip_free_read='+this.$route.query.is_vip_free_read)
		},
		buyCard(){
            this.$router.push('/membershipCard?id=1')
        },
        close(){
			console.log('1')
			this.is_vip_free_read=1;
			this.$router.push('/Home')
        },

	},
	filters:{
		//格式化金钱
        formatMoney:function(val){
            return "¥" + Number(val).toFixed(2)
        }
	}

};
</script>


<style lang="stylus" scoped>
.bold
	font-weight bold
.desc
	color #9B9B9B
.free
	left 0 !important 
	width 100% !important 
	top 30% !important
	background none !important
	padding-left 0 !important
	.tips-wrap
		margin 0 auto
		width 615px
		height 450px
		background-image url('/static/images/login/tips-bg.png')
		background-size 100%
		position relative
		.wrap-cont
			padding 230px 100px 0 100px
			font-size 24px
			.akey
				color #e054c6
	.free-btn
		display flex
.tips
	position fixed
	top 10%
	z-index 101
	background #ffffff
	width 580px	
	left 54px
	border-radius 30px
	padding 30px
	.tips-cont
		padding 20px 0
		font-size 28px
		.notice
			font-weight bold
			font-size 40px
			line-height 40px
			text-align center
			margin-bottom 20px
		p
			margin-bottom 10px
			text-align justify
		.akey
			color #e054c6
	.tips-item
		align-items center
		display flex
		.-text-active
			color #fc8cfa
	button
		display block
		width 160px
		text-align center
		line-height 60px
		border-radius 40px
		border none
		background-image: linear-gradient(90deg, #fc8cfa 0%, #a281ed 50%, #737cf6 76%, #4377ff 100%), linear-gradient(#fe9d6e, #fe9d6e);
		color #fff
		font-size 26px
		margin 40px auto 0 auto
.Home
	background #efe6fc
	font-family 'PangMenZhengDao'
	position relative
	.clickWechat
		width:30px;
		background:linear-gradient(90deg,rgba(225,83,201,1) 0%,rgba(244,115,179,1) 100%);
		border-radius:40px 0 0 40px;
		position fixed
		top 60%
		right 0
		z-index 999
		text-align center
		color #fff
		padding 20px 10px
	.wechat_pack
		position fixed
		left 0
		right 0
		top 20%
		z-index 101
		.close
			width 60px
			height 60px
			margin 40px auto 0
			border-radius 100%
			border 4px solid #fff
			text-align center
			line-height 80px
		.wrap
			width 520px
			height 520px
			margin 0 auto
			background #fff
			padding 40px
			border-radius 40px
			.cont
				width 100%
				height 100%
				background: linear-gradient(90deg, #e153c9 0%, #f473b3 100%);
				border-radius 40px
				position relative
				color #fff
				font-size 30px
				text-align center
				&::after,&::before
					content:"";
					position: absolute;
					width: 40px;
					height: 40px;
					top 100px
					border-radius: 100%;
					background: #FFFDFD;
				&::after
					left -26px;
				&::before
					right -26px;
				.cont_tit
					margin 0 80px
					line-height 120px
					border-bottom 2px dashed #fff
				.code_img
					width 300px
					height 300px
					background url(/static/images/public/wechat.png)
					background-size 100%
					margin 20px auto
					position relative
					img
						width 100%
						height 100%
						position absolute
						left 0
						top 0
						right 0
						bottom 0
	.order
		position absolute
		left 24px
		top 200px
		width 500px
		height 60px
		display flex
		align-items center
		border-radius 60px
		background-image: linear-gradient(270deg, #fc8cfa 0%, #a281ed 47%, #737cf6 68%, #4377ff 100%), linear-gradient(0deg, #fc8cfa 0%, #a281ed 47%, #737cf6 68%, #4377ff 100%);
		color #fff
		opacity: 0
		.order_img
			border-radius 50%
			width 60px
			height 60px
			display block
			overflow hidden
			margin-right 20px
		span
			width 400px
	.slide-enter-active
		animation bounce-in 5s ease
	.slide-levave-active
		animation bounce-in 5s ease
	@keyframes bounce-in {
		0%{ transform: translateY(0px); opacity: 0; }
		30%{ transform: translateY(100px); opacity: 1; }
		40%{ transform: translateY(100px); opacity: 1; }
		50%{ transform: translateY(100px); opacity: 1; }
		60%{ transform: translateY(100px); opacity: 1; }
		70%{ transform: translateY(100px); opacity: 1; }
		100%{ transform: translateY(0px); opacity: 0; }
	}
	.top-wrap
		width 100%
		height 402px
		.banner-wrap
			width 100%
			height 100%
			background url('/static/images/home/hon_bg.png') no-repeat
			background-size 100% 100%
			.w-Header
				// background none
				// color #fff
				padding-top 30px
				text-align center
				// letter-spacing 4px
				// font-size 32px
				// letter-spacing 6px
				.w-log
					width 64px
					height 96px
					margin auto
			.rrl-url
				color #fff
				font-size 32px
				text-align center
				letter-spacing 10px
			.banner
				width 100%
				.swiper-container
					z-index: 0;
					width: 100%;
					padding-top: 10px;
					padding-bottom: 15px;
				.swiper-slide
					background-position: center;
					background-size: cover;
					width: 80%;
				.swiper-img
					border-radius: 10px;
					width: 100%;
			.banner-link
				display block
	
	.specify-cont-inner
		margin-top 150px
		.specify-shop-wrap
			margin 24px 24px 0
			background #fff
			border-radius 20px
			.specify-titlespecify-title
				padding 24px 24px 24px 0
				color #fff
				font-size 30px
				letter-spacing 2px
				display flex
				justify-content space-between
				align-items center
				.-title-msg1
					width 161px
					height 45px
					line-height 45px
					display block
					text-align center
					background-image linear-gradient(270deg, #fc8cfa 0%, #a281ed 47%, #737cf6 68%, #4377ff 100%), 
					linear-gradient(0deg, #fc8cfa 0%, #a281ed 47%, #737cf6 68%, #4377ff 100%)
					font-size 30px
					border-radius 0px 20px 20px 2px
					letter-spacing 3px
				.-title-msg
					width 122px
					height 24px
			.s-shop-list
				display flex
				align-items center
				padding 0px 24px 24px
				width: 100%
				box-sizing: border-box
				overflow: hidden
				.-shop-list-img
					margin-right 3.4%
					flex 0 0 31%
					height 210px
					img
						width 100%
						height 100%
		.-bg-img3
			margin-top 0
	.-title-msg1
		width 160px
		height 45px
		line-height 45px
		display block
		text-align center
		background-image linear-gradient(270deg, #fc8cfa 0%, #a281ed 47%, #737cf6 68%, #4377ff 100%), 
		linear-gradient(0deg, #fc8cfa 0%, #a281ed 47%, #737cf6 68%, #4377ff 100%)
		font-size 22px
		color #fff
		border-radius 0px 20px 20px 2px
		letter-spacing 3px
	.margin-left-m
		margin-left 24px
	.even11
		margin-top -80px
		width 100%
		position relative
		height 940px
		overflow hidden
		.click-div
			height 520px
			position absolute
			top 80px
			left 24px
			right 24px
			z-index 2
		.even11-img
			width 1400px
			position absolute
			left -320px
			top 10px
		.evenCont
			position absolute
			left 102px
			top 620px
			width 550px
			height 250px
			display flex
			.wares-img
				display block
				width 48%
				height 100%
				margin-right 4%
				border-radius 24px
			.wares
				width 48%
				.wares-item
					height 49%
					display flex
					&:nth-child(even)
						margin-top 2%
					.wares-item-img
						display block
						height 100%
						border-radius 12px
					.wares-item-text
						width 150px
						padding 10px 4px
						font-size 16px
						display flex
						flex-wrap wrap
						align-content space-between
						.jg
							width 150px
							display flex
							align-items center
						.price
							font-size 20px
							margin-right 10px
							color #F55692
						.y-price
							text-decoration line-through
	.nav-wrap
		display -webkit-box
		display -moz-flex
		display -ms-flexbox
		display flex
		-ms-flex-flow wrap
		flex-flow wrap
		background #f2f2f2
		padding 43px 24px
		-webkit-box-sizing border-box
		box-sizing border-box
		.nav-item
			display flex
			align-items center
			justify-content center
			.nav-item-list
				flex 0 0 33%
				text-align center
				height 200px
				a
					display block
					img 
						width 92%
						max-height 100%
	.-item-vip-card
		position relative
		margin 20px 24px 20px
		height 228px
		overflow hidden
		.click-jr
			position absolute
			width 200px
			height 200px
			display block
			right -40px
			bottom -40px
			z-index 2
		.vip-card
			display block
			img 
				width 100%
				max-height 100%
		a
			display block
			img 
				width 100%
				max-height 100%
	.collar
		background-image url('/static/images/home/new/collar.gif')
		background-size 100%
		height 410px
		margin 28px 24px 0 24px
		overflow hidden
		border-radius 10px
		padding 0 24px
		position relative
		.more
			position absolute
			right 24px
			width 160px
			height 80px
			z-index 2
		.collarList
			display flex
			justify-content space-between
			.swiper-container
				margin 0 !important
			.swiper-slide
				position relative
				background #fff
				margin-top 100px
				width 207px
				height 240px
				border-radius 10px
				padding 32px 10px 0 10px
				&:nth-last-child(1)
					background none
				.led
					position absolute
					top 10px
					left 10px
					padding 6px 10px
					font-size 10px
					background:rgba(227,203,253,1);
					border-radius 30px
					color #fff
				.swiper-everyday-img
					width 160px
					display block
					height 160px
					margin 0 auto
				.swiper-everyday-tit
					font-size 20px
					padding 10px 10px 0 10px
				.swiper-everyday-price
					font-size 20px
					padding 10px 10px 0
					color #808080
					text-decoration line-through
			.collar-item
				margin-top 80px
				width 207px
				height 290px
				background #fff
				border-radius 10px
		.specify-img
			display block
			width 102px
			height 19px
			position absolute
			right 24px
			top 30px
	.-item-vip-card2
		padding 29px 24px 26px 24px
		img 
			width 100%
			max-height 100%
	.opinions
		padding 0 24px
		border-radius 24px
		overflow hidden
		margin-top 22px
		.opinions-img
			width 100%
			height 227.6px
			display block
			border-radius:24px 24px 0px 3px;
		.opinions-cont
			background #fff
			display flex
			justify-content space-between
			padding 20px
			overflow hidden
			border-radius:0px 0px 24px 30px;
			.look
				overflow visible !important
				box-shadow none !important
			.lookMore
				margin 20px 0 0 40px
				width 40px 
				padding 10px
				height:202px;
				background:rgba(238,238,238,1);
				border-radius:28px;
				text-align center
				color #6756EA
				display flex
				flex-wrap wrap
				justify-content center
				align-items center
				img
					display block
					width 32px
					height 32px
			.swiper-container
				width 100%
				height 100%
				overflow visible !important
				.swiper-slide
					width 210px
					box-shadow 0px 0px 10px 0px rgba(222,204,237,0.5)
					border-radius 24px
					background #fff
					border-radius:24px;
					overflow hidden
					.opinions-cont-item-img
						display block
						width 100%
						height 210px
					.opinions-cont-item-tit
						width 100%
						height 36px
						padding 10px 10px 0 10px
					.opinions-cont-item-price
						padding 10px
						color #FF2901
				.swiper-button-prev, .swiper-button-next
					width 19px
					height 21px
				.swiper-button-prev
					left -22px
				.swiper-button-next
					right -20px
			.opinions-cont-item
				width 210px
				box-shadow 0px 0px 10px 0px rgba(222,204,237,0.5)
				border-radius 24px
				background #fff
				border-radius:24px;
				overflow hidden
				.opinions-cont-item-img
					display block
					width 100%
					height 210px
				.opinions-cont-item-tit
					width 100%
					height 36px
					padding 0 10px
				.opinions-cont-item-price
					padding 10px
					color #FF2901
	.new-pic-wrap
		margin 24px 24px 0
		.new-pic-cont
			width 100%
			height 230px
			margin-bottom 18px
	.heading
		height 88px
		display flex
		align-items center
		justify-content center
		&:before
			width 56px
			height 15px
			content ''
			display inline-block
			background url(/static/images/home/line-left1.png) no-repeat
			background-size 100%
		&:after
			width 56px
			height 15px
			content ''
			display inline-block
			background url(/static/images/home/line-right1.png) no-repeat
			background-size 100%
		h3
			font-size 30px
			font-weight normal
			margin 0 12px
	.hot-wrap
		padding 0 24px
		box-sizing border-box
		.hot-list
			display flex
			flex-wrap wrap
			.single-item
				width 49%
				height 476px
				background-color #fff
				border-radius 8px
				overflow hidden
				margin 0 2% 22px 0
				padding 10px
				box-sizing border-box
				&:nth-child(2n)
					margin-right 0
				.img-wrap
					width 320px
					height 320px
					border-radius 10px
					overflow hidden
					img 
						max-width 100%
						max-height 100%
						display block
						margin 0 auto
						border-radius 10px
				.main
					.title
						width 100%
						font-size 22px
						color #151515
						overflow hidden    
						text-overflow ellipsis    
						white-space nowrap
						margin 15px 0
					.row-line
						display flex
						align-items center
						justify-content space-between
						.price
							.discount-price
								font-size 30px
								color #ed0d0d
							.original-price
								font-size 24px
								color #a1a1a1
						.add-cart
							width 50px
							height 50px
							background url(/static/images/home/add-cart.png) no-repeat
							background-size 100%
	.hot-news
		padding 0 24px
		box-sizing border-box
		.news-list
			.single-item
				height 140px
				background-color #ffffff
				border-radius 10px
				margin-bottom 15px
				padding 0 20px
				box-sizing border-box
				display flex
				align-items center
				justify-content space-between	
				.main 
					flex 1
					.title
						width 480px
						font-size 20px
						margin-bottom 10px
						overflow hidden
						text-overflow ellipsis
						white-space nowrap
						
					.dec
						width 400px
						font-size 24px
						height 32px
						color #7e7e7e
						overflow hidden
						text-overflow ellipsis
						display -webkit-box
						-webkit-line-clamp 1
						-webkit-box-orient vertical
				.img-wrap
					width 118px
					height 118px
					overflow hidden
					border-radius 10px
					img 
						width 100%
		.more
			font-size 26px
			color #151515
			text-align center
	.foot-height136
		width 100%
		height 136px
		background #d1c6f7
		background-image: linear-gradient(#e7e4fc 0%, #d1c6f7 100%);  
	.banner-ss
		border 1px solid #fff

</style>