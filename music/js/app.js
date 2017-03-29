function getUrlParams(){
	var params = {};
	var url = window.location.href;
	
	var p = url.split("#");
	if (p.length == 2)
		p = p[1];
	else 
		p = url;
	
	p = p.split("?");
	if(p.length < 2){
		params.anchor = p[0];
		return params;
	}
	
	params.anchor = p[0];
	p = p[1].split("&");
	
	for(var i=0; i<p.length; i++){
		var kv = p[i].split("=");
		params[kv[0]] = kv[1];
	}
	return params;
}

function route(m, container){
	container = container || $("#share");
		 
	$.ajax({
		url:"views/"+m+".html",
		success: function(data){
			// 模块页面加载完毕
			container.html(data);
			
			// 加载模块JS
			loadJs(m);
		}
	});
	
//	$("#share").load("views/v1.html");
}

function loadJs(m) {
	$.ajax({
		url:"js/"+m+".js",
		dataType:"script"
	});
}

$(function(){
	if (!localStorage.count)
		localStorage.count = 0;
		
	localStorage.count++;

	if (localStorage.count == 1){
		route("hello")
	}else {
		route("tab");
		route('player',$('#global'))
	}
});

