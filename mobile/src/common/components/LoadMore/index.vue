<style lang="less" scoped>
.loading-text {
  text-align: center;
  padding-top: .05rem;
  padding-bottom: .2rem;
  font-size: .12rem;
  color: #666;
}
</style>

<template>
  <div>
    <div class="loading-text" v-if="isLoading">
      {{text}}
    </div>
    <div class="loading-text" v-if="!hasmore">
      没有更多
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
export default {
  components: {
  },
  data() {
    return {
      time: 0,
      text: '',
    }
  },
  props: {
    isLoading: {
      type: Boolean,
      default: false
    },
    hasmore: {
      type: Boolean,
      default: true
    }
  },
  watch: {
    hasmore() {
      if (!this.hasmore) {
        this.text = ''
      } else {
        this.text = '加载中...'
      }
    }
  },
  methods: {
    scrollFn() {
      let dt = Date.now();
      if (dt < this.time + 500) {
        return;
      }
      let $body = document.body;
      if (!this.isLoading && this.hasmore) {
        let scrollTop = $body.scrollTop === 0 ? $('html,body').scrollTop() : $body.scrollTop;
        if (scrollTop + window.innerHeight + 50 >= $body.scrollHeight) {
          this.time = dt;
          this.$parent.loadMore()
        }
      }
    }
  },
  created() {
    let $body = document.body
    $body.addEventListener('touchmove', this.scrollFn, false)
    document.addEventListener('scroll', this.scrollFn, false)
  },
  destroyed() {
    let $body = document.body
    $body.removeEventListener('touchmove', this.scrollFn)
    document.removeEventListener('scroll', this.scrollFn)
  }
}
</script>
