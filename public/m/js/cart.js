var letao;
$(function() {
    // 声明一个函数
    letao = new Letao();
    letao.queryCart();
    letao.deleteCart();
    letao.updateCart();
    letao.getSum();
    
  })
  
  // 声明一个构造函数, 在原型上添加方法
var Letao = function() {
  
}
  
Letao.prototype = {

    queryCart: function() {
        $.ajax({
            url: "/cart/queryCart",
            success: function(backData) {

                if(backData.error) {
                    window.location.href = "login.html";
                }else {
                    var data = template('cartTmp', {'rows': backData});
                    $('#main .mui-table-view').html(data);
                    
                    // 调用计算总金额的方法
                    letao.getSum();
                }
            }
        })
    },
    deleteCart: function() {
        $('#main').on('tap','.btn-delete', function() {
            var id = $(this).parent().data('id');
            $.ajax({
                url: "/cart/deleteCart",
                data: {
                    id: id
                },
                success: function(backData) {
                    if(backData.success) {
                        letao.queryCart();
                    }else {
                        mui.toast('删除失败', { duration: 'short', type: 'div' });
                    }
                }
            })
        })
    },

    updateCart: function() {
        $('#main').on('tap','.btn-edit', function() {

            var product = {
                id : $(this).parent().data('id'),
                productNum : $(this).parent().data('product-num'),
                num : $(this).parent().data('num'),
                productSize : $(this).parent().data('product-size'),
                size : $(this).parent().data('size')
            }
            

            var start = product.productSize.split('-')[0]-0;
            var end = product.productSize.split('-')[1]-0;
            var arr = [];
            for(var i = start; i <= end; i++) {
                arr.push(i);
            }
            product.productSize = arr;
            
            var html = template('updateTmp', product);
            html = html.replace(/(\r)?\n/g, "");
            mui.confirm(html, '温馨提示', ['确定', '取消'], function(e) {
                if(e.index == 0) {

                    var nowSize = $('.btn-size.active').data('size');

                    var nowNum = mui('.mui-numbox').numbox().getValue();

                    $.ajax({
                        url: "/cart/updateCart",
                        data: {
                            id: product.id,
                            size: nowSize,
                            num: nowNum
                        },
                        type: 'post',
                        success: function(backData) {
                            if(backData.success) {
                                letao.queryCart();
                            }
                        }
                    })
                }else {
                    letao.queryCart();
                }
            })

            //6. 渲染完毕后去初始化数字框
            mui('.mui-numbox').numbox();

            letao.selectSize();

        })
    },
    selectSize: function() {
        $('body').on('tap', '.btn-size', function() {
            $(this).addClass('active').siblings().removeClass('active');
        })
    },
    getSum: function() {
        getAllSum();

        $('#main').on('change', "input[type='checkbox']", function() {
            getAllSum();
        })
        function getAllSum() {
            var checkeds = $('input[type="checkbox"]:checked');
            var sum = 0;
            checkeds.each(function (i, e) {
                var price = $(e).data('price');
                var num = $(e).data('num');
                var productSum = price * num;
                sum += productSum;
            })
            sum = sum.toFixed(2);
            $('.sum').html(sum);
           
        }
    }
}

  