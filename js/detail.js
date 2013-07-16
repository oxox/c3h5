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
		show:function(id){
			var item = J.app.getItemById(id);
			if (item) {
				this.$d.show();
				this.$name.html(item.name);
				this.$if.attr('src',item.url);
			}else{
			    alert('未找到id为'+id+'的案例！');
			};
		}
	};

	pub.show = function(id){
		p.V.show(id);
	};

});