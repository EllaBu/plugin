$(function () {
  $.extend({
    openLayer: function (opt) {
      var defaults = {
        //各种参数、各种属性
        btns: ['确定', '取消'],
        content: '提交信息'
      };

      //options合并到defaults上,defaults继承了options上的各种属性和方法,将所有的赋值给endOptions
      var options = $.extend(defaults, opt)

      var btnHtml = ''
      for (var i = 0; i< options.btns.length; i++) {
        btnHtml += '<a class="layer-btn' + i + '" href="javascript:;">' + options.btns[i] + '</a>'
      }

      var layerHtml = '<div class="layer-self">' +
        '<div class="layer-box">' +
          '<div class="title">' +
            '<span>提示</span>' +
            '<a href="javascript:;">X</a>' +
          '</div>' +
          '<div class="content">' + options.content + '</div>' +
          '<div class="footer">' +
            btnHtml +
          '</div>' +
        '</div>' +
      '</div>'

      return $('body').append(layerHtml);
    }
  })
})

