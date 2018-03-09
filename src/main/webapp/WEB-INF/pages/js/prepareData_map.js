var map = L.map('map');
var baseLayers = {
    "高德地图": L.tileLayer('http://webrd0{s}.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=8&x={x}&y={y}&z={z}', {
        subdomains: "1234"
    }),
    '高德影像': L.layerGroup([L.tileLayer('http://webst0{s}.is.autonavi.com/appmaptile?style=6&x={x}&y={y}&z={z}', {
        subdomains: "1234"
    }), L.tileLayer('http://t{s}.tianditu.cn/DataServer?T=cta_w&X={x}&Y={y}&L={z}', {
        subdomains: "1234"
    })]),
    "立体地图": L.tileLayer('https://a.tiles.mapbox.com/v3/examples.c7d2024a/{z}/{x}/{y}.png', {
        attribution: 'Map &copy; Pacific Rim Coordination Center (PRCC).  Certain data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>',
        key: 'BC9A493B41014CAABB98F0471D759707',
        styleId: 22677
    }),
    "Foursquare": L.tileLayer('https://a.tiles.mapbox.com/v3/foursquare.map-0y1jh28j/{z}/{x}/{y}.png', {
        attribution: 'Map &copy; Pacific Rim Coordination Center (PRCC).  Certain data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>',
        key: 'BC9A493B41014CAABB98F0471D759707',
        styleId: 22677
    }),
    'GeoQ灰色底图': L.tileLayer('http://map.geoq.cn/ArcGIS/rest/services/ChinaOnlineStreetPurplishBlue/MapServer/tile/{z}/{y}/{x}').addTo(map)
};
L.tileLayer('https://a.tiles.mapbox.com/v3/foursquare.map-0y1jh28j/{z}/{x}/{y}.png', {
    attribution: 'Map &copy; Pacific Rim Coordination Center (PRCC).  Certain data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>',
    key: 'BC9A493B41014CAABB98F0471D759707',
    styleId: 22677
});
var layercontrol = L.control.layers(baseLayers,{}, {
    position: "topleft"
}).addTo(map);
map.setView(L.latLng(37.550339, 104.114129), 4);
var overlay = new L.echartsLayer3(map, echarts);
var chartsContainer = overlay.getEchartsContainer();
var myChart = overlay.initECharts(chartsContainer);

myChart.showLoading();

myChart.hideLoading();
$.get('data/access_data.json', function (weiboData) {
    $.get("data/geocoordmap.json", function(geoCoordMap){
        var pvData = weiboData[0];
        var uvData = weiboData[1];

        var max_r = 1.3;
        var max_ang = 2*Math.PI;
        var i=0;
        var res = [[[73.96,39.70]], [[75.06,38.45]], [[75.23,37.78]]];
        var pvDict = {};
        for (i=0; i<pvData.length; i++){
            pvDict[pvData[i].city] = parseInt(pvData[i].value);
        }

        for (i=0; i<uvData.length; i++){
            var city = uvData[i].city;
            var cnt = parseInt(uvData[i].value);

            var geo = geoCoordMap[city];
            if (geo){
                var j=0;
                for (j=0;j<cnt;j++){
                    var r = Math.random()*max_r;
                    var ang = Math.random()*max_ang;
                    var geox = geo[0] + r*Math.cos(ang);
                    var geoy = geo[1] + r*Math.sin(ang);

                    var ind = Math.floor(Math.random()*3);

                    res[ind].push([geox.toFixed(2),geoy.toFixed(2),1]);
                }
            }
        }
        weiboData = res;

        var option = {
            // backgroundColor: '#404a59',
            title : {
                text: 'kemo map',
                subtext: 'From ThinkGIS',
                sublink: 'http://www.thinkgis.cn/public/sina',
                left: 'center',
                top: 'top',
                textStyle: {
                    color: '#fff'
                }
            },
            tooltip: {},
            legend: {
                left: 'left',
                data: ['强', '中', '弱'],
                textStyle: {
                    color: '#ccc'
                }
            },
            geo: {
                map: '',
                roam: true,
                label: {
                    emphasis: {
                        show: false
                    }
                },
                itemStyle: {
                    normal: {
                        areaColor: '#323c48',
                        borderColor: '#111'
                    },
                    emphasis: {
                        areaColor: '#2a333d'
                    }
                }
            },
            series: [{
                name: '弱',
                type: 'scatter',
                coordinateSystem: 'geo',
                symbolSize: 2,
                large: true,
                itemStyle: {
                    normal: {
                        shadowBlur: 2,
                        shadowColor: 'rgba(37, 140, 249, 0.8)',
                        color: 'rgba(37, 140, 249, 0.8)'
                    }
                },
                data: weiboData[0]
            }, {
                name: '中',
                type: 'scatter',
                coordinateSystem: 'geo',
                symbolSize: 3,
                large: true,
                itemStyle: {
                    normal: {
                        shadowBlur: 2,
                        shadowColor: 'rgba(14, 241, 242, 0.8)',
                        color: 'rgba(14, 241, 242, 0.8)'
                    }
                },
                data: weiboData[1]
            }, {
                name: '强',
                type: 'scatter',
                coordinateSystem: 'geo',
                symbolSize: 3,
                large: true,
                itemStyle: {
                    normal: {
                        shadowBlur: 2,
                        shadowColor: 'rgba(255, 255, 255, 0.8)',
                        color: 'rgba(255, 255, 255, 0.8)'
                    }
                },
                data: weiboData[2]
            }]
        }

        // 使用刚指定的配置项和数据显示图表。
        overlay.setOption(option);
    });

});