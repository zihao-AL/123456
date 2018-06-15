var letao;
$(function() {
    // 声明一个函数
    letao = new Letao();
    letao.queryUser();
    letao.logout();
    
  })
  
// 声明一个构造函数, 在原型上添加方法
var Letao = function() {
  
}
  
Letao.prototype = {
    queryUser: function() {
        $.ajax({
            url: "/user/queryUserMessage",
            success: function(backData) {
                if(backData.error) {
                    window.location.href = "login.html";
                }else {
                    $('.mui-media-body .user').html(backData.username);
                    $('.mui-media-body .mobile').html(backData.mobile);
                }
            }
        })
    },

    logout: function() {
        $('.btn-logout').on('tap', function() {

            $.ajax({
                url: "/user/logout",
                success: function(backData) {
                    if(backData.success) {
                        window.location.href = "login.html";
                    }else {
                        mui.toast('退出失败',{ duration:'short', type:'div' }); 
                    }
                }
            })
        })
    }

}

  
  