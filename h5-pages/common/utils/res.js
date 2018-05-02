var Loading = {};
//加载图片资源
/*
	Loading.loadImg({
		imgs: imgs,
		progress: function(){},
		callback: function(){}
	})
*/
Loading.loadImg = function(option) {
    var $$Img = option.imgs,
        funcProgress = option.progress,
        funcComplete = option.callback;
    var imgSources = [];
    for (var o in $$Img) {
        imgSources.push($$Img[o]);
    }
    for (var i = 0; i < imgSources.length; i++) {
        imgSources[i] = (imgSources[i]);
    };
    var loadImage = function(path, callback) {
        var img = new Image();
        img.onload = function() {
            img.onload = null;
            callback(path);
        }
        img.src = path;
    }
    var imgLoader = function(imgs, callback) {
        var len = imgs.length,
            i = 0;
        while (imgs.length) {
            loadImage(imgs.shift(), function(path) {
                callback(path, ++i, len);
            })
        }
    }
    var percent = 0;
    imgLoader(imgSources, function(path, curNum, total) {
        percent = curNum / total;
        funcProgress(Math.floor(percent * 100));
        if (percent == 1 && funcComplete) {
            setTimeout(function() {
                funcComplete();
            }, 500);
        }
    });
};

export default Loading;