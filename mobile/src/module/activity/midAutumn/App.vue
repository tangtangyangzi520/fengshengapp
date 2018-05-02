<template>
<div class="about">
	<h2 style="font-size:0.2rem;">中秋活动</h2>
</div>
</template>
<script type="text/ecmascript-6">
import $ from 'zepto';
import client from '../../../common/utils/client';
import Bridge from '../../../common/utils/Bridge';
import apiConfig from '../../../common/api.config';
import { changeTitle } from '../../../common/utils/hack';
import tracker from '../../../common/utils/tracker';
export default {
    data() {
      return {
      }
    },
    components: {
    },
    created () {
      changeTitle('中秋活动');
    },
    methods: {
     
    },
	mounted(){
	  	//初次进入本页面浏览
	  	// const aboutObj={id:309,title:"关于我们",pageName:"关于页"};
	  	// tracker.firstRead(aboutObj);
	  	// tracker.scrollCase({title:"关于我们"});
	}
}
</script>
<style lang="less" >
@import "../../../common/css/common.less";
.about{
	 color:#595959;
	 font-size:.16rem;
	 padding:0 0.24rem;
	 line-height:.21rem;
	 text-align:justify;
	 h2{
	 	margin:.2rem 0;
	 	color:#4A4A4A;
	 	font-size:.32rem;
	 	line-height:.45rem;
	 }
}
</style>