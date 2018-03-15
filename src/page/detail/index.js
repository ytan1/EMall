/*
* @Author: ytan1
* @Date:   2018-03-14 13:46:56
* @Last Modified by:   ytan1
* @Last Modified time: 2018-03-14 16:52:45
*/
/*
* @Author: ytan1
* @Date:   2018-03-10 11:47:58
* @Last Modified by:   ytan1
* @Last Modified time: 2018-03-10 19:00:02
*/
require('./index.css')
var _mm = require('util/mm')
require('page/common/header/header.js')
require('page/common/nav/nav.js')
var $$ = require('jquery')
var template = require('./index.string')
var _product = require('service/product-service.js')
var _cart = require('service/cart-service.js')

var page = {
    data: {
        productId: _mm.getUrlParam('productId')
    },
    init: function(){
        this.onLoad()
    },
    onLoad: function(){
        this.loadDetail()
        this.bindEvent()
    },
    loadDetail: function(){
        var page = $$('.detail-page')
        _product.getProductDetail(this.data.productId, function(res){
            res.data.subImages = res.data.subImages.split(',')
            page.html(_mm.renderHTML(template, res.data))
        },function(errMsg){
            page.html('<div class="errorTip">Oops, cannot find the item...</div>')
        })
    },
    bindEvent: function(){
        var _this = this
        $$(document).on('mouseenter', '.image-thumbnail', function(){
            var thisEle = $$(this)
            $$('.main-img').attr('src', thisEle.attr('src'))
        })
        $$(document).on('click', '.amount-up', function(){
            var inputEle = $$('.intro-amount .item-value input'),
                amount = parseInt(inputEle.val()),
                max = $$('.intro-stock .item-value').text()
                console.log(max)
            inputEle.val( (amount + 1 > max) ? max : amount + 1)
        })
        $$(document).on('click', '.amount-down', function(){
            var inputEle = $$('.intro-amount .item-value input'),
                amount = inputEle.val()
            inputEle.val( (amount - 1 > 0) ? amount - 1 : 1)
        })
        $$(document).on('click', '.add-to-cart', function(){
            var amount = 
            _cart.addToCart({
                productId: _this.data.productId,
                count: parseInt($$('.intro-amount .item-value input').val())
            }, function(res){
                window.location.href = './result.html?type=cart-add'
            }, function(errMsg){
                 _mm.errorTips(errMsg)
            })
        })
    }
}

$$(function(){
    page.init()
})