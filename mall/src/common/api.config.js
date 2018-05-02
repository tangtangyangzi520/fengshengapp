import client from './utils/client'

// let API_LOCAL_BODY_TEST = 'http://tapi.fshtop.com/eb-api';
// let API_LOCAL_BODY_TEST = 'http://192.168.7.208:9081/eb-api';
let API_LOCAL_BODY_TEST = 'http://api.fshtop.com/eb-api'
let API_CMS = 'http://api.fshtop.com/cms-api/'
if (/http:\/\/t/.test(location.href)) {
    API_LOCAL_BODY_TEST = 'http://192.168.7.208:9081/eb-api'
    API_CMS = 'http://tcmsapi.fshtop.com/cms-api/'
} else if (/http:\/\/m/.test(location.href)) {
    API_LOCAL_BODY_TEST = 'http://api.fshtop.com/eb-api'
    API_CMS = 'http://api.fshtop.com/cms-api/'
} else {
    API_LOCAL_BODY_TEST = 'http://192.168.7.208:9081/eb-api'
    API_CMS = 'http://tcmsapi.fshtop.com/cms-api/'
}
//根据SPU的ID返回此商品的详情(包括多个SKU)
const API_GOODS_DETAILS = API_LOCAL_BODY_TEST + '/spu/getAppProductSpuById'

//根据SPU的ID获取详情页面视频和图片
const API_GOODS_VIDEO = API_LOCAL_BODY_TEST + '/spu/getDetailsBySpuId'

//根据SPU的ID返回此商品的消保详情
const API_GOODS_GUARANTEE_DETAILS = API_LOCAL_BODY_TEST + '/spu/getProductInsuranceBySpuId'

//获取优惠券列表(商品详情页)
const API_GOODS_GETCOUPON = API_LOCAL_BODY_TEST + '/mkt/getCouponBySpuId'

//领取优惠券列表
const API_RECEIVE_COUPON = API_LOCAL_BODY_TEST + '/mkt/createCoupon'

//列出商品相关的评论
const API_GOODS_ALL_COMMENT = API_LOCAL_BODY_TEST + '/oic/getOrderItemCommentBySpuid'

//会员相关的评论
const API_MEMBER_ALL_COMMENT = API_LOCAL_BODY_TEST + '/oic/getOrderItemCommentByMemberId'

//加入购物车
const API_GOODS_CREATE_CART = API_LOCAL_BODY_TEST + '/orc/createOrderCart'

//批量加入购物车
const API_GOODS_CREATE_CART_LIST = API_LOCAL_BODY_TEST + '/orc/createOrderCartList'

//删除购物车(单个商品)
const API_GOODS_DELETE_CART = API_LOCAL_BODY_TEST + '/orc/deleteOrderCart'

//删除购物车(多个商品)
const API_GOODS_DELETE_CART_LIST = API_LOCAL_BODY_TEST + '/orc/deleteOrderCartList'

//获取购物车列表
const API_GOODS_CART_LIST = API_LOCAL_BODY_TEST + '/orc/getOrderCartByMemberId'

//编辑购物车
const API_GOODS_EDIT_CART = API_LOCAL_BODY_TEST + '/orc/editOrderCart'

//获取优惠券列表（购物车页面）
const API_GOODS_CART_COUPON = API_LOCAL_BODY_TEST + '/mkt/getMktCampaignRespList'

//根据spuId获取SKU信息
const API_GOODS_GET_SKU = API_LOCAL_BODY_TEST + '/spu/getSkuBySpuId'

//计算运费
const API_GOODS_GET_FREIGHT = API_LOCAL_BODY_TEST + '/pc/getTotalCarriage'

//获取地址列表
const API_GOODS_GET_ADDRESS_LIST = API_LOCAL_BODY_TEST + '/ma/getMemberAddressByMemberId'

//下订单
const API_GOODS_CREATE_ORDER = API_LOCAL_BODY_TEST + '/order/createOrder'

//实名验证列表
const API_REAL_NAME_LIST = API_LOCAL_BODY_TEST + '/mrn/list'

//新增实名验证
const API_ADD_REAL_NAME = API_LOCAL_BODY_TEST + '/mrn/createMemberRealName'

//订单列表
const API_ORDER_LIST = API_LOCAL_BODY_TEST + '/order/list'
    //再次购买
const API_ORDER_BUY_AGAIN = API_LOCAL_BODY_TEST + '/order/buyAgainOrderSub'
const API_ORDERS_BUY_AGAIN = API_LOCAL_BODY_TEST + '/order/buyAgainOrderSet'
    //订单详情
const API_SUB_ORDER_DETAIL_BY_ID = API_LOCAL_BODY_TEST + '/order/getByOrderSubId'
const API_ORDERS_DETAIL_BY_ID = API_LOCAL_BODY_TEST + '/order/getByOrderSetId'
    //取消订单
const API_ORDER_CANCEL = API_LOCAL_BODY_TEST + '/order/cancelOrderSet'
    //删除订单
const API_ORDER_DELETE = API_LOCAL_BODY_TEST + '/order/hideOrderSubList'
    //确认收货
const API_SUB_ORDER_RECEVIEW = API_LOCAL_BODY_TEST + '/order/receiveOrderSub'
    //延长收货
const API_EXTEND_RECEVIER_TIME = API_LOCAL_BODY_TEST + '/order/extendDefaultRecevierTime'
    //订单限时折扣
const API_GOODS_TOTAL_DISCOUNT = API_LOCAL_BODY_TEST + '/mkt/getTotalDiscount'

//发表商品评价
const API_GOODS_CREATE_COMMENT = API_LOCAL_BODY_TEST + '/oic/createOrderItemComment'

//物流信息
const API_GOODS_LOGISTICS = API_LOCAL_BODY_TEST + '/odd/getByOrderSubId'


//图片上传
const API_IMAGE_UPLOAD = 'http://prevideo.fshtop.com/common/1.0.0/upload/base64file'

//删除收货地址
const API_GOODS_DELETE_ADDRESS_LIST = API_LOCAL_BODY_TEST + '/ma/deleteMemberAddress'

//新增收货地址
const API_GOODS_CREAT_ADDRESS_LIST = API_LOCAL_BODY_TEST + '/ma/createMemberAddress'

//编辑收货地址
const API_GOODS_EDIT_ADDRESS_LIST = API_LOCAL_BODY_TEST + '/ma/editMemberAddress'
    //获取收货地址
const API_GOODS_OBTAIN_ADDRESS_LIST = API_LOCAL_BODY_TEST + '/ma/get'
    //所有地区查询
const API_GOODS_AREA_ADDRESS_LIST = API_LOCAL_BODY_TEST + '/area/areaList'

//省份查询
const API_GOODS_PROVINCE_ADDRESS_LIST = API_LOCAL_BODY_TEST + '/area/provinceList'
    //市区查询
const API_GOODS_CITY_ADDRESS_LIST = API_LOCAL_BODY_TEST + '/area/cityOrDistrictList'

//推荐
const API_GOODS_RECOMMEND = API_CMS + 'recommemd/1.0.0/relateSpu'

//推荐无spuId
const API_GOODS_RECOMMEND_DEFAULT = API_CMS + 'goods/2.0.0/getContentListFence'

//收藏
const API_GOODS_COLLECT = API_CMS + 'collect/1.0.0/collectSpus'
//首页
const API_GOODS_INDEX = API_CMS + 'goods/2.0.0/getFence'
//首页banne
const API_GOODS_BANNER= API_CMS + 'goods/2.0.0/getBannerByColumn'
//首页数据导航
const API_GOODS_CHILDREN= API_CMS + 'fence/2.0.0/getChildrenFenceByFence'
//首页数据流
const API_GOODS_FLOW= API_CMS + 'goods/2.0.0/getContentListFence'

//查询商品是否被收藏
const API_GOODS_COLLECT_STATE = API_CMS + 'behavior/1.0.0/spuBehaviorStatus'

//获取待付款订单的结束时间
const API_ORDER_CANCEL_TIME = API_LOCAL_BODY_TEST + '/systemSetting/getOrderCancelTime'

//下单前校验商品的状态与信息
const API_ORDER_CHECK_SKU = API_LOCAL_BODY_TEST + '/order/checkSku'

//绑定礼品卡
const API_GIFT_CARD_BIND = API_LOCAL_BODY_TEST + '/giftCard/bind'

//礼品卡消费记录
const API_GIFT_CARD_RECORD = API_LOCAL_BODY_TEST + '/giftCard/consumeLog'

//礼品卡列表
const API_GIFT_CARD_LSIT = API_LOCAL_BODY_TEST + '/giftCard/list'

export default {
    API_GOODS_DETAILS,
    API_GOODS_VIDEO,
    API_GOODS_GUARANTEE_DETAILS,
    API_GOODS_GETCOUPON,
    API_RECEIVE_COUPON,
    API_GOODS_ALL_COMMENT,
    API_MEMBER_ALL_COMMENT,
    API_GOODS_CREATE_CART,
    API_GOODS_CREATE_CART_LIST,
    API_GOODS_DELETE_CART,
    API_GOODS_DELETE_CART_LIST,
    API_GOODS_CART_LIST,
    API_GOODS_EDIT_CART,
    API_GOODS_CART_COUPON,
    API_GOODS_GET_SKU,
    API_GOODS_GET_FREIGHT,
    API_GOODS_GET_ADDRESS_LIST,
    API_GOODS_CREATE_ORDER,
    API_ORDER_LIST,
    API_REAL_NAME_LIST,
    API_ADD_REAL_NAME,
    API_IMAGE_UPLOAD,
    API_GOODS_CREATE_COMMENT,
    API_GOODS_TOTAL_DISCOUNT,
    API_GOODS_LOGISTICS,
    API_ORDER_BUY_AGAIN,
    API_ORDER_CANCEL,
    API_SUB_ORDER_DETAIL_BY_ID,
    API_ORDERS_DETAIL_BY_ID,
    API_ORDERS_BUY_AGAIN,
    API_ORDER_DELETE,
    API_SUB_ORDER_RECEVIEW,
    API_GOODS_DELETE_ADDRESS_LIST,
    API_GOODS_CREAT_ADDRESS_LIST,
    API_GOODS_PROVINCE_ADDRESS_LIST,
    API_GOODS_CITY_ADDRESS_LIST,
    API_EXTEND_RECEVIER_TIME,
    API_GOODS_EDIT_ADDRESS_LIST,
    API_GOODS_OBTAIN_ADDRESS_LIST,
    API_GOODS_AREA_ADDRESS_LIST,
    API_GOODS_RECOMMEND,
    API_GOODS_RECOMMEND_DEFAULT,
    API_GOODS_COLLECT,
    API_GOODS_COLLECT_STATE,
    API_ORDER_CANCEL_TIME,
    API_ORDER_CHECK_SKU,
    API_GOODS_INDEX,
    API_GOODS_BANNER,
    API_GOODS_CHILDREN,
    API_GOODS_FLOW,
    API_GIFT_CARD_BIND,
    API_GIFT_CARD_RECORD,
    API_GIFT_CARD_LSIT


}


// 商品编码:SPU  921631524653260993
// 商品编码:SPU  921631524653260927
// 商品编码:SPU  921631524653261033
// 商品编码:SPU  921631524653260827