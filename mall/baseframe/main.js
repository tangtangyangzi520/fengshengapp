import Vue from 'vue';
import VueRouter from 'vue-router';
import routes from './router/router';
import store from './store/';
import '../common/styles/common';
import 'animate.css';
import './styles/common.less';

Vue.use(VueRouter);
const router = new VueRouter({
    routes
});

new Vue({
    router,
    store
}).$mount('#app');