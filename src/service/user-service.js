var _mm = require('util/mm.js')

var _user = {
    //make request url is associated with server side!!!
    login: function(data, resolve, reject){
        _mm.request({
            url     : _mm.getServerUrl('/user/login.do'),
            data    : data,
            method  : 'POST',
            success : resolve,
            error   : reject
        })
    },
    register: function(data, resolve, reject){
        _mm.request({
            url     : _mm.getServerUrl('/user/register.do'),
            data    : data,
            method  : 'POST',
            success : resolve,
            error   : reject
        })
    },
    checkUserNameValid: function(username, resolve, reject){
        _mm.request({
            url: _mm.getServerUrl('/user/check_valid.do'),
            data: {
                type    : 'username',
                str     : username 
            },
            method      : 'POST',
            success     : resolve,
            error       : reject
        })
    },
    logout: function(resolve, reject){
        _mm.request({
            url: _mm.getServerUrl('/user/logout.do'),
            method: 'POST',
            success: resolve,
            error: reject
        })
    },
    //for reset page step1
    getQuestion: function(username, resolve, reject){
        _mm.request({
            url: _mm.getServerUrl('/user/forget_get_question.do'),
            data: {
                username    : username 
            },
            method      : 'POST',
            success     : resolve,
            error       : reject
        })
    },
    checkQuestion: function(userInfo, resolve, reject){
        _mm.request({
            url: _mm.getServerUrl('/user/forget_check_answer.do'),
            data: userInfo,
            method      : 'POST',
            success     : resolve,
            error       : reject
        })
    },
    resetPassword: function(userInfo, resolve, reject){
        _mm.request({
            url: _mm.getServerUrl('/user/forget_reset_password.do'),
            data: userInfo,
            method      : 'POST',
            success     : resolve,
            error       : reject
        })
    },
    updatePassword: function(data, resolve, reject){
        _mm.request({
            url: _mm.getServerUrl('/user/reset_password.do'),
            data: data,
            method      : 'POST',
            success     : resolve,
            error       : reject
        })
    },
    //get user info for user center
    getUserInfo: function(resolve, reject){
        _mm.request({
            url: _mm.getServerUrl('/user/get_information.do'),
            method: 'POST',
            success: resolve,
            error: reject
        })
    },
    updateUserInfo: function(data, resolve, reject){
        _mm.request({
            url: _mm.getServerUrl('/user/update_information.do'),
            method: 'POST',
            data: data,
            success: resolve,
            error: reject
        })
    },
    checkLogin: function(resolve, reject){
        _mm.request({
            url: _mm.getServerUrl('/user/get_user_info.do'),
            method: 'POST',
            success: resolve,
            error: reject
        })
    }
}
module.exports = _user