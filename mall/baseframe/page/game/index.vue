<template>
    <div class="page">
        <h2>游戏页面</h2>
        <div class="center">
            <router-link to="/" class="btn">返回首页</router-link>
            <router-link to="/result" class="btn">结束游戏</router-link>
        </div>
        <transition name="slide-down">
            <router-view></router-view>
        </transition>
    </div>
</template>

<script>
import {
    mapState,
    mapActions
} from 'vuex';
export default {
    name: 'home',
    components: {},
    computed: mapState({
        initTime: state => state.initTime
    }),
    created () {
        this.$store.dispatch('initData');
    }
};
</script>

<style lang="less" scoped>
@import "./index.less";
</style>
