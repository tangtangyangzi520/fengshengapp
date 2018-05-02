<template>
    <div class="fi-wrapper">
        <div class="fi-addr btn-active" v-show="!noAddress" v-if="chosenDeliveryAddress" @click="gotoAddressList">
            <div class="fi-addr-msg">
                <p>{{chosenDeliveryAddress.madReceiver}}</p>
                <p>{{chosenDeliveryAddress.madMobile|telPhoneFilter}}<span v-if="chosenDeliveryAddress.madDefault == 1">默认</span></p>
            </div>
            <div class="fi-addr-name">
                <p>{{chosenDeliveryAddress.madProvince+chosenDeliveryAddress.madCity+chosenDeliveryAddress.madTown+chosenDeliveryAddress.madAddressDetail}}</p>
            </div>
        </div>
        <div class="fi-addr btn-active" v-show="noAddress" @click="addAddressPage">
            <div class="fi-addr-without">
                <p>点击添加地址</p>
            </div>
        </div>
        <div class="fi-addr-list">
            <div class="fi-addr-ls-item" v-for="item in chosenCartListData" v-if="item.spuShelvesStatus == 1">
                <div class="fi-addr-ls-item-con">
                    <div class="fi-addr-ls-item-con-l">
                        <img :src="item.spuPic" />
                    </div>
                    <div class="fi-addr-ls-item-con-r" @click="gtToGoodsDetail(item.skuSpuId)">
                        <p class="fi-addr-ls-item-con-r-name">{{item.spuName}}</p>
                        <p class="fi-addr-ls-item-con-r-chosen">
                            <span>已选：{{item.skuName}}</span>
                            <span>x{{item.orcNumber}}</span>
                        </p>
                        <p class="fi-addr-ls-item-con-r-price">
                            <span>￥{{item.skuPromotionPrice}}</span>
                            <span v-if="item.skuPromotionPrice!=item.skuSalePrice">￥{{item.skuSalePrice}}</span>
                        </p>
                    </div>
                </div>
            </div>
        </div>
        <div class="fi-order">
            <group class="fi-order-freight" v-if="orderFreight!=null">
                <cell title="运费" :value="'￥'+orderFreight.toFixed(2)"></cell>
            </group>
            <group class="fi-order-freight" v-else>
                <cell title="运费" value="￥0.00"></cell>
            </group>
            <group class="fi-order-freight">
                <cell title="配送方式" value="快递"></cell>
            </group>
            <group class="fi-order-freight">
                <cell :title="CrossBorder==2?'发票(跨境商品不支持开发票)':'发票(只开具境内商品的发票)'" :value="invoiceMessage.orsHeader" is-link @click.native="goToInvoice" v-if="invoiceMessage"></cell>
                <cell :title="CrossBorder==2?'发票(跨境商品不支持开发票)':'发票(只开具境内商品的发票)'" value="不开具发票" is-link @click.native="goToInvoice" v-else></cell>
            </group>
            <group>
                <cell title="店铺优惠券" value="￥-10.00" is-link @click.native="goToCouponList" v-show="false"></cell>
                <cell is-link :value="'￥-'+(!chosenCoupon?'0.00':chosenCoupon.mkcPrice.toFixed(2))" @click.native="goToCouponList">
                    <span slot="title" class="fi-es-style"><span>店铺优惠券</span><span>已选{{!chosenCoupon?0:1}}张</span></span>
                </cell>
            </group>
            <group>
                <cell is-link :value="giftCardList?'请选择':'无可用'" @click.native="goToGiftCardList" v-if="!giftCardChosen">
                    <span slot="title" class="fi-es-style"><span>礼品卡</span></span>
                </cell>
                <cell is-link :value="(totalPrice+orderFreight-coupon-discount-(!chosenCoupon?0:chosenCoupon.mkcPrice)-TotalDiscount)>totalBalance?'已抵扣￥'+totalBalance.toFixed(2):'已抵扣'+(totalPrice+orderFreight-coupon-discount-(!chosenCoupon?0:chosenCoupon.mkcPrice)-TotalDiscount).toFixed(2)" @click.native="goToGiftCardList" v-else>
                    <span slot="title" class="fi-es-style"><span>礼品卡</span></span>
                </cell>
            </group>
            <group>
                <x-input v-model="buyerMessage" title="买家留言:" type="text" placeholder="选填：对本次交易的说明" @on-focus="$bridge.trackData({ id: '706007', title: '点击买家留言' });"></x-input>
            </group>
            <group class="fi-order-price-ls">
                <cell title="商品总价" :value="'￥'+totalPrice.toFixed(2)"></cell>
                <cell title="运费" :value="'￥'+orderFreight.toFixed(2)" v-if="orderFreight!=null"></cell>
                <cell title="运费" value="￥0.00" v-else></cell>
                <cell title="优惠券" :value="'￥-'+(!chosenCoupon?'0.00':chosenCoupon.mkcPrice.toFixed(2))"></cell>
                <cell title="限时折扣" :value="'￥-'+TotalDiscount.toFixed(2)"></cell>
                <cell title="礼品卡" :value="(totalPrice+orderFreight-coupon-discount-(!chosenCoupon?0:chosenCoupon.mkcPrice)-TotalDiscount)>totalBalance?'￥-'+totalBalance.toFixed(2):'￥-'+(totalPrice+orderFreight-coupon-discount-(!chosenCoupon?0:chosenCoupon.mkcPrice)-TotalDiscount).toFixed(2)" v-if="giftCardChosen"></cell>
                <cell title="礼品卡" value="￥0.00" v-else></cell>
            </group>
            <div class="fi-order-sum">
                <p>
                    <span>共{{totalGoodsNum}}件商品</span>
                    <span>合计：￥{{(totalPrice+orderFreight-coupon-discount-(!chosenCoupon?0:chosenCoupon.mkcPrice)-TotalDiscount-totalBalance)<0?"0.00":(totalPrice+orderFreight-coupon-discount-(!chosenCoupon?0:chosenCoupon.mkcPrice)-TotalDiscount-totalBalance).toFixed(2)}}</span>
                </p>
            </div>
        </div>
        <div class="fi-pay-action">
            <span class="fi-payment">实付款：<span>￥{{(totalPrice+orderFreight-coupon-discount-(!chosenCoupon?0:chosenCoupon.mkcPrice)-TotalDiscount-totalBalance)<0?"0.00":(totalPrice+orderFreight-coupon-discount-(!chosenCoupon?0:chosenCoupon.mkcPrice)-TotalDiscount-totalBalance).toFixed(2)}}</span></span>
            <span class="fi-go-pay btn-active" @click="goToPay">去支付</span>
        </div>

        <div v-transfer-dom>
            <x-dialog :show.sync="realNameAuthListShow" class="fi-real-ls" hide-on-blur>
                <div class="fi-real-ls-title">
                    <p>实名认证</p>
                </div>
                <div class="fi-real-ls-con">
                    <div class="fi-real-ls-con-why">
                        <span>根据海关要求，购买跨境商品需要提供实名信息。</span>
                        <img src="../../assets/why-auth.png" @click="whyToAuth(false)" />
                    </div>
                    <div class="fi-real-ls-con-item-wrapper">
                        <checker v-model="chosenName" radio-required default-item-class="fi-real-ls-con-item" selected-item-class="fi-real-ls-con-item-selected">
                            <checker-item :value="item" v-for="(item,index) in realNameAuthList" @on-item-click="chooseRealName(index,item)">
                                <p>
                                    <span>{{item.mrnName}}</span>
                                    <span>{{item.mrnIdentity|identityFilter}}</span>
                                </p>
                            </checker-item>
                        </checker>
                    </div>
                </div>
                <div class="fi-real-ls-action btn-active" @click="payFunction">
                    <p>确认</p>
                </div>
            </x-dialog>
            <!-- 为什么需要实名认证？ -->
            <x-dialog :show.sync="realNameAuthExplainShow" class="fi-real-ls" hide-on-blur>
                <div class="fi-real-ls-title">
                    <p>为什么需要实名认证？</p>
                </div>
                <div class="fi-real-ls-con">
                    <div class="fi-real-ls-con-explain-wrapper">
                        <div>
                            <ul>
                                <li><em>• </em>根据海关要求，购买跨境商品需要对订购人进行实名认证，错误信息可能导致无法正常清关。</li>
                                <li><em>• </em>您的身份证信息将被加密保管，保证信息安全，仅用于海关清关，均不对外泄露！</li>
                                <li><em>• </em>任何身份认证相关问题可联系我们咨询：</br><span>400-9020-188（9:30-22:00）</span></li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div class="fi-real-ls-action btn-active" @click="closeWhyToAuth">
                    <p>知道了</p>
                </div>
            </x-dialog>
            <!-- 填写资料 -->
            <x-dialog :show.sync="realNameAuthInputShow" class="fi-real-ls" hide-on-blur>
                <div class="fi-real-ls-title">
                    <p>实名认证</p>
                </div>
                <div class="fi-real-ls-con">
                    <div class="fi-real-ls-con-why">
                        <span>根据海关要求，购买跨境商品需要提供实名信息。</span>
                        <img src="../../assets/why-auth.png" @click="whyToAuth(true)" />
                    </div>
                    <div class="fi-real-ls-con-input-wrapper">
                        <input type="text" placeholder="您的真实姓名" v-model="identityName" @focus="$bridge.trackData({ id: '706011', title: '实名认证-输入姓名' });" />
                        <input type="number" placeholder="您的身份证号码（将加密处理）" v-model="identityNumber" @focus="$bridge.trackData({ id: '706012', title: '实名认证-输入身份证号' });" />
                    </div>
                </div>
                <div class="fi-real-ls-action btn-active" @click="addRealName">
                    <p>确认</p>
                </div>
            </x-dialog>
        </div>
    </div>
</template>

<script>
import { TransferDom, Group, Cell, XInput, XDialog, Checker, CheckerItem } from 'vux'
import { mapState, mapActions } from 'vuex'
import client from '../../common/utils/client'
import apiConfig from '../../common/api.config'
export default {
    directives: {
        TransferDom 
    },
    components: {
        Group, Cell, XInput, XDialog, Checker, CheckerItem
    },
    computed: {
        ...mapState({
            chosenCartListData: state => state.chosenCartListData,
            chosenCartListPriceData: state => state.chosenCartListPriceData,
            invoiceMessage: state => state.invoiceMessage,
            chosenCoupon: state => state.chosenCoupon,
            chosenDeliveryAddress: state => state.chosenDeliveryAddress,
            orderFreight: state => state.orderFreight,
            giftCardChosen: state => state.giftCardChosen,
            totalBalance: state => state.totalBalance,
        }),
    },
    data () {
        return {
            realNameAuthList: null,
            realNameAuthListShow: false,
            realNameAuthExplainShow: false,
            realNameAuthInputShow: false,
            realNameOpen: 0,//0代表实名列表显示，1代表新增实名显示
            identityNumber: "",
            identityName: "",
            chosenName: null,
            noAddress: false,
            coupon: null,//优惠券
            discount: null,//限时折扣
            buyerMessage: '',//买家留言
            chosenConpouPrice: null,
            spuCountryType: 1,//'国内外分类：1-国内，2-国外'，默认为1,
            cartList: [],
            cartIdList: [],
            orsHeader: '',
            orsType: '',
            orsTaxpayerNum: '',
            orsTaxpayerAccount: '',
            orsTaxpayerAddress: '',
            orsTaxpayerEmail: '',
            orsTaxpayerName: '',
            orsTaxpayerPhone: '',
            TotalDiscount: 0,
            mrnId: 0,
            totalGoodsNum: 0,
            touchBool: false,
            CrossBorder: 0,
            totalPrice: 0,
            giftCardList: null,
        }
    },
    filters: {
        identityFilter:function (input) {
            let dh=input.replace(/(\d{3})\d{11}(\d{4})/, '$1***********$2');
            return dh;
        },
        telPhoneFilter:function (num) {
            return num.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2');
        }
    },
    created(){
        this.$bridge.setTitle('填写订单');
        this.$bridge.firstRead({ id: '706', title: '填写订单页' });
        this.getMemberAddress();//获取收货地址列表
        this.getOrderCouponList();//获取优惠券列表
        this.getTotalDiscount();//获取限时折扣
        this.getGiftCardList();//获取礼品卡列表
        this.$bridge.waitForBack(1);
        let this_ = this;
        this.$bridge.register('onBackBtnClick', (data) => {
            if (data.type == 6 ) {
                this.$vux.alert.hide();
                this.realNameAuthListShow=false;
                this.realNameAuthExplainShow=false;
                this.realNameAuthInputShow=false;
                this.$vux.confirm.show({
                    content: "便宜不等人，请三思而行！",
                    cancelText: "我再想想",
                    confirmText: "去意己决",
                    onCancel() {
                        this_.$bridge.trackData({ id: '706002', title: '返回-我再想想' });
                    },
                    onConfirm() {
                        this_.$bridge.waitForBack(0);
                        this_.$bridge.trackData({ id: '706003', title: '返回-去意已决' });
                        this_.$router.go(-1);
                    }
                })
            }
        });
    },
    mounted() {
        $('html,body').scrollTop(2);
        setTimeout(()=>{
            $('html,body').scrollTop(0);
        },100);
        let crossArray = [];
        this.chosenCartListData.forEach((val,index)=>{
            if(val.spuCountryType != 1){
                this.spuCountryType = 2;
                crossArray.push(val);
            }
            this.cartList.push({
                "ordGiftStatus": 0,
                "ordOriginal": val.skuSalePrice,
                "ordPackageCode": "",
                "ordPackageName": "",
                "ordPackageStatus": '',
                "ordSkuId": val.orcSkuId,
                "ordSkuNum": val.orcNumber
            });
            this.totalPrice+=parseFloat(val.skuSalePrice*val.orcNumber);
            this.cartIdList.push(val.orcId);
            this.totalGoodsNum += val.orcNumber;
            if(crossArray.length!=0&&crossArray.length<this.chosenCartListData.length){
                this.CrossBorder=1;
            } else if(crossArray.length!=0&&crossArray.length==this.chosenCartListData.length){
                this.CrossBorder=2;
            }
        });
    },
    methods: {
        gotoAddressList() {
            this.$bridge.trackData({ id: '706005', title: '点击已有地址' });
            this.$router.push('/orderAddress');
        },
        addAddressPage() {
            this.$bridge.trackData({ id: '706004', title: '点击新增地址' });
            this.$router.push('/increaseAddress/0');
        },
        whyToAuth(isEmpty) {
            this.$bridge.trackData({ id: '706009', title: '实名认证-点击实名认证说明' });
            if(isEmpty){
                this.realNameOpen = 1;
                this.realNameAuthExplainShow = !this.realNameAuthExplainShow;
                this.realNameAuthInputShow = !this.realNameAuthInputShow;
            } else {
                this.realNameOpen = 0;
                this.realNameAuthExplainShow = !this.realNameAuthExplainShow;
                this.realNameAuthListShow = !this.realNameAuthListShow;
            }
        },
        closeWhyToAuth() {
            this.$bridge.trackData({ id: '706010', title: '实名认证-点击知道了' });
            if(this.realNameOpen == 0) {
                this.realNameAuthExplainShow = !this.realNameAuthExplainShow;
                this.realNameAuthListShow = !this.realNameAuthListShow;
            } else {
                this.realNameAuthExplainShow = !this.realNameAuthExplainShow;
                this.realNameAuthInputShow = !this.realNameAuthInputShow;
            }
        },
        chooseRealName(index,item) {
            this.mrnId = item.mrnId;
        },
        addRealName() {
            this.$bridge.trackData({ id: '706013', title: '实名认证-确认' });
            let this_ = this;
            if(this.identityNumber==""||this.identityName==""){
                this.$vux.alert.show({
                    content: '请输入完整信息',
                    onShow () {
                        this_.realNameAuthInputShow = !this_.realNameAuthInputShow;
                    },
                    onHide () {
                        this_.realNameAuthInputShow = !this_.realNameAuthInputShow;
                    }
                })
            }else{
                client.postWithHeader(apiConfig.API_ADD_REAL_NAME,JSON.stringify({
                    "mrnIdentity": this.identityNumber,
                    "mrnName": this.identityName
                })).then( (data) => {
                    if(data.code === 200){
                        this.realNameAuthInputShow = !this.realNameAuthInputShow;
                        this.$vux.toast.text('添加成功！', 'middle');
                        this.mrnId = data.data;
                        this.payFunction();
                    } else {
                        this.$vux.confirm.show({
                            cancelText: '否',
                            confirmText: '是',
                            content: '身份证信息有误，是否继续确认？',
                            onShow() {
                                this_.realNameAuthInputShow = !this_.realNameAuthInputShow;
                            },
                            onConfirm() {
                                this_.realNameAuthInputShow = !this_.realNameAuthInputShow;
                            }
                        })
                        // this.$vux.toast.text(data.msg, 'middle');
                    }
                }, (data)=>{
                    this.$vux.toast.text(data.msg, 'middle');
                });
            }
        },
        goToPay() {
            this.$bridge.trackData({ id: '706008', title: '点击去支付' });
            this.touchBool = true;
            if(this.noAddress){
                this.touchBool = false;
                this.$vux.alert.show({
                    title: '提示',
                    content: '请添加收货地址'
                })
            } else {
                let fetchData = [];
                this.$store.commit('CART_LIST_CHOSEN', { "cartListChosen": null });
                this.chosenCartListData.forEach((val,index)=>{
                    fetchData.push({"ordSkuNum": val.orcNumber, "skuId": val.orcSkuId, "skuSalePrice": val.skuSalePrice, "skuDiscountPrice": val.skuPromotionPrice})
                });
                this.$vux.loading.show({
                    text: '加载中...'
                });
                client.post(apiConfig.API_ORDER_CHECK_SKU,fetchData).then( (data) => {
                    if(data.code === 200){
                        if(data.data.length==0){
                            this.$vux.loading.hide();
                            if(this.touchBool){
                                if(this.invoiceMessage != null){
                                    this.orsHeader = this.invoiceMessage.orsHeader;
                                    this.orsType = this.invoiceMessage.orsType;
                                    this.orsTaxpayerNum = this.invoiceMessage.orsTaxpayerNum;
                                    this.orsTaxpayerAccount = this.invoiceMessage.orsTaxpayerAccount;
                                    this.orsTaxpayerAddress = this.invoiceMessage.orsTaxpayerAddress;
                                    this.orsTaxpayerEmail = this.invoiceMessage.orsTaxpayerEmail;
                                    this.orsTaxpayerName = this.invoiceMessage.orsTaxpayerName;
                                    this.orsTaxpayerPhone = this.invoiceMessage.orsTaxpayerPhone;
                                }
                                if(this.spuCountryType == 2){
                                    this.$vux.toast.text('订单内含有海外商品', 'bottom');
                                    client.postWithHeader(apiConfig.API_REAL_NAME_LIST,{}).then( (data) => {
                                        this.touchBool = false;
                                        if(data.code === 200){
                                            if(data.data.length==0){
                                                this.realNameAuthInputShow = !this.realNameAuthInputShow;
                                            } else {
                                                this.realNameAuthList = data.data;
                                                this.chosenName = data.data[0];
                                                this.mrnId = data.data[0].mrnId;
                                                this.realNameAuthListShow = !this.realNameAuthListShow;
                                            }
                                        } else {
                                            this.$vux.toast.text(data.msg, 'middle');
                                        }
                                    }, (data)=>{
                                        this.touchBool = false;
                                        this.$vux.toast.text(data.msg, 'middle');
                                    });
                                } else {
                                    this.touchBool = false;
                                    this.payFunction();
                                }
                            }
                        } else {
                            let onlyPriceChange = true;
                            let this_ = this;
                            data.data.forEach((val,index)=>{
                                if(val.unableSale==1){
                                    onlyPriceChange=false;
                                    this.$vux.alert.show({
                                        content: '商品状态已发生变化，请重新确认订单',
                                        onHide () {
                                            this_.$router.go(-1);
                                        }
                                    });
                                }
                                this.chosenCartListData.forEach((item,ind)=>{
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
                                let this_ = this;
                                this.$store.commit('CHOSEN_CART_LIST', { cartList: this.chosenCartListData });
                                this.$vux.alert.show({
                                    content: '订单商品价格已发生变化，请重新确认订单',
                                    onHide () {
                                        
                                    }
                                });
                            }
                        }
                    } else {
                        this.$vux.toast.text(data.msg, 'middle');
                    }
                }, (data)=>{
                    this.$vux.loading.hide();
                    this.touchBool = false;
                    this.$vux.toast.text(data.msg, 'middle');
                });
            }
        },
        payFunction() {
            let giftCards =[];
            if(this.giftCardChosen) {
                this.giftCardChosen.forEach( item => {
                    giftCards.push(item.cardDetailId);
                })
            }
            let fetchData = {
                "buyerMessage": this.buyerMessage,
                "cartIdList": this.cartIdList,
                "detailList": this.cartList,
                "madId": this.chosenDeliveryAddress.madId,
                "mrnId": this.mrnId,
                "giftCards": giftCards,
                "ordCampaignId": this.chosenConpouPrice==0?'':this.chosenCoupon.mkcCampaignId,
                "ordLogiType": 1,
                "ordShopId": -1,
                "ordVersion": '',
                "orsChannel": '',
                "orsClientType": '',
                "orsClientVersion": "",
                "orsContent": "",
                "orsHeader": this.orsHeader,
                "orsMemberId": '',
                "orsTaxpayerNum": this.orsTaxpayerNum,
                "orsTaxpayerAccount": this.orsTaxpayerAccount,
                "orsTaxpayerAddress": this.orsTaxpayerAddress,
                "orsTaxpayerEmail": this.orsTaxpayerEmail,
                "orsTaxpayerName": this.orsTaxpayerName,
                "orsTaxpayerPhone": this.orsTaxpayerPhone,
                "orsType": this.orsType
            };
            client.postWithHeader(apiConfig.API_GOODS_CREATE_ORDER,JSON.stringify(fetchData)).then( (data) => {
                this.$vux.loading.hide();
                if(data.code === 200){
                    this.$store.commit('INVOICE_MESSAGE', {"invoiceMessage":null});
                    this.$store.commit('ORDER_FREIGHT', { "orderFreight": null });
                    this.$store.commit('CHOSEN_COUPON', {"chosenCoupon": null});
                    this.$store.commit('CHOSEN_DELIVERY_ADDRESS', {"chosenDeliveryAddress":null});
                    if(data.data.orsOpenPay==0){
                        this.$router.replace('/payResult/'+data.data.orstNo+'/0');
                    }else{
                        this.$router.replace('/payType/' + data.data.orstNo);
                    }
                } else {
                    this.$vux.toast.text(data.msg, 'middle');
                }
            }, (data)=>{
                this.$vux.loading.hide();
                this.$vux.toast.text(data.msg, 'middle');
            });
        },
        goToInvoice() {
            this.$bridge.trackData({ id: '706006', title: '点击发票' });
            if(this.CrossBorder==2){
                this.$vux.alert.show({
                    content: '你的订单都是跨境商品，不支持开发票',
                })
            } else {
                this.$router.push('/invoice');
            }
        },
        goToCouponList() {
            this.$router.push({name: 'orderCoupon'});
        },
        goToGiftCardList() {
            localStorage.setItem("FILLORDER","FILLORDER");
            this.$bridge.trackData({ id: '706014', title: '点击礼品卡' });
            this.$router.push({name: 'giftCard'});
        },
        getFreight(pro) { //获取运费
            let objData = '{';
            this.chosenCartListData.forEach((val,index)=>{
                objData += '"' + val.skuSpuId + '"' + ":" + val.orcNumber + ',';
            });
            objData = objData.substring(0, objData.length - 1);
            objData += '}';
            client.postWithHeaderNoAuth(apiConfig.API_GOODS_GET_FREIGHT+"?area="+pro,objData).then( (data) => {
                if(data.code === 200){
                    this.$store.commit('ORDER_FREIGHT', { "orderFreight": data.data });
                } else {
                    this.$vux.toast.text(data.msg, 'middle');
                }
            }, (data)=>{
                this.$vux.toast.text(data.msg, 'middle');
            });
        },
        getMemberAddress() { //获取收货地址
            if(this.chosenDeliveryAddress == null){
                client.postWithHeader(apiConfig.API_GOODS_GET_ADDRESS_LIST,JSON.stringify({
                    "madMemberId": '',
                    "page": {
                        "currentPage": 1,
                        "pageSize": 10,
                    }
                })).then( (data) => {
                    if(data.code === 200){
                        if(data.data.length == 0){
                            this.noAddress = true;
                        } else {
                            this.getFreight(data.data[0].madProvince);//计算运费
                            this.$store.commit('CHOSEN_DELIVERY_ADDRESS', {"chosenDeliveryAddress":data.data[0]});
                        }
                    } else {
                        this.$vux.toast.text(data.msg, 'middle');
                    }
                }, (data)=>{
                    this.$vux.toast.text(data.msg, 'middle');
                });
            }
        },
        gtToGoodsDetail(spuId) {
            this.$router.push('/detail/'+spuId);
        },
        getOrderCouponList() { //获取优惠券列表
            let cartListParams = [];
            this.chosenCartListData.forEach((val,index)=>{
                let obj = {};
                if(val.skuPromotionPrice==val.skuSalePrice){
                    obj = { "amount": val.skuSalePrice*val.orcNumber, "spuId": val.skuSpuId};
                }else{
                    obj = { "amount": val.skuPromotionPrice*val.orcNumber, "spuId": val.skuSpuId};
                }
                cartListParams.push(obj);
            });
            if(this.chosenCoupon == null){
                client.postWithHeader(apiConfig.API_GOODS_CART_COUPON,JSON.stringify({
                    "carList": cartListParams,
                    "mkcMemberId": '',
                    "mkcStatus": '',
                    "type": 2
                })).then( (data) => {
                    if(data.code === 200){
                        if(data.data.usableList!=null&&data.data.usableList.length != 0){
                            // this.chosenCoupon = data.data.usableList[0];
                            this.$store.commit('CHOSEN_COUPON', {"chosenCoupon": data.data.usableList[0]});
                            this.chosenConpouPrice = data.data.usableList[0].mkcPrice;
                        } else {
                            this.chosenConpouPrice = 0;
                        }
                    } else {
                        this.$vux.toast.text(data.msg, 'middle');
                    }
                }, (data)=>{
                    this.$vux.toast.text(data.msg, 'middle');
                });
            }
        },
        getGiftCardList() { //获取礼品卡列表
            client.postWithHeader(apiConfig.API_GIFT_CARD_LSIT,JSON.stringify({
                "cardStatus": 1,
            })).then( (data) => {
                if(data.code === 200){
                    if(data.data.detailList&&data.data.detailList.length!=0){
                        this.giftCardList = data.data.detailList;
                    }
                } else {
                    this.$vux.toast.text(data.msg, 'middle');
                }
            }, (data)=>{
                this.$vux.toast.text(data.msg, 'middle');
            });
        },
        getTotalDiscount() { //获取限时折扣信息
            let discountArr = [];
            this.chosenCartListData.forEach((val,index)=>{
                discountArr.push({"num": val.orcNumber,"skuId": val.orcSkuId});
            });
            client.postWithHeader(apiConfig.API_GOODS_TOTAL_DISCOUNT, JSON.stringify(discountArr)).then( (data) => {
                if(data.code === 200){
                    this.TotalDiscount = data.data;
                } else {
                    this.$vux.toast.text(data.msg, 'middle');
                }
            }, (data)=>{
                this.$vux.toast.text(data.msg, 'middle');
            });
        },
    },
    beforeDestroy() {
        this.$bridge.waitForBack(0);
    },
}
</script>

<style lang="less">
@import '../../common/styles/index.less';
.fi-addr {
    min-height: 145/@r;
    position: relative;
    margin: 20/@r 0 13/@r;
    padding-right: 40/@r;
    background: #ffffff url('../../assets/click_normal@2x.png') 720/@r center no-repeat;
    background-size: 15/@r 27/@r;
    .fi-addr-msg {
        padding-left: 60/@r;
        p {
            display: inline-block;
            color: #4a4a4a;
            font-size: 28/@r;
            margin: 25/@r 0 20/@r;
            span {
                font-size: 18/@r;
                color: #f93473;
                border: 1/@r solid #f93473;
                padding: 1/@r 8/@r;
                border-radius: 8/@r;
                margin-left: 12/@r;
            }
        }
    }
    .fi-addr-name {
        padding-left: 60/@r;
        background: url('../../assets/position_normal@2x.png') 30/@r center no-repeat;
        background-size: 21/@r 27/@r;
        p {
            color: #4a4a4a;
            font-size: 24/@r;
            margin: 0;
            word-wrap:break-word;
            word-break:break-all;
            overflow: hidden;
        }
    }
    .fi-addr-without {
        height: 100%;
        p {
            color: #4a4a4a;
            font-size: 34/@r;
            margin: 0;
            height: 145/@r;
            line-height: 145/@r;
            padding-left: 144/@r;
            background: url('../../assets/add_addr_icon.png') 28/@r center no-repeat;
            background-size: 84/@r 84/@r;
        }
    }
}
.fi-addr:before, .fi-addr-ls-item:before, .fi-order-sum:before, .fi-pay-action:before, .fi-real-ls-action:before {
    content: " ";
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    height: 2px;
    border-top: 1px solid #D9D9D9;
    color: #D9D9D9;
    -webkit-transform-origin: 0 0;
    transform-origin: 0 0;
    -webkit-transform: scaleY(0.5);
    transform: scaleY(0.5);
}
.fi-addr:after, .fi-addr-list:after, .fi-order-sum:after {
    content: " ";
    position: absolute;
    left: 0;
    bottom: 0;
    right: 0;
    height: 2px;
    border-top: 1px solid #D9D9D9;
    color: #D9D9D9;
    -webkit-transform-origin: 0 0;
    transform-origin: 0 0;
    -webkit-transform: scaleY(0.5);
    transform: scaleY(0.5);
}
.fi-addr-list {
    background-color: #ffffff;
    position: relative;
}
.fi-addr-ls-item{
    height: 200/@r;
    padding-top: 40/@r;
    position: relative;
    .fi-addr-ls-item-con {
        .fi-addr-ls-item-con-l {
            width: 139/@r;
            height: 139/@r;
            border: 1px solid #e4e4e4;
            text-align: center;
            float: left;
            display: inline-block;
            margin-left: 22/@r;
            img {
                width: 90%;
                height: 90%;
                margin-top: 5%;
            }
        }
        .fi-addr-ls-item-con-r {
            padding-left: 188/@r;
            .fi-addr-ls-item-con-r-name {
                overflow: hidden;
                text-overflow:ellipsis;
                white-space: nowrap;
                font-size: 26/@r;
                color: #4a4a4a;
                margin: 0;
            }
            .fi-addr-ls-item-con-r-chosen {
                display: flex;
                justify-content: space-between;
                margin: 30/@r 20/@r 0 0;
                span:nth-of-type(1) {
                    color: #9b9b9b;
                    font-size: 22/@r;
                    display: -webkit-box;
                    -webkit-box-orient: vertical;
                    -webkit-line-clamp: 2;
                    overflow: hidden;
                }
                span:nth-of-type(2) {
                    color: #4a4a4a;
                    font-size: 24/@r;
                }
            }
            .fi-addr-ls-item-con-r-price {
                margin: 0/@r;
                span:nth-of-type(1) {
                    color: #f93473;
                    font-size: 30/@r;
                    font-weight: bold;
                }
                span:nth-of-type(2) {
                    color: #212121;
                    padding-left: 20/@r;
                    font-size: 24/@r;
                    text-decoration: line-through;
                }
                span:nth-of-type(3) {
                    color: #f93473;
                    font-size: 22/@r;
                    padding-left: 50/@r;
                }
            }
        }
    }
}
.fi-order {
    padding-bottom: 88/@r;
}
.fi-order-sum {
    background-color: #ffffff;
    position: relative;
    display: flex;
    justify-content: flex-end;
    p {
        font-size: 26/@r;
        padding-right: 25/@r;
        span:nth-of-type(1) {
            color: #4a4a4a;
            padding-right: 20/@r;
        }
        text-align: right;
        span:nth-of-type(2) {
            color: #f93473;
        }
    }
}
.fi-pay-action {
    height: 90/@r;
    width: 100%;
    background-color: #ffffff;
    position: fixed;
    bottom: 0;
    left: 0;
    text-align: right;
    line-height: 90/@r;
    .fi-payment {
        font-size: 32/@r;
        color: #4a4a4a;
        margin-right: 55/@r;
        span {
            color: #f93473;
        }
    }
    .fi-go-pay {
        background-color: #f93473;
        color: #ffffff;
        font-size: 32/@r;
        width: 220/@r;
        height: 100%;
        display: inline-block;
        text-align: center;
    }
}
.fi-real-ls {
    .fi-real-ls-title {
        background-color: #4bc6b1;
        height: 75/@r;
        line-height: 75/@r;
        p {
            text-align: center;
            color: #ffffff;
            font-size: 32/@r;
            margin: 0;
        }
    }
    .fi-real-ls-con {
        .fi-real-ls-con-why {
            font-size: 24/@r;
            color: #4a4a4a;
            display: flex;
            justify-content: center;
            span {
                padding: 35/@r 0 20/@r;
            }
            img {
                width: 24/@r;
                height: 24/@r;
                padding: 35/@r 10/@r 20/@r;
            }
        }
        .fi-real-ls-con-item-wrapper {
            margin-bottom: 20/@r;
            .fi-real-ls-con-item {
                padding-left: 80/@r;
                background: url('../../assets/Check_normal@2x.png') left center no-repeat;
                background-size: 40/@r 40/@r;
                p {
                    color: #4a4a4a;
                    font-size: 28/@r;
                    span:nth-of-type {

                    }
                }
            }
            .fi-real-ls-con-item-selected {
                padding-left: 80/@r;
                background: url('../../assets/Check_selected@2x.png') left center no-repeat;
                background-size: 40/@r 40/@r;
                p {
                    color: #4a4a4a;
                    font-size: 28/@r;
                    span:nth-of-type {

                    }
                }
            }
        }
        .fi-real-ls-con-explain-wrapper {
            ul {
                padding: 0 40/@r;
                margin: 40/@r 0;
                li {
                    text-align: left;
                    list-style: none;
                    font-size: 24/@r;
                    color: #4a4a4a;
                    em {
                        font-style: normal;
                        color: #4bc6b1
                    }
                }
            }
        }
        .fi-real-ls-con-input-wrapper {
            margin: 0 20/@r 30/@r;
            input {
                width: 100%;
                height: 65/@r;
                background-color: #f3f3f3;
                font-size: 26/@r;
                border: 0;
                margin-top: 20/@r;
                border-radius: 10/@r;
                outline:none;
                padding: 0 10/@r;
            }
            input:focus {
                border: 0;
            }
        }
    }
    .fi-real-ls-action {
        position: relative;
        height: 77/@r;
        line-height: 77/@r;
        p {
            color: #4a4a4a;
            margin: 0;
            font-size: 32/@r;
        }
    }
}

// 修改vux的cell组件的样式
.fi-order .weui-cells {
    margin-top: 15/@r;
}
.fi-order .weui-cells .weui-cell {
    padding-left: 20/@r;
}
.fi-order .fi-order-price-ls .weui-cells {
    margin-top: 50/@r;
}
.fi-order .weui-cells .vux-label, .fi-order .weui-cells .weui-label {
    color: #4a4a4a;
    font-size: 26/@r;
    font-weight: bold;
}
.fi-order .weui-cell_access .weui-cell__ft:after {
    width: 24/@r;
    height: 24/@r;
    top: 25%;
}
.fi-order .weui-cell__ft {
    font-size: 26/@r;
    color: #f93473;
}
.fi-order .fi-order-freight .weui-cell__ft {
    font-size: 26/@r;
    color: #a4a4aa;
}
.fi-order .weui-cell_access .weui-cell__ft {
    padding-right: 32/@r;
}
.fi-order .vux-x-input {
    margin: 20/@r 0;
}
.fi-order .vux-x-input .weui-cell__bd {
    font-size: 26/@r;
    color: #4a4a4a;
}

.fi-es-style {
    color: #4a4a4a;
    span:nth-of-type(1) {
        vertical-align:middle;
    }
    span:nth-of-type(2) {
        color: #f93473;
        font-size: 18/@r;
        padding: 0 3/@r;
        margin-left: 10/@r;
        border: 2/@r solid #f93473;
        border-radius: 3/@r;
    }
}


//添加点击效果
.btn-active {
    &:active {
        // background: #F30;
        opacity: 0.5;
    }
}
</style>
