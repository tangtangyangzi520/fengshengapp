# 说明

## 项目运行（nodejs 6.0+）
``` bash
# 克隆到本地
git clone http://gitlab.fshealthtop.com/Denis/fullshare-app-h5.git

# 进入h5-pages目录安装依赖
npm install

# 在config/index.js中配置要运行的项目，修改proName='项目目录名称'即可，开启本地服务器localhost:8088
npm run dev

# 打包发布
npm run build
```

## 路由配置
```js
import App from '../App'

export default [{
    path: '/',
    component: App,
    children: [{
        path: '',
        component: r => require.ensure([], () => r(require('../page/home')), 'home')
    }, {
        path: '/item',
        component: r => require.ensure([], () => r(require('../page/item')), 'item')
    }, {
        path: '/score',
        component: r => require.ensure([], () => r(require('../page/score')), 'score')
    }]
}]

```
