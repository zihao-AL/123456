
 var letao;
 $(function() {
     letao = new Letao();
     letao.queryCategory();
     letao.getPage();
     letao.getCategoryFirst();
     letao.addBrand();
 })
 
 var Letao = function() {
 
 }
 var page = 1;
 var pageSize = 5;
 Letao.prototype = {
    queryCategory: function() {
         
        $.ajax({
            url: "/category/querySecondCategoryPaging",
            data: {
                page: page,
                pageSize: pageSize
            },
            success: function(backData) {
                backData.pageTotal = backData.rows.length;
                 // 4. pageCount是总的页码数 = 总条数 / 每页大小  向上取整
                 var arr = [];
                 // 第一个了一个按钮起点  当前页面开始
                 var pageMin = page;
                 // 按钮终点  默认为1
                 var pageMax = 5;
                 if(Math.ceil(backData.total / backData.size)> 5)
                 {
                    //如果总页码数大于5  当前最大终点为起点+5  比如总页码数有15条 当前点到第五5  第5-10页的数据
                    pageMax = pageMin+5;
                 }
                 for (var i = page; i <= pageMax; i++) {
                     arr.push(i);
                 }
                 backData.pageCount = arr;//[1,2]
                 var html1 = template('pagingTmp',backData);
                 $('.paging').html(html1);


                var html = template("queryCategoryTmp", backData);
                $('.profile tbody').html(html);
            }
        })
     },
     getCategoryFirst: function() {
        $.ajax({
            url: "/category/queryTopCategoryPaging",
            data: {
                page: page,
                pageSize: 100
            },
            success: function(backData) {
                var html = template('selectCateTmp',backData);
                $('.select-category').html(html);
            }
        })
     },

    addBrand: function() {

        $('#myModal').on('change','.brand-logo', function() {
            var arr = $('.brand-logo').val().split('\\');
            var brandLogo = '/mobile/images/'+arr[arr.length-1];
            $('.brand-logo-img').attr('src',brandLogo);
        })

        $('#myModal').on('click', '.btn-add', function() {
            var categoryId = $('.select-category').val();
            var brandName = $('.input-brandName').val();
            var arr = $('.brand-logo').val().split('\\');
            var brandLogo = '/mobile/images/'+arr[arr.length-1];
            $.ajax({
                url: "/category/addSecondCategory",
                type: 'post',
                data: {
                    categoryId: categoryId,
                    brandName: brandName,
                    brandLogo: brandLogo,
                    hot: 1
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
 
 