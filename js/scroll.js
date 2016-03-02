/**
 * @require static/css/base.less
 * @require widget/scroll/css/scroll.less
 * @require static/js/zepto.js
 */
(function(){
		function isMobile(){
			 var sUserAgent= navigator.userAgent.toLowerCase(),
			 bIsIpad= sUserAgent.match(/ipad/i) == "ipad",
			 bIsIphoneOs= sUserAgent.match(/iphone os/i) == "iphone os",
			 bIsMidp= sUserAgent.match(/midp/i) == "midp",
			 bIsUc7= sUserAgent.match(/rv:1.2.3.4/i) == "rv:1.2.3.4",
			 bIsUc= sUserAgent.match(/ucweb/i) == "ucweb",
			 bIsAndroid= sUserAgent.match(/android/i) == "android",
			 bIsCE= sUserAgent.match(/windows ce/i) == "windows ce",
			 bIsWM= sUserAgent.match(/windows mobile/i) == "windows mobile",
			 bIsWebview = sUserAgent.match(/webview/i) == "webview";
			 return (bIsIpad || bIsIphoneOs || bIsMidp || bIsUc7 || bIsUc || bIsAndroid || bIsCE || bIsWM);
			 return true;
		};
		var isM = isMobile();
		var touchStart,touchMove,touchEnd;
			touchStart = isM ? 'touchstart' : 'mousedown';
			touchMove = isM ? 'touchmove' : 'mousemove';
			touchEnd = isM ? 'touchend' : 'mouseup';

		var touchtime = 0;

		var myScroll = function(obj){
			this.config = obj;
			this.scroll = this.createScroll();
			this.events();
			this.height = this.config.innerHeight;
			this.touchData = {
				clientY : 0,
				moveY:0,
				translatey:0,
				isTouch:false
			};
		};
		myScroll.prototype = {
			createScroll : function(){
				var $div = $("<div id='scrlol_b' />");
				$div.html("<div id='scroll_bb'>");
				//设置样式
				$div.css({"position":"absolute","right":"0px","top":"0px","width":"5px","height":this.config.height+"px","background":"rgba(0,0,0,0.5)" });
				$div.find("div").css({"position":"absolute","right":"0px","top":"0px","width":"5px","height":this.config.scrollheight+"px","background":"rgba(252,252,252,0.9)" })
				this.config.box.append($div);
				return $div;
			},
			events:function(){
				var that = this,
					box = that.config.innerbox;
				box[0].addEventListener(touchStart,function(e){
					that.touchData.clientY = e.clientY||e.targetTouches[0].clientY;
					that.touchData.isTouch = true;
					that.config.innerbox[0].style.webkitTransition= "none";
				});
				box[0].addEventListener(touchMove,function(e){

					if(!that.touchData.isTouch){
						return false
					}
					// console.log("ss");
					e.preventDefault();
					var clientY = e.clientY||e.targetTouches[0].clientY;
					that.touchData.moveY = that.touchData.clientY-clientY;
					that.touchData.clientY = clientY;
					that.setTranslate();
				});
				box[0].addEventListener(touchEnd,function(e){
					// that.touchData.clientY = e.clientY||e.targetTouches[0].clientY;
					that.touchData.isTouch = false;
					that.touchendSetPos();
				});
			},
			setTranslate:function(){
				// console.log("ss");
				var translatey = this.touchData.translatey-this.touchData.moveY;
				this.touchData.translatey = translatey;
				this.config.innerbox[0].style.webkitTransform = "translate3d(0,"+translatey+"px,0)";
				this.setScroolPosition();
			},
			touchendSetPos:function(){
				var translatey = this.touchData.translatey-this.touchData.moveY;
				var needset =false;
				if(translatey>0){
					translatey = 0;
					needset=true;
				}
				if(translatey<-(this.config.innerbox.height()-this.config.height)){
					translatey = -this.config.innerbox.height()+this.config.height;
					needset=true;
				}
				if(!needset){return false;}
				this.touchData.translatey = translatey;
				this.config.innerbox[0].style.webkitTransition= "all 1s";
				this.config.innerbox[0].style.webkitTransform = "translate3d(0,"+translatey+"px,0)";
				this.setScroolPosition();
			},
			setScroolPosition:function(){
				var totalHeight = this.config.innerbox.height()-this.config.height+this.config.scrollheight;
				var parsent = Math.abs(this.touchData.translatey)/totalHeight;
				parsent = Math.floor(parsent*100);
				this.scroll.find("div").css({"top":parsent+"%"});
				// console.log(parsent);

			}
		}
		window.myScroll = myScroll;
})();

var myscroll_obj = {
	box : $("#scrollbox"),
	innerbox:$(".scroll-c"),
	width: 300,
	height:400,
	innerHeight:$(".scroll-c").height(),
	scrollheight:20
}
var myscroll = new myScroll(myscroll_obj);






