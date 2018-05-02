import utils from './utils'
import { changeTitle } from '../../utils/hack'
import tracker from './tracker'
const root = window

function setupWebViewJavascriptBridge(callback) {
    if (window.WebViewJavascriptBridge) { return callback(WebViewJavascriptBridge) }
    if (window.WVJBCallbacks) { return window.WVJBCallbacks.push(callback) }
    window.WVJBCallbacks = [callback]
    var WVJBIframe = document.createElement('iframe')
    WVJBIframe.style.display = 'none'
    WVJBIframe.src = 'wvjbscheme://__BRIDGE_LOADED__'
    document.documentElement.appendChild(WVJBIframe)
    setTimeout(function() { document.documentElement.removeChild(WVJBIframe) }, 0)
}
window.setupWebViewJavascriptBridge = setupWebViewJavascriptBridge

const plugin = {
    install(vue) {
        let _registers = [],
            _id = 0

        // app调H5具体方法
        function setEBHtml(data) {
            if (typeof data == 'string') {
                data = JSON.parse(data)
            }
            for (var i = 0; i < _registers.length; i++) {
                //注意添加的方法默认只能在当前页调用！！！！！！
                if (_registers[i].href == location.href || _registers[i].name == 'tabActiveCallback') {
                    _registers[i].callback(data)
                }
            }
        }
        // setInterval(() => {
        //     setEBHtml(33)
        // }, 3000)

        // ---安卓调H5回调
        if (root.fullShare) {
            root.fullShare.setEBHtml = setEBHtml
        } else {
            root.fullShare = {}
            root.fullShare.setEBHtml = setEBHtml
        }
        // ---IOS调H5回调
        if (utils.isIos) {
            root.setupWebViewJavascriptBridge(function(bridge) {
                bridge.registerHandler('setEBHtml', function(data, responseCallback) {
                    console.log('JS方法被调用:' + data)
                    setEBHtml(data)
                })
            })
        }
        const bridge = {
            //添加一个监听app调用H5的方法，注意添加的方法默认只能在当前页调用！！！！！！
            register(name, callback) {
                let id = _id++
                    if (typeof callback == 'function') {
                        let existItemIndex = _registers.findIndex(item => item.name == name)
                        if (existItemIndex >= 0) {
                            _registers.splice(existItemIndex, 1, { name: name, id: 'fsRegister_' + id, callback: callback, href: location.href })
                        } else {
                            _registers.push({ name: name, id: 'fsRegister_' + id, callback: callback, href: location.href })
                        }
                    } else {
                        console.warn('the callback should be a function')
                    }

                return id
            },
            //清楚监听方法
            clear(name) {
                if (name) {
                    let itemIndex = _registers.findIndex(item => item.name == name)
                    _registers.splice(itemIndex, 1)
                } else {
                    _registers = []
                }
            },
            //H5调用app基本方法
            handlerEBMessage(options) {
                if (!utils.isApp) return
                    // H5调APP方法
                if (utils.isIos) {
                    root.setupWebViewJavascriptBridge(function(appBridge) {
                        appBridge.callHandler('handlerEBMessage', options, function(responseData) {})
                    })
                } else {
                    window.fullShare.handlerEBMessage(JSON.stringify(options))
                }
            },
            // 商品详情页顶部条tab，btn
            showSpuDetailTabBar(callback) {
                this.register('tabActiveCallback', (data) => {
                    if (data.type == 5) {
                        callback(data.data)
                    }
                })
                this.handlerEBMessage({
                    type: 1,
                    data: {
                        'hasHome': 1,
                        'hasShare': 1,
                    }
                })
            },
            changeSpuDetailTabIndex(index) {
                this.handlerEBMessage({
                    type: 1,
                    data: {
                        'tab': [
                            { 'name': '商品', 'tabCode': 0, 'isSelected': index == 0 ? 1 : 0 },
                            { 'name': '评价', 'tabCode': 1, 'isSelected': index == 1 ? 1 : 0 },
                            { 'name': '详情', 'tabCode': 2, 'isSelected': index == 2 ? 1 : 0 }
                        ],
                        'hasHome': 1,
                        'hasShare': 1,
                    }
                })
            },
            //设置头部标题
            setTitle(title) {
                this.title = title
                this.handlerEBMessage({
                    type: 1,
                    data: {
                        title: title,
                        'hasHome': 0,
                        'hasShare': 0,
                    }
                })
                changeTitle(title)
            },
            // 显示分享按钮
            showShareBtn(options, callback) {
                this.setShareInfo(options, callback)
                this.handlerEBMessage({
                    type: 1,
                    data: {
                        hasShare: 1
                    }
                })
            },
            // 显示右上角文字按钮
            showRightBtn(options, callback = () => {}) {
                this.register('buttonActiveCallback', (data) => {
                    if (data.type == 4) {
                        callback(data.data)
                    }
                })
                this.handlerEBMessage({
                    type: 1,
                    data: {
                        title: this.title,
                        'btn': {
                            name: options.name,
                            code: options.code
                        }
                    }
                })
            },
            // 获取用户信息
            getUserInfo(callback) {
                if (utils.isApp) {
                    this.register('getUserInfo', (data) => {
                        if (data.type == 0) {
                            window.userInfo = data.data
                            callback && callback(data)
                        }
                    })
                    this.handlerEBMessage({
                        type: 4,
                        data: {}
                    })
                } else {
                    window.userInfo = {
                        deviceId: '22', //24808ece4eb30608d5d8758675514c200c1e9a48431af497fb2b629b6f8557d1e464092ac420fa49c265b1ca218d8a26421a68a9f8a84d22
                        authorization: '55dffb6d15673a439be13dca18a121c13b203990c184f1a6249c4956a036c355f9ca8fe32dcbdeb5445cf5ccddc1a64b4c5f5305a1630514',
                        version: '3.1'
                    }
                    callback()
                }

            },
            // 弹出登录界面
            showLogin() {
                this.handlerEBMessage({
                    type: 3,
                    data: {}
                })
            },
            // 设置分享信息
            setShareInfo(options, callback = {}) {
                if (!options) return
                this.register('onShareBtnClick', (data) => {
                    if (data.type == 1) {
                        this.handlerEBMessage({
                            type: 5,
                            data: {
                                'title': options.title ? options.title : '',
                                'desc': options.desc ? options.desc : '',
                                'url': options.url ? options.url : location.href,
                                'imgUrl': options.imgUrl ? options.imgUrl : 'http://img1.fshtop.com/ic_launcher_app.png'
                            }
                        })
                        callback && callback(data)
                    }
                })
            },
            // 调用支付
            showPay(options, callback) {
                this.register('showPay', (data) => {
                    if (data.type == 3) {
                        callback && callback(data)
                    }
                })
                this.handlerEBMessage({
                    type: 2,
                    data: {
                        'payType': options.payType,
                        'appOrderNo': options.orderNo
                    }
                })
            },
            // 返回首页
            goHome() {
                this.handlerEBMessage({
                    type: 7,
                    data: {}
                })
            },
            // 历史订单
            goOrderHistory() {
                this.handlerEBMessage({
                    type: 6,
                    data: {}
                })
            },
            // 联系客服
            kefu(options) {
                this.handlerEBMessage({
                    type: 8,
                    data: {
                        'title': options.title ? options.title : '',
                        'desc': options.desc ? options.desc : '',
                        'url': options.url ? options.url : location.href,
                        'imgUrl': options.imgUrl ? options.imgUrl : 'http://img1.fshtop.com/ic_launcher_app.png'
                    }
                })
            },
            //控制物理键返回
            waitForBack(status) {
                this.handlerEBMessage({
                    type: 9,
                    data: {
                        'isWaitForBack': status
                    }
                })
            },
            //首次访问页面统计
            firstRead(data) {
                tracker.firstRead(data)
            },
            //统计点击事件
            trackData(data) {
                tracker.trackData(data)
            }
        }

        vue.$bridge = bridge
        vue.mixin({
            created: function() {
                this.$bridge = vue.$bridge
            }
        })
    }
}

export default plugin
export const install = plugin.install