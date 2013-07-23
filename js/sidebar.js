/**
 * sidebar module
 * @author  oxox.io-levin
 * @created 7/15/13 7:00 PM
 * @version 1.0.0
 */
J(function($,p,pub){
    pub.id="sidebar";
    var $sidebar = $('#sidebar'),
        $close =  $('#close'),
        $topFooter = $('#topFooter'),
        $bottomFooter = $('#bottomFooter'),
        $content = $('#detailBox'),
        $rightFooter = $('#topFooterRight'),
        isOpen = true;

    pub._init = function(){
        $close.on('click',function(e){
            p.onClose();
            return false;
        });

        J.app.$win.on('resize',function(e){
            p.onResize();
        }).on(J.app.id+'OnUIReady',function(){
            p.autoCloseTimer=setTimeout(function(){
                p.onClose();
            },1000);
        });

        if(J.app.touchable){
            $sidebar.touchSwipe(function(dir){
                if(J.app.$win.width() > 640){
                    if(dir == 'right')
                        p.open();
                    else if(dir == 'left')
                        p.close();
                }
            })
        }

        $sidebar.hover(function(e){
            clearTimeout(p.autoCloseTimer);
            p.open();
            return false;
        },function(e){
            clearTimeout(p.autoCloseTimer);
            p.onClose();
            return false;
        });

    };
    p.onResize = function(){
        if(J.app.mobile){
            if(!isOpen){
                $sidebar.stop().css('marginLeft', 0);
                if(J.app.smaller)
                    $sidebar.css('marginTop', -90);
                else
                    $sidebar.css('marginTop', -40);
            } else {
                $sidebar.css('marginTop', 0);
            }
        } else {
            isOpen = false;
            $sidebar.css('marginTop', 0);
            $sidebar.css('marginLeft', -270);
            $topFooter.css('marginLeft', 0);
            $rightFooter.css('marginRight', 0);
            $bottomFooter.css('marginLeft', 0);
            $content.css('marginLeft', 0);
        }
    };
    p.onClose = function(){
        if(!J.app.mobile){
            if(isOpen){
                this.close();
            } else {
                this.open();
            }
        } else {
            $sidebar.toggleClass('mobileSidebar');
        }
    };

    p.close = function(){
        $close.addClass('openIcon');
        if(!J.app.mobile){
            $sidebar.stop().animate({'marginLeft': -270}, 600, 'swing');
            $topFooter.stop().animate({'marginLeft': 0}, 600, 'swing');
            $rightFooter.stop().animate({'marginRight': 0}, 600, 'swing');
            $bottomFooter.stop().animate({'marginLeft': 0}, 600, 'swing');
            $content.stop().animate({'marginLeft': 0}, 600, 'swing');
        } else {
            if(J.app.smaller)
                $sidebar.css('marginTop', '-90px !important');
            else
                $sidebar.css('marginTop', '-40px !important');
        }
        setTimeout(function(){
            isOpen = false;
        }, 600);
    };
    p.open = function(){
        $close.removeClass('openIcon');
        if(!J.app.mobile){
            $sidebar.stop().animate({'marginLeft': 0}, 600, 'swing');
            $topFooter.stop().animate({'marginLeft': 280}, 600, 'swing');
            $rightFooter.stop().animate({'marginRight': 280}, 600, 'swing');
            $bottomFooter.stop().animate({'marginLeft': 280}, 600, 'swing');
            $content.stop().animate({'marginLeft': 280}, 600, 'swing');
        } else {
            $sidebar.css('marginTop', '0 !important');
        }
        setTimeout(function(){
            isOpen = true;
        }, 600);
    }
    pub.close = function(){
        p.onClose();
    };
});