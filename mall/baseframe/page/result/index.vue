<template>
    <div class="page page-result">
        <h2>游戏结果页面</h2>
        <div class="center">
            <router-link to="/" class="btn">返回首页</router-link>
            <router-link to="/game" class="btn">再玩一次</router-link>
            <router-link to="/result/share" class="btn">炫耀一下</router-link>
        </div>
        <transition name="fade-in">
			<router-view></router-view>
		</transition>
    </div>
</template>

<script>

export default {
    name: 'score',
    data () {
        return {
        };
    },
    methods: {
    },
    created () {
    }
};

</script>

<style lang="less">
.page-result {
}
</style>
