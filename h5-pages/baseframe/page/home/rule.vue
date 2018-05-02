<template>
    <div class="page page-modal">
        <div class="page-modal-content">
            <h2>游戏规则</h2>
            <router-link to="/home" class="btn btn-back">返回</router-link>
        </div>
    </div>
</template>

<script>
export default {
  name: "home",
  components: {},
  created() {}
};
</script>

<style lang="less" scoped>
@import "../../styles/common.less";
.page-modal-content {
  padding: 0.1rem;
  .btn {
    width: 48%;
  }
}
</style>
