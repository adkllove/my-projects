var server = "https://musicapi.duapp.com/api.php";

function getPlayLists(limit, callback){
	limit = limit || 12;
	
	if (checkCache()){
		$('#com').text('')
		// 访问缓存
		callback(JSON.parse( localStorage.playlists ));
		console.log("访问缓存");
	} else {
		// 访问网络
		$.ajax({
			type:"get",
			url: server+"?type=topPlayList&cat=%E5%85%A8%E9%83%A8&offset=0&limit="+limit,
			async:true,
			success: function(data){
				
				if (data.code == 200){
					console.log(1)
					$('#com').text('')
					// 缓存
					data.playlists.cacheTime = new Date().getTime();
					localStorage.playlists = JSON.stringify( data.playlists );
//					localStorage.cacheTime = new Date().getTime();
					
					callback(data.playlists);
				}
			}
		});
		console.log("访问网络");
	}
}

function checkCache(){
	if(!localStorage.playlists)
		return false;
		
	if (new Date().getTime() - JSON.parse(localStorage.playlists).cacheTime >= 10*60*1000)
		return false;
		
	return true;
}

(function(){
	getPlayLists(15, function(data){
		

		var songlist = $("#songlist");
		
		var template = $("#templateItem").html();
		
		for(var i = 0; i < data.length; i++){
			var $template = $(template);
			
			// href="#detail?id=574078104"
			$template.find("a").attr("href", "#detail?id="+ data[i].id);
			$template.find("div").html(data[i].playCount);
			$template.find("img").attr("src", data[i].coverImgUrl);
			$template.find("p").html(data[i].name);
			$template.appendTo(songlist);
		}	

	});

})();
