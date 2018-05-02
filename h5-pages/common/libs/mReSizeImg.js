(function(window, document, exportName, undefined) {
	//定义照片的最大高度
	var MAX_HEIGHT = 1000;
	var mReSizeImg = function(){};

	mReSizeImg.prototype = {
		//容器
		photoContainer:{},
		//图片数据
		photoSizeData:{},
		//上传组件
		photoFiler:{},
		//触摸对象
		photoTouchObj:{},
		//canvas对象
		canvasObj:{},
		width:0,
		height:0,
		canTouch:1,
		init:function(){
			var that=this;
			//容器
			that.photoContainer = this.photoContainer;
			//图片变形对象
			that.imgResizeObj = {x:0,y:0,width:0,height:0,scale:1,rotation:0,img:{}};
			//动画渲染开关
			that.animationChange = 0;

			//加入手势编辑组件
			that.photoSizeData = new mPinchResize();
			that.photoSizeData.body = that;
			that.photoSizeData.canTouch = that.canTouch;

			//指定canvas尺寸
			
			that.width = this.width!=0 ? this.width : this.photoContainer.width();
			that.height = this.height!=0 ? this.height : this.photoContainer.height();

			// console.log(this.photoContainer.width()+" : "+this.height);

			//指定触摸对象
			if(this.photoTouchObj.length>0){
				that.photoSizeData.touchObj = this.photoTouchObj;
			}else{
				that.photoSizeData.touchObj = this.photoContainer.find("canvas");
			}

			//指定canvas对象
			if(this.canvasObj.length>0){
				that.photoSizeData.canvasObj = this.canvasObj;
				that.canvasObj = this.canvasObj;
			}else{
				that.photoSizeData.canvasObj = this.photoContainer.find("canvas");
				that.canvasObj = this.photoContainer.find("canvas");
			}

			//指定结束触摸时的动作
			that.photoSizeData.onModifyComplete(function(photoData){
				that.onModifyComplete(photoData);
			})
			//指定触摸运动时的动作
			that.photoSizeData.onMove(function(photoData){
				that.onMove();
			})

			//初始化手势编辑组件
			that.photoSizeData.init();

			//指定上传组件
			if(this.photoFiler.length>0){
				that.photoFiler=this.photoFiler;
			}else{
				that.photoFiler=this.photoContainer.find('input[type=file]');
			}

			//绑定input change事件
			that.photoFiler.unbind("change").on("change",function(){uploadFile(that);});

			//调整canvas尺寸，避免变形
			that.canvasObj.attr('width', that.width);
			that.canvasObj.attr('height', that.height);
			// that.photoFiler.height(this.photoContainer.height());

			//canvas动画循环
			gameAnimate(that);

		},
		remove:function(){
			var that=this;
			var ctx=that.canvasObj[0].getContext("2d");
			ctx.clearRect(0,0,that.width,that.height);
			// var ctx=$($('canvas')[1])[0].getContext("2d");
			// ctx.clearRect(0,0,that.width,that.height);
			// var ctx=$($('canvas')[2])[0].getContext("2d");
			// ctx.clearRect(0,0,that.width,that.height);

			that.photoFiler.show();
			that.photoSizeData.reset();
			that.imgResizeObj={x:0,y:0,width:0,height:0,scale:1,rotation:0,img:{}};
			that.animationChange=0;
		},
		zoomIn:function(){
			var that=this;
			// console.log(that)
			that.photoSizeData.pinchResize(0,0,1.2,0,0);
		},
		zoomOut:function(){
			var that=this;
			that.photoSizeData.pinchResize(0,0,0.8,0,0);
		},
		rotate:function(d){
			var that=this;
			that.photoSizeData.pinchResize(0,0,1,10*d,0);
		},
		copyTo:function(obj){
			var that=this;
			var ctx=obj[0].getContext("2d");
			ctx.lineWidth = 1;
			canvasZoom=1;
			screenW=that.width;
			screenH=that.height;
			canvasW=screenW/canvasZoom;
			canvasH=screenH/canvasZoom;

			ctx.clearRect(0,0,screenW,screenH);
			ctx.save();
			ctx.translate(screenW/2, screenH/2);	// Translate to the center
			ctx.scale(canvasZoom, -canvasZoom);	 // Zoom in and flip y axis

			drawHaveImgObj(ctx,that.imgResizeObj);
			ctx.restore();
		},
		onMove:function(fn){
			var that=this;
			if(typeof(fn)=='function'){
				that.onMove=fn;
			}
		},
		onModifyComplete:function(fn){
			var that=this;
			if(typeof(fn)=='function'){
				that.onModifyComplete=fn;
			}
		},
		onUploadBegin:function(fn){
			var that=this;
			if(typeof(fn)=='function'){
				that.onUploadBegin=fn;
			}
		},
		onUploadComplete:function(fn){
			var that=this;
			if(typeof(fn)=='function'){
				that.onUploadComplete=fn;
			}
		},
		getCanvasBase64Img:function(fn){
			var that=this;
			return getCanvasBase64Img(that);
		},
	}

	function uploadFile(that){
		that.onUploadBegin();
		that.photoFiler.hide();
		var file = that.photoFiler[0].files[0];
		if(file){
			//验证图片文件类型
			if(file.type && !/image/i.test(file.type)){
				return false;
			}
			var reader = new FileReader();
			reader.onload = function(e){
				console.log(e.target/.result)
				//readAsDataURL后执行onload，进入图片压缩逻辑。e.target.result得到的就是图片文件的base64 string
				giveCanvasData(that,file,e.target.result);  
			};
			//以dataurl的形式读取图片文件
			reader.readAsDataURL(file);
			
		}
	}
	function giveCanvasData(that,file,src){
		EXIF.getData(file,function(){
			//获取照片本身的Orientation
			var orientation = EXIF.getTag(this, "Orientation");
			var image = new Image();
			image.onload = function(){
				var cvs = that.canvasObj[0];
				var w = image.width;
				var h = image.height;
				//计算压缩后的图片长和宽
				if(h>MAX_HEIGHT){
					w *= MAX_HEIGHT/h;
					h = MAX_HEIGHT;
				}
				//使用MegaPixImage封装照片数据
				var mpImg = new MegaPixImage(file);
				//按照Orientation来写入图片数据，回调函数是上传图片到服务器
				mpImg.render(cvs, {maxWidth:w,maxHeight:h,orientation:orientation}, function(){
					getThePhoto(that)
				});
			};
			image.src = src;
		});
	}
	
	function getThePhoto(that){
		var cvs = that.canvasObj[0];
		//调用Canvas的toDataURL接口，得到的是照片文件的base64编码string
		var data = cvs.toDataURL("image/jpeg");
		var image = new Image();
		image.onload = function(){
			preImgResize(that,image);
		}
		image.src=data;

	}

	//把生成的图片显示为适当的比例
	function preImgResize(that,image){
		imgW=image.width;
		imgH=image.height;
		kuanW=that.width;
		kuanH=that.height;
		toS=kuanW/imgW;

		that.imgResizeObj.width=imgW;
		that.imgResizeObj.height=imgH;
		that.imgResizeObj.img=image;
		that.canvasObj.attr('width',kuanW);
		that.canvasObj.attr('height',kuanH);


		that.animationChange = 1;
		that.photoSizeData.pinchResize(0,0,toS,0,1);
		setTimeout(function(){that.onUploadComplete();},1000);
		}

	function render(that){
		var ctx=that.canvasObj[0].getContext("2d");
		ctx.lineWidth = 1;
		canvasZoom=1;
		screenW=that.width;
		screenH=that.height;
		canvasW=screenW/canvasZoom;
		canvasH=screenH/canvasZoom;


		ctx.clearRect(0,0,screenW,screenH);
		ctx.save();
		ctx.translate(screenW/2, screenH/2);	// Translate to the center
		ctx.scale(canvasZoom, -canvasZoom);	 // Zoom in and flip y axis

		drawHaveImgObj(ctx,that.imgResizeObj);

		// for(i in game_canvas_obj_arr){
		// 	d=game_canvas_obj_arr[i];
		// 	if(d.img && d.show!=0){
		// 		drawHaveImgObj(d)
		// 	}
		// }
		ctx.restore();
	}
	function drawHaveImgObj(ctx,obj){
		// ctx.beginPath();
		ctx.save();

		ctx.translate(obj.x, obj.y);
		ctx.rotate(obj.rotation);
		ctx.scale(obj.scale, -obj.scale);
		ctx.drawImage(obj.img, -obj.width/2,-obj.height/2);
		// console.log(obj);

		ctx.stroke();
		ctx.restore();
	}
	// Animation loop
	function gameAnimate(that){
		requestAnimationFrame(function(){gameAnimate(that)});
		if(that.animationChange==1){
			render(that);
		}
	}

	//上传图片到服务器
	function getCanvasBase64Img(that){
		var cvs=that.canvasObj[0];
		//调用Canvas的toDataURL接口，得到的是照片文件的base64编码string
		var data = cvs.toDataURL("image/jpeg", 1);
		//base64 string过短显然就不是正常的图片数据了，过滤の。
		if(data.length<48){
			console.log("data error.");
			return;
		}
		//图片的base64 string格式是data:/image/jpeg;base64,xxxxxxxxxxx
		//是以data:/image/jpeg;base64,开头的，我们在服务端写入图片数据的时候不需要这个头！
		//所以在这里只拿头后面的string
		//当然这一步可以在服务端做，但让闲着蛋疼的客户端帮着做一点吧~~~（稍微减轻一点服务器压力）
		// data = data.split(",")[1];
		return data;
	};



	window[exportName] = mReSizeImg;
})(window, document, 'mReSizeImg');


(function(window, document, exportName, undefined) {
	var mPinchResize = function(){};

	mPinchResize.prototype = {
		touchObj:{},
		photo:{},
		canTouch:1,
		init:function(){
			var that=this;
			obj=that.body.imgResizeObj;
			that.saveData={x:obj.x,y:obj.y,scale:obj.scale,rotation:obj.rotation};
			that.saveDataTmp={x:obj.x,y:obj.y,scale:obj.scale,rotation:obj.rotation};
			that.timer=0;

			//手指移动背景
			if(that.canTouch==1){
				mc = Hammer(this.touchObj[0], {touchAction: 'auto'});
				mc.get('pan').set({ direction: Hammer.DIRECTION_ALL });
				mc.get('pinch').set({ enable: true});
				mc.get('rotate').set({ enable: true});

				mc.on("pan pinchmove rotatemove", function(ev) {
					that.body.animationChange=1;
					pinchResize(ev.deltaX,ev.deltaY,ev.scale,ev.rotation,0,that);
					that.onMove();
				});
				mc.on("panend pinchend rotateend", function(ev) {
					saveHeadTmpData(that);
					that.body.animationChange=0;
				});
			}
		},
		pinchResize:function(evDeltaX,evDeltaY,evScale,evRotation,time){
			var that=this;
			that.body.animationChange=1;
			pinchResize(evDeltaX,evDeltaY,evScale,evRotation,time,that);
			saveHeadTmpData(that);
			// clearTimeout(that.timer);
			// console.log(time)
			// that.timer = setTimeout(function(){that.body.animationChange=0},time*1000);
		},
		reset:function(){
			var that=this;
			that.saveData={x:0,y:0,scale:1,rotation:0}
			that.saveDataTmp={x:0,y:0,scale:1,rotation:0}
		},
		getData:function(){
			var that=this;
			return that.saveData;
			//return false;
		},
		onMove:function(fn){
			var that=this;
			if(typeof(fn)=='function'){
				that.onMove=fn;
			}
		},
		onModifyComplete:function(fn){
			var that=this;
			if(typeof(fn)=='function'){
				that.onModifyComplete=fn;
			}
		},
	}
	
	function pinchResize(evDeltaX,evDeltaY,evScale,evRotation,time,that) {
		var x=that.saveData.x
		var y=that.saveData.y
		var scale=that.saveData.scale
		var rotation=that.saveData.rotation
		// console.log(x+" : "+y+" : "+scale+" : "+rotation);
		// console.log(evDeltaX+" : "+evDeltaY+" : "+evScale+" : "+evRotation);

		var toX=x+evDeltaX;
		var toY=y-evDeltaY;
		var toS=scale*evScale;
		var toR=rotation-evRotation/180*Math.PI;

		that.saveDataTmp.x=toX;
		that.saveDataTmp.y=toY;
		that.saveDataTmp.scale=toS;
		that.saveDataTmp.rotation=toR;

		if(time>0){
			TweenMax.to(that.body.imgResizeObj,time,{x:toX,y:toY, scale:toS, rotation:toR, onComplete:moveOver, onCompleteParams:[that]});
		}else{
			TweenMax.to(that.body.imgResizeObj,time,{x:toX,y:toY, scale:toS, rotation:toR});
		}
	}

	//动画停止
	function moveOver(that){
		that.body.animationChange=0;
	}
	//储存图片变形临时数据
	function saveHeadTmpData(that){
		that.saveData.x=that.saveDataTmp.x;
		that.saveData.y=that.saveDataTmp.y;
		that.saveData.scale=that.saveDataTmp.scale;
		that.saveData.rotation=that.saveDataTmp.rotation;

		that.onModifyComplete(that.saveData);
	}

	window[exportName] = mPinchResize;

})(window, document, 'mPinchResize');

