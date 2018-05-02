<template>
    <transition name="fade-in-fast" v-if="show">
        <div class="page page-modal">
            <div class="page-modal-content">
                <a class="absolute btn-close" @click="onhide">返回</a>
                <div class="inner">
                    <slot></slot>
                </div>
            </div>
        </div>
    </transition>
</template>

<script>
import {
    mapState,
    mapActions
} from 'vuex'
export default {
    name: 'dialog',
    props: {
        show: Boolean,
        onhide: Function,
    },
    components: {},
    computed: mapState({
        initTime: state => state.initTime
    }),
    data() {
        return {
            type: this.$route.params.type,
            disabled: true
        }
    },
    methods: {
    },
    created() {
        this.$store.dispatch('initData')
    }
}
</script>

<style lang="less" scoped>
@import "../../styles/common.less";
.page-modal-content {
    border-radius: 0;
    padding: 0.1rem;
    width: 571/@r;
    height: 738/@r;
    margin-top: -370/@r;
    // background: url(../../images/dialog-bg.png) center center no-repeat;
    background-size: 100% auto;
    .btn-close {
        width: 72/@r;
        height: 72/@r;
        // background: url(../../images/btn-close.png) center center no-repeat;
        background-size: 100% auto;
        right: 0;
        top: -25/@r;
        text-indent: -1000rem;
    }
    .inner {
        position: relative;
        width: 94%;
        height: 360/@r;
        left: 3%;
        top: 320/@r;
        overflow: auto;
        -webkit-overflow-scrolling: touch;
        text-align: center;
    }
    p {
        color: #000;
        line-height: 44/@r;
        font-size: 28/@r;
        margin: 0;
    }
}
</style>
