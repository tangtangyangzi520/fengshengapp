<template>
    <div class="weui_loading_toast active" v-if="show">
        <div class="weui_mask_transparent"></div>
        <div class="weui_toast">
            <div class="weui_loading">
                <div class="weui_loading_leaf weui_loading_leaf_0"></div>
                <div class="weui_loading_leaf weui_loading_leaf_1"></div>
                <div class="weui_loading_leaf weui_loading_leaf_2"></div>
                <div class="weui_loading_leaf weui_loading_leaf_3"></div>
                <div class="weui_loading_leaf weui_loading_leaf_4"></div>
                <div class="weui_loading_leaf weui_loading_leaf_5"></div>
                <div class="weui_loading_leaf weui_loading_leaf_6"></div>
                <div class="weui_loading_leaf weui_loading_leaf_7"></div>
                <div class="weui_loading_leaf weui_loading_leaf_8"></div>
                <div class="weui_loading_leaf weui_loading_leaf_9"></div>
                <div class="weui_loading_leaf weui_loading_leaf_10"></div>
                <div class="weui_loading_leaf weui_loading_leaf_11"></div>
            </div>
            <p class="weui_toast_content">{{content}}</p>
        </div>
    </div>
</template>

<script>
export default {
    name: 'loadingToast',
    props: {
        show: {
            type: Boolean,
            default: false,
        },
        content: {
            type: String,
            default: 'loading...'
        }
    },
    created() {

    }
}
</script>

<style lang="less" scoped>
@import "../../styles/common.less";
.toast {
    min-width: 320/@r;
    max-width: 85%;
    background: rgba(0, 0, 0, .8);
    border-radius: 15/@r;
    z-index: 1001;
    position: fixed;
    padding: 15/@r 25/@r;
    font-size: 26/@r;
    color: #FFF;
    line-height: 44/@r;
    left: 50%;
    top: 50%;
    text-align: center;
    transform: translate(-50%, -40%);
    opacity: 0;
    &.active {
        -webkit-transition-duration: .5s;
        transform: translate(-50%, -50%);
        opacity: 1;
    }
}

.weui_toast {
    position: fixed;
    z-index: 3;
    width: 180/@r;
    min-height: 180/@r;
    top: 50%;
    left: 50%;
    margin-left: -90/@r;
    margin-top: -90/@r;
    background: rgba(40, 40, 40, 0.75);
    text-align: center;
    border-radius: 25/@r;
    color: #FFFFFF;
}

.weui_icon_toast {
    margin: 22/@r 0 0;
    display: block;
    &:before {
        content: '\EA08';
        color: #FFFFFF;
        font-size: 55/@r;
    }
}

.weui_toast_content {
    margin: 0 0 15/@r;
}

// loading toast
.weui_loading_toast {
    z-index: 10000001;
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    .icon-check {
        font-size: 90/@r;
        position: absolute;
        top: 17%;
        margin-left: -52/@r;
        left: 50%;
        color: #FFF;
        text-align: center;
    }
    .weui_toast_content {
        margin-top: 64%;
        font-size: 22/@r;
        color: #FFF;
    }
}

.weui_loading {
    position: absolute;
    width: 0/@r;
    z-index: 2000000000;
    left: 50%;
    top: 38%;
    transform: scale(1.5);
}

.weui_loading_leaf {
    position: absolute;
    top: -1/@r;
    opacity: 0.25;
    &:before {
        content: " ";
        position: absolute;
        width: 8.14/@r;
        height: 3.08/@r;
        background: rgb(209, 209, 213);
        box-shadow: rgba(0, 0, 0, 0.0980392) 0/@r 0/@r 1/@r;
        border-radius: 1/@r;
        transform-origin: left 50% 0/@r;
    }
    &_0 {
        animation: opacity-60-25-0-12 1.25s linear infinite;
        &:before {
            transform: rotate(0deg) translate(7.92/@r, 0/@r);
        }
    }
    &_1 {
        animation: opacity-60-25-1-12 1.25s linear infinite;
        &:before {
            transform: rotate(30deg) translate(7.92/@r, 0/@r);
        }
    }
    &_2 {
        animation: opacity-60-25-2-12 1.25s linear infinite;
        &:before {
            transform: rotate(60deg) translate(7.92/@r, 0/@r);
        }
    }
    &_3 {
        animation: opacity-60-25-3-12 1.25s linear infinite;
        &:before {
            transform: rotate(90deg) translate(7.92/@r, 0/@r);
        }
    }
    &_4 {
        animation: opacity-60-25-4-12 1.25s linear infinite;
        &:before {
            transform: rotate(120deg) translate(7.92/@r, 0/@r);
        }
    }
    &_5 {
        animation: opacity-60-25-5-12 1.25s linear infinite;
        &:before {
            transform: rotate(150deg) translate(7.92/@r, 0/@r);
        }
    }
    &_6 {
        animation: opacity-60-25-6-12 1.25s linear infinite;
        &:before {
            transform: rotate(180deg) translate(7.92/@r, 0/@r);
        }
    }
    &_7 {
        animation: opacity-60-25-7-12 1.25s linear infinite;
        &:before {
            transform: rotate(210deg) translate(7.92/@r, 0/@r);
        }
    }
    &_8 {
        animation: opacity-60-25-8-12 1.25s linear infinite;
        &:before {
            transform: rotate(240deg) translate(7.92/@r, 0/@r);
        }
    }
    &_9 {
        animation: opacity-60-25-9-12 1.25s linear infinite;
        &:before {
            transform: rotate(270deg) translate(7.92/@r, 0/@r);
        }
    }
    &_10 {
        animation: opacity-60-25-10-12 1.25s linear infinite;
        &:before {
            transform: rotate(300deg) translate(7.92/@r, 0/@r);
        }
    }
    &_11 {
        animation: opacity-60-25-11-12 1.25s linear infinite;
        &:before {
            transform: rotate(330deg) translate(7.92/@r, 0/@r);
        }
    }
}

@-webkit-keyframes opacity-60-25-0-12 {
    0% {
        opacity: 0.25;
    }
    0.01% {
        opacity: 0.25;
    }
    0.02% {
        opacity: 1;
    }
    60.01% {
        opacity: 0.25;
    }
    100% {
        opacity: 0.25;
    }
}

@-webkit-keyframes opacity-60-25-1-12 {
    0% {
        opacity: 0.25;
    }
    8.34333% {
        opacity: 0.25;
    }
    8.35333% {
        opacity: 1;
    }
    68.3433% {
        opacity: 0.25;
    }
    100% {
        opacity: 0.25;
    }
}

@-webkit-keyframes opacity-60-25-2-12 {
    0% {
        opacity: 0.25;
    }
    16.6767% {
        opacity: 0.25;
    }
    16.6867% {
        opacity: 1;
    }
    76.6767% {
        opacity: 0.25;
    }
    100% {
        opacity: 0.25;
    }
}

@-webkit-keyframes opacity-60-25-3-12 {
    0% {
        opacity: 0.25;
    }
    25.01% {
        opacity: 0.25;
    }
    25.02% {
        opacity: 1;
    }
    85.01% {
        opacity: 0.25;
    }
    100% {
        opacity: 0.25;
    }
}

@-webkit-keyframes opacity-60-25-4-12 {
    0% {
        opacity: 0.25;
    }
    33.3433% {
        opacity: 0.25;
    }
    33.3533% {
        opacity: 1;
    }
    93.3433% {
        opacity: 0.25;
    }
    100% {
        opacity: 0.25;
    }
}

@-webkit-keyframes opacity-60-25-5-12 {
    0% {
        opacity: 0.270958333333333;
    }
    41.6767% {
        opacity: 0.25;
    }
    41.6867% {
        opacity: 1;
    }
    1.67667% {
        opacity: 0.25;
    }
    100% {
        opacity: 0.270958333333333;
    }
}

@-webkit-keyframes opacity-60-25-6-12 {
    0% {
        opacity: 0.375125;
    }
    50.01% {
        opacity: 0.25;
    }
    50.02% {
        opacity: 1;
    }
    10.01% {
        opacity: 0.25;
    }
    100% {
        opacity: 0.375125;
    }
}

@-webkit-keyframes opacity-60-25-7-12 {
    0% {
        opacity: 0.479291666666667;
    }
    58.3433% {
        opacity: 0.25;
    }
    58.3533% {
        opacity: 1;
    }
    18.3433% {
        opacity: 0.25;
    }
    100% {
        opacity: 0.479291666666667;
    }
}

@-webkit-keyframes opacity-60-25-8-12 {
    0% {
        opacity: 0.583458333333333;
    }
    66.6767% {
        opacity: 0.25;
    }
    66.6867% {
        opacity: 1;
    }
    26.6767% {
        opacity: 0.25;
    }
    100% {
        opacity: 0.583458333333333;
    }
}

@-webkit-keyframes opacity-60-25-9-12 {
    0% {
        opacity: 0.687625;
    }
    75.01% {
        opacity: 0.25;
    }
    75.02% {
        opacity: 1;
    }
    35.01% {
        opacity: 0.25;
    }
    100% {
        opacity: 0.687625;
    }
}

@-webkit-keyframes opacity-60-25-10-12 {
    0% {
        opacity: 0.791791666666667;
    }
    83.3433% {
        opacity: 0.25;
    }
    83.3533% {
        opacity: 1;
    }
    43.3433% {
        opacity: 0.25;
    }
    100% {
        opacity: 0.791791666666667;
    }
}

@-webkit-keyframes opacity-60-25-11-12 {
    0% {
        opacity: 0.895958333333333;
    }
    91.6767% {
        opacity: 0.25;
    }
    91.6867% {
        opacity: 1;
    }
    51.6767% {
        opacity: 0.25;
    }
    100% {
        opacity: 0.895958333333333;
    }
}
</style>
