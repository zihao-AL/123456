
 var letao;
 $(function() {
     letao = new Letao();
     letao.queryCategory();
     letao.addCategory();
     letao.getPage();
 })
 
 var Letao = function() {
 
 }
 var page = 1;
 var pageSize = 5;
 Letao.prototype = {
    queryCategory: function() {
         
        $.ajax({
            url: "/category/queryTopCategoryPaging",
            data: {
                page: page,
                pageSize: pageSize
            },
            success:function(backData) {
                console.log(backData);

                backData.pageTotal = backData.rows.length;

                var pageMin = page;
                var pageMax = 5;

                if(Math.ceil(backData.pageTotal / backData.size) > 5) {
                    pageMax = pageMin + 5;
                }

                var arr = [];
                for(var i=page; i<=pageMax; i++) {
                    arr.push(i);
                }
                backData.pageCount = arr;
                console.log(backData.pageCount.length);
                var html = template('pagingTmp', backData);
                $('.paging').html(html);


                var data = template('queryCategoryTmp', backData);
                $('.profile tbody').html(data);
            }
        }) 
         
     },

     addCategory: function() {
        $(".btn-add").click(function() {
            var categoryName = $(".categoryName").val();
            
            $.ajax({
                url: "/category/addTopCategory",
                type: 'post',
                data: {
                    categoryName: categoryName
                },
                success: function(backData) {
                    if(backData.success) {
                        letao.queryCategory();
                    }else {
                        window.location.href = "login.html";
                    }
                }
            })
        })
     },
 
     getPage: function() {
         $('.paging').on('click', '.pagination a', function() {
             page = $(this).data('page');
             letao.queryCategory();
         })
     },
     
 }
 
 