import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const router = new Router({
    linkActiveClass:"router-link",
    mode: 'history',
    routes: [
        /**
         * 登录
         */
        // {
        //     path: '/Login',
        //     name: 'Login',
        //     component: () =>
        //         import ('@/pages/login/Login'),
        // },
        // 注册
        // {
        //     path: '/Register',
        //     name: 'Register',
        //     component: () =>
        //         import ('@/pages/login/Register'),
        // },
        // 修改密码
        // {
        //     path: '/EditPassword',
        //     name: 'EditPassword',
        //     component: () =>
        //         import ('@/pages/login/EditPassword'),
        // },
        

        /**
         * 首页
         */
        {
            path: '/Home',
            name: 'Home',
            // component:() => import('@/pages/home/Home'),//按需加载
            component: (resolve) => require(['@/pages/home/Home'], resolve),
            meta: {
                requireAuth: true,
                keepAlive: true // 需要被缓存
            }
        },
        /**
         * 首页
         */
        {
            path: '/VipNav',
            name: 'VipNav',
            // component:() => import('@/pages/home/Home'),//按需加载
            component: (resolve) => require(['@/pages/home/VipNav'], resolve),
            meta: { requireAuth: true }
        },

        /**
         * 公告
         */
        // 公告列表
        {
            path: '/notice/NoticeList',
            name: 'NoticeList',
            component: () =>
                import ('@/pages/notice/NoticeList'),
            meta: { requireAuth: true }
        },
        // 公告详情
        {
            path: '/notice/NoticeDetails',
            name: 'NoticeDetails',
            component: () =>
                import ('@/pages/notice/NoticeDetails'),
            meta: { requireAuth: true }
        },
        // 资讯详情
        {
            path: '/notice/NewsDetails',
            name: 'NewsDetails',
            component: () =>
                import ('@/pages/notice/NewsDetails'),
            meta: { requireAuth: true }
        },

        // 会员免费领取专区
        {
            path: '/FreeZone',
            name: 'FreeZone',
            component: () =>
                import ('@/pages/freezone/FreeZone'),
            meta: {
                requireAuth: true,
                keepAlive: true // 需要被缓存
            }
        },

        // 韩国直邮专区
        {
            path: '/GoodsFree',
            name: 'GoodsFree',
            component: () =>
                import ('@/pages/freezone/GoodsFree'),
            meta: {
                requireAuth: true,
                keepAlive: true // 需要被缓存
            }
        },

        // 国货精品
        {
            path: '/ShippingGoods',
            name: 'ShippingGoods',
            component: () =>
                import ('@/pages/freezone/ShippingGoods'),
            meta: {
                requireAuth: true,
                keepAlive: true // 需要被缓存
            }
        },
        // 欧美专区
        {
            path: '/OMei',
            name: 'OMei',
            component: () =>
                import ('@/pages/freezone/OMei'),
            meta: { requireAuth: true }
        },
        // 日本专区
        {
            path: '/Japan',
            name: 'Japan',
            component: () =>
                import ('@/pages/freezone/Japan'),
            meta: { requireAuth: true }
        },
        // 泰国专区
        {
            path: '/TaiGuo',
            name: 'TaiGuo',
            component: () =>
                import ('@/pages/freezone/TaiGuo'),
            meta: { requireAuth: true }
        },
        // 奢侈品专区
        {
            path: '/ExpensiveGoos',
            name: 'ExpensiveGoos',
            component: () =>
                import ('@/pages/freezone/ExpensiveGoos'),
            meta: { requireAuth: true }
        },

        /**
         * 搜索
         */
        {
            path: '/Search',
            name: 'Search',
            component: () =>
                import ('@/pages/search/Search'),
            meta: { requireAuth: true }
        },

        /**
         * 分类
         */
        {
            path: '/Category',
            name: 'Category',
            component: () =>
                import ('@/pages/category/Category'),
            meta: { requireAuth: true } //是否需要登录
        },
        {
            path: '/CategoryList',
            name: 'CategoryList',
            component: () =>
                import ('@/pages/category/CategoryList'),
            meta: { 
                requireAuth: true,
                keepAlive:true
            } //是否需要登录
        },


        /**
         * 购物车
         */
        {
            path: '/Cart',
            name: 'Cart',
            component: (resolve) => require(['@/pages/cart/Cart'], resolve),
            meta: { requireAuth: true }
        },
        // 会员卡
        {
            path: '/membershipCard',
            name: 'membershipCard',
            component: (resolve) => require(['@/pages/membershipCard/membershipCard'], resolve),
            meta: { requireAuth: true }
        },
        // 会员卡3
        {
            path: '/membershipCardSlider',
            name: 'membershipCardSlider',
            component: (resolve) => require(['@/pages/membershipCard/membershipCardSlider'], resolve),
            meta: { requireAuth: true }
        },
        // 买卡
        {
            path: '/BuyCard',
            name: 'BuyCard',
            component: (resolve) => require(['@/pages/membershipCard/BuyCard'], resolve),
            meta: { requireAuth: true }
        },
        // 我的会员卡
        {
            path: '/SalesCard',
            name: 'SalesCard',
            component: (resolve) => require(['@/pages/membershipCard/SalesCard'], resolve),
            meta: { requireAuth: true }
        },
        // 会员卡明细
        {
            path: '/SalesDetails',
            name: 'SalesDetails',
            component: (resolve) => require(['@/pages/membershipCard/SalesDetails'], resolve),
            meta: { requireAuth: true }
        },
        // 补卡
        {
            path: '/ReissueCard',
            name: 'ReissueCard',
            component: (resolve) => require(['@/pages/membershipCard/ReissueCard'], resolve),
            meta: { requireAuth: true }
        },
        // 新补卡
        {
            path: '/NewReissueCard',
            name: 'NewReissueCard',
            component: (resolve) => require(['@/pages/membershipCard/NewReissueCard'], resolve),
            meta: { requireAuth: true }
        },
        // 普通用户补卡
        {
            path: '/PtBuyCard',
            name: 'PtBuyCard',
            component: (resolve) => require(['@/pages/membershipCard/PtBuyCard'], resolve),
            meta: { requireAuth: true }
        },

        // 联系上级补卡
        {
            path: '/sjReissueCard',
            name: 'sjReissueCard',
            component: (resolve) => require(['@/pages/membershipCard/sjReissueCard'], resolve),
            meta: { requireAuth: true }
        },
        // 补卡记录
        {
            path: '/MoreReissueCard',
            name: 'MoreReissueCard',
            component: (resolve) => require(['@/pages/membershipCard/MoreReissueCard'], resolve),
            meta: { requireAuth: true }
        },

        /**
         * 商品详情页 
         */
        {
            path: '/Details',
            name: 'Details',
            component: () =>
                import ('@/pages/details/Details'),
            meta: { requireAuth: false }
        },

        /**
         * 
         * 订单中心
         */
        // 订单列表
        {
            path: '/Order',
            name: 'Order',
            component: () =>
                import ('@/pages/order/Order'),
            meta: { requireAuth: true }
        },
        // 订单详情
        {
            path: '/Order/OrderDetails',
            name: 'OrderDetails',
            component: () =>
                import ('@/pages/order/OrderDetails'),
            meta: { requireAuth: true }
        },
        // 物流
        {
            path: '/Order/LogisticsDetail',
            name: 'LogisticsDetail',
            component: () =>
                import ('@/pages/order/LogisticsDetail'),
            meta: { requireAuth: true }
        },
        // 提交评价
        {
            path: '/Order/Evaluate',
            name: 'Evaluate',
            component: (resolve) => require(['@/pages/order/Evaluate'], resolve),
            meta: { requireAuth: true }
        },
        // 退货
        {
            path: '/Order/ReturnGoods',
            name: 'ReturnGoods',
            component: (resolve) => require(['@/pages/order/ReturnGoods'], resolve),
            meta: { requireAuth: true }
        },
        // 退款申请
        {
            path: '/Order/ReturnRequest',
            name: 'ReturnRequest',
            component: (resolve) => require(['@/pages/order/ReturnRequest'], resolve),
            meta: { requireAuth: true }
        },

        /**
         * 支付模块
         */
        // 确认订单
        {
            path: '/Pay/ConfirmOrder',
            name: 'ConfirmOrder',
            component: (resolve) => require(['@/pages/pay/ConfirmOrder'], resolve),
        },
        //海外代购详情
        {
            path: '/Pay/IdCardExplain',
            name: 'IdCardExplain',
            component: (resolve) => require(['@/pages/pay/IdCardExplain'], resolve),
        },
        // 支付方式
        {
            path: '/Pay/PayWay',
            name: 'PayWay',
            component: (resolve) => require(['@/pages/pay/PayWay'], resolve),
            meta: { requireAuth: true }
        },
        // 支付协议
        {
            path: '/Pay/PayText',
            name: 'PayText',
            component: (resolve) => require(['@/pages/pay/PayText'], resolve),
            meta: { requireAuth: true }
        },
        // 支付成功
        {
            path: '/Pay/PaySucceed',
            name: 'PaySucceed',
            component: (resolve) => require(['@/pages/pay/PaySucceed'], resolve),
            meta: { requireAuth: true }
        },
        // 支付失败
        {
            path: '/Pay/PayFail',
            name: 'PayFail',
            component: (resolve) => require(['@/pages/pay/PayFail'], resolve),
            meta: { requireAuth: true }
        },

        // 幸运大转盘
        {
            path: '/luckywheel',
            name: 'luckywheel',
            component: (resolve) => require(['@/pages/luckywheel/luckywheel'], resolve),
            meta: { requireAuth: true }
        },
        // 幸运大转盘DEMO
        {
            path: '/luckyDemo',
            name: 'luckyDemo',
            component: (resolve) => require(['@/pages/luckywheel/luckyDemo'], resolve),
            meta: { requireAuth: true }
        },
        // 获奖列表
        {
            path: '/luckyList',
            name: 'luckyList',
            component: (resolve) => require(['@/pages/luckywheel/luckyList'], resolve),
            meta: { requireAuth: true }
        },

        /**
         * 我的
         */
        {
            path: '/User',
            name: 'User',
            // component:() => import('@/pages/user/User'),
            component: (resolve) => require(['@/pages/user/User'], resolve),
            meta: { requireAuth: true }
        },
        /**
         * 用户信息
         */
        {
            path: '/UserInfo',
            name: 'UserInfo',
            // component:() => import('@/pages/user/User'),
            component: (resolve) => require(['@/pages/user/UserInfo'], resolve),
            meta: { requireAuth: true }
        },

        // 个人资料
        {
            path: '/user/personalData',
            name: 'personalData',
            // component:() => import('@/pages/user/personalData'),
            component: (resolve) => require(['@/pages/user/personalData'], resolve),
            meta: { requireAuth: true }
        },
        // 修改用户名
        {
            path: '/user/modifyUserName',
            name: 'modifyUserName',
            component: () =>
                import ('@/pages/user/modifyUserName'),
            meta: { requireAuth: true }
        },
        // 修改手机号码
        {
            path: '/user/SetPhone',
            name: 'SetPhone',
            component: () =>
                import ('@/pages/user/SetPhone'),
        },
        // 修改支付密码
        {
            path: '/user/SetPassword',
            name: 'SetPassword',
            component: () =>
                import ('@/pages/user/SetPassword'),
        },
        // 设置密码
        {
            path: '/user/setUpPassword',
            name: 'setUpPassword',
            component: () =>
                import ('@/pages/user/setUpPassword'),
        },

        // 我的收益
        {
            path: '/user/MyBenefits',
            name: 'MyBenefits',
            component: (resolve) => require(['@/pages/user/mybenefits/MyBenefits'], resolve),
            meta: { requireAuth: true }
        },
        // 收益详情
        {
            path: '/user/ProfitDetails',
            name: 'ProfitDetails',
            component: (resolve) => require(['@/pages/user/mybenefits/ProfitDetails'], resolve),
            meta: { requireAuth: true }
        },
        // 收益明细
        {
            path: '/user/pDetails',
            name: 'pDetails',
            component: (resolve) => require(['@/pages/user/mybenefits/pDetails'], resolve),
            meta: { requireAuth: true }
        },

        // 我的钱包
        {
            path: '/user/myWallet',
            name: 'myWallet',
            component: () =>
                import ('@/pages/user/myWallet/myWallet'),
            meta: { requireAuth: true }
        },
        // 账单明细
        {
            path: '/user/myWallet/BillingDetails',
            name: 'BillingDetails',
            component: () =>
                import ('@/pages/user/myWallet/BillingDetails'),
            meta: { requireAuth: true }
        },
        // 提现
        {
            path: '/user/myWallet/accWithdrawal',
            name: 'accWithdrawal',
            component: () =>
                import ('@/pages/user/myWallet/accWithdrawal'),
            meta: { requireAuth: true }
        },
        // 余额充值
        {
            path: '/user/myWallet/Recharge',
            name: 'Recharge',
            component: () =>
                import ('@/pages/user/myWallet/Recharge'),
            meta: { requireAuth: true }
        },
        // 代金券
        {
            path: '/user/CashCoupon',
            name: 'CashCoupon',
            component: () =>
                import ('@/pages/user/myWallet/CashCoupon'),
            meta: { requireAuth: true }
        },
        // 预约
        {
            path: '/user/appointment',
            name: 'appointment',
            component: () =>
                import ('@/pages/user/appointment'),
            meta: { requireAuth: true }
        },
        // 预约列表
        {
            path: '/user/intment',
            name: 'intment',
            component: () =>
                import ('@/pages/user/intment'),
            meta: { requireAuth: true }
        },
        // 记录
        {
            path: '/user/Record',
            name: 'Record',
            component: () =>
                import ('@/pages/user/Record'),
            meta: { requireAuth: true }
        },
        // 我的团队
        {
            path: '/user/myTeam',
            name: 'myTeam',
            component: () =>
                import ('@/pages/user/myTeam'),
            meta: { requireAuth: true }
        },
        // 团队
        {
            path: '/user/Team',
            name: 'Team',
            component: () =>
                import ('@/pages/user/Team'),
            meta: { requireAuth: true }
        },
        // 团队
        {
            path: '/user/TeamList',
            name: 'TeamList',
            component: () =>
                import ('@/pages/user/TeamList'),
            meta: { requireAuth: true }
        },
        // 团队
        {
            path: '/user/TeamDetails',
            name: 'TeamDetails',
            component: () =>
                import ('@/pages/user/TeamDetails'),
            meta: { requireAuth: true }
        },
        // 兑换
        {
            path: '/user/exchange',
            name: 'exchange',
            component: () =>
                import ('@/pages/user/exchange'),
            meta: { requireAuth: true }
        },
        // 我的分享
        {
            path: '/user/mySharing',
            name: 'mySharing',
            component: () =>
                import ('@/pages/user/mySharing'),
            meta: { requireAuth: true }
        },

        // 支付宝账号编辑
        {
            path: '/user/alipay',
            name: 'alipay',
            component: () =>
                import ('@/pages/user/alipay'),
            meta: { requireAuth: true }
        },

        // 收藏
        {
            path: '/user/Collect',
            name: 'Collect',
            component: () =>
                import ('@/pages/user/Collect'),
            meta: { requireAuth: true }
        },
        /**
         * 地址管理
         */
        // 收货地址
        {
            path: '/user/Address',
            name: 'Address',
            component: () =>
                import ('@/pages/user/address/Address'),
            meta: { requireAuth: true }
        },
        // 添加收货地址
        {
            path: '/user/AddAddress',
            name: 'AddAddress',
            component: () =>
                import ('@/pages/user/address/AddAddress'),
            meta: { requireAuth: true }
        },
        // 修改收货地址
        {
            path: '/user/EditAddress',
            name: 'EditAddress',
            component: () =>
                import ('@/pages/user/address/EditAddress'),
            meta: { requireAuth: true }
        },
        // 地址选点
        {
            path: '/user/SelectPoint',
            name: 'SelectPoint',
            component: (resolve) => require(['@/pages/user/address/SelectPoint'], resolve),
            meta: { requireAuth: true }
        },
        // 售后
        {
            path: '/user/AfterSale',
            name: 'AfterSale',
            component: (resolve) => require(['@/pages/user/AfterSale'], resolve),
            meta: { requireAuth: true }
        },
        //注册协议
        {
            path: '/UserTreal',
            name: 'UserTreal',
            component: (resolve) => require(['@/pages/login/UserTreal'], resolve),
            meta: { requireAuth: true }
        },
        // 隐私政策
        {
            path: '/PrivacyPolicy',
            name: 'PrivacyPolicy',
            component: (resolve) => require(['@/pages/login/PrivacyPolicy'], resolve),
            meta: { requireAuth: true }
        },
        {
            path: '/DownloadPage',
            name: 'DownloadPage',
            component: (resolve) => require(['@/pages/login/DownloadPage'], resolve),
            meta: { requireAuth: false }
        },
        // 专题
        {
            path: '/special/Special',
            name: 'Special',
            component: () => import ('@/pages/Special/Special'),
            meta: {
                requireAuth: true,
                keepAlive: true
            }
        },
        {
            path: '/home/RushBuy',
            name: 'RushBuy',
            component: () => import ('@/pages/home/RushBuy'),
            meta: {
                requireAuth: true,
            }
        },
        {
            path: '/category/CateSpecial',
            name: 'CateSpecial',
            component: () => import ('@/pages/category/CateSpecial'),
            meta: {
                requireAuth: true,
            }
        },
        {
            path: '/category/CategoryLists',
            name: 'CategoryLists',
            component: () => import ('@/pages/category/CategoryLists'),
            meta: {
                requireAuth: true,
                keepAlive:true
            }
        },
        {
            path: '/slider',
            name: 'slider',
            component: () => import ('@/pages/common/slider/Slider'),
            meta: {
                requireAuth: false,
            }
        },

        // 重定向
        {
            path: '*',
            redirect: '/Home'
        },

    ]
})

// 注册全局钩子函数
// router.beforeEach((to, from, next) => {
//     //捕获uid,并且保存下来到sessionStorage
//     if(JSON.stringify(to.query) == "{}"){
//     } else {
//         let uid = to.query.uid;
//         sessionStorage.setItem('uid',uid)
//     }
//     //判断当前页面是否需要登录，true
//     if (to.matched.some(r => r.meta.requireAuth)) {
//         if (to.path === '/Login' || to.path === '/Register' ||  to.path === '/UserTreal' || to.path === '/PrivacyPolicy' || to.path === '/Home') {
//             next()
//         } else {
//             let token = localStorage.getItem('Authorization');
//             if (token === null || token === '') { //判断是否有token
//                 // Dialog.confirm({
//                 // 	message: '亲，还没有登录哦!'
//                 // }).then(() =>{
//                 // 	next('/Login');
//                 // })
//                 next('/Login');
//             } else {
//                 next()
//             }
//         }
//     } else {
//         next()
//     }
// })

router.afterEach(to => {
    if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
        if(to.path == '/Details'){
            if(!sessionStorage.getItem('categoryListScroll') && !sessionStorage.getItem('homeScroll') && !sessionStorage.getItem('freeZone')){
                let ios_url = localStorage.getItem('ios_url')
                if (ios_url !== to.path) {
                    localStorage.setItem('ios_url',to.path)
                    location.assign(to.fullPath);

                }
            }
        }
    }


});

export default router