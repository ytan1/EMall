require('./index.css')
var _mm = require('util/mm')
require('page/common/header/header.js')
var nav = require('page/common/nav/nav.js')
var $$ = require('jquery')
var _cart = require('service/cart-service.js')
var template = require('./index.string')


var page = {
    data: {
        
    },
    init: function(){
        this.onLoad()
    },
    onLoad: function(){
        this.loadCart()
        this.bindEvent()
    },
    loadCart: function(){
        var _this = this
        _cart.getProductList(function(res){
            _this.renderCart(res)
        },function(errMsg){
            _this.showCartError('Something wrong from server, try refreshing...')
        })
    },
    bindEvent: function(){
        var _this = this
        $$(document).on('click', '.cart-select-all', function(){
            if($$(this).is(':checked')){
                _cart.selectAll(function(res){
                    _this.renderCart(res)
                }, function(errMsg){
                    _this.showCartError('Something wrong from server, try refreshing...')
                })
            }else{
                _cart.unSelectAll(function(res){
                    _this.renderCart(res)
                }, function(errMsg){
                    _this.showCartError('Something wrong from server, try refreshing...')
                })
            }
        })
        $$(document).on('click', '.cart-check', function(){
            var productId = $$(this).parents('.cart-table').data('product-id')
            if($$(this).is(':checked')){
                _cart.selectOne(productId, function(res){
                    _this.renderCart(res)
                }, function(errMsg){
                    _this.showCartError('Something wrong from server, try refreshing...')
                })
            }else{
                _cart.unSelectOne(productId, function(res){
                    _this.renderCart(res)
                }, function(errMsg){
                    _this.showCartError('Something wrong from server, try refreshing...')
                })
            }
            
        })
        $$(document).on('click', '.cart-delete .link', function(){
            var productId = $$(this).parents('.cart-table').data('product-id')
            if(window.confirm('Are you sure to delete it?')){
                _cart.deleteProduct(productId, function(res){
                    _this.renderCart(res)
                }, function(errMsg){
                    _this.showCartError('Something wrong from server, try refreshing...')
                })
            }
        })
        $$(document).on('click', '.cart-delete-all .link', function(){
            if(window.confirm('Are you sure to delete chosen items?')){
                var productIds = [],
                    items = $$('.cart-check:checked')
                for(var i = 0, iLen = items.length; i < iLen; i++){
                    productIds.push($$(items[i]).parents('.cart-table').data('product-id')) 
                }
                if(productIds.length){
                    _cart.deleteProduct(productIds.join(','), function(res){
                        _this.renderCart(res)
                    }, function(errMsg){
                        _this.showCartError('Something wrong from server, try refreshing...')
                    })
                }
            }
        })
        $$(document).on('click', '.cart-amount span', function(){
            var $this = $$(this),
                $cartItem = $this.parents('.cart-table'),
                productId = $cartItem.data('product-id'),
                stock = parseInt($cartItem.data('product-stock')),
                $input = $this.siblings('input'),
                amount = parseInt($input.val())

            if($this.hasClass('plus')){
                if(amount + 1 > stock){
                    _mm.errTip('Not enough stocks for your required amount!')
                    return
                }
                amount++
            }else if($this.hasClass('minus')){
                if(amount - 1 < 1){
                    return
                }
                amount--
            }

            _cart.update({
                productId: productId,
                count: amount
            },function(res){
                _this.renderCart(res)
            }, function(errMsg){
                _this.showCartError('Something wrong from server, try refreshing...')
            })


        })

        $$(document).on('click', '.cart-checkout', function(){
            if(_this.data.cartInfo && _this.data.cartInfo.cartTotalPrice > 0){
                window.location.href = './order-confirm.html'
            }else{
                _mm.errTip('Please choose items first!')
            }
        })

    },
    showCartError: function(msg){
        $$('.cart-page').html('<div class="errorTip">' + msg + '</div>')
    },
    //add isEmpty in data
    filter: function(data){
        var isEmpty = !data.cartProductVoList.length
        this.data.cartInfo = $$.extend({}, data, {
            isEmpty: isEmpty
        })
    },
    renderCart: function(res){
        var pageContainer = $$('.cart-page')
        //put res.data into storage in page object
        this.filter(res.data)
        pageContainer.html(_mm.renderHTML(template, this.data.cartInfo))
        nav.loadCartNo()
    }

}

$$(function(){
    page.init()
})