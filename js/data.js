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

			var jqxhr = $.ajax( "showcase.json" )
				.done(function(items) { 
					pub.showcaseIds = items;
					p.C.loadShowcases();
				}).fail(function( jqXHR, textStatus, errorThrown) { 
					$win.trigger(pub.id+'OnLoaded',[{
						"isOk":false,
						"err":errorThrown
					}]);
				}).always(function() { });
		},
		loadShowcases:function(){
			var len = pub.showcaseIds.length;
			if (len===0) {
				$win.trigger(pub.id+'OnLoaded',[{
					"isOk":true,
					"data":null
				}]);
				return;
			};
			
			var ids = pub.showcaseIds.concat([]),
			items = [],
			cates = {},
			cbk = function(err,item){

				if (err) {
					return;
				};
				
				if (cates[item.category]) {
					cates[item.category].cnt+=1;
				}else{
					cates[item.category]={
						name:(item.category||item.name),
						cnt:1
					};
				};
				items.push(item);

				if (ids.length===0) {
					$win.trigger(pub.id+'OnLoaded',[{
						"isOk":true,
						"data":{
							"items":items,
							"cates":cates
						}
					}]);
					return;
				};
				p.C.loadSingleShowcase(ids.splice(0,1)[0],cbk);
			};

			p.C.loadSingleShowcase(ids.splice(0,1)[0],cbk);

		},
		loadSingleShowcase:function(id,cbk){
			var jqxhr = $.ajax( "showcase/"+id+"/cfg.json" )
				.done(function(item) {
					item.id = id;
					//惯例优于配置
					item.logo = item.logo||('/c3h5/showcase/'+id+'/img/logo.png');
					item.url = item.url || ('/c3h5/showcase/'+id);
					cbk(null,item);
				}).fail(function( jqXHR, textStatus, errorThrown) { 
					cbk(errorThrown);
				}).always(function() { });
		}
	};

});