import res from './resource';
import client from '../../common/utils/client';

let dev = false;
let DOMAIN = document.domain;

// 接口地址配置
let apiHost;
if (!/hetao6/.test(DOMAIN)) {
    apiHost = 'http://api.m.muzhi.us' + '/api/wmt_s02e01/';
} else {
    dev = true;
    apiHost = 'http://test.api.m.muzhi.us' + '/api/wmt_s02e01/';
}

// 分享配置
let ICONSTR = 'http://' + DOMAIN + '/2017/biz/wmt_s02e01/images/share-icon.png';
let LINKSTR = 'http://' + DOMAIN + '/2017/biz/wmt_s02e01/startup.html';
let SHARE_TITLE = '分享标题';
let SHARE_DESC = '分享描述';

const initShare = (options) => {
    client.wechat.init({
        title: SHARE_TITLE,
        desc: SHARE_DESC,
        link: LINKSTR,
        imgUrl: ICONSTR,
        timelineTitle: SHARE_DESC,
        success: () => {

        },
        fail: () => {

        }
    });
};

const config = {
    dev,
    apiHost,
    res,
    initShare
};
export default config;