/*
* @Author: ytan1
* @Date:   2018-03-13 13:36:05
* @Last Modified by:   ytan1
* @Last Modified time: 2018-03-14 11:42:15
*/
require('./index.css')
var _mm = require('util/mm')
require('page/common/header/header.js')
require('page/common/nav/nav.js')
var _product = require('service/product-service.js')
var $$ = require('jquery')
var template = require('./list.string')
var Pagination = require('util/pagination/index.js')

var page = {
    data: {
        listParam:{
            keyword         : _mm.getUrlParam('keyword') || '',
            categoryId      : _mm.getUrlParam('categoryId') || '',
            orderBy         : _mm.getUrlParam('orderBy') || 'default',
            pageNum         : _mm.getUrlParam('pageNum') || 1,
            pageSize        : _mm.getUrlParam('pageSize') || 2
        }       
    },
    init: function(){
        this.onLoad()
        this.bindEvent()
    },
    onLoad: function(){
        this.getProductList()
    },
    bindEvent: function(){
        var _this = this
        //for order selection
        $$('.sort-item').click(function(){
            var button = $$(this)
            if(button.data('type')==='default'){
                if(button.hasClass('active')){
                    return 
                }else{
                    button.addClass('active').siblings('.sort-item')
                    .removeClass('active asc desc')
                    _this.data.listParam.orderBy = 'default'
                }
            }else{
                button.addClass('active').siblings('.sort-item').removeClass('active')
                if(button.hasClass('desc')){
                    button.removeClass('desc').addClass('asc')
                    _this.data.listParam.orderBy = 'price_asc'
                }else{
                    button.removeClass('asc').addClass('desc')
                    _this.data.listParam.orderBy = 'price_desc'
                }
            }
            _this.data.listParam.pageNum = 1
            _this.onLoad()
        })
        
    },
    getProductList: function(){
        var listContainer = $$('.product-list')
        listContainer.html('<div class="loader"></div>')
        var _this = this,
            listParam = this.data.listParam,
            listHTML = ''
        _product.getProductList(listParam, function(res){
            listHTML = _mm.renderHTML(template, res.data)
            listContainer.html(listHTML)
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
        }, function(errMsg){
            _mm.errorTips(errMsg)
        })        
    },
    getPagination: function(pageInfo){
        var _this = this
        if(!this.pagination){
            this.pagination = new Pagination()
        }
        // console.log(pageInfo)
        this.pagination.render($$.extend({}, pageInfo, {
            container: $$('.pagination'),
            //event listner for click on pagination bar 
            selectPage: function(pageNum){
                _this.data.listParam.pageNum = pageNum
                _this.getProductList()
            },
            selectPageSize: function(value){
                // console.log(_this.data.listParam.pageSize)
                // console.log(value)
                //cannot use ===, probably initially pageSize and value different type, console log show 2 and 2
                if(_this.data.listParam.pageSize == value){
                    return
                }
                _this.data.listParam.pageSize = value
                _this.getProductList()
            }
        }))
    }
}

$$(function(){
    page.init()
})