import App from './App'

export default [{
    path: '/',
    component: App,
    children: [{
        path: 'home',
        component: r => require.ensure([], () => r(require('./page/home')), 'home')
    }, {
        path: 'homePage',
        component: r => require.ensure([], () => r(require('./page/home/homePage')), 'homePage')
    }, {
        path: 'getTopWX',
        component: r => require.ensure([], () => r(require('./page/getTop/wx')), 'wx')
    }, {
        path: 'getTopPC',
        component: r => require.ensure([], () => r(require('./page/getTop/pc')), 'pc')
    }, {
        path: 'fail',
        component: r => require.ensure([], () => r(require('./page/getTop/fail')), 'fail')
    }, {
        path: 'success',
        component: r => require.ensure([], () => r(require('./page/getTop/success')), 'success')
    }, {
        path: 'getTopResult',
        component: r => require.ensure([], () => r(require('./page/getTop/result')), 'result')
    }, {
        path: 'admin',
        component: r => require.ensure([], () => r(require('./page/getTop/admin/index')), 'admin')
    }, {
        path: 'question',
        component: r => require.ensure([], () => r(require('./page/getTop/admin/question')), 'question')
    }, {
        path: 'programList',
        component: r => require.ensure([], () => r(require('./page/programList/index')), 'programList')
    }, {
        path: 'programListVote',
        component: r => require.ensure([], () => r(require('./page/programList/vote')), 'programListVote')
    }, {
        path: 'programListStart',
        component: r => require.ensure([], () => r(require('./page/programList/start')), 'programListStart')
    }]
}]