// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import FastClick from 'fastclick'
import VueRouter from 'vue-router'
import { sync } from 'vuex-router-sync'
import App from './App'
import router from './router'
import store from './store/'
import bridge from './common/plugins/bridge/'
import VueLazyload from 'vue-lazyload'

// import Vuex from 'vuex'
// Vue.use(Vuex)

Vue.use(VueRouter)

store.registerModule('vux', {
    state: {
        demoScrollTop: 0,
        isLoading: false,
        direction: 'forward'
    },
    mutations: {
        updateDemoPosition(state, payload) {
            state.demoScrollTop = payload.top
        },
        updateLoadingStatus(state, payload) {
            state.isLoading = payload.isLoading
        },
        updateDirection(state, payload) {
            state.direction = payload.direction
        }
    },
    actions: {
        updateDemoPosition({ commit }, top) {
            commit({ type: 'updateDemoPosition', top: top })
        }
    }
})
Vue.use(store)
    // plugins
import { ConfigPlugin, BusPlugin, DatetimePlugin, LocalePlugin, DevicePlugin, ToastPlugin, AlertPlugin, ConfirmPlugin, LoadingPlugin, WechatPlugin, AjaxPlugin, AppPlugin } from 'vux'

Vue.use(DevicePlugin)
Vue.use(ToastPlugin)
Vue.use(AlertPlugin)
Vue.use(ConfirmPlugin)
Vue.use(LoadingPlugin)
Vue.use(WechatPlugin)
Vue.use(AjaxPlugin)
Vue.use(LocalePlugin)
Vue.use(DatetimePlugin)
Vue.use(BusPlugin)
Vue.use(ConfigPlugin, {
    $layout: 'VIEW_BOX' // global config for VUX, since v2.5.12
})
Vue.use(bridge)

// 延迟加载
Vue.use(VueLazyload, {
    error: 'http://img.zcool.cn/community/01443f564897a432f87512f6eed753.gif',
    loading: 'http://img1.fshtop.com/486626498_1509674283650.gif',
    try: 3 // default 1
})


// test
if (process.env.platform === 'app') {
    Vue.use(AppPlugin, store)
}

const wx = Vue.wechat
const http = Vue.http

FastClick.attach(document.body)

Vue.config.productionTip = false
sync(store, router)

// simple history management
const history = window.sessionStorage
history.clear()
let historyCount = history.getItem('count') * 1 || 0
history.setItem('/', 0)
router.beforeEach(function(to, from, next) {
    store.commit('updateLoadingStatus', { isLoading: true })

    const toIndex = history.getItem(to.path)
    const fromIndex = history.getItem(from.path)

    if (toIndex) {
        if (!fromIndex || parseInt(toIndex, 10) > parseInt(fromIndex, 10) || (toIndex === '0' && fromIndex === '0')) {
            store.commit('updateDirection', { direction: 'forward' })
        } else {
            store.commit('updateDirection', { direction: 'reverse' })
        }
    } else {
        ++historyCount
        history.setItem('count', historyCount)
        to.path !== '/' && history.setItem(to.path, historyCount)
        store.commit('updateDirection', { direction: 'forward' })
    }

    if (/\/http/.test(to.path)) {
        let url = to.path.split('http')[1]
        window.location.href = `http${url}`
    } else {
        next()
    }
})

router.afterEach(function(to) {
    store.commit('updateLoadingStatus', { isLoading: false })
        // if (process.env.NODE_ENV === 'production') {
        //     ga && ga('set', 'page', to.fullPath)
        //     ga && ga('send', 'pageview')
        // }
})

/* eslint-disable no-new */
let hasInit = false
Vue.$bridge.getUserInfo(() => {
    if (hasInit) return
    hasInit = true
    new Vue({
        store,
        router,
        render: h => h(App)
    }).$mount('#app-box')
})