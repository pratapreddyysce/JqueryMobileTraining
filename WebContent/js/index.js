(function($){
	$(document).ready(function(){
		$("div.main-menu-block").bind("tap",function(event){
			$(this).addClass("main-menu-click");
			setTimeout(function(){$("div.main-menu-block").removeClass("main-menu-click");},310);
			
		});
		
		$("#menu_store").bind("tap",function(event){
			$.mobile.changePage("view/stock.html",true,{transition:"pop"});
		});

		$(document).on("pageshow","#sport-page", function(event,data){
		
		});
	});
	
})(jQuery);