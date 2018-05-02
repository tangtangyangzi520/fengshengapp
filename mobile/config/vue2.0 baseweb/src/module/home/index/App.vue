<template>
  <div>
    <group title="用户">
      <cell title="注册页面" href="/views/login/register.html"></cell>
      <cell title="注册信息" href="/views/login/userInfoEdit.html"></cell>
      <cell title="会员信息" href="/views/login/userInfo.html"></cell>
    </group>
    <group title="计划" style="margin-top:.2rem;">
      <cell title="计划详情" href="/views/planning/planningDetails.html"></cell>
    </group>
  </div>
</template>

<script>
  import { changeTitle } from '../../../common/utils/hack'
  import Group from '../../../vux/components/group'
  import Cell from '../../../vux/components/cell'
  export default {
    data () {
      return {
        title: ''
      }
    },
    components: {
      Group,
      Cell
    },
    created: function () {
      changeTitle('首页')
    },
    methods: {
      
    }
  }
</script>

<style lang="less">
body {
  background: #F5F5F5;
}
.register-bg {
  position: relative;
  width: 3.75rem;
  height: 4rem;
  background-size: 100% auto;
}
</style>
