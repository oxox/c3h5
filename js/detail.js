J(function($,p,pub){
	pub.id = "detail";

	p.V = {
		$d:$('#popDetail'),
		$if:$('#popDetailIframe'),
		$name:$('#detailName'),
		$detailBox:$('#detailBox'),
		_init:function(){
			this.$d.on('click','.close',function(e){
				p.V.hide();
			})
			/*
			this.$if.on('load',function(e){
				p.V.$if.height(p.V.$if.height()); 
			});
*/
		},
		hide:function(){
			this.$d.stop().fadeOut();
			this.$if.attr('src','about:blank');
			this.$name.html('');
			$('#projectHover').hide();
			this.$detailBox.removeClass('openedP');
		},
		show:function(url){
			this.$d.show();
			this.$if.attr('src',url);
			var urlParts = url.split('/'),
				item = J.app.getItemById(urlParts[urlParts.length-1]);
			if (item) {
				this.$name.html(item.name);
			};
		}
	};

	pub.show = function(url){
		p.V.show(url);
	};

});