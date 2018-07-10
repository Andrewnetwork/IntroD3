import * as d3 from "d3";
import {MNIST} from "./index";

const width = 28;
const height = 28;
var atomicUnit = 4;

export function changeSize(u){
    const idx = d3.select("#idx").property("value");
    atomicUnit = parseInt(u); 
    plotImg(MNIST[idx]);
}

export function plotImgs(uid,idx,timeOut){
    if(idx<MNIST.length){
        if(idx%10==0){
            d3.select(uid).selectAll("*").remove();
        }
        plotImg2(MNIST[idx],uid);
        setTimeout(()=>plotImgs(uid,idx+1,timeOut),timeOut);
    }
}

export function plotImg2(Xy,uid){
    const X = Xy[0]
    const y = Xy[1];

    var xCounter = 0;
    var yCounter = 0;
    var y_Counter = 0;

    d3.select(uid)
        .append("svg")
            .attr("height",height*atomicUnit)
            .attr("width", width*atomicUnit)
        .selectAll("rect")
        .data(X).enter()
        .append("rect")
            .attr("width",atomicUnit)
            .attr("height",atomicUnit)
            .style("fill","rgb(0,0,0)")
            .attr("fill-opacity",(d)=>d/255)
            .attr("x",(d)=>{
                xCounter = (xCounter+atomicUnit)%(width*atomicUnit);
                return xCounter;
            })
            .attr("y",(d)=>{
                y_Counter += atomicUnit
                if((y_Counter+atomicUnit) % (height*atomicUnit) == 0){
                    yCounter += atomicUnit;
                }
                return yCounter;
            });
}

export function plotImg(Xy){
    const X = Xy[0]
    const y = Xy[1];

    var xCounter = 0;
    var yCounter = 0;
    var y_Counter = 0;

    var svg = d3.select("#disp").select("svg");

    if(svg.empty()){
        // If the display container does not have an svg canvas,
        // setup one and append all the rectangles we need for our
        // pixles. 
        svg = 
        d3.select("#disp")
            .append("svg")
                .attr("height",height*atomicUnit)
                .attr("width", width*atomicUnit)
                .on("click",()=>alert(y))
                .selectAll("rect")
                .data(X).enter()
            .append("rect");
    }else{
        // Adjust svg size as needed. 
        d3.select("#disp").select("svg")
            .attr("height",height*atomicUnit)
            .attr("width", width*atomicUnit)
            .on("click",()=>alert(y))
            .selectAll("rect");
            
        // The display container already has an svg canvas. 
        svg = d3.select("#disp").selectAll("rect").data(X);
    }
    
    svg
    .attr("width",atomicUnit)
    .attr("height",atomicUnit)
    .transition()
    .duration(100)
    .style("fill","rgb(0,0,0)")
    .attr("fill-opacity",(d)=>d/255)
    .attr("x",(d)=>{
        xCounter = (xCounter+atomicUnit)%(width*atomicUnit);
        return xCounter;
    })
    .attr("y",(d)=>{
        y_Counter += atomicUnit
        if((y_Counter+atomicUnit) % (height*atomicUnit) == 0){
            yCounter += atomicUnit;
        }
        return yCounter;
    });
    
}