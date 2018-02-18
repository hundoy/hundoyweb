//app.title = '嵌套环形图';

// 基于准备好的dom，初始化echarts实例
var pie_radius = ['15%', '20%', '27%'];
var pie_center = ['25%', '25%', '75%', '75%'];
var pie_center_y = ['40%', '90%'];

var normal_content =  {
    formatter: function(p){
        var rs = '{b|'+p.data.name+'：}'+p.data.value+'  {per|'+p.percent+'%}';
        if (p.data.name!="其他"){
            rs = '{guest_head_'+p.data.uid+'|} ' + rs;
        }
        return rs;
    },
    backgroundColor: '#eee',
        borderColor: '#aaa',
        borderWidth: 1,
        borderRadius: 4,
        rich: {
        b: {
            fontSize: 16,
                lineHeight: 33
        },
        per: {
            color: '#eee',
                backgroundColor: '#334455',
                padding: [2, 4],
                borderRadius: 2
        }
    }
};

var myChart = echarts.init(document.getElementById('main'));

var option = {
    title:[
        {
            text: '谁在评论我的原创微博',
            subtext: '中间的饼是综合情况',
            x: pie_center[0],
            y: pie_center_y[0],
            textAlign: 'center'
        }, {
            text: '谁在转发我的原创微博',
            subtext: '中间的饼是综合情况',
            x: pie_center[0],
            y: pie_center_y[1],
            textAlign: 'center'
        }, {
            text: '谁在给我的原创微博点赞',
            subtext: '中间的饼是综合情况',
            x: pie_center[2],
            y: pie_center_y[0],
            textAlign: 'center'
        }, {
            text: '综合情况饼',
            subtext: '',
            x: pie_center[2],
            y: pie_center_y[1],
            textAlign: 'center'
        }, {
            text: [
                '{master_head|} 我的名字'
            ].join('\n'),
            subtext: '如果“其他”太多，点击左侧最后的“其他”色块隐藏\n点击饼图上的人名，可以跳转到他的页面',
            // sublink: 'readme.html',
            x: '50%',
            y: '50%',
            textAlign: 'center',
            textStyle:{
                backgroundColor: '#ddd',
                borderColor: '#555',
                borderWidth: 1,
                borderRadius: 5,
                color: '#000',
                fontSize: 16,
                rich:{
                    master_head:{
                        height: 48,
                        align: 'left',
                        backgroundColor:{
                            image: 'image/heads/1084402932.jpg'
                        }
                    },
                    titleBg: {
                        // backgroundColor: '#000',
                        height: 48,
                        fontSize: 16,
                        align:'left',
                        verticalAlign: 'middle',
                        // borderRadius: [5, 5, 0, 0],
                        // padding: [0, 10, 0, 10],
                        width: '100%',
                        color: '#000'
                    },
                    hr: {
                        borderColor: '#777',
                        width: '100%',
                        borderWidth: 0.5,
                        height: 0
                    }
                }
            }
        }
    ],
    tooltip: {
        trigger: 'item',
        formatter: "{a} <br/>{b}: {c} ({d}%)"
    },
    legend: {
        orient: 'vertical',
        x: 'left',
        data:['直达','营销广告','搜索引擎','邮件营销','联盟广告','视频广告','百度','谷歌','必应','其他']
    },
    series: [
        // 左上饼
        {
            name:'综合得分',
            type:'pie',
            selectedMode: 'single',
            center: [pie_center[0], pie_center[1]],
            radius: [0, pie_radius[0]],

            label: {
                normal: {
                    position: 'inner'
                }
            },
            labelLine: {
                normal: {
                    show: false
                }
            },
            data:[
                {value:335, name:'直达', selected:true},
                {value:679, name:'营销广告'},
                {value:1548, name:'搜索引擎'}
            ]
        },
        {
            name:'评论者',
            type:'pie',
            center: [pie_center[0], pie_center[1]],
            radius: [pie_radius[1], pie_radius[2]],
            label: {
                normal: {
                    formatter: function(p){
                        var rs = '{b|'+p.data.name+'：}'+p.data.value+' {per|'+p.percent+'%}';
                        if (p.data.name!="其他"){
                            rs = '{guest_head_'+p.data.uid+'|} ' + rs;
                        }
                        return rs;
                    },
                    backgroundColor: '#eee',
                    borderColor: '#aaa',
                    borderWidth: 1,
                    borderRadius: 4,
                    rich: {
                        b: {
                            fontSize: 16,
                            lineHeight: 33
                        },
                        per: {
                            color: '#eee',
                            backgroundColor: '#334455',
                            padding: [2, 4],
                            borderRadius: 2
                        }
                    }
                }
            },
            data:[
                {value:335, name:'直达'},
                {value:310, name:'邮件营销'},
                {value:234, name:'联盟广告'},
                {value:135, name:'视频广告'},
                {value:1048, name:'百度'},
                {value:251, name:'谷歌'},
                {value:147, name:'必应'},
                {value:102, name:'其他'}
            ]
        }
        ,

        // 左下饼
        {
            name:'综合得分',
            type:'pie',
            selectedMode: 'single',
            radius: [0, pie_radius[0]],
            center: [pie_center[0], pie_center[3]],

            label: {
                normal: {
                    position: 'inner'
                }
            },
            labelLine: {
                normal: {
                    show: false
                }
            },
            data:[
                {value:335, name:'直达', selected:true},
                {value:679, name:'营销广告'},
                {value:1548, name:'搜索引擎'}
            ]
        },
        {
            name:'转发者',
            type:'pie',
            center: [pie_center[0], pie_center[3]],
            radius: [pie_radius[1], pie_radius[2]],
            label: {
                normal: {
                    formatter: function(p){
                        var rs = '{b|'+p.data.name+'：}'+p.data.value+'  {per|'+p.percent+'%}';
                        if (p.data.name!="其他"){
                            rs = '{guest_head_'+p.data.uid+'|} ' + rs;
                        }
                        return rs;
                    },
                    backgroundColor: '#eee',
                    borderColor: '#aaa',
                    borderWidth: 1,
                    borderRadius: 4,
                    rich: {
                        b: {
                            fontSize: 16,
                            lineHeight: 33
                        },
                        per: {
                            color: '#eee',
                            backgroundColor: '#334455',
                            padding: [2, 4],
                            borderRadius: 2
                        }
                    }
                }
            },
            data:[
                {value:335, name:'直达'},
                {value:310, name:'邮件营销'},
                {value:234, name:'联盟广告'},
                {value:135, name:'视频广告'},
                {value:1048, name:'百度'},
                {value:251, name:'谷歌'},
                {value:147, name:'必应'},
                {value:102, name:'其他'}
            ]
        }
        ,

        // 右上饼
        {
            name:'综合得分',
            type:'pie',
            selectedMode: 'single',
            center: [pie_center[2], pie_center[1]],
            radius: [0, pie_radius[0]],

            label: {
                normal: {
                    position: 'inner'
                }
            },
            labelLine: {
                normal: {
                    show: false
                }
            },
            data:[
                {value:335, name:'直达', selected:true},
                {value:679, name:'营销广告'},
                {value:1548, name:'搜索引擎'}
            ]
        },
        {
            name:'点赞者',
            type:'pie',
            center: [pie_center[2], pie_center[1]],
            radius: [pie_radius[1], pie_radius[2]],
            label: {
                normal: {
                    formatter: function(p){
                        var rs = '{b|'+p.data.name+'：}'+p.data.value+'  {per|'+p.percent+'%}';
                        if (p.data.name!="其他"){
                            rs = '{guest_head_'+p.data.uid+'|} ' + rs;
                        }
                        return rs;
                    },
                    backgroundColor: '#eee',
                    borderColor: '#aaa',
                    borderWidth: 1,
                    borderRadius: 4,
                    rich: {
                        b: {
                            fontSize: 16,
                            lineHeight: 33
                        },
                        per: {
                            color: '#eee',
                            backgroundColor: '#334455',
                            padding: [2, 4],
                            borderRadius: 2
                        }
                    }
                }
            },
            data:[
                {value:335, name:'直达'},
                {value:310, name:'邮件营销'},
                {value:234, name:'联盟广告'},
                {value:135, name:'视频广告'},
                {value:1048, name:'百度'},
                {value:251, name:'谷歌'},
                {value:147, name:'必应'},
                {value:102, name:'其他'}
            ]
        }

        ,

        // 右下饼
        {
            name:'综合得分',
            type:'pie',
            center: [pie_center[2], pie_center[3]],
            radius: [0, pie_radius[2]],
            label: {
                normal: {
                    formatter: function(p){
                        var rs = '{b|'+p.data.name+'：}'+p.data.value+'  {per|'+p.percent+'%}';
                        if (p.data.name!="其他"){
                            rs = '{guest_head_'+p.data.uid+'|} ' + rs;
                        }
                        return rs;
                    },
                    backgroundColor: '#eee',
                    borderColor: '#aaa',
                    borderWidth: 1,
                    borderRadius: 4,
                    rich: {
                        b: {
                            fontSize: 16,
                            lineHeight: 33
                        },
                        per: {
                            color: '#eee',
                            backgroundColor: '#334455',
                            padding: [2, 4],
                            borderRadius: 2
                        }
                    }
                }
            },
            data:[
                {value:335, name:'直达'},
                {value:310, name:'邮件营销'},
                {value:234, name:'联盟广告'},
                {value:135, name:'视频广告'},
                {value:1048, name:'百度'},
                {value:251, name:'谷歌'},
                {value:147, name:'必应'},
                {value:102, name:'其他'}
            ]
        }
    ]
};

function prepareData(res, wbtype, index){
    var dataarr = res[wbtype];
    var piearr = [];
    var i;
    for (i=0;i<dataarr.length;i++){
        var data = dataarr[i];
        var value = 0;
        if (wbtype=="total"){
            value = data["score"];
        } else{
            value = data["cnt"];
        }

        var piedata = {"name":data["name"], "value":parseInt(value), "uid":data["uid"]};
        piearr.push(piedata);

        if (data["uid"]!="-1"){
            var head_key = "guest_head_"+data["uid"];
            var real_index = index+1;
            if (wbtype=="total"){
                real_index = index;
            }
            option.series[real_index].label.normal.rich[head_key] = {
                height: 32, align: 'left', backgroundColor:{ image: 'image/heads/'+data["uid"]+'.jpg' }
            };
        }
    }

    var total_piearr = [];
    var totalarr = res.total;
    for (i=0;i<totalarr.length;i++){
        var data = totalarr[i];
        var piedata = {"name":data["name"], "value":parseInt(data["score"]), "uid":data["uid"]};
        total_piearr.push(piedata);
    }

    // set option
    option.series[index].data = total_piearr;
    if (wbtype!="total"){
        option.series[index+1].data = piearr;
    }
}

// 使用刚指定的配置项和数据显示图表。
var params = window.location.search;
if (params.length>0 && params.indexOf("uid=")>-1){
    $.ajax({
        // dataType: 'json',
        url: '/api/getDetail'+params,
        type: 'get',
        // data: {"productId": selected},
        success: function (json) {
            if (json=="nodata"){
                window.location.href='nodata.html'+params;
                // window.open('nodata.html'+params);
            } else{
                if (json=="{}"){
                    alert("服务器好像有点问题，请稍候再试");
                } else{
                    var res = JSON.parse(json);
                    // kuser
                    option.title[4].text = '{master_head|} '+res.name;
                    option.title[4].textStyle.rich.master_head.backgroundColor.image = 'image/heads/'+res.uid+'.jpg';

                    // legend
                    option.legend.data = res.legend;

                    // prepare data
                    prepareData(res, "comment", 0);
                    prepareData(res, "repost", 2);
                    prepareData(res, "like", 4);
                    prepareData(res, "total", 6);

                    myChart.setOption(option);


                    myChart.on('click', function (params) {
                        if (params.componentType === 'series') {
                            var hituid = params.data.uid;
                            window.open('display_detail.html?uid=' + hituid);
                        }
                        // window.open('https://www.baidu.com/s?wd=' + encodeURIComponent(params.name));
                    });
                }
            }
        }
    });
}