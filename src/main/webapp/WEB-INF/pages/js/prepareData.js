var level = 1;

$("document").ready(function(){
    $(".tab-slider--body").hide();
    $(".tab-slider--body:first").show();
});

$(".tab-slider--nav li").click(function() {
    $(".tab-slider--body").hide();
    var activeTab = $(this).attr("rel");
    var tabName = $(this).attr("rel");
    var curLevel = parseInt(tabName.substr(3,1));
    if (level!=curLevel){
        level = curLevel;
        $("#"+activeTab).fadeIn();
        $('.tab-slider--tabs').removeClass('slide2');
        $('.tab-slider--tabs').removeClass('slide3');
        $('.tab-slider--tabs').removeClass('slide4');
        $('.tab-slider--tabs').removeClass('slide5');
        if (level>1){
            $('.tab-slider--tabs').addClass('slide'+level);
        }
        updateLevel(level);
    }
    $(".tab-slider--nav li").removeClass("active");
    $(this).addClass("active");
});


var width = 1850,
    height = 900

var img_w = 48;
var img_h = 48;
var radius = 20;

// var color = function (group) {
//     if (group == 1) {
//         return "#aaa"
//     } else if (group == 2) {
//         return "#fbc280"
//     } else {
//         return "#405275"
//     }
// }
function dragstarted(d) {
    if (!d3.event.active) force.alphaTarget(0.5).restart();
    d.fx = d.x;
    d.fy = d.y;
}

function dragged(d) {
    d.fx = d3.event.x;
    d.fy = d3.event.y;
}

function dragended(d) {
    if (!d3.event.active) force.alphaTarget(0.5);
    d.fx = null;
    d.fy = null;
}

function calTrueLength(str){
    var l = str.length;
    var blen = 0;
    for(i=0; i<l; i++) {
        if ((str.charCodeAt(i) & 0xff00) != 0) {
            blen ++;
        }
        blen ++;
    }
    return blen;
}

var svg = null;
var force = null;
function update(json){
    // d3.select("#main").remove("svg");

    if (svg!=null){
        svg.selectAll("*").remove();
    } else {
        svg = d3.select("#main").append("svg")
            .attr("width", width)
            .attr("height", height);
    }

    force = d3.forceSimulation()
        .force("charge", d3.forceManyBody().distanceMin(10).distanceMax(700).strength(-1000))
        // .force("charge", d3.forceManyBody().strength(-1000).distanceMin(100).distanceMax(1000))
        .force("link", d3.forceLink().id(function(d) { return d.index }))
        .force("center", d3.forceCenter(width / 2, height / 2))
        .force("y", d3.forceY(0.001))
        .force("x", d3.forceX(0.001));

    // force.nodes(json.nodes).force("link").links(json.links);
    force.nodes(json.nodes)
        .force("link", d3.forceLink()
            .links(json.links)
            .id(function(d) {return d.index})
            .strength(function(d){
                return d["strengthd"];
            }));


    var link = svg.selectAll(".link")
        .data(json.links)
        .enter()
        .append("line")
        .attr("class", "link");

    var ori_node = svg.selectAll(".node")
        .data(json.nodes)
        .enter().append("g")
        .attr("class", "node")
        .call(d3.drag()
            .on("start", dragstarted)
            .on("drag", dragged)
            .on("end", dragended));

    var arr = ["coffee1.jpg", "dog2.jpg", "quin.jpg", "dog3.jpg"]

    var node = svg.selectAll("image")
        .data(json.nodes)
        .enter().append("circle")
        .attr("class", "circleImg")
        .attr("r", radius)
        .attr("fill", function(d, i){
            // var img_i = Math.floor(Math.random()*4);
            var uid = d["id"];

            // create img
            var defs = svg.append("defs").attr("id", "imgdefs");
            var catpattern = defs.append("pattern")
                .attr("id", "catpattern"+i)
                .attr("height", 1)
                .attr("width", 1);
            catpattern.append("image")
                .attr("x", - (img_w / 2 - radius))
                .attr("y", - (img_h / 2 - radius))
                .attr("width", img_w)
                .attr("height", img_h)
                .attr("xlink:href", "image/heads/"+uid+".jpg");

            return "url(#catpattern" + i + ")";
        })
        .attr("class", "node")
        .call(d3.drag()
            .on("start", dragstarted)
            .on("drag", dragged)
            .on("end", dragended));

    var font_size = 16;
    var nodes_text = svg.selectAll(".nodetext")
        .data(json.nodes)
        .enter()
        .append("a")
        .attr("xlink:href", function(d){
            return "display_detail.html?uid="+d.id;
        })
        .attr("target", "view_window")
        .append("text")
        .attr("class", "nodetext")
        .attr("dx", function(d){
            return -calTrueLength(d.name)/2.0*font_size/2.0;
        })
        .attr("dy", 38)
        .style("font-family", "overwatch")
        .style("font-size", font_size+"px")
        .text(function(d){
            return d.name;
        });


    force.on("tick", function () {
        link.attr("x1", function (d) {
            return d.source.x;
        })
            .attr("y1", function (d) {
                return d.source.y;
            })
            .attr("x2", function (d) {
                return d.target.x;
            })
            .attr("y2", function (d) {
                return d.target.y;
            });
        node.attr("transform", function (d) {
            return "translate(" + d.x + "," + d.y + ")";
        });

        nodes_text.attr("x", function(d){ return d.x});
        nodes_text.attr("y", function(d){ return d.y});

        // nodes_a.attr("x", function(d){ return d.x});
        // nodes_a.attr("y", function(d){ return d.y});
    });
}

function updateLevel(lv){
    $.ajax({
        // dataType: 'json',
        url: '/api/getScoreData?level='+(lv-1),
        type: 'get',
        // data: {"productId": selected},
        success: function (json) {
            var res = JSON.parse(json);
            update(res);
        }
    });
}

updateLevel(level);

