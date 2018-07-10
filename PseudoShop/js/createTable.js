 // createTable.js
 // Andrew Ribeiro
 // July 10, 2018

function createTable(schema){
    // Create table
    const table = 
    d3.select("body")
      .append("div")
        .attr('id',"tableContainer")
      .append("table");

    // Create table title
    table
    .append("tr")
    .append("td")
      .attr("colspan",schema.headings.length)
      .attr("id","tableTitle")
      .text(schema.title);

    // Create column headers
    table
    .append("tr")
    .selectAll("th")
    .data(schema["headings"])
    .enter()
      .append("th")
        .text(function(heading){return heading;})
    
    // Basic sample statistics
    const ages = schema.rows.map(function(x){return x[0]});
    const purchases = schema.rows.map(function(x){return x[2]});
    const meanAge = ages.reduce(function(total,x){return total+x;})/ages.length;
    const meanPurchase = purchases.reduce(function(total,x){return total+x;})/purchases.length;
    const minAge = Math.min(...ages);
    const maxAge = Math.max(...ages);
    const minPurchases = Math.min(...purchases);
    const maxPurchases = Math.max(...purchases);

    // Coloring Rules 
    var cellCntr = 0;
    function cellStyle(value){
      var outVal = null;
      
      if(cellCntr == 0){
        // Age
        outVal = "background-color: rgba(152, 155, 155,"+value/maxAge+");";
      }else if(cellCntr == 1){
        // Gender
        if(value == "Female"){
          outVal = "background-color:rgb(194, 32, 219)";
        }else{
          outVal = "background-color:rgb(31, 75, 219)";
        }
      }else if(cellCntr == 2){
        // Purchase Total
        outVal = "background-color: rgba(31, 219, 34,"+value/maxPurchases+");";
      }

      cellCntr = (cellCntr + 1)%3;
      return outVal;
      
    }
    
    // Populate table rows with data
    table
    .selectAll("tr")
    .data(schema["rows"])
    .enter()
      .append("tr")
      .selectAll("td")
      .data(function(row){return row;}) 
      .enter()
        .append("td")
        .attr("style",cellStyle)
        .text(function(d){return d});
      
    return table
  }