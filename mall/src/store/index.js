import Vue from 'vue';
import Vuex from 'vuex';
import mutations from './mutations';
import actions from './action';


Vue.use(Vuex);

const state = {
    initTime: 0,
    showRule: false,
    isLoading: false,
    direction: 'forward',
    chosenCartListData: null,
    chosenCartListPriceData: 0,
    invoiceMessage: null,
    chosenCoupon: null,
    chosenSKUData: null,
    chosenDeliveryAddress: null,
    paymentOrderInformation: null,
    orderFreight: null,
    cartListChosen: null,
    giftCardChosen: null,
};

export default new Vuex.Store({
    state,
    actions,
    mutations
});