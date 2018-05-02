import Vue from 'vue'
import Router from 'vue-router'

//商品详情
import Home from '@/modules/detail/index'
import Detail from '@/modules/detail/detail'
import Comment from '@/modules/detail/comment'
import Introduce from '@/modules/detail/introduce'
import Index from '@/modules/index/index'

//购物车
import Car from '@/modules/car/index'
import Similar from '@/modules/car/similar'

// 订单
import PayType from '@/modules/order/payType'
import PayResult from '@/modules/order/payResult'
import Invoice from '@/modules/order/invoice'
import OrderIndex from '@/modules/order/index'
import FillInOrder from '@/modules/order/fillInOrder'
import OrderCoupon from '@/modules/order/orderCoupon'
import OrderAddress from '@/modules/order/orderAddress'
import OrderList from '@/modules/order/orderList'
import OrderDetail from '@/modules/order/orderDetail'
import GetGoods from '@/modules/order/getGoods'
import ViewEvaluation from '@/modules/order/viewEvaluation'
import SuccessEvaluation from '@/modules/order/successEvaluation'
import GoodsEvaluation from '@/modules/order/goodsEvaluation'
import ViewFlow from '@/modules/order/viewFlow'
import SubOrderLogistics from '@/modules/order/subOrderLogistics'
//优惠券
import CouponIndex from '@/modules/coupon/index'

//我的地址管理
import AddressManage from '@/modules/user/addressManage'
import IncreaseAddress from '@/modules/user/increaseAddress'

//礼品卡
import GiftCard from "@/modules/giftCard/index";
import AddGiftCard from "@/modules/giftCard/addCard";

//申请售后
import Service from "@/modules/service/index";
import serviceApply from "@/modules/service/serviceApply";
import serviceDetail from "@/modules/service/serviceDetail";


Vue.use(Router)

export default new Router({
    routes: [{
        path: '/', //商品详情页面
        name: 'Home',
        component: Home,
        children: [{
                path: '/detail/:spuId',
                name: 'Detail',
                component: Detail
            },
            {
                path: '/comment/:spuId',
                name: 'Comment',
                component: Comment
            },
            {
                path: '/introduce/:spuId',
                name: 'Introduce',
                component: Introduce,
            }
        ]
    }, {
        path: '/car', //购物车首页
        name: 'Car',
        component: Car
    }, {
        path: '/similar/:spuId/:skuId', //查看相似页面
        name: 'Similar',
        component: Similar
    }, {
        path: '/payType/:orderId', //支付类型
        name: 'payType',
        component: PayType
    }, {
        path: '/payResult/:orderId/:state', //支付结果
        name: 'payResult',
        component: PayResult
    }, {
        path: '/invoice', //选择发票
        name: 'invoice',
        component: Invoice
    }, {
        path: '/orderIndex',
        name: 'orderIndex',
        component: OrderIndex
    }, {
        path: '/fillInOrder', //填写订单
        name: 'fillInOrder',
        component: FillInOrder
    }, {
        path: '/orderCoupon', //填写订单--使用优惠券
        name: 'orderCoupon',
        component: OrderCoupon
    }, {
        path: '/orderAddress', //填写订单--选择收货地址
        name: 'orderAddress',
        component: OrderAddress
    }, {
        path: '/couponIndex/:state',
        name: 'couponIndex',
        component: CouponIndex
    }, {
        path: '/orderList/:state',
        name: 'orderList',
        component: OrderList
    }, {
        // type 子订单:1,组合订单2
        path: '/orderDetail/:type/:orderId',
        name: 'orderDetail',
        component: OrderDetail
    }, {
        path: '/successEvaluation',
        name: 'successEvaluation',
        component: SuccessEvaluation
    }, {
        path: '/getGoods/:orderId', //确认收货
        name: 'getGoods',
        component: GetGoods
    }, {
        path: '/viewEvaluation',
        name: 'viewEvaluation',
        component: ViewEvaluation
    }, {
        path: '/goodsEvaluation/:orderId',
        name: 'goodsEvaluation',
        component: GoodsEvaluation
    }, {
        path: '/viewFlow/:ordOrderId',
        name: 'viewFlow',
        component: ViewFlow
    }, {
        path: '/logistics/:orderId',
        name: 'logistics',
        component: SubOrderLogistics
    }, {
        path: '/addressManage',
        name: 'addressManage',
        component: AddressManage
    }, {
        path: '/increaseAddress/:id',
        name: 'increaseAddress',
        component: IncreaseAddress
    }, {
        path: '/giftCard',
        name: 'giftCard',
        component: GiftCard
    }, {
        path: '/addCard',
        name: 'addCard',
        component: AddGiftCard
    }, {
        path: '/index',
        name: 'index',
        component: Index
    }, {
        path: '/service',
        name: 'Service',
        component: Service
    }, {
        path: '/serviceApply',
        name: 'serviceApply',
        component: serviceApply
    }, {
        path: '/serviceDetail',
        name: 'serviceDetail',
        component: serviceDetail
    }]
})