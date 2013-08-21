(function($) {
	
	$(document).on("tap", "#admin_store", function(event, data) {
		$.mobile.changePage("stock.html", true, {
			transition : "slide"
		});
	});
	
	$(document).on("tap", "#admin_booklist", function(event, data) {
		$.mobile.changePage("book.html", true, {
			transition : "slide"
		});
	});
	
	$(document).on("tap", "#admin_returnlist", function(event, data) {
		$.mobile.changePage("owned.html", true, {
			transition : "slide"
		});
	});

})(jQuery);