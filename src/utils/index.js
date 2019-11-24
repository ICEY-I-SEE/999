import wx from 'weixin-js-sdk'
export default{
    wxConfig:(appid,timestamp,noncestr,signature,callback) => {
        wx.config({
            debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
            appId: appid, // 必填，公众号的唯一标识
            timestamp: timestamp, // 必填，生成签名的时间戳
            nonceStr: noncestr, // 必填，生成签名的随机串
            signature: signature, // 必填，签名
            jsApiList: ['updateAppMessageShareData', 'updateTimelineShareData'] // 必填，需要使用的JS接口列表
        })
        wx.ready(callback)  
    },
    /**
    * 微信分享朋友功能
    * @param {any} title 分享标题
    * @param {any} desc 分享描述
    * @param {any} link 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
    * @param {any} imgUrl 分享图标
    * @param {any} callback 成功后回调的函数
    */
    updateAppMessageShareData: (title, desc, link, imgUrl, callback) => {
        wx.updateAppMessageShareData({
            title: title, // 分享标题
            desc: desc, // 分享描述
            link: link,
            imgUrl: imgUrl, // 分享图标
            success: callback, // 用户确认分享后执行的回调函数,
            cancel: function () {
                // 用户取消分享后执行的回调函数
            }
        })
    },
    /**
     * 微信分享朋友圈
     * @param {any} title 分享标题
     * @param {any} link 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
     * @param {any} imgUrl 分享图标
     * @param {any} callback 用户确认分享后执行的回调函数
     */
    updateTimelineShareData: (title, link, imgUrl, callback) => {
        wx.updateTimelineShareData({
            title: title, // 分享标题
            link: link,
            imgUrl: imgUrl, // 分享图标
            success: callback, // 用户确认分享后执行的回调函数
            cancel: function () {
                // 用户取消分享后执行的回调函数
            }
        })
    },
}
