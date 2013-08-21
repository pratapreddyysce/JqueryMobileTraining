(function($) {
	
	$(document).on("tap","div.main-menu-block", function(event,data){
		$(this).addClass("main-menu-click");
		setTimeout(function(){$("div.main-menu-block").removeClass("main-menu-click");},310);
	});
	
	$(document).on("tap", "#menu_store", function(event, data) {
		$.mobile.changePage("stock.html", true, {
			transition : "slide"
		});
	});
	
	$(document).on("tap", "#menu_booklist", function(event, data) {
		$.mobile.changePage("book.html", true, {
			transition : "slide"
		});
	});
	
	$(document).on("tap", "#menu_ownedlist", function(event, data) {
		$.mobile.changePage("owned.html", true, {
			transition : "slide"
		});
	});

})(jQuery);