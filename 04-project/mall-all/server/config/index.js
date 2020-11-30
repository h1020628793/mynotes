/*
* @Author: Tom
* @Date:   2020-01-10 12:03:05
* @Last Modified by:   Tom
* @Last Modified time: 2020-02-29 11:06:20
*/
const dev = require('./dev.js')
const prod = require('./prod.js')
const common = require('./common.js')

const devConfig = Object.assign({},common,dev)
const prodConfig = Object.assign({},common,prod)

module.exports = process.env.NODE_ENV === 'production' ? prodConfig : devConfig