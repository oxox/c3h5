J(function($,p,pub){
	pub.id = "app";
	var $win = $(window);
	p.V = {
		tplNavItem:document.getElementById('tplNavItem').innerHTML,
		tplShowcaseItem:document.getElementById('tplShowcaseItem').innerHTML,
		render:function(d){
			//菜单
			d.cateList = [];
			for(var c in d.cates){
				d.cateList.push(d.cates[c]);
			};

			$('#navList').append(Mustache.render(this.tplNavItem,d));

			//内容
			$('#showcaseList').append(Mustache.render(this.tplShowcaseItem,d));
		}
	};
	p.C= {
		_init:function(){
			$win.on(J.data.id+'OnLoaded',function(e,d){
				if (!d.isOk || d.data===null) {
					//无数据
					return;
				};
				p.V.render(d.data);
			});
		}
	};
});