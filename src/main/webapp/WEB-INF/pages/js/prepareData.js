var width = 960,
    height = 500

var img_w = 80;
var img_h = 80;
var radius = 30;

var svg = d3.select("body").append("svg")
    .attr("width", width)
    .attr("height", height);

var force = d3.forceSimulation()
    .force("charge", d3.forceManyBody().distanceMin(100).distanceMax(1000).strength(-1000))
    // .force("charge", d3.forceManyBody().strength(-1000).distanceMin(100).distanceMax(1000))
    .force("link", d3.forceLink().id(function(d) { return d.index }))
    .force("center", d3.forceCenter(width / 2, height / 2))
    .force("y", d3.forceY(0.001))
    .force("x", d3.forceX(0.001));

var color = function (group) {
    if (group == 1) {
        return "#aaa"
    } else if (group == 2) {
        return "#fbc280"
    } else {
        return "#405275"
    }
}
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

d3.json("friends.json", function (error, json) {
    if (error) throw error;
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
            var img_i = Math.floor(Math.random()*4);

            // create img
            var defs = svg.append("defs").attr("id", "imgdefs")
            var catpattern = defs.append("pattern")
                .attr("id", "catpattern"+i)
                .attr("height", 1)
                .attr("width", 1)
            catpattern.append("image")
                .attr("x", - (img_w / 2 - radius))
                .attr("y", - (img_h / 2 - radius))
                .attr("width", img_w)
                .attr("height", img_h)
                .attr("xlink:href", "image/"+arr[img_i])

            return "url(#catpattern" + i + ")";
        })
        .attr("class", "node")
        .call(d3.drag()
            .on("start", dragstarted)
            .on("drag", dragged)
            .on("end", dragended));

    var nodes_text = svg.selectAll(".nodetext")
        .data(json.nodes)
        .enter()
        .append("text")
        .attr("class", "nodetext")
        .attr("dx", -18)
        .attr("dy", 38)
        .style("font-family", "overwatch")
        .style("font-size", "18px")
        .text(function(d){
            return d.name
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
    });
});

