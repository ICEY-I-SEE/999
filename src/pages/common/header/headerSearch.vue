<template>
    <div>
        <van-sticky class="sticky"  :z-index="999">
            <div class="f-title-wrap">
                <van-icon size="24" name="arrow-left" color="#000" class='goBackClass' @click="backAction" />
                <form action="/" >
                    <van-search
                        shape='round'
                        background='linear-gradient(90deg,#f9ebad,#efd984)'
                        v-model="value"
                        placeholder="请输入搜索关键词"
                        @click="sstd"
                    >
                    </van-search>
                </form>
                <img class="logo" slot="action" src="/static/images/public/logo.png" alt="">
                <!-- <i slot="backBtn" class="iconfont icon-fanhui" style="color:white;" @click="backAction()"></i>
                <input type="text" class="banner-ss"  v-model="po" @click="sstd()"> -->
            </div> 
        </van-sticky>
    </div>
</template>

<script>
export default {
    name:'headerSearch',
    props:{
        
    },
    data(){
        return{
            value:''
        }
    },
    methods:{
        // 后退按钮
        backAction(){
            this.$router.go(-1)
        },
        sstd(){
			  this.$router.push({path:'/Search'})
		},
    }

}
</script>

<style lang="stylus">
>>> .TopHeader{
    border: 0;
    width 100%
    height 200px;
    background: red;
}
</style>
<style scoped>
.f-title-wrap{
    padding:0 24px;
    display: flex;
    background: linear-gradient(90deg,#f9ebad,#efd984);
    align-items: center;
    justify-content: space-between
}
form{
    width:82%;
}
.van-search__action{
    display: flex;
    align-items: center;
}
.goBackClass{
    color: white;
}
.logo{
    width: 46px;
    display: block; 
}
.sticky{
    position: fixed;
    width: 100%;
    top: 0;
    z-index: 999;
}
</style>