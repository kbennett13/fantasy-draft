var data;
var scatterplot;
var margin = {top: 20, right: 25, bottom: 20, left: 50};
var width = window.innerWidth - document.getElementById("viewDiv").offsetWidth - document.getElementById("optionsDiv").offsetWidth - margin.left - margin.right;
var scatterplotHeight = 0.5*window.innerHeight - margin.top - margin.bottom;
var graphHeight = 0.5*window.innerHeight - margin.top - margin.bottom;
var graphVisible = false;

// d3
function plotStats(dataFile, position, year, limit) {
  d3.csv(dataFile, function(error, contents) {
    if (error) {
      console.log(error);
    } else {
      data = contents;
    }
    
    buildScatterplot(position,year,limit);
  });
}

function compareStats(a, b) {
  if (parseInt(a["Completions"]) < parseInt(b["Completions"])) {
    return 1;
  }
  
  if (parseInt(a["Completions"]) > parseInt(b["Completions"])) {
    return -1;
  }
  
  return 0;
}

function addScatterplot() {
  scatterplot = d3.select("#scatterplot").html("")
          .append("svg")
          .attr("width", width + margin.left + margin.right)
          .attr("height", scatterplotHeight + margin.top + margin.bottom);
}

function buildScatterplot(position,year,limit) {
  addScatterplot();

  var xScale = d3.scale.linear();
  var xMin = d3.min(data, function(d) {
              return parseInt(d["Attempts"]);  //References first value in each subarray
            });
  var xMax = d3.max(data, function(d) {
              return parseInt(d["Attempts"]);  //References first value in each subarray
            });
  xScale.domain([0,xMax]);
  xScale.range([margin.left, width]);
  var yScale = d3.scale.linear();
  var yMin = d3.min(data, function(d) {
                    return parseInt(d["Completions"]);  //References first value in each subarray
                    });
  var yMax = d3.max(data, function(d) {
                    return parseInt(d["Completions"]);  //References first value in each subarray
                    });
  yScale.domain([0,yMax]);
  yScale.range([scatterplotHeight, margin.bottom]);
  
  var filteredData = data.filter(function (stat) { return stat["Position"] == position; } );
  if (year) {
    filteredData = filteredData.filter(function (stat) { return parseInt(stat["Year"]) == year; } );
    if (limit) {
      sortedData = filteredData.sort(compareStats);
      filteredData = sortedData.slice(0,limit);
    }
  }
  
  scatterplot.selectAll("circle")
      .data(filteredData)
      .enter()
      .append("circle")
      .attr("cx", function(d) {
            return xScale(d["Attempts"]);
            })
      .attr("cy", function(d) {
            return yScale(d["Completions"]);
            })
      .attr("r", 4)
      .attr("fill", "red")
      .attr("stroke", "black")
      .attr("stroke-width",1)
      .on("mouseenter", function(d) {
        var xPosition = parseFloat(d3.select(this).attr("cx")) + parseInt(d3.select(this).attr("r")) + 1;
        var yPosition = parseFloat(d3.select(this).attr("cy")) - parseInt(d3.select(this).attr("r")) - 1;
          scatterplot.append("text")
          .attr("id", "tooltip")
          .attr("x", xPosition)
          .attr("y", yPosition)
          .attr("text-anchor", "middle")
          .attr("font-family", "sans-serif")
          .attr("font-size", "12px")
          .attr("font-weight", "bold")
          .attr("fill", "black")
          .text(d["Name"]);
      })
      .on("mouseleave", function(d) {
        d3.select("#tooltip").remove();
      })
      .on("click", function(d) {
        if (graphVisible) {
          addToGraph(parseInt(d["Id"]));
        } else {
          drawGraph();
          addToGraph(parseInt(d["Id"]));
        }
      });
  
  var xAxis = d3.svg.axis()
                .scale(xScale)
                .orient("bottom");
  scatterplot.append("g")
              .attr("class", "axis")
              .attr("transform", "translate(0," + scatterplotHeight + ")")
              .call(xAxis);
  scatterplot.append("text")
              .attr("x", width/2)
              .attr("y", scatterplotHeight + margin.top + margin.bottom/2)
              .text("Attempts");
  
  var yAxis = d3.svg.axis()
                .scale(yScale)
                .orient("left");
  scatterplot.append("g")
              .attr("class", "axis")
              .attr("transform", "translate(" + margin.left + ", 0)")
              .call(yAxis);
  scatterplot.append("text")
              .attr("x", -scatterplotHeight/2-margin.top-margin.bottom)
              .attr("y", (1/4)*margin.left)
              .attr("transform", "rotate(-90)")
              .text("Completions");
}

function drawGraph() {
  
}

function addToGraph(id) {
  console.log(id);
}