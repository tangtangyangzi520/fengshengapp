import Vue from 'vue';
import VueRouter from 'vue-router';
import routes from './router';
import '../common/styles/common';
import './styles/common.less';
import loading from '../common/plugins/loading/'
import alert from '../common/plugins/alert/'
import toast from '../common/plugins/toast/'
Vue.use(loading);
// this.$loading.show(); this.$loading.hide();
Vue.use(alert);
// this.$alert.show({
//     content: "确定删除吗？",
//     onhide: () => {
//         console.log(333)
//     }
// });
Vue.use(toast);
// this.$toast.show({
//     content: "索拉卡地方就是离开福建省六块腹肌杀戮空间",
// });


Vue.use(VueRouter);
const router = new VueRouter({
    routes
});
router.beforeEach(function(to, from, next) {
    document.querySelector('#loadingToast') && (document.querySelector('#loadingToast').style.display = 'block');
    console.log(document.querySelector('#loadingToast'))
    next()
})

router.afterEach(function(to) {
    document.querySelector('#loadingToast') && (document.querySelector('#loadingToast').style.display = 'none');
})
new Vue({
    router,
}).$mount('#app');