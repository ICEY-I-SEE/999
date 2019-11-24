<template>
    <div class="MySharing">
        <img class="MySharing-img"   :src="ewmList.return_img"/>
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
        // 接口
        sharing() {
            var url = 'user/personal'
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
        .MySharing-img
            width 100%
            height 100%           
</style>
