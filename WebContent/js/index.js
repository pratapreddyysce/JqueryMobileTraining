var server_url = "http://localhost:8080/dpetrain/";
var sport_selected = "";
var gear_selected = "";
var prop_select = "";
var user = null;
var prop = null;

(function($){
	
	$(document).ready(function(){
		checkRemember();
	});
	// check remember
	checkRemember = function(){
		callSport("auth/check",{success:checkSuccess});
	};
	checkSuccess = function(data){
		if(data.status == "ok"){
			user = data.user;
			if(user.role =="1"){
				$.mobile.changePage("view/admin/menu.html",true,{transition:"pop"});
			}else{
				$.mobile.changePage("view/user/menu.html",true,{transition:"pop"});
			}
		}else{
				$.mobile.changePage("view/login.html",true,{transition:"slideDown"});
		}
	};
})(jQuery);