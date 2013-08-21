(function($){
	//page show
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
		$("#prop-detail_headname").text(prop_select);
		callSport("stock/prop",{params:{"prop":encodeURI(prop_select)}, success:function(data){
			$("#prop_image_thumbnail").html($("<img>").addClass("thumbnail").attr("src",server_url+"img/prop/"+encodeURI(data.name)));
			$("#bookDate").val(new Date().toJSON().slice(0,10));
			prop = data;
			var remain = changeRemainQty();
			
			$("#prop_detail_name").text(prop.name);
			$("#prop_detail_qty").text(remain+" / "+prop.qty);
		}});
	});
	//tab events
	$(document).on("tap","#confirm-book", function(event,data){
		var bookDate = $("input#bookDate").val();
		var bookQty = $("input#bookQty").val();
		booking(bookDate,bookQty);
	});
	//change events
	$(document).on("change","#bookDate", function(event){
			var remain = changeRemainQty();
			$("#prop_detail_qty").text(remain+" / "+prop.qty);
	});
	changeRemainQty = function(){
		var curRemainQty = prop.qty;
		if(prop.books){
			for(var bookKey in prop.books){
				var book = prop.books[bookKey];
				if(book.date == $("#bookDate").val()&&book.username!=user.username){
					curRemainQty -= book.qty;
				}
			}
		}
		return curRemainQty;
	};
	//booking
	booking = function(bookDate,bookQty){
		callSport("book/book",{params:{"prop":encodeURI(prop.name),date:bookDate,qty:bookQty},success:bookComplete});
	};
	bookComplete = function(data){
		if(data.status == "ok"){
			notification(data.message);
		}else{
			notification(data.message);
		}
	};
})(jQuery);