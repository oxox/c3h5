J(function($,p,pub){
	pub.id='data';

	var $win = $(window),
		LS = localStorage;

	p.C = {
		_init:function(){
			this.load();
		},
		load:function(){
			$win.trigger(pub.id+'OnLoading');
            var baseUrl = location.pathname.substr(0,location.pathname.lastIndexOf('/'))+'/';
                url = baseUrl+"showcase.json";
			var jqxhr = $.ajax( url )
				.done(function(items) { 
					pub.showcases = items;
					p.C.loadShowcases(baseUrl);
				}).fail(function( jqXHR, textStatus, errorThrown) { 
					$win.trigger(pub.id+'OnLoaded',[{
						"isOk":false,
						"err":errorThrown
					}]);
				}).always(function() { });
		},
		loadShowcases:function(baseUrl){
			var len = pub.showcases.length;
			if (len===0) {
				$win.trigger(pub.id+'OnLoaded',[{
					"isOk":true,
					"data":null
				}]);
				return;
			};
			
			var cates = {},
			    item = null;
			
			for(var i=0; i<len; i++){
			    item = pub.showcases[i];
			    item.id = item.id||item.name;
                //惯例优于配置
                item.logo = item.logo||(baseUrl+'showcase/'+item.id+'/img/logo.jpg');
                item.url = item.url || (baseUrl+'showcase/'+item.id);
			    if (cates[item.category]) {
                    cates[item.category].cnt+=1;
                }else{
                    cates[item.category]={
                        name:(item.category||item.name),
                        cnt:1
                    };
                };
			};
			
			$win.trigger(pub.id+'OnLoaded',[{
                "isOk":true,
                "data":{
                    "items":pub.showcases,
                    "cates":cates
                }
            }]);

		}
	};

});