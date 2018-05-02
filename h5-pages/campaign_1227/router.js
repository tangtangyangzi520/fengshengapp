import App from './App';

export default [{
    path: '/',
    component: App,
    children: [{
        path: 'home',
        component: r => require.ensure([], () => r(require('./page/home')), 'home'),
        children: [{
            path: 'videoList',
            component: r => require.ensure([], () => r(require('./page/home/videoList')), 'videoList')
        }, {
            path: 'miniProgram',
            component: r => require.ensure([], () => r(require('./page/home/miniProgram')), 'miniProgram')
        }, {
            path: 'goods',
            component: r => require.ensure([], () => r(require('./page/home/goods')), 'goods')
        }]
    }, {
        path: 'loading',
        component: r => require.ensure([], () => r(require('./components/loading/loading-page')), 'loading')
    }]
}];