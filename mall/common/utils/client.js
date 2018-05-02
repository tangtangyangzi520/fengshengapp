import $ from '../libs/zepto';

const post = (url, options) => {
    return new Promise((resolve, reject) => {
        $.ajax({
            url: url,
            data: options,
            type: 'post',
            success: (data) => {
                data = typeof data === 'object' ? data : JSON.parse(data);
                resolve(data);
            },
            error: () => {
                reject('网络连接错误');
            }
        });
    });
};

const get = (url, options = {}, isString = false) => {
    return new Promise((resolve, reject) => {
        $.ajax({
            url: url,
            data: options,
            type: 'get',
            cache: false,
            success: (data) => {
                if (isString) {
                    resolve(data);
                    return;
                }
                data = typeof data === 'object' ? data : JSON.parse(data);
                resolve(data);
            },
            error: () => {
                reject('网络连接错误');
            }
        });
    });
};
const getQueryString = (name) => {
    let reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
    let r = window.location.search.substr(1).match(reg);
    if (r != null) return r[2];
    return null;
};
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
                    _czc && _czc.push(['_trackEvent', '点击弹出分享给朋友', 'click', 'startup', 1]);
                    config.trigger && config.trigger();
                },
                success: (res) => {
                    _czc && _czc.push(['_trackEvent', '分享给朋友', 'click', 'startup', 1]);
                    config.success && config.success();
                },
                cancel: (res) => {
                    _czc && _czc.push(['_trackEvent', '取消分享给朋友', 'click', 'startup', 1]);
                    config.cancel && config.cancel();
                },
                fail: (res) => {
                    _czc && _czc.push(['_trackEvent', '分享到朋友失败', 'click', 'startup', 1]);
                    config.fail && config.fail();
                }
            });
            // 分享到朋友圈
            wx.onMenuShareTimeline({
                title: config.timelineTitle,
                desc: config.timelineTitle,
                link: '' + config.link + '',
                imgUrl: '' + config.imgUrl + '',
                trigger: (res) => {
                    _czc && _czc.push(['_trackEvent', '点击弹出分享到朋友圈', 'click', 'startup', 1]);
                    config.trigger && config.trigger();
                },
                success: (res) => {
                    _czc && _czc.push(['_trackEvent', '成功分享到朋友圈', 'click', 'startup', 1]);
                    config.success && config.success();
                },
                cancel: (res) => {
                    _czc && _czc.push(['_trackEvent', '取消分享到朋友圈', 'click', 'startup', 1]);
                    config.cancel && config.cancel();
                },
                fail: (res) => {
                    _czc && _czc.push(['_trackEvent', '分享到朋友圈失败', 'click', 'startup', 1]);
                    config.fail && config.fail();
                }
            });
        });
    }
};
const Client = {
    get,
    post,
    getQueryString,
    wechat
};

export default Client;