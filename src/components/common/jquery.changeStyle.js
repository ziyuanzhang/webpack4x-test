
$.fn.changeStyle = function(colorStr){
    this.css("color", colorStr);
  }
  //https://www.cnblogs.com/Gbeniot/p/7234570.html
 //使用命名空间--虽然在jQuery命名空间中，我们禁止使用了大量的javaScript函数名和变量名。但是仍然不可避免某些函数或变量名将于其他jQuery插件冲突，因此我们习惯将一些方法封装到另一个自定义的命名空间。

jQuery.myPlugin = {           
    foo:function() {           
        console.log('from jquery plugin:This is a test. This is only a test.');           
    },           
    bar:function(param) {           
      console.log('from jquery plugin:This function takes a parameter, which is "' + param + '".');     
    }          
};   
//采用命名空间的函数仍然是全局函数，调用时采用的方法：   
$.myPlugin.foo();          
$.myPlugin.bar('baz');
//-------jQuery.extend(object) ,一个参数的用于扩展jQuery类本身，也就是在jQuery类/命名空间上增加新函数，或者叫静态方法，例如jQuery内置的 ajax方法都是用jQuery.ajax()这样调用的，有点像 "类名.方法名" 静态方法的调用方式。---------------
jQuery.extend({
  "maxValue":function(a,b){
    return a > b ? a : b;
  },
  "minValue":function(a,b){
    return a < b ? a : b;
  }
})
var i = 100; j = 101;
var min_v = $.minValue(i, j); // min_v 等于 100
var max_v = $.maxValue(i, j); // max_v 等于 101
//-------原来 jQuery.fn = jQuery.prototype，也就是jQuery对象的原型。那jQuery.fn.extend()方法就是扩展jQuery对象的原型方法。我们知道扩展原型上的方法，就相当于为对象添加"成员方法"，类的"成员方法"要类的对象才能调用，所以使用 jQuery.fn.extend(object)扩展的方法， jQuery类的实例可以使用这个"成员函数"。jQuery.fn.extend(object)和jQuery.extend(object)方法一 定要区分开来。-----------------
//闭包限定命名空间
(function ($) {
  $.fn.extend({
    "highLight": function (options) {
      if (!isValid(options)){
        return this;
      }
      var opts = $.extend({}, defaluts, options); //使用jQuery.extend 覆盖插件默认参数
      return this.each(function () { //这里的this 就是 jQuery对象。这里return 为了支持链式调用
        //遍历所有的要高亮的dom,当调用 highLight()插件的是一个集合的时候。
        var $this = $(this); //获取当前dom 的 jQuery对象，这里的this是当前循环的dom
        //根据参数来设置 dom的样式
        $this.css({
          backgroundColor: opts.background,
          color: opts.color
        });
      });
    }
  });
  //默认参数
  var defaluts = {
    color: 'red',
    background: 'yellow'
  };
   //私有方法，检测参数是否合法
   function isValid(options) {
    return !options || (options && typeof options === "object") ? true : false;
  }
})(window.jQuery);
//调用：$('p').highLight({color: 'orange', background: '#ccc' })