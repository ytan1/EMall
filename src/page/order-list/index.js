/*
* @Author: ytan1
* @Date:   2018-03-20 11:11:00
* @Last Modified by:   ytan1
* @Last Modified time: 2018-03-20 12:57:43
*/
require('./index.css')
var _mm = require('util/mm')
require('page/common/header/header.js')
require('page/common/nav/nav.js')
var navSide = require('page/common/nav-side/nav-side.js')
var _order = require('service/order-service.js')
var $$ = require('jquery')
var template = require('./index.string')
var Pagination = require('util/pagination/index.js')


var _page = {
    data: {
        param: {
            pageNum: 1,
            pageSize: 5
        }
    },
    init: function(){
        navSide.init({name : 'orders'})
        this.onLoad()

    },
    onLoad: function(){
        this.loadConfirmedOrderList()
    },
    loadConfirmedOrderList: function(){
        var _this = this
        _order.getConfirmedOrderList(this.data.param, function(res){
            if(res.data.list && res.data.list.length){
                $$('.main-container').html(_mm.renderHTML(template, res.data))
                _this.getPagination({
                    pageNum: res.data.pageNum,
                    firstPage: res.data.firstPage,
                    hasNextPage: res.data.hasNextPage,
                    hasPreviousPage: res.data.hasPreviousPage,
                    isFirstPage: res.data.isFirstPage,
                    isLastPage: res.data.isLastPage,
                    lastPage: res.data.lastPage,
                    pages: res.data.pages,
                    prePage: res.data.prePage,
                    nextPage: res.data.nextPage,
                    pageSize: res.data.pageSize
                })
            }
            else{
                $$('.main-container').html('<p class="errorTips">There is no confirmed order yet...</p>')
            }
        }, function(errMsg){
            _mm.errTip(errMsg)
        })
    },
    getPagination: function(pageInfo){ 
        //refer to list/index.js
        var _this = this
        if(!this.pagination){
            this.pagination = new Pagination()
        }
        this.pagination.render($$.extend({}, pageInfo, {
            container: $$('.pagination'),
            //event listner for click on pagination bar 
            selectPage: function(pageNum){
                _this.data.param.pageNum = pageNum
                _this.loadConfirmedOrderList()
            },
            selectPageSize: function(value){
                
                if(_this.data.param.pageSize == value){
                    return
                }
                _this.data.param.pageSize = value
                _this.loadConfirmedOrderList()
            }
        }))
    }
}

$$(function(){
    _page.init()
})