var letao;
var id;
$(function() {
    // 声明一个函数
    letao = new Letao();
    // 首页的轮播图滚动
    letao.initSlide();
    // 点击添加类名的方法
    letao.selectSize();
    // 获取页面传过来的值
    id = getQueryString("id");
    letao.getProductDetail(id);
    // 加入购物车
    letao.addCart();
    
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

    selectSize: function() {
        $('.container').on('tap', '.btn-size', function() {
            // 当前添加类名, 兄弟删除类名
            $(this).addClass("active").siblings().removeClass("active");
        })
    },

    getProductDetail: function(id) {
        $.ajax({
            url: "/product/queryProductDetail",
            data: {
                id: id // id是根据url传递过来的
            },
            success: function(backData) {

                // 借用数组的方法切割size字符串 获取size里面的第一个值 并做隐式转换为number
                var start = backData.size.split("-")[0] - 0;
                // 借用数组的方法切割size字符串 获取size里面的第二个值 并做隐式转换为number
                var end = backData.size.split("-")[1] - 0;
                // 声明一个空数组
                var arr = [];
                // 循环变量之间的数值  作为鞋子的尺码
                for(var i=start; i<=end; i++) {
                    arr.push(i);
                }
                // 重新给它赋值 覆盖以前的值
                backData.size = arr;
                // 根据id渲染对应的数据
                var data = template('productDetailTmp', backData);
                // 添加到页面上
                $(".main .container").html(data);
                // 初始化数字输入框 如果是动态生成的是不能点击 如果要点击需要再次初始化
                mui('.mui-numbox').numbox();

                // 渲染轮播图
                var sildeHtml = template('productSlideTmp', backData);
                $('.main .slide').html(sildeHtml);

                // 初始化轮播图
                letao.initSlide();
            }
        })
    },

    addCart: function() {
        $('.btn-add-cart').on('tap',function() {
            // 自定义属性
            var dataSize = $('.btn-size.active').data('size');
            // 如果没有值就触发判断条件
            if(!dataSize) {
                // toast第一个参数就是提示的内容 第二参数是一个对象duration提示时间 type类型div 
                mui.toast('请选择尺码',{ duration:'short', type:'div' }); 
                return;
            }
            //获取数字框选中的数字 使用MUI的方法
            var num = mui('.mui-numbox').numbox().getValue();
            // 如果没有值就触发判断条件
            if(!num) {
                // toast第一个参数就是提示的内容 第二参数是一个对象duration提示时间 type类型div 
                mui.toast('请选择数量',{ duration:'short', type:'div' }); 
                return;
            }

            $.ajax({
                url: "/cart/addCart",
                type: "post",
                data: {
                    productId: id,
                    num: num,
                    size: dataSize
                },
                success: function(backData) {
                    if(backData.success) {
                        mui.confirm("添加成功,是否去购物车查看?","温馨提示",['是','否'], function(e) {
                            if(e.index == 0) {
                                window.location.href = "cart.html";
                            }else if(e.index == 1) {
                                console.log('请继续购物');
                            }
                        })

                    }else {
                        window.location.href = "login.html";
                    }
                }

            })
            // 提示框  0 代表点击是 1 代表点击否
        })
    }


  
      
}

//获取url地址栏的参数的函数 网上找的  name就是url参数名
function getQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) {
        return decodeURI(r[2]);
    } else {
        return null;
    }
}
  
  