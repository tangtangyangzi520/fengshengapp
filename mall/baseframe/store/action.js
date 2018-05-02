import config from '../config';

// 初始化接口
const GET_INIT = config.apiHost + 'init';

export default {
    initData: ({ commit, state }) => {
        commit('INIT_DATA', {
            data: Date.now()
        });
        // client.getData('http://operating-activities.putao.com/happyfriday?active_topic_id=4', {}).then((data) => {
        //     commit('INIT_DATA', {
        //         data
        //     });
        // });
    }
};