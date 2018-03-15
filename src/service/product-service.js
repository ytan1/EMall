/*
* @Author: ytan1
* @Date:   2018-03-13 13:57:43
* @Last Modified by:   ytan1
* @Last Modified time: 2018-03-14 16:05:17
*/
var _mm = require('util/mm.js')

var _product = {
    getProductList: function(listInfo, resolve, reject){
        _mm.request({
            url: _mm.getServerUrl('/product/list.do'),
            data: listInfo,
            // method: 'POST',
            success: resolve,
            error: reject
        })
    },
    getProductDetail: function(productId, resolve, reject){
        _mm.request({
            url: _mm.getServerUrl('/product/detail.do'),
            data: {
                productId: productId
            },
            // method: 'POST',
            success: resolve,
            error: reject
        })
    }

}
module.exports = _product