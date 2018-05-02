<template>
    <div class="page page-modal">
        <div class="page-modal-content">
            <h2>游戏规则</h2>
            <tween>
                <router-link to="/" class="btn btn-back">返回</router-link>
            </tween>
            <router-link to="/game" class="btn">进入游戏</router-link>
        </div>
    </div>
</template>

<script>
import { tween } from '../../../common/components/'
import {
    mapState,
    mapActions
} from 'vuex'
export default {
    name: 'home',
    components: { tween },
    computed: mapState({
        initTime: state => state.initTime
    }),
    created() {
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
