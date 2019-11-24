'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
    NODE_ENV: '"production"',
    // API_ROOT: '"http://member.rrling.com/api/"'   //线上请求前缀测试
    // www.rrling.com /
    API_ROOT: '"https://www.rrling.com/api/"' //线上请求前缀
})
