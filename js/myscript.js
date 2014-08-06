$(document).on("pagebeforeshow","#index", function() {
		$.ajax({
			type: "GET",
			url: "recipes.xml",
			dataType: "xml",
			success: getFoodList
		});	
});

$(document).on("pagebeforeshow","#mac", function() {
		$("#macHeader").html("");
		$("#mac1").html("");
		$("#mac2").html("");		
		$.ajax({
		type:"GET",
		url: "recipes.xml",
		dataType:"xml",
		success: function(xml) {
			getRecipeInfo(xml, "mac");
		},
	});
});

$(document).on("pagebeforeshow","#burger", function() {
		$("#burgerHeader").html("");
		$("#burger1").html("");
		$("#burger2").html("");
		$.ajax({
		type:"GET",
		url: "recipes.xml",
		dataType:"xml",
		success: function(xml) {
			getRecipeInfo(xml, "burger");
		},
	});
});

$(document).on("pagebeforeshow","#crepe", function() {
		$("#crepeHeader").html("");	
		$("#crepe1").html("");
		$("#crepe2").html("");
		$.ajax({
		type:"GET",
		url: "recipes.xml",
		dataType:"xml",
		success: function(xml) {
			getRecipeInfo(xml, "crepe");
		},
	});
});
	
function getFoodList(xml)
    { 
		$("#title").html("");
		$("#homeHeader").html("");
		$("#foodList").html("");
		$("#title").append($(xml).find("myRecipes").attr("title"));
		$("#homeHeader").append($(xml).find("myRecipes").attr("title"));
		$(xml).find("recipe").each(function() {
 			$("#foodList").append("<li><a href='#" + $(this).find("rname").attr("id") + "' data-transition='pop'>" + $(this).find("rname").text() + "<img src='" + $(this).find("rpic").text() + "' /></a></li>"); 
			$("#foodList").listview("refresh");
		});
	}

function getRecipeInfo (xml, choice) {
	$(xml).find("recipe").each(function(){
	if (choice == $(this).find("rname").attr("id")) 
		{			
			$("#"+choice+"Header").html("");
			$("#"+choice+"Header").append($(this).find("rname").text()+"<br><br><img src='" + $(this).find("rpic").text() + "'/>");						
			$("#"+choice+"a").append("<p><strong>Makes <em>" + $(this).find("rname").attr("ser") + "</em> Servings<br>Preparation Time: <em>" + $(this).find("rname").attr("ptime") +  "</em></strong></p>");
			$("#"+choice+"a").append("<p><strong>Ingredients</strong></p>");
			$("#"+choice+"b").append("<p><strong>Instructions</strong></p>");
			$(this).find("food").each(function(){
				$("#"+choice+"a").append($(this).attr("amt") + " " + $(this).text() + "<br>");
			});		
			var i = 0;			
			$(this).find("step").each(function(){
			i++;
				$("#"+choice+"b").append(i + ". " +$(this).text() + "<br><br>");
			});			
		}
	});
}