(function($){
	
	var server_url = "http://localhost:8080/dpetrain/";
	var sport_selected = "";
	var gear_selected = "";
	var prop_select = "";
	var prop = null;
	var user = null;
	
	$(document).ready(function(){
		checkRemember();
		
		$(document).on("tap","#menu_store", function(event,data){
				$.mobile.changePage("stock.html",true,{transition:"slide"});
		});
		$(document).on("tap","div.main-menu-block", function(event,data){
			$(this).addClass("main-menu-click");
			setTimeout(function(){$("div.main-menu-block").removeClass("main-menu-click");},310);
		});
		$(document).on("tap","#btn_login", function(event,data){
			$(this).addClass("main-menu-click");
			var user = $("input#login_user").val();
			var pass = $("input#login_pass").val();
			var remm = $("select#remember-login").val();
			authentication(user,pass,remm);
		});
		$(document).on("tap","#btn_register", function(event,data){
			$.mobile.changePage("regis.html",true,{transition:"slide"});
		});
		$(document).on("tap","#confirm-book", function(event,data){
			var bookDate = $("#bookingDate").val();
			var bookQty = $("#bookQty").val();
			bookItem(bookDate,bookQty);
		});
		$(document).on("tap","#bnt_regis_p", function(event,data){
			$(this).addClass("main-menu-click");
			var user = $("input#regis_user").val();
			var pass = $("input#regis_pass").val();
			registation(user,pass);
		});
		$(document).on("change","#bookingDate", function(event,data){
			var bookDate = $(this).val();
			prop.books;
			var curQty = prop.qty;
			if(prop.books){
				for(var book in prop.books){
					if(book.date == bookDate){
						curQty -= book.qty;
					}
				}
			}
			$("#prop_detail_qty").text(curQty);
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
			$("#prop-detail_headname").text(prop_select);
			callSport("stock/prop",{params:{"prop":encodeURI(prop_select)}, success:function(data){
				$("#prop_image_thumbnail").html($("<img>").addClass("thumbnail").attr("src",server_url+"img/prop/"+encodeURI(data.name)));
				$("#prop_detail_name").text(data.name);
				$("#prop_detail_qty").text(data.qty);
				prop = data;
			}});
		});
	});
	

	callSport = function(path,option){
		 $.ajax({
             url: server_url+path,
             dataType: 'jsonp',
             data:option.params,
             success: (option.success?option.success:null)
         });
	};
	// check remember
	checkRemember = function(){
		callSport("auth/check",{success:checkSuccess});
	};
	checkSuccess = function(data){
		if(data.status == "ok"){
				$.mobile.changePage("view/menu.html",true,{transition:"pop"});
				user = data.user;
		}else{
				$.mobile.changePage("view/login.html",true,{transition:"slideDown"});
				user = null;
		}
	};
	//login
	authentication = function(user,pass,remm){
		callSport("auth/login",{params:{username:user,password:pass,remember:(remm=='on')},success:loginComplete});
	};
	loginComplete = function(data){
		if(data.status == "ok"){
			$.mobile.changePage("menu.html",true,{transition:"pop"});
			user = data.user;
		}else{
			notification(data.message);
		}
	};
	//logout
	logout = function(){
		callSport("auth/logout",{success:logoutComplete});
	};
	logoutComplete = function(data){
		if(data.status == "ok"){
			$.mobile.changePage("login.html",true,{transition:"slideDown"});
		}else{
			notification(data.message);
		}
	};
	//register
	registation = function(user,pass){
		callSport("auth/regis",{params:{username:user,password:pass},success:regisComplete});
	};
	regisComplete = function(data){
		if(data.status == "ok"){
			$.mobile.changePage("login.html",true,{transition:"slide"});
			notification(data.message);
		}else{
			notification(data.message);
		}
	};
	//booking
	bookItem = function(bookDate,bookQty){
		callSport("book/book",{params:{"prop":prop.name,date:bookDate,qty:bookQty},success:bookComplete});
	};
	bookComplete = function(data){
		if(data.status == "ok"){
			$.mobile.changePage("login.html",true,{transition:"slide"});
			notification(data.message);
		}else{
			notification(data.message);
		}
	};
	
	notification = function(message){
		$("#notification-message").text(message);
		$("#notification-popup").popup();
		$("#notification-popup").popup("open");
		setTimeout(function(){$("#notification-popup").popup("close");},750);
	};
})(jQuery);