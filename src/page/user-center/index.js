/*
* @Author: ytan1
* @Date:   2018-03-10 11:47:58
* @Last Modified by:   ytan1
* @Last Modified time: 2018-03-10 19:00:02
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
    },
    loadUserInfo: function(){
        _user.getUserInfo(function(res){
            var html = _mm.renderHTML(template, res.data)
            $$('.user-center-list').html(html)
        }, function(errMsg){
            _mm.errorTips(errMsg)
        })        
    }
}

$$(function(){
    page.init()
})