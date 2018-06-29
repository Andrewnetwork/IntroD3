import * as d3 from "d3";
import 'bootstrap';
// Drop handling events from: https://developer.mozilla.org/en-US/docs/Web/API/HTML_Drag_and_Drop_API/File_drag_and_drop


export function dropHandler(ev) {
    ev.preventDefault();
    d3.select("#drop_zone").attr("class","drop_zone_default");
    console.log('File(s) dropped');

    var reader = new FileReader();
    reader.onload = function(e) {
        processUpload(e.currentTarget.result);
    };

    if (ev.dataTransfer.items) {
        // Use DataTransferItemList interface to access the file(s)
        for (var i = 0; i < ev.dataTransfer.items.length; i++) {
          // If dropped items aren't files, reject them
          if (ev.dataTransfer.items[i].kind === 'file') {
            var file = ev.dataTransfer.items[i].getAsFile();
            console.log('... file[' + i + '].name = ' + file.name);
            var blob = file.slice(0,file.size,"application/vnd.ms-excel");
            reader.readAsText(blob);
            //readAsBinaryString(file.slice(0,100)));
            //console.log(file.slice([0,400])[0]);
          }
        }
      } else {
        // Use DataTransfer interface to access the file(s)
        for (var i = 0; i < ev.dataTransfer.files.length; i++) {
          var file = ev.dataTransfer.files[i];
          console.log('... file[' + i + '].name = ' + ev.dataTransfer.files[i].name);
          var blob = file.slice(0,file.size,"application/vnd.ms-excel");
          reader.readAsText(blob);
        }
      } 
      
      // Pass event to removeDragData for cleanup
      removeDragData(ev)
    
}

function removeDragData(ev) {
    console.log('Removing drag data')

    if (ev.dataTransfer.items) {
        // Use DataTransferItemList interface to remove the drag data
        ev.dataTransfer.items.clear();
    } else {
        // Use DataTransfer interface to remove the drag data
        ev.dataTransfer.clearData();
    }
}

export function dragOverHandler(ev) {
    ev.preventDefault();
    d3.select("#drop_zone").attr("class","drop_zone_over");
    console.log('File(s) in drop zone'); 
    
}

export function dragLeaveHandler(ev){
    d3.select("#drop_zone").attr("class","drop_zone_default");
    
}

function processUpload(str){
    const csv = d3.csvParse(str,function(d) { 
        return {d};
    });
    makeTable(csv);
}

export function makeTable(data){
    d3.select("#dat").selectAll("*").remove();

    // Create Table 
    var table = d3.select("#dat").append("table").attr("class","table");
  
    // Create Table Header
    table.append("thead").append("tr")
    .selectAll('th').data(data.columns).enter()
    .append("th").text(function (column) { return column; });
  
    // Populate Table
    table.append("tbody").selectAll("tr").data(data).enter().append("tr")
    .selectAll("td").data(function (d){return Object.values(d.d);}).enter().append("td")
    .text(function(d){return d}).exit();
}