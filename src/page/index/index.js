/*
* @Author: ytan1
* @Date:   2018-03-05 15:24:06
* @Last Modified by:   ytan1
* @Last Modified time: 2018-03-13 11:34:07
*/

import './index.css'
var _mm = require('util/mm.js')
import 'page/common/header/header.js'
import 'page/common/nav/nav.js'
import 'slick-carousel/slick/slick.min.js'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
var navSide = require('page/common/nav-side/nav-side.js') 
// var bannerTemp = require('./banner.string')
var $$ = require('jquery')

$$(function(){
    $$('.banner').slick({
        autoplay: true,
        slidesToShow:1,
        slidesToScroll:1,
        dots: true,
        appendDots: $$('.banner-dots'),
        pauseOnDotesHover: true,
        cssEase: 'linear',
        fade: true,
        prevArrow: '<i class="prev-arrow fa fa-arrow-left"></i>',
        nextArrow: '<i class="next-arrow fa fa-arrow-right"></i>'
    })
})

