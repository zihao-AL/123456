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

                        letao.getProdcutList({
                            proName: search
                        }, function(backData) {

                            var data = template("productListTmp", backData);
                            $(".content .mui-row").html(data);

                            mui('.mui-scroll-wrapper').pullRefresh().endPulldownToRefresh();

                            mui('.mui-scroll-wrapper').pullRefresh().refresh(true);

                            page = 1;
                        })
                    },1500)
                }
              },
              up : {
                
                callback : function() {
                    setTimeout(function() {

                        letao.getProdcutList({
                            proName: search,
                            page: ++page
                        }, function(backData) {

                            var data = template("productListTmp", backData);
                            $(".content .mui-row").append(data);

                            if(backData.data.length > 0) {
                                mui('.mui-scroll-wrapper').pullRefresh().endPullupToRefresh();
                            }else {
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
            
            search = $(".input-search").val();
            
            letao.getProdcutList({
                proName: search
            },function(backData) {

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

                if(fn) {
                    fn(backData);
                }
            }
        })
    },

    productSort: function() {
        $('.title .mui-row').on('tap','a', function() {
            var sortType = $(this).data('sort-type');
            // console.log(sortType);
            var sort = $(this).data('sort');
            console.log(sort);
            if(sort == 1) {
                sort = 2;
            }else {
                sort = 1;
            }
            $(this).attr("data-sort", sort);
            if(sortType == "price") {
                letao.getProdcutList({
                    proName: search,
                    price: sort
                }, function(backData) {

                    var data = template("productListTmp", backData);
                    $(".content .mui-row").html(data);
                })
            }else if(sortType == "num") {
                letao.getProdcutList({
                    proName: search,
                    num: sort
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
