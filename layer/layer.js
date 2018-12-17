(function ($) {
  $.fn.dialog = function(options, callBack){
    var This = this;
    var $this = $(this);
    var defaults = {
      //各种参数、各种属性
      buttons: ['确定', '取消'],
      content: '提交信息',
      showCloseIcon: true,
      title: '提示',
      hint: '确定提交信息？'
    };
    var btnIndex = '';
    var opt = $.extend(defaults, options||{});

    var init = function () {
      This.layerMask = $('<div class="layer-mask"></div>').appendTo($('body'))
      This.layerBox = $('<div class="layer-box"></div>').appendTo($this)
      This.layerTitle = $('<div class="layer-title">' + opt.title + '</div>').appendTo(This.layerBox)
      if (opt.showCloseIcon) {
        This.closeIcon = $('<div class="layer-close">X</div>').appendTo(This.layerBox)
      }
      $('<div class="layer-hint">'+ opt.hint +'</div>').appendTo(This.layerBox)
      var btnHtml = '';
      for (var i=0; i<opt.buttons.length; i++){
        btnHtml += '<a href="javascript:;">' + opt.buttons[i] + '</a>'
      }
      This.layerBtn = $('<div class="layer-footer"></div>').appendTo(This.layerBox).append(btnHtml)
    }

    var getBtnIndex = function(name){
      //获取点击的索引
      var btnName = name || '';
      for(var i = 0;i<opt.buttons.length;i++){
        if(btnName === opt.buttons[i]){
           btnIndex = i;
        }
      }
    }

    init();
    if(opt.showCloseIcon){
      This.closeIcon.on('click',function(){
        This.layerBox.remove()
        This.layerMask.remove()
      })
    }

    // 点击的回调
    console.log(This)
    This.layerBtn.children().on('click',function () {
      getBtnIndex($(this).html())
      console.log(btnIndex)
      var btnReturn = {
        index: btnIndex
      }
      if(typeof(callBack) === 'function'){
        //执行回调函数
        // callBack(btnReturn);
        if (btnReturn.index === opt.buttons.length-1) {
          This.layerBox.remove()
          This.layerMask.remove()
        } else {
          callBack(btnReturn);
          This.layerBox.remove()
          This.layerMask.remove()
        }

      }
    })




    return This;
  }
})(jQuery);


