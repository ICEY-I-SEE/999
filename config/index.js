'use strict'
// Template version: 1.3.1
// see http://vuejs-templates.github.io/webpack for documentation.

const path = require('path')

module.exports = {
    dev: {

        // Paths
        assetsSubDirectory: 'static',
        assetsPublicPath: '/', 

        // 代理跨域
        proxyTable: {
            "/api": {
                // target: "http://member.rrling.com/api/",//接口的域名  测试
                // www.rrling.com /
                target: "https://www.rrling.com/api/", //接口的域名 
                secure: false, //如果是https接口，需要配置这个参数
                changeOrigin: true, //如果接口跨域，需要进行这个参数配置
                pathRewrite: {
                    "^/api": ""
                },
                headers: {
                    Referer: 'https://www.rrling.com'
                }
            }
        },
        host: '192.168.1.118',
        port: 8080,
        autoOpenBrowser: false,
        errorOverlay: true,
        notifyOnErrors: true,
        poll: false,
        devtool: 'cheap-module-eval-source-map',
        cacheBusting: true,
        cssSourceMap: true
    },

    build: {
        // Template for index.html
        index: path.resolve(__dirname, '../dist/index.html'),

        // Paths
        assetsRoot: path.resolve(__dirname, '../dist'),
        assetsSubDirectory: 'static',
        assetsPublicPath: '/',

        /**
         * Source Maps
         */

        productionSourceMap: true,
        devtool: '#source-map',
        productionGzip: false,
        productionGzipExtensions: ['js', 'css'],
        bundleAnalyzerReport: process.env.npm_config_report
    }
}