<template>
    <transition>
        <slot></slot>
    </transition>
</template>

<script>
import dynamics from '../../libs/dynamics';
import utils from './utils';
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
            default: 200
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
        // 自定义复杂动画队列数据
        queque: {
            type: Array,
            default: []
        }
    },
    data() {
        return {
            tData: [],
            tIndex: 0,
            tCount: 0,
        }
    },
    methods: {
        // 轮循播放动画队列
        playQueue() {
            if (this.queque.length === 0) return;
            if (this.tIndex > this.queque.length - 1) return;
            let item = this.queque[this.tIndex];
            this.tCount = 0;
            if (!item.count && item.count != 0) {
                item.count = 1;
            }
            // for (let property in item.end) {
            //     if (typeof item.start[property] == 'undefined') {
            //         let style = this.$el.style[property];
            //         if (typeof style != 'undefined') {
            //             item.start[property] = style;
            //         }
            //     }
            // }
            this.playOnce(item);
        },
        // 播放单次动画
        playOnce(item) {
            if (isNaN(item.count) || item.count == 0) return;
            this.tCount++;
            dynamics.animate(this.$el, item.start, { duration: 0 });
            dynamics.animate(this.$el, item.end, {
                type: dynamics[item.type ? item.type : this.type],
                frequency: item.frequency ? item.frequency : this.frequency,
                friction: item.friction ? item.friction : this.friction,
                duration: item.duration ? item.duration : this.duration,
                delay: item.delay ? item.delay : this.delay,
                change: item.change ? item.change : () => { },
                complete: () => {
                    if (this.tCount < item.count) {
                        this.playOnce(item);
                    } else {
                        this.tIndex++;
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
            console.log(play);
        }
    },
    beforeMount() {
    },
    created() {
        if (this.name !== '') {

        }
    },
    mounted() {
        this.autoplay && this.queque.length !== 0 && this.playQueue();
        // console.log(this.data);
        // console.log(utils.isEmptyObject(this.name));
        // dynamics.animate(this.$el, this.start, { duration: 0 });
        // dynamics.animate(this.$el, this.end, {
        //     type: dynamics[this.type],
        //     frequency: this.frequency,
        //     friction: this.friction,
        //     duration: this.duration,
        //     delay: this.delay
        // })
    }
}
</script>

<style>

</style>
