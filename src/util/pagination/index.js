/*
* @Author: ytan1
* @Date:   2018-03-13 18:14:51
* @Last Modified by:   ytan1
* @Last Modified time: 2018-03-20 12:56:02
*/
var $$ = require('jquery')
var template = require('./index.string')
var _mm = require('util/mm.js')
require('./index.css')


var Pagination = function(){
    var _this = this
    this.defaultOptions = {
        container: null,
        pageRange: 3,
        pageNum: 1,
        selectPage: null
    }
    $$(document).on('click', '.pg-item', function(){
        var thisEle = $(this)
        if(thisEle.hasClass('active') || thisEle.hasClass('disabled')){
            return
        }else{
            _this.options.selectPage(thisEle.data('value'))
        }
    })
    $$(document).on('click', '.pg-size', function(){
        _this.options.selectPageSize(this.value)
    })

}
Pagination.prototype.render = function(userOptions){
    this.options = $$.extend({}, this.defaultOptions, userOptions)
    //if the container for pagination is invalid 
    if(!(this.options.container instanceof jQuery)){
        return
    }
    //if only one page
    if(this.options.pages < 1 ){
        this.options.container.html('<span class="pg-item-total">Total 0 page</span>')
        return
    }
    //else 
    console.log(this.options)
    this.options.container.html(this.paginationHTML())
}
Pagination.prototype.paginationHTML = function(){
    var html = '',
        options = this.options,
        pageArray = []
    //determines which pages in nav to show
    var start = options.pageNum - options.pageRange
    start = start < 1 ? 1 : start
    var end = options.pageNum + options.pageRange
    end = end > options.pages ? options.pages : end 
    pageArray.push({
        name: '<<',
        value: options.firstPage,
        disabled: options.isFirstPage
    })
    pageArray.push({
        name: 'Prev...',
        value: options.prePage,
        disabled: !options.hasPreviousPage
    })
    for(var i = start; i <= end; i++){
        pageArray.push({
            name: i,
            value: i,
            active: (i === options.pageNum)
        })
    }
    pageArray.push({
        name: 'Next...',
        value: options.nextPage,
        disabled: !options.hasNextPage
    })
    pageArray.push({
        name: '>>',
        value: options.lastPage,
        disabled: options.isLastPage
    })
    console.log(pageArray)
    html = _mm.renderHTML(template,{
        pageArray: pageArray,
        pages: options.pages,
        pageSize: options.pageSize
    })
    return html

} 

module.exports = Pagination