const imageString = ["img_2/magicNumber.PNG","img_2/whitespaceAround_and_whitespaceAfter.png","img_2/finalParameters.PNG",
"img_2/whitespaceAround.PNG","img_2/visibilityModifier.PNG","img_2/lineLength.PNG",
"img_2/avoidStarImport.PNG","img_2/rightCurly_and_leftCurly.PNG","img_2/typeName.PNG",
"img_2/newlineAtEndOfFile.PNG","img_2/unusedImports.PNG","img_2/innerAssignment.PNG",
"img_2/hiddenField.PNG","img_2/multipleVariableDeclarations.PNG","img_2/interfactIsType.PNG","img_2/emptyStatement.PNG"];

const bar_imageString = 
      ["img/emptyStatement.PNG", "img/interfactIsType.PNG","img/multipleVariableDeclarations.PNG", 
      "img/hiddenField.PNG","img/innerAssignment.PNG","img/unusedImports.PNG","img/newlineAtEndOfFile.PNG",
      "img/typeName.PNG","img/rightCurly_and_leftCurly.PNG","img/avoidStarImport.PNG","img/lineLength.PNG",
      "img/visibilityModifier.PNG","img/whitespaceAround.PNG", "img/finalParameters.PNG", "img/whitespaceAround_and_whitespaceAround.PNG",
      "img/magicNumber.PNG"
      ]; 

var margins = { left:20, right:70, top:80, bottom:150};
var bar_margins = { left:50, right:40, top:50, bottom:150};
var t = d3.transition().duration(1000);

var width = 1200 - margins.left - margins.right;
var height = 900 - margins.top - margins.bottom;

var bar_width = 900 - bar_margins.left - bar_margins.right;
var bar_height = 400 - bar_margins.top - bar_margins.bottom;

var radius = Math.min(width, height) / 2 - 40;

var svg = d3.select("#pie-area")
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
        .style("top", 110 + "px");

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
    tooltip
        .style("opacity", 0);

    img
        .style("opacity", 0);
}

var moveToolTip = function(d)
{
    // tooltip.style("left", (d3.event.pageX + 30) + "px")
    //     .style("top", (d3.event.pageY + 30) + "px");
}

var bar_g = d3.select("#chart-area")
        .append("svg")
        .attr("width", bar_width + bar_margins.left + bar_margins.right)
        .attr("height", bar_height + bar_margins.top + bar_margins.bottom)
        .append("g")
        .attr("transform", "translate(" + bar_margins.left + ", " + bar_margins.top  + ")");
    
    bar_g.append("text")
        .attr("class", "x axis-label")
        .attr("x", bar_width / 2) //centered
        .attr("y", bar_height + (bar_margins.bottom / 2) + 50)
        .attr("font-size", "20px")
        .attr("text-anchor", "middle")
        .text("Code Smell Type");
    
    bar_g.append("text")
        .attr("class", "y axis-label")
        .attr("x", -bar_height / 2)
        .attr("y", -60)
        .attr("fons-size", "12px")
        .attr("text-anchor", "middle")
        .attr("transform", "rotate(-90)")
        .text("Count");
    

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
    HideChart(0);
    svg = d3.select("#pie-area")
    .append("svg")
    .attr("width", width)
    .attr("height", height)
    .append('g')
    .attr("transform", "translate(" + 270  + "," + height / 2 + ")");

    tooltip = d3.select("#tooltip")
    .append("div")
    .style("opacity", 0)
    .attr("class", "tooltip")
    .style("background-color", "black")
    .style("border-radius", "5px")
    .style("padding", "20px")
    .style("font-size", "20px")
    .style("color", "white");

    img = d3.select("#image_tooltip")
    .append("div")
    .style("opacity", 0)
    .attr("class", "tooltip");
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


function UpdateBarGraph(data)
{
    HideChart(1);

    bar_g = d3.select("#chart-area")
        .append("svg")
        .attr("width", bar_width + bar_margins.left + bar_margins.right)
        .attr("height", bar_height + bar_margins.top + bar_margins.bottom)
        .append("g")
        .attr("transform", "translate(" + bar_margins.left + ", " + bar_margins.top  + ")");
    
    bar_g.append("text")
        .attr("class", "x axis-label")
        .attr("x", bar_width / 2) //centered
        .attr("y", bar_height + (bar_margins.bottom / 2) + 50)
        .attr("font-size", "20px")
        .attr("text-anchor", "middle")
        .text("Code Smell Type");
    
    bar_g.append("text")
        .attr("class", "y axis-label")
        .attr("x", -bar_height / 2)
        .attr("y", -60)
        .attr("fons-size", "12px")
        .attr("text-anchor", "middle")
        .attr("transform", "rotate(-90)")
        .text("Count");
        
    var x = d3.scaleBand() 
    .domain(data.map(function(d){ return d.Message ; })) 
    .range([0, bar_width])                               
    .paddingInner(0.3)
    .paddingOuter(0.3);

var y = d3.scaleLinear() 
    .domain([0, d3.max(data, function(d){ return d.Count })]) 
    .range([bar_height, 0]);                                       

var xAxisCall = d3.axisBottom(x)
var yAxisCall = d3.axisLeft(y)
    .ticks(10);

bar_g.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0, " + bar_height + ")")
    .call(xAxisCall)
    .transition(t)
    .selectAll("text")
    .attr("y", "10")
    .attr("x", "-5")
    .attr("text-anchor", "end")
    .attr("transform", "rotate(-40)");

bar_g.append("g")
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

var imageTooltip = d3.select("#image_template")
    .append("div")
    .style("opacity", 0)
    .attr("class", "tooltip")
    .style("background-color", "white")
    .style("border", "solid")
    .style("border-width", "2px")
    .style("border-radius", "5px")
    .style("padding", "3px")

var mouseover = function(d) {
    Tooltip
      .style("opacity", 1)
    d3.select(this)
      .style("stroke", "black")
      .style("opacity", 1)

    imageTooltip
      .style("opacity", 1)
    d3.select(this)
      .style("stroke", "black")
      .style("opacity", 1)
  }

  var mousemove = function(d ,i) {
    console.log(i);
    Tooltip
      .html("Count: " + d.Count)
      .style("left", (d3.mouse(this)[0] + 75) + "px")
      .style("top", (d3.mouse(this)[1]) + "px")
    
      var string = "<img src= "+ bar_imageString[i] +" />";
      imageTooltip
      .html(string)
      .style("left", 100 + "px")
      .style("top", 500 + "px");
  }

  var mouseleave = function(d) {
    Tooltip
      .style("opacity", 0)
    d3.select(this)
      .style("stroke", "none")
      .style("opacity", 0.8)

    imageTooltip
      .style("opacity", 0)
    d3.select(this)
      .style("stroke", "none")
      .style("opacity", 0.8)

  }

var rects = bar_g.selectAll("rect")
    .data(data);

rects.enter()
    .append("rect")
    .attr("y", function(d){ return y(d.Count); })
    .attr("x", function(d){ return x(d.Message); })
    .attr("width", x.bandwidth)
    .attr("height", function(d){ return bar_height - y(d.Count); })
    .style("fill", function(d) { return myColor(d.Count)} )
    .on("mouseover", mouseover)
    .on("mousemove", mousemove)
    .on("mouseleave", mouseleave);
}

function HideChart(is_bar)
{
    if(is_bar == 0)
    {
        d3.select("#chart-area").selectAll("*").remove();
        d3.select("#div_template").selectAll("*").remove();
        d3.select("#image_template").selectAll("*").remove();
        d3.select("#pie-area").selectAll("*").remove();
    }
    else 
    {
        d3.select("#chart-area").selectAll("*").remove();
        d3.select("#pie-area").selectAll("*").remove();
        d3.select("#tooltip").selectAll("*").remove();
        d3.select("#image_tooltip").selectAll("*").remove();
    }
}