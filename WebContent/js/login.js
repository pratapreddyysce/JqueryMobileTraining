(function($){
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
	//login
	authentication = function(user,pass,remm){
		callSport("auth/login",{params:{username:user,password:pass,remember:(remm=='on')},success:loginComplete});
	};
	loginComplete = function(data){
		if(data.status == "ok"){
			user = data.user;
			if(user.role =="1"){
				$.mobile.changePage("admin/menu.html",true,{transition:"pop"});
			}else{
				$.mobile.changePage("user/menu.html",true,{transition:"pop"});
			}
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
			$.mobile.changePage("../login.html",true,{transition:"slideDown"});
		}else{
			notification(data.message);
		}
	};
	
	// registration
	$(document).on("tap","#bnt_regis_p", function(event,data){
		$(this).addClass("main-menu-click");
		var user = $("input#regis_user").val();
		var pass = $("input#regis_pass").val();
		registation(user,pass);
	});
	registation = function(user,pass){
		callSport("auth/regis",{params:{username:user,password:pass},success:regisComplete});
	};
	regisComplete = function(data){
		if(data.status == "ok"){
			notification(data.message);
			setTimeout(function(){$.mobile.changePage("login.html",true,{transition:"slide"});},750);
		}else{
			notification(data.message);
		}
	};
})(jQuery);