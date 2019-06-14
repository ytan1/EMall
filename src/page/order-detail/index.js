require('./index.css')
var _mm = require('util/mm')
require('page/common/header/header.js')
require('page/common/nav/nav.js')
var navSide = require('page/common/nav-side/nav-side.js')
var _order = require('service/order-service.js')
var $$ = require('jquery')
var templateMain = require('./list.string')
var templateStatus = require('./status.string')

var _page ={
    
    init: function(){
        this.onLoad()
        this.bindEvent()
    },
    onLoad: function(){

        navSide.init({name: 'orders'})
        var orderNo = _mm.getUrlParam('orderNo'), _this = this
        //request for order detail and payment status
        _order.getOrderDetail(orderNo, function(res){
            _this.filterData(res.data)
            //render status
            $$('.status-container').html(_mm.renderHTML(templateStatus, res.data))
            //render items
            $$('.main-container').html(_mm.renderHTML(templateMain, res.data))
        }, function(errMsg){
            _mm.errTip(errMsg)
        })
    },
    bindEvent: function(){
        var orderNo = _mm.getUrlParam('orderNo'), _this = this
        $$(document).on('click', '.pay', function(){
            //click receive button, res is orderVo
            _order.receivedAndPaid(orderNo, function(res){
                _this.filterData(res.data)
                //render status
                $$('.status-container').html(_mm.renderHTML(templateStatus, res.data))
                //render items
                $$('.main-container').html(_mm.renderHTML(templateMain, res.data))
            },function(errMsg){
                _mm.errTip(errMsg)
            })
        })
        $$(document).on('click', '.cancel', function(){
            _order.cancel(orderNo, function(res){
                window.location.href = './order-list.html'
            },function(errMsg){
                _mm.errTip(errMsg)
            })
        })
    },
    filterData: function(data){
        data.buttonAbled = (data.status == 10) //status 10 means unpaid
        data.isPaid = (data.status == 20) //status 20 means paid
    }
}

$$(function(){
    _page.init()
})