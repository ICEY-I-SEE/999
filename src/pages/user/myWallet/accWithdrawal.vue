<template>
	<div class="accWit_wrap">
		<!-- 头部组件 -->
		<With-Header custom-title="提现">
			<!-- 返回按钮 -->
			<i slot="backBtn" class="iconfont icon-fanhui"></i>
		</With-Header>
        <div class="content">
            <div class="hd_wrap">
				<div class="back">
                    <div class="k_box">
                        <p class="can">{{type==1?'可提现金额':'可提取酒'}}</p>
                        <div class="sum">
                            <span v-if="type==1">￥</span><span>{{type==1?moneyInfo.remainder_money:moneyInfo.distribut_money+'斤'}}</span>
                        </div>
                       
                    </div>
                </div>
				<!-- 提现方式 -->
                <h4 class="way_title" :class="type==1?'active':''" @click="type=1,money=''">提现</h4>
                <h4 class="way_title" :class="type==2?'active':''" @click="type=2,money=''">提酒</h4>
                <div class="clearfix"></div>
				<div class="way_wrap" v-if="type==1">
					<div class="mode">
                        <div class="wechat_wrap" v-for="(item,index) in payList" :key="index">
                            <div class="wechat weixi">
                                <img :src="item.img"/>
                            </div>
                            <div class="radio">
                                <van-radio-group v-model="radio">
                                    <van-cell-group>
                                        <van-cell :title="item.msg" clickable>
                                            <van-radio slot="right-icon" :name="index" @click="selectPayWay(item.id)"/>
                                        </van-cell>
                                    </van-cell-group>
                                </van-radio-group>
                            </div>
                        </div>
					</div>
					<div class="play_wrap">
						<!-- 微信/支付宝-提现金额 -->
						<div class="sum_wrap">
                            <!-- <h4>注：提现金额门槛为{{minWith}}
                                <span>手续费({{fee}})</span>
                            </h4> -->
                            <!-- <h4>输入提现金额 </h4> -->
							<div class="put">
                                <span class="dollars">￥</span>
								<div class="inp">
                                    <!-- <input type="number" placeholder="请输入提现金额" ref="money" v-model.number="money"> -->
                                    <input type="number" oninput="if(value.length > 12)value = value.slice(0, 12)" @click="verInput()" placeholder="请输入提现金额" ref="money" v-model.number="money" :readonly="moneyInfo.is_withdrawal==1">
								</div>
							</div>
                           <h4>实际到账： <span>{{computeMoney}}</span></h4>
                            <!-- 输入支付宝账号 -->

                            <div class="pay_wrap" v-if="pay_way==4">
                                <div class="pay">
                                    <h4>银行账户名</h4>
                                    <div class="inp">
                                        <input type="text" placeholder="请填写银行账户名" v-model="yhkName"/>
                                    </div>
                                </div>
                                <div class="pay">
                                    <h4>银行开户行</h4>
                                    <div class="inp">
                                        <input type="text" placeholder="请填写银行开户行" v-model="yhkType"/>
                                    </div>
                                </div>
                                <div class="pay">
                                    <h4>银行卡号</h4>
                                    <div class="inp">
                                        <input type="text" placeholder="请填写银行卡号" v-model="yhkNumber"/>
                                    </div>
                                </div>
                                <!-- <div class="pay">
                                    <h4>手机号</h4>
                                    <div class="inp">
                                        <input type="text" placeholder="请填写手机号" v-model="yhkPhone"/>
                                    </div>
                                </div> -->
                            </div>
                            <!-- 微信或支付宝 START -->
                            <div class="pay_wrap" v-else="">
                                <div class="pay">
                                    <h4>填写姓名</h4>
                                    <div class="inp">
                                        <input type="text" placeholder="请填写真实姓名" v-model="name" />
                                    </div>
                                </div>
                                <div class="pay">
                                    <h4 v-if="pay_way==2">填写微信账号</h4>
                                    <h4 v-if="pay_way==1">填写支付宝账号</h4>
                                    <div class="inp">
                                        <input type="text" v-if="pay_way==2" v-model="account" :placeholder="'请填写微信账号'"/>
                                        <input type="text" v-if="pay_way==1" v-model="account" :placeholder="'请填写支付宝账号'"/>
                                    </div>
                                </div>
                            </div>
						</div>

					</div>
				</div>
                <div v-if="type==2" class="edit_address">
                    <p>选择地址</p>
                    <router-link to="/user/Address?edit_address=1"  class="user-info" v-if="addrRes">
                        <i class="iconfont icon-ditu"></i>
                        <div class="-info-list">
                            <p class="-list-a">
                                <strong class="mr-44">{{addrRes.consignee}}</strong>
                                <strong>{{addrRes.mobile}}</strong>
                            </p>
                            <p class="-list-b">
                                {{addrRes.address}}
                            </p>
                        </div>
                        <div class="-list-edit"><i class="iconfont icon-bianji"></i></div>
                    </router-link>


                    <router-link to="/user/Address?edit_address=1"  class="user-info" v-else>
                        <i class="iconfont icon-ditu"></i>
                        <div class="-info-list">
                            <p>暂无收货地址</p>
                        </div>
                        <div class="-list-edit"><i class="iconfont icon-bianji"></i></div>
                    </router-link>

                    <div class="put">
                        <div class="inp">
                            <!-- <input type="number" placeholder="请输入提现金额" ref="money" v-model.number="money"> -->
                            <input type="number" oninput="if(value.length > 12)value = value.slice(0, 12)" @click="verInput()" placeholder="请输入提取数" ref="money" v-model.number="money" :readonly="moneyInfo.is_withdrawal==1">
                        </div>
                    </div>
                    <!-- <h4>实际到账： <span>{{computeNum}}</span></h4> -->
                </div>
				<!-- 申请提现按钮 -->
                <!-- <p class="hint">【优秀的经理人，平台在收到您的提现申请后，收益将于24小之内到账，请注意查收。】</p> -->
                <!-- <h2>提现须知</h2>
                <div class="hint"> -->
                    <!-- <p class="hint-list">提现须知</p> -->
                    <!-- <p class="hint-list hint-ss">提现说明：</p>
                    <div class="hint-list"> -->
                        <!-- <p>到账⽅式：</p> -->
                        <!-- <p class="hint-msg">经理人每日均可提现一次，最低提现金额500元，单日最高上限5万元。</p>
                    </div>
                    <p class="hint-list hint-ss">到账方式：</p>
                    <div class="hint-list"> -->
                        <!-- <p>到账⽅式：</p> -->
                        <!-- <p class="hint-msg">提现申请提交后，平台将于 2小时内完成审核，到账时间为 1-2 个工作日，请注意查收您的提现指定账户（周六日、法定节假日不作为工作日计算）。</p>
                    </div>
                </div> -->
				<!-- <div class="apply_btn ts-style" @click="saveWithdrawal()">提交申请</div> -->
                <div class="apply_btn ts-style" @click="showPasswordBox()">提交申请</div>

                <!-- 数字键盘 -->
                <div v-show="paswPopup" class="pasw-popup">
                    <div class="popup-inner" @click="paswPopup= false"></div>
                    <div class="-popup-cont">
                        <van-password-input
                        :value="payPassword"
                        @focus="showKeyboard = true"
                        />
                        <div class="fg-password"><router-link to="/user/SetPassword">忘记密码</router-link></div>
                        <van-number-keyboard
                        :show="showKeyboard"
                        @input="onInput"
                        @delete="onDelete"
                        @blur="showKeyboard = true"
                        />
                    </div>
                </div>
                <!-- 数字键盘结束 -->

			</div>
		</div>
	</div>
</template>

<script>
    import WithHeader from "@/pages/common/header/TopHeader"
    import { Toast } from 'vant'
    var timertep=''
	export default {
        name: 'accWithdrawal',
        components: {
			WithHeader,
		},
		data() {
			return{
                payList:[
                    // {id:2,msg:'微信',img:'/static/images/user/weixi.png'},
                    {id:1,msg:'支付宝',img:'/static/images/user/zfb.png'},
                    {id:4,msg:'银行卡',img:'/static/images/user/yhk.png'},
				],
                radio:0,
                money:'',
                name:'',
                account:'',
                isClick:false,
                moneyInfo:[],
                remainderMoney:this.$route.query.remainder_money,
                rate:this.$route.query.rate,
                fee:0,
                minWith:'500',          //最小提现金额
                //默认选中第一个
                cur: 0,
                pay_way:1,
                addrRes:{},          //地址列表
                type:1,
                token:this.$store.getters.optuser.Authorization,
                yhkName:'',
                yhkType:'',
                yhkNumber:'',
                yhkPhone:'',  
                // 密码
                payPassword:'',     //支付密码
                showPwd:false,
                showKeyboard: true,
                paswPopup:false,
			}
        },
        created(){
            this.$store.commit('showLoading')
            this.getUserAlipayInfo()
        },
        computed:{
            computeMoney() {
                var fee = this.money * this.moneyInfo.money_rate
                this.fee =fee.toFixed(2)
                var tMoney= new Number(this.money - fee)
                return tMoney.toFixed(2)
            },
            // computeNum() {
            //     var fee = this.money * this.moneyInfo.jiu_rate
            //     this.fee =fee.toFixed(2)
            //     var tMoney= new Number(this.money - fee)
            //     return tMoney.toFixed(2)
            // }
        },
        methods:{

            showPasswordBox(){
                if(this.moneyInfo.is_withdrawal==1){     //提现标识：true 时 不可提现
                    return this.$toast("每日仅限提现一次")
                }
                if(this.moneyInfo.pwd_type==0){
                    this.$toast('请设置支付密码!')
                    setTimeout(()=>{
                        this.$router.push({name:'SetPassword'})
                    },1000)
                    return false;
                }
                var that =this,
                    name=that.name,
                    account=that.account,
                    money=new Number(that.money),
                    yhkNumber= that.yhkNumber,
                    yhkPhone= that.yhkPhone,
                    reg=/^1[3456789]\d{9}$/
                if( money<500 || money>50000){
                    // return that.$toast('请输入500~50000之间的提现金额')
                }
                if(this.type==2){
                    if(!that.addrRes){
                        return that.$toast('请选择收货地址!')
                    }
                    if(that.money==""){
                        return that.$toast('请填写提取数量!')
                    }
                    this.showPwd = true;
                    this.showKeyboard = true;
                    this.paswPopup =true
                    return false;
                }
                if(that.money==""){
                    return that.$toast('请填写提取金额!')
                }
                if(that.pay_way==4){
                    if(that.yhkName==""){
                        return that.$toast('请填写银行账户名')
                    }
                    if(that.yhkType==""){
                        return that.$toast('请填写银行开户行')
                    }
                    if(yhkNumber="" || isNaN(yhkNumber)){
                        return that.$toast('请正确填写银行卡号')
                    }
                    // if(yhkPhone=="" || typeof(yhkPhone) =="undefined"){
                    //     return that.$toast('请正确填写手机号')
                    // }

                    // if(!reg.test(yhkPhone.replace(/\s+/g, ""))){
                    //     return that.$toast('请正确填写手机号')
                    // }
                    that.$axios.post('user/bound_bank',{         // 传给后台的参数
                        'token':that.token,
                        'bankname':that.yhkName,
                        'bankcard':that.yhkNumber
                    })
                    .then((res)=>{
                        var list =res.data
                        if(list.status==200){
                            
                        }
                        else if(res.data.status == 999){
                            that.$store.commit('del_token'); //清除token
                            setTimeout(()=>{
                                this.$router.push('/Home')
                            },1000)
                        }else{
                            // that.$toast(res.data.msg)
                        }
                    })

                }else{
                    if(name=="" || typeof(name) =="undefined"){
                        return that.$toast('姓名不能为空')
                    }
                    if(account=="" || typeof(account) =="undefined"){
                        return that.$toast('请正确填写账号')
                    }
                    var that =this,
                    url ='user/zfb_edit'
                    that.$axios.post(url,{         // 传给后台的参数
                        'token':that.token,
                        'alipay_name':name,
                        'alipay':account,
                    })
                    .then((res)=>{
                        var list =res.data
                        if(list.status==200){
                            
                        }
                        else if(res.data.status == 999){
                            that.$store.commit('del_token'); //清除token
                            setTimeout(()=>{
                                this.$router.push('/Home')
                            },1000)
                        }else{
                            // that.$toast(res.data.msg)
                        }
                    })
                }
                this.showPwd = true;
                this.showKeyboard = true;
                this.paswPopup =true
            },


            // 密码开始
            onInput(key) {  //密码框
                this.payPassword = (this.payPassword + key).slice(0, 6);
                if(this.payPassword.length === 6){ 
                    var that =this,
                        url ='user/withdrawal',
                        name=that.name,
                        account=that.account,
                        money=new Number(that.money),
                        yhkNumber= that.yhkNumber,
                        yhkPhone= that.yhkPhone,
                        reg=/^1[3456789]\d{9}$/
                    if( money<500 || money>50000){
                        // return that.$toast('请输入500~50000之间的提现金额')
                    }
                    if(that.pay_way==4){
                        var json ={
                            'token':that.token,
                            'money':money,
                            'withdraw_type':that.pay_way,
                            'name':that.yhkName,
                            'bankname':that.yhkType,
                            'bankcard':that.yhkNumber,
                            // 'bank_number':that.yhkPhone.replace(/\s+/g, ""),
                            'pwd':this.payPassword,
                            'type':that.type
                        }

                    }else{
                        var json ={
                            'token':that.token,
                            'money':money,
                            'withdraw_type':that.pay_way,
                            'alipay':account,
                            'alipay_name':name,
                            'pwd':this.payPassword,
                            'type':that.type
                        }
                    }
                    
                    if(that.type==2){
                        var json ={
                            'token':that.token,
                            'wine_weight':money,
                            'type':that.type,
                            'pwd':this.payPassword,
                            'address_id':that.addrRes.address_id
                        }
                    }
                    console.log(json)
                    if(that.isClick){return}
                    that.isClick=true
                    that.$axios.post(url,json)
                    .then((res)=>{
                        var list =res.data
                        if(list.status==200){
                            that.$toast('您的提现申请平台已受理，请注意查收哦~');
                            setTimeout(()=>{
                                that.$router.go(-1)
                            },1000)
                        }
                        else if(res.data.status == 999){
                            that.$store.commit('del_token'); //清除token
                        }else{
                            that.$toast(res.data.msg)
                        }
                        that.isClick=false
                    })
                    .catch((error) => {
                        that.$toast('请求错误')
                        that.isClick=false
                    })


                    // 关闭密码输入
                    this.showKeyboard = false
                    this.showPwd = false
                    this.paswPopup =false
                    this.payPassword = ''
                }
            },
            onDelete() {
                this.payPassword = this.payPassword.slice(0, this.payPassword.length - 1);
            },
            /**
             * 关闭密码蒙层，清空密码
             */
            hidePwd(){
                this.showPwd=false;
                this.payPassword = '';
            },
            // 密码结束

            verInput(){
                if(this.moneyInfo.is_withdrawal==1){     //提现标识：true 时 不可提现
                    return this.$toast("每日仅限提现一次")
                }
            },
            selectPayWay(id){
                this.pay_way =id
                this.getUserPayInfo(id)
            },
            getUserPayInfo(pay_way){
                var that =this
                if(pay_way==2){
                    that.name=that.moneyInfo.wx_name
                    that.account=that.moneyInfo.wx_account
                }
                if(pay_way==1){
                    that.name=that.moneyInfo.alipay_name
                    that.account=that.moneyInfo.alipay
                }
                if(pay_way==4){
                    that.yhkName=that.moneyInfo.bank_username,
                    that.yhkType=that.moneyInfo.bank_name,
                    that.yhkNumber=that.moneyInfo.bank_card,
                    that.yhkPhone=that.moneyInfo.bank_number
                }
            },
            // saveWithdrawal(){
            //     if(this.moneyInfo.is_withdrawal==1){         //提现标识：1 时 不可提现
            //         return this.$toast("每日仅限提现一次")
            //     }
            //     var that =this,
            //         url ='user/withdrawal',
            //         name=that.name,
            //         account=that.account,
            //         money=new Number(that.money),
            //         yhkNumber= that.yhkNumber,
            //         yhkPhone= that.yhkPhone,
            //         reg=/^1[3456789]\d{9}$/
            //     if( money<500 || money>50000){
            //         return that.$toast('请输入500~50000之间的提现金额')
            //     }
            //     if(that.pay_way==3){
            //         if(that.yhkName==""){
            //             return that.$toast('请填写银行账户名')
            //         }
            //         if(that.yhkType==""){
            //             return that.$toast('请填写银行开户行')
            //         }
            //         if(yhkNumber="" || isNaN(yhkNumber)){
            //             return that.$toast('请正确填写银行卡号')
            //         }

            //         console.log(yhkPhone)
            //         if(yhkPhone=="" || typeof(yhkPhone) =="undefined"){
            //             return that.$toast('请正确填写手机号')
            //         }

            //         if(!reg.test(yhkPhone.replace(/\s+/g, ""))){
            //             return that.$toast('请正确填写手机号')
            //         }

            //         var json ={
            //             'token':that.token,
            //             'money':money,
            //             'withdraw_type':that.pay_way,
            //             'name':that.yhkName,
            //             'bank_name':that.yhkType,
            //             'account':that.yhkNumber,
            //             'bank_number':that.yhkPhone.replace(/\s+/g, "")
            //         }

            //     }else{
            //         if(name=="" || typeof(name) =="undefined"){
            //             return that.$toast('姓名不能为空')
            //         }
            //         if(account=="" || typeof(account) =="undefined"){
            //             return that.$toast('请正确填写账号')
            //         }
            //         var json ={
            //             'token':that.token,
            //             'money':money,
            //             'withdraw_type':that.pay_way,
            //             'account':account,
            //             'name':name,
            //         }
            //     }
            //     if(that.isClick){return}
            //     that.isClick=true
			// 	that.$axios.post(url,json)
			// 	.then((res)=>{
            //         var list =res.data
            //         if(list.status==200){
            //             that.$toast('您的提现申请平台已受理，请注意查收哦~');
            //             setTimeout(()=>{
            //                 that.$router.go(-1)
            //             },1000)
            //         }
            //         else if(res.data.status == 999){
            //             that.$store.commit('del_token'); //清除token
            //         }else{
            //             that.$toast(res.data.msg)
            //         }
            //         that.isClick=false
            //     })
            //     .catch((error) => {
            //         that.$toast('请求错误')
            //         that.isClick=false
            //     })
            // },
            getUserAlipayInfo(){
                var that =this,
                    url ='user/withdrawal_info'
				that.$axios.post(url,{         // 传给后台的参数
					'token':that.token
				})
				.then((res)=>{
                    var list =res.data
                    if(list.status==200){
                        that.moneyInfo =list.data;
                        that.addrRes = list.data.user_address;
                        this.getUserPayInfo(this.pay_way)   //初始化支付账号
                        that.$store.commit('hideLoading')
                    }
                    else if(res.data.status == 999){
                        that.$store.commit('del_token'); //清除token
                        setTimeout(()=>{
                            this.$router.push('/Home')
                        },1000)
                    }else{
                        that.$toast(res.data.msg)
                    }
                })
            },

            // 全部提现
            all(){
                this.money = this.remainderMoney;
            },
        },
        destroyed: function () {
            clearInterval(timertep); 		//时间结束就停止定时器
        }
	}
</script>

<style lang="stylus" scoped>
.accWit_wrap
    width 100vw
    height 100vh
    background: #fef6d7
    .content
        background: #fef6d7
        padding-bottom 30px
        .hd_wrap
            margin 21px 24px 10px
        .back
            width 100%
            height 360px
            background url('/static/images/myWallet/money_card.png') no-repeat
            background-size 100% 100%
            display flex
            align-items center
            // justify-content center
            .k_box
                text-align center
                width 100%
                color #fff
                font-family PangMenZhengDao
                letter-spacing 4px
                .sum
                    font-size 36px
                .can
                    margin-bottom 30px
                    font-size 40px
        .way_title
            float left
            width 198px
            height 50px
            transform scale(1,1.2)
            text-align center
            border-radius: 30px
            font-family PangMenZhengDao
            font-size 30px
            font-weight normal
            font-stretch normal
            line-height 50px
            letter-spacing 5px
            color #ffffff
            margin-left 60px
            background: #ccc;
        .active
            background-image: linear-gradient(90deg, #f8a529 0%, #fd4c00 100%);
        .way_wrap
            margin-top 40px
            overflow hidden
            h4
                margin 20px 0 20px
                color #151515
                font-size 28px
                line-height 65px
            .mode
                // display flex
            .mode img
                margin 0 auto
                display block
                max-width 100%
            .mode .wechat
                width 60px
                height 60px
            .wechat_wrap
                display flex
                .weixi
                    margin 0 0 36px  
                .radio
                    width 100%
                .radio /deep/ .van-cell-group
                    background transparent     
                .radio /deep/ .van-cell 
                    padding 0 0 0 12px
                    background transparent 
                    line-height 56px
                .radio /deep/ .van-cell:nth-child(2)
                    padding 20px 20px 20px 
                .radio /deep/ .van-radio__icon .van-icon 
                    width 40px
                    height 40px
                    border-radius 8px
                    border 1.1px solid #3b2709
                .radio /deep/ .van-radio__icon--checked .van-icon
                    width 40px
                    height 40px
                    border-radius 8px
                    background-color #f8a228
                    border-color #e155c6
                    // background-color #d6a14c
                    // border-color #d6a14c              
            .sum_wrap
                .sum_wrap
                .put
                    padding 22px 0
                    border-bottom 1.1px solid #b9b9b9
                .dollars
                    font-size 30px
                    line-height 50px
                    font-weight 600    
                .put .inp,.all_btn
                    display inline-block
                    vertical-align top
                    font-size 30px
                    color #151515
                .inp input
                    width 650px
                    height 45px
                    font-size 30px
                    color #151515
                    .inp input::-webkit-input-placeholder
                        font-size 26px
                        color #717171
                .all_btn
                    float right
                    line-height 45px
                .fee_wrap
                    padding 22px 0
                    line-height 45px
                    border-bottom 1.1px solid #e6e6e6
                .fee_wrap .fee,.unit
                    display inline-block
                    vertical-align top
                    font-size 26px
                    color #151515
                .unit
                    float right
                .icon
                    margin 16px 0 0 
                    width 25px
                    height 25px
                    background url('/static/images/user/address/address-edit-icon.png') no-repeat
                    background-size 100% 100%
                .pay_wrap
                    .pay 
                        .inp 
                            padding 0 0 20px 
                            border-bottom 1.5px solid #b9b9b9    
        .edit_address
            margin 50px auto
            .user-info
                display:flex
                align-items :center
                margin-top 20px
                height 150px
                border 1px solid #ccc
                border-radius 20px
                background #fff
                padding 24px
                box-sizing border-box
                .icon-ditu
                    font-size:40px
                    color: #43c439
                    margin-right:55px
                .-info-list
                    margin-right:20px
                    .-list-a
                        color:#151515
                        font-size:28px
                        margin-bottom:25px
                    .-list-b
                        font-size 24px
                        color:#555555
                .-list-edit
                    margin-left :auto
                    .iconfont
                        font-size 30px
                        color #7f7f7f
            .put
                margin 20px auto 100px
                padding 22px 0
                border-bottom 1.1px solid #b9b9b9
            .dollars
                font-size 30px
                line-height 50px
                font-weight 600    
            .put .inp,.all_btn
                display inline-block
                vertical-align top
                font-size 30px
                color #151515
            .inp input
                width 650px
                height 45px
                font-size 30px
                color #151515
                .inp input::-webkit-input-placeholder
                    font-size 26px
                    color #717171
        .hint
            margin-top 15px
            // font-size 30px
            font-size 26px
            color #717171
        .hint-ss
            font-weight 600
            color #151515
        .hint-list 
            margin-bottom 15px
            .hint-msg
                // text-indent 26px
                padding 0 26px
        .apply_btn
            margin 40px auto 0
            width 702px
            height 88px
            border-radius 44px
            font-size 36px
            color #fff
            text-align center
            line-height 88px
            letter-spacing 4px
    .pasw-popup
        position fixed
        width 100%
        height 100%
        bottom 0
        left 0
        z-index 9999
        .popup-inner
            width 100%
            height 100%
            background rgba(0,0,0,0.5)
        .-popup-cont
            position absolute
            bottom 0
            z-index 1
            left 0
            width 100%
            background #fff
            padding-top 40px
            .fg-password
                text-align right
                margin: 30px
                a
                    color: #1a89fa
            .van-password-input__security 
                height: 100px
            .van-password-input__security li
                border 1px solid #bdbdbd
                border-left 0
            .van-password-input__security li:first-child
                    border-left 1px solid #bdbdbd
            .van-password-input__security li:first-child
                // border-left 1px solid #999
            .van-number-keyboard
                position relative

</style>