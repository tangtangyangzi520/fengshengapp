import $ from 'zepto'

const post = (url, options) => {
    return new Promise((resolve, reject) => {
        $.ajax({
            url: url,
            data: JSON.stringify(options),
            type: 'post',
            headers: {
                'content-Type': 'application/json',
                // "Authorization": '8f1414d385df77a9b745abce83dc1650cc167248ea650fb393d14959dbf8bfc708251189df9f42a4445cf5ccddc1a64b4c5f5305a1630514'
                // "Authorization": '7ee13da7612933472920f5056b3a5591b0f9f02446c0117ce6b8e6acbeb876a23869e97ece378d91c9fa2238fc8deccf1b299ca521b12317'
                // "Authorization": '20e5ac263428326438e549200cc835f5a2f4f8e508fc0a9b1bf1e726f457d252548a62230d8a84085febac76bbc59b05c5cd5a4ecc27c52e'
                'Authorization': window.userInfo.authorization,
                'deviceId': window.userInfo.deviceId,
                'appVersion': window.userInfo.version
            },
            success: (data) => {
                data = typeof data === 'object' ? data : JSON.parse(data)
                resolve(data)
            },
            error: (data) => {
                let response = JSON.parse(data.responseText)
                reject({ msg: response.message })
            }
        })
    })
}

const postWithHeader = (url, options) => {
    return new Promise((resolve, reject) => {
        $.ajax({
            url: url,
            data: options,
            type: 'post',
            headers: {
                'content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': window.userInfo.authorization
            },
            success: (data) => {
                data = typeof data === 'object' ? data : JSON.parse(data)
                resolve(data)
            },
            error: () => {
                let response = JSON.parse(data.responseText)
                reject({ msg: response.message })
            }
        })
    })
}

const postWithHeaderNoAuth = (url, options) => {
    return new Promise((resolve, reject) => {
        $.ajax({
            url: url,
            data: options,
            type: 'post',
            headers: {
                'content-Type': 'application/json',
                'Accept': 'application/json',
            },
            success: (data) => {
                data = typeof data === 'object' ? data : JSON.parse(data)
                resolve(data)
            },
            error: () => {
                reject('网络连接错误')
            }
        })
    })
}

const get = (url, options = {}, isString = false) => {
    return new Promise((resolve, reject) => {
        $.ajax({
            url: url,
            data: options,
            type: 'get',
            cache: false,
            success: (data) => {
                if (isString) {
                    resolve(data)
                    return
                }
                data = typeof data === 'object' ? data : JSON.parse(data)
                resolve(data)
            },
            error: () => {
                reject('网络连接错误')
            }
        })
    })
}
const getQueryString = (name) => {
        let reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i')
        let r = window.location.search.substr(1).match(reg)
        if (r != null) return r[2]
        return null
    }
    // 微信相关
const wechat = {
    init: (config) => {
        wx.ready(() => {
            //分享给朋友
            wx.onMenuShareAppMessage({
                    title: config.title,
                    desc: config.desc,
                    link: '' + config.link + '',
                    imgUrl: '' + config.imgUrl + '',
                    trigger: (res) => {
                        _czc && _czc.push(['_trackEvent', '点击弹出分享给朋友', 'click', 'startup', 1])
                        config.trigger && config.trigger()
                    },
                    success: (res) => {
                        _czc && _czc.push(['_trackEvent', '分享给朋友', 'click', 'startup', 1])
                        config.success && config.success()
                    },
                    cancel: (res) => {
                        _czc && _czc.push(['_trackEvent', '取消分享给朋友', 'click', 'startup', 1])
                        config.cancel && config.cancel()
                    },
                    fail: (res) => {
                        _czc && _czc.push(['_trackEvent', '分享到朋友失败', 'click', 'startup', 1])
                        config.fail && config.fail()
                    }
                })
                // 分享到朋友圈
            wx.onMenuShareTimeline({
                title: config.timelineTitle,
                desc: config.timelineTitle,
                link: '' + config.link + '',
                imgUrl: '' + config.imgUrl + '',
                trigger: (res) => {
                    _czc && _czc.push(['_trackEvent', '点击弹出分享到朋友圈', 'click', 'startup', 1])
                    config.trigger && config.trigger()
                },
                success: (res) => {
                    _czc && _czc.push(['_trackEvent', '成功分享到朋友圈', 'click', 'startup', 1])
                    config.success && config.success()
                },
                cancel: (res) => {
                    _czc && _czc.push(['_trackEvent', '取消分享到朋友圈', 'click', 'startup', 1])
                    config.cancel && config.cancel()
                },
                fail: (res) => {
                    _czc && _czc.push(['_trackEvent', '分享到朋友圈失败', 'click', 'startup', 1])
                    config.fail && config.fail()
                }
            })
        })
    }
}

function formateDate(date, splitStr) {
    let time = new Date(date)
    splitStr = splitStr ? splitStr : '-'
    return time.getFullYear() + splitStr + intNum(time.getMonth() + 1) + splitStr + intNum(time.getDate())
}

function formateDateTime(date, splitStr) {
    let time = new Date(date)
    splitStr = splitStr ? splitStr : '-'
    return time.getFullYear() + splitStr + intNum(time.getMonth() + 1) + splitStr + intNum(time.getDate()) + ' ' + intNum(time.getHours()) + ':' + intNum(time.getMinutes()) + ':' + intNum(time.getSeconds())
}

function intNum(num) {
    return num < 10 ? '0' + num : num
}
const Client = {
    get,
    post,
    postWithHeader,
    postWithHeaderNoAuth,
    getQueryString,
    wechat,
    formateDate,
    formateDateTime,
    intNum,
}

export default Client