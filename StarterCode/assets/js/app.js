// @TODO: YOUR CODE HERE!
var svgWidth = 960;
var svgHeight = 500;

var margin = {
    top: 20,
    right: 40,
    bottom: 80,
    left: 100
  };
  
  var width = svgWidth - margin.left - margin.right;
  var height = svgHeight - margin.top - margin.bottom;
  
  // Create an SVG wrapper, append an SVG group that will hold our chart,
  // and shift the latter by left and top margins.
  var svg = d3
    .select("#scatter")
    .append("svg")
    .attr("width", svgWidth)
    .attr("height", svgHeight);
  
  // Append an SVG group
  var chartGroup = svg.append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);


// Initiap Params
var chosenXAxis = "In Poverty(%)";
var chosenYAxis = "Lacks Healthcare(%)";

//function used for updating x-scale var upon click on X-axis
// Create Scale Function
function xScale(healthCareData, chosenXAxis){
    var xLinearScale = d3.scaleLinear()
                        .domain([d3.min(healthCareData, d => d[chosenXAxis]), d3.max(dataHealthCare, d => d[chosenXAxis])])
                        .range([0, width]);

    return xLinearScale;
}

//function used for updating y-scale 
function yScale(healthCareData, chosenYAxis){
    //create y scale function
    var yLinearScale = d3.scaleLinear()
                        .domain([d3.min(healthCareData, d => d[chosenXAxis]), d3.max(dataHealthCare, d => d[chosenXAxis])])
                        .range([height, 0]);
    return yLinearScale;


}

// function used for updating xAxis var upon click on axis label
function renderXAxes(newXScale, xAxis) {
    var bottomAxis = d3.axisBottom(newXScale);
  
    xAxis.transition()
      .duration(1000)
      .call(bottomAxis);
  
    return xAxis;
  }

  // function used for updating yAxis var upon click on axis label
function renderYAxes(newYScale, yAxis) {
    var leftAxis  = d3.axisLeft(newYScale);
  
    yAxis.transition()
      .duration(1000)
      .call(bottomAxis);
  
    return yAxis;
  }

  




