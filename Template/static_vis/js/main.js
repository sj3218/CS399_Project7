//============================GLOBALS============================
/* you should define anything up here that stays static throughout your visualization. It is the design of your
visualization that determines if a variable/svg/axis/etc. should remain in the global space or should
be animated/updated etc. Typically, you will put things here that are not dependent on the data.
 */

// define margins in pixels. Use these to define total space allotted for this chart, within the chart area.
// For multiple charts, you can define multiple margin arrays
var margins = { left:100, right:40, top:50, bottom:150};
var t = d3.transition().duration(1000);

//define chart sizes
var width = 900 - margins.left - margins.right;
var height = 400 - margins.top - margins.bottom;

var g = d3.select("#chart-area")
    .append("svg")
    .attr("width", width + margins.left + margins.right)
    .attr("height", height + margins.top + margins.bottom)
    .append("g")
    .attr("transform", "translate(" + margins.left + ", " + margins.top  + ")");

g.append("text")
    .attr("class", "x axis-label")
    .attr("x", width / 2) //centered
    .attr("y", height + (margins.bottom / 2))
    .attr("font-size", "12px")
    .attr("text-anchor", "middle")
    .text("Code Smell Type");

g.append("text")
    .attr("class", "y axis-label")
    .attr("x", -height / 2)
    .attr("y", -60)
    .attr("fons-size", "12px")
    .attr("text-anchor", "middle")
    .attr("transform", "rotate(-90)")
    .text("Count");


d3.csv("data/brickbreaker_modified.csv").then(function(data){

    data.forEach(function(d){
        d.Count = +d.Count;
    });

    var x = d3.scaleBand() 
        .domain(data.map(function(d){ return d.Message ; })) 
        .range([0, width])                               
        .paddingInner(0.3)
        .paddingOuter(0.3);

    var y = d3.scaleLinear() 
        .domain([0, d3.max(data, function(d){ return d.Count })]) 
        .range([height, 0]);                                       

    var xAxisCall = d3.axisBottom(x)
    var yAxisCall = d3.axisLeft(y)
        .ticks(10);
    
    g.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0, " + height + ")")
        .call(xAxisCall)
        .transition(t)
        .selectAll("text")
        .attr("y", "10")
        .attr("x", "-5")
        .attr("text-anchor", "end")
        .attr("transform", "rotate(-40)");

     g.append("g")
        .attr("class", "y-axis")
        .call(yAxisCall)
        .transition(t);

    var myColor = d3.scaleSequential()
        .interpolator(d3.interpolateViridis)
        .domain([-15, 100])

    var Tooltip = d3.select("#div_template")
        .append("div")
        .style("opacity", 0)
        .attr("class", "tooltip")
        .style("background-color", "white")
        .style("border", "solid")
        .style("border-width", "2px")
        .style("border-radius", "5px")
        .style("padding", "5px")
    
      var mouseover = function(d) {
        Tooltip
          .style("opacity", 1)
        d3.select(this)
          .style("stroke", "black")
          .style("opacity", 1)
      }
      var mousemove = function(d) {
        Tooltip
          .html("Code smell type: " + d.Message)
          .style("left", (d3.mouse(this)[0]+70) + "px")
          .style("top", (d3.mouse(this)[1]) + "px")
          console.log("on the rect")
      }
      var mouseleave = function(d) {
        Tooltip
          .style("opacity", 0)
        d3.select(this)
          .style("stroke", "none")
          .style("opacity", 0.8)
      }

    var rects = g.selectAll("rect")
        .data(data);

    rects.enter()
        .append("rect")
        .attr("y", function(d){ return y(d.Count); })
        .attr("x", function(d){ return x(d.Message); })
        .attr("width", x.bandwidth)
        .attr("height", function(d){ return height - y(d.Count); })
        .style("fill", function(d) { return myColor(d.Count)} )
        .on("mouseover", mouseover)
        .on("mousemove", mousemove)
        .on("mouseleave", mouseleave);

}).catch(function(error){
    return error;
}); 
