<template>
  <div class="weui_cell" :class="{'vux-tap-active': isLink || !!link || !!href}" @click="onClick">
    <div class="weui_cell_hd">
      <slot name="icon"></slot>
    </div>
    <div class="weui_cell_bd" :class="{'weui_cell_primary':primary==='title'}">
      <p>
        {{title}}
        <slot name="after-title"></slot>
      </p>
      <inline-desc>{{inlineDesc}}</inline-desc>
    </div>
    <div class="weui_cell_ft" :class="{'weui_cell_primary':primary==='content', 'with_arrow': isLink || !!link || !!href || showArrow}">
      {{value}}
      <slot name="value"></slot>
      <slot></slot>
    </div>
    <slot name="child"></slot>
  </div>
</template>

<script>
import InlineDesc from '../inline-desc'
// import { go } from '../../libs/router'

export default {
  components: {
    InlineDesc
  },
  props: {
    title: String,
    value: [String, Number],
    isLink: Boolean,
    inlineDesc: [String, Number],
    href: String,
    showArrow: String,
    primary: {
      type: String,
      default: 'title'
    },
    link: {
      type: [String, Object]
    }
  },
  methods: {
    onClick () {
      // go(this.link, this.$router);
      if(this.isLink || !!this.href || !!this.link){
        if(this.href != '' && this.href != undefined){
          location.href = this.href
        }
        if(this.link != '' && this.link != undefined){
          location.href = this.link
        }
        this.$emit("click")
      }
      if(this.showArrow){
        this.$emit("click")
      }
    }
  }
}
</script>

<style lang="less">
@import '../../styles/variable.less';
@import '../../styles/tap.less';
@import '../../styles/weui/widget/weui_cell/weui_cell_global';

.weui_cell_bd > p {
  color: @cell-body-label-color;
}

.weui_cell_ft.with_arrow:after {
  content: " ";
  display: inline-block;
  transform: rotate(45deg);
  height: 6/100rem;
  width: 6/100rem;
  border-width: 2/100rem 2/100rem 0 0;
  border-color: #C8C8CD;
  border-style: solid;
  position: relative;
  top: -1/100rem;
  margin-left: .3em;
}
</style>
