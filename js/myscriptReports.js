$(document).ready(function(){
	$.getJSON( "storms.json", function( data ) {
	  var storms = [];
	  $.each( data, function( key, val ) {
	    storms.push(this);
	    console.log(this.name);
	  });
	});
 
  // passing in the url string as the jqPlot data argument is a handy
  // shortcut for our renderer.  You could also have used the
  // "dataRendererOptions" option to pass in the url.
  var plot2 = $.jqplot('chart2', jsonurl,{
    title: "AJAX JSON Data Renderer",
    dataRenderer: ajaxDataRenderer,
    dataRendererOptions: {
      unusedOptionalUrl: jsonurl
    }
  });
});