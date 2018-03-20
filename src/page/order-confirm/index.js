/*
* @Author: ytan1
* @Date:   2018-03-18 22:06:41
* @Last Modified by:   ytan1
* @Last Modified time: 2018-03-20 12:38:44
*/
require('./index.css')
var _mm = require('util/mm')
require('page/common/header/header.js')
var nav = require('page/common/nav/nav.js')
var $$ = require('jquery')
var _address = require('service/address-service.js')
var _order = require('service/order-service.js')
var addressTemp = require('./address.string')
var orderTemp = require('./order.string')
var _modal = require('./address-modal.js')

var page = {
    data: {
              
    },
    init: function(){
        this.onLoad()
        this.bindEvent()
    },
    onLoad: function(){
        this.getAddressList()
        this.getOrderList()
    },
    bindEvent: function(){
        var _this = this
        //choose an address
        $$(document).on('click', '.address-item', function(){
            var $this = $$(this)
            $this.addClass("active").siblings('.address-item').removeClass('active')
            _this.data.selectedAddressId = $this.data('id')
        }) 
        //confirm to place order
        $$(document).on('click', '.order-checkout', function(){
            if(_this.data.selectedAddressId){
                _order.create({
                    shippingId: _this.data.selectedAddressId
                }, function(res){
                    window.location.href = './payment.html?orderNumber=' + res.data.orderNo
                },function(errMsg){
                    _mm.errTip(errMsg)
                })
            }
            else{
                _mm.errTip('Please choose an address first!')
            }
        })    
        //add new address
        $$(document).on('click', '.address-add', function(){
            _modal.show({
                isUpdate: false,
                onSuccess: function(){_this.getAddressList()}
            })
        }) 
        //edit
        $$(document).on('click', '.address-edit', function(e){
            var $this = $$(this), addressId = $this.parents('.address-item').data('id')
            e.stopPropagation()
            _address.getAddress(addressId, function(res){
                var data = $$.extend({}, {id: addressId}, res.data)
                _modal.show({
                    isUpdate: true,
                    onSuccess: function(){_this.getAddressList()},
                    data: data
                })
            })
            
        }),
        $$(document).on('click','.address-delete', function(e){
            e.stopPropagation()
            var id = $$(this).parents('.address-item').data('id')
            _address.deleteAddress(id, function(res){
                _this.getAddressList()
            }, function(errMsg){
                _mm.errTip(errMsg)
            }) 
        })
    },

    //render address options for user
    getAddressList: function(){
        var orderAddressCon = $$('.order-address')
        var _this = this
        orderAddressCon.html('<div class="loader"></div>')
        // get address from server
        _address.getAddressList(function(res){
            console.log(_this, _this.addressFilter)
            _this.addressFilter(res.data)
            orderAddressCon.html(_mm.renderHTML(addressTemp, res.data))
            
        }, function(errMsg){
            orderAddressCon.html('<p class="errorTips">Fail to get address info from the server, please refresh...</p>')
        })        
    },
    //..check if there was active address
    addressFilter: function(data){
        if(this.data.selectedAddressId){
            var selectedAddressFlag = false
            for(var i = 0, length = data.list.length; i < length; i++){
                if(this.data.selectedAddressId === data.list[i].id){
                    data.list[i].isActive = true
                    selectedAddressFlag = true
                }
            }
            if(!selectedAddressFlag){
                this.data.selectedAddressId = null
            }
        }
    },
    //render orders
    getOrderList: function(){
        var orderListCon = $$('.order-list')
        orderListCon.html('<div class="loader"></div>')
        //get order list from server
        _order.getOrderList(function(res){
            
            orderListCon.html(_mm.renderHTML(orderTemp, res.data))
            
        }, function(errMsg){
            orderListCon.html('<p class="errorTips">There is no unconfirmed order yet...<a class="link" href="./order-list.html">Go to confirmed orders</a></p>')
        })       
    }
}

$$(function(){
    page.init()
})