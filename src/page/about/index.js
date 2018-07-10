require('./index.css')
var _mm = require('util/mm')
require('page/common/header/header.js')
require('page/common/nav/nav.js')
var navSide = require('page/common/nav-side/nav-side.js')

var $$ = require('jquery')


var _page = {
    init: function(){
        navSide.init({
            name: 'about'
        })
    }
}
$$(function(){
    _page.init()
})