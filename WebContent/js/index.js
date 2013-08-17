(function($){
	
	var server_url = "http://localhost:8080/dpetrain/";
	var sport_selected = "";
	var gear_selected = "";
	var prop_select = "";
	callSport = function(path,option){
		 $.ajax({
             url: server_url+path,
             dataType: 'jsonp',
             data:option.params,
             success: (option.success?option.success:null),
             error: (option.error?option.success:null)
         });
	};
	
	
	$(document).ready(function(){
		$("div.main-menu-block").bind("tap",function(event){
			$(this).addClass("main-menu-click");
			setTimeout(function(){$("div.main-menu-block").removeClass("main-menu-click");},310);
			
		});
		
		$("#menu_store").bind("tap",function(event){
			$.mobile.changePage("view/stock.html",true,{transition:"pop"});
		});

		$(document).on("pageshow","#sport-page", function(event,data){
			callSport("stock/sport",{success:function(data){
				var sportList = $("#sport-list").html("");
				for(var i = 0 ;i<data.length;i++){
					var listitem = $("<li>").html($("<a>").attr("href","gear.html").attr("data-transition","slide").text(data[i]));
					sportList.append(listitem);
					listitem.bind("tap",function(event){
						sport_selected = $(this).text();
					});
				}
				$("#sport-list").listview("refresh");
			}});
		});
		
		$(document).on("pageshow","#gear-page", function(event,data){
			$("#sport_name").text(sport_selected);
			callSport("stock/gear",{params:{"sport":encodeURI(sport_selected)}, success:function(data){
				var gearList = $("#gear-list").html("");
				for(var i = 0 ;i<data.length;i++){
					var listitem = $("<li>").html($("<a>").attr("href","prop.html").attr("data-transition","slide").text(data[i]));
					gearList.append(listitem);
					listitem.bind("tap",function(event){
						gear_selected = $(this).text();
					});
				}
				$("#gear-list").listview("refresh");
			}});
		});
		
		$(document).on("pageshow","#prop-page", function(event,data){
			$("#gear_name").text(gear_selected);
			callSport("stock/props",{params:{"gear_type":encodeURI(gear_selected)}, success:function(data){
				var propList = $("#prop-list").html("");
				for(var i = 0 ;i<data.length;i++){
					var listitem = $("<li>").html($("<a>").attr("href","detail.html").attr("data-transition","slide").text(data[i]));
					propList.append(listitem);
					listitem.bind("tap",function(event){
						prop_select = $(this).text();
					});
				}
				$("#prop-list").listview("refresh");
			}});
		});
		
		$(document).on("pageshow","#prop-detail-page", function(event,data){
			$("#gear_name").text(prop_select);
			callSport("stock/prop",{params:{"prop":encodeURI(prop_select)}, success:function(data){
				$("#prop_image_thumbnail").html($("<img>").addClass("thumbnail").attr("src",server_url+"img/prop/"+encodeURI(data.name)));
				$("#prop_detail_name").text(data.name);
				$("#prop_detail_qty").text(data.qty);
			}});
		});
	});
	
	
	
})(jQuery);