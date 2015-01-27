var viewOptions = ["Select View", "View By Player", "Compare Players By Position"];
var positionOptions = ["Select Position","QB", "WR", "RB", "TE", "WR/RB/TE", "K", "DEF"];
var numberOptions = ["Select Limit",5,10,25,50];

// build select for view and position options
function buildOptions(name, optionList) {
  results = "";
  
  results += "<select class=\"form-control\" id=\"" + name + "\">";
  
  for (option in optionList) {
    results += "<option value=\"" + option + "\">" + optionList[option] + "</option>";
  }
  
  results += "</select>"
  
  return results;
}

// event listeners
function loaded() {
  document.getElementById("view").innerHTML = buildOptions("viewSelect", viewOptions);
  document.getElementById("position").innerHTML = buildOptions("positionSelect", positionOptions);
  document.getElementById("number").innerHTML = buildOptions("numberSelect", numberOptions);
  
  document.getElementById("viewSelect").onchange = function () {
    if(document.getElementById("viewSelect").value == 0) {
      var toHide = document.getElementsByClassName("post-view");
      for (el = 0; el < toHide.length; el++) {
        toHide[el].style.display = "none";
      }
    } else if (document.getElementById("viewSelect").value == 1) {
      
    } else {
      var toShow = document.getElementsByClassName("post-view");
      for (el = 0; el < toShow.length; el++) {
        toShow[el].style.display = "inline";
      }
    }
  }
  
  document.getElementById("positionSelect").onchange = function () {
    if(document.getElementById("positionSelect").value == 0) {
      var toHide = document.getElementsByClassName("post-position");
      for (el = 0; el < toHide.length; el++) {
        toHide[el].style.display = "none";
      }
    } else {
      var toShow = document.getElementsByClassName("post-position");
      for (el = 0; el < toShow.length; el++) {
        toShow[el].style.display = "inline";
      }
    }
  }
}
