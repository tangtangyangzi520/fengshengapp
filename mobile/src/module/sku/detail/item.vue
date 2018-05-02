<template>
 <div class="component-item" :class="customClass" :id="id">
    <slot></slot>
    <div class="bottom" v-if="showControl">
        <div class="inner">
            <a @click="changeUp"><i class="fa fa-arrow-up"></i></a>
            <a @click="changeDown"><i class="fa fa-arrow-down"></i></a>
            <a @click="editItem"><i class="fa fa-pencil"></i></a>
            <a @click.stop="removeItemFunc"><i class="fa fa-trash-o"></i></a>
            <div class="confirm" v-if="showRemove">
                <a class="btn red btn-sure" @click="removeItem">确定</a>
                <a class="btn default" @click="cancel">取消</a>
            </div>
        </div>
    </div>
 </div>
</template>
<script>
    export default{
        props: {
            changeUp: {
                type: Function,
                default () {}
            },
            changeDown: {
                type: Function,
                default () {}
            },
            removeItem: {
                type: Function,
                default () {}
            },
            editItem: {
                type: Function,
                default () {}
            },
            customClass: {
                type: String,
                default: ''
            }
        },
        components: {},
        data () {
            return {
                id: 'previewItem'+Date.now(),
                showRemove: false,
                showControl: false,
            }
        },
        methods: {
            removeItemFunc() {
                this.showRemove = true;
            },
            cancel () {
                this.showRemove = false;
            },
            showControlFunc () {
                this.showControl = true;
            },
            hideControlFunc () {
                this.showControl = false;
            }
        },
        created () {
        },
        ready () {
            const _this = this;
            $('#'+this.id).on('mouseenter',this.showControlFunc);
            $('#'+this.id).on('mouseleave',this.hideControlFunc);
            $(document).on('click',this.cancel);
        },
        beforeDestory () {
            $(document).unbind('click',this.cancel);
            $('#'+this.id).unbind('mouseenter',this.showControlFunc);
            $('#'+this.id).unbind('mouseout',this.hideControlFunc);
        }
    };
</script>

<style lang="less" scope>
.component-item {
  position: relative;
  width: 100%;
  min-height: 40px;
  background: #FFF;
  margin-bottom: 30px;
  .bottom {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 40px;
    line-height: 40px;
    background:  rgba(0,0,0,0.3);
    .inner {
        position: relative;
        width: 100%;
        height: 100%;
        .confirm {
            position: absolute;
            width: 150px;
            height: 50px;
            text-align: center;
            top: -50px;
            right: 0;
            background: #FFF;
            padding-left: 5px;
            border: 1px solid #CCC;
            a {
                font-size: 14px;
                margin: 8px 5px;
                width: 60px;
                &:hover {
                    text-decoration: none;
                }
                &.btn-sure {
                }
            }
        }
    }
    a {
        display: block;
        float: left;
        width: 25%;
        text-align: center;
        color: #444;
        font-size: 20px;
        &:hover {
            color: #000;
        }
    }
  }
}
</style>