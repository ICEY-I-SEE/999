'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
    NODE_ENV: '"production"',
    API_ROOT: '"http://www.gd999wlkj.com/api/"' //线上请求前缀
})
