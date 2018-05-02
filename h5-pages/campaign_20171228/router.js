import App from './App'

export default [{
    path: '/',
    component: App,
    children: [{
        path: 'home',
        component: r => require.ensure([], () => r(require('./page/home')), 'home')
    }, {
        path: 'rule',
        component: r => require.ensure([], () => r(require('./page/home/rule')), 'rule')
    }]
}]