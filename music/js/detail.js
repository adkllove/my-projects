//@ sourceURL=js/detail.js

(function(){
	function getPlayList(id, callback){

		$.ajax({
			type:"get",
			url:"https://api.imjad.cn/cloudmusic/?type=playlist&id="+id,
			async:true,
			success: function(data){
				$('#com').hide()
				if (data.code==200)
					callback(data.playlist);
			}
		});
	}
	
	
	var p = getUrlParams();
	
	
	getPlayList(p.id, function(data){
		
		var $musicList = $("#musicList");
		var template = $("#templateMusic").html();
		
		for(var i=0; i< data.tracks.length; i++){
			var music = data.tracks[i];
			console.log()
			var $template = $(template);
			$template.find(".music").html(music.name);
			$template.find(".artist").html(music.ar[0].name);
			$template.appendTo($musicList);
//			var music = {
//				date:data.tracks[i].id
//			};
			$template.data('music', data.tracks[i]);
			$template.click(function(){
				
				$('.tishi').text('加载中………………')
				var music = $(this).data('music');
				console.log(music)
				play(music)
				$('.music_name').text(music.name)
				$('.ar_name').text(music.ar[0].name)
			})
		}
	});
})();
