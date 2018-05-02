<template>
  <div>
    <img src="./images/pic.jpg" @click="openPage" style="width:100%;max-width:750px;margin:auto;">
  </div>
</template>

<script>
import $ from "zepto";
import client from "../../../common/utils/client";
import Bridge from "../../../common/utils/Bridge";
import { changeTitle } from "../../../common/utils/hack";
import tracker from "../../../common/utils/tracker";
export default {
  data() {
    return {
      showResolve: null
    };
  },
  components: {},
  created() {
    changeTitle("春节去哪玩，跟着年味走");
    this.openPage();
  },
  methods: {
    openPage() {
      Bridge.handlerHtmlMessage({
        type: 6,
        data: {
          url:
            "https://zt1.lvmama.com/template4/index/3376?lvStatisticCode=3zhTittc?losc=277420"
        }
      });
    }
  },
  mounted() {},
  updated() {}
};
</script>



<style lang="less">
body {
  padding: 0;
  margin: 0;
  text-align: center;
}
</style>