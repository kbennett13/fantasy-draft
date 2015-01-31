var viewOptions = ["Select View", "Compare Players", "Compare Players By Position"];
var positionOptions = ["Select Position","QB", "WR", "RB", "TE", "WR/RB/TE", "K", "DEF"];
var numberOptions = ["Select Limit",5,10,25,50];
var toIgnore = ["Year","Rank","Id","Name","Position","Team"];
var axisOptions;
var yearOptions = [];
var files = ["data/passingData.csv","data/receivingData.csv","data/rushingData.csv"];
var dataFile;

// build select for view and position options
function buildOptions(name, optionList) {
  results = "";
  
  results += "<select class=\"form-control\" id=\"" + name + "\">";
  
  for (option in optionList) {
    results += "<option value=" + optionList[option] + ">" + optionList[option] + "</option>";
  }
  
  results += "</select>"
  
  return results;
}

function generateYears() {
  yearOptions.push("Select Year");
  for (y = yearMin; y <= yearMax; y++) {
    yearOptions.push(y);
  }
}

function getFirstLine() {
  var txtFile = new XMLHttpRequest();
  txtFile.open("GET", dataFile, false);
  txtFile.send();

  lines = txtFile.responseText.split("\n");
  return lines[0].split(",");
}

function generateAxisOptions() {
  axisOptions = [];
  axisOptions.push("Select Measure");
  measures = getFirstLine();
  for (i = 0; i < measures.length; i++) {
    if (toIgnore.indexOf(measures[i]) == -1) {
      axisOptions.push(measures[i]);
    }
  }
}

// event listeners
window.onload = function() {
  document.getElementById("view").innerHTML = buildOptions("viewSelect", viewOptions);
  document.getElementById("position").innerHTML = buildOptions("positionSelect", positionOptions);
  generateYears();
  document.getElementById("limitYear").innerHTML = buildOptions("yearSelect", yearOptions);
  document.getElementById("number").innerHTML = buildOptions("numberSelect", numberOptions);
  
  document.getElementById("viewSelect").onchange = function () {
    if(document.getElementById("viewSelect").value == viewOptions[0]) {
      var toHide = document.getElementsByClassName("post-view");
      for (el = 0; el < toHide.length; el++) {
        toHide[el].style.display = "none";
      }
    } else if (document.getElementById("viewSelect").value == viewOptions[1]) {
      
    } else {
      var toShow = document.getElementsByClassName("post-view");
      for (el = 0; el < toShow.length; el++) {
        toShow[el].style.display = "inline";
      }
    }
  }
  
  document.getElementById("positionSelect").onchange = function () {
    var position = document.getElementById("positionSelect").value;
    if(position == positionOptions[0]) {
      var toHide = document.getElementsByClassName("post-position");
      for (el = 0; el < toHide.length; el++) {
        toHide[el].style.display = "none";
      }
    } else {
      for (i = 0; i < positionOptions.length; i++) {
        if (position == positionOptions[i]) {
          dataFile = files[i-1];
          generateAxisOptions();
          document.getElementById("scatterplotX").innerHTML = buildOptions("scatterplotXSelect", axisOptions);
          document.getElementById("scatterplotY").innerHTML = buildOptions("scatterplotYSelect", axisOptions);
          document.getElementById("scatterplotXSelect").onchange = function () {
            var xAxis = document.getElementById("scatterplotXSelect").value;
            if(xAxis == positionOptions[0]) {
              var toHide = document.getElementsByClassName("post-axes");
              for (el = 0; el < toHide.length; el++) {
                toHide[el].style.display = "none";
              }
            } else {
              plotStats(dataFile, position, undefined, undefined);
              var toShow = document.getElementsByClassName("post-axes");
              for (el = 0; el < toShow.length; el++) {
                toShow[el].style.display = "inline";
              }
            }
          }
          
          document.getElementById("scatterplotYSelect").onchange = function () {
            var yAxis = document.getElementById("scatterplotYSelect").value;
            if(yAxis == positionOptions[0]) {
              var toHide = document.getElementsByClassName("post-axes");
              for (el = 0; el < toHide.length; el++) {
                toHide[el].style.display = "none";
              }
            } else {
              plotStats(dataFile, position, undefined, undefined);
              var toShow = document.getElementsByClassName("post-axes");
              for (el = 0; el < toShow.length; el++) {
                toShow[el].style.display = "inline";
              }
            }
          }
        }
      }
      var toShow = document.getElementsByClassName("post-position");
      for (el = 0; el < toShow.length; el++) {
        toShow[el].style.display = "inline";
      }
    }
  }
  
  document.getElementById("yearSelect").onchange = function () {
    var position = document.getElementById("positionSelect").value;
    if(document.getElementById("yearSelect").value == yearOptions[0]) {
      buildScatterplot(position,undefined,undefined);
      var toHide = document.getElementsByClassName("post-year");
      for (el = 0; el < toHide.length; el++) {
        toHide[el].style.display = "none";
      }
    } else {
      var year = document.getElementById("yearSelect").value;
      buildScatterplot(position,year,undefined);
      var toShow = document.getElementsByClassName("post-year");
      for (el = 0; el < toShow.length; el++) {
        toShow[el].style.display = "inline";
      }
    }
  }
  
  document.getElementById("numberSelect").onchange = function () {
    var position = document.getElementById("positionSelect").value;
    var limit = document.getElementById("numberSelect").value;
    var year = document.getElementById("yearSelect").value;
    if(value == numberOptions[0]) {
      buildScatterplot(position,year,undefined);
    } else {
      buildScatterplot(position,year,limit);
    }
  }
}
