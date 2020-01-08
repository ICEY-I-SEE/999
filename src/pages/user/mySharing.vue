<template>
    <div class="MySharing" :class="!(ewmList.return_qr_code||siteList.qrcode)?'bg':''">
        <!-- <div class="sharing-code-wrap"><img class="sharing-code-img" :src="ewmList.return_img"/></div> -->
        <!-- 头部组件 -->
		<My-Header custom-title="分享二维码" class="head">
			<!-- 返回按钮 -->
			<i slot="backBtn" style="color:#000;" class="iconfont icon-fanhui"></i>
		</My-Header>
        <div class="content" v-if="ewmList.return_qr_code||siteList.qrcode">
            <div class="main">
                <div class="img_head">
                    <div class="img">
                        <img :src="siteList.avatar"/>
                    </div>
                    <div class="name">
                        <p>{{siteList.realname}}</p>
                        <p>ID: {{siteList.id}}</p>
                    </div>
                    <img class="logo" src="/static/images/user/logo.png">
                    <!-- <p class="name">邀请码:{{siteList.code}}</p> -->
                </div>
                <div class="mark_wrap">
                    <div class="mark">
                        <div class="mark_img">
                            <div class="title">你请客我送酒，扫码了解。</div>
                            <img :src="ewmList.return_qr_code||siteList.qrcode"/>
                            <!-- 必须是id 和实例化的第一参数对应 -->
                            <!-- <div id="qrcode"></div> -->
                            <p class="touch">截图可保存二维码~~</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="shar" v-else>
            <img src="/static/images/user/shar.png">
            <p>您还没有购买礼包，请购买礼包后查看</p>
            <div class="ts-style" @click="jumpTo">立即购买</div>
        </div>
    </div>
</template>

<script>
    import MyHeader from "@/pages/common/header/TopHeader"
    import QRCode from 'qrcodejs2'
    export default {
	name: "mySharing",
	data() {
		return {
            //link: 'http://new_retail_web.zhifengwangluo.com/Register+url',// 要跳转的路径或者显示的文字
            siteList:[],
            ewmList:[],
            link:''
        };
    },
    mounted () {
        if(!this.$store.getters.optuser.Authorization){
			let code = this.getCode('code');
        	let user_id = this.getCode('user_id');
			if(code){
				let url = 'weixin/get_openid'
					this.$axios.post(url,{
						'code':code,
						'user_id':user_id?user_id:'0'
					})
				.then((res)=>{
					let _that = this;
					if(res.data.status==200){
						_that.$store.commit('del_token');
						localStorage.setItem('time',parseInt(new Date().getTime()/1000))
						var tokens = res.data.data.token
						_that.token = tokens
						_that.$store.commit('set_token',{Authorization: tokens})  //保存token
						_that.requestData(tokens);
						return;
					}else{
						console.log('----+++++---')
						console.log(res.data)
						console.log(res.data.status)
						console.log('----+++++---')
						this.$toast(res.data.msg)
					}
				})
				.catch((error) => {
					console.log('请求错误:'+ error)
				}) 
			}else{
				this.getIsWxClient();
			}
		}else{
			this.sharing();
		}
        // console.log(this.globalUrl)
    },
	components: {
        MyHeader,
    },
    methods: {
        getIsWxClient () {
            var ua = navigator.userAgent.toLowerCase(),
                that = this;
            let user_id = this.getCode('user_id');
            if (ua.match(/MicroMessenger/i) == "micromessenger") {
                that.$axios.post('weixin/info_code',{
                    'user_id':user_id?user_id:'0'
                })
                .then((res)=>{
                    var list=res.data;
                    console.log(list)
                    if(list.status==200){
                        window.location.href = list.data;
                    }else{
                        that.$toast(list.msg)
                    }
                })
                .catch((error) => {
                    alert('请求错误:'+ error)
                }) 
            }
            return false;
		},
        getCode (name) {
            var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)');
            var r = window.location.search.substr(1).match(reg);
            if (r != null) return decodeURIComponent(r[2]); return null;
		},
        // qrcode () {
        //     // 和div的id相同 必须是id  class类名会报错
        //     // 第二参数是他的配置项
        //     let that = this 
        //     let qrCode = new QRCode('qrcode', {
        //         width: 160,
        //         height: 160,
        //         render: "table",
        //         text: that.link,//可以写路径或者文字，扫描后想要跳转的路径或者显示的文字
        //     })
        //     //从 canvas 提取图片 image  
        //     function convertCanvasToImage(canvas) {  
        //         // var canvas = document.getElementById('qrcode').getElementsByTagName('img')[0];
        //         var canvas=document.getElementsByTagName('canvas')[0];
        //         var img = convertCanvasToImage(canvas);
        //         console.log(canvas) 
        //         $('#qrcode').append(img);// 添加DOM
        //         //新建Image对象
        //         var image = new Image();
        //         // canvas.toDataURL 返回的是一串Base64编码的URL
        //         image.src = canvas.toDataURL("image/png");
        //         console.log(image.src)  
        //         return image;
        //     }
        // },
        // 接口
        sharing() {
            var url = 'user/sharePoster'
            var params = new URLSearchParams();
            params.append('token', this.$store.getters.optuser.Authorization);  
            this.$axios({
                method:"post",
                url:url,
                data:params
            }).then((res)=>{
                if(res.data.status === 200){
                    this.siteList = res.data.data
                    // console.log(this.siteList)
                    this.qrcode(); 
                } else {
                    Dialog.alert({
                        message:res.data.msg
                    })
                }
            })
        },
         // 二维码接口
        qrcode() {
            var http = 'user/ewm'
            var url ='Register?'+'uid='+this.siteList.id
            // console.log(url)
            var params = new URLSearchParams();
            params.append('token', this.$store.getters.optuser.Authorization);
            params.append('url',url)  
            this.$axios({
                method:"post",
                url:http,
                data:params
            }).then((res)=>{
                // console.log(res)
                if(res.data.status === 200){
                    this.ewmList = res.data.data
                    this.link =res.data.data+this.siteList.id
                    // console.log(this.ewmList)
                } else {
                    Dialog.alert({
                        message:res.data.msg
                    })
                }
            })
        },
        jumpTo(){
            this.$router.push('/home')
        }
    },
};
</script>

<style lang="stylus" scoped>
    .bg
        background #fff6d7 !important
    .MySharing
        width 100%
        height 100vh
        background url(/static/images/user/ewm_bgs.png) no-repeat
        background-size cover
        position relative
        overflow hidden
        .sharing-code-wrap
            position absolute
            top 0
            left 0
            z-index 8
            width 100%
            height 100%
            opacity 0
            .sharing-code-img
                width 100%
                height 100%
        .head /deep/ .van-sticky
            color #fff
            background none
        .content
            padding 125px 0 0
            font-family PangMenZhengDao
            .main
                position relative
                margin 0 auto
                width 702px
                border-radius 10px
            .img_head
                position relative
                margin 0 auto
                width 540px
                height 164px
                border-top-left-radius 20px
                border-top-right-radius 20px
                background linear-gradient(45deg, #e63100, #d90000)
                .img 
                    width 122px
                    height 122px 
                    margin 0 auto
                    position absolute
                    top 22px
                    left 38px
                    border-radius 50%
                    overflow hidden
                    img 
                        width 100%
                .name 
                    position relative
                    float right 
                    width 340px
                    height 100%
                    font-size 30px
                    line-height 50px
                    padding-left 55px
                    padding-top 20px
                    color #fff
                    letter-spacing 4px
                    box-sizing border-box
                    &::before
                        content ''
                        display block
                        position absolute
                        top 0
                        left 0
                        bottom 0
                        margin auto
                        width 4px
                        height 110px
                        background #fff
                .logo
                    position absolute
                    left 0
                    right 0
                    bottom -100px
                    width 155px
                    height 155px
                    border-radius 50%
                    margin auto
                    z-index 9
            .mark_wrap
                margin 0 auto 30px
                border-radius 10px
                padding 0 60px
                box-sizing border-box
                .mark
                    width 540px
                    height 650px
                    margin 0 auto
                    padding 40px 24px
                    background-size 100% 100%
                    box-sizing border-box
                    position relative
                    background #fff
                    border-bottom-left-radius 20px
                    border-bottom-right-radius 20px
                    .title
                        margin-top 60px 
                        text-align center
                    img 
                        display block
                        margin 0 auto
                        width 90%  
                              
                    .touch
                        font-size 30px
                        text-align center
                        font-size 33px
                        letter-spacing 3px
                        color #d90000 
                        position absolute
                        bottom 2%  
                        width 100%
                        text-align center 
                        left 0     
                    .nodata
                        text-align center
                        line-height 650px    
        .shar
            padding-top 16vh
            text-align center
            img 
                width 300px
            p
                line-height 150px
            div
                margin -20px auto 0
                color #fff
                width 190px
                border-radius 100px
                line-height 58px
</style>