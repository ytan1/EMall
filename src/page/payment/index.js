import './index.css'
var _mm = require('util/mm.js')
import 'page/common/header-simple/header-simple.js'
var $$ = require('jquery')
var template = require('./index.string')

$$(function(){
    var orderNo = _mm.getUrlParam('orderNumber')
    $$('#orderNo').html(_mm.renderHTML(template, {orderNo:orderNo}))
})