# vue-cli多页面应用

> A Vue.js 2.0 project

## Build Setup

``` bash
# install dependencies

使用淘宝 cnpm安装，复制粘贴执行：

alias cnpm="npm --registry=https://registry.npm.taobao.org \
--cache=$HOME/.npm/.cache/cnpm \
--disturl=https://npm.taobao.org/dist \
--userconfig=$HOME/.cnpmrc"

开始安装

cnpm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build
```

For detailed explanation on how things work, checkout the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).


## 修改module

1.zepto dist/zepto.js



修改前

``` javascript
}(this, function(window) {
``` 

修改后

``` javascript
}(this, function() {
``` 

### 加入动画扩展库

node_modules\zepto\dist\zepto.js 底部加入即可

zepto fx库：[https://github.com/madrobby/zepto/blob/master/src/fx.js](https://github.com/madrobby/zepto/blob/master/src/fx.js "fx")

https://mp.weixin.qq.com/advanced/wiki?t=t=resource/res_main&id=mp1483682025_enmey


2.vue-lazyload vue-lazyload.es5.js
修改横向滚动图片无法加载问题


修改前： 
``` javascript
if (rect.top < window.innerHeight * Init.preLoad && rect.bottom > 0 && rect.left < window.innerWidth * Init.preLoad && rect.right > 0) 
``` 

修改后

``` javascript
if (rect.top < window.innerHeight * Init.preLoad && rect.bottom > 0) {

``` 

修改图片URL可能带空格时拿来做背景图，单引号双引号导致渲染不出来的问题
修改前：
el.setAttribute('style', bindType + ': url(' + src + ')');
修改后：
el.setAttribute('style', bindType + ': url(\"' + src + '\")');