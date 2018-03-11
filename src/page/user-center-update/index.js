/*
* @Author: ytan1
* @Date:   2018-03-10 20:00:16
* @Last Modified by:   ytan1
* @Last Modified time: 2018-03-10 20:58:14
*/

require('./index.css')
var _mm = require('util/mm')
require('page/common/header/header.js')
require('page/common/nav/nav.js')
var navSide = require('page/common/nav-side/nav-side.js')
var _user = require('service/user-service.js')
var $$ = require('jquery')
var template = require('./index.string')


var page = {
    init: function(){
        this.onLoad()

    },
    onLoad: function(){
        navSide.init({
            name: 'info'
        })
        this.loadUserInfo()
        this.bindEvent()
    },
    loadUserInfo: function(){
        _user.getUserInfo(function(res){
            var html = _mm.renderHTML(template, res.data)
            $$('.user-center-list').html(html)
        }, function(errMsg){
            _mm.errTip(errMsg)
        })        
    },
    bindEvent: function(){
        var _this = this
        $$(document).on('click', '.user-center-btn', function(){
            var formData = {
                email: $$('#email').val(),
                phone: $$('#phone').val(),
                question: $$('#question').val(),
                answer: $$('#answer').val()
            }
            console.log(formData)
            var validateRes = _this.validateForm(formData)
            if(validateRes.status){
                _user.updateUserInfo(formData, function(res){
                    _mm.successTip(res.msg)
                    window.location.href = './user-center.html'
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
    page.init()
})