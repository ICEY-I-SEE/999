<template>
	<div class="data_wrap">
		<!-- 头部组件 -->
		<Data-Header custom-title="个人资料">
			<!-- 返回按钮 -->
			<i slot="backBtn" class="iconfont icon-fanhui"></i>
		</Data-Header>
        <div class="content">
			<div class="nom_wrap">
                <p class="exp-style">完善资料填写，即可获得一张5元代金券</p>
                <div class="item_wrap">
                    <div class="text">头像</div>
                    <van-uploader :after-read="onRead">    
                        <div class="img">
                            <img :src="img" alt="" ref="userImg"/>
                        </div>
                        <i class="iconfont icon-xiangyoujiantou"></i>
                    </van-uploader>
                </div>
                <div class="my_look">
                    <div class="item_wrap">
                        <div class="text">用户名</div>
                        <div class="name_wrap">
                            <input type="text" class="r-sty" placeholder="请输入用户名" v-model="userName"/> 
                        </div>
                    </div>
                </div>
                <div class="my_look">
                    <div class="item_wrap">
                        <div class="text">性别</div>
                        <div class="name_wrap">
                            <van-radio-group v-model="radio" class="gender-wrap"> 
                                <van-radio name="1" checked-color="#e45ac2">男</van-radio>
                                <van-radio name="0" checked-color="#e45ac2">女</van-radio>
                            </van-radio-group>
                        </div>
                    </div>
                </div>
                <div class="my_look">
                    <div class="item_wrap">
                        <div class="text">所在城市</div>
                        <div class="name_wrap">
                            <van-button type="primary" @click="showPopup">{{this.address}}</van-button>
                            <van-popup v-model="show" position="bottom" :style="{ height: '50%' }">
                                <van-area :area-list="areaList" :columns-num="3" @confirm="onAddrConfirm" @cancel="onAddrCancel" />
                            </van-popup>
                            <i class="iconfont icon-xiangyoujiantou"></i>
                        </div>
                    </div>
                </div>
                <div class="my_look">
                    <div class="item_wrap">
                        <div class="text">年龄</div>
                        <div class="name_wrap">
                            <!-- <input type="text" class="r-sty" placeholder="请输入年龄" v-model="years"/> - -->
                            <van-button type="primary" @click="showYears">{{yearsType}} <i class="iconfont icon--xiangxiajiantou"></i></van-button>
                            <van-popup v-model="yearShow" position="bottom" :style="{ height: '50%' }">
                                <van-picker :columns="yearsColumns" @change="onChange" @cancel="onCancelYears" @confirm="onConfirmYears" />
                            </van-popup>
                            <!-- <span class="name">20岁/00后</span>
                            <i class="iconfont icon-xiangyoujiantou"></i> -->
                        </div>
                    </div>
                </div>
                <!-- <router-link class="my_look" :to="'/user/modifyUserName?titleName=星座&editTpye=5'">
                    <div class="item_wrap">
                        <div class="text">星座</div>
                        <div class="name_wrap">
                            <span class="name">双子座</span>
                            <i class="iconfont icon-xiangyoujiantou"></i>
                        </div>
                    </div>
                </router-link> -->
                <!-- <router-link class="my_look" to="/EditPassword">
                    <div class="item_wrap">
                        <div class="text">修改密码</div>
                        <div class="name_wrap">
                            <i class="iconfont icon-xiangyoujiantou"></i>
                        </div>
                    </div>
                </router-link>    
                 <router-link class="my_look" to="/user/SetPassword">
                    <div class="item_wrap">
                        <div class="text">支付密码</div>
                        <div class="name_wrap">
                            <i class="iconfont icon-xiangyoujiantou"></i>
                        </div>
                    </div>
                </router-link>     -->
            </div>
            <!-- 按钮 -->
            <div class="btn ts-style" @click="saveInfo()"><span class="ts-btn-msg">保存</span></div>
		</div>
	</div>
</template>

<script>
    import DataHeader from "@/pages/common/header/TopHeader"
    import { Dialog } from 'vant'
    import { Toast } from 'vant'
	export default {
		name: "personalData",
		data() {
			return{
                userImg:'',     // 用户头像
                userName:'',    // 用户名
                show: false,    // 地区上拉列表显示隐藏
                areaList:{},    // 选择地区上拉列表
                address:'选择省/市/区',     //点击选择省/市/区展示
                code:'',// 区id
                years:'',
                yearsType:'未知',
                yearsColumns: ['未知','60后', '70后', '80后', '90后', '00后'],
                yearShow:false,
                yearInfdex:0,
                radio: '1',
                isClick:false,
                img:'',
                token:this.$store.getters.optuser.Authorization
			}
        },
        created() {
            this.codes()
            this.$store.commit('showLoading')
            this.getUserInfo()
        },
        methods:{

            trueData(info,ist){
                if(ist){
                    for(var i in this.yearsColumns){
                        if(i==info){
                            return this.yearsColumns[i]
                        }
                    }
                }
                if('undefined' ==typeof(info) || info==null){
                    return ''
                }
                return info
            },
            getUserInfo() {
                var that =this
               	that.$axios.post('user/user_info',{
                    'token':that.token
                })
				.then((res)=>{
                    var list =res.data
                    if(list.status==200){
                        that.img = that.trueData(res.data.data.avatar)
                        that.userName= that.trueData(res.data.data.realname)
                        if(res.data.data.province !=null){
                            this.address =res.data.data.province+''+res.data.data.city+''+res.data.data.district
                        }
                        this.code =res.data.data.district_id
                        // console.log(this.district)
                        if(!('undefined' ==typeof(res.data.data.gender) || res.data.data.gender==null)){
                            that.radio =JSON.stringify(res.data.data.gender)
                        }
                        that.yearsType =that.trueData(res.data.data.age,true) 
                    }
                    else{
                        that.$toast(res.data.msg)
                    }
                    this.$store.commit('hideLoading')
                })
            },

             // 省市区上拉
            showPopup() {
                this.show = true;
            },
            // 地区确定选择
            onAddrConfirm(val){  
                this.show = false;
                this.address = val[0].name+ val[1].name +val[2].name
                this.code =val[2].code      // 传给后台的district-区id
                this.district=val[2].code
                // console.log(this.code)
            },
            // 地区取消选择
            onAddrCancel(){  
                this.show = false
            },
            // 获取省、市、区接口
            codes() {
                var url = 'user/get_address'
                var params = new URLSearchParams();
                    params.append('token', this.$store.getters.optuser.Authorization);//要传给后台的参数值 key/value //token
                this.$axios({
                    method:"post",
                    url:url,
                    data:params
                }).then((res)=>{
                    if(res.data.status === 200){
                        this.areaList = res.data.data
                    } else {
                        Toast(res.data.msg)
                    }
                })
            },
            // 年龄
            showYears(){
                this.yearShow=true
            },
            onCancelYears(picker, value, index){
                // console.log(picker, value, index)
                this.yearShow=false
            },
            onConfirmYears(){
                this.yearShow=false
            },
            onChange(picker, value, index) {
            //    this.$toast(`当前值：${value}, 当前索引：${index}`);
                this.yearInfdex =index
                this.yearsType =value
            },

            onRead(file) {
                this.img =file.content
            },

            saveInfo() {
                var that =this
                if(that.img==""){
                    return that.$toast('请选择头像')
                }
                if(that.realname==""){
                    return that.$toast('请输入用户名')
                }
                if(that.isClick){return}
                that.isClick =true
               	that.$axios.post('user/update_user',{
                    'token':that.token,
                    'image':that.img,
                    'realname':	that.userName,
                    'district':	that.code,
                    'age': that.yearInfdex,
                    'gender':that.radio
                })
				.then((res)=>{
                    var list =res.data
                    if(list.status==200){
                        that.$toast(res.data.msg)
                        setTimeout(()=>{
                            this.$router.go(-1)
                        },1000)
                    }
                    else{
                        that.$toast(res.data.msg)
                    }
                    that.isClick=false
                })
                .catch((error) => {
                    that.$toast('请求错误')
                    that.isClick=false
                })
            },
        },
		components: {
			DataHeader,
		},
		
	}
</script>

<style lang="stylus" scoped>
    .van-popup--bottom
        height auto !important
    .data_wrap
        width 100%
        height 100%
        overflow auto
        .content
            font-family: 'SourceHanSansHWSC-Regular'
            .nom_wrap
                margin 26px 24px
                .exp-style
                    margin-bottom 20px
                    color #d44ec2
                    font-size 24px
                .item_wrap
                    padding 10px 20px
                    margin 0 0 30px
                    background #fff
                    line-height 75px
                    border-radius 10px
                    box-shadow 0 0 6px #ccc
                .my_look
                    display block
                    color #151515    
                .item_wrap .text,.img,.name_wrap 
                    display inline-block
                    vertical-align middle
                .text
                    width 130px
                    font-size 28px
                    text-align-last justify
                .name_wrap
                    font-size 28px
                    float right
                    .gender-wrap
                        display flex
                        align-items center
                        padding-top 20px
                        .van-radio
                            margin-left 30px
                    .r-sty
                        width 200px
                        text-align right
                    .van-button--primary
                        padding 0
                        // width 460px
                        height 56px
                        line-height 56px
                        text-align left 
                        background #fff
                        color #151515
                        border none
                        outline none
                        text-align right 
                .img
                    width 68px
                    height 68px
                    border-radius 50% 
                .van-uploader
                    float right    
            .btn 
                position fixed
                bottom 27px
                left 24px
                width 702px
                height 88px
                border-radius 44px
                font-size 30px
                color #fff 
                text-align center
                line-height 88px  
                letter-spacing 4px   
img
    display block
    margin 0 auto
    width 100%
    height 100%
    border-radius 50%
</style>