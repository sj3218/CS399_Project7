const imageString = ["img/magicNumber.PNG","img/whitespaceAround_and_whitespaceAround.PNG","img/finalParameters.PNG",
"img/whitespaceAround.PNG","img/visibilityModifier.PNG","img/lineLength.PNG",
"img/avoidStarImport.PNG","img/rightCurly_and_leftCurly.PNG","img/typeName.PNG",
"img/newlineAtEndOfFile.PNG","img/unusedImports.PNG","img/innerAssignment.PNG",
"img/hiddenField.PNG","img/multipleVariableDeclarations.PNG","img/interfactIsType.PNG","img/emptyStatement.PNG"];

var margins = { left:20, right:70, top:80, bottom:150};

var width = 1200 - margins.left - margins.right;
var height = 900 - margins.top - margins.bottom;

var radius = Math.min(width, height) / 2 - 40;

var svg = d3.select("#chart-area")
    .append("svg")
    .attr("width", width)
    .attr("height", height)
    .append('g')
    .attr("transform", "translate(" + 270  + "," + height / 2 + ")");

var tooltip = d3.select("#tooltip")
    .append("div")
    .style("opacity", 0)
    .attr("class", "tooltip")
    .style("background-color", "black")
    .style("border-radius", "5px")
    .style("padding", "20px")
    .style("font-size", "20px")
    .style("color", "white");

var img = d3.select("#image_tooltip")
    .append("div")
    .style("opacity", 0)
    .attr("class", "tooltip");

var pie = d3.pie()
      .value(function(d) {return d.Count; });
    
var arc = d3.arc()
      .innerRadius(radius * 0.5)
      .outerRadius(radius * 0.8)
      .cornerRadius(10);
    
var outerArc = d3.arc()
      .innerRadius(radius * 0.9)
      .outerRadius(radius);

var overArc = d3.arc()
        .innerRadius(radius*0.6)
        .outerRadius(radius*0.9)
        .cornerRadius(10);

var showToolTip = function(d)
{
    var msg = d.data.Message;
    //console.log(msg);

    tooltip.transition()
        .duration(200);
    
    tooltip
        .style("opacity", 1)
        .style("left", 1000 + "px")
        .style("top", 100 + "px");

    tooltip
        .html("Message: " + msg + "<br>Count: " + d.data.Count);

    img.transition()
        .duration(200)

    var string = "<img src= " + imageString[d.index] + " />";
    img.html(string)
        .style("opacity", 1)
        .style("left", 1000 +"px")
        .style("top", (height / 2 - 110) + "px");

    //console.log(d3.event.pageX);
};

var hideToolTip = function(d)
{
    tooltip.transition()
        .duration(200)
        .style("opacity", 0);

    img.transition()
        .duration(200)
        .style("opacity", 0);
}

var moveToolTip = function(d)
{
    // tooltip.style("left", (d3.event.pageX + 30) + "px")
    //     .style("top", (d3.event.pageY + 30) + "px");
}

var dataContainer;

d3.csv("data/brickbreaker.csv").then(function(data)
{
    console.log(data);

    data.forEach(function(d){
        d.Message = d.Message;
        d.Count = +d.Count;
    });

    dataContainer = data;

    UpdatePieChart(data);
})

function UpdatePieChart(data)
{
    const color = d3.scaleOrdinal()
        .range(d3.quantize(t => d3.interpolateYlOrRd(t*0.8 + 0.1), data.length));

    //pie chart
    svg.selectAll('.arc')
        .data(pie(data))
        .enter()
        .append('path')
        .attr('d', arc)
        .attr('fill', function(d){ return color(d.data.Message); })
        .attr("stroke", "white")
        .style("stroke-width", "2px")
        .style("opacity", 0.7)
        .on('mouseenter', function(d){
            d3.select(this).attr("stroke", "white")
                .transition()
                .duration(200)
                .attr("d", overArc)
                .attr("stroke-width", 1);
            
            //show tooltip
            showToolTip(d);
        })
        .on('mousemove', moveToolTip)
        .on('mouseleave', function(d)
        {
            d3.select(this)
                .transition()
                .attr("d",arc)
                .attr("stroke-width", "2px");

            //hide tooltip
            hideToolTip();
        });


}



function UpdatePolyLine(data)
{
    d3.select(this)
        .enter()
        .append('polyline')
        .attr("stroke", "black")
        .style("fill", "none")
        .attr("stroke-width", 1)
        .attr('points', function(d) {
            var posA = arc.centroid(d); 
            var posB = outerArc.centroid(d);
            var posC = outerArc.centroid(d); 
            var midangle = d.startAngle + (d.endAngle - d.startAngle) / 2;
            posC[0] = radius * 0.95 * (midangle < Math.PI ? 1 : -1);
            return [posA, posB, posC];
            });
}