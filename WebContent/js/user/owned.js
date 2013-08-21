(function($){


	$(document).on("pageshow","#owned-page", function(event,data){
		$("#book_owned_date").val(new Date().toJSON().slice(0,10));
		queryOwnedList();
	});
	$(document).on("change","#book_owned_date", function(event){
		queryOwnedList();
	});
	//owned list
	queryOwnedList = function() {
		var bookDate = $("#book_owned_date").val();
		var sportList = $("#book-list").html("");
		if (bookDate != "") {
			callSport("book/ownedlist", {
				params : {
					"date" : bookDate
				},
				success : function(data) {

					for ( var i = 0; i < data.list.length; i++) {
						var item = data.list[i];
						var listitem = $("<li>").html($("<a>").attr("href", "javascript:void(0)").attr("id", item.bookKey).text(item.propname));
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