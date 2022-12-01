//============================GLOBALS============================
/* you should define anything up here that stays static throughout your visualization. It is the design of your
visualization that determines if a variable/svg/axis/etc. should remain in the global space or should
be animated/updated etc. Typically, you will put things here that are not dependent on the data.
 */

// define margins in pixels. Use these to define total space allotted for this chart, within the chart area.
// For multiple charts, you can define multiple margin arrays

draw(0);

function draw(ID)
{
  if(ID == 0)
  {
    console.log(ID);    
    d3.select("#pie-area").selectAll("*").remove();
    d3.select("#chart-area").selectAll("*").remove();

    const imageString = ["img/magicNumber.PNG","img/whitespaceAround_and_whitespaceAfter.png","img/finalParameters.PNG",
    "img/whitespaceAround.PNG","img/visibilityModifier.PNG","img/lineLength.PNG",
    "img/avoidStarImport.PNG","img/rightCurly_and_leftCurly.PNG","img/typeName.PNG",
    "img/newlineAtEndOfFile.PNG","img/unusedImports.PNG","img/innerAssignment.PNG",
    "img/hiddenField.PNG","img/multipleVariableDeclarations.PNG","img/interfactIsType.PNG","img/emptyStatement.PNG"];

    var margins = { left:20, right:70, top:80, bottom:150};

    var width = 1200 - margins.left - margins.right;
    var height = 900 - margins.top - margins.bottom;

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
  }
  else if(ID == 1)
  {
    console.log(ID);
    d3.select("#pie-area").selectAll("*").remove();
    d3.select("#chart-area").selectAll("*").remove();

    var margins = { left:50, right:40, top:50, bottom:150};
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
        .attr("y", height + (margins.bottom / 2) + 50)
        .attr("font-size", "20px")
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
    
    
    d3.csv("data/test.csv").then(function(data){
      
      const imageString = 
      ["img/emptyStatement.PNG", "img/interfactIsType.PNG","img/multipleVariableDeclarations.PNG", 
      "img/hiddenField.PNG","img/innerAssignment.PNG","img/unusedImports.PNG","img/newlineAtEndOfFile.PNG",
      "img/typeName.PNG","img/rightCurly_and_leftCurly.PNG","img/avoidStarImport.PNG","img/lineLength.PNG",
      "img/visibilityModifier.PNG","img/whitespaceAround.PNG", "img/finalParameters.PNG", "img/whitespaceAround_and_whitespaceAround.PNG",
      "img/magicNumber.PNG"
      ];  
    
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
            
              var string = "<img src= "+ imageString[i] +" />";
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
    
  
  }

}
