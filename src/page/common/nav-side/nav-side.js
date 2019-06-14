/*
* @Author: ytan1
* @Date:   2018-03-08 15:13:41
* @Last Modified by:   ytan1
* @Last Modified time: 2018-03-10 21:18:32
*/
var $$ = require('jquery')
require('./nav-side.css')
var _mm = require('util/mm.js')
var temp = require('./nav-side.string')
var navSide = {
    options: {
        name: '',
        navList: [
            { name: 'info', description: 'My Info', href: './user-center.html' },
            { name: 'orders', description: 'Confirmed Orders', href: './order-list.html' },
            { name: 'about', description: 'About', href: './about.html' },
            { name: 'pwd', description: 'Update Password', href: './user-update-password.html' },
        ]
    },
    init: function(option){
        $$.extend(this.options, option)
        this.renderList(this.options)
    },
    renderList: function(options){
        for(var i = 0, iLength = options.navList.length; i < iLength; i++){
            if(options.navList[i].name === options.name){
                options.navList[i].isActive = true
            }
        }

        var html = _mm.renderHTML(temp, {navList:options.navList})
        $$('.nav-side').html(html)
    }
}
module.exports = navSide