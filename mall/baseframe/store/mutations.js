const INIT_DATA = 'INIT_DATA';

export default {
    [INIT_DATA](state, payload) {
        state.initTime = payload.data;
    }
};