# lib
cropper:
js图片切割工具，基于canvas切割图片，用于用户上传头像／背景图设置等功能。 适配手机移动端。

<pre> 
 var flag = false; <br/>
	var sucFun = function(){ <br/>
		****//回调 <br/>
	}; <br/>
	var imgcropper = new ImageCropper({ <br/>
		box:"cropperbox", //box Id <br/>
		callback: sucFun <br/>
	}); <br/>
	var file = document.getElementById("file"); <br/>
	file.addEventListener('change',function(){ <br/>
		var src = file.value; <br/>
		var reg = /image/i; <br/>
		var result = reg.test(file.files[0].type); <br/>
		if(!result){ <br/>
					alert("图片格式错误"); <br/>
					return false; <br/>
		} <br/>
		imgcropper.loadImg(file.files[0]); <br/>
	}); <br/>
</pre>
