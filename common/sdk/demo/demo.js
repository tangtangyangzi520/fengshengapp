//获取用户信息
$('#btnGetUserInfo').on('touchend', function() {
    console.log(FS.isApp)
})

function setUserInfo(data) {
    console.log('setUserInfo', data);
}
FS.register(setUserInfo);

setInterval(function() {
    FS.setHtml({ type: 1, data: { userId: 123 } });
}, 3000)