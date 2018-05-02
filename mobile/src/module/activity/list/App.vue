<template>
	<div>
		<div class="list-img" v-for="item in activeList" @click="activitygo()">
			<div class="list-word right-ing">
				<div class="right-word" v-if="item.cmpnStatus==1">进行中</div>
				<div class="right-word" v-if="item.cmpnStatus==0">已结束</div>
			</div>
			<img class="list-draw" :src="item.cmpnImgUrl">
		</div>
		<div class="tips" v-show="empty">
			<div class="icon-empty"></div>
			暂无活动
		</div>
		<loading-toast v-if="isLoading"></loading-toast>
	</div>
</template>
<script type="text/ecmascript-6">
import $ from 'zepto';
import client from '../../../common/utils/client';
import Bridge from '../../../common/utils/Bridge';
import apiConfig from '../../../common/api.config';
import { changeTitle } from '../../../common/utils/hack';
import tracker from '../../../common/utils/tracker';
import { loadingToast } from '../../../common/components/';
export default {
	data() {
		return {
			activeList: [],
			isLoading: false,
			empty:false
		}
	},
	components: {
	 loadingToast
	},
	created() {
		changeTitle('活动列表');
		this.getList();
	},
	methods: {
		getList() {
			this.isLoading = true;
			client.postData(apiConfig.API_ACTIVITY).then((data) => {
				this.isLoading = false;
				if(data.data.length==0){
					this.empty=true;
				}
				data.data.forEach(item => {
					this.activeList.push(item)
				})
			}, (data) => {
				this.isLoading = false;
			});
		},
		activitygo() {
			// location.href = "http://www.baidu.com"
		}
	},
	mounted() {
		//初次进入本页面浏览
		// const aboutObj={id:309,title:"关于我们",pageName:"关于页"};
		// tracker.firstRead(aboutObj);
		// tracker.scrollCase({title:"关于我们"});
	}
}
</script>
<style lang="less" >
@import "../../../common/css/common.less";
@r: 200px/1rem;
.tips {
  position: absolute;
  top: 50%;
  transform: translateY(-70%);
  -webkit-transform: translateY(-70%);
  width: 100%;
  text-align: center;
  color: #4A4A4A;
  font-size: 28/@r;
  .icon-empty {
    position: relative;
    width: 560/@r;
    height: 397/@r;
    margin: auto;
    background: url(./images/ic_huoodng_nothing@2x.png) center center no-repeat;
    background-size: 100% auto;
  }
}
.list-draw {
	width: 94%;
	margin-top: 0.15rem;
	margin-left: 3%;
	margin-right: 3%;
	margin-bottom: 0;
	border-radius: 0.05rem;
	position: relative;
	vertical-align: top;
}

.list-word {
	width: 0.6rem;
	height: 0.6rem;
	position: absolute;
	right: 0;
	z-index: 33;
	margin-top: 0.15rem;
	margin-right: 3%;
	background: url("./images/bg_120_huodong_end@2x.png")center center no-repeat;
	background-size: cover;
	&.right-ing {
		background: url("./images/bg_120_huodong_ing@2x.png")center center no-repeat;
		background-size: cover;
	}
	.right-word {
		width: 0.371rem;
		height: 0.371rem;
		transform: rotate(-315deg);
		-webkit-transform-origin: 35% 110%;
		font-family: PingFangSC-Regular;
		font-size: 0.12rem;
		color: #FFFFFF;
		text-align: center;
	}
}
</style>