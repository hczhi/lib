/**
 * @require static/css/base.less
 * @require widget/cropper/css/cropper.less
 */
(function(){
	var $ = function(id){
		try{
			return document.getElementById(id);
		}catch(e){
			return false;
		}
	};
	var c = function(parent,classname){
		try{
			return parent.getElementsByClassName(classname);
		}catch(e){
			//console.log(e);
			return false;
		}
	};
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
	}
	var setcss = function(o,boject){
		 for ( var p in boject ){
		 	o.style[p] = boject[p];
		 }
	};
	var getcss = function(o,key){
		return o.currentStyle? o.currentStyle[key] : document.defaultView.getComputedStyle(o,false)[key]; 	
	};
	var dragerHtml = 	'<div class="dragBg"></div>'+
						'<div class="dragLeftTop"></div>'+
						'<div class="dragLeft"></div>'+
						'<div class="dragLeftBot"></div>'+
						'<div class="dragRightTop"></div>'+
						'<div class="dragRight"></div>'+
						'<div class="dragRightBot"></div>'+
						'<div class="dragTopCenter"></div>'+
						'<div class="dragBotCenter"></div>';
	var ImageCropper = function(config){
		this.box = (config.box)?$(config.box):false;
		// console.log(this.box)
		if(!this.box) return false;
		this.callback = config.callback||false;
		this.init();
	};
	ImageCropper.prototype = {
		init:function(){
			//params:DrageBox参数
			this.params = {
				left:0,
				top:0,
				width:100,
				height:100,
				currentX:0,
				currentY:0,
				flag:false,
				isload:false,
				scale:1,
				paddingleft:0,
				paddingtop:0
			};
			this.boxWidth = this.box.clientWidth;
			this.boxHeight = this.box.clientHeight;
			this.imgsrc = "";
			this.createDrageBox();
			this.createcanvas();
			this.events();
		},
		// 
		createDrageBox:function(){
			var ele = document.createElement("div");
			ele.className = "cropper";
			ele.innerHTML = dragerHtml;
			this.box.appendChild(ele);
			this.DrageBox = ele;
			setcss(ele,{left:this.params.left+"px",top:this.params.top+"px",width:this.params.width+"px",height:this.params.height+"px"})
			this.DrageBox.style.display = "none";
		},
		//
		createcanvas:function(){
			var ele = document.createElement("canvas");
			ele.width = this.boxWidth;
			ele.height = this.boxHeight;
			this.box.appendChild(ele);
			this.canvas = ele;
			this.ctx=ele.getContext("2d");

			var ele2 = document.createElement("canvas");
			ele2.style.display = "none";
			this.canvas2 = ele2;
			this.box.appendChild(ele2);
			this.ctx2=ele2.getContext("2d");
		},
		loadImg:function(file){
			var that = this;
			var reg = /\.(jpg|png|gif)$/i;
			// var result = reg.test(src);
			// if(!result){
			// 	alert("图片格式错误");
			// 	return false;
			// }
			this.img = new Image();
			this.ctx.clearRect(0,0,this.boxWidth,this.boxHeight);
			this.ctx.rect(0,0,that.boxWidth,that.boxHeight);
			this.ctx.fillStyle="#000";
			this.ctx.fill();
			var imgw,imgh,left,top;
			var sizefun = function(iw,ih,w,h){
				if(iw>=ih){
					imgh = w*ih/iw;
					imgw = w;
					left = 0;
					top = (h-imgh)/2;
				}else{
					imgh = h;
					imgw = h*iw/ih;
					left = (w-imgw)/2;
					top = 0;
				}
			};
			var reader = new FileReader();  
		    // 绑定load事件自动回调函数  
		    reader.onload = function(e){  
		        // 调用前面的 render 函数  
		        // render(e.target.result);  
		        var img = that.img;
				that.img.onload = function(){
					that.params.isload = true;
					sizefun(img.width,img.height,that.boxWidth,that.boxHeight);
					that.params.scale = img.width/imgw;
					that.params.paddingleft = left;
					that.params.paddingtop = top;
					that.ctx.drawImage(img,0,0,img.width,img.height,left,top,imgw,imgh);
					that.DrageBox.style.display = "block";
				};
				that.img.src = this.result;
		    };  
		    // 读取文件内容  
		    reader.readAsDataURL(file);  
		    // console.log(reader);
		},
		fnnewimg:function(){
			var that = this;
			if(!that.params.isload){
				alert("读取图片失败");
				return false;
			}
			var params = that.params;
			that.canvas2.width = parseInt(params.width)*params.scale;
			that.canvas2.height = parseInt(params.height)*params.scale;
			this.ctx2.clearRect(0,0,that.canvas2.width ,that.canvas2.height);
			this.ctx2.rect(0,0,that.canvas2.width,that.canvas2.height);
			this.ctx2.fillStyle="#000";
			this.ctx2.fill();
			
			// console.log(imgData);
			that.ctx2.drawImage(this.img,(parseInt(params.left)-params.paddingleft)*params.scale,(parseInt(params.top)-params.paddingtop)*params.scale,that.canvas2.width,that.canvas2.height,0,0,that.canvas2.width,that.canvas2.height);
			// that.ctx2.putImageData(imgData,0,0);
			// console.log((params.left-params.paddingleft)*params.scale)
			var src = that.canvas2.toDataURL();
			if(this.callback){
				this.callback();
			}
			return src;
		},
		//
		events:function(){
			// this.DrageBox.getElementByClassName("dragBg").onmousedown = function(){
			// 	console.log("sss")
			// };
			var that = this;
			that.box.addEventListener("touchstart",function(e){
				 e.preventDefault(); 
			});
			var fnDrage = function(target,kind){
				var params = that.params;
				params.left = getcss(that.DrageBox,"left");
				params.top = getcss(that.DrageBox,"top");
				params.width = getcss(that.DrageBox,"width");
				params.height = getcss(that.DrageBox,"height");

				var touchStart,touchMove,touchEnd;
				touchStart = isMobile() ? 'touchstart' : 'mousedown';
				touchMove = isMobile() ? 'touchmove' : 'mousemove';
				touchEnd = isMobile() ? 'touchend' : 'mouseup';

				target.addEventListener(touchStart,function(event){
					params.flag = true;
					params.kind = kind;
					if(!event){
						event = window.event;
					}
					var e = event;
					// console.log(e);
					params.currentX = isMobile()?e.targetTouches[0].clientX:e.clientX;
					params.currentY = isMobile()?e.targetTouches[0].clientY:e.clientY;
					//防止IE文字选中，有助于拖拽平滑
					target.onselectstart = function(){
						return false;
					}
					return false;  
				});

				document.addEventListener(touchEnd,function(event){
					if(!event){
						event = window.event;
					}
					var e = event;
					if(params.flag){
						params.flag = false;
						params.left = getcss(that.DrageBox,"left");
						params.left = getcss(that.DrageBox,"left");
						params.top = getcss(that.DrageBox,"top");
						params.width = getcss(that.DrageBox,"width");
						params.height = getcss(that.DrageBox,"height");
						params.currentX = isMobile()?e.changedTouches[0].clientX:e.clientX;
						params.currentY = isMobile()?e.changedTouches[0].clientY:e.clientY;
						// console.log(params);
					}
				});
				//判断位置尺寸
				var setDrageBox = function(kind,nowX,nowY,disX,disY,w,h){
					switch(kind){
							case "drag":
								newleft =  parseInt(params.left) + disX;
								newtop = parseInt(params.top) + disY;
								newleft = (newleft<0)?0:(newleft>that.boxWidth-w)?that.boxWidth-w:newleft;
								newtop = (newtop<0)?0:(newtop>that.boxHeight-h)?that.boxHeight-h:newtop;
								that.DrageBox.style.left = newleft + "px";
								that.DrageBox.style.top = newtop + "px";
							break;
							case "dragLeftTop"://左上拉伸
								newleft =  parseInt(params.left) + disX;
								newtop = parseInt(params.top) + disY;
								newleft = (newleft<0)?0:(newleft>that.boxWidth-w)?that.boxWidth-w:newleft;
								newtop = (newtop<0)?0:(newtop>that.boxHeight-h)?that.boxHeight-h:newtop;
								// newwidth = parseInt(params.width) - disX;
								newwidth = (newleft<=0)?w:parseInt(params.width) - disX;
								newheight = (newtop<=0)?h:parseInt(params.height) - disY;
								that.DrageBox.style.left = newleft + "px";
								that.DrageBox.style.width = newwidth + "px";
								that.DrageBox.style.top = newtop + "px";
								that.DrageBox.style.height = newheight + "px";
							break;
							case "dragTopCenter"://上拉伸
								newtop = parseInt(params.top) + disY;
								newtop = (newtop<0)?0:(newtop>that.boxHeight-h)?that.boxHeight-h:newtop;
								// newheight = parseInt(params.height) - disY;
								newheight = (newtop<=0)?h:parseInt(params.height) - disY;
								//newheight = (newheight+parseInt(params.top)>that.boxHeight)?that.boxHeight-parseInt(params.top):newheight;
								that.DrageBox.style.top = newtop + "px";
								that.DrageBox.style.height = newheight + "px";
							break;
							case "dragLeft"://左拉伸
								newleft =  parseInt(params.left) + disX;
								newleft = (newleft<0)?0:(newleft>that.boxWidth-w)?that.boxWidth-w:newleft;
								newwidth = (newleft<=0)?w:parseInt(params.width) - disX;
								//newwidth = (newwidth+parseInt(params.left)>that.boxWidth)?that.boxWidth-parseInt(params.left):newwidth;
								that.DrageBox.style.left = newleft + "px";
								that.DrageBox.style.width = newwidth + "px";
							break;
							case "dragLeftBot"://左下拉伸
								newleft =  parseInt(params.left) + disX;
								newleft = (newleft<0)?0:(newleft>that.boxWidth-w)?that.boxWidth-w:newleft;
								newwidth = (newleft<=0)?w:parseInt(params.width) - disX;
								newheight = parseInt(params.height) + disY;
								newheight = (newheight+parseInt(params.top)>that.boxHeight)?that.boxHeight-parseInt(params.top):newheight;
								that.DrageBox.style.left = newleft + "px";
								that.DrageBox.style.width = newwidth + "px";
								that.DrageBox.style.height = newheight + "px";
							break;
							case "dragRightTop"://右上拉伸
								newtop = parseInt(params.top) + disY;
								newtop = (newtop<0)?0:(newtop>that.boxHeight-h)?that.boxHeight-h:newtop;
								newwidth = parseInt(params.width) + disX;
								newwidth = (newwidth+parseInt(params.left)>that.boxWidth)?that.boxWidth-parseInt(params.left):newwidth;
								newheight = (newtop<=0)?h:parseInt(params.height) - disY;
								that.DrageBox.style.width = newwidth + "px";
								that.DrageBox.style.top = newtop + "px";
								that.DrageBox.style.height = newheight + "px";
							break;
							case "dragRight"://右拉伸
								newwidth = parseInt(params.width) + disX;
								newwidth = (newwidth+parseInt(params.left)>that.boxWidth)?that.boxWidth-parseInt(params.left):newwidth;
								that.DrageBox.style.width = newwidth + "px";
							break;
							case "dragBotCenter"://下拉伸
								newheight = parseInt(params.height) + disY;
								newheight = (newheight+parseInt(params.top)>that.boxHeight)?that.boxHeight-parseInt(params.top):newheight;
								that.DrageBox.style.height = newheight + "px";
							break;
							case "dragRightBot"://右下拉伸
								newwidth = parseInt(params.width) + disX;
								newwidth = (newwidth+parseInt(params.left)>that.boxWidth)?that.boxWidth-parseInt(params.left):newwidth;
								newheight = parseInt(params.height) + disY;
								newheight = (newheight+parseInt(params.top)>that.boxHeight)?that.boxHeight-parseInt(params.top):newheight;
								that.DrageBox.style.width = newwidth + "px";
								that.DrageBox.style.height = newheight + "px";
							break;
							default:
							break;
						}
				};
				document.addEventListener(touchMove,function(event){
					if(!event){
						event = window.event;
					}
					var e = event;
					if(params.flag){
						var nowX = isMobile()?e.targetTouches[0].clientX:e.clientX, 
						nowY = isMobile()?e.targetTouches[0].clientY:e.clientY;
						var disX = nowX - params.currentX, disY = nowY - params.currentY;
						var newleft,newtop,newwidth,newheight;
						var w = parseInt(getcss(that.DrageBox,"width"));
						var h = parseInt(getcss(that.DrageBox,"height"));
						setDrageBox.apply(this,[params.kind,nowX,nowY,disX,disY,w,h]);
					}
				});
			};
			//绑定事件
			fnDrage(c(this.DrageBox,"dragBg")[0],"drag");
			fnDrage(c(this.DrageBox,"dragLeftTop")[0],"dragLeftTop");
			fnDrage(c(this.DrageBox,"dragTopCenter")[0],"dragTopCenter");
			fnDrage(c(this.DrageBox,"dragLeft")[0],"dragLeft");
			fnDrage(c(this.DrageBox,"dragLeftBot")[0],"dragLeftBot");
			fnDrage(c(this.DrageBox,"dragRightTop")[0],"dragRightTop");
			fnDrage(c(this.DrageBox,"dragRight")[0],"dragRight");
			fnDrage(c(this.DrageBox,"dragBotCenter")[0],"dragBotCenter");
			fnDrage(c(this.DrageBox,"dragRightBot")[0],"dragRightBot");
		}
	};
	window.ImageCropper = ImageCropper;
})();









