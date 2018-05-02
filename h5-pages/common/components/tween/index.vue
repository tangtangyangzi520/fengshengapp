<template>
    <transition>
        <slot></slot>
    </transition>
</template>

<script>
import dynamics from '../../libs/dynamics';
import utils from './utils';
import queue from './queue';
export default {
    props: {
        // 预定动画
        name: {
            type: String,
            default: ''
        },
        // 动画缓动曲线类型
        type: {
            type: String,
            default: 'spring'
        },
        // 摩擦系数
        friction: {
            type: Number,
            default: 200
        },
        // 动画频率
        frequency: {
            type: Number,
            default: 300
        },
        // 动画时间
        duration: {
            type: Number,
            default: 300
        },
        // 动画播放次数
        count: {
            tppe: Number,
            default: 1
        },
        // 动画播放过程回调
        change: {
            type: Function,
            default: () => { }
        },
        // 动画播放结束回调
        complete: {
            type: Function,
            default: () => { }
        },
        // 延迟播放动画的时间
        delay: {
            type: Number,
            default: 0
        },
        // 动画开始时刻的形态
        start: {
            type: Object,
            default: () => new Object()
        },
        // 动画结束时刻的形态
        end: {
            type: Object,
            default: () => new Object()
        },
        // 是否自动播放，默认都是自动播放动画
        autoplay: {
            type: Boolean,
            default: true
        },
        // 是否开始播放动画
        play: {
            type: Boolean,
            default: true
        },
        // 自定义复杂动画队列数据
        queque: {
            type: Array,
            default: () => new Array()
        },
        // 循环播放
        loop: {
            type: Boolean,
            default: false
        },
        size: {
            type: Number,
            default: 0
        },
        strength: {
            type: Number,
            default: 0
        }
    },
    data() {
        return {
            tData: [],
            tIndex: 0,
            timesCount: 0,
            prevStyle: {},     // 上次时间点的样式
            startStyle: '',    // 初始状态的样式
        }
    },
    methods: {
        // 轮循播放动画队列
        playQueue() {
            if (this.queque.length === 0) return;
            if (this.tIndex > this.queque.length - 1 && !this.loop) {
                return
            }
            if (this.tIndex > this.queque.length - 1 && this.loop) {
                this.tIndex = 0;
                this.$el.style.cssText = this.startStyle;
            }
            if (this.tIndex == 0) {
                this.startStyle = this.$el.style.cssText;
            }
            let item = this.queque[this.tIndex];
            this.timesCount = 0;
            if (!item.count && item.count != 0) {
                item.count = 1;
            }
            dynamics.animate(this.$el, item.start, {
                duration: 10, complete: () => {
                    for (let property in item.end) {
                        let style = window.getComputedStyle(this.$el, null);
                        if (typeof item.start[property] == 'undefined') {
                            if (utils.transformProperties.find(item => item == property)) {
                                this.prevStyle.transform = style.transform;
                            } else {
                                this.prevStyle[property] = style[property];
                            }
                        }
                    }
                    for (let property in item.start) {
                        if (typeof item.end[property] == 'undefined') {
                            item.end[property] = item.start[property];
                        }
                    }
                    this.playOnce(item);
                }
            })
        },
        // 播放单次动画
        playOnce(item) {
            if (isNaN(item.count) || item.count == 0) return;
            this.timesCount++;
            dynamics.animate(this.$el, item.start, { duration: 0 });
            dynamics.animate(this.$el, item.end, {
                type: dynamics[item.type ? item.type : this.type],
                frequency: item.frequency ? item.frequency : this.frequency,
                friction: item.friction ? item.friction : this.friction,
                duration: item.duration ? item.duration : this.duration,
                delay: item.delay ? item.delay : this.delay,
                change: item.change ? item.change : () => { },
                anticipationSize: item.size ? item.size : this.size,
                anticipationStrength: item.strength ? item.strength : this.strength,
                complete: () => {
                    let style = window.getComputedStyle(this.$el, null);
                    if (this.timesCount < item.count || item.count == -1) {
                        for (let property in this.prevStyle) {
                            this.$el.style[property] = this.prevStyle[property];
                        }
                        this.playOnce(item);
                    } else {
                        this.tIndex++;
                        if (this.tIndex <= this.queque.length - 1) {
                            let nextItem = this.queque[this.tIndex];
                            for (let property in item.end) {
                                if (typeof nextItem.end[property] == 'undefined') {
                                    nextItem.end[property] = item.end[property];
                                }
                            }
                        } else {
                            this.complete();
                            this.prevStyle = {};
                        }
                        this.timesCount = 0;
                        item.complete && item.complete();
                        this.playQueue();
                    }
                }
            })
        }
    },
    watch: {
        queque(val) {
        },
        play(val) {
            if (val && this.queque.length != 0) {
                this.playQueue();
            }
            console.log(val);
        }
    },
    beforeMount() {
    },
    created() {
        if (this.queque.length === 0) {
            let data = {};
            if (this.name == '') {
                data = {
                    start: this.start,
                    end: this.end,
                    delay: this.delay,
                    type: this.type,
                    frequency: this.frequency,
                    friction: this.friction,
                    duration: this.duration,
                    count: this.loop ? -1 : this.count,
                    change: this.change,
                    size: this.size,
                    strength: this.strength,
                    complete: this.complete,
                }
            } else {
                data = queue[this.name];
                let customOptions = {
                    delay: this.delay,
                    type: this.type,
                    frequency: this.frequency,
                    friction: this.friction,
                    duration: this.duration,
                    count: this.loop ? -1 : this.count,
                    change: this.change,
                    complete: this.complete,
                    size: this.size,
                    strength: this.strength,
                }
                for (let i in data) {

                }
                data = Object.assign(customOptions, ...data);

            }
            this.queque.push(data);
        }
    },
    mounted() {
        this.autoplay && this.queque.length !== 0 && this.playQueue();
    }
}
</script>

<style>

</style>
