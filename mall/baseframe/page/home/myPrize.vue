<template>
    <div class="page page-modal">
        <div class="page-modal-content">
            <h2>我的奖品</h2>
            <router-link to="/" class="btn btn-back">返回</router-link>
            <router-link to="/game" class="btn">进入游戏</router-link>
        </div>
    </div>
</template>

<script>
import {
    mapState,
    mapActions
} from 'vuex'
export default {
    name: 'home',
    components: {},
    computed: mapState({
        initTime: state => state.initTime
    }),
    created () {
        this.$store.dispatch('initData')
    }
}
</script>

<style lang="less" scoped>
.page-modal-content {
    padding: 0.1rem;
    .btn {
        width: 48%;
    }
}
</style>
