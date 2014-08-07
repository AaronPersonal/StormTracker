$(document).ready(function(){
  var allStorms = [];
  $.getJSON( "storms.json", function( data ) {
    var storms = [];
      var chartYear = "0";
      var totalStorm = 0;
      var nthYear = 0;
      var maxStorm = {maxKM: "0"};


      for(var i = 0; i < data.storms.storm.length;i++){
        var storm = data.storms.storm[i];
        storms.push(storm);
        allStorms.push(storm);
        totalStorm += 1;
        if(parseInt(storm.maxKM) > parseInt(maxStorm.maxKM)){
          maxStorm = storm;
        }
        if(storm.start.substring(0,4) == chartYear){
          var exit = data.storms.storm.length - 1;
        } else{
          if(chartYear != "0"){
                  $("#byYearReport").append("<table class='yearReportTables' id='yearReportTable"+nthYear+"'><thead><tr><th colspan='6'>"+chartYear+"</th></tr><tr><th>Name</th><th>Start</th><th>End</th><th>Max KM</th><th>Damage</th><th>Deaths</th></tr></thead><tbody>");
                  for (var j = 0; j<storms.length; j++) {
                    $("#yearReportTable"+nthYear).append("<tr><td>"+storms[j].name+"</td><td>"+storms[j].start+"</td><td>"+storms[j].end+"</td><td>"+storms[j].maxKM+"</td><td>"+storms[j].damage+"</td><td>"+storms[j].deaths+"</td></tr>");
                  }
                  $("#yearReportTable"+nthYear).append("<tr><th>"+chartYear+" Totals</th></tr><tr><th colspan='2'>Total Storms</th><td>"+totalStorm+"</td><th>Worst Storm</th><td>"+maxStorm.name+"</td><td>"+maxStorm.maxKM+" km/h</td></tr><tr></tr></tbody></table>");
                  storms = [];
                  var maxStorm = {maxKM: "0"};
          }
          chartYear = storm.start.substring(0,4);
          nthYear += 1;
          totalStorm = 0;
        }
    }
    $("#sortableReport").append("<table class='yearReportTables' id='sortableReportTable'><thead><tr><th>Name</th><th>Start</th><th>End</th><th>Category</th><th>Max MPH</th><th>Max KM</th><th>min MBAR</th><th>Damage</th><th>Deaths</th></tr></thead><tbody id='tableBody'>");
  for (var i = 0;i < allStorms.length; i++) {
    var s = allStorms[i];
    console.log(s.name);
    $("#tableBody").append("<tr><td>"+s.name+"</td><td>"+s.start+"</td><td>"+s.end+"</td><td>"+s.category+"</td><td>"+s.maxMPH+"</td><td>"+s.maxKM+"</td><td>"+s.minMBAR+"</td><td>"+s.damage+"</td><td>"+s.deaths+"</td></tr>");
  };
  $("#sortableReport").append("</tbody></table>");
    $('#sortableReportTable').dataTable({
      paging: false
    });
});
   });
