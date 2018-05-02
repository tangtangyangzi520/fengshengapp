<template>
  <div class="register-bg">
    <group title="注册表单" class="weui_cells_form">
      <x-input title="手机号码" placeholder="请输入手机号码" keyboard="number" :min="11" :max="11" is-type="china-mobile"></x-input>
      <x-input title="验证码" placeholder="请输入验证码" class="weui_vcode">
        <x-button slot="right" mini plain type="primary" @click="getCode()">获取验证码</x-button>
      </x-input>
    </group>
    <box gap=".2rem"><x-button type="primary">快速注册</x-button>
  </div>
</template>

<script>
  import { changeTitle } from '../../../common/utils/hack'
  import XButton from '../../../vux/components/x-button'
  import Box from '../../../vux/components/box'
  import Group from '../../../vux/components/group'
  import XInput from '../../../vux/components/x-input'
  import $ from 'zepto'
  
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
      changeTitle('快速注册')
    },
    methods: {
      getCode: function(){
      }
    }
  }
</script>

<style lang="less">
.register-bg {
  position: relative;
  width: 3.75rem;
  height: 4rem;
  background: url(./images/register-bg.jpg) center top no-repeat;
  background-size: 100% auto;
  margin: auto;
}
.register-bg .weui_cells {
  background: transparent!important;
}
.register-bg .weui_cells_form {
  margin: 0 .2rem;
  padding-top: 1.9rem;
  .weui_cells_title {
    display: none;
  }
  .weui_cell {
    padding-left: 0;
    .weui_btn  {
      height: .3rem;
      width: 1rem;
      line-height: .25rem;
      margin-top: .07rem;
      margin-bottom: .1rem;
    }
  }
  .weui_cells:before {
    border: none;
  }
  .weui_cell:before {
    left: 0;
  }
  .weui_label {
    width: .86rem!important;
  }
  .weui_vcode {
    padding-top: .1rem!important;
    padding-bottom: 0.01rem!important;
    .weui_cell_ft {
      i {
        vertical-align: .04rem;
      }
    }
  }
  .weui_cell_bd {
   margin-top: -.03rem;
  }
}
</style>
