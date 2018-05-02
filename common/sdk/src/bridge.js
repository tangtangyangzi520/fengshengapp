(function(fs) {
    var root = window;
    var ua = navigator.userAgent.toLowerCase();
    var _registers = [];
    var _id = 0;

    function setupWebViewJavascriptBridge(callback) {
        if (root.WebViewJavascriptBridge) { return callback(WebViewJavascriptBridge); }
        if (root.WVJBCallbacks) { return root.WVJBCallbacks.push(callback); }
        root.WVJBCallbacks = [callback];
        var WVJBIframe = document.createElement('iframe');
        WVJBIframe.style.display = 'none';
        WVJBIframe.src = 'wvjbscheme://__BRIDGE_LOADED__';
        document.documentElement.appendChild(WVJBIframe);
        setTimeout(function() { document.documentElement.removeChild(WVJBIframe) }, 0)
    }
    root.setupWebViewJavascriptBridge = setupWebViewJavascriptBridge;

    //H5调APP方法
    function handlerHtmlMessage(options, callback) {
        register(callback);
        if (fs.isIos) {
            root.setupWebViewJavascriptBridge(function(bridge) {
                bridge.callHandler('handlerHtmlMessage', options, function(responseData) {})
            })
        } else {
            root.fullShare.handlerHtmlMessage(JSON.stringify(options));
        }
    }
    fs.handlerHtmlMessage = handlerHtmlMessage;

    // app调H5具体方法
    function setHtml(data) {
        for (var i = 0; i < _registers.length; i++) {
            _registers[i].callback(data);
        }
    }
    // ---安卓调H5回调
    if (root.fullShare) {
        root.fullShare.setHtml = setHtml;
    } else {
        root.fullShare = {};
        root.fullShare.setHtml = setHtml;
    }
    // ---IOS调H5回调
    if (fs.isIos) {
        root.setupWebViewJavascriptBridge(function(bridge) {
            bridge.registerHandler('setHtml', function(data, responseCallback) {
                console.log('JS方法被调用:' + data);
                setHtml(data);
            })
        })
    }
    fs.setHtml = root.fullShare.setHtml;

    var register = function(callback) {
        if (typeof callback == 'function') {
            _registers.push({ id: 'fsRegster_' + _id++, callback: callback });
        } else {
            console.warn('the callback should be a function');
        }
    }
    fs.register = register;
    root.FS = fs;
})(typeof FS != 'undefined' ? FS : {});