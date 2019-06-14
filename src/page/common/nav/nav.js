/*
* @Author: ytan1
* @Date:   2018-03-07 17:17:18
* @Last Modified by:   ytan1
* @Last Modified time: 2018-03-09 14:50:00
*/
var $$ = require('jquery')
require('./nav.css')
var _mm = require('util/mm.js')
var _user = require('service/user-service.js')
var _cart = require('service/cart-service.js')
var nav = {
    init: function(){
        this.bindEvent()
        this.loadUserInfo()
        this.loadCartNo()
        return this
    },
    bindEvent: function(){
        $$('.js-login').click(function(){
            _mm.doLogin()
        })
        $$('.js-register').click(function(){
            window.location.href = './user-register.html'
        })
        $$('.js-logout').click(function(){
            _user.logout(function(res){
                window.location.reload()
            }, function(err){
                _mm.errTip(err)
            })
        })

    },
    loadUserInfo: function(){
        _user.checkLogin(function(res){
            $$('.not-login').hide().siblings('.is-login').show()
                .find('.user-name').text(res.username)
        }, function(err){
            // _mm.errTip(err)
        })
    },
    loadCartNo: function(){
        _cart.checkItemNo(function(res){
            $$('.item-no').text(res.data || 0)

        }, function(err){
            _mm.errTip(err)
            $$('.item-no').text(0)
        })
    }
}
module.exports = nav.init()