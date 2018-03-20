var _mm = require('util/mm.js')

var _address = {
    getAddressList: function(resolve, reject){
        _mm.request({
            url: _mm.getServerUrl('/shipping/list.do'),
            // method: 'POST',
            success: resolve,
            error: reject
        })
    },
    save: function(data, resolve, reject){
        _mm.request({
            url: _mm.getServerUrl('/shipping/add.do'),
            // method: 'POST',
            data: data,
            success: resolve,
            error: reject
        })
    },
    update: function(data, resolve, reject){
        _mm.request({
            url: _mm.getServerUrl('/shipping/update.do'),
            // method: 'POST',
            data: data,
            success: resolve,
            error: reject
        })
    },
    getAddress: function(shippingId, resolve, reject){
        _mm.request({
            url: _mm.getServerUrl('/shipping/select.do'),
            // method: 'POST',
            data: {
                shippingId: shippingId
            },
            success: resolve,
            error: reject
        })
    },
    deleteAddress: function(shippingId, resolve, reject){
        _mm.request({
            url: _mm.getServerUrl('/shipping/del.do'),
            // method: 'POST',
            data: {
                shippingId: shippingId
            },
            success: resolve,
            error: reject
        })
    }

}
module.exports = _address