$(function() {
  // 声明一个函数
  var letao = new Letao();
  // 首页的轮播图滚动
  letao.initSlide();
  // 首页的区域滚动
  letao.initScroll();
})

// 声明一个构造函数, 在原型上添加方法
 var Letao = function() {

 }

 Letao.prototype = {

    initSlide: function() {
        // 轮播图计时器启动
        var gallery = mui('.mui-slider');
        gallery.slider({
          interval:2000//自动轮播周期，若为0则不自动播放，默认为0；
        });
    },

    initScroll: function() {
      var options = options = {
        scrollY: true, //是否竖向滚动
        scrollX: false, //是否横向滚动
        startX: 0, //初始化时滚动至x
        startY: 0, //初始化时滚动至y
        indicators: true, //是否显示滚动条
        deceleration:0.0006, //阻尼系数,系数越小滑动越灵敏
        bounce: true //是否启用回弹
       }
       mui('.mui-scroll-wrapper').scroll(options);
    }
 }

