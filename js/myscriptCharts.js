$(document).ready(function(){
	$.getJSON( "storms.json", function( data ) {
		var storms = [];
		var stormsData = [['Year', 'Serious', 'Moderate']];
	  	var serious = [];
	  	var seriousData = [['Storm Name', 'Date']];
	  	var moderate = [];
	  	var moderateData = [['Storm Name', 'Date']];
	  	var chartYear = "0";
	  	var totalStorm = 0;
	  	var seriousStorm = 0;
	  	var moderateStorm = 0;
	  	console.log(data.storms.storm.length);


	  	for(var i = 0; i < data.storms.storm.length;i++){
	  		var storm = data.storms.storm[i];
	  		storms.push(storm);
	  		if(storm.start.substring(0,4) == chartYear){
	  		console.log(chartYear+": Serious = "+seriousStorm+", Moderate = "+ moderateStorm + ", Total = "+totalStorm);
		  		if (storm.category == "C3" || storm.category == "C4" || storm.category == "C5"){
		  			serious.push(storm);
		  			seriousStorm += 1;
		  		} else {
		  			moderate.push(storm);
		  			moderateStorm += 1;
		  		}
		  		var exit = data.storms.storm.length - 1;
		  		console.log(i+" "+exit);
	  		} else{
	  			if(chartYear != "0"){
	  				totalStorm = seriousStorm + moderateStorm;
		  			console.log(chartYear+": Serious = "+seriousStorm+", Moderate = "+ moderateStorm + ", Total = "+totalStorm);
		  			stormsData.push([chartYear, seriousStorm, moderateStorm]);
	  			}
	  			chartYear = storm.start.substring(0,4);
	  			console.log(chartYear);
	  			totalStorm = 0;
				if (storm.category == "C3" || storm.category == "C4" || storm.category == "C5"){
		  			serious.push(storm);
		  			seriousStorm = 1;
		  			moderateStorm = 0;
		  		} else {
		  			moderate.push(storm);
		  			moderateStorm = 1;
		  			seriousStorm = 0;	
		  		}
	  		}
		}
		totalStorm = seriousStorm + moderateStorm;
		console.log(chartYear+": Serious = "+seriousStorm+", Moderate = "+ moderateStorm + ", Total = "+totalStorm);
		stormsData.push([chartYear, seriousStorm, moderateStorm]);
		
		google.load("visualization", "1", {packages:["corechart"], callback: drawChart});
      function drawChart() {
        var data = google.visualization.arrayToDataTable(stormsData);

        var options = {
          title: 'Storms by Year',
          legend: { position: 'top', maxLines: 3 },
		  bar: { groupWidth: '75%' },
          isStacked: true,
          annotations: {
    textStyle: {
      fontName: 'Times-Roman',
      fontSize: 18,
      bold: true,
      italic: true,
      color: '#871b47',     // The color of the text.
      auraColor: '#d799ae', // The color of the text outline.
      opacity: 0.8          // The transparency of the text.
    }
},
        };

        var chart = new google.visualization.BarChart(document.getElementById('chart_div'));
        chart.draw(data, options);
      }
	});

});
function compare(a,b) {
  if (a.c < b.c)
     return -1;
  if (a.c > b.c)
    return 1;
  return 0;
}