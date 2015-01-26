var data;
var viewOptions = ["Select View","View By Player", "View By Position"];
var positionOptions = ["Select Position","QB", "WR", "RB", "TE", "WR/RB/TE", "K", "DEF"];

function buildOptions(name, optionList) {
  results = "";
  
  results += "<select id=\"" + name + "\">";
  
  for (option in optionList) {
    results += "<option value=\"" + option + "\">" + optionList[option] + "</option>";
  }
  
  results += "</select>"
  
  return results;
}

window.onload = function() {
  document.getElementById("view").innerHTML = buildOptions("viewSelect", viewOptions);
  document.getElementById("position").innerHTML = buildOptions("positionSelect", positionOptions);
  document.getElementById("viewSelect").onchange = function () {
    if(document.getElementById("viewSelect").value == 0) {
      var toHide = document.getElementsByClassName("post-view");
      for (el = 0; el < toHide.length; el++) {
        toHide[el].style.display = "none";
      }
    } else if (document.getElementById("viewSelect").value == 2){
      var toShow = document.getElementsByClassName("post-view");
      for (el = 0; el < toShow.length; el++) {
        toShow[el].style.display = "inline";
      }
    }
  }
}

d3.csv("data/passingData.csv", function(error, contents) {
  if (error) {
    console.log(error);
  } else {
    console.log(contents);
    data = contents;
  }
  
  buildScatterplot();
});

function buildScatterplot() {
  d3.select("body").selectAll("p")
    .data(data).enter()
    .append("p")
    .text(function(d) { if (data.indexOf(d) < 5) { return d["Name"]; } } );
}