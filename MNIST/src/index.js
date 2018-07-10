import * as d3 from "d3";
import css from "./style/main.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import {plotImg,changeSize,plotImgs} from "./ui";

export var MNIST = null;

d3.dsv(",", "data/train.csv", function(d) { 
    // Returns [X,y] vectors. 
    const values = Object.values(d);
    return [values.slice(1,values.length),values[0]]
})
.then(function(data) { 
  MNIST = data;
  d3.select("#loadingDiv").style("visibility","hidden");
  main();
  d3.select("body").append("div").attr("id","imgDisp");
  plotImgs("#imgDisp",0,80);
});

function main(){
  plotImg(MNIST[0]);

  d3.select("#slideContainer")
  .append("input")
    .attr("type","range")
    .attr("min","0")
    .attr("max",MNIST.length-1)
    .attr("value","0")
    .attr("class","slider")
    .attr("id","idx")
    .on("input",(events,selector,input)=>plotImg(MNIST[input[0].value]));

  d3.select("#slideContainer")
    .append("input")
      .attr("type","range")
      .attr("min","1")
      .attr("max","16")
      .attr("value","4")
      .attr("class","slider")
      .on("input",(events,selector,input)=>changeSize(input[0].value));
}

  