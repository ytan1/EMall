require('./index.css')
var _mm = require('util/mm')
require('page/common/header-simple/header-simple.js')
var _user = require('service/user-service.js')
var $$ = require('jquery')

var showError = {
    show: function(msg){
        $$('.reset-error').show().find('.reset-error-msg').text(msg)
    },
    hide: function(){
        $$('.reset-error').hide().find('.reset-error-msg').text('')
    }
}
var reset = {
    data:{
        username: '',
        question: '',
        answer: '',
        token: ''
    },
    init: function(){
        this.bindEvent1()
        this.showStep1()
    },
    //bind submit event for each step, the associated module will show based on res 
    bindEvent1: function(){
        var _this = this
        $$('.reset-step1 .reset-btn').click(function(){
            _this.submit1()
        })
        $$('.reset-step1 .reset-input').keyup(function(e){
            if(e.keyCode === 13){
                _this.submit1()
            }
        })
    },
    bindEvent2: function(){
        var _this = this
        $$('.reset-step2 .reset-btn').click(function(){
            _this.submit2()
        })
        $$('.reset-step2 .reset-input').keyup(function(e){
            if(e.keyCode === 13){
                _this.submit2()
            }
        })
    },
    bindEvent3: function(){
        var _this = this
        $$('.reset-step3 .reset-btn').click(function(){
            _this.submit3()
        })
        $$('.reset-step3 .reset-input').keyup(function(e){
            if(e.keyCode === 13){
                _this.submit3()
            }
        })
    },
    submit1: function(){
        var username = $$('#reset-username').val()
        this.data.username = username
        
        if(username){
            var _this = this
            _user.getQuestion(username, function(res){
                _this.data.question = res.data
                showError.hide()
                _this.bindEvent2()
                _this.showStep2(res.data)
            }, function(errMsg){
                showError.show(errMsg)
            })
        }
        else {
            showError.show('Username invalid!')
        }
    },
    submit2: function(){
        var answer = $$('#reset-answer').val()
        this.data.answer = answer
        if(answer){
            var _this = this
            _user.checkQuestion({
                username: _this.data.username,
                question: _this.data.question,
                answer: answer
            }, function(res){
                _this.data.token = res.data
                showError.hide()
                _this.bindEvent3()
                _this.showStep3()
            }, function(errMsg){
                console.log(_this.data)
                showError.show(errMsg)
            })
        }
        else {
            showError.show('Please input answer!')
        }
    },
    submit3: function(){
        var password = $$('#reset-password').val()
        this.data.password = password
        if(password){
            var _this = this
            _user.resetPassword({
                username: this.data.username,
                passwordNew: this.data.password,
                forgetToken: this.data.token

            }, function(res){
                window.location.href = './result.html?type=reset'
            }, function(errMsg){
                showError.show(errMsg)
            })
        }
        else {
            showError.show('Please input a new password!')
        }
    },
    showStep1: function(){
        $$('.reset-step1').show()
    },
    showStep2: function(question){
        $$('.reset-step1').hide()
        $$('.reset-step2 .reset-notice').text(question)
        $$('.reset-step2').show()
    },
    showStep3: function(){
        $$('.reset-step2').hide()
        $$('.reset-step3').show()
    }

 }

 $$(function(){
    reset.init()
 })