/*
* @Author: ytan1
* @Date:   2018-03-10 20:44:33
* @Last Modified by:   ytan1
* @Last Modified time: 2018-03-10 21:18:37
*/
require('./index.css')
var _mm = require('util/mm')
require('page/common/header/header.js')
require('page/common/nav/nav.js')
var navSide = require('page/common/nav-side/nav-side.js')
var _user = require('service/user-service.js')
var $$ = require('jquery')


var page = {
    init: function(){
        this.onLoad()

    },
    onLoad: function(){
        navSide.init({
            name: 'pwd'
        })
        this.bindEvent()
    },
    bindEvent: function(){
        var _this = this
        $$('.user-center-btn').click(function(){
            var formData = {
                password: $$('#oldPassword').val(),
                passwordNew: $$('#newPassword').val(),
                passwordConfirm: $$('#confirm').val()
            }
            var validateRes = _this.validateForm(formData)
            if(validateRes.status){
                _user.updatePassword({
                    passwordOld: formData.password,
                    passwordNew: formData.passwordNew
                }, function(res){
                    _mm.successTip(res.msg)
                    window.location.href = './index.html'
                }, function(errMsg){
                    _mm.errTip(errMsg)
                })
            }
            else{
                _mm.errTip(validateRes.msg)
            }
        })
    },
    validateForm: function(formData){
        var result = {
            status: false,
            msg: ''
        }
        if(!_mm.validate(formData.password, 'require')){
             result.msg = 'password cannot be null!'
            return result
        }
        if(!formData.passwordNew || formData.password.length < 6){
             result.msg = 'New password should be longer than 6!'
            return result
        }
        if(formData.passwordNew !== formData.passwordConfirm){
             result.msg = 'Confirmation is incorrect!'
            return result
        }
        result.status = true
        return result
    }
}

$$(function(){
    page.init()
})