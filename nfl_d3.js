var data;

// d3
d3.csv("data/passingData.csv", function(error, contents) {
  if (error) {
    console.log(error);
  } else {
    console.log(contents);
    data = contents;
  }
  
  loaded();
  buildScatterplot();
});

function buildScatterplot() {
  d3.select("body").selectAll("p")
    .data(data).enter()
    .append("p")
    .text(function(d) { return d["Name"]; } ); //data.indexOf(d)
}