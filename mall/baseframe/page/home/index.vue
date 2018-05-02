<template>
    <div>
        <div class="page">
            <h2>首页</h2>
            <router-link to="/rule" class="btn btn-rule">活动规则</router-link>
            <router-link to="/myPrize" class="btn btn-prize">我的奖品</router-link>
            <router-link to="/game" class="btn btn-start">进入活动</router-link>
            <transition name="fade-in">
                <router-view></router-view>
            </transition>
        </div>
    </div>
</template>

<script>
import {
    mapState
} from 'vuex'
export default {
    name: 'home',
    data() {
        return {
            tween1: {}
        }
    },
    components: {  },
    computed: mapState({
        initTime: state => state.initTime
    }),
    methods: {
        showNextTween() {

        }
    },
    created() {
        this.$store.dispatch('initData');
    }
}
</script>

<style lang="less" scoped>
@import "./index.less";
</style>
