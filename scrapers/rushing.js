var request = require('request');
var cheerio = require('cheerio');
var fs = require('fs');

const yearMin = 2002; // stats go back to 2002
const yearMax = 2014; // most recent year available at time of writing
const perPage = 40; // number of results displayed per page

const rank = 0;
const name = 1;
const team = 2;
const attempts = 3;
const yards = 4;
const ypa = 5;
const td = 8;
const ypg = 9;
const fumbles = 10;

baseUrl = "http://espn.go.com/nfl/statistics/player/_/stat/rushing/";

var years = [];

var numResults = [];

var odd = [];
var even = [];

function changeTieRank(newRank) {
  tieRank = newRank;
}

function getTieRank() {
  return tieRank;
}

function appendOdd(newOdd) {
  odd.push(newOdd);
}

function appendEven(newEven) {
  even.push(newEven);
}

function getResults(year) {
  if (year) {
    url = baseUrl + "year/" + year + "/seasontype/2/qualified/false/count/1";
    page = request(url, function (err, resp, body) {
      $ = cheerio.load(body);
      yearResults = $('.totalResults')['0']['children']['0']['data'].trim().split(" ")[0];
      numResults.push(yearResults);
      getResults(years.shift());
    });
  } else {
    rushingYards(yearMin, 1, numResults.shift());
  }
}

function rushingYards(year, startNum, numYearResults)
{
  console.log(year + " " + startNum);
  
  url = baseUrl + "year/" + year + "/seasontype/2/qualified/false/count/" + startNum;
  
  request(url, function(err, resp, body) {
          
    $ = cheerio.load(body);
    
    // need all to add ranks for ties
    newOdd = $('#my-players-table .oddrow');
    newEven = $('#my-players-table .evenrow');
    
    for (i = 0; i < newOdd.length; i++) {
      if(newOdd[i]) {
        if (newOdd[i]['children'][0]['children'][0]['data'].match(/^[0-9]+$/i)) {
          changeTieRank(newOdd[i]['children'][0]['children'][0]['data']);
        }
    
        line = "";
        line += year;
        line += "," + getTieRank(); // rank
        page = newOdd[i]['children'][name]['children'][0]['attribs']['href'];
        line += "," + /[0-9]+/.exec(page); // id
        line += "," + newOdd[i]['children'][name]['children'][0]['children'][0]['data']; // name
        if (newOdd[i]['children'][name]['children'][0]['next']['data']) {
          position = newOdd[i]['children'][name]['children'][0]['next']['data']; // position
          line += "," + /[A-Z]+/.exec(position);
        } else {
          line += ",";
        }
        line += "," + newOdd[i]['children'][team]['children'][0]['data']; // team
        line += "," + newOdd[i]['children'][attempts]['children'][0]['data']; // attempts
        numYards = newOdd[i]['children'][yards]['children'][0]['data']; // yards
        line += "," + numYards.replace(",","");
        line += "," + newOdd[i]['children'][ypa]['children'][0]['data']; // ypa
        line += "," + newOdd[i]['children'][td]['children'][0]['data']; // td
        line += "," + newOdd[i]['children'][ypg]['children'][0]['data']; // ypg
        line += "," + newOdd[i]['children'][fumbles]['children'][0]['data']; // fumbles
        line += "\n";
        fs.appendFile("rushingData.csv",line);
      }
    
      if(newEven[i]) {
        if(newEven[i]['children'][0]['children'][0]['data'].match(/^[0-9]+$/i)) {
          changeTieRank(newEven[i]['children'][0]['children'][0]['data']);
        }
      
        line = "";
        line += year;
        line += "," + getTieRank(); // rank
        page = newEven[i]['children'][name]['children'][0]['attribs']['href'];
        line += "," + /[0-9]+/.exec(page); // id
        line += "," + newEven[i]['children'][name]['children'][0]['children'][0]['data']; // name
        if (newEven[i]['children'][name]['children'][0]['next']['data']) {
          position = newEven[i]['children'][name]['children'][0]['next']['data']; // position
          line += "," + /[A-Z]+/.exec(position);
        } else {
          line += ",";
        }
        line += "," + newEven[i]['children'][team]['children'][0]['data']; // team
        line += "," + newEven[i]['children'][attempts]['children'][0]['data']; // attempts
        numYards = newEven[i]['children'][yards]['children'][0]['data']; // yards
        line += "," + numYards.replace(",","");
        line += "," + newEven[i]['children'][ypa]['children'][0]['data']; // ypa
        line += "," + newEven[i]['children'][td]['children'][0]['data']; // td
        line += "," + newEven[i]['children'][ypg]['children'][0]['data']; // ypg
        line += "," + newEven[i]['children'][fumbles]['children'][0]['data']; // fumbles
        line += "\n";
        fs.appendFile("rushingData.csv",line);
      }
    }
    
    if (startNum + 40 < numYearResults) {
      rushingYards(year, startNum + 40, numYearResults);
    } else if (year < yearMax) {
      rushingYards(year + 1, 1, numResults.shift());
    }
  });
}

for (y = yearMin; y <= yearMax; y++)
{
  years.push(y);
}

fs.appendFile("rushingData.csv","Year,Rank,Id,Name,Position,Team,Attempts,Yards,YPA,Touchdowns,YPG,Fumbles\n");
getResults(years.shift());