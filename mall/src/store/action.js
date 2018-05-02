// import config from '../config';
// 
// 初始化接口
// const GET_INIT = config.apiHost + 'init';

import client from '../common/utils/client'
import apiConfig from '../common/api.config'

export default {
    initData: ({ commit, state }) => {
        // client.getData('http://operating-activities.putao.com/happyfriday?active_topic_id=4', {}).then((data) => {
        //     commit('INIT_DATA', {
        //         data
        //     });
        // });
    },
    getFreight: ({ commit, state }, madProvince) => {
        let objData = '{';
        state.chosenCartListData.forEach((val, index) => {
            objData += '"' + val.skuSpuId + '"' + ":" + val.orcNumber + ',';
        });
        objData = objData.substring(0, objData.length - 1);
        objData += '}';
        client.postWithHeaderNoAuth(apiConfig.API_GOODS_GET_FREIGHT + "?area=" + madProvince, objData).then((data) => {
            if (data.code === 200) {
                console.log(data);
                commit('ORDER_FREIGHT', { "orderFreight": data.data });
            } else {
                this.$vux.toast.text(data.msg, 'middle');
            }
        }, (data) => {

            this.$vux.toast.text(data.msg, 'middle');
        });
    },
};