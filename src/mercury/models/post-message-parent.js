var childServerPath = "http://localhost/";
function setIframeHeight() {
	document.getElementById('p3-iframe').setAttribute('class', 'p3-height');
}

if (window['postMessage']){ // Check if browser supports postMessage
	if (window.addEventListener) {
		window.addEventListener("message", ReceiveMessage, false); // IE9+, Chrome, Firefox, Safari
	}else {
		window.attachEvent("onmessage", ReceiveMessage); // IE8
	}
}else{
	setIframeHeight();
}

function ReceiveMessage(event) {
	var strMessage = event.data;
	
	if(strMessage != 'scrollTop'){
		// Add height class on resize for worst case scenario
		window.onresize = function(event) {
			setIframeHeight();
		}
		
		// Do not post message if not correct origin
		if(event.origin == childServerPath){
			document.getElementById('p3-iframe').removeAttribute('class'); // Remove iframe height class if added on resize
			$('iframe#p3-iframe').attr('height',event.data); // Add dymanic height from postMessage to iframe
		}else{
			setIframeHeight();
		}
	}else{
		$("html,body").animate({ scrollTop: top }, "fast");
	}
}
