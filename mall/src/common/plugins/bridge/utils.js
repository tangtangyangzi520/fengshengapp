var root = window
var ua = navigator.userAgent.toLowerCase()
const getQueryString = function(name) {
    let reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i')
    let r = root.location.search.substr(1).match(reg)
    if (r != null) return r[2]
    return null
}

const isApp = /fstop/.test(ua) || getQueryString('device') ? true : false
const isIos = !!ua.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/i)

module.exports = {
    isApp,
    isIos,
    getQueryString,
}