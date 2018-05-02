<template>
	<div v-if="!isDevice">
	  <div class="download">
	  	<div class="photo"></div>
	  	<div class="text">
	  		<span>丰盛榜</span>
	  		<span>唯有爱让生命更丰盛</span>
	  	</div>
	  	<div class="downIcon" @click="goDown()">快去下载</div>
	  </div>
	  <div class="down-code">
	  	<div class="bg">
				<img :src="logoCode" @click="codeTracker()">
			</div>
	  	<div class="text">丰盛榜APP</div>
	  </div>
	  <div class="distance">
	  </div>
  </div>
</template>

<script>
import $ from 'zepto'
import apiConfig from '../../common/api.config';
import client from '../../common/utils/client';
import tracker from '../../common/utils/tracker';
import logoCode from '../../assets/ic_52_erweima@2x_02.jpg';
export default {
  props: {
  },
  data () {
    return {
      isDevice: client.getQueryString('device')||client.getQueryString('test'),
			shareId: client.getQueryString('shareId'),//分享ID
			logoCode:logoCode
    }
  },
  components: {
  },
  created: function () {
  	//alert(this.isDevice);
    //下载链接
    /*if(this.shareId){
      client.postData(apiConfig.API_MEMBER_SHARE+'?shareId='+this.shareId,{}).then((data)=>{
        if(data.code != 200){
          return
        }
        this.shareData = data.data;
      },(data)=>{
        this.loadError = {
          msg: '网络连接错误'
        };
      })
    }*/
  },
  methods: {
     goDown(){
     	const objs={id:"316002",title:"被分享者看到的H5-点击快去下载"};
     	tracker.trackData(objs);
			 if(client.IS_PC){
					location.href = 'http://a.app.qq.com/o/simple.jsp?pkgname=com.fullshare.fsb';
			 }else{
				if(client.IS_IOS){
					location.href = 'itms-apps://itunes.apple.com/cn/app/%E4%B8%B0%E7%9B%9B%E6%A6%9C/id1189012841?mt=8';
			  }else{
					location.href = 'http://a.app.qq.com/o/simple.jsp?pkgname=com.fullshare.fsb';
			  }
			 }
		 },
		 codeTracker(){
			 //tracker
       tracker.trackData({ id:316004 , event_name:'被分享者看到的H5-长按二维码'});
		 }
  },
  mounted(){
  }
}
</script>

<style lang="less" scope>
.download{
	border-top:1px solid #DBDBDB;
	position:fixed;
	z-index:9999;
	left:0;
	right:0;
	bottom:0;
	background:#fff;
	display:-webkit-box;
	padding:.1rem .24rem .1rem .1rem;
	.photo{
	  width:.42rem;
	  height:.42rem;
	  background:url(../../assets/ic_launcher_app.png) no-repeat center;
	  background-size:contain;
	  margin-right:.07rem;
	}
	.text{
		-webkit-box-flex:1.0;
		span{
			width:100%;
			display:block;
		}
		span:first-child{
			font-size:.2rem;
			line-height:.28rem;
			color:#4A4A4A;
		}
		span:last-child{
			font-size:.13rem;
			line-height:.16rem;
			color:#9B9B9B;
		}
	}
	.downIcon{
		width:.68rem;
		height:.26rem;
		line-height:.26rem;
		border:0.01rem solid #8DAB55;
		border-radius:0.04rem;
		text-align:center;
		color:#8DAB55;
		font-size: .12rem;
		margin-top:.09rem;
	}
	.downIcon:active{
		background:#8DAB55;
		color:#fff;
	}
}
.down-code{
	margin:.34rem 0 .44rem;
	.bg{
		img{
			margin:0 auto;
			display:block;
			width:1.04rem;
			height:1.04rem;
		}
	}
	.text{
		margin-top:.06rem;
		line-height:.28rem;
		font-size: .2rem;
		color:#4A4A4A;
		text-align:center;
	}
}
.distance{
	position:relative;
	height:0.6rem;
}
</style>