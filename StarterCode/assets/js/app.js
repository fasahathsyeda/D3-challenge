// Code for Chart is Wrapped Inside a Function That Automatically Resizes the Chart
function makeResponsive() {

    // If SVG Area is not Empty When Browser Loads, Remove & Replace with a Resized Version of Chart
    var svgArea = d3.select("body").select("svg");
  
    // Clear SVG is Not Empty
    if (!svgArea.empty()) {
      svgArea.remove();
    }
    
    // Setup Chart Parameters/Dimensions
    var svgWidth = 980;
    var svgHeight = 600;
  
    // Set SVG Margins
    var margin = {
      top: 20,
      right: 40,
      bottom: 90,
      left: 100
    };
  
    // Define Dimensions of the Chart Area
    var width = svgWidth - margin.left - margin.right;
    var height = svgHeight - margin.top - margin.bottom;
  
    // Create an SVG Element/Wrapper - Select Body, Append SVG Area & Set the Dimensions
    var svg = d3
      .select("#scatter")
      .append("svg")
      .attr("width", svgWidth)
      .attr("height", svgHeight);
  
    // Append Group Element & Set Margins - Shift (Translate) by Left and Top Margins Using Transform
    var chartGroup = svg.append("g")
      .attr("transform", `translate(${margin.left}, ${margin.top})`);
  
    // Initial Params
    var chosenXAxis = "poverty";
    var chosenYAxis = "healthcare";
  
    // Function for Updating xScale Upon Click on Axis Label
    function xScale(healthData, chosenXAxis) {
      // Create Scale Functions for the Chart (chosenXAxis)
      var xLinearScale = d3.scaleLinear()
        .domain([d3.min(healthData, d => d[chosenXAxis]) * 0.8,
          d3.max(healthData, d => d[chosenXAxis]) * 0.8
        ])
        .range([0, width]);
      return xLinearScale;
    }
  
    // Function for Updating yScale Upon Click on Axis Label
    function yScale(healthData, chosenYAxis) {
      // Create Scale Functions for the Chart (chosenYAxis)
      var yLinearScale = d3.scaleLinear()
        .domain([d3.min(healthData, d => d[chosenYAxis]) * 0.8,
          d3.max(healthData, d => d[chosenYAxis]) * 0.8
        ])
        .range([height, 0]);
      return yLinearScale;
    }
  
    // Function for Updating xAxis Upon Click on Axis Label
    function renderXAxes(newXScale, xAxis) {
      var bottomAxis = d3.axisBottom(newXScale);
      xAxis.transition()
        .duration(1000)
        .call(bottomAxis);
      return xAxis;
    }
  
    // Function for Updating yAxis Upon Click on Axis Label
    function renderYAxes(newYScale, yAxis) {
      var leftAxis = d3.axisLeft(newYScale);
      yAxis.transition()
        .duration(1000)
        .call(leftAxis);
      return yAxis;
    }

    // Function for Updating Circles Group with a Transition to New Circles
    function renderCircles(circlesGroup, newXScale, chosenXAxis, newYScale, chosenYAxis) {
        circlesGroup.transition()
                    .duration(1000)
                    .attr("cx", d => newXScale(d[chosenXAxis]))
                    .attr("cy", d => newYScale(d[chosenYAxis]));
        return circlesGroup;
    }

    // function used for updating circles group with new tooltip
    function updateToolTip(chosenXAxis, chosenYAxis, circlesGroup) {
        var xlabel,ylabel;

        if(chosenXAxis === "poverty") {
            xlabel = "In Poverty";
        }
        else if (chosenXAxis === "age") {
            xlabel = "Age";
        }
        else {
            xlabel = "Household Income (Median)";
        }
        if (chosenYAxis === "healthcare") {
            var yLabel = "Lacks Healthcare (%)";
        }
        else if (chosenYAxis === "obesity") {
            var yLabel = "Obese (%)";
        }
        else {
            var yLabel = "Smokes (%)";
        }

    // Initialize Tool Tip
    var toolTip = d3.tip()
                    .attr("class", "tooltip d3-tip")
                    .offset([90, 90])
                    .html(function(d) {
                        return (`<strong>${d.abbr}</strong><br>${xLabel} ${d[chosenXAxis]}<br>${yLabel} ${d[chosenYAxis]}`);
    });

    // Create Circles Tooltip in the Chart
    circlesGroup.call(toolTip);

    // Create Event Listeners to Display and Hide the Circles Tooltip
    circlesGroup.on("mouseover", function(data) {
        toolTip.show(data);
    })
    // onmouseout event
        .on("mouseout", function(data, index) {
            toolTip.hide(data);
        });

    return circlesGroup;

}

// Import Data from the data.csv File & Execute Everything Below
d3.csv("assets/data/data.csv").then(function(healthData, err) {
    if (err) throw err;

    // parsing the data

    healthData.forEach(function(data){
        data.poverty = +data.poverty;
        data.age = +data.age;
        data.income = +data.income;
        data.healthcare = +data.healthcare;
        data.obesity = +data.obesity;
        data.smokes = +data.smokes;
    });

    // Create Axis Functions for the Chart
    var xLinearScale = xScale(healthData, chosenXAxis);
    var yLinearScale = yScale(healthData, chosenYAxis); 

    // Create initial axis functions
    var bottomAxis = d3.axisBottom(xLinearScale);
    var leftAxis = d3.axisLeft(yLinearScale);

    // append x axis
    var xAxis = chartGroup.append("g")
                            .classed("x-axis", true)
                            .attr("transform", `translate(0, ${height})`)
                            .call(bottomAxis);

    // append y axis
    var yAxis = chartGroup.append("g")
                            .classed("y-axis", true)
                            .call(leftAxis);
    
    // append initial circles
    var circlesGroup = chartGroup.selectAll("circle")
                                    .data(healthData)
                                    .enter()
                                    .append("circle")
                                    .attr("cx", d => xLinearScale(d[chosenXAxis]))
                                    .attr("cy", d => yLinearScale(d[chosenYAxis]))
                                    .attr("class", "stateCircle")
                                    .attr("r", 15)
                                    .attr("opacity", ".75");
    // cretae group for x-axis labels

    var xl
    




  
    
  }
  // When Browser Loads, makeResponsive() is Called
  makeResponsive();
  
  // When Browser Window is Resized, makeResponsive() is Called
  d3.select(window).on("resize", makeResponsive);