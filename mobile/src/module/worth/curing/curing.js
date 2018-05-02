import Vue from 'vue'
import App from './App.vue'
import VueLazyload from 'vue-lazyload'
// 延迟加载
Vue.use(VueLazyload, {
    error: 'http://img.zcool.cn/community/01443f564897a432f87512f6eed753.gif',
    loading: 'http://img.zcool.cn/community/01443f564897a432f87512f6eed753.gif',
    try: 3 // default 1
})

new Vue({
    el: '#app',
    template: '<App/>',
    components: { App }
})