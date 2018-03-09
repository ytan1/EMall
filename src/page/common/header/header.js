import './header.css'

var $$ = require('jquery')
var _mm = require('util/mm.js')


var header = {
    init: function(){
        this.bindEvent()
    },
    onLoad: function(){
        var keyword = _mm.getUrlParam('keyword')
        $$('#header-input').val(keyword)
    },
    bindEvent: function(){
        var _this = this
        $$('#header-btn').click(function(){
            _this.searchSubmit()
        })
        $$('#header-input').keyup(function(e){
            console.log(e.keycode)
            if(e.keyCode === 13){
                _this.searchSubmit()
            }
        })
    },
    searchSubmit: function(){
        var keyword = $$.trim($$('#header-input').val())
        if(keyword){
            window.location.href = './list.html?keyword=' + keyword
        }else{
            _mm.goHome()
        }
    }

}

header.init()