notification = function(message) {
	var popupPane;
	if ($("#notification-popup").size() > 0) {
		$("#notification-message").text(message);
		popupPane = $("#notification-popup").popup();
	} else {
		popupPane = $("<div>")
			.attr("data-role", "popup")
			.attr("data-theme", "e")
			.attr("data-transition", "pop")
			.attr("id", "notification-popup")
			.html($("<p>")
					.attr("id", "notification-message")
					.text(message))
			.popup();
	}
	popupPane.popup("open");
	setTimeout(function() {
		$("#notification-popup").popup("close");
	}, 750);
};

callSport = function(path, option) {
	$.ajax({
		url : server_url + path,
		dataType : 'jsonp',
		data : option.params,
		success : (option.success ? option.success : null)
	});
};