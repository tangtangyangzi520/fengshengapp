import $ from '../libs/zepto';
import apiConfig from '../api.config';
const dev = !/http:\/\/t/.test(location.href);
//生产环境
// const HOST = dev ? '':''
// let domain = dev ? '':'';
let wxShareConfig = null;
const moHearders = {
    'Content-Type': 'application/json',
    // 'deviceId': '1111'
};

const postData = function(url, options, header = moHearders) {
    if (/.json/.test(url)) {
        return getData(url, {});
    } else {
        let promise = new Promise(function(resolve, reject) {
            $.ajax({
                url: url,
                data: JSON.stringify(options),
                headers: header,
                type: 'post',
                contentType: 'application/json',
                success: function(data) {
                    data = typeof data == 'object' ? data : JSON.parse(data)
                    resolve(data);
                },
                error: function(data) {
                    console.log(JSON.parse(data.responseText));
                    reject(JSON.parse(data.responseText));
                }
            })
        })

        return promise
    }
}

const getData = function(url, options = {}, isString = false) {
    let promise = new Promise(function(resolve, reject) {
        let ajaxOption = {
            url: url,
            data: options,
            type: 'get',
            success: function(data) {
                if (isString) {
                    resolve(data);
                    return
                }
                data = typeof data == 'object' ? data : JSON.parse(data)
                resolve(data);
            },
            error: function() {
                if (/.json/.test(url)) {
                    //请求的json文件服务器不存在则尝试直接请求接口地址
                    let apiUrl = apiConfig.API_ARTICLE_GET;
                    if (getQueryString('test')) {
                        //预览模式设置环境为app内
                        apiUrl = apiConfig.CMS_GET_ARTICLE;
                    }
                    const componentId = getQueryString('componentId');
                    resolve(postData(apiUrl + '?componentId=' + componentId));
                } else {
                    reject('网络连接错误')
                }
            }
        }
        ajaxOption.cache = false;
        $.ajax(ajaxOption)
    })

    return promise

}

function intNum(num) {
    return num < 10 ? '0' + num : num;
}

function getQueryString(name) {
    let reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    let r = window.location.search.substr(1).match(reg);
    if (r != null) return r[2];
    return null;
}

function isWeixin() {
    var ua = navigator.userAgent.toLowerCase();
    if (ua.match(/MicroMessenger/i) == "micromessenger") {
        return true;
    } else {
        return false;
    }
}

function isPC() {
    var userAgentInfo = navigator.userAgent;
    var Agents = new Array("Android", "iPhone", "SymbianOS", "Windows Phone", "iPad", "iPod");
    var flag = true;
    for (var v = 0; v < Agents.length; v++) {
        if (userAgentInfo.indexOf(Agents[v]) > 0) {
            flag = false;
            break;
        }
    }
    return flag;
}
let hasGetShareSignature = false;
let hasSendRequestShareSignature = false;

function getSignature(config) {
    if (hasSendRequestShareSignature) return;
    hasSendRequestShareSignature = true;
    postData(apiConfig.API_SIGNATURE_GET, { url: location.href.split('#')[0] }).then((data) => {
        let jssdk = data.data;
        hasGetShareSignature = true;
        if (jssdk) {
            wx.config({
                debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                appId: jssdk.appId, // 必填，公众号的唯一标识
                timestamp: jssdk.timestamp, // 必填，生成签名的时间戳
                nonceStr: jssdk.nonceStr, // 必填，生成签名的随机串
                signature: jssdk.signature, // 必填，签名，见附录1
                jsApiList: [
                    // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
                    'onMenuShareTimeline',
                    'onMenuShareAppMessage',
                    'onMenuShareQQ',
                    'onMenuShareWeibo'
                ]
            });
            if (wxShareConfig) {
                setShare(wxShareConfig);
            } else {
                setShare(config);
            }
        }
    })
}

function getPageName(url) {
    var tmp = new Array(); //临时变量，保存分割字符串 
    tmp = url.split("/"); //按照"/"分割 
    var pp = tmp[tmp.length - 1]; //获取最后一部分，即文件名和参数 
    return pp;
}


function setShare(config) {
    if (config) {
        wxShareConfig = config;
    }
    if (!config && !wxShareConfig) {
        config = {
            title: '丰盛榜，唯有爱让生命更丰盛',
            desc: ' ',
            link: location.href,
            tlTitle: '丰盛榜，唯有爱让生命更丰盛',
            imgUrl: 'http://img1.fshtop.com/ic_launcher_app.png'
        }
    } else {
        config.title = config.title ? config.title : '丰盛榜，唯有爱让生命更丰盛';
        config.desc = config.desc ? config.desc.replace(/\<br\>/ig, '') : ' ';
        config.link = config.link ? config.link : location.href;
        config.tlTitle = config.tlTitle ? config.tlTitle : config.title;
        config.imgUrl = config.imgUrl ? config.imgUrl : 'http://img1.fshtop.com/ic_launcher_app.png';
    }

    if (hasGetShareSignature) {
        if (/img1.fshtop.com/.test(config.imgUrl)) {
            //图片中文编码转义
            config.imgUrl = config.imgUrl.replace(getPageName(config.imgUrl), encodeURIComponent(getPageName(config.imgUrl)));
        }
        wx.ready(function() {
            //分享给朋友
            wx.onMenuShareAppMessage({
                title: config.title,
                desc: config.desc,
                link: '' + config.link + '',
                imgUrl: '' + config.imgUrl + '',
                trigger: function(res) {
                    config.trigger && config.trigger();
                },
                success: function(res) {
                    config.success && config.success();
                },
                cancel: function(res) {
                    config.cancel && config.cancel();
                },
                fail: function(res) {
                    config.fail && config.fail();
                }
            });
            //分享到朋友圈
            wx.onMenuShareTimeline({
                title: config.tlTitle,
                desc: config.tlTitle,
                link: '' + config.link + '',
                imgUrl: '' + config.imgUrl + '',
                trigger: function(res) {
                    config.trigger && config.trigger();
                },
                success: function(res) {
                    config.success && config.success();
                },
                cancel: function(res) {
                    config.cancel && config.cancel();
                },
                fail: function(res) {
                    config.fail && config.fail();
                }
            });
        })
    } else {
        getSignature(config);
    }
}
if (isWeixin()) {
    setShare();
}

//ios或安卓
const ua = navigator.userAgent;
const IS_IOS = !!ua.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);

function checkWebp() {
    try {
        return (document.createElement('canvas').toDataURL('image/webp').indexOf('data:image/webp') == 0);
    } catch (err) {
        return false;
    }
}

//浏览器带有fstop标识或地址栏带有deviceid
let inFstop = false;
let fsAgent = navigator.userAgent.toLowerCase();
if (/fstop/.test(fsAgent) || getQueryString('device')) {
    inFstop = true;
}

//格式化日期
function formateDate(dt) {
    let dtime = dt instanceof Date ? dt : new Date(dt);
    return dtime.getFullYear() + '/' + (dtime.getMonth() + 1) + '/' + dtime.getDate();
}

//返回中文数字
function formatNum() {
    let nums = ['一', '二', '三', '四', '五', '六', '七', '八', '九'];
}

function countStringLength(_str) {
    var trim = function(strings) {
        return (strings || "").replace(/^(\s|\u00A0)+|(\s|\u00A0)+$/g, ""); //+表示匹配一次或多次，|表示或者，\s和\u00A0匹配空白字符，/^以……开头，$以……结尾，/g全局匹配,/i忽略大小写  
    }
    _str = trim(_str); //去除字符串的左右两边空格  
    var strlength = _str.length;
    if (!strlength) { //如果字符串长度为零，返回零  
        return 0;
    }
    var chinese = _str.match(/[\u4e00-\u9fa5]/g); //匹配中文，match返回包含中文的数组  
    return strlength + (chinese ? chinese.length : 0); //计算字符个数  
}
const Client = {
    getData,
    postData,
    getQueryString,
    dev,
    intNum,
    IS_IOS,
    IS_PC: isPC(),
    IS_WEIXIN: isWeixin(),
    setShare,
    webp: checkWebp(),
    inFstop,
    formateDate,
    countStringLength,
}

export default Client