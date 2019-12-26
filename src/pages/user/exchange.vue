<template>
    <div class="exchange">
        <!-- 头部组件 -->
		<Team-Header custom-title="兑换">
			<!-- 返回按钮 -->
			<i slot="backBtn" class="iconfont icon-fanhui"></i>
		</Team-Header>
        <div class="exchange_info">
            <div v-if="type==1">剩余酒量</div>
            <div v-else>剩余金额</div>
            <p v-if="type==1">{{teamList.distribut_money}} 斤</p>
            <p v-else>￥ {{teamList.remainder_money}}</p>
        </div>
        <div class="exchange_btns">
            <div class="exchange_btn" :class="type==1?'active':''" @click="type=1;money=''">
                兑钱
            </div>
            <div class="exchange_btn" :class="type==2?'active':''" @click="type=2;money=''">
                兑酒
            </div>
        </div>
        <label>
            <span>￥</span><input type="number" :placeholder="type==2?'请输入兑换酒数':'请输入兑换金额'" @input="oninput" v-model="money">
        </label>
        <p class="tips" v-if="type==1&&money!=''">兑换金额为￥{{money | distribut(teamList.rate)}}</p>
        <p class="tips" v-if="type==2&&money!=''">兑换酒为{{money | remainder(teamList.rate)}}斤</p>
        <div class="exchange_send" @click="send">
            点击兑换
        </div>
        <div class="pwd_mask" v-if="show1">
            <van-password-input
                :value="pwd"
                info="请输入支付密码"
                :focused="show1"
                @focus="show1 = true"
            />
        </div>
        <van-number-keyboard
            :show="show1"
            extra-key="."
            close-button-text="完成"
            @blur="show1 = false"
            @input="onInput1"
            @delete="onDelete1"
        />
    </div>
</template>

<script>
    import TeamHeader from "@/pages/common/header/TopHeader"
    export default {
        name:'exchange',
        components: {
            TeamHeader
        },
        data(){
            return {
                teamList:'',
                type:1,
                money:'',
                show1: false,
                pwd:''
            }
        },
        created(){
            this.$store.commit('showLoading')
            this.getTeamInfo();
        },
        methods:{
            getTeamInfo(){
                let _that=this,
                    url = 'user/user_info';
                _that.$axios.post(url,{
                    token:this.$store.getters.optuser.Authorization
                }).then((res)=>{
                    var list =res.data
                    if(list.status===200){
                        _that.teamList =list.data;
                        this.$store.commit('hideLoading')
                    }else{
                        _that.$toast(list.msg)
                    }
                })
            },
            onInput1(value){
                this.pwd = (this.pwd + value);
                if(this.pwd.length === 6){ 
                    this.request();
                    // 关闭密码输入
                    this.show1 = false;
                }
            },
            onDelete1(){
                this.pwd = this.pwd.slice(0, this.pwd.length - 1);
            },
            oninput(e) {
                // 通过正则过滤小数点后两位
                e.target.value = (e.target.value.match(/^\d*(\.?\d{0,2})/g)[0]) || null;
                this.money = e.target.value;
            },
            send(){
                if(this.teamList.pwd_type == 1) return this.$router.push('/user/SetPassword')
                if(this.money=='')return this.$toast('请输入兑换数量!');
                let num = this.type==1?this.teamList.distribut_money:this.teamList.remainder_money;
                console.log(this.money,num,this.teamList)
                if(Number(this.money)>Number(num))return this.$toast('兑换数量大于可兑换上限!');
                this.show1 = true;
            },
            request(){
                let _that=this,
                    url = 'user/exchange';
                _that.$axios.post(url,{
                    token:_that.$store.getters.optuser.Authorization,
                    money:_that.money,
                    type:_that.type,
                    pwd:_that.pwd
                }).then((res)=>{
                    var list =res.data
                    if(list.status===200){
                        _that.pwd = '';
                        _that.money = '';
                        _that.$toast('兑换成功!')
                        _that.getTeamInfo();
                    }else{
                        _that.$toast(list.msg)
                        _that.pwd = '';
                    }
                })
            }
        },
        filters:{
            distribut(val,rate){
                let num = val*rate;
                return Number(num).toFixed(2);
            },
            remainder(val,rate){
                let num = val/rate;
                return Number(num).toFixed(2);
            }
        }
    }
</script>

<style lang="stylus" scoped>
.exchange
    width 100vw
    height 100vh
    background #fef6d7
    .exchange_info
        margin 52px auto
        width 670px
        height 266px
        padding-top 75px
        box-sizing border-box
        text-align center
        color #fff
        background-image url('/static/images/user/exchange_info.png')
        background-size contain
        div
            margin-bottom 40px
            font-size 28px
    .exchange_btns
        display flex
        justify-content space-around
        .exchange_btn
            width 208px
            height 65px
            line-height 65px
            text-align center
            color #fff
            border-radius 50px
            background #b1b1b1
        .active
            background linear-gradient(90deg, #f8a529, #fd4c00)
    label
        display block
        margin 50px 43px 10px
        line-height 50px
        border-bottom 2px solid #ebe5ce
        input 
            margin-left 10px
            width 80%
    .tips
        margin 0 43px
        color #e63100
    .pwd_mask
        position fixed
        top 0
        left 0
        width 100%
        height 100%
        padding-top 40vh
        background rgba(0,0,0,0.8)
    .exchange_send
        margin 50px auto
        width 670px
        height 82px
        line-height 82px
        text-align center
        color #fff
        border-radius 20px
        background linear-gradient(90deg, #f8a529, #fd4c00)
</style>