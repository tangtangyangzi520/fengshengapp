!function(e){var t=window,n=navigator.userAgent.toLowerCase(),a=function(e){let n=new RegExp("(^|&)"+e+"=([^&]*)(&|$)","i"),a=t.location.search.substr(1).match(n);return null!=a?a[2]:null};e.isApp=!(!/fstop/.test(n)&&!a("device")),e.isIos=!!n.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/),e.getQueryString=a,e.ajax=function(e){(e=e||{}).method=e.method.toUpperCase()||"POST",e.url=e.url||"",e.async=e.async||!0,e.data=e.data||null,e.success=e.success||function(){};var t=null;t=XMLHttpRequest?new XMLHttpRequest:new ActiveXObject("Microsoft.XMLHTTP");var n=[];for(var a in e.data)n.push(a+"="+e.data[a]);var s=n.join("&");"POST"===e.method.toUpperCase()?(t.open(e.method,e.url,e.async),t.setRequestHeader("Content-Type","application/x-www-form-urlencoded;charset=utf-8"),t.send(s)):"GET"===e.method.toUpperCase()&&(t.open(e.method,e.url+"?"+s,e.async),t.send(null)),t.onreadystatechange=function(){4==t.readyState&&200==t.status&&e.success(t.responseText)}},window.FS=e}("undefined"!=typeof FS?FS:{}),function(e){function t(e){for(var t=0;t<a.length;t++)a[t].callback(e)}var n=window,a=(navigator.userAgent.toLowerCase(),[]),s=0;n.setupWebViewJavascriptBridge=function(e){if(n.WebViewJavascriptBridge)return e(WebViewJavascriptBridge);if(n.WVJBCallbacks)return n.WVJBCallbacks.push(e);n.WVJBCallbacks=[e];var t=document.createElement("iframe");t.style.display="none",t.src="wvjbscheme://__BRIDGE_LOADED__",document.documentElement.appendChild(t),setTimeout(function(){document.documentElement.removeChild(t)},0)},e.handlerHtmlMessage=function(t,a){r(a),e.isIos?n.setupWebViewJavascriptBridge(function(e){e.callHandler("handlerHtmlMessage",t,function(e){})}):n.fullShare.handlerHtmlMessage(JSON.stringify(t))},n.fullShare?n.fullShare.setHtml=t:(n.fullShare={},n.fullShare.setHtml=t),e.isIos&&n.setupWebViewJavascriptBridge(function(e){e.registerHandler("setHtml",function(e,n){console.log("JS方法被调用:"+e),t(e)})}),e.setHtml=n.fullShare.setHtml;var r=function(e){"function"==typeof e?a.push({id:"fsRegster_"+s++,callback:e}):console.warn("the callback should be a function")};e.register=r,n.FS=e}("undefined"!=typeof FS?FS:{});