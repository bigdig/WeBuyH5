var order = {}

function genOrder(){

    //异步获取数据

  //http://ifc.dressbook.cn/wtWdGoodsBuy.json?user_id=1095550&address_id=302&store_id=1&goodsSet_id=1
    var dbkUrl = "http://ifc.dressbook.cn";

    $.ajax({
        url: dbkUrl + "/wtWdGoodsBuy.jsonp",
        data: "user_id="+user.user_id + "&address_id=302" + "&store_id=1" +"&goodsSet_id=1",
        type: "GET",
        async: true,
        dataType: 'JSONP',
        success: function (data) {
            console.log(JSON.stringify(data));
            if (data.code == 1) {
                order = data.info;
            }     
        }
    });
}

function cancleOrder(order_id){

    var dbkUrl = "http://ifc.dressbook.cn";

    $.ajax({
        url: dbkUrl + "/wtWdGoodsDel.jsonp",
        data: "order_id="+order_id,
        type: "GET",
        async: true,
        dataType: 'JSONP',
        success: function (data) {
            console.log(JSON.stringify(data));
            if (data.code == 1) {
                order = data.info;
            }     
        }
    });
}