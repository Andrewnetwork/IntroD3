import * as d3 from "d3";
import './scss/app.scss';


function makeTable(data){
  // Create Table Header
  d3.select("#dat").append("thead").append("tr")
  .selectAll('th').data(data.columns).enter()
  .append("th").text(function (column) { return column; });

  // Populate Table
  d3.select("#dat").append("tbody").selectAll("tr").data(data).enter().append("tr")
  .selectAll("td").data(function (d){return Object.values(d.d);}).enter().append("td")
  .text(function(d){return d}).exit();
}

d3.dsv(",", "data/titanicData.csv", function(d) {
    return {d}
  }).then(function(data) {
    makeTable(data);
  });

