<template>
    <div class="appointment">
        <TopHeader custom-title="预约中心">
			<i slot="backBtn" class="iconfont icon-fanhui"></i>
            <!-- <span slot="rightBtn" class="iconfont icon-bianji1 edit" @click="route"></span> -->
            <span slot="rightBtn" class="rightBtn" @click="route">预约列表</span>
		</TopHeader>
        <div class="package">
            <div class="package_item" @click="type=1" :class="type==1?'active':''">
                999礼包:剩余<span>{{teamList.vip_999nums}}</span>次
            </div>
            <div class="package_item" @click="type=2" :class="type==2?'active':''">
                3999礼包:剩余<span>{{teamList.vip_3999nums}}</span>次
            </div>
        </div>
        <div class="introduce">
            温馨提示：请申请兑换礼包时完整填写信息，未完整填写的兑换申请为无效申请。兑换申请一经提交，怒不接受更改。请在有效期内兑换使用，过期作废。
        </div>
        <div class="timeBtn">
            <van-cell is-link @click="showDate = true">预约时间 <span style="float:right;">{{`${currentDate.getFullYear()}年${(currentDate.getMonth()+1)}月${currentDate.getDate()}日`}}</span></van-cell>
        </div>
        <van-cell-group>
            <van-field v-model="num" label="预约桌数" type="number" placeholder="请输入预约桌数" />
        </van-cell-group>
        <van-cell-group>
            <van-field v-model="user" label="联系人" placeholder="请输入联系人姓名" />
        </van-cell-group>
        <van-cell-group>
            <van-field v-model="user_mobile" type="number" label="联系方式" placeholder="请输入联系人电话" />
        </van-cell-group>
        <!-- <div class="form-group">
            <div class="label">地址 </div>
                <div class="input-group">
                    <van-button type="primary" @click="showPopup">{{this.address}}</van-button>
                    <van-popup v-model="show" position="bottom" :style="{ height: '50%' }">
                        <van-area :area-list="areaList" :columns-num="3" @confirm="onAddrConfirm" @cancel="onAddrCancel" />
                    </van-popup>
                </div>
            <div class="right-arrow"></div>
        </div> -->
        <van-cell-group>
            <van-field v-model="address_info" label="详细地址" placeholder="请输入详细地址" />
        </van-cell-group>
        <van-cell-group>
            <van-field
                v-model="remarks"
                rows="1"
                autosize
                label="备注"
                type="textarea"
                placeholder="请输入备注"
            />
        </van-cell-group>
        <div class="menu">
            <div class="menuBtn_left" v-if="time">
                剩余时间:{{time}}
            </div>
            <div class="menuBtn" @click="send">
                预约
            </div>
        </div>
        <van-popup
            v-model="showDate"
            position="bottom"
            :style="{ height: '44%' }"
        >
            <van-datetime-picker
                v-model="currentDate"
                type="date"
                :min-date="minDate"
                @confirm="firm"
                @cancel="firm"
            />
        </van-popup>
    </div>
</template>

<script>
    import TopHeader from "@/pages/common/header/TopHeader";
    export default {
        name:'appointment',
        components: {
            TopHeader
        },
        data(){
            return {
                showDate: false,
                currentDate: new Date(),
                minDate: new Date(),
                type:1,
                time:'',
                teamList:'',
                remarks:'',
                show: false,// 地区上拉列表显示隐藏
                areaList:{},// 选择地区上拉列表
                address:'选择省/市/区',//点击选择省/市/区展示
                // location:{},// 请选择地址
                addressId:'',// id
                code:'',// 区id
                address_id:0,// 传过来的id
                num:'',
                user:'',
                user_mobile:'',
                address_info:''
            }
        },
        mounted(){
            var _this = this;
            this.getTeamInfo();
            // this.codes();// 获取省、市、区接口
        },
        methods:{
            // 省市区上拉
            showPopup() {
                this.show = true;
            },
            // 地区确定选择
            onAddrConfirm(val){  
                this.show = false;
                this.address = val[0].name+ val[1].name +val[2].name
                this.code =val[2].code// 传给后台的district-区id
                this.district=val[2].code
                console.log(this.code)
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
            firm(){
                this.showDate = false
            },
            getTeamInfo(){
                let _that=this,
                    url = 'user/subscribe';
                _that.$axios.post(url,{
                    token:this.$store.getters.optuser.Authorization
                }).then((res)=>{
                    var list =res.data
                    if(list.status===200){
                        _that.teamList =list.data;
                        this.$store.commit('hideLoading')
                        var min = new Date(this.minDate);
                        this.currentDate = this.minDate = new Date(this.minDate.getTime()+60*60*24*1000*Number(this.teamList.xuanze_time));
                    }else{
                        _that.$toast(list.msg)
                    }
                })
            },
            route(){
                this.$router.push({name:'intment'});
            },
            send(){
                console.log(this.currentDate)
                let _that=this,
                    url = 'user/subscribe_tijiao';
                if(this.num==''){
                    return _that.$toast('请输入预约桌数!')
                }
                if(this.user==''){
                    return _that.$toast('请输入联系人!')
                }
                if(this.user_mobile==''){
                    return _that.$toast('请输入联系人电话!')
                }
                // if(this.code==''){
                //     return _that.$toast('请选择预约地址!')
                // }
                if(this.address_info==''){
                    return _that.$toast('请输入详细地址!')
                }
                if(this.type==1&&this.teamList.vip_999nums==0||this.type==2&&this.teamList.vip_3999nums==0){
                    return _that.$toast('预约次数不足!')
                }
                _that.$axios.post(url,{
                    token:this.$store.getters.optuser.Authorization,
                    vip_type:this.type==1?'vip_999':'vip_3999',
                    subscribe_time:`${this.currentDate.getFullYear()}-${this.currentDate.getMonth()+1}-${this.currentDate.getDate()}`,
                    remarks:this.remarks,
                    num:this.num,
                    user:this.user,
                    user_mobile:this.user_mobile,
                    code:this.code,
                    address:this.address_info
                }).then((res)=>{
                    var list =res.data
                    if(list.status===200){
                        _that.$toast('提交成功!')
                        setTimeout(()=>{
                            this.$router.push('/User')
                        },1000)
                    }else{
                        _that.$toast(list.msg)
                    }
                })
            },
        },
    }
</script>

<style lang="stylus" scoped>
    .appointment
        width 100vw
        height 100vh
        box-sizing border-box
        overflow auto
        padding-bottom 200px
        background #fef6d7
        .package
            width 100%
            padding 24px
            box-sizing border-box
            .package_item
                margin 20px auto
                height 200px
                line-height 200px
                text-align center
                border-radius 20px
                color #000
                font-size 40px
                background #f4d67b
            .active
                color #fff
                background linear-gradient(to right,#e63100, #d90000)
                span 
                    margin 0 15px
                    font-size 50px
        .introduce
            margin-bottom 20px
            width 100%
            padding 24px
            letter-spacing 2px
            box-sizing border-box
        .van-cell-group
            margin 24px
        .form-group
            height 100px
            display flex
            align-items center
            border-bottom 1px solid #e6e6e6
            margin 0 24px
            padding-left 40px
            background #fff
            .label
                width 145px
                font-size 24px
                color #151515
                margin-right 10px
            .input-group
                width 422px
                font-size 24px
                .van-button--primary
                    padding 0
                    width 422px
                    height 56px
                    line-height 56px
                    text-align right 
                    background #fff
                    color #151515
                    border none
                    outline none
                input
                    width 100%
                    height 30px
                    border none
                h3
                    font-size 24px
                    color #151515
                    font-weight normal
                p
                    color #838383
                    font-size 22px
                    overflow hidden
                    text-overflow ellipsis
                    white-space nowrap  
            .right-arrow
                width 15px
                height 30px
                background url("/static/images/user/address/right-arrow.png") no-repeat
                background-size 100%
                margin-left 20px
        .timeBtn
            width 100%
            padding 24px 24px 0
            box-sizing border-box
        .Remarks
            width 100%
            padding 24px
            box-sizing border-box
            div
                margin-right 20px
                letter-spacing 2px
            .text
                width 600px
                height 240px
                resize none
                padding 20px
                border-radius 20px
                box-sizing border-box
        .Remarks>*
            float left
        .menu
            position fixed
            left 0
            bottom 0
            width 100%
            height 98px
            line-height 98px
            background #fff
            box-shadow:0px 0px 7px 1px rgba(222,204,237,0.42)
            .menuBtn_left
                float left  
                width 70%
                height 100%
                color #f00
                padding-left 20px
                letter-spacing 2px
                box-sizing border-box
            .menuBtn
                float right 
                width 30%
                height 100%
                color #fff
                text-align center
                padding-left 20px
                letter-spacing 20px
                box-sizing border-box
                background #d90000
</style>
<style>
.rightBtn{
    color: #151515;
    letter-spacing: 0;
}
</style>