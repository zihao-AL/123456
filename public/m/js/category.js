$(function() {
    // 声明一个函数
    var letao = new Letao();
    // 首页的区域滚动
    letao.initScroll();

    letao.getmainLeft();

    letao.getmainRight();
})

// 声明一个构造函数, 在原型上添加方法
var Letao = function() {
  
}
Letao.prototype = { 
    initScroll: function() {
        var options = options = {
          scrollY: true, //是否竖向滚动
          scrollX: false, //是否横向滚动
          startX: 0, //初始化时滚动至x
          startY: 0, //初始化时滚动至y
          indicators: false, //是否显示滚动条
          deceleration:0.0006, //阻尼系数,系数越小滑动越灵敏
          bounce: true //是否启用回弹
        }
        mui('.mui-scroll-wrapper').scroll(options);
    },

    getmainLeft: function() {

        $.ajax({
            url: "/category/queryTopCategory",
            success: function(backData) {
                // console.log(backData);
                var data = template('getmainleftTmp', backData);
                $('.main-left ul').html(data);
            }
        })
    },

    getmainRight: function() {

        getData(1);

        $('.main-left ul').on('click','a',function(e) {
            console.log(this);
            $(this).parent().addClass("active").siblings().removeClass("active");

            var id = $(this).data("id");
            getData(id);
        })


        function getData(id) {

            $.ajax({
                url: "/category/querySecondCategory",
                data: {
                    id: id
                },
                success: function(backData) {
                    var data = template("getmainrightTmp", backData);
                    console.log(data);
                    if(data) {
                        $('.main-right .mui-row').html(data);
                    }else {
                        $('.main-right .mui-row').html("<h4>实在给不了更多了!!!</h4>");
                    }
                }
            })

        }
    }
}


  
  