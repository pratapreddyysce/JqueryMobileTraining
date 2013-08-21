(function($){
	//page show
	$(document).on("pageshow","#a-sport-page", function(event,data){
		callSport("stock/sport",{success:function(data){
			var sportList = $("#a-sport-list");
			for(var i = 0 ;i<data.length;i++){
				var splitLeft = $("<a>").attr("href","gear.html").attr("data-transition","slide").text(data[i]);
				var splitRight = $("<a>").attr("href","delete-confirm.html").attr("data-rel","dialog").text("Delete sport");
				var listitem = $("<li>");
				splitLeft.appendTo(listitem);
				splitRight.appendTo(listitem);
				sportList.append(listitem);
				listitem.bind("tap",function(event){
					sport_selected = $(this).text();
					console.log(sport_selected);
				});
			}
			$("#a-sport-list").listview("refresh");
		}});
	});
	$(document).on("pageshow","#a-gear-page", function(event,data){
		$("#a-sport_name").text(sport_selected);
		callSport("stock/gear",{params:{"sport":encodeURI(sport_selected)}, success:function(data){
			var gearList = $("#a-gear-list");
			for(var i = 0 ;i<data.length;i++){
				var splitLeft = $("<a>").attr("href","prop.html").attr("data-transition","slide").text(data[i]);
				var splitRight = $("<a>").attr("href","delete-confirm.html").attr("data-rel","dialog").text("Delete gear");
				var listitem = $("<li>");
				splitLeft.appendTo(listitem);
				splitRight.appendTo(listitem);
				gearList.append(listitem);
				listitem.bind("tap",function(event){
					gear_selected = $(this).text();
					console.log(sport_selected);
				});
			}
			$("#a-gear-list").listview("refresh");
		}});
	});
	
	$(document).on("pageshow","#a-prop-page", function(event,data){
		$("#gear_name").text(gear_selected);
		callSport("stock/props",{params:{"gear_type":encodeURI(gear_selected)}, success:function(data){
			var propList = $("#a-prop-list");
			for(var i = 0 ;i<data.length;i++){
				var splitLeft = $("<a>").attr("href","detail.html").attr("data-transition","slide").text(data[i]);
				var splitRight = $("<a>").attr("href","delete-confirm.html").attr("data-rel","dialog").text("Delete gear");
				var listitem = $("<li>");
				splitLeft.appendTo(listitem);
				splitRight.appendTo(listitem);
				propList.append(listitem);
				listitem.bind("tap",function(event){
					prop_select = $(this).text();
				});
			}
			$("#a-prop-list").listview("refresh");
		}});
	});
	
	$(document).on("pageshow","#a-prop-detail-page", function(event,data){
		$("#a-prop-detail_headname").text(prop_select);
		callSport("stock/prop",{params:{"prop":encodeURI(prop_select)}, success:function(data){
			$("#a-prop_image_thumbnail").html($("<img>").addClass("thumbnail").attr("src",server_url+"img/prop/"+encodeURI(data.name)));
			prop = data;
			$("#a-prop_detail_name").text(prop.name);
			$("#a-prop_detail_qty").val(prop.qty);
		}});
	});
	//tab events
	$(document).on("tap","#a-confirm-edit", function(event,data){
		//var bookDate = $("input#bookDate").val();
		//var bookQty = $("input#bookQty").val();
		//booking(bookDate,bookQty);
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