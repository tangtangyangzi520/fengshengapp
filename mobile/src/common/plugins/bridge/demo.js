// 商品详情页显示tab
this.$bridge.showSpuDetailTabBar((data) => {
    if (data.tabCode == 0) {
        //商品tab点击
    }
    if (data.tabCode == 1) {
        //评价tab点击
    }
    if (data.tabCode == 2) {
        //详情tab点击
    }
})

//按照索引值设置激活tab
this.$bridge.changeSpuDetailTabIndex(1)

//只需要设置网页标题
this.$bridge.setTitle(111)

//设置多个信息
this.$bridge.handlerEBMessage({
    type: 1,
    data: {
        'title': 'title name',
        'tab': [
            { 'name': '商品', 'tabCode': 0, 'isSelected': 1 },
            { 'name': '评价', 'tabCode': 1, 'isSelected': 0 },
            { 'name': '详情', 'tabCode': 2, 'isSelected': 0 }
        ],
        'hasHome': 1,
        'hasShare': 1,
    }
})

//设置分享信息
this.$bridge.setShareInfo({
    'title': '标题',
    'desc': '描述',
    'url': location.href,
    'imgUrl': 'http://img1.fshtop.com/ic_launcher_app.png'
})

//显示分享按钮并配置分享描述
this.$bridge.showShareBtn({
    'title': '标题',
    'desc': '描述',
    'url': location.href,
    'imgUrl': 'http://img1.fshtop.com/ic_launcher_app.png'
})

//右上角文字按钮
this.$bridge.showRightBtn({ 'name': '编辑', 'code': 1 })
this.$bridge.register('onTextBtnClick', (data) => {
    if (data.type == 4 && data.data.code == 1) {
        this.$bridge.showRightBtn({ 'name': '保存', 'code': 2 })
    }
    if (data.type == 4 && data.data.code == 2) {
        this.$bridge.showRightBtn({ 'name': '编辑', 'code': 1 })
    }
})

//支付
this.$bridge.showPay({ payType: 1, orderNo: 2324 }, (data) => {
    if (data.resultCode === 1) {
        //支付成功
    } else {
        //支付失败
    }
})

//调起登录
this.$bridge.showLogin()
this.$bridge.register('getUserInfo', (data) => {
    if (data.type == 0) {
        // 设置全局变量
        window.userInfo = data.data
    }
})

//监听方法添加
// {type:1,data:{}}
this.$bridge.register('customName', (data) => {
    if (data.type == 0) {
        // 回调返回用户信息
        // deviceId 设备ID
        // authorization
        // version 版本号
    }
    if (data.type == 1) {
        // 分享点击
    }
    if (data.type == 2) {
        // 登录完成通知网页
    }
    if (data.type == 3) {
        // 支付完成通知网页
        //resultCode：1支付成功，-1支付失败
    }
    if (data.type == 4) {
        // 按钮点击通知网页
        // {"name":"发布", "code":1}
    }
    if (data.type == 5) {
        // Tab栏点击通知网页
        //{"name":"详情", " tabCode":2, "isSelected":0}
    }
})



//----- 商品详情页 ------

// 商品详情页显示tab
this.$bridge.showSpuDetailTabBar((data) => {
    if (data.tabCode == 0) {
        //商品tab点击
    }
    if (data.tabCode == 1) {
        //评价tab点击
    }
    if (data.tabCode == 2) {
        //详情tab点击
    }
})

//设置分享信息
this.$bridge.setShareInfo({
    'title': '标题',
    'desc': '描述',
    'url': location.href,
    'imgUrl': 'http://img1.fshtop.com/ic_launcher_app.png'
})

//----- 购物车页面 ------
this.$bridge.setTitle('购物车')

//右上角文字按钮
this.$bridge.showRightBtn({ 'name': '编辑', 'code': 1 })
this.$bridge.register('onTextBtnClick', (data) => {
    if (data.type == 4 && data.data.code == 1) {
        this.$bridge.showRightBtn({ 'name': '保存', 'code': 2 })
    }
    if (data.type == 4 && data.data.code == 2) {
        this.$bridge.showRightBtn({ 'name': '编辑', 'code': 1 })
    }
})