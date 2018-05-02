<template>
<div class="about">
<h2>关于我们</h2>
<p>丰盛榜，是丰盛控股倾力打造的大健康生活综合服务平台。</p>
<p>基于用户关注的健康问题，由权威健康专家提供，专业的健康资讯，优质的健康商品/服务推荐，形成围绕用户需求的360度全面健康解决方案，并以充满情怀的“良言”互动功能，把健康带给用户的社交圈。</p>
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
      changeTitle('关于我们');
    },
    methods: {
     
    },
	mounted(){
	  	//初次进入本页面浏览
	  	const aboutObj={id:309,title:"关于我们",pageName:"关于页"};
	  	tracker.firstRead(aboutObj);
	  	tracker.scrollCase({title:"关于我们"});
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