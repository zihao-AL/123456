$(function() {
    var letao = new Letao();
    letao.login();
})

var Letao = function() {

}

Letao.prototype = {
    login: function() {
        $('.btn-login').click(function() {
            var username = $('#username').val();
            if(!username) {
                alert('请输入用户名');
                return;
            }
            var password = $('#password').val();
            if(!password) {
                alert('请输入密码');
                return;
            }
            $.ajax({
                url: "/employee/employeeLogin",
                type: 'post',
                data: {
                    username: username,
                    password: password
                },
                success: function(backData) {
                    if(backData.success) {
                        window.location.href = "index.html";
                    }else {
                        alert(backData.message);
                    }
                }
            })
            
        })
    }
}

