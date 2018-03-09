/*
* @Author: ytan1
* @Date:   2018-03-05 15:24:06
* @Last Modified by:   ytan1
* @Last Modified time: 2018-03-08 16:56:47
*/

import './index.css'
var _mm = require('util/mm.js')
import 'page/common/header/header.js'
import 'page/common/nav/nav.js'
var navSide = require('page/common/nav-side/nav-side.js') 

navSide.init({
    name: 'my'
})


_mm.request({
    url: '/api/product/list.do?keyword=1',
    success: function(data, msg){
        console.log(data)
    },
    error: function(msg){
        console.log(msg)
    }
})

var template = '<div>{{data}}</div>'
var data = { data: 'data'}
console.log(_mm.renderHTML(template, data))
