<template>
   <div class="FreeZone">
    <div class="pack">
        <div class="head">
            <van-icon name="arrow-left" @click="backAction" color="#fff" size="16" />
            <div></div>
        </div>
        <div class="cont">
            <van-list
                v-model="loading"
                :finished="finished"
                finished-text="没有更多了"
                @load="onLoad"
                :immediate-check="false"
                :offset="600"
            >
                <ul>
                    <li v-for="(item,index) in freeList" :key="index" @click="linkToDetail(item.goods_id)">
                        <img v-lazy="item.img" alt="">
                        <div class="shop-info">
                            <div class="tit-price">
                                <div class="free-btn">免费领取</div>
                                <del>￥{{item.original_price}}</del>
                            </div>
                            <div class="name publicEllipsis">{{item.goods_name}}</div>
                        </div>
                    </li>
                </ul>
            </van-list>
        </div>
    </div>
   </div>
</template>
<script>
import headerSearch from '@/pages/common/header/headerSearch'
export default {
    name:'FreeZone',
    data(){
        return{
            loading:false,
            finished:false,
            page:1,
            freeList:[],
            token:this.$store.getters.optuser.Authorization,
        }
    },
    components:{
        headerSearch
    },
    created(){
        this.$store.commit('showLoading')//加载loading
        this.reqData();
    },
    mounted(){
        this.$nextTick(function(){
            if(sessionStorage.getItem('freeZone')){
                document.documentElement.scrollTop = sessionStorage.getItem('freeZone');
                sessionStorage.removeItem('freeZone')
            }
        })
    },
    methods:{
        onLoad(){
            console.log("1")
            setTimeout
            (()=>{
                this.reqData();
            },500)
        },
        linkToDetail(goods_id){
            sessionStorage.setItem('freeZone',document.documentElement.scrollTop)
            this.$router.push('/Details?goods_id='+goods_id)
        },
        backAction(){
            this.$router.go(-1)
        },
        reqData(sTop){
            var that =this
            let url = 'Goods/goods_free';
            this.$axios.post(url,{
                token:this.$store.getters.optuser.Authorization,
                page:this.page
            })
            .then((res) => {
                if(res.data.status === 200){
                    let list = res.data.data.list;
                    list.forEach(item => {
                        that.freeList.push(item)
                    });
                    this.loading = false;
                    if(this.page >= res.data.data.lastPage){
                        this.finished = true;
                    }else{
                        this.page ++;
                    }
                }
                else if(res.data.status == 999){
                    that.$store.commit('hideLoading');
					that.$store.commit('del_token'); //清除token
					setTimeout(()=>{
						that.$router.push('/Login')
					},1000)
				}
				else{
					that.$toast(res.data.msg)
                }
                that.$store.commit('hideLoading');
            })
        },
    }
}
</script>

<style lang="stylus" scoped>
.FreeZone
    width 100%
    background #8B54F8
    .pack
        background url(/static/images/bg/everday.png) no-repeat
        background-size 100%
        padding 0 10px
        .head
            display flex
            align-items center
            height 70px
            justify-content space-between
        .cont
            padding 490px 34px 80px 34px
            ul
                width 100%
                display flex
                flex-wrap wrap
                li  
                    width 47%
                    background #fff
                    padding 40px 0
                    margin-right 6%
                    overflow hidden
                    border-radius 24px
                    margin-bottom 38px
                    &:nth-child(even)
                        margin-right 0
                    img
                        display block
                        width 200px
                        height 200px
                        margin 0 auto
                    .shop-info
                        padding 10px 44px 0
                        .tit-price
                            display flex
                            align-items center
                            justify-content space-between
                            .free-btn
                                color #fff
                                width:87px;
                                font-size 18px
                                text-align center
                                line-height:31px;
                                background:linear-gradient(90deg,rgba(219,75,198,1) 0%,rgba(241,112,179,1) 100%);
                                border-radius:14px;
                            del
                                color #808080
                        .name
                            line-height 40px
                            color #010101
                            font-weight bold
</style>