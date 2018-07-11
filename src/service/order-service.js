var _mm = require('util/mm.js')

var _order = {
    //get items list after adding to cart before confirmed
    getOrderList: function(resolve, reject){
        _mm.request({
            url: _mm.getServerUrl('/order/get_order_cart_product.do'),
            // method: 'POST',
            success: resolve,
            error: reject
        })
    },
    //get items list after confirmed
    getConfirmedOrderList: function(listParam, resolve, reject){
        _mm.request({
            url: _mm.getServerUrl('/order/list.do'),
            // method: 'POST',
            data: listParam,
            success: resolve,
            error: reject
        })
    },
    //get info for a single order
    getOrderDetail: function(orderNo, resolve, reject){
        _mm.request({
            url: _mm.getServerUrl('/order/detail.do'),
             // method: 'POST',
            data: {
                orderNo: orderNo
            },
            success: resolve,
            error: reject
        }) 
    },
    cancel: function(orderNo, resolve, reject){
        _mm.request({
            url: _mm.getServerUrl('/order/cancel.do'),
             // method: 'POST',
            data: {
                orderNo: orderNo
            },
            success: resolve,
            error: reject
        }) 
    },
    create: function(orderInfo, resolve, reject){
       _mm.request({
            url: _mm.getServerUrl('/order/create.do'),
            // method: 'POST',
            data: orderInfo,
            success: resolve,
            error: reject
        }) 
    },
    cancel: function(orderNo, resolve, reject){
        _mm.request({
            url: _mm.getServerUrl('/order/received_and_paid.do'),
             // method: 'POST',
            data: {
                orderNo: orderNo
            },
            success: resolve,
            error: reject
        }) 
    }
}
module.exports = _order