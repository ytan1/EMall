var $$ = require('jquery')
var Hogan = require('hogan.js')
var conf = {
    serverHost: '/api'
}
var _mm = {
    request: function(param){
        _this = this
        $$.ajax({
            method  : param.method || 'GET',
            url     : param.url || '/',
            dataType: param.type || 'json',
            data    : param.data || '', 
            success : function(res){
                if( res.status === 0 ){
                    typeof param.success === 'function' && param.success(res)
                }
                else if ( res.status === 10 ){
                    _this.doLogin()
                }
                else if ( res.status === 1 ){
                    typeof param.error === 'function' && param.error(res.msg)
                }
            },
            error   : function(err){
                typeof param.error === 'function' && param.error(err.statusText)
            } 
        })
    },
    //get server url
    getServerUrl: function(path) {
        return conf.serverHost + path
    },
    //get param of url query
    getUrlParam: function(name) {
        var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)')
        var result = window.location.search.substr(1).match(reg)
        return result ? decodeURIComponent(result[2]) : null
    },
    renderHTML: function(template, data) {
        var temp = Hogan.compile(template)
        var res  = temp.render(data)
        return res
    },
    successTip: function(msg){
        alert( msg || 'success operation')
    },
    errTip: function(msg){
        alert( msg || 'error alert')
    },
    validate: function(value, type){
        value = $$.trim(value)
        if(type === 'require') {
            return !!value
        }
        else if(type === 'email'){
            return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(value)
        }
        else if(type === 'phone'){
            return /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/.test(value)
        }
    },
    goHome: function(){
        window.location.href = './index.html'
    },
    doLogin : function(){
        window.location.href = './login.html?redirect=' + encodeURIComponent(window.location.href)
    }
}

module.exports = _mm