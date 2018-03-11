require('./index.css')
var _mm = require('util/mm')
require('page/common/header-simple/header-simple.js')
var _user = require('service/user-service.js')
var $$ = require('jquery')

var showError = {
    show: function(msg){
        $$('.register-error').show().find('.register-error-msg').text(msg)
    },
    hide: function(){
        $$('.register-error').hide().find('.register-error-msg').text('')
    }
}
var register = {
    init: function(){
        this.bindEvent()
    },
    bindEvent: function(){
        var _this = this
        $$('#register-username').blur(function(){
            var username = $$('#register-username').val()
            if(!username){
                return
            }
            _user.checkUserNameValid(username, function(res){
                showError.hide()
            }, function(errMsg){
                showError.show(errMsg)
            })
        })
        $$('.register-btn').click(function(){
            _this.submit()
        })
        $$('.register-input').keyup(function(e){
            if(e.keyCode === 13){
                _this.submit()
            }
        })
    },
    submit: function(){
        var formData = {
            username: $$('#register-username').val(),
            password: $$('#register-pwd').val(),
            passwordConfirm: $$('#register-confirm').val(),
            phone: $$('#register-phone').val(),
            email: $$('#register-email').val(),
            question: $$('#register-question').val(),
            answer: $$('#register-answer').val()
        }
        var result = this.validateForm(formData)
        if(!result.status){
            showError.show(result.msg)
        }
        else {
            _user.register(formData, function(res){
                //for register success, back to original page
                showError.hide()
                window.location.href = './result.html?type=register'
            }, function(errMsg){
                showError.show(errMsg)
            })

        }
    },
    //validate all the info from register, simple password requirement(> 6)
    validateForm: function(formData){
        var result = {
            status: false,
            msg: ''
        }
        if(!_mm.validate(formData.username, 'require')){ result.msg = 'Please input username!'; return result }
        if(!_mm.validate(formData.password, 'require')){ result.msg = 'Please input password!'; return result }
        if(formData.password.length < 6){
            result.msg = 'Password should be longer!'
            return result
        }
        if(formData.password !== formData.passwordConfirm){
            result.msg = 'Password not confirmed correctly!'
            return result
        }
        if(!_mm.validate(formData.phone, 'phone')){
             result.msg = 'Phone number format not right!'
            return result
        }
        if(!_mm.validate(formData.email, 'email')){
             result.msg = 'Email format not right!'
            return result
        }
        if(!_mm.validate(formData.question, 'require')){
             result.msg = 'Questions required!'
            return result
        }
        if(!_mm.validate(formData.answer, 'require')){
             result.msg = 'Answer required!'
            return result
        }
        result.status = true
        return result
    }
 }

 $$(function(){
    register.init()
 })