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

$.get('data/weibo.json', function (weiboData) {
    myChart.hideLoading();

    weiboData = weiboData.map(function (serieData, idx) {
        var px = serieData[0] / 1000;
        var py = serieData[1] / 1000;
        var res = [[px, py]];

        for (var i = 2; i < serieData.length; i += 2) {
            var dx = serieData[i] / 1000;
            var dy = serieData[i + 1] / 1000;
            var x = px + dx;
            var y = py + dy;
            res.push([x.toFixed(2), y.toFixed(2), 1]);

            px = x;
            py = y;
        }
        return res;
    });
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
            symbolSize: 1,
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
            symbolSize: 1,
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
            symbolSize: 1,
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