

function walk(nodes, data) {
    if (!nodes) { return; }
    $.each(nodes, function (id, node) {
        if (node.user) {
            //father
            var obj = {
                id: id,
                text: node.user.wxOpenid,
                tags: [node.friends.length > 0 ? node.friends.length + ' child elements' : '']
            };
            if (node.friends.length > 0) {
                obj.nodes = [];
                walk(node.friends, obj.nodes);
            }
            data.push(obj);
        }
        else
        {
            //the last children
                var obj = {
                id: id,
                text: node.wxOpenid
            };
            obj.nodes = [];
           data.push(obj);
        }

    });
}


function loadLifeCircle() {

    //http://ifc.dressbook.cn/wdOrdersGet.json?user_id=1095550
    let dbkUrl = "http://ifc.dressbook.cn";

    $.ajax({
        url: dbkUrl + "/wdUsersFriendShipGet.jsonp",
        data: "user_id=1095492",
        type: "GET",
        async: true,
        dataType: 'JSONP',
        success: function (data) {
            console.log(JSON.stringify(data));
            if (data.code == 1) {

                var circle = [];
                walk(data.info.friends, circle);

                $('#treeview6').treeview({
                    color: "#428bca",
                    expandIcon: "glyphicon glyphicon-stop",
                    collapseIcon: "glyphicon glyphicon-unchecked",
                    showTags: true,
                    data: circle
                });

            }
        }
    });
}
