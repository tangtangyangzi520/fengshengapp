<template>
  <div style="height:100%">
    <transition @after-enter="$vux.bus && $vux.bus.$emit('vux:after-view-enter')" :name="'vux-pop-' + (direction === 'forward' ? 'in' : 'out')">
      <router-view class="router-view"></router-view>
    </transition>
    <div v-transfer-dom>
      <loading v-model="isLoading"></loading>
    </div>
  </div>
</template>

<script>
import { Loading, TransferDom } from 'vux'
import { mapState, mapActions } from 'vuex'
export default {
  name: 'app',
  components: {
    Loading
  },
  directives: {
    TransferDom
  },
  computed: {
    ...mapState({
      route: state => state.route,
      isLoading: state => state.vux.isLoading,
      direction: state => state.vux.direction
    }),
  },
  created() {
  },
  watch: {
    isLoading(){
      console.log(this.isLoading)
    }
  }
}
</script>

<style lang="less">
@import './common/styles/index.less';
body {
  background-color: #fbf9fe;
}

.router-view {
  position: absolute;
  top: 0;
  width: 100%;
  height: 100%;
}

.vux-pop-out-enter-active,
.vux-pop-out-leave-active,
.vux-pop-in-enter-active,
.vux-pop-in-leave-active {
  will-change: transform;
  transition: all 300ms;
  height: 100%;
  top: 0;
  position: absolute;
  backface-visibility: hidden;
  perspective: 1000;
}

.vux-pop-out-enter {
  opacity: 0;
  transform: translate3d(-100%, 0, 0);
}

.vux-pop-out-leave-active {
  opacity: 0;
  transform: translate3d(100%, 0, 0);
}

.vux-pop-in-enter {
  opacity: 0;
  transform: translate3d(100%, 0, 0);
}

.vux-pop-in-leave-active {
  opacity: 0;
  transform: translate3d(-100%, 0, 0);
}
</style>
