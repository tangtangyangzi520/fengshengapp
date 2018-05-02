<template>
    <transition name="fade-in-fast">
      <div class="toast" v-if="show">{{content}}</div>
    </transition>
</template>

<script>
export default {
  props: {
    show: Boolean,
    content: String
  },
  data() {
    return {
      animatein: false
    };
  },
  methods: {},
  created() {}
};
</script>

<style lang="less" scoped>
@import "../../styles/common.less";
.toast {
  position: fixed;
  padding: 20/@r 30/@r;
  min-width: 260/@r;
  max-width: 680/@r;
  text-align: center;
  color: #fff;
  font-size: 28/@r;
  border-radius: 8/@r;
  left: 50%;
  top: 65%;
  -webkit-transform: translate(-50%,0);
  background: rgba(0, 0, 0, 0.8);
}
</style>
