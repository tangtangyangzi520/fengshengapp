import client from "./client";
// clickSource: 0:文章内容  1:相关推荐
//svn文档：fullshare-cms\06研发\客户端与网页交互\客户端与网页交互.docx

function setupWebViewJavascriptBridge(callback) {
    if (window.WebViewJavascriptBridge) { return callback(WebViewJavascriptBridge); }
    if (window.WVJBCallbacks) { return window.WVJBCallbacks.push(callback); }
    window.WVJBCallbacks = [callback];
    var WVJBIframe = document.createElement('iframe');
    WVJBIframe.style.display = 'none';
    WVJBIframe.src = 'wvjbscheme://__BRIDGE_LOADED__';
    document.documentElement.appendChild(WVJBIframe);
    setTimeout(function() { document.documentElement.removeChild(WVJBIframe) }, 0)
}
window.setupWebViewJavascriptBridge = setupWebViewJavascriptBridge;
let handlerHtmlMessageCall = () => {};
//APP端调H5
function setHtml(data) {
    //安卓调H5方法
    if (typeof data == 'string') {
        data = JSON.parse(data);
    }
    if (data.type == 0) {
        window.userinfo = data.data;
    }
    handlerHtmlMessageCall(data);
}
if (client.IS_IOS) {
    //IOS调H5方法
    window.setupWebViewJavascriptBridge(function(bridge) {
        bridge.registerHandler('setHtml', function(data, responseCallback) {
            console.log('JS方法被调用:' + data);
            if (data.type == 0) {
                window.userinfo = data.data;
            }
            handlerHtmlMessageCall(data);
        })
    })
}
if (window.fullShare) {
    window.fullShare.setHtml = setHtml;
} else {
    window.fullShare = {};
    window.fullShare.setHtml = setHtml;
}
//H5调APP方法
function handlerHtmlMessage(options, callback = () => {}) {
    handlerHtmlMessageCall = callback;
    if (client.IS_IOS) {
        window.setupWebViewJavascriptBridge(function(bridge) {
            bridge.callHandler('handlerHtmlMessage', options, function(responseData) {})
        })
    } else {
        window.fullShare.handlerHtmlMessage(JSON.stringify(options));
    }
}
//获取用户message
if (client.inFstop) {
    handlerHtmlMessage({ type: 4, data: {} });
} else {
    window.userinfo = { deviceId: 'deviceId' };
}
export default {
    handlerHtmlMessage
}