var letao;
$(function() {
    // 声明一个函数
    letao = new Letao();
    letao.login();
    
  })
  
  // 声明一个构造函数, 在原型上添加方法
var Letao = function() {
  
}
  
Letao.prototype = {
    login: function() {
        $(".btn-login").on('tap', function() {
            var username = $('.username').val();
            var password = $('.password').val();
            if(!username || !password) {
                mui.toast('请输入用户名和密码',{ duration:'short', type:'div' });
                return;
            }

            $.ajax({
                url: "/user/login",
                type: "post",
                data: {
                    username: username,
                    password: password
                },
                success: function(backData) {
                    if(backData.success) {
                        window.location.href = "user.html";
                    }else {
                        mui.toast(backData.message,{ duration:'short', type:'div' });
                    }
                }
            })
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
  
  