var _mm = require('util/mm')
var $$ = require('jquery')
var _address = require('service/address-service.js')
var template = require('./address-modal.string')
var _cities = require('util/cities/index.js')

var _modal = {
    show: function(options){
        this.$container = $$('.order-modal')
        this.options = options
        this.renderModal()
        this.bindEvent()

    },
    renderModal: function(){
        var _this = this, html = ''
        //check if it is edit or add new address
        _this.$container.html(_mm.renderHTML(template, {
            isUpdate: _this.options.isUpdate,
            data: _this.options.data
        }))
        
        
        // render province selections
        this.loadProvinces()
       
    },

    bindEvent: function(){
        var _this = this
        $$('#modal-province').change(function(){
            var selectedProvince = $$(this).val()
            _this.loadCities(selectedProvince)
        })
        $$('.modal-container').click(function(e){
            e.stopPropagation()
        })
        $$('.close').click(function(){
            _this.hide()
        })
        $$('.modal-footer .btn').click(function(){
            var result = _this.getReceiverInfo()
            if(result.status){
                if(!_this.options.isUpdate){
                    _address.save(result.data, function(res){
                        _this.hide()
                        _this.options.onSuccess()
                    }, function(errMsg){
                        _mm.errTip(errMsg)
                    })
                }else{
                    result.data.id = _this.options.data.id
                    _address.update(result.data, function(res){
                        _this.hide()
                        _this.options.onSuccess()
                    }, function(errMsg){
                        _mm.errTip(errMsg)
                    })
                }
            }else{
                _mm.errTip(result.msg || 'Something unexpected happened...')
            }
        })
    },

    //load provinces data to select element
    loadProvinces: function(){
        var _this = this
         $$('#modal-province').html(this.renderSelectOptions(_cities.getProvinces()))
         if(_this.options.isUpdate){
            $$('#modal-province').val(_this.options.data.receiverProvince)
            _this.loadCities(_this.options.data.receiverProvince)
            $$('#modal-city').val(_this.options.data.receiverCity)
         }
    },
    //load cities data to select element
    loadCities: function(data){
        $$('#modal-city').html(this.renderSelectOptions(_cities.getCities(data)))
    },
    //render options inside select of provinces or cities
    renderSelectOptions: function(data){
        var html = '<option value="">Please choose</option>'
            
        for(var i = 0, length = data.length; i < length; i++){
            html += '<option value="' + data[i] + '">' + data[i] + '</option>'
        }
        
        return html
    },
    //get data from the from
    getReceiverInfo: function(){
        var result = {}
        result.status = false
        result.data = {
            receiverName: $$('#modal-name').val(),
            receiverProvince: $$('#modal-province').val(),
            receiverCity: $$('#modal-city').val(),
            receiverAddress: $$('#modal-address').val(),
            receiverPhone: $$('#modal-phone').val()
        }
        if(!result.data.receiverName){
            result.msg = 'Please input name!'
            return result
        }
        if(!result.data.receiverProvince){
            result.msg = 'Please input your province!'
            return result
        }
        if(!result.data.receiverCity){
            result.msg = 'Please input your city!'
            return result
        }
        if(!result.data.receiverAddress){
            result.msg = 'Please input address!'
            return result
        }
        if(!result.data.receiverPhone){
            result.msg = 'Please input phone number!'
            return result
        }

        result.status = true
        return result

    },
    hide: function(){
        this.$container.empty()
    }
}
module.exports = _modal