J(function($,p,pub){
	pub.id = "app";
	var $win = $(window),
        $doc = $(document),
        docWidth = $doc.width();
    pub.touchable = "ontouchstart" in window;
    pub.$win = $win;
    pub.mobile = (docWidth < 640 ? true : false);
    pub.smaller = (docWidth < 360 ? true : false);

	p.V = {
        $logo:$('#logo'),
        $mobileCheck:$('#mobileCheck'),
        $portfolio:$('#portfolio'),
        $loading:$('#siteLoading'),
		tplNavItem:document.getElementById('tplNavItem').innerHTML,
		tplShowcaseItem:document.getElementById('tplShowcaseItem').innerHTML,
		tplCateItem:document.getElementById('tplCateItem').innerHTML,
        _init:function(){
            this.logoWidth = this.$logo.width();
        },
		render:function(d){
			//菜单
			d.cateList = [];
			for(var c in d.cates){
				d.cateList.push(d.cates[c]);
			};

			pub.data = d;

			$('#navList').append(Mustache.render(this.tplNavItem,d));
			$('#cateItemLists').append(Mustache.render(this.tplCateItem,d));
            $('#lblCntShowcase').html(d.items.length);
			//内容
			this.$portfolio.append(Mustache.render(this.tplShowcaseItem,d));

            $win.trigger(pub.id+'OnUIReady');
            this.$loading.modernloading('stop').remove();
            $('body').removeClass('loading');
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
				$win.trigger(pub.id+'OnReady');

			}).on('resize',function(e){
                p.C.onResize();
                p.widgets.onResize();
            }).on(pub.id+'OnUIReady',function(e){
                if(pub.touchable) {
                    $('.folioThumb').css({'opacity': '1 !important'});
                }
                p.V.$portfolio.oxPortfolio().isotope({
                    itemSelector: ".folioItem",
                    animationEngine: "jquery",
                    resizable: false
                });
            });

            this.onResize();

            $('#top').click(function(){
                $('html,body').animate({scrollTop: 0}, 500, 'easeInQuad');
                return false;
            });

            if(pub.touchable){
                $('input').onfocus = function() {
                    window.scrollTo(0, 0);
                    document.body.scrollTop = 0;
                }
            }

		},
        onResize:function(){

            docWidth = $doc.width();
            pub.smaller = (docWidth < 360 ? true : false);

            if(pub.smaller){
                p.V.$logo.css({'width': p.V.logoWidth, 'marginLeft': -p.V.logoWidth/2});
            }else{
                p.V.$logo.css({'width': 'auto', 'marginLeft': '0'});
            }

            if(p.V.$mobileCheck.css('display') === 'block')
                pub.mobile = true;
            else
                pub.mobile = false;

        }
	};

    p.filter={
        value:'*',
        $li:$('#navListLi0'),
        _init:function(){

            $('#navList').on('click','a',function(e){
                var filter = this.getAttribute('data-filter');
                filter = filter==='*'?filter:('.'+filter);
                if(filter== p.filter.value){
                    return;
                };
                p.filter.value=filter;
                p.V.$portfolio.isotope({
                    filter:filter
                });
                p.filter.$li.removeClass('selected');
                p.filter.$li = $(this).parents('.menu-item').addClass('selected');
            });
        }
    };

    p.widgets = {
        _init:function(){
            this.onResize();
        },
        onResize:function(){
            if(pub.mobile){
                $('.widget').each(function(){
                    $(this).css({'paddingLeft': '50%', 'marginLeft': -$(this).width()/2})
                });
            } else {
                $('.widget').each(function(){
                    $(this).css({'paddingLeft': 'auto', 'marginLeft': 'auto'})
                });
            }
        }
    };

	pub.getItemById = function(id){
		if (!pub.data) {
			return null;
		};
		var item = null,
			len = pub.data.items.length;

		for (var i = len - 1; i >= 0; i--) {
			if (pub.data.items[i].id===id) {
				item = pub.data.items[i];
				break;
			};
		};
		return item;
	};

});