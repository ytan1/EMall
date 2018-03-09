/*
* @Author: ytan1
* @Date:   2018-03-07 20:14:03
* @Last Modified by:   ytan1
* @Last Modified time: 2018-03-08 10:48:52
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

}
module.exports = _cart