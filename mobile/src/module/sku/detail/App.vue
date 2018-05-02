<template>
<div>
  <div class="loading-page" v-if="!dataAuthor&&!loadError"></div>
  <div class="loaderror-page" v-if="!dataAuthor&&loadError">{{loadError.msg}}</div>
  <div class="content-preload" :class="{show:dataAuthor}">
    <div v-if="dataAuthor">
      <img v-lazy="dataAuthor.homeMediumUrl">
    </div>
  </div>
</div>
</template>
<script>
  import $ from 'zepto'
  import client from '../../../common/utils/client';
  import Bridge from '../../../common/utils/Bridge';
  import apiConfig from '../../../common/api.config';
  import { changeTitle } from '../../../common/utils/hack'
  export default {
    data () {
      return {
        dataAuthor: null,
        recommend: null,
        loadError: null,
        moreArticle: null,
      }
    },
    components: {
    },
    created () {
      changeTitle('专家详情');
      client.postData(apiConfig.API_ARTICLE_GET+'?articleId='+client.getQueryString('articleId'),{}).then((data)=>{
        if(data.code != 200){
          this.loadError = {
            msg: data.msg
          }
          return
        }
        this.dataAuthor = data.data;
        
      },(data)=>{
        this.loadError = {
          msg: '网络连接错误'
        };
      })

    },
    methods: {
     
    },
    ready() {
      
    }
  }
</script>

<style lang="less">
@import "../../../common/css/common.less";
@import "./index.less";
</style>
