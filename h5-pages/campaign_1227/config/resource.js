// 公共图片
let imgs1 = [
    require('../images/bg_ball_a.png'),
    require('../images/bg_ball_b.png'),
    require('../images/bg_ball_c.png'),
    require('../images/bg_ball_d.png'),
    require('../images/bg_ball_e.png'),
    require('../images/bg_ball_f.png'),
    require('../images/bg_ball_g.png'),
    require('../images/bg_ball_h.png'),
    require('../images/bg_ball_i.png'),
    require('../images/bg_ball_j.png'),
    require('../images/bg_ball_k.png'),
    require('../images/bg_ball_l.png'),
    require('../images/bg_ball_m.png'),
    require('../images/bg_ball_n.png'),
    require('../images/bg_ball_o.png'),
    require('../images/bg_pgone_one.png'),
    require('../images/bg_pgone_three.png'),
    require('../images/bg_pgone_two.png'),
    require('../images/btn_home_videoplay_normal.png'),
    require('../images/cn_enter_gongzonghao.png'),
    require('../images/cn_enter_shangpin.png'),
    require('../images/cn_enter_shipin.png'),
    require('../images/cn_gzh_ceduoduo.png'),
    require('../images/cn_gzh_fengshengbang.png'),
    require('../images/cn_gzh_nvsheng.png'),
    require('../images/cn_gzh_qingdan.png'),
    require('../images/cn_gzh_wulvji.png'),
    require('../images/cn_gzh_yuer.png'),
    require('../images/ic_60_back.png'),
    require('../images/icon-pause.png'),
    require('../images/icon-play.png'),
    require('../images/logo_guoxinsuo.png'),
    require('../images/logo_hongkang.png'),
    require('../images/logo_lvmama.png'),
    require('../images/logo_meinian.png'),
    require('../images/logo_one.png'),
    require('../images/logo_ronghui.png'),
    require('../images/logo_tuniu.png'),
    require('../images/logo_zbyinhang.png'),
    require('../images/logo_zongbang.png'),
    require('../images/pic_gzh_ceduoduo.png'),
    require('../images/pic_gzh_fengshengbang.png'),
    require('../images/pic_gzh_nvsheng.png'),
    require('../images/pic_gzh_qingdan.png'),
    require('../images/pic_gzh_wulbji.png'),
    require('../images/pic_gzh_yuer.png'),
    require('../images/pic_product_1a.png'),
    require('../images/pic_product_1b.png'),
    require('../images/pic_product_1c.png'),
    require('../images/pic_product_2a.png'),
    require('../images/pic_product_2b.png'),
    require('../images/pic_product_2c.png'),
    require('../images/pic_product_3a.png'),
    require('../images/pic_product_4a.png'),
    require('../images/pic_product_4b.png'),
    require('../images/pic_product_4c.png'),
    require('../images/pic_product_5a.png'),
    require('../images/pic_product_5b.png'),
    require('../images/pic_product_5c.png'),
    require('../images/pic_product_6a.png'),
    require('../images/pic_product_6b.png'),
    require('../images/pic_product_6c.png'),
    require('../images/pic_shangpin_five.png'),
    require('../images/pic_shangpin_four.png'),
    require('../images/pic_shangpin_one.png'),
    require('../images/pic_shangpin_six.png'),
    require('../images/pic_shangpin_three.png'),
    require('../images/pic_shangpin_two.png'),
    require('../images/pic_wechat.png'),
    require('../images/title_enter_gongzonghao.png'),
    require('../images/title_enter_shangpin.png'),
    require('../images/title_enter_shipin.png'),
    require('../images/title_fengshengbang.png'),
    require('../images/title_gzh_ceduoduo.png'),
    require('../images/title_gzh_fengshengbang.png'),
    require('../images/title_gzh_nvhseng.png'),
    require('../images/title_gzh_qindan.png'),
    require('../images/title_gzh_wulvji.png'),
    require('../images/title_gzh_yuer.png'),
    require('../images/title_jieshao.png'),
    require('../images/title_logo_fsb.png'),
    require('../images/title_shipin_one.png'),
    require('../images/title_shipin_three.png'),
    require('../images/title_shipin_two.png'),
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