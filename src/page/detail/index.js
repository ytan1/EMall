/*
* @Author: ytan1
* @Date:   2018-03-14 13:46:56
* @Last Modified by:   ytan1
* @Last Modified time: 2018-03-15 12:37:49
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
        //check if stock is 0
        
        //photo thumbnail
        $$(document).on('mouseenter', '.image-thumbnail', function(){
            var thisEle = $$(this)
            $$('.main-img').attr('src', thisEle.attr('src'))
        })
        //for up and down button 
        $$(document).on('click', '.amount-up', function(){
            var amount = parseInt($$('.intro-amount .item-value input').val()),
                max = parseInt($$('.intro-stock .item-value').text())
            $$('.intro-amount .item-value input').val( (amount + 1 > max) ? max : amount + 1)
        })
        $$(document).on('click', '.amount-down', function(){
            var amount = parseInt($$('.intro-amount .item-value input').val()),
                max = parseInt($$('.intro-stock .item-value').text())
                if(max === 0){
                    return
                }
            $$('.intro-amount .item-value input').val( (amount - 1 > 0) ? amount - 1 : 1)
        })
        //add to cart button
        $$(document).on('click', '.add-to-cart', function(){
           
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