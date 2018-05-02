<template>
    <div class="weui_dialog_confirm " style="z-index:100001;" v-if="show">
        <div class="weui_mask"></div>
        <div class="weui_dialog " :class="{active:animatein}">
            <div class="weui_dialog_bd">
                <slot></slot>
            </div>
            <div class="weui_dialog_ft">
                <a href="javascript:;" class="weui_btn_dialog primary jsOk" @click="onhide">{{btn}}</a>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        show: Boolean,
        content: {
            type: String,
            default: '确定吗？'
        },
        btn: {
            type: String,
            default: '确定'
        },
        onhide: Function
    },
    data() {
        return {
            animatein: false,
        }
    },
    methods: {

    },
    created() {

    },
    watch: {
        show() {
            if (this.show) {
                setTimeout(() => {
                    this.animatein = true;
                }, 100)
            } else {
                this.animatein = false;
            }
        }
    }
}
</script>

<style lang="less" scoped>
@r: 200/1rem;
.weui_dialog_confirm {
    z-index: 100001;
    width: 100%;
    height: 100%;
    position: fixed;
}

.weui_dialog {
    position: fixed;
    z-index: 100001;
    width: 85%;
    top: 50%;
    left: 0;
    margin-top: -80/@r;
    margin-left: 7.5%;
    opacity: 0;
    &.active {
        -webkit-transition-duration: .5s;
        margin-left: 7.5%;
        margin-top: -100/@r;
        opacity: 1;
    }
    background-color: #FFF;
    text-align: center;
    border-radius: 25/@r;
    .weui_dialog_confirm & {
        .weui_dialog_hd {
            padding: 40/@r 0 25/@r 0;
        }
        .weui_dialog_bd {
            text-align: center;
        }
    }
}

.weui_dialog_title {
    font-weight: normal;
    font-size: 26/@r;
    color: #999;
}

.weui_dialog_bd {
    padding: 40/@r 20/@r 30/@r 20/@r;
    font-size: 26/@r;
    color: #333;
    line-height: 44/@r;
}

.weui_dialog_ft {
    position: relative;
    line-height: 40/@r;
    font-size: 28/@r;
    display: flex;
    margin-top: 10/@r;
    border-top: 0.01rem solid #CCC;
    a {
        display: block;
        flex: 1;
        height: 80/@r;
        line-height: 80/@r;
        color: #3CC51F;
        text-decoration: none;
        border-right: 1/@r solid #CCC;
        &:active {
            background-color: #EEEEEE;
        }
        &:last-child {
            border-right: none;
            border-bottom-right-radius: 25/@r;
        }
        &:first-child {
            border-bottom-left-radius: 25/@r;
        }
    }
    &:after {
        content: " ";
    }
    .weui_dialog_confirm & {
        a {
            position: relative;
            &:after {
                content: " ";
            }
            &:first-child {
                &:after {
                    display: none;
                }
            }
        }
    }
}

.weui_btn_dialog {
    &.default {
        color: #353535;
    }
    &.primary {
        color: #5393E0;
    }
}

.weui_mask {
    position: fixed;
    z-index: 1;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background: rgba(0, 0, 0, .6);
}

.weui_mask_transparent {
    position: fixed;
    z-index: 1;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
}

.weui_mask_transition {
    display: none;
    position: fixed;
    z-index: 100001;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background: rgba(0, 0, 0, 0);
    transition: background .3s;
}

.weui_fade_toggle {
    background: rgba(0, 0, 0, .6);
}
</style>
