function makeResponsive(){

    //Create empty lists for data
    abbr = []
    //smokes = []
    poverty = []
    //age = []
    healthcare = []

    // Retrieve data from the CSV file and push data into above lists
    d3.csv("../assets/data/data.csv").then(function(healthData) {
        healthData.forEach(function(data){
            console.log(data.abbr)
            //abbr.push(data.abbr)
            poverty.push(+data.poverty)
            healthcare.push(+data.healthcare)
            //smokes.push(+data.smokes)
            //age.push(+data.age)
            })
    //Print lists to make sure they work
        console.log(abbr)
        console.log(healthData)
        console.log(healthcare)
    //console.log(smokes)
        console.log(poverty)
        //console.log(age)


    //Create svg and margins
    var svgWidth = 960;
    var svgHeight = 500;

    var margin = {
        top: 50,
        right: 50,
        bottom: 50,
        left: 100
    };

        // chart area minus margins
    var chartHeight = svgHeight - margin.top - margin.bottom;
    var chartWidth = svgWidth - margin.left - margin.right;

    // append svg and group
    var svg = d3.select("#scatter")
    .append("svg")
    .attr("height", svgHeight)
    .attr("width", svgWidth)
    ;
    
    var chartGroup = svg.append("g")
        .attr("transform", `translate(${margin.left}, ${margin.top})`);

    // scales
    var xScale = d3.scaleLinear()
        .domain([0, d3.max(poverty)])
        .range([0, chartWidth]);
        
    var yScale = d3.scaleLinear()
        .domain([0, d3.max(healthcare)])
        .range([chartHeight, 0]);

        // create axes
    var yAxis = d3.axisLeft(yScale);
    var xAxis = d3.axisBottom(xScale).ticks(5);

    // set x to the bottom of the chart
    chartGroup.append("g")
        .attr("transform", `translate(0, ${chartHeight})`)
        .call(xAxis);

    // set y to the y axis
    chartGroup.append("g")
        .call(yAxis);
    
    // Append axes titles
    chartGroup.append("text")
        .attr("transform", `translate(${chartWidth / 2}, ${chartHeight + margin.top - 10})`)
        .classed("atext text", true)
        .text("Povery Index (%)");

    chartGroup.append("text")
        .attr("transform", `translate(${chartWidth - margin.left-750}, ${chartHeight/2}) rotate(270)`)
        .classed("left", true)
        .text("Lacks Healthcare (%)");


// append circles to data points
    var circlesGroup = chartGroup.selectAll("circle")
        .data(healthData)
        .enter()
        .append("circle")
        .classed("stateCircle", true)
        .attr("cx", (d, i) => xScale(d.poverty))
        .attr("cy", d => yScale(d.healthcare))
        .attr("r", "10")
        .append("text")
        
    // chartGroup.append("text")
    //     .data(healthData)
    //     .classed("stateText", true)
    //     .text(d => d.abbr)
        
        // .classed("stateText", true)
        // .text(d => d.abbr)

        
    chartGroup.selectAll("p")
        .data(healthData)
        .enter()
        .append("text")
        .text(d => d.abbr)
        .classed("stateText", true)
        .attr("x", (d)=> xScale(d.poverty)-5)
        .attr("y", (d)=> yScale(d.healthcare)+2)

// Step 1: Append a div to the body to create tooltips, assign it a class
// =======================================================
    // var toolTip = d3.select("body").append("div")
    //     .attr("class", "tooltip");

// Step 2: Add an onmouseover event to display a tooltip
// ========================================================
    // circlesGroup.on("mouseover", function(d,i) {
    //     d3.select(this)
    //     toolTip.style("display", "block");
    //     toolTip.html(`<strong>${d.abbr}</strong>`)
    //     .style("left", d3.event.pageX + "px")
    //     .style("top", d3.event.pageY + "px");
    // })
  // Step 3: Add an onmouseout event to make the tooltip invisible
    // on(."mouseout", function() {
    //   d3.select(this)
    //   .attr("fill", "red")
    //   //toolTip.style("display", "none");
//   });
}
);
}


makeResponsive();

// Event listener for window resize.
// When the browser window is resized, makeResponsive() is called.
//d3.select(window).on("resize", makeResponsive);
