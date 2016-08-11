
mui.ajax(url, {
    data: {
        userid: userid,
        type: '1'
    },
    dataType: 'JSONP',//服务器返回json格式数据
    type: 'get',//HTTP请求类型
    timeout: 10000,//超时时间设置为10秒；
    success: function (data) {
        //服务器返回响应，根据响应结果，分析是否登录成功；
        var result = eval(data);
        result = eval(result);
        if (result != null) {
            var x = 0;
            var value = result[0].value;
            var hcount = result[0].count;
            var appsize = result[0].appsize;
            mui('#pullrefresh').pullRefresh().endPullupToRefresh((++count > value)); //参数为true代表没有更多数据了。
            var table = document.body.querySelector('.mui-table-view');
            var cells = document.body.querySelectorAll('.mui-table-view-cell');
            if (hcount > cells.length) {
                for (var i = cells.length, len = i + appsize; i < len; i++) {
                    var li = document.createElement('li');
                    li.className = 'mui-table-view-cell';
                    /*var contacts = result[0].page[i].contacts*/
                    /*console.log(result[0].page[0].contacts)*/
                    var contacts = result[0].page[i].contacts
                    var contact;
                    var divp;
                    if (contacts == 1)
                        contact = "<a id=" + result[0].page[i].id + " class='mui-btn mui-btn-bule'>企业联系人</a>"
                    if (contacts == 0)
                        contact = "<a id=" + result[0].page[i].id + " class='mui-btn mui-btn-col'>企业联系人</a>"
                    if (contacts == 1)
                        divp = "<p class='mui-pull-left pl-bule'>企业联系人</p>"
                    if (contacts == 0)
                        divp = ""
                    li.innerHTML = '<div class="mui-slider-right mui-disabled" id="">' + contact + '<a id="' + result[0].page[i].id + '" class="mui-btn mui-btn-red">移除</a></div><div class="mui-slider-handle"><img class="mui-media-object mui-pull-left radius" src="/' + result[0].page[i].headimg + '"><div class="mui-media-body"><div class="mui-pull-left mui-ellipsis pl-name">' + result[0].page[i].nickname + '</div>' + divp + '</div><div class="mui-media-body"><p class="mui-pull-left">' + result[0].page[i].updatetime + '</p></div></div>'
                    table.appendChild(li);
                }
            }

        }

    },
    error: function (xhr, type, errorThrown) {
        //异常处理；
        console.log("没网了~~~~~~或者服务器断了~~");
    }
});