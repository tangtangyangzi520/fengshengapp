<template>
    <div class="cart" v-if="showPage">
        <!-- <div style="margin: 20px;">
            <span style="border:1px solid #f93888;width: 100px;height:30px;font-size: 20px;" @click="editCartList">编辑</span>
            <span style="border:1px solid #f93888;width: 100px;height:30px;font-size: 20px;" @click="editCartList">完成</span>
        </div> -->
        <div class="login-wrapper" v-if="noLogin">
            <p>登录后可保存购物车中所有商品<a class="btn-active" @click="goToLogin">登录</a></p>
        </div>
        <div class="reducedPrice" v-show="reduceShow&&!noGoods&&false">
            <p>购物车中有2件商品已降价，快去看看</p>
            <div class="close-tips" @click="reduceClose"><img src="../../assets/x_normal@2x.png" /></div>
        </div>
        <div class="cart-ls" v-if="goodsList&&goodsList.length!=0&&!noGoods">
            <!-- 商品所属商城名称显示 -->
            <div class="cart-shop" v-if="!(goodsList.length==invalidGoodData.length)">
                <div class="check-wrapper-all">
                    <span :class="{'check-wrapper-ls-item-selected':isCheckAll,'check-wrapper-ls-item':!isCheckAll}" @click="chooseLsAll"></span>
                </div>
                <div class="shop-name">
                    <div class="shop-name-t">
                        丰盛榜健康商城
                        <!-- <span>自营</span> -->
                        <badge text="自营"></badge>
                    </div>
                    <div class="coupon-t" @click="openCouponPopup" v-if="!noLogin&&!isEdit">优惠券</div>
                    <div class="coupon-t no-freight" v-if="!noLogin&&freeFreightBool">已免运费</div>
                </div>
            </div>
            <!-- 优惠券优惠显示 -->
            <div class="coupon-tips" v-if="false">
                <div class="coupon-tips-left">
                    <span>优惠券抵减</span>
                    <span>【已够满180，再购19元可使用优惠券减30元】</span>
                </div>
                <div class="coupon-tips-right">
                    <span>去凑单></span>
                </div>
            </div>
            <!-- 购物车列表 -->
            <div class="ls-item-all">
                <div class="ls-item" v-for="(item,index) in goodsList" v-if="item.spuShelvesStatus==1&&item.skuShowNum!=0">
                    <div class="check-wrapper-ls">
                        <span :class="{'check-wrapper-ls-item-selected':item.active,'check-wrapper-ls-item':!item.active}" @click="chooseLsItem(item,index)"></span>
                    </div>
                    <div class="ls-item-con">
                        <div class="ls-item-con-l" @click="gtToGoodsDetail(item.skuSpuId)">
                            <img :src="item.spuPic" />
                        </div>
                        <div class="ls-item-con-r" v-show="!isEdit" @click="gtToGoodsDetail(item.skuSpuId)">
                            <p class="ls-item-con-r-name">{{item.spuName}}</p>
                            <p class="ls-item-con-r-chosen">
                                <span>已选：{{item.skuName}}</span>
                                <span>x{{item.orcNumber}}</span>
                            </p>
                            <p class="ls-item-con-r-price">
                                <span>￥{{item.skuPromotionPrice}}</span>
                                <span v-if="item.skuPromotionPrice!=item.skuSalePrice">￥{{item.skuSalePrice}}</span>
                                <span v-if="item.skuPromotionPrice==item.skuSalePrice&&item.skuSalePrice!=item.skuMarketSalePrice&&item.skuMarketSalePrice!=0">￥{{item.skuMarketSalePrice}}</span>
                                <!-- <span>购1件立减40元</span> -->
                            </p>
                        </div>
                        <!-- 编辑 -->
                        <div class="ls-item-con-r" v-show="isEdit">
                            <p class="ls-item-con-r-name-edit">{{item.spuName}}</p>
                            <p class="ls-item-con-r-chosen-edit" @click="getGoodsSKU(item.skuSpuId,item.orcSkuId,item.skuName,item.spuPic,item.orcNumber,item.skuShowNum)">
                                <span>已选：{{item.skuName}}</span>
                            </p>
                            <p class="ls-item-con-r-price-edit">
                                <group>
                                    <x-number :title="'￥'+item.skuSalePrice" :min="1" :max="item.skuShowNum" :value="item.orcNumber" fillable @on-change="(value)=>{changeOrcNumber(value,item.orcNumber,item.orcSkuId)}"></x-number>
                                </group>
                            </p>
                        </div>
                    </div>
                </div>
                <div class="InsufficientStock" v-show="insufficientStock">
                    <p>商品库存不足，已为您调整购物车中的数量</p>
                </div>
            </div>
            <!-- 显示失效商品列表 -->
            <div class="invalid-ls" v-if="invalidList.length!=0">
                <div class="invalid-ls-title">
                    <span>已失效商品</span>
                </div>
                <div class="in-ls-wrapper" v-for="(item,index) in invalidGoodData">
                    <swipeout>
                        <swipeout-item>
                            <div slot="right-menu">
                                <swipeout-button type="primary" background-color="#f3f3f3" class="in-collect" @click.native="collectGoods(item.skuSpuId)">收藏</swipeout-button>
                                <swipeout-button type="warn" background-color="#f93473" class="in-delete" @click.native="deteleLapsedGoods(item.orcId,item.orcSkuId)">删除</swipeout-button>
                            </div>
                            <div slot="content" class="invalid-ls-item">
                                <div class="in-ls-item-left" @click="gtToGoodsDetail(item.skuSpuId)">
                                    <div class="in-ls-item-left-icon">
                                        <span>失效</span>
                                    </div>
                                    <div class="in-ls-item-left-pic">
                                        <img :src="item.spuPic" />
                                    </div>
                                    <div class="in-ls-item-left-state">
                                        <p>{{item.spuName}}</p>
                                        <p v-if="item.spuShelvesStatus==0">宝贝已下架</p>
                                        <p v-else>宝贝已失效</p>
                                    </div>
                                </div>
                                <div class="in-ls-item-right">
                                    <p>￥{{item.skuSalePrice}}</p>
                                    <a class="btn-active" @click="goPage(item.skuSpuId,item.orcSkuId)">找相似</a>
                                </div>
                            </div>
                        </swipeout-item>
                    </swipeout>
                </div>
                <div class="clear-all-ls">
                    <span class="btn-active" @click="deteleInvalidAllGoods">清空失效宝贝</span>
                </div>
            </div>
            <!-- 更多商品推荐列表 -->
            <div class="recommend" v-if="!isEdit">
                <div class="rec-ls" v-for="item in noRepeatObjectData">
                    <div class="rec-ls-title">
                        <img :src="item.spuPic" />
                        <span>看了该商品的人还买了</span>
                    </div>
                    <div class="rec-ls-con">
                        <recommended-list :recommendData="item.recommendListData" :dataFromPage="'Car-hasGood'"></recommended-list>
                    </div>
                </div>
            </div>
        </div>

        <div class="nothing-wrapper" v-if="noGoods">
            <div class="nothing-img">
                <img src="../../assets/shopping_cart_normal@2x.png" />
            </div>
            <div class="nothing-con">
                <p>您的购物车什么都没有喔~ </p>
                <p>赶紧去加点什么吧</p>
            </div>
            <div class="nothing-action">
                <a class="btn-active" @click="goHome">去逛逛</a>
            </div>
        </div>
        <div class="introduce" v-show="noGoods" v-if="recommendListData&&recommendListData.length!=0">
            <div class="introduce-title">
                <h3>为您推荐</h3>
            </div>
            <div class="introduce-con">
                <recommended-list :recommendData="recommendListData"></recommended-list>
            </div>
        </div>

        <!-- 底部购物车按钮及价格显示 -->
        <transition name="fade-in">
            <template  v-if="showBottomBtn">
            <div class="cart-menu" v-if="!noGoods">
                <div class="cart-menu-left">
                    <div class="cart-menu-left-all">
                        <span :class="{'check-wrapper-ls-item-selected':isCheckAll,'check-wrapper-ls-item':!isCheckAll}" @click="chooseLsAll"></span>
                        <span @click="chooseLsAll">全选</span>
                    </div>
                    <div class="cart-menu-left-sum" v-show="!isEdit">
                        <span>合计：<span>￥{{Math.abs(totalPrice).toFixed(2)}}</span></span></br>
                        <span>(总额：￥{{Math.abs(sumPrice).toFixed(2)}}，立减￥{{Math.abs((sumPrice - totalPrice)).toFixed(2)}})</span>
                    </div>
                </div>
                <div class="cart-menu-action">
                    <a class="cart-menu-action-collect" v-show="isEdit" @click="collectGoodsList">移入收藏夹</a>
                    <a class="cart-menu-action-delete" v-show="isEdit" @click="deleteCartListItem">删除</a>
                    <a class="cart-menu-action-settlement" v-show="!isEdit" @click="goToPay">结算({{chooseQuantity}})</a>
                </div>
            </div>
            </template>
        </transition>
        <!-- 优惠券弹窗 -->
        <div v-transfer-dom>
            <popup v-model="showCouPon" style="background-color: #fbfbfb;opacity:1;" height="70%">
                <div class="car-cp-re">
                    <div class="car-cp-re-title">
                        <h3>可领优惠券</h3>
                        <div @click="openCouponPopup"></div>
                    </div>
                    <div class="car-cp-re-con" v-if="reviceCouponList">
                        <div class="car-cp-re-con-no" v-show="reviceCouponList.length==0">
                            <div class="car-cp-re-con-no-img"><img src="../../assets/nocoupon_normal@2x.png" /></div>
                            <div class="car-cp-re-con-no-word"><p>暂无可领的优惠券</p></div>
                        </div>
                        <div class="car-cp-re-con-has" v-show="reviceCouponList.length!=0">
                            <div v-for="item of reviceCouponList" :key="item.id" class="car-cp-re-con-has-con-list">
                                <div class="car-cp-re-con-has-list-left">
                                    <div class="car-cp-re-con-has-price">￥<span>{{item.mkcPrice}}</span></div>
                                    <div class="car-cp-re-con-has-satisfy">满{{item.mkcUsedCondition}}可用</div>
                                </div>
                                <div class="car-cp-re-con-has-list-right">
                                    <h4>{{item.mkcUsedType==0?'适用于指定商品':'适用于全店商品'}}</h4>
                                    <h6 v-if="item.mkcUsedType==0">商品：{{item.spuName}}</h6>
                                    <div :style="{'margin-top':item.mkcUsedType==0?'0.15rem':'0.3rem'}">
                                        <p>有效期：{{item.mktStart | dateFilter}}至{{item.mktEnd | dateFilter}}</p>
                                        <a class="car-cp-re-con-has-click-receive btn-active" v-if="!item.active" @click="getCoupon(item)">点击领取</a>
                                        <a class="car-cp-re-con-has-received" v-else>已领取</a>
                                    </div>
                                </div>
                            </div> 
                        </div>
                    </div>
                </div>
                <div class="car-cp-has">
                    <div class="car-cp-has-title">
                        <h3>可用优惠券<span>（以下是您账户里可用的优惠券）</span></h3>
                    </div>
                    <div class="car-cp-has-con">
                        <div class="car-cp-has-con-has">
                            <div v-for="item of hasCouponList" :key="item.id" class="car-cp-has-con-has-con-list">
                                <div class="car-cp-has-con-has-list-left">
                                    <div class="car-cp-has-con-has-price">￥<span>{{item.mkcPrice}}</span></div>
                                    <div class="car-cp-has-con-has-satisfy">满{{item.mkcUsedCondition}}可用</div>
                                </div>
                                <div class="car-cp-has-con-has-list-right">
                                    <h4>{{item.mkcUsedType==0?'适用于指定商品':'适用于全店商品'}}</h4>
                                    <h6 v-if="item.mkcUsedType==0">商品：{{item.spuName}}</h6>
                                    <div :style="{'margin-top':item.mkcUsedType==0?'0.15rem':'0.3rem'}">
                                        <p>有效期：{{item.mktStart | dateFilter}}至{{item.mktEnd | dateFilter}}</p>
                                    </div>
                                </div>
                            </div> 
                        </div>
                    </div>
                </div>
            </popup>
        </div>

        <!-- SKU弹出框 -->
        <div v-transfer-dom>
            <popup v-model="showCartSKU" v-if="SKUData" style="background-color: #fbfbfb;opacity:1;">
                <div class="cart-SKU-top">
                    <div class="cart-SKU-top-left">
                        <img :src="spuPic" />
                    </div>
                    <div class="cart-SKU-top-right">
                        <p class="cart-SKU-top-right-price">价格：￥{{SKUData[chosenIndex].skuSalePrice}}</p>
                        <p class="cart-SKU-top-right-chosen"><span>{{SKUSpecifications}}</span><span></span></p>
                    </div>
                    <div class="cart-SKU-top-close" @click="showCartSKU = !showCartSKU">
                        <img src="../../assets/close_normal@2x.png" />
                    </div>
                </div>
                <div class="cart-SKU-middle">
                    <div class="cart-SKU-middle-color">
                        <h3>规格</h3>
                        <div class="cart-SKU-middle-color-wrapper">
                            <checker radio-required default-item-class="cart-SKU-middle-color-item" selected-item-class="cart-SKU-middle-color-item-selected" disabled-item-class="cart-SKU-middle-color-item-disabled" v-model="SKUListChosen">
                                <checker-item v-for="(item,index) in SKUData" :disabled="item.skuShowNum==0?true:false" :value="item.skuName"  @on-item-click="onItemClick(index,item)">{{item.skuName}}</checker-item>
                            </checker>
                        </div>
                    </div>
                </div>
                <div class="cart-SKU-bottom">
                    <a class="cart-SKU-bottom-sure btn-active" @click="chooseSKUSure">确定</a>
                </div>
            </popup>
        </div>
        <div v-transfer-dom>
            <loading v-model="isLoading"></loading>
        </div>
    </div>
</template>

<script>
import { Previewer, TransferDom, Rater, CheckIcon, Swipeout, SwipeoutItem, SwipeoutButton, Popup, Group, XNumber, Checker, CheckerItem, Badge, Loading } from 'vux'
import RecommendedList from '../../components/RecommendedList/index'
import { mapState, mapActions } from 'vuex'
import client from '../../common/utils/client'
import apiConfig from '../../common/api.config'

export default {
    directives: {
        TransferDom
    },
    components: {
        Previewer,
        Rater,
        CheckIcon, Checker, CheckerItem,
        RecommendedList, Popup, Group, XNumber, Badge,
        Swipeout, SwipeoutItem, SwipeoutButton, RecommendedList, Loading
    },
    props: {
            
    },
    computed: {
        ...mapState({
            cartListChosen: state => state.cartListChosen,
        }),
    },
    data () {
        return {
            isCheckAll: true,
            reduceShow: true,
            isEdit: false,
            noGoods: true,
            firstCome: true,//仅仅用于首次进入页面后，全选
            showCartSKU: false,//SKU弹窗
            goodsList: null,//购物车列表
            noRepeatData: [],
            showCouPon: false,//展开优惠券列表弹窗
            reviceCouponList: null,//可领取优惠券列表
            hasCouponList: null,//已拥有优惠券列表
            carList: [],//用于传参
            chooseList: [],
            invalidList: [],
            invalidGoodData: [],
            SKUData: null,//用于存储并展示SKU信息
            chosenIndex: 0,
            SKUSpecifications: '',
            SKUListChosen: '',
            spuPic: null,//用于SKU图片展示
            chooseNewSkuId: null,//用于修改购物车
            oldSkuId: null,//用于修改购物车
            totalPrice: 0,//合计金额
            sumPrice: 0,//总计金额
            isLoading: true,
            skuStock: 1,//用于对比选择SKU的库存与用户已选择的商品数量，不用做传参
            currentItemNum: 0,
            chooseQuantity: 0,
            noLogin: false,
            skuPopunClickData: null,
            freeFreightBool: false,
            defaultProvince: null,
            noRepeatObjectData: [],
            recommendListData: [],
            showBottomBtn: false,
            showPage: false, //是否开始显示界面
            insufficientStock: false,//库存不足就显示
        }
    },
    filters: {
        dateFilter:function (input) {
            var d = new Date(input);
            var year = d.getFullYear();
            var month = (d.getMonth() + 1) < 10 ? '0' + (d.getMonth() + 1) : '' + (d.getMonth() + 1);
            var day = d.getDate() < 10 ? '0' + d.getDate() : '' + d.getDate();
            return year+ '.' + month + '.' + day;
        }
    },
    created() {
        this.$bridge.setTitle('购物车');
        this.$bridge.register('onTextBtnClick', (data) => {
            if (data.type == 4 && data.data.code == 1) {
                this.$bridge.showRightBtn({ 'name': '保存', 'code': 2 });
                this.$bridge.trackData({ id: '704002', title: '编辑' });
                this.editCartList();
            }
            if (data.type == 4 && data.data.code == 2) {
                this.$bridge.showRightBtn({ 'name': '编辑', 'code': 1 });
                this.$bridge.trackData({ id: '704007', title: '编辑-保存' });
                this.editCartList();
            }
        });
        this.$bridge.firstRead({ id: '704', title: '购物车页' });
        this.getCartList();
        console.log(this.cartListChosen)
    },
    watch: {
        defaultProvince:function(val,old) {
            this.getFreight();
        },
    },
    methods: {
        reduceClose() {
            this.reduceShow = !this.reduceShow;
        },
        goPage(spuId,skuId) {
            this.$bridge.trackData({ id: '704015', title: '点击找相似宝贝' });
            this.$router.push('/similar/'+spuId+"/"+skuId);
        },
        collectGoods(spuId) {
            this.$bridge.trackData({ id: '704009', title: '编辑-点击移入收藏夹' });
            let options = {"collectList": [{
                "enableStatus": 1,
                "spuId": spuId
                }
            ]};
            client.post(apiConfig.API_GOODS_COLLECT, options).then((data) => {
                if (data.code === 200) {
                    this.$vux.alert.show({
                        content: '收藏成功！',
                    });
                } else {
                    this_.$vux.toast.text(data.msg, 'middle');
                }
            }, (data) => {
                this_.$vux.toast.text(data.msg, 'middle');
            });
        },
        collectGoodsList() {
            this.$bridge.trackData({ id: '704009', title: '编辑-点击移入收藏夹' });
            if(this.chooseList.length == 0){
                this.$vux.toast.text('请选择要收藏的商品', 'middle');
            } else {
                let fetchArray = [];
                this.chooseList.forEach((val,index)=>{
                    fetchArray.push({"enableStatus": 1,"spuId": val.skuSpuId});
                });
                client.post(apiConfig.API_GOODS_COLLECT, {
                    "collectList": fetchArray
                }).then((data) => {
                    if (data.code === 200) {
                        this.$vux.alert.show({
                            content: '收藏成功！',
                        });
                    } else {
                        this.$vux.toast.text(data.msg, 'middle');
                    }
                }, (data) => {
                    this.$vux.toast.text(data.msg, 'middle');
                });
            }
        },
        goToPay() {
            let this_ = this;
            this.$bridge.trackData({ id: '704018', title: '点击结算' });
            if(this.chooseList.length == 0){
                this.$vux.toast.text('请选择要结算的商品', 'middle');
            } else {
                let fetchData = [];
                this.$store.commit('CART_LIST_CHOSEN', { "cartListChosen": this.chooseList });
                this.chooseList.forEach((val,index)=>{
                    fetchData.push({"ordSkuNum": val.orcNumber, "skuId": val.orcSkuId, "skuSalePrice": val.skuSalePrice, "skuDiscountPrice": val.skuPromotionPrice})
                });
                client.post(apiConfig.API_ORDER_CHECK_SKU,fetchData).then( (data) => {
                    if(data.code === 200){
                        if(data.data.length==0){
                            if(window.userInfo.authorization==""){
                                this.$bridge.showLogin();
                                this.$bridge.register('buyNowToLogin', (data) => {
                                    if (data.type == 2) {
                                        window.userInfo = data.data;
                                        // 登录完成通知网页
                                        let storage = JSON.parse(localStorage.getItem("cartInfo"));
                                        let newArrar = [];
                                        storage.forEach((val,index)=>{
                                            newArrar.push({
                                                "orcNumber": val.orcNumber,
                                                "orcSkuId": val.orcSkuId
                                            });
                                        });
                                        client.post(apiConfig.API_GOODS_CREATE_CART_LIST, newArrar).then((data) => {
                                            if (data.code === 200) {
                                                localStorage.removeItem('cartInfo');
                                                this_.$store.commit('CHOSEN_CART_LIST', { cartList: this.chooseList, totalPrice: this.totalPrice });
                                                this_.$store.commit('INVOICE_MESSAGE', {"invoiceMessage":null});
                                                this_.$store.commit('ORDER_FREIGHT', { "orderFreight": null });
                                                this_.$store.commit('CHOSEN_COUPON', {"chosenCoupon": null});
                                                this_.$store.commit('CHOSEN_DELIVERY_ADDRESS', {"chosenDeliveryAddress":null});
                                                this_.$router.push('/fillInOrder');
                                                this_.$store.commit('GIFT_CARD_CHOSEN', {"giftCardChosen": null, "totalBalance": null});
                                            } else {
                                                this_.$vux.toast.text(data.msg, 'middle');
                                            }
                                        }, (data) => {
                                            this_.$vux.toast.text(data.msg, 'middle');
                                        });
                                    }
                                })
                            }else{
                                this.$store.commit('CHOSEN_CART_LIST', { cartList: this.chooseList, totalPrice: this.totalPrice });
                                this.$store.commit('INVOICE_MESSAGE', {"invoiceMessage":null});
                                this.$store.commit('ORDER_FREIGHT', { "orderFreight": null });
                                this.$store.commit('CHOSEN_COUPON', {"chosenCoupon": null});
                                this.$store.commit('CHOSEN_DELIVERY_ADDRESS', {"chosenDeliveryAddress":null});
                                this.$router.push('/fillInOrder');
                                this_.$store.commit('GIFT_CARD_CHOSEN', {"giftCardChosen": null, "totalBalance": null});
                            }
                        } else {
                            let onlyPriceChange = true;
                            data.data.forEach((val,index)=>{
                                if(val.unableSale==1){
                                    onlyPriceChange=false;
                                    this.$vux.alert.show({
                                        content: '商品状态已发生变化，请重新确认订单',
                                        onHide () {
                                            location.reload();
                                        }
                                    });
                                }
                                this.chooseList.forEach((item,ind)=>{
                                    if(item.orcSkuId==val.skuId){
                                        if((item.promotionPrice==null&&val.skuSalePrice==val.skuDiscountPrice)||(item.promotionPrice==0&&val.skuSalePrice==val.skuDiscountPrice)){
                                            item.skuPromotionPrice = val.skuSalePrice;
                                        }else{
                                            item.skuPromotionPrice = val.skuDiscountPrice;
                                        }
                                        item.skuSalePrice = val.skuSalePrice;
                                    }
                                });
                            });
                            if(onlyPriceChange){
                                this.$store.commit('CHOSEN_CART_LIST', { cartList: this.chooseList, totalPrice: this.totalPrice });
                                this.$store.commit('INVOICE_MESSAGE', {"invoiceMessage":null});
                                this.$store.commit('ORDER_FREIGHT', { "orderFreight": null });
                                this.$store.commit('CHOSEN_COUPON', {"chosenCoupon": null});
                                this.$store.commit('CHOSEN_DELIVERY_ADDRESS', {"chosenDeliveryAddress":null});
                                this.$vux.toast.text('订单商品价格已发生变化，请重新确认订单', 'middle');
                                this.$router.push('/fillInOrder');
                            }
                            // this.$vux.alert.show({
                            //     content: '商品状态已发生变化，请重新确认订单',
                            //     onHide () {
                            //         // location.reload();
                            //         this_.firstCome=true;
                            //         this_.invalidList=[];
                            //         this_.invalidGoodData=[];
                            //         this_.sumPrice=0;
                            //         this_.totalPrice=0;
                            //         this_.chooseQuantity=0;
                            //         this_.getCartList();
                            //         location.reload()
                            //     }
                            // });
                        }
                    } else {
                        this.$vux.toast.text(data.msg, 'middle');
                    }
                }, (data)=>{
                    this.$vux.toast.text(data.msg, 'middle');
                });
            }
        },
        goToLogin() {
            let this_ = this;
            this.$bridge.showLogin();
            this.$bridge.register('btnClickToLogin', (data) => {
                if (data.type == 2) {
                    window.userInfo = data.data;
                    // 登录完成处理事件
                    //批量上传购物车商品
                    this.noLogin=!this.noLogin;
                    if(this.carList.length!=0){
                        let storage = JSON.parse(localStorage.getItem("cartInfo"));
                        let newArray = [];
                        storage.forEach((val,index)=>{
                            newArray.push({
                                "orcNumber": val.orcNumber,
                                "orcSkuId": val.orcSkuId
                            });
                        });
                        client.post(apiConfig.API_GOODS_CREATE_CART_LIST, newArray).then((data) => {
                            if (data.code === 200) {
                                localStorage.removeItem('cartInfo');
                                this_.firstCome=true;
                                this_.isCheckAll=true;
                                this_.chooseQuantity=0;
                                this_.isEdit=false;
                                this_.noRepeatData=[];
                                this_.carList=[];
                                this_.chooseList=[];
                                this_.invalidList=[];
                                this_.invalidGoodData=[];
                                this_.noRepeatObjectData=[];
                                this_.recommendListData=[];
                                this_.totalPrice=0;
                                this_.sumPrice=0;
                                this_.chosenIndex=0;
                                this_.getCartList();
                            } else {
                                this_.$vux.toast.text(data.msg, 'middle');
                            }
                        }, (data) => {
                            this_.$vux.toast.text(data.msg, 'middle');
                        });
                    }
                }
            })
        },
        gtToGoodsDetail(spuId) {
            this.$bridge.trackData({ id: '704011', title: '点击商品' });
            this.$store.commit('CART_LIST_CHOSEN', { "cartListChosen": this.chooseList });
            $('.cart-menu').hide();
            this.$router.push('/detail/'+spuId);
        },
        openCouponPopup() { //显示或隐藏优惠券列表弹窗
            this.showCouPon = !this.showCouPon;
            if(this.showCouPon){
                this.$bridge.trackData({ id: '704012', title: '点击优惠券列表' });
            }else{
                this.$bridge.trackData({ id: '704014', title: '关掉优惠券列表' });
            }
            this.getCouponList();
            setTimeout(()=>{
                $('.car-cp-re').add('.car-cp-has').on('touchmove',function(e){
                    e.stopPropagation();
                })
            },500)
        },
        getCoupon(item) { //领取优惠券
            this.$bridge.trackData({ id: '704013', title: '点击领取优惠券' });
            let options = {
                    "mkcBeginTime": this.getTimeDetail(item.mktStart),
                    "mkcCampaignId": item.mkcCampaignId,
                    "mkcChannel": 0,
                    "mkcEndTime": this.getTimeDetail(item.mktEnd)
                }
            client.post(apiConfig.API_RECEIVE_COUPON, options).then((data) => {
                if (data.code === 200) {
                    item.active = !item.active;
                    this.$vux.toast.text('成功领取' + item.mkcPrice + '元优惠券', 'middle');
                    this.$forceUpdate();
                } else {
                    this.$vux.toast.text(data.msg, 'middle');
                }
            }, (data) => {
                this.isLoading = false;
                this.$vux.toast.text(data.msg, 'middle');
            });
        },
        getDateStr(AddDayCount) {
            let dd = new Date();
            dd.setDate(dd.getDate() + AddDayCount); //获取AddDayCount天后的日期 
            let y = dd.getFullYear();
            let m = (dd.getMonth() + 1) < 10 ? '0' + (dd.getMonth() + 1) : '' + (dd.getMonth() + 1);
            let d = dd.getDate() < 10 ? '0' + dd.getDate() : '' + dd.getDate();
            let h = dd.getHours() < 10 ? '0' + dd.getHours() : '' + dd.getHours();
            let mo = dd.getMinutes() < 10 ? '0' + dd.getMinutes() : '' + dd.getMinutes();
            let s = dd.getSeconds() < 10 ? '0' + dd.getSeconds() : '' + dd.getSeconds();
            return y + "-" + m + "-" + d + " " + h + ":" + mo + ":" + s;
        },
        getTimeDetail(input) {
            let d = new Date(input);
            let year = d.getFullYear();
            let month = (d.getMonth() + 1) < 10 ? '0' + (d.getMonth() + 1) : '' + (d.getMonth() + 1);
            let day = d.getDate() < 10 ? '0' + d.getDate() : '' + d.getDate();
            let hour = d.getHours() < 10 ? '0' + d.getHours() : '' + d.getHours();
            let minute = d.getMinutes() < 10 ? '0' + d.getMinutes() : '' + d.getMinutes();
            let second = d.getSeconds() < 10 ? '0' + d.getSeconds() : '' + d.getSeconds();
            return year+'-'+month+'-'+''+day+' '+hour+":"+minute+":"+second;
        },
        chooseLsItem(item, index) {
            let array = [];
            item.active = !item.active;
            this.$forceUpdate();
            if(item.active){
                this.chooseList.push(item);
                if(this.chooseList.length + this.invalidList.length == this.goodsList.length){
                    this.isCheckAll = !this.isCheckAll;
                }
                this.totalPrice += item.skuPromotionPrice*item.orcNumber;
                if(item.skuPromotionPrice==item.skuSalePrice){
                    if(item.skuMarketSalePrice==0){
                        this.sumPrice += item.skuSalePrice*item.orcNumber;
                    }else{
                        this.sumPrice += item.skuMarketSalePrice*item.orcNumber;
                    }
                }else {
                    this.sumPrice += item.skuSalePrice*item.orcNumber;
                }
                this.chooseQuantity += item.orcNumber;
            } else {
                this.chooseList.forEach((val,index,arr)=>{
                    if(val.orcId != item.orcId){
                        array.push(val);
                    } 
                });
                if(this.chooseList.length + this.invalidList.length == this.goodsList.length){
                    this.isCheckAll = !this.isCheckAll;
                }
                this.chooseList = array;
                this.totalPrice -= item.skuPromotionPrice*item.orcNumber;
                if(item.skuPromotionPrice==item.skuSalePrice){
                    if(item.skuMarketSalePrice==0){
                        this.sumPrice -= item.skuSalePrice*item.orcNumber;
                    }else{
                        this.sumPrice -= item.skuMarketSalePrice*item.orcNumber;
                    }
                }else {
                    this.sumPrice -= item.skuSalePrice*item.orcNumber;
                }
                this.chooseQuantity -= item.orcNumber;
            }
            if(this.chooseList.length!=0){
                this.getFreight();
            } else {
                this.freeFreightBool=false;
            }
        },
        getGoodsSKU(spuId,skuId,skuName,spuPic,orcNumber,skuShowNum) {
            this.isLoading = true;
            this.$bridge.trackData({ id: '704003', title: '编辑-点击规格更换' });
            client.post(apiConfig.API_GOODS_GET_SKU+'?spuId=' + spuId,{}).then( (data) => {
                this.isLoading = false;
                if(data.code === 200){
                    this.spuPic = spuPic;
                    this.oldSkuId = skuId;
                    this.chooseNewSkuId = skuId;
                    this.currentItemNum = orcNumber;
                    this.showCartSKU = !this.showCartSKU;
                    this.skuStock = skuShowNum;
                    data.data.find((val,index)=>{
                        if(skuId == val.skuId){
                            this.chosenIndex = index;
                        }
                    });
                    this.SKUSpecifications = "已选“" + skuName + "”";
                    this.SKUListChosen = skuName;
                    this.SKUData = data.data;
                } else {
                    this.$vux.toast.text(data.msg, 'middle');
                }
            }, (data)=>{
                this.isLoading = false;
                this.$vux.toast.text(data.msg, 'middle');
            });
        },
        onItemClick(itemIndex, itemValue) {
            if(itemValue.skuShowNum == 0){
                this.$vux.toast.text('该规格的商品已售罄，请选择其它规格商品', 'middle');
                return;
            }
            this.chooseNewSkuId = itemValue.skuId;
            this.SKUSpecifications = "已选“" + itemValue.skuName + "”";
            this.chosenIndex = itemIndex;
            this.skuStock = itemValue.skuShowNum;
            this.skuPopunClickData = itemValue;
        },
        chooseSKUSure() {
            let this_ = this;
            if(this.oldSkuId == this.chooseNewSkuId){
                this.showCartSKU = !this.showCartSKU;
                return;
            }
            if(this.skuStock<this.currentItemNum){
                this.$vux.confirm.show({
                    title: '提示',
                    content: '商品库存不足，是否为您调整购物车中的数量？',
                    onShow() {
                        this_.$vux.confirm.setInputValue('好的')
                    },
                    onConfirm() {
                        this_.showCartSKU = !this_.showCartSKU;
                        let newArrToChange = [];
                        if(window.userInfo.authorization==""){
                            let storage = JSON.parse(localStorage.getItem("cartInfo"));
                            storage.forEach((val,index)=>{
                                if(val.orcSkuId == this_.oldSkuId){
                                    val.orcSkuId=this_.chooseNewSkuId;
                                    val.orcNumber = this_.skuStock;
                                    val.skuMarketSalePrice = this_.skuPopunClickData.skuMarketSalePrice;
                                    val.skuName = this_.skuPopunClickData.skuName;
                                    val.skuSalePrice = this_.skuPopunClickData.skuSalePrice;
                                    val.skuShowNum = this_.skuPopunClickData.skuShowNum;
                                    val.skuStopStatus = this_.skuPopunClickData.skuStopStatus;
                                }
                            });
                            localStorage.setItem("cartInfo",JSON.stringify(storage));
                            this_.getCartList();
                        }else{
                            this_.goodsList.forEach((val,index)=>{
                                if(val.orcSkuId == this_.oldSkuId){
                                    newArrToChange.push({"orcMemberId": 0, "orcNumber": this_.skuStock,"orcSkuId": this_.chooseNewSkuId});
                                } else {
                                    newArrToChange.push({"orcMemberId": 0, "orcNumber": val.orcNumber,"orcSkuId": val.orcSkuId});
                                }
                            });
                            client.postWithHeader(apiConfig.API_GOODS_EDIT_CART,JSON.stringify({
                                    "orcMemberId": 0,
                                    "requestList": newArrToChange
                                })).then( (data) => {
                                if(data.code === 200){
                                    this_.getCartList();
                                } else {
                                    this_.$vux.toast.text(data.msg, 'middle');
                                }
                            }, (data)=>{
                                this_.$vux.toast.text(data.msg, 'middle');
                            });
                        }
                    }
                })
            } else {
                let newArrToChange = [];
                if(window.userInfo.authorization==""){
                    let storage = JSON.parse(localStorage.getItem("cartInfo"));
                    storage.forEach((val,index)=>{
                        if(val.orcSkuId == this_.oldSkuId){
                            val.orcSkuId=this_.chooseNewSkuId;
                            val.skuMarketSalePrice = this_.skuPopunClickData.skuMarketSalePrice;
                            val.skuName = this_.skuPopunClickData.skuName;
                            val.skuSalePrice = this_.skuPopunClickData.skuSalePrice;
                            val.skuShowNum = this_.skuPopunClickData.skuShowNum;
                            val.skuStopStatus = this_.skuPopunClickData.skuStopStatus;
                        }
                    });
                    localStorage.setItem("cartInfo",JSON.stringify(storage));
                    this_.getCartList();
                }else{
                    this.goodsList.forEach((val,index)=>{
                        if(val.orcSkuId == this.oldSkuId){
                            newArrToChange.push({"orcMemberId": 0, "orcNumber": val.orcNumber,"orcSkuId": this.chooseNewSkuId});
                        } else {
                            newArrToChange.push({"orcMemberId": 0, "orcNumber": val.orcNumber,"orcSkuId": val.orcSkuId});
                        }
                    });
                    client.postWithHeader(apiConfig.API_GOODS_EDIT_CART,JSON.stringify({
                            "orcMemberId": 0,
                            "requestList": newArrToChange
                        })).then( (data) => {
                        if(data.code === 200){
                            this.showCartSKU = !this.showCartSKU;
                            this_.getCartList();
                        } else {
                            this_.$vux.toast.text(data.msg, 'middle');
                        }
                    }, (data)=>{
                        this_.$vux.toast.text(data.msg, 'middle');
                    });
                }

            }
        },
        changeOrcNumber(num,orcNumber,orcSkuId) {
            if(num == orcNumber){
                return;
            } else {
                if(window.userInfo.authorization==""){
                    let storage = JSON.parse(localStorage.getItem("cartInfo"));
                    storage.forEach((val,index)=>{
                        if(val.orcSkuId == orcSkuId){
                            val.orcNumber=num;
                        } else {
                            val.orcNumber=val.orcNumber;
                        }
                    });
                    localStorage.setItem("cartInfo",JSON.stringify(storage));
                    this.getCartList();
                }else{
                    let newArrToChange = [];
                    this.goodsList.forEach((val,index)=>{
                        if(val.orcSkuId == orcSkuId){
                            newArrToChange.push({"orcMemberId": 0, "orcNumber": num,"orcSkuId": val.orcSkuId});
                        } else {
                            newArrToChange.push({"orcMemberId": 0, "orcNumber": val.orcNumber,"orcSkuId": val.orcSkuId});
                        }
                    });
                    this.invalidList = [];
                    this.invalidGoodData=[];
                    client.postWithHeader(apiConfig.API_GOODS_EDIT_CART,JSON.stringify({
                            "orcMemberId": 0,
                            "requestList": newArrToChange
                        })).then( (data) => {
                        if(data.code === 200){
                            this.getCartList();
                        } else {
                            this.$vux.toast.text(data.msg, 'middle');
                        }
                    }, (data)=>{
                        this.$vux.toast.text(data.msg, 'middle');
                    });
                }
            }
        },
        deleteCartListItem() {
            this.$bridge.trackData({ id: '704010', title: '编辑-点击删除' });
            if(this.chooseList.length == 0){
                this.$vux.toast.text('请选择要删除的商品', 'middle');
            } else {
                let deteleArray = [];
                let this_ = this;
                this.$vux.confirm.show({
                    title: '',
                    content: '确认要删除已选择的商品吗？',
                    onConfirm () {
                        if(window.userInfo.authorization==""){
                            let storage = JSON.parse(localStorage.getItem("cartInfo"));
                            this_.chooseList.forEach((val,index)=>{
                                storage.forEach((item,ind)=>{
                                    if(val.orcSkuId!=item.orcSkuId){
                                        deteleArray.push(item);
                                    }
                                });
                            });
                            if(deteleArray.length==0){
                                localStorage.removeItem('cartInfo');
                                this_.$bridge.showRightBtn({ 'name': '', 'code': 1 })
                            }else{
                                localStorage.setItem("cartInfo",JSON.stringify(deteleArray));
                            }
                            this_.invalidList=[];
                            this_.invalidGoodData=[];
                            this_.getCartList();
                        }else{
                            this_.chooseList.forEach((val,index)=>{
                                deteleArray.push(val.orcId);
                            });
                            
                            client.postWithHeaderNoAuth(apiConfig.API_GOODS_DELETE_CART_LIST, JSON.stringify(deteleArray)).then( (data) => {
                                if(data.code === 200){
                                    this_.$vux.toast.text('删除成功', 'middle');
                                    deteleArray.forEach(item=>{
                                        let index = this_.goodsList.findIndex(sitem=>sitem.orcSkuId==item);
                                        this_.goodsList.splice(index,1);
                                    });
                                    this_.invalidList=[];
                                    this_.invalidGoodData=[];
                                    this_.getCartList();
                                } else {
                                    this_.$vux.toast.text(data.msg, 'middle');
                                }
                            }, (data)=>{
                                this_.$vux.toast.text(data.msg, 'middle');
                            });
                        }
                    }
                })
            }
        },
        deteleLapsedGoods(orcId,orcSkuId) {
            this.$bridge.trackData({ id: '704010', title: '编辑-点击删除' });
            let this_ = this;
            this.$vux.confirm.show({
                title: '',
                content: '确认要删除已选择的商品吗？',
                onConfirm () {
                    if(window.userInfo.authorization==""){
                        let deteleArray = [];
                        let storage = JSON.parse(localStorage.getItem("cartInfo"));
                        storage.forEach((item,ind)=>{
                            if(item.orcSkuId!=orcSkuId){
                                deteleArray.push(item);
                            }
                        });
                        if(deteleArray.length==0){
                            localStorage.removeItem('cartInfo');
                            this_.$bridge.showRightBtn({ 'name': '', 'code': 1 })
                        }else{
                            localStorage.setItem("cartInfo",JSON.stringify(deteleArray));
                        }
                        this_.$vux.toast.text('删除成功', 'middle');
                        this_.invalidList=[];
                        this_.invalidGoodData=[];
                        this_.firstCome=true;
                        this_.getCartList();
                    }else{
                        client.postWithHeaderNoAuth(apiConfig.API_GOODS_DELETE_CART+'?orcId='+orcId).then( (data) => {
                            if(data.code === 200){
                                this_.$vux.toast.text('删除成功', 'middle');
                                this_.invalidList=[];
                                this_.invalidGoodData=[];
                                this_.firstCome=true;
                                this_.getCartList();
                            } else {
                                this_.$vux.toast.text(data.msg, 'middle');
                            }
                        }, (data)=>{
                            this_.$vux.toast.text(data.msg, 'middle');
                        });
                    }
                }
            })
        },
        deteleInvalidAllGoods() {
            let this_ = this;
            this.$bridge.trackData({ id: '704016', title: '清空失效宝贝' });
            this.$vux.confirm.show({
                title: '',
                content: '确认要删除全部已失效的商品吗？',
                onConfirm () {
                    if(window.userInfo.authorization==""){
                        let newArray = [];
                        let storage = JSON.parse(localStorage.getItem("cartInfo"));
                        storage.forEach((item,ind)=>{
                            if(item.spuShelvesStatus!=1&&item.skuShowNum!=0){
                                newArray.push(item);
                            }
                        });
                        localStorage.setItem("cartInfo",JSON.stringify(newArray));
                        this_.invalidList=[];
                        this_.invalidGoodData=[];
                        this_.firstCome=true;
                        this_.$vux.toast.text('删除成功', 'middle');
                        this_.getCartList();
                    }else{
                        client.post(apiConfig.API_GOODS_DELETE_CART_LIST, this_.invalidList).then( (data) => {
                            if(data.code === 200){
                                this_.$vux.toast.text('删除成功', 'middle');
                                this_.invalidList=[];
                                this_.invalidGoodData=[];
                                this_.firstCome=true;
                                this_.getCartList();
                            } else {
                                this_.$vux.toast.text(data.msg, 'middle');
                            }
                        }, (data)=>{
                            this_.$vux.toast.text(data.msg, 'middle');
                        });
                    }
                }
            })
        },
        chooseLsAll() { //全选
            this.$bridge.trackData({ id: '704008', title: '编辑-点击全选' });
            this.isCheckAll = !this.isCheckAll;
            if(!this.isCheckAll){
                this.goodsList.forEach((val,index,arr) => {
                    if(val.spuShelvesStatus==1){
                        val.active = !val.active;
                        this.chooseList = [];
                        this.totalPrice -= val.skuPromotionPrice*val.orcNumber;
                        if(val.skuPromotionPrice==val.skuSalePrice){
                            if(val.skuMarketSalePrice==0){
                                this.sumPrice -= val.skuSalePrice*val.orcNumber;
                            }else{
                                this.sumPrice -= val.skuMarketSalePrice*val.orcNumber;
                            }
                        }else {
                            this.sumPrice -= val.skuSalePrice*val.orcNumber;
                        }
                        this.chooseQuantity -= val.orcNumber;
                    }
                });
                this.freeFreightBool=false;
            } else {
                this.goodsList.forEach((val,index,arr) => {
                    if(!val.active){
                        if(val.spuShelvesStatus==1){
                            val.active = !val.active;
                            this.chooseList.push(val);
                            this.totalPrice += val.skuPromotionPrice*val.orcNumber;
                            if(val.skuPromotionPrice==val.skuSalePrice){
                                if(val.skuMarketSalePrice==0){
                                    this.sumPrice += val.skuSalePrice*val.orcNumber;
                                }else{
                                    this.sumPrice += val.skuMarketSalePrice*val.orcNumber;
                                }
                            }else {
                                this.sumPrice += val.skuSalePrice*val.orcNumber;
                            }
                            this.chooseQuantity += val.orcNumber;
                        }
                    }
                });
                this.getFreight();
            }
            this.$forceUpdate();
        },
        getCartList() { //获取购物车信息
            if(window.userInfo.authorization==""){
                this.isLoading = false;
                let storage = localStorage.getItem("cartInfo");
                this.showPage = true;
                if(storage==""||storage==null){
                    this.noGoods = true;
                    this.$bridge.showRightBtn({ 'name': '', 'code': 1 });
                    this.noGoodsRecommend();
                } else {
                    storage = JSON.parse(storage);
                    this.noGoods = false;
                    this.goodsList = storage;
                    storage.forEach((val,index,arr) => {
                        if(val.spuShelvesStatus==1){
                            let obj = { "amount": val.skuSalePrice*val.orcNumber, "spuId": val.skuSpuId};
                            this.carList.push(obj);
                        } else {
                            this.invalidList.push(val.orcId);
                            this.invalidGoodData.push(val);
                        }
                        this.noRepeatData.push(JSON.stringify({"skuSpuId":val.skuSpuId,"spuPic":val.spuPic}));
                    });
                    this.noRepeatData = Array.from(new Set(this.noRepeatData));
                    if(this.invalidGoodData.length==this.goodsList.length){
                        this.isEdit=false;
                    }
                    if(this.firstCome){
                        this.$bridge.showRightBtn({ 'name': '编辑', 'code': 1 });
                        this.goodsRecommend();
                        storage.forEach((val,index,arr) => {
                            if(val.spuShelvesStatus==1){
                                if(this.cartListChosen==null||this.cartListChosen.length==0){
                                    val.active = true;
                                }else{
                                    this.cartListChosen.length == (storage.length-this.invalidList.length)?isCheckAll=true:isCheckAll=false;
                                    this.cartListChosen.forEach((item,index)=>{
                                        if(item.orcSkuId == val.orcSkuId){
                                            val.active = true;
                                            this.chooseList.push(val);
                                        }
                                    })
                                }
                            }
                        });
                        this.chooseList.forEach((val,index)=>{
                            if(val.active){
                                if(val.spuShelvesStatus==1){
                                    this.totalPrice += val.skuPromotionPrice*val.orcNumber;
                                    if(val.skuPromotionPrice==val.skuSalePrice){
                                        if(val.skuMarketSalePrice==0){
                                            this.sumPrice += val.skuSalePrice*val.orcNumber;
                                        }else{
                                            this.sumPrice += val.skuMarketSalePrice*val.orcNumber;
                                        }
                                    }else {
                                        this.sumPrice += val.skuSalePrice*val.orcNumber;
                                    }
                                    this.chooseQuantity += val.orcNumber;
                                }
                            } else {
                                if(val.spuShelvesStatus==1){
                                    this.totalPrice -= val.skuPromotionPrice*val.orcNumber;
                                    if(val.skuPromotionPrice==val.skuSalePrice){
                                        if(val.skuMarketSalePrice==0){
                                            this.sumPrice -= val.skuSalePrice*val.orcNumber;
                                        }else{
                                            this.sumPrice -= val.skuMarketSalePrice*val.orcNumber;
                                        }
                                    }else {
                                        this.sumPrice -= val.skuSalePrice*val.orcNumber;
                                    }
                                    this.chooseQuantity -= val.orcNumber;
                                }
                            }
                        });
                        this.firstCome = false;
                    }
                }
                this.noLogin=true;
            }else{
                this.$vux.loading.show();
                client.postWithHeader(apiConfig.API_GOODS_CART_LIST,{}).then( (data) => {
                    this.$vux.loading.hide();
                    this.isLoading = false;
                    this.showPage = true;
                    if(data.code === 200){
                        if(data.data.length == 0){
                            this.noGoods = true;
                            this.$bridge.showRightBtn({ 'name': '', 'code': 1 });
                            this.noGoodsRecommend();
                        } else {
                            this.noGoods = false;
                            this.goodsList = data.data;
                            data.data.forEach((val,index,arr) => {
                                if(val.spuShelvesStatus==1&&val.skuShowNum!=0){
                                    let obj = { "amount": val.skuSalePrice*val.orcNumber, "spuId": val.skuSpuId};
                                    this.carList.push(obj);
                                } else {
                                    this.invalidList.push(val.orcId);
                                    this.invalidGoodData.push(val);
                                }
                                this.noRepeatData.push(JSON.stringify({"skuSpuId":val.skuSpuId,"spuPic":val.spuPic}));
                            });
                            this.noRepeatData = Array.from(new Set(this.noRepeatData));
                            if(this.invalidGoodData.length==this.goodsList.length){
                                this.isEdit=false;
                            }
                            if(this.firstCome){
                                this.goodsRecommend();
                                this.getMemberAddress();
                                this.$bridge.showRightBtn({ 'name': '编辑', 'code': 1 });
                                this.goodsList.forEach((val,index,arr) => {
                                    if(val.spuShelvesStatus==1){
                                        if(this.cartListChosen==null||this.cartListChosen.length==0){
                                            val.active = true;
                                            this.chooseList.push(val);
                                        }else{
                                            this.cartListChosen.length == (this.noRepeatData.length-this.invalidList.length)?this.isCheckAll=true:this.isCheckAll=false;
                                            this.cartListChosen.forEach((item,index)=>{
                                                if(item.orcSkuId == val.orcSkuId){
                                                    val.active = true;
                                                    this.chooseList.push(val);
                                                }
                                            })
                                        }
                                    }
                                });
                                this.chooseList.forEach((val,index)=>{
                                    if(val.active){
                                        if(val.spuShelvesStatus==1&&val.skuShowNum!=0){
                                            this.totalPrice += val.skuPromotionPrice*val.orcNumber;
                                            if(val.skuPromotionPrice==val.skuSalePrice){
                                                if(val.skuMarketSalePrice==0){
                                                    this.sumPrice += val.skuSalePrice*val.orcNumber;
                                                }else{
                                                    this.sumPrice += val.skuMarketSalePrice*val.orcNumber;
                                                }
                                            }else {
                                                this.sumPrice += val.skuSalePrice*val.orcNumber;
                                            }
                                            this.chooseQuantity += val.orcNumber;
                                        }
                                    } else {
                                        if(val.spuShelvesStatus==1&&val.skuShowNum!=0){
                                            this.totalPrice -= val.skuPromotionPrice*val.orcNumber;
                                            if(val.skuPromotionPrice==val.skuSalePrice){
                                                if(val.skuMarketSalePrice==0){
                                                    this.sumPrice -= val.skuSalePrice*val.orcNumber;
                                                }else{
                                                    this.sumPrice -= val.skuMarketSalePrice*val.orcNumber;
                                                }
                                            }else {
                                                this.sumPrice -= val.skuSalePrice*val.orcNumber;
                                            }
                                            this.chooseQuantity -= val.orcNumber;
                                        }
                                    }
                                });
                                this.firstCome = false;
                            }
                        }
                    } else {
                        this.$vux.toast.text(data.msg, 'middle');
                    }
                }, (data)=>{
                    this.$vux.loading.hide();
                    this.showPage = true;
                    this.isLoading = false;
                    this.$vux.toast.text(data.msg, 'middle');
                });
            }
        },
        editCartList() {
            this.goodsList.forEach((val,index,arr) => {
                val.active = false;
            });
            this.chooseList = [];
            this.invalidGoodData = [];
            this.invalidList = [];
            this.totalPrice = 0;
            this.sumPrice = 0;
            this.chooseQuantity = 0;
            this.$forceUpdate();
            this.isCheckAll = false;
            this.getCartList();
            this.isEdit = !this.isEdit;
            this.freeFreightBool=false;
        },
        getCouponList() {
            //获取可领取优惠券列表
            client.postWithHeader(apiConfig.API_GOODS_CART_COUPON, JSON.stringify({
                "carList": this.carList,
                // "mkcMemberId": 0,
                // "mkcStatus": 1,
                "type": 1
            })).then( (data) => {
                if(data.code === 200){
                    this.reviceCouponList = data.data.getList;
                    this.hasCouponList = data.data.usableList;
                } else {
                    this.$vux.toast.text(data.msg, 'middle');
                }
            }, (data)=>{
                this.$vux.toast.text(data.msg, 'middle');
            });
        },
        goHome() {
            this.$bridge.trackData({ id: '704019', title: '点击去逛逛' });
            this.$bridge.goHome();
        },
        getMemberAddress() { //获取收货地址
            client.postWithHeader(apiConfig.API_GOODS_GET_ADDRESS_LIST,JSON.stringify({
                "madMemberId": '',
                "page": {
                    "currentPage": 1,
                    "pageSize": 10,
                }
            })).then( (data) => {
                if(data.code === 200){
                    if(data.data.length != 0){
                        this.defaultProvince = data.data[0].madProvince;
                        this.$store.commit('CHOSEN_DELIVERY_ADDRESS', {"chosenDeliveryAddress":data.data[0]});
                    }
                } else {
                    this.$vux.toast.text(data.msg, 'middle');
                }
            }, (data)=>{
                this.$vux.toast.text(data.msg, 'middle');
            });
        },
        getFreight() { //获取运费
            let objData = '{';
            this.chooseList.forEach((val,index)=>{
                objData += '"' + val.skuSpuId + '"' + ":" + val.orcNumber + ',';
            });
            objData = objData.substring(0, objData.length - 1);
            objData += '}';
            client.postWithHeaderNoAuth(apiConfig.API_GOODS_GET_FREIGHT+"?area="+this.defaultProvince,objData).then( (data) => {
                if(data.code === 200){
                    data.data==0?this.freeFreightBool = true:this.freeFreightBool = false;
                } else {
                    this.$vux.toast.text(data.msg, 'middle');
                }
            }, (data)=>{
                this.$vux.toast.text(data.msg, 'middle');
            });
        },
        goodsRecommend() {//API_GOODS_RECOMMEND //noRepeatObjectData
            this.noRepeatData.forEach((val,index)=>{
                val = JSON.parse(val);
                let fetchData = {
                    "currentPage": 1,
                    "pageSize": 3,
                    "spuId": val.skuSpuId,
                    "type": 1
                }
                client.post(apiConfig.API_GOODS_RECOMMEND,fetchData).then( (data) => {
                    this.$vux.loading.hide()
                    if(data.code === 200){
                        val.recommendListData = data.data
                        this.noRepeatObjectData.push(val);
                    } else {
                        this.$vux.toast.text(data.msg, 'middle');
                    }
                }, (data)=>{
                    this.$vux.loading.hide()
                    this.$vux.toast.text(data.msg, 'middle');
                })
            })
        },
        noGoodsRecommend() {
            let fetchData = {
                "currentPage": 1,
                "fenceId": 10001,
                "pageSize": 50
            }
            client.post(apiConfig.API_GOODS_RECOMMEND_DEFAULT,fetchData).then( (data) => {
                this.$vux.loading.hide()
                if(data.code === 200){
                     data.data.forEach((val,index)=>{
                        //  if(index<=4){
                        this.recommendListData.push(val);
                        //  }
                     });
                } else {
                    this.$vux.toast.text(data.msg, 'middle');
                }
            }, (data)=>{
                this.$vux.loading.hide()
                this.$vux.toast.text(data.msg, 'middle');
            })
        }
    },
    mounted() {
         $('html,body').css('background', '#f7f7f7');
         $('html,body').scrollTop(2);
        setTimeout(()=>{
            $('html,body').scrollTop(0);
        },100)
        setTimeout(()=>{
            this.showBottomBtn = true;
        },500)
    },
}
</script>

<style lang="less">
@import '../../common/styles/index.less';
@import './index.less';
</style>
