<template>
    <div class="MySharing">
        
        <!-- 头部组件 -->
		<My-Header custom-title="" class="head">
			<!-- 返回按钮 -->
			<!-- <i slot="backBtn" class="iconfont icon-fanhui"></i> -->
		</My-Header>
        <div class="content">
            <div class="main">
                <div class="img_head">
                    <div class="img">
                        <img :src="siteList.avatar"/>
                    </div>
                    <div class="name">
                        <span>ID:</span>
                        <span>{{siteList.realname}}</span>
                    </div>
                </div>
                <div class="mark_wrap">
                    <div class="mark">
                        <div class="mark_img">
                            <img :src="ewmList.url"/>
                            <!-- 必须是id 和实例化的第一参数对应 -->
                            <!-- <div id="qrcode"></div> -->
                            <p class="touch">长按二维码保存</p>
                        </div>
                    </div>
                    
                </div>
                
            </div>
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
    methods: {
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
            var url = 'user/personal'
            var params = new URLSearchParams();
            params.append('token', this.$store.getters.optuser.Authorization);  
            this.$axios({.
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
    },
    mounted () {
        this.sharing();
        console.log(this.globalUrl)
    },
	components: {
        MyHeader,
    },
};
</script>

<style lang="stylus" scoped>
    .MySharing
        width 100%
        height 100%
        background url(/static/images/user/ewm_bg.gif) no-repeat
        // background-size 100% 100%
        background-size cover
        .head /deep/ .van-sticky
            color #fff
            background none
        .content
            padding 135px 0 0
            font-family PangMenZhengDao
            .main
                position relative
                margin 0 auto
                width 702px
                border-radius 10px
            .img_head
                padding 220px 0 0
                .img 
                    width 220px
                    height 220px 
                    margin 0 auto
                    position absolute
                    top -10px
                    left 50%
                    margin-left -110px
                    border 2px solid #fff
                    border-radius 50%
                    overflow hidden
                    img 
                        width 100%
                        height 100%
                .name 
                    font-size 30px
                    line-height 75px
                    text-align center
                    color #fff
                    letter-spacing 4px
                    margin 20px 0
            .mark_wrap
                margin 0 auto 30px
                border-radius 10px
                padding 0 60px
                box-sizing border-box
                .mark
                    width 500px
                    height 500px
                    margin 0 auto
                    padding 10px
                    background-size 100% 100%
                    box-sizing border-box
                    position relative
                    img 
                        width 100%  
                        border-radius 30px         
                    .touch
                        font-size 30px
                        text-align center
                        color #fff  
                        font-size 33px
                        letter-spacing 3px
                        color #1b1b1b 
                        position absolute
                        bottom 16px  
                        width 100%
                        text-align center                            
</style>
<style lang="stylus">
.MySharing
    .head
        .TopHeader
            background-color transparent !important 
            border none
            color #fff
        
</style>