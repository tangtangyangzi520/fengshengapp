<template>
  <div class="container">
    <!-- 子路由容器 -->
    <router-view v-on:openSKUFromChild="openSKU"  @getSKUList="changeSKUList"></router-view>

    <!-- 底部购物车导航 -->
    <transition name="fade-in">
    <div class="car-menu" v-if="showBottomBtn">
        <div v-show="childData&&childData.spuShelvesStatus!=0&&childData.totalShowNum==0" class="noGoods">
            <p>(๑>◡<๑) 商品售罄了，看看其他商品吧！</p>
        </div>
        <div v-show="childData&&childData.spuShelvesStatus==0" class="noGoods">
            <p>(๑>◡<๑) 商品已下架，看看其他商品吧！</p>
        </div>
        <div class="car-menu-cart">
            <a @click="contactCustomer" style="margin-right:0.05rem;">
                <em class="car-menu-cart-customer"></em>
                <span>客服</span>
            </a>
            <a @click="collectGoods" style="margin-right:0.05rem;">
                <em :class="isCollected?'car-menu-cart-collect':'car-menu-cart-collect-no'"></em>
                <span>收藏</span>
            </a>
            <a @click="goPage">
                <em class="car-menu-cart-cart"></em>
                <span>购物车</span>
                <sup :style="{'left':cartNum.toString().length>2?'70%':'80%'}">
                    <span>{{cartNum}}</span>
                </sup>
            </a>
        </div>
        <div class="car-menu-action">
            <a class="car-menu-action-cart" v-show="childData&&childData.spuShelvesStatus==1" @click="showSKU = !showSKU;">加入购物车</a>
            <a class="car-menu-action-buy" v-show="childData&&childData.spuShelvesStatus==1" @click="showSKU = !showSKU;">立即购买</a>
            <a class="car-menu-action-other" v-show="childData&&(childData.spuShelvesStatus==0||childData.totalShowNum==0)" @click="goHome">查看商城其它商品</a>
        </div>
    </div>
    </transition>
    <!-- SKU弹出层 -->
    <div v-transfer-dom>
        <popup v-model="showSKU" style="background-color: #fbfbfb;opacity:1;" v-if="SKUData">
            <div class="SKU-top">
                <div class="SKU-top-left">
                    <!-- <img src="../../assets/skin.png" /> -->
                    <img :src="childData.spuPic" />
                </div>
                <div class="SKU-top-right">
                    <p class="SKU-top-right-price" v-if="childData.promotionResp">价格：￥{{(SKUData[chosenIndex].skuSalePrice-childData.promotionResp.misDiscountPrice).toFixed(2)}}</p>
                    <p class="SKU-top-right-price" v-else>价格：￥{{SKUData[chosenIndex].skuSalePrice}}</p>
                    <p class="SKU-top-right-chosen">{{Specifications}}<span>{{SKUColor}}</span>&nbsp;<span>{{chosenNumber}}</span></p>
                </div>
                <div class="SKU-top-close" @click="openSKU">
                    <img src="../../assets/close_normal@2x.png" />
                    
                </div>
            </div>
            <div class="SKU-middle">
                <div class="SKU-middle-color">
                    <h3>规格</h3>
                    <div class="SKU-middle-color-wrapper">
                        <checker v-model="skuDefaultValue" radio-required default-item-class="SKU-middle-color-item" selected-item-class="SKU-middle-color-item-selected" disabled-item-class="SKU-middle-color-item-disabled">
                            <checker-item :value="item.skuAtrr==''?item.skuName:item.skuAtrr" v-for="(item,index) in SKUData" :disabled="item.skuShowNum==0?true:false"  @on-item-click="onItemClick(index,item)">{{item.skuAtrr==''?item.skuName:item.skuAtrr}}</checker-item>
                        </checker>
                    </div>
                </div>
                <div class="SKU-middle-number">
                    <div class="SKU-middle-number-left">
                        <h3>数量</h3>
                        <P>剩余<span>{{childData&&childData.spuShelvesStatus==1?SKUData[chosenIndex].skuShowNum:0}}</span>件</P>
                    </div>
                    <div class="SKU-middle-number-right">
                        <inline-x-number width="0.4rem" fillable :min="childData&&childData.spuShelvesStatus==1?1:0" :value="childData&&childData.spuShelvesStatus==1?1:0" :max="childData&&childData.spuShelvesStatus==1?chosenShowNum:0" @on-change="changeNum"></inline-x-number>
                    </div>
                </div>
            </div>
            <div class="SKU-bottom">
                <a class="SKU-bottom-o btn-active" v-if="!(childData&&childData.spuShelvesStatus==1)" @click="goHome">查看商城其它商品</a>
                <a class="SKU-bottom-j btn-active" @click="joinToCart" v-if="childData&&childData.spuShelvesStatus==1">加入购物车</a>
                <a class="SKU-bottom-b btn-active" @click="buyNow" v-if="childData&&childData.spuShelvesStatus==1">立即购买</a>
            </div>
        </popup>
    </div>

  </div>
</template>

<script>
import { 
    Group, Cell, Swiper, GroupTitle, Icon, Divider, Clocker, Toast, TransferDom, Popup, Checker, CheckerItem, InlineXNumber
} from 'vux'
import { mapState, mapActions } from 'vuex'
import { changeTitle } from '../../common/utils/hack'
import client from '../../common/utils/client'
import apiConfig from '../../common/api.config'
import Joice from '../../components/Joice/index'
import ExpertViewpoint from '../../components/ExpertViewpoint/index'
import CollarCoupons from '../../components/CollarCoupons/index'
import UserEvaluate from '../../components/UserEvaluate/index'
import ServiceCommitment from '../../components/ServiceCommitment/index'
import RecommendedList from '../../components/RecommendedList/index'

const imgArr = [
  'https://static.vux.li/demo/1.jpg',
  'https://static.vux.li/demo/2.jpg',
  'https://static.vux.li/demo/3.jpg'
];

export default {
    components: {
        Group, Cell, Swiper, GroupTitle, Joice, ExpertViewpoint, CollarCoupons, Icon, Divider, UserEvaluate, Clocker, Toast, Popup, Checker, CheckerItem,
        InlineXNumber, ServiceCommitment, RecommendedList
    },
    directives: {
        TransferDom
    },
    data () {
        return {
            cartNum: 0,
            isCollected: true,
            showSKU: false,
            Specifications: '请选择规格',
            SKUColor: null,
            chosenNumber: null,
            chosenNumberToCart: 1,
            isOnline: true, //如果为true，则表示商品有货或未下架，从而显示用户评论；如果为false，则表示商品已售罄或已下架，从而显示推荐列表,
            SKUData: null,
            chosenIndex: 0,
            chosenShowNum: 0,
            skuId: null,
            commitData: [],
            childData: null,
            skuCommitData: null,
            cartData: null,
            showBottomBtn: false,
            skuDefaultValue: null,
        }
    },
    created() {
        changeTitle('商品详情');
        this.init();
    },
    watch: {
      $route(){
          this.init();
      },
      showSKU(){
        $('.SKU-middle-color-wrapper').on('touchmove',function(e){
            e.stopPropagation();
        })
      }
    },
    mounted() {
        //  localStorage.removeItem('cartInfo');
        $('html,body').scrollTop(2);
        setTimeout(()=>{
            $('html,body').scrollTop(0);
        },100)
        setTimeout(()=>{
            this.showBottomBtn = true;
        },500)
    },
    methods: {
        init(){
            this.getCartList();
            this.checkCollect();
            this.$bridge.showSpuDetailTabBar((data)=>{
                if (data.tabCode == 0) {
                    this.$router.replace("/detail/"+this.$route.params.spuId);
                }
                if (data.tabCode == 1) {
                    this.$router.replace("/comment/"+this.$route.params.spuId);
                }
                if (data.tabCode == 2) {
                    this.$router.replace("/introduce/"+this.$route.params.spuId);
                }
            });
        },
        alertPlugin (title, con) {
            this.$vux.alert.show({
                title: title,
                content: con
            })
        },
        goHome() {
            this.$bridge.goHome();
        },
        goPage() {
            document.body.scrollTop = 0;
            $('.cart-menu').hide();
            this.$router.push('/car');
        },
        openSKU() {
            this.showSKU = !this.showSKU;
            $('.SKU-middle-color-wrapper').on('touchmove',function(e){
                e.stopPropagation();
            });
            if(!this.showSKU){
                this.$bridge.trackData({ id: '701013', title: '关掉规格页面' });
            }
        },
        onItemClick(itemIndex, itemValue) {
            this.$bridge.trackData({ id: '701007', title: '点击规格' });
            if(itemValue.skuShowNum == 0){
                this.$vux.toast.text('该规格的商品已售罄，请选择其它规格商品', 'middle');
                return;
            }
            this.Specifications = "已选：";
            if(itemValue.skuAtrr==""){
                this.SKUColor = "“" + itemValue.skuName + "” ";
            }else{
                this.SKUColor = "“" + itemValue.skuAtrr + "” ";
            }
            this.chosenIndex = itemIndex;
            this.chosenShowNum = itemValue.skuShowNum;
            this.skuId = itemValue.skuId;
            this.skuCommitData = itemValue;
        },
        changeNum(itemValue) {
            if(itemValue > this.chosenShowNum){
                this.$vux.toast.text('数量超出范围!', 'bottom');
                this.chosenNumberToCart = itemValue;
            } else {
                this.Specifications = "已选：";
                this.chosenNumber = " “" + itemValue + "件”";
                this.chosenNumberToCart = itemValue;
            }
        },
        joinToCart() { //加入购物车
            this.$bridge.trackData({ id: '701011', title: '点击规格页面加入购物车' });
            if(this.SKUColor === null){
                this.$vux.toast.text('你还没有选择规格哦！', 'middle');
                return;
            }
            if(this.chosenNumber === null){
                this.$vux.toast.text('你还没有选择数量哦！', 'middle');
                return;
            }
            if(this.chosenNumberToCart > this.SKUData[this.chosenIndex].skuShowNum){
                this.$vux.toast.text('数量超出范围!', 'bottom');
                return;
            }
            if(window.userInfo.authorization==""){
                let storage = localStorage.getItem("cartInfo");
                if(storage==""||storage==null){
                    localStorage.setItem("cartInfo","["+JSON.stringify({
                        "orcNumber": this.chosenNumberToCart,
                        "orcSkuId": this.skuId,
                        "coupons": [],
                        "skuMarketSalePrice": this.skuCommitData.skuMarketSalePrice,
                        "skuName": this.skuCommitData.skuName,
                        "skuSalePrice": this.skuCommitData.skuSalePrice,
                        "skuPromotionPrice": this.childData.promotionResp==null?this.skuCommitData.skuSalePrice:this.skuCommitData.skuSalePrice-this.childData.promotionResp.misDiscountPrice,
                        "skuShowNum": this.skuCommitData.skuShowNum,
                        "skuSpuId": this.childData.spuId,
                        "skuStopStatus": this.skuCommitData.skuStopStatus,
                        "spuCountryType": this.childData.spuCountryType,
                        "spuName": this.childData.spuName,
                        "spuPic": this.childData.spuPic,
                        "spuShelvesStatus": this.childData.spuShelvesStatus
                    })+"]");
                } else {
                    let same = false;
                    storage=JSON.parse(storage);
                    storage.forEach((val,index)=>{
                        if(val.orcSkuId == this.skuId){
                            this.orcNumber += this.chosenNumberToCart;
                            same = true;
                        }
                    });
                    if(!same){
                        storage.push({
                            "orcNumber": this.chosenNumberToCart,
                            "orcSkuId": this.skuId,
                            "coupons": [],
                            "skuMarketSalePrice": this.skuCommitData.skuMarketSalePrice,
                            "skuName": this.skuCommitData.skuName,
                            "skuSalePrice": this.skuCommitData.skuSalePrice,
                            "skuPromotionPrice": this.childData.promotionResp==null?this.skuCommitData.skuSalePrice:this.skuCommitData.skuSalePrice-this.childData.promotionResp.misDiscountPrice,
                            "skuShowNum": this.skuCommitData.skuShowNum,
                            "skuSpuId": this.childData.spuId,
                            "skuStopStatus": this.skuCommitData.skuStopStatus,
                            "spuCountryType": this.childData.spuCountryType,
                            "spuName": this.childData.spuName,
                            "spuPic": this.childData.spuPic,
                            "spuShelvesStatus": this.childData.spuShelvesStatus
                        });
                    }
                    localStorage.setItem("cartInfo",JSON.stringify(storage));
                }
                this.cartNum += parseInt(this.chosenNumberToCart);
                this.$vux.toast.text('成功加入购物车', 'middle');
                this.$store.commit('CHOSEN_SKU_DATA', {"chosenSKUData":"已选"+this.SKUColor+this.chosenNumber});
                this.showSKU = !this.showSKU;
            }else{
                let joinBool = true;
                this.cartData.forEach((val,index)=>{
                    if(val.orcSkuId==this.skuId){
                        if((this.chosenNumberToCart+val.orcNumber)>val.skuShowNum){
                            this.$vux.alert.show({
                                content: '购物车的该商品数量已超出库存，系统自动为你调整数量',
                            });
                            joinBool = false;
                            if(parseInt(val.skuShowNum-val.orcNumber)>0){
                                client.postWithHeader(apiConfig.API_GOODS_CREATE_CART,JSON.stringify({
                                    "orcMemberId": 0,
                                    "orcNumber": parseInt(val.skuShowNum-val.orcNumber),
                                    "orcSkuId": this.skuId
                                })).then( (data) => {
                                    if(data.code === 200){
                                        // this.cartNum += parseInt(this.chosenNumberToCart);
                                        this.$vux.toast.text('成功加入购物车', 'middle');
                                        this.$store.commit('CHOSEN_SKU_DATA', {"chosenSKUData":"已选"+this.SKUColor+this.chosenNumber});
                                        this.showSKU = !this.showSKU;
                                        this.getCartList();
                                    } else {
                                        this.$vux.toast.text(data.msg, 'middle');
                                    }
                                }, (data)=>{
                                    this.$vux.toast.text(data.msg, 'middle');
                                });
                            }
                        }
                    }
                });
                if(joinBool){
                    client.postWithHeader(apiConfig.API_GOODS_CREATE_CART,JSON.stringify({
                        "orcMemberId": 0,
                        "orcNumber": this.chosenNumberToCart,
                        "orcSkuId": this.skuId
                    })).then( (data) => {
                        if(data.code === 200){
                            // this.cartNum += parseInt(this.chosenNumberToCart);
                            this.$vux.toast.text('成功加入购物车', 'middle');
                            this.$store.commit('CHOSEN_SKU_DATA', {"chosenSKUData":"已选"+this.SKUColor+this.chosenNumber});
                            this.showSKU = !this.showSKU;
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
        buyNow() { //立刻购买
            this.$bridge.trackData({ id: '701012', title: '点击规格页面立即购买' });
            if(this.SKUColor === null){
                this.$vux.toast.text('你还没有选择规格哦！', 'middle');
                return;
            }
            if(this.chosenNumber === null){
                this.$vux.toast.text('你还没有选择数量哦！', 'middle');
                return;
            }
            if(this.chosenNumberToCart > this.SKUData[this.chosenIndex].skuShowNum){
                this.$vux.toast.text('数量超出范围!', 'middle');
                return;
            }
            if(window.userInfo.authorization==""){
                this.$bridge.showLogin();
                this.$bridge.register('buyNowToLogin', (data) => {
                    if (data.type == 2) {
                        window.userInfo = data.data;
                        // 登录完成通知网页
                        if(localStorage.getItem("cartInfo")!=null&&localStorage.getItem("cartInfo")!=""){
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
                                } else {
                                    this_.$vux.toast.text(data.msg, 'middle');
                                }
                            }, (data) => {
                                this_.$vux.toast.text(data.msg, 'middle');
                            });
                        }
                        this.commitData.push({
                            coupons: [],
                            orcId:"",
                            orcMemberId: "",
                            orcNumber: this.chosenNumberToCart,
                            orcSkuId: this.skuId,
                            skuMarketSalePrice: this.skuCommitData.skuMarketSalePrice,
                            skuName: this.skuCommitData.skuName,
                            skuPromotionPrice: this.childData.promotionResp==null?this.skuCommitData.skuSalePrice:this.skuCommitData.skuSalePrice-this.childData.promotionResp.misDiscountPrice,
                            skuSalePrice: this.skuCommitData.skuSalePrice,
                            skuShowNum: this.skuCommitData.skuShowNum,
                            skuSpuId: this.childData.spuId,
                            skuStopStatus: this.skuCommitData.skuStopStatus,
                            spuCountryType: this.childData.spuCountryType,
                            spuName: this.childData.spuName,
                            spuPic: this.childData.spuPic,
                            spuShelvesStatus: this.childData.spuShelvesStatus
                        });
                        this.$store.commit('CHOSEN_CART_LIST', { cartList: this.commitData, totalPrice: (this.skuCommitData.skuSalePrice*this.chosenNumberToCart) });
                        this.$store.commit('INVOICE_MESSAGE', {"invoiceMessage":null});
                        this.$store.commit('ORDER_FREIGHT', { "orderFreight": null });
                        this.$store.commit('CHOSEN_COUPON', {"chosenCoupon": null});
                        this.$store.commit('CHOSEN_DELIVERY_ADDRESS', {"chosenDeliveryAddress":null});
                        this.$router.push("/fillInOrder");
                        this.$store.commit('GIFT_CARD_CHOSEN', {"giftCardChosen": null, "totalBalance": null});
                    }
                })
            }else{
                this.commitData.push({
                    coupons: [],
                    orcId:"",
                    orcMemberId: "",
                    orcNumber: this.chosenNumberToCart,
                    orcSkuId: this.skuId,
                    skuMarketSalePrice: this.skuCommitData.skuMarketSalePrice,
                    skuName: this.skuCommitData.skuName,
                    skuPromotionPrice: this.childData.promotionResp==null?this.skuCommitData.skuSalePrice:this.skuCommitData.skuSalePrice-this.childData.promotionResp.misDiscountPrice,
                    skuSalePrice: this.skuCommitData.skuSalePrice,
                    skuShowNum: this.skuCommitData.skuShowNum,
                    skuSpuId: this.childData.spuId,
                    skuStopStatus: this.skuCommitData.skuStopStatus,
                    spuCountryType: this.childData.spuCountryType,
                    spuName: this.childData.spuName,
                    spuPic: this.childData.spuPic,
                    spuShelvesStatus: this.childData.spuShelvesStatus
                });
                this.$store.commit('CHOSEN_CART_LIST', { cartList: this.commitData, totalPrice: (this.skuCommitData.skuSalePrice*this.chosenNumberToCart) });
                this.$store.commit('INVOICE_MESSAGE', {"invoiceMessage":null});
                this.$store.commit('ORDER_FREIGHT', { "orderFreight": null });
                this.$store.commit('CHOSEN_COUPON', {"chosenCoupon": null});
                this.$store.commit('CHOSEN_DELIVERY_ADDRESS', {"chosenDeliveryAddress":null});
                this.$router.push("/fillInOrder");
                this.$store.commit('GIFT_CARD_CHOSEN', {"giftCardChosen": null, "totalBalance": null});
            }
        },
        changeSKUList(data) {
            this.childData = data.data;
            this.SKUData = data.data.skuList;
            if(this.SKUData.length==1){
                if(this.SKUData[0].skuAtrr==""){
                    this.skuDefaultValue=this.SKUData[0].skuName;
                    this.SKUColor = "“" + this.SKUData[0].skuName + "” ";
                }else{
                    this.skuDefaultValue=this.SKUData[0].skuAtrr;
                    this.SKUColor = "“" + this.SKUData[0].skuAtrr + "” ";
                }                
                this.Specifications = "已选：";
                this.chosenIndex = 0;
                this.chosenShowNum = this.SKUData[0].skuShowNum;
                this.skuId = this.SKUData[0].skuId;
                this.skuCommitData = this.SKUData[0];
            }
            data.data.skuList.forEach((val,index)=>{
                if(this.chosenShowNum==0&&val.skuShowNum>0){
                    this.chosenShowNum = val.skuShowNum;
                    return;
                }
            });
            //设置分享信息
            this.$bridge.setShareInfo({
                'title': this.childData.spuName,
                'desc': '我在丰盛榜发现了一个不错的商品，赶紧来看看吧。',
                'url': this.childData.spuShareUrl,
                'imgUrl': this.childData.spuPic+'?x-oss-process=image/resize,p_10'
                // 'imgUrl': 'https://timgsa.baidu.com/timg?image=&quality=80&size=b9999_10000&sec=1508750364564&di=eca853304d431ac1ede472cae4b7eb60&imgtype=0&src=http%3A%2F%2Fwww.itouxiang.net%2Fuploads%2Fallimg%2F20151215%2F04080645375549.jpg'
            })
            // this.chosenShowNum = data.data.skuList[0].skuShowNum;
        },
        getCartList() { //获取购物车信息
            if(window.userInfo.authorization==""){
                let storage = localStorage.getItem("cartInfo");
                if(storage!=""&&storage!=null){
                    storage=JSON.parse(storage);
                    storage.forEach((val,index)=>{
                        this.cartNum += val.orcNumber;
                    });
                }
            }else{
                client.postWithHeader(apiConfig.API_GOODS_CART_LIST,{}).then( (data) => {
                    this.$vux.loading.hide();
                    if(data.code === 200){
                        this.cartData = data.data;
                        this.cartNum = 0;
                        if(data.data.length!=0){
                            data.data.forEach((val,index)=>{
                                if(val.skuShowNum!=0&&val.spuShelvesStatus==1){
                                    this.cartNum += val.orcNumber;
                                }
                            })
                        }
                    } else {
                        this.$vux.toast.text(data.msg, 'middle');
                    }
                }, (data)=>{
                    this.$vux.loading.hide();
                    this.$vux.toast.text(data.msg, 'middle');
                });
            }
        },
        checkCollect() { //API_GOODS_COLLECT_STATE
            let options = {"spuId": this.$route.params.spuId};
            client.post(apiConfig.API_GOODS_COLLECT_STATE, options).then( (data) => {
                this.$vux.loading.hide();
                if(data.code === 200){
                    data.data.collectStatus==0?this.isCollected=false:this.isCollected=true;
                } else {
                    this.$vux.toast.text(data.msg, 'middle');
                }
            }, (data)=>{
                this.$vux.loading.hide();
                this.$vux.toast.text(data.msg, 'middle');
            });
        },
        collectGoods() {
            if(window.userInfo.authorization==""){
                this.$bridge.showLogin();
                this.$bridge.register('collectGoodsToLogin', (data) => {
                    if (data.type == 2) {
                        window.userInfo = data.data;
                        // 登录完成通知网页
                        this.collectGoodsFn();
                    }
                })
            }else{
                this.collectGoodsFn();
            }
            
        },
        collectGoodsFn() {
            let options = {"collectList": [{
                "enableStatus": this.isCollected?0:1,
                "spuId": this.$route.params.spuId
                }
            ]};
            client.post(apiConfig.API_GOODS_COLLECT, options).then((data) => {
                if (data.code === 200) {
                    if(this.isCollected){
                        this.$vux.alert.show({
                            content: '取消收藏成功！',
                        });
                    } else {
                        this.$vux.alert.show({
                            content: '收藏成功！',
                        });
                    }
                    this.isCollected = !this.isCollected;
                    
                } else {
                    this_.$vux.toast.text(data.msg, 'middle');
                }
            }, (data) => {
                this_.$vux.toast.text(data.msg, 'middle');
            });
        },
        contactCustomer() {
            this.$bridge.kefu({
                'title': this.childData.spuName,
                'desc': '我在丰盛榜发现了一个不错的商品',
                'url': location.href.split("#")[0]+'#/detail/'+this.$route.params.spuId,
                'imgUrl': this.childData.spuPic+'?x-oss-process=image/resize,p_10'
            })
        },
    },
}
</script>

<style lang="less">
@import '../../common/styles/index.less';
html,body {
    background-color: #f7f7f7;
}
.container {
    position: inherit;
    overflow: hidden;
}
.car-menu {
    height: 98/@r;
    width: 100%;
    position: fixed;
    bottom: 0;
    left: 0;
    background-color: #ffffff;
    border-top: 2/@r solid #e4e4e4;
    display: table;
    .noGoods {
        text-align: center;
        border-bottom: 2/@r solid #e4e4e4;
    }
    .car-menu-cart {
        width: 42.7%;
        float: left;
        position: relative;
        overflow: hidden;
        height: 100%;
        text-align: center;
        a {
            width: 25%;
            display: inline-block;
            height: 100%;
            line-height: 40/@r;
            // float: left;
            // overflow: hidden;
            position: relative;
            text-align: center;
            em {
                width: 54/@r;
                height: 54/@r;
                display: block;
                margin: 0 auto;
                margin-top: 10/@r;
                // margin-bottom: 8/@r;
                position: relative;
            }
            .car-menu-cart-customer {
                background: url(../../assets/ic_54_kefu@3x.png) center center no-repeat;
                background-color: #fff;
                background-size: 54/@r 54/@r;
            }
            .car-menu-cart-collect {
                background: url(../../assets/ic_54_selected.png) center center no-repeat;
                background-color: #fff;
                background-size: 54/@r 54/@r;
            }
            .car-menu-cart-collect-no {
                background: url(../../assets/ic_54_collect@3x.png) center center no-repeat;
                background-color: #fff;
                background-size: 54/@r 54/@r;
            }
            .car-menu-cart-cart {
                background: url(../../assets/ic_54_shoppingcart@3x.png) center center no-repeat;
                background-color: #fff;
                background-size: 54/@r 54/@r;
            }
            span {
                font-size: 22/@r;
                color: #4a4a4a;
            }
            sup {
                position: absolute;
                top: -2/@r;
                left: 80%;
                -webkit-transform: translateX(-50%);
                transform: translateX(-50%);
                z-index: 1001;
                span {
                    padding: 0;
                    display: inline-block;
                    text-align: center;
                    background: #f93473;
                    color: #fff;
                    font-size: 24/@r;
                    height: 30/@r;
                    line-height: 30/@r;
                    border-radius: 16/@r;
                    padding: 0 8/@r;
                    background-clip: padding-box;
                    vertical-align: middle;
                }
            }
        }
    }
    .car-menu-action {
        width: 57.3%;
        float: left;
        height: 100%;
        overflow: hidden;
        a {
            color: #ffffff;
            font-size: 30/@r;
            display: inline-block;
            height: 100%;
            line-height: 110/@r;
            float: left;
            overflow: hidden;
            // position: relative;
            text-align: center;
        }
        .car-menu-action-cart {
            width: 50%;
            background-color: #04c5b4;
        }
        .car-menu-action-buy {
            width: 50%;
            background-color: #f93473;
        }
        .car-menu-action-other {
            width: 80%;
            float: right;
            background-color: #4bc6b1;
        }
    }
}
.SKU-top {
    min-height: 200/@r;
    width: 100%;
    position: relative;
    border-bottom: 2/@r solid #e4e4e4;
    .SKU-top-left {
        width: 27.5%;
        height: 100%;
        text-align: center;
        float: left;
        display: inline-block;
        img{
            width: 160/@r;
            height: 160/@r;
            margin-top: 12/@r;
        }
    }
    .SKU-top-right{
        width: 72%;
        height: 100%;
        // float: left;
        display: inline-block;
        .SKU-top-right-price{
            color: #f93473;
            font-size: 30/@r;
            font-weight: bold;
        }
        .SKU-top-right-chosen {
            color: #9b9b9b;
            font-size: 24/@r;
        }
    }
    .SKU-top-close {
        position: absolute;
        right: 0;
        top: 0;
        padding: 35/@r;
        img {
            height: 25/@r;
            width: 25/@r;
        }
    }
}
.SKU-middle {
    padding: 0 25/@r 30/@r;
    .SKU-middle-color {
        margin-top: 45/@r;
        h3 {
            color: #4a4a4a;
            margin: 35/@r 0;
        }
        .SKU-middle-color-wrapper {
            max-height: 400/@r;
            overflow: auto;
        }
        .SKU-middle-color-item{
            background-color: #fbfbfb;
            color: #9b9b9b;
            border: 1px solid #9b9b9b;
            min-width: 100/@r;
            border-radius: 10/@r;
            text-align: center;
            margin-right: 20/@r;
            margin-top: 10/@r;
            font-size: 24/@r;
            padding: 15/@r 20/@r;
        }
        .SKU-middle-color-item-selected {
            background-color: #4bc6b1;
            border: 1px solid #4bc6b1;
            color: #ffffff;
        }
        .SKU-middle-color-item-disabled {
            border: 1px dashed #9b9b9b;
            text-align: center;
            color: #9b9b9b;
            opacity: 0.7;
        }
    }
    .SKU-middle-number {
        display: flex;
        justify-content: space-between;
        margin-top: 40/@r;
        .SKU-middle-number-left{
            h3 {
                margin-bottom: 15/@r;
            }
            p {
                color: #9b9b9b;
                margin-top: 0;
            }
        }
        .SKU-middle-number-right {
            margin-top: 20/@r;
        }
    }
}
.SKU-bottom {
    height: 100/@r;
    width: 100%;
    a {
        width: 50%;
        height: 100%;
        color: #ffffff;
        font-size: 34/@r;
        text-align: center;
        line-height: 100/@r;
        float: left;
    }
    .SKU-bottom-j {
        background-color: #4bc6b1;
    }
    .SKU-bottom-b {
        background-color: #f93473;
    }
    .SKU-bottom-o {
        width: 100%;
        background-color: #4bc6b1;
    }
}

// 修改vux的inline-x-number组件样式
div > .vux-number-selector {
    height: 50/@r;
    svg {
        height: 50/@r;
        fill: #f93473;
    }
}
div > .vux-number-input {
    height: 50/@r;
}

.btn-active {
    &:active {
        // background: #F30;
        opacity: 0.5;
    }
}

// 防止点击popup组件后自动滚动到顶部
html>.vux-modal-open{
    position: inherit;
}
</style>
