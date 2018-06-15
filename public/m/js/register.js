var letao;
$(function() {
    // 声明一个函数
    letao = new Letao();
    
    letao.addRegister();

    letao.getVcode();
    
})
// 声明一个变量来接收验证码
var vcode = "";

// 声明一个构造函数, 在原型上添加方法
var Letao = function() {
  
}
  
Letao.prototype = {

    getVcode: function() {
        $('.get-Vcode').on('tap', function() {
            var code = $('.vcode').val();
            $.ajax({
                url: "/user/vCode",
                success: function(backData) {
                    vcode = backData.vCode;
                    console.log(vcode);
                }
            })
        })
    },

    addRegister: function() {
        $('.btn-register').on('tap', function() {
            var mobile = $('.mobile').val();
            if(!mobile) {
                mui.toast('请输入手机号',{ duration:'short', type:'div' });
                return;
            }
            var username = $('.username').val();
            if(!username) {
                mui.toast('请输入用户名',{ duration:'short', type:'div' });
                return;
            }
            var password1 = $('.password1').val();
            if(!password1) {
                mui.toast('请输入密码',{ duration:'short', type:'div' });
                return;
            }
            var password2 = $('.password2').val();
            if(password1 != password2) {
                mui.toast('两次密码不一致',{ duration:'short', type:'div' });
                return;
            }
            var vCode = $('.vcode').val();
            if(!vCode) {
                mui.toast('请输入验证码',{ duration:'short', type:'div' });
                return;
            }else if(vCode != vcode) {
                mui.toast('验证码输入错误',{ duration:'short', type:'div' });
                return;
            }


            $.ajax({
                url: "/user/register",
                type: "post",
                data: {
                    username: username,
                    password: password1,
                    mobile: mobile,
                    vCode: vCode
                },
                success: function(backData) {
                    if(backData.success) {
                        window.location.href = "login.html";
                    }else {
                        mui.toast(backData.message,{ duration:'short', type:'div' });
                    }
                }
            })
        })
    }
}


  
  