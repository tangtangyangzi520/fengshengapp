import App from '../App';

export default [{
    path: '/',
    component: App,
    children: [{
        path: '',
        component: r => require.ensure([], () => r(require('../page/home')), 'home'),
        children: [{
            path: 'rule',
            component: r => require.ensure([], () => r(require('../page/home/rule')), 'rule')
        }, {
            path: 'myPrize',
            component: r => require.ensure([], () => r(require('../page/home/myPrize')), 'myPrize')
        }]
    }, {
        path: 'game',
        component: r => require.ensure([], () => r(require('../page/game')), 'game')
    }, {
        path: 'result',
        component: r => require.ensure([], () => r(require('../page/result')), 'result'),
        children: [{
            path: 'share',
            component: r => require.ensure([], () => r(require('../page/result/share')), 'share')
        }]
    }]
}];