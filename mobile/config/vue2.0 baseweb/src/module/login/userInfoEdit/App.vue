<template>
  <div class="">
    <div class="header-logo"></div>
    <group title="会员信息" class="weui_cells_form for-info-input">

      <x-input title="手机号" placeholder="请输入手机号码" keyboard="number" :min="11" :max="11" is-type="china-mobile"></x-input>

      <x-input title="姓名" name="username" placeholder="请输入姓名" is-type="china-name"></x-input>

      <x-input title="邮箱" name="email" :required="false" placeholder="请输入邮箱地址" is-type="email">
        
      </x-input>

      <div class="weui_cell">
        <div class="weui_cell_hd">
          <label class="weui_label" style="width: 3em;">地址</label>
        </div> 
        <div class="weui_cell_bd weui_cell_primary">
          
        </div> 
       </div>

      <x-input title="详细地址" class="hide-title" placeholder="请填写详细地址" :max="100"></x-input>

    </group>

    <p class="gray">如需接收礼包，请准确填写以便递送。</p>

    <a class="btn-fix-bottom"><i class="cicon icon-confirm"></i>提交</x-button>
</template>

<script>
  import { changeTitle } from '../../../common/utils/hack'
  import XButton from '../../../vux/components/x-button'
  import Box from '../../../vux/components/box'
  import Group from '../../../vux/components/group'
  import XInput from '../../../vux/components/x-input'
  export default {
    data () {
      return {
        title: '111'
      }
    },
    components: {
      XButton,
      Box,
      Group,
      XInput
    },
    created: function () {
      changeTitle('填写信息')
    },
    methods: {
      getCode: function(){
      }
    }
  }
</script>

<style lang="less" scope>
body {
    background: #F0EFF5;
}
.hide-title {
  .weui_label {
    opacity: 0;
  }
}
</style>
