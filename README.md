# lib
cropper:
js图片切割工具，基于canvas切割图片，用于用户上传头像／背景图设置等功能。 适配手机移动端。
http://hc250.sinaapp.com/output/cropper.html

<pre> 
 	var flag = false;
	var sucFun = function(){ 
		****//回调 
	}; 
	var imgcropper = new ImageCropper({ 
		box:"cropperbox", //box Id 
		callback: sucFun 
	}); 
	var file = document.getElementById("file"); 
	file.addEventListener('change',function(){ 
		var src = file.value; 
		var reg = /image/i; 
		var result = reg.test(file.files[0].type); 
		if(!result){
					alert("图片格式错误");
					return false; 
		} 
		imgcropper.loadImg(file.files[0]); 
	}); 
</pre>

***********************

scroll:
自定义滚动条。
http://hc250.sinaapp.com/output/scroll.html
<pre> 
	var myscroll_obj = {
		box : $("#scrollbox"),
		innerbox:$(".scroll-c"),
		width: 300,
		height:400,
		innerHeight:$(".scroll-c").height(),
		scrollheight:20
	}
	var myscroll = new myScroll(myscroll_obj);
</pre>
