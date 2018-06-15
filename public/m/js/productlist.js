var letao;
$(function() {
    letao = new Letao();
    letao.initPullRefresh();
    letao.searchProductList();
    letao.productSort();
    search = getQueryString('search');
    console.log(search);
    letao.getProdcutList({
        proName: search
    }, function(backData) {
        var data = template("productListTmp", backData);
        $(".content .mui-row").html(data);
    })
});

var search;
var page = 1;
var Letao = function() {

}

Letao.prototype = {
    initPullRefresh: function() {
        mui.init({
            pullRefresh : {
              container:"#refreshContainer",//下拉刷新容器标识，querySelector能定位的css选择器均可，比如：id、.class等
              down : {
                
                callback :function() {
                    setTimeout(function() {
                        // 调用函数, 渲染页面
                        letao.getProdcutList({
                            proName: search // 传入当前输入框的文字, 继续显示相同的数据
                        }, function(backData) {

                            var data = template("productListTmp", backData);
                            $(".content .mui-row").html(data);
                            // 结束刷新
                            mui('.mui-scroll-wrapper').pullRefresh().endPulldownToRefresh();
                            // 初始化下拉加载的函数
                            mui('.mui-scroll-wrapper').pullRefresh().refresh(true);
                            // 页码重新变回1
                            page = 1;
                        })
                    },1500)
                }
              },
              up : {
                
                callback : function() {
                    setTimeout(function() {
                         // 调用函数, 渲染页面
                        letao.getProdcutList({
                            proName: search, // 传入当前输入框的文字, 继续显示相同的数据
                            page: ++page  // 显示不同页码的数据
                        }, function(backData) {

                            var data = template("productListTmp", backData);
                            $(".content .mui-row").append(data);

                            if(backData.data.length > 0) {
                                // 还有数据, 继续刷新数据
                                mui('.mui-scroll-wrapper').pullRefresh().endPullupToRefresh();
                            }else {
                                // 没有了, 显示没有数据了
                                mui('.mui-scroll-wrapper').pullRefresh().endPullupToRefresh(true);
                            }
                        })

                    },1500);
                } 
                    
              }
            }
        });
    },

    searchProductList: function() {
        $(".main .btn-search").on('tap',function() {
            // 获取搜索框的val值
            search = $(".input-search").val();
            // 调用函数
            letao.getProdcutList({
                proName: search // 传入搜索框的值
            },function(backData) {
                // 渲染页面
                var data = template("productListTmp", backData);
                $(".content .mui-row").html(data);
            });
        })
    },

    getProdcutList: function(obj, fn) {

        $.ajax({
            url: "/product/queryProduct",
            data: {
                page: obj.page || 1,
                pageSize: obj.pageSize || 2,
                proName: obj.proName,
                price: obj.price,
                num: obj.num
            },
            
            success: function(backData) {
                // 如果传入了回调函数, 才会调用
                if(fn) {
                    fn(backData);
                }
            }
        })
    },

    productSort: function() {
        // 商品页面 "价格和销量的排序"
        $('.title .mui-row').on('tap','a', function() {
            // 获取之定义属性, 得到不同的type值, 在下面进行判断
            var sortType = $(this).data('sort-type');
            // 获取之定义属性, 得到不同的sort值, 在下面进行判断
            var sort = $(this).data('sort');
            // 判断
            if(sort == 1) {
                sort = 2;
            }else {
                sort = 1;
            }
            // 重新给这个属性赋值
            $(this).attr("data-sort", sort);
            // 如果是价格
            if(sortType == "price") {
                letao.getProdcutList({
                    proName: search,
                    price: sort // 接口文档的排序
                }, function(backData) {

                    var data = template("productListTmp", backData);
                    $(".content .mui-row").html(data);
                })
            }else if(sortType == "num") { // 如果是销量
                letao.getProdcutList({
                    proName: search,
                    num: sort // 接口文档的排序
                }, function(backData) {
                    
                    var data = template("productListTmp", backData);
                    $(".content .mui-row").html(data);
                })
            }
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
