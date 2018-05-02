<template>
  <div>
    <div class="content-preload show">
      <ddn-man v-if="page=='ddnMan'"></ddn-man>
      <ddn-women v-if="page=='ddnWomen'"></ddn-women>
      <jzyd-man v-if="page=='jzydMan'"></jzyd-man>
      <jzyd-women v-if="page=='jzydWomen'"></jzyd-women>
      <sxyd-man v-if="page=='sxydMan'"></sxyd-man>
      <sxyd-women v-if="page=='sxydWomen'"></sxyd-women>
      <zjyd-man v-if="page=='zjydMan'"></zjyd-man>
    </div>
  </div>
</template>
<script>
import $ from 'zepto'
import client from '../../../common/utils/client';
import Bridge from '../../../common/utils/Bridge';
import ddnMan from './ddnMan';
import ddnWomen from './ddnWomen';
import jzydMan from './jzydMan';
import jzydWomen from './jzydWomen';
import sxydMan from './sxydMan';
import sxydWomen from './sxydWomen';
import zjydMan from './zjydMan';


import apiConfig from '../../../common/api.config';
import { changeTitle } from '../../../common/utils/hack';
import logo from '../../../assets/ic_launcher_app.png';
export default {
  data() {
    return {
      page: 'ddnMan',
      isDevice: client.getQueryString('device')
    }
  },

  components: {
    ddnMan,ddnWomen,jzydMan,jzydWomen,sxydMan,sxydWomen,zjydMan
  },
  created() {
    this.page = client.getQueryString('page')?client.getQueryString('page'):'ddnMan';
    if (client.inFstop) {
      this.isDevice = true;
    }
  },
  methods: {
    
  },
  mounted() {
    /*if(this.isDevice&&client.IS_IOS){
      setTimeout(()=>{
        let iosHeight=$(document).height();
        Bridge.handlerHtmlMessage({ type: 13, data: { height: iosHeight} });
      },400)
    }*/
  },
  updated() {
  }
};


</script>

<style lang="less">
@import "./index.less";

</style>