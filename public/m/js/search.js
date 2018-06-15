
var letao;
$(function() {
    // 声明一个函数
    letao = new Letao();

    letao.addHistory();
    letao.queryHistory();
    letao.deleteHistory();
    letao.clearHistory();

})

// 声明一个构造函数, 在原型上添加方法
var Letao = function() {
  
}
Letao.prototype = { 
    // 添加历史记录
    addHistory: function() {
        $('.btn-search').click(function() {
            // 拿到搜索框里面的文字
            var search = $('.input-search').val();
            console.log(search);
            // 如果没有输入文字 就不执行后面的代码
            if(!search.trim()) {
                alert('请输入商品...');
                return;
            }
            // 获取已经存储的数据
            var arr = window.localStorage.getItem('searchData');
            // 声明一个id 作为后面删除的条件
            var id = 0;
            // 判断里面有没有值
            if(arr && JSON.parse(arr).length > 0) {
                // 把值通过JSON.parse(arr)把JSON字符串转成数组
                arr = JSON.parse(arr);
                id = arr[arr.length - 1].id + 1
            }else {
                // 没有就变成一个空数组
                arr = [];
                id = 0;
            }
            // 声明变量, 看看后面有没有重复的文字
            var flag = false;
            for(var i=0; i<arr.length; i++) {
                if(arr[i].search == search) {
                    flag = true;
                }
            }
            // 不重复 才放进数组里面
            if(flag == false) {
                arr.push({
                    'search': search,
                    "id": id
                })
            }

            // 把arr转成JSON字符串存储到本地存储中
            window.localStorage.setItem("searchData",JSON.stringify(arr));
            // 查询后刷新页面
            letao.queryHistory();

            window.location.href = 'productlist.html?search='+search;
        })

    },

    queryHistory: function() {
        // 获取当前的数据
        var arr = window.localStorage.getItem("searchData");

        // 判断arr是否有值
        if(arr && JSON.parse(arr).length > 0) {
            arr = JSON.parse(arr);
        }else {
            arr = [];
        }
        // 调用模板引擎 生成标签
        var html = template('searchListtmp', {'rows':arr});
        // 添加到页面上
        $('.content').html(html);
    },

    deleteHistory: function() {
        
        $('.content').on('click','.btn-delete',function (e) {
            //e.preventDefault();
            // 得到当前点击的id
            var id = $(this).data("id");
            // 获取当前的数据
            var arr = window.localStorage.getItem("searchData");
            // 判断是否有值
            if(arr && JSON.parse(arr).length > 0) {
                arr = JSON.parse(arr);
            }else {
                arr = [];
            }
            // 循环所有的对象 
            for(var i=0; i< arr.length; i++) {
                // 判断哪个id和点击的相等
                if(arr[i].id == id) {
                    // arr.splice(i, 1);
                    // 数组的删除方法  i: 删除的数据的下标   1: 删除的数量
                    arr.splice(i, 1);
                }
            }
            // 把删除后的数组重新存储到本地存储
            window.localStorage.setItem("searchData", JSON.stringify(arr));
            // 刷新页面
            letao.queryHistory();
        })
    },

    clearHistory: function() {

        $('.btn-clear').click(function() {
            // 把里面的数据弄成空
            window.localStorage.setItem("searchData", "");
            // 刷新页面
            letao.queryHistory();
        })
    }
    
}