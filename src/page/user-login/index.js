/*
* @Author: ytan1
* @Date:   2018-03-05 16:35:17
* @Last Modified by:   ytan1
* @Last Modified time: 2018-03-09 15:08:30
*/
require('./index.css')
var _mm = require('util/mm')
require('page/common/header-simple/header-simple.js')
var _user = require('service/user-service.js')
var $$ = require('jquery')

var showError = {
    show: function(msg){
        $$('.login-error').show().find('.login-error-msg').text(msg)
    },
    hide: function(){
        $$('.login-error').hide().find('.login-error-msg').text('')
    }
}
var login = {
    init: function(){
        this.bindEvent()
    },
    bindEvent: function(){
        var _this = this
        $$('.login-btn').click(function(){
            _this.submit()
        })
        $$('.login-input').keyup(function(e){
            if(e.keyCode === 13){
                _this.submit()
            }
        })
    },
    submit: function(){
        var formData = {
            username: $$('#login-username').val(),
            password: $$('#login-pwd').val()
        }
        var result = this.validateForm(formData)
        if(!result.status){
            showError.show(result.msg)
        }
        else {
            _user.login(formData, function(res){
                //for login success, back to original page
                showError.hide()
                window.location.href = _mm.getUrlParam('redirect') || './index.html'
            }, function(errMsg){
                showError.show(errMsg)
            })

        }
    },
    validateForm: function(formData){
        var result = {
            status: false,
            msg: ''
        }
        if(!_mm.validate(formData.username, 'require')){ result.msg = 'Please input username!'; return result }
        if(!_mm.validate(formData.password, 'require')){ result.msg = 'Please input password!'; return result }
        result.status = true
        return result
    }
 }

 $$(function(){
    login.init()
 })