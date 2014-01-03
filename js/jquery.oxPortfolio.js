(function($){
    $.fn.oxPortfolio = function(opts) {

        var $doc = $(document),
            $win = $(window);

        /**
         * Internal core class for oxPortfolio
         * @class oxPortfolio
         * @param {Object} $d jquery dom object for the pager
         * @param {Object} opts0 configuration options
         */
        var model = function ($d,opts0) {
            /**
             * pager's jquery dom object
             * @property $container
             * @type Object
             */
            this.$container = $d;
            /**
             * pager's configuration object
             * @property opts
             * @type Object
             * @default jQuery.fn.oxPortfolio.defaults
             */
            this.opts = opts0;
            this._init();
        };
        model.prototype = {
            _init: function () {

                this._initItems();
                this._initEvt();
            },
            _initEvt:function(){
                var me = this;

                this.$container.on("mouseover",this.opts.cssItem, function(e){
                    me._onItemMouseover(this);
                }).on("mouseout",this.opts.cssItem, function(e){
                    me._onItemMouseout(this);
                }).on("click",this.opts.cssItem, function(e){
                    me._onItemClick(this);
                    return false;
                });

            },
            _onItemClick:function(item){
                var $item =$(item),
                    href= $item.attr("href"),
                    name=$item.data("name");
                document.location.hash = "#/" + href;
                J.detail.show(name);
            },
            _onItemMouseout:function(item){
                var $item = $(item);
                $item.children("img").stop().animate({
                    opacity: 0.8,
                    marginTop: 0
                }, 200, "easeOutQuad");
                $item.children("span.folioPlus").stop().animate({
                    opacity: 0,
                    bottom: -53
                }, 200, "easeOutQuad");
                $item.children("div.folioTextHolder").stop().animate({
                    height: 0,
                    bottom: 0
                }, 200, "easeOutQuad");
                $item.find("div.folioText").stop().animate({
                    opacity: 0,
                    top: -150
                }, 200, "easeOutQuad");
                $item.children("span.folioShadow").stop().animate({
                    opacity: 0,
                    marginTop: 0,
                    height: "0"
                }, 300, "easeOutQuad", function() {
                    $item.css("zIndex", 1);
                })
            },
            _onItemMouseover:function(item){
                var $item = $(item);
                $item.css("zIndex", this.opts.zIndexHover);
                $item.children("img.folioThumb").stop().animate({
                    opacity: 1,
                    marginTop: -70
                }, 300, "easeOutQuad");
                $item.children("span.folioPlus").stop().animate({
                    opacity: 1,
                    bottom: this.itemHeight / 2 - 30
                }, 300, "easeOutQuad");
                $item.children("span.folioShadow").stop().animate({
                    opacity: 1,
                    marginTop: -70,
                    height: this.itemHeight  + 140
                }, 300, "easeOutQuad");
                $item.children("div.folioTextHolder").stop().animate({
                    height: this.itemHeight  / 2 + 70,
                    bottom: -70
                }, 300, "easeOutQuad");
                $item.find("div.folioText").stop().animate({
                    opacity: 1,
                    top: 0
                }, 350, "easeOutSine");
            },
            _initItems:function(){
                this.$items = this.$container.find(this.opts.cssItem);
                var w = $doc.width(),
                    h = $win.height(),
                    h1= 640 > w ? 480 : 360;
                this.itemWidth = Math.floor(w / Math.ceil(w / h1));
                this.itemHeight = Math.floor(3 * (this.itemWidth / 4));

                var me = this;

                this.$items.css({
                    width: this.itemWidth,
                    height: this.itemHeight
                });

                var txtHeight = 260>this.itemWidth?50:"auto";
                this.$items.find("p").css("height", txtHeight);
                this.$container.width(w);
            },
            _dispose:function(){
                this.$container.off('mouseover mouseout click');
                return this;
            },
            //update the options
            _update: function (opts,reInit) {
                this.opts = opts;
                if (reInit) {
                    this._dispose()._init();
                }
            }
        };


        // Set the options.
        var optsType = typeof (opts),
            opts1 = optsType !== 'string' ? $.extend(true, {}, $.fn.oxPortfolio.defaults, opts || {}) : $.fn.oxPortfolio.defaults,
            args = arguments;

        return this.each(function () {

            var $me = $(this),
                instance = $me.data("oxPortfolio");
            if (instance) {

                if (instance[opts]) {

                    instance[opts].apply(instance, Array.prototype.slice.call(args, 1));

                } else if (typeof (opts) === 'object' || !opts) {

                    instance._update.apply(instance, args);

                } else {
                    console.log('Method ' + opts + ' does not exist in jQuery.fn.oxPortfolio');
                }

            } else {
                $me.data("oxPortfolio", new model($me,opts1));
            }

        });
    };
    $.fn.oxPortfolio.defaults={
        cssItem:'.folioItem',
        zIndexHover:200
    };

})(jQuery);