var letao;
$(function() {
    letao = new Letao();
    letao.queryUser();
    letao.updateUser();
    letao.getPage();
})

var Letao = function() {

}
var page = 1;
var pageSize = 5;
Letao.prototype = {
    queryUser: function() {
        
        $.ajax({
            url: "/user/queryUser",
            data: {
                page: page,
                pageSize: pageSize
            },
            success: function(backData) {
                console.log(backData);

                backData.pageTotal = backData.rows.length;
                var pageMin = page;

                var pageMax = 3;

                if(Math.ceil(backData.pageTotal / backData.size) > 5 ) {
                    pageMax = pageMin + 2;
                }
                var arr = [];

                for(var i=1; i<=pageMax; i++) {
                    arr.push(i);
                }
                backData.pageCount = arr;
                console.log(backData.pageCount);
                var data = template('pagingTmp', backData);
                $('.paging').html(data);

                var html = template('queryUserTmp', backData);
                $('.profile tbody').html(html); 
            }

        })
    },

    getPage: function() {
        $('.paging').on('click', '.pagination a', function() {
            page = $(this).data('page');
            letao.queryUser();
        })
    },
    updateUser: function() {
        $(".profile").on('click','.btn-update', function() {
            var id = $(this).data('id');
            var deleteId = $(this).data('delete');
            if (deleteId == 0) { 
                deleteId = 1;
            } else {
                deleteId = 0;
            }
            $.ajax({
                url: "/user/updateUser",
                data: {
                    id: id,
                    isDelete: deleteId
                },
                type: 'post',
                success:function(backData) {
                    
                    if(backData.success) {
                        console.log(backData);
                        letao.queryUser();
                    }else {
                        window.location.href = "login.html";
                    }
                }

            })
        })
    }
}