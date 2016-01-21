# lib
cropper:
js图片切割工具，基于canvas切割图片，用于用户上传头像／背景图设置等功能。 适配手机移动端。

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
