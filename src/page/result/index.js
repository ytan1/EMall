import './index.css'
var _mm = require('util/mm.js')
import 'page/common/header-simple/header-simple.js'
var $$ = require('jquery')

$$(function(){
    var type = _mm.getUrlParam('type')
    $$('.' + type + '-success').show()
})

