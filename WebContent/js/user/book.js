(function($){
	$(document).on("pageshow","#book-page", function(event,data){
		$("#book_date").val(new Date().toJSON().slice(0,10));
		queryBookingList();
	});
	$(document).on("change","#book_date", function(event){
		queryBookingList();
	});

	//booking list
	queryBookingList = function() {
		var bookDate = $("#book_date").val();
		var sportList = $("#book-list").html("");
		if (bookDate != "") {
			callSport("book/booklist", {
				params : {
					"date" : bookDate
				},
				success : function(data) {

					for ( var i = 0; i < data.list.length; i++) {
						var item = data.list[i];
						var listitem = $("<li>").attr("data-icon","gear").html($("<a>").attr("href", "javascript:void(0)").attr("id", item.bookKey).text(item.propname));
						$("<span>").addClass("ui-li-count ui-btn-up-c ui-btn-corner-all").text(item.qty).appendTo(listitem);
						sportList.append(listitem);
						listitem.bind("tap", function(event) {
							sport_selected = $(this).text();
						});
					}
					$("#book-list").listview("refresh");
				}
			});
		}
	};
})(jQuery);