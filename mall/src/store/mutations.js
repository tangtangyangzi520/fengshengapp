const INIT_DATA = 'INIT_DATA';
const SHOW_RULE = 'SHOW_RULE';
const UPDATE_LOADING = 'UPDATE_LOADING';
const UPDATE_DIRECTION = 'UPDATE_DIRECTION';
const CHOSEN_CART_LIST = 'CHOSEN_CART_LIST';
const INVOICE_MESSAGE = 'INVOICE_MESSAGE';
const CHOSEN_COUPON = 'CHOSEN_COUPON';
const CHOSEN_SKU_DATA = 'CHOSEN_SKU_DATA';
const CHOSEN_DELIVERY_ADDRESS = 'CHOSEN_DELIVERY_ADDRESS';
const PAYMENT_ORDER_INFORMATION = 'PAYMENT_ORDER_INFORMATION';
const ORDER_FREIGHT = 'ORDER_FREIGHT';
const CART_LIST_CHOSEN = 'CART_LIST_CHOSEN';
const GIFT_CARD_CHOSEN = 'GIFT_CARD_CHOSEN';

export default {
    [INIT_DATA](state, payload) {
        state.initTime = payload.data;
    },
    [SHOW_RULE](state, payload) {
        state.showRule = payload;
    },
    [UPDATE_LOADING](state, status) {
        state.isLoading = status
    },
    [UPDATE_DIRECTION](state, direction) {
        state.direction = direction
    },
    [CHOSEN_CART_LIST](state, status) {
        state.chosenCartListData = status.cartList;
        state.chosenCartListPriceData = status.totalPrice;
    },
    [INVOICE_MESSAGE](state, status) {
        state.invoiceMessage = status.invoiceMessage;
    },
    [CHOSEN_COUPON](state, status) {
        state.chosenCoupon = status.chosenCoupon;
    },
    [CHOSEN_SKU_DATA](state, status) {
        state.chosenSKUData = status.chosenSKUData;
    },
    [CHOSEN_DELIVERY_ADDRESS](state, status) {
        state.chosenDeliveryAddress = status.chosenDeliveryAddress;
    },
    [PAYMENT_ORDER_INFORMATION](state, status) {
        state.paymentOrderInformation = status.paymentOrderInformation;
    },
    [ORDER_FREIGHT](state, status) {
        state.orderFreight = status.orderFreight;
    },
    [CART_LIST_CHOSEN](state, status) {
        state.cartListChosen = status.cartListChosen;
    },
    [GIFT_CARD_CHOSEN](state, status) {
        state.giftCardChosen = status.giftCardChosen;
        state.totalBalance = status.totalBalance;
    },
};