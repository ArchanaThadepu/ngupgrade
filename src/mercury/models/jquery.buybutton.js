
$(document).ready(function(){

	if(navigator.userAgent.indexOf("MSIE") != -1 || navigator.userAgent.indexOf("Trident/7") != -1){
		$("html").addClass("ie");
		
		orientation(680);
		$(window).bind('resize', function(){
			orientation(663);
		});
	}else{
		$("html").addClass("non-ie");
	}
	
	if(isSafari()){
		$('html').addClass('safari');	
	}else{
		$('html').addClass('non-safari');
	}
	
	if(navigator.userAgent.match(/(Android)/)){
		$(document).on("keyup",'input[type="text"], input[type="email"]',function(e){
			if($(this).val().length > $(this).prop('maxlength')){
				$(this).val($(this).val().substr(0, $(this).prop('maxlength')));
			}
		});
	}
		
	$(document).on("keydown",'input[id^="vin"]',function(event){
		if(!navigator.userAgent.match(/(Android)/)){
			switch(event.keyCode) {
				case 8:  // Backspace
				case 9:  // Tab
				case 37: // Left
				case 38: // Up
				case 39: // Right
				case 40: // Down
				case 46: // Delete
				break;
				default:
					var validVinRegex = new RegExp("[^0-9a-hj-npr-z]","gi");
					//Checks if keycode is part of numpad
					var isValidVinChar = (111 >= event.keyCode && event.keyCode >= 96)
					    ? validVinRegex.test(String.fromCharCode(event.keyCode-48))
						: validVinRegex.test(String.fromCharCode(event.keyCode));
					if(event.shiftKey){
						if(event.keyCode >= 48 && event.keyCode <= 57){
							event.preventDefault();
							return false;
						}
					}
					if(isValidVinChar){
						event.preventDefault();
						return false;
					}
					break;
			}
		}
	});
});

function orientation(value){
	var width = $(window).width();
	var height = $(window).height();
	
	switch(true){
		case (width > value):
			$('html').addClass('dt');
			$('html').removeClass('mo');
			break;
		default:
			$('html').removeClass('dt');
			$('html').addClass('mo');
			break;
	}
	switch(true){
		case (height > value):
			$('html').removeClass('land');
			$('html').addClass('picture');
			break;
		default:
			$('html').removeClass('picture');
			$('html').addClass('land');
			break;
	}
}

function isSafari() {
	var isSafari = false;
	var safariAgent = navigator.userAgent.toLowerCase().indexOf('safari') > -1;
	var chromeAgent = navigator.userAgent.toLowerCase().indexOf('chrome') > -1;
	
	if(safariAgent && !chromeAgent){
		isSafari = true;
	}
	return isSafari;
}

function keyboardCheck(event, element, goLink) {
    if (event.keyCode == 13) {
        if (element) {
            goLink ? $(event.target)[0].click() : $(event.target).prev()[0].click();
        } else {
            $(event.target).triggerHandler('click');
        }
    }
}

function toggleSection(elementId, closeAll){
	var cusid_ele = document.getElementsByClassName('slide-up');
	$('#'+elementId).parent().attr('aria-live', 'polite')
	if(closeAll){
		for (var i = 0; i < cusid_ele.length; ++i) {
		    var item = cusid_ele[i];  
		    if(item.id!=elementId){
			    $('#'+item.id).removeClass("slide-up");
			    $('#'+item.id).addClass("slide-down");	    	
		    }
		}
	}	
	
	switch($('#'+elementId).hasClass("slide-down")){
		case (true):
			$('#'+elementId).removeClass("slide-down");
			$('#'+elementId).addClass("slide-up");
			$('#'+elementId).parent().attr("tabindex", 0);
			$('#'+elementId).attr("aria-hidden", false);
			break;
		case (false):
			$('#'+elementId).removeClass("slide-up");
			$('#'+elementId).addClass("slide-down");
			$('#'+elementId).parent().attr("tabindex", -1);
			$('#'+elementId).attr("aria-hidden", true);
			break;
	}
}

function closeAllHelpSections() {
	var cusid_ele = document.getElementsByClassName('slide-up');
	for (var i = 0; i < cusid_ele.length; ++i) {
			var item = cusid_ele[i];
	    $('#'+item.id).removeClass("slide-up");
		  $('#'+item.id).addClass("slide-down");	    	
	}
}
