import $ from 'zepto'
import client from './utils'
//统计tracker接口
let TRACKER = 'http://tracker.fshtop.com/sts/flume/post'

//时间戳
let timeString = function() {
    return +new Date().getTime()
}

//创建时间
function createTime() {
    let dates = new Date(),
        year = dates.getFullYear(),
        month = dates.getMonth() + 1,
        day = dates.getDate(),
        hour = dates.getHours(),
        minute = dates.getMinutes(),
        second = dates.getSeconds()
    month = checkTime(month)
    day = checkTime(day)
    hour = checkTime(hour)
    minute = checkTime(minute)
    second = checkTime(second)
    return year + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':' + second
}

//年月日时分秒转化；
function checkTime(times) {
    return times = (times < 10 ? '0' + times : times)
}

//checkPlatform
function platform() {
    let userAgentInfo = navigator.userAgent.toLowerCase()
    let flag = 3 //默认浏览器打开
    if (/fstop/.test(userAgentInfo)) {
        flag = 1 //app端
    } else if (userAgentInfo.match(/MicroMessenger/i) == 'micromessenger') {
        flag = 2 //weChat
    }
    return flag
}

//随机生成指定N位数
function randNum(n) {
    let rnd = ''
    for (let i = 0; i < n; i++) {
        rnd += Math.floor(Math.random() * 10)
    }
    return rnd
}

function setCookie(cname, cvalue, exdays) {
    if (typeof exdays == 'undefined') {
        exdays = ''
    } else {
        var d = new Date()
        d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000))
        var expires = 'expires=' + d.toUTCString()
    }
    document.cookie = cname + '=' + cvalue + '; ' + expires + '; path=/'
}
//getcookie
function getCookie(cname) {
    var name = cname + '='
    var ca = document.cookie.split(';')
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i]
        while (c.charAt(0) == ' ') c = c.substring(1)
        if (c.indexOf(name) != -1) return c.substring(name.length, c.length)
    }
    return ''
}

//客户端的唯一识别码
let startUnique = null
const appSeries = timeString() + randNum(5)

let fsAgent = navigator.userAgent.toLowerCase()
if (!client.isIos && /fstop/.test(fsAgent)) {
    startUnique = appSeries
} else {
    let startSeries = localStorage.getItem('startKey')
    if (startSeries == null) {
        localStorage.setItem('startKey', appSeries)
    }
    startUnique = localStorage.getItem('startKey')
}


/*let startSeries=getCookie("startKey");
if(startSeries==''){
	const appSeries=timeString()+randNum(5);
	setCookie("startKey", appSeries, 360);
	//sessionStorage.setItem("startKey",appSeries);
}
//每一次启动app都会产生一个独一无二的串号
const startUnique=getCookie("startKey");*/

//刚进入页面的时间戳
const firstTime = createTime()
    //安卓或ios
const osType = client.isIos == true ? 2 : 1
    //平台类型
const isPlatform = platform()
    //客户端的唯一识别码,一般浏览器,(时间戳 + 五位的随机数)字符串
const uniqueId = timeString().toString()
    //用户是否登录
let userLogin = 0
if (window.userinfo) {
    window.userinfo.deviceId != 'deviceId' ? userLogin = 1 : ''
}
//所有事件的公共的字段
const postArr = function() {
        return {
            'app_key': '100001',
            'id': startUnique, //客户端的唯一识别码
            'app_version': window.userInfo == undefined ? "-1" : window.userInfo.version,
            'app_channel': '-1',
            'platform': isPlatform,
            'mobile_brand': '-1',
            'system_version': '-1',
            'model': '-1', //手机型号
            'os_type': osType, //手机类型 1. Android  2.IOS
            'start_series': uniqueId,
            'create_time': firstTime,
            'login_status': userLogin //用户是否登陆：0.没有登录 1.已经登录
        }
    }
    //滑动浏览事件上传对象
    //拿到当前滚动高度
let scrollTop = function() {
    const st = $(window).scrollTop()
    return st
}

let sTop = 0,
    eTop = 0

//滑动浏览事件上传对象
let scrollEvent = postArr()
scrollEvent.global_event = 2

//刚浏览页面的时间戳
const startRead = timeString()

//窗口总高度
const winHeight = $(window).height()


var scrollCase = function(event) {
    document.addEventListener('touchstart', function() {
        sTop = scrollTop()
            //console.log(sTop);
    }, false)
    document.addEventListener('touchend', function() {
        eTop = scrollTop()
            //console.log(eTop);
        if (eTop - sTop > 20 || sTop - eTop > 20) {
            //console.log("滚动距离大于20");
            const getTitle = document.title
            const stayTime = parseInt((timeString() - startRead) / 1000)
            const docHeight = $(document.body).height()
            const hasRead = parseInt((eTop + winHeight) / docHeight * 100) + '%'
                //const componentId=client.getQueryString('componentId');
                /*if(componentId){
                	scrollEvent.page_id=componentId;
                }*/
            if (event.title) {
                scrollEvent.page_title = event.title
            }
            scrollEvent.event_id = 218010
            scrollEvent.event_name = '内容页滑动'
            scrollEvent.action_type = '滑动'
                //scrollEvent.page_name=getTitle;
                //scrollEvent.stay_time=stayTime;
            scrollEvent.page_url = location.href
                //scrollEvent.page_title=getTitle;
            scrollEvent.content = hasRead //浏览页面百分比
            if (event.event_name) {
                scrollEvent.event_name = event.event_name
            }
            //console.log(scrollEvent);
            client.postData(TRACKER, [scrollEvent]).then((data) => {
                //console.log(data);
                if (data.code != 200) {
                    return
                }
            }, (data) => {})

        }
    }, false)
}



//初次进入浏览页面tracker
const firstRead = function(e) {
    //初次进入浏览页面上传对象
    let firstEvent = postArr()
    firstEvent.global_event = 1
    const stayTime = parseInt((timeString() - startRead) / 1000)
        //const docHeight=$(document.body).height();
        //const hasRead=parseInt((eTop+winHeight)/docHeight*100)+"%";

    if (client.getQueryString('shareId')) {
        firstEvent.page_name = '被分享者看到的H5'
        firstEvent.page_id = 316
    } else {
        //const getTitle=document.title;
        if (client.getQueryString('tracker')) {
            firstEvent.page_name = e.title
            firstEvent.page_id = e.id
        } else {
            e.pageName ? firstEvent.page_name = e.pageName : firstEvent.page_name = '内容页'
            firstEvent.page_id = e.id
        }
    }
    firstEvent.stay_time = stayTime
    firstEvent.page_url = location.href
    firstEvent.page_title = e.title
    if (e.page_url) {
        firstEvent.page_url = e.page_url
    }
    if (e.page_name) {
        firstEvent.page_name = e.page_name
    }
    //新加字段 类型long,有才传值（非必填）
    if (e.component_id) {
        firstEvent.component_id = e.component_id
    }
    if (e.fence_id) {
        firstEvent.fence_id = +e.fence_id
    }
    if (e.column_id) {
        firstEvent.column_id = +e.column_id
    }
    $.ajax({
        url: TRACKER,
        data: JSON.stringify([firstEvent]),
        type: 'post',
        contentType: 'application/json',
        success: () => {}
    })
}


//点击事件tracker
const trackData = function(e) {
    //点击事件上传对象
    let clickEvent = postArr()
    clickEvent.global_event = 2
    clickEvent.event_id = 218011
    clickEvent.event_name = '内容页点击'
    clickEvent.action_type = '点击'
    clickEvent.page_url = location.href
        //下载页另外传入event_name
    if (client.getQueryString('tracker')) {
        clickEvent.event_name = e.title
    }
    if (e.id) {
        clickEvent.event_id = e.id
            //针对分享页底部的快去下载按钮(与page_title相同)
        if (e.id = '316002') {
            clickEvent.event_name = e.title
        }
    }
    if (e.title) {
        clickEvent.page_title = e.title
    }
    if (e.content) {
        //默认放入点击区块的标题
        clickEvent.content = e.content
    } else {
        clickEvent.content = ''
    }
    //如果传入type,区分是良品良店，还是行动或食谱
    if (e.type) {
        //console.log(e.type);
        if (e.type == 15 || e.type == 13) {
            //商品传入的是小标题subtitle
            clickEvent.content = '文章商品：' + e.subtitle
                //如果有传入goBuy直达链接
            if (e.goBuy) {
                clickEvent.content = e.goBuy
            }
        } else if (e.type == 17) {
            clickEvent.content = '文章食谱：' + e.content
        } else if (e.type == 170) {
            //170 用来区分行动还是食谱
            clickEvent.content = '文章行动：' + e.content
        }
    }
    //clickSource: 0:文章内容  1:相关推荐
    if (e.clickSource && e.clickSource == 1) {
        clickEvent.content = '相关推荐：' + e.content
        if (e.type == 15 || e.type == 13) {
            //商品传入的是小标题subtitle
            clickEvent.content = '相关推荐：' + e.subtitle
        }
    }
    //另外直接传入event_name
    if (e.event_name) {
        clickEvent.event_name = e.event_name
    }

    if (e.page_url) {
        clickEvent.page_url = e.page_url
    }
    //新加字段 类型long,有才传值（非必填）
    if (e.component_id) {
        clickEvent.component_id = e.component_id
    }
    if (e.fence_id) {
        clickEvent.fence_id = +e.fence_id
    }
    if (e.column_id) {
        clickEvent.column_id = +e.column_id
    }
    //console.log(clickEvent);
    $.ajax({
        url: TRACKER,
        data: JSON.stringify([clickEvent]),
        type: 'post',
        contentType: 'application/json',
        success: () => {}
    })


}

const tracker = {
    trackData,
    firstRead,
    scrollCase
}

export default tracker