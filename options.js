var viewOptions = ["Select View", "Compare Players", "Compare Players By Position"];
var positionOptions = ["Select Position","QB", "WR", "RB", "TE", "WR/RB/TE", "K", "DEF"];
var numberOptions = ["Select Limit",5,10,25,50];
var yearMin = 2002;
var yearMax = 2014;
var yearOptions = [];
var files = ["data/passingData.csv"];
var dataFile;

// build select for view and position options
function buildOptions(name, optionList) {
  results = "";
  
  results += "<select class=\"form-control\" id=\"" + name + "\">";
  
  for (option in optionList) {
    results += "<option value=\"" + optionList[option] + "\">" + optionList[option] + "</option>";
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
    value = document.getElementById("positionSelect").value;
    if(value == positionOptions[0]) {
      var toHide = document.getElementsByClassName("post-position");
      for (el = 0; el < toHide.length; el++) {
        toHide[el].style.display = "none";
      }
    } else {
      if (value == positionOptions[1]) {
        dataFile = files[0];
        plotStats(dataFile, undefined);
      }
      var toShow = document.getElementsByClassName("post-position");
      for (el = 0; el < toShow.length; el++) {
        toShow[el].style.display = "inline";
      }
    }
  }
  
  document.getElementById("yearSelect").onchange = function () {
    if(document.getElementById("yearSelect").value == yearOptions[0]) {
      buildScatterplot(undefined);
      var toHide = document.getElementsByClassName("post-year");
      for (el = 0; el < toHide.length; el++) {
        toHide[el].style.display = "none";
      }
    } else {
      var year = document.getElementById("yearSelect").value;
      console.log(year);
      buildScatterplot(year);
      var toShow = document.getElementsByClassName("post-year");
      for (el = 0; el < toShow.length; el++) {
        toShow[el].style.display = "inline";
      }
    }
  }
  
  document.getElementById("numberSelect").onchange = function () {
    var value = document.getElementById("numberSelect").value;
    var year = document.getElementById("yearSelect").value;
    if(value == 0) {
      buildScatterplot(year);
    } else {
      buildScatterplot(year);
    }
  }
}
