// 公共图片
let imgs1 = [
    require('../images/icon-pause.png'),
    require('../images/icon-play.png'),
]
let commonImgs = {};
imgs1.forEach((item, index) => {
        commonImgs['img' + index] = item;
    })
    // 加载页面
let imgs2 = [

]
let loadingImgs = {};
imgs2.forEach((item, index) => {
    loadingImgs['aimg' + index] = item;
})

const res = {
    loading: {
        ...loadingImgs
    },
    common: {
        ...commonImgs
    },
    preload: {}
};
console.log(res);
export default res;