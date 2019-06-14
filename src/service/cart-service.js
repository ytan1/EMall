/*
* @Author: ytan1
* @Date:   2018-03-07 20:14:03
* @Last Modified by:   ytan1
* @Last Modified time: 2018-03-15 18:40:28
*/
var _mm = require('util/mm.js')

var _cart = {
    checkItemNo: function(resolve, reject){
        _mm.request({
            url: _mm.getServerUrl('/cart/get_cart_product_count.do'),
            // method: 'POST',
            success: resolve,
            error: reject
        })
    },
    addToCart: function(data, resolve, reject){
        _mm.request({
            url: _mm.getServerUrl('/cart/add.do'),
            // method: 'POST',
            data: data,
            success: resolve,
            error: reject
        })
    },
    getProductList: function(resolve, reject){
        _mm.request({
            url: _mm.getServerUrl('/cart/list.do'),
            // method: 'POST,
            success: resolve,
            error: reject
        })
    },
    selectAll: function(resolve, reject){
        _mm.request({
            url: _mm.getServerUrl('/cart/select_all.do'),
            // method: 'POST,
            success: resolve,
            error: reject
        })
    },
    unSelectAll: function(resolve, reject){
        _mm.request({
            url: _mm.getServerUrl('/cart/un_select_all.do'),
            // method: 'POST,
            success: resolve,
            error: reject
        })
    },
    selectOne: function(productId, resolve, reject){
        _mm.request({
            url: _mm.getServerUrl('/cart/select.do'),
            // method: 'POST,
            data:{
                productId: productId
            },
            success: resolve,
            error: reject
        })
    },
    unSelectOne: function(productId, resolve, reject){
        _mm.request({
            url: _mm.getServerUrl('/cart/un_select.do'),
            // method: 'POST,
            data:{
                productId: productId
            },
            success: resolve,
            error: reject
        })
    },
    deleteProduct: function(productId, resolve, reject){
        _mm.request({
            url: _mm.getServerUrl('/cart/delete_product.do'),
            // method: 'POST,
            data:{
                productIds: productId
            },
            success: resolve,
            error: reject
        })
    },
    update: function(data, resolve, reject){
        _mm.request({
            url: _mm.getServerUrl('/cart/update.do'),
            // method: 'POST,
            data:data,
            success: resolve,
            error: reject
        })
    },

}
module.exports = _cart