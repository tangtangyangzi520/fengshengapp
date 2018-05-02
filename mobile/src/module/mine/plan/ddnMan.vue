<template>
  <div>
    <div class="loading-page" v-if="!dataContent&&!loadError"></div>
    <div class="loaderror-page" v-if="!dataContent&&loadError">{{loadError.msg}}</div>
    <div class="content-preload" :class="{show:dataContent}">
      <!--zhizuo-->
      <div  class='cover' >
         <img src='./images/ddnman/1kzdc.jpeg' class="shipuimg">
            <div class="text" ><nobr class="desc">训练说明:</nobr>每周2~3次，每次4个动作，每个动作至少做1组。推荐6个动作，选择4个自由组合，供参考：空中单车+十字挺身+平板支撑+下背部动态拉伸。</div>
            <div class="text" ><nobr class="desc">注意事项:</nobr>建议在运动前后进行5~10min的整理活动，如肢体拉伸、有氧运动，有利于提高身体协调性，帮助减少肌肉疲劳。
    	运动量由小到大，循序渐进，持之以恒。以汗出但不大汗淋漓，运动后不头晕乏力为度</div>
        <div class="middle">
          <div class="list" @click="showPage(0)">
            <div class="listone">
              <img src='./images/ddnman/1kzdc.jpeg' class="listimg">
              <div>
                <div class="part">空中单车</div>
                <div class="num">每组两侧各10~20个，组间休息30秒</div>
                 </div>
              <img src='./images/1.png' class="imgtwo">
            </div>
          </div>
  
          <div class="list" @click="showPage(1)">
            <div class="listone">
              <img src='./images/ddnman/2szts.jpeg' class="listimg">
              <div>
                <div class="part">十字挺身</div>
                <div class="num">每组12个，组间休息30秒</div>
                 </div>
              <img src='./images/1.png' class="imgtwo">
            </div>
          </div>
          <div class="list" @click="showPage(2)">
            <div class="listone">
              <img src='./images/ddnman/3pbzc.jpeg' class="listimg">
              <div>
                <div class="part">平板支撑</div>
                <div class="num">力竭为止，不要耸肩塌腰，每组坚持30秒，组间休息30秒。</div>
                 </div>
              <img src='./images/1.png' class="imgtwo">
            </div>
          </div>
          <div class="list" @click="showPage(3)">
            <div class="listone">
              <img src='./images/ddnman/4cpbzc.jpeg'class="listimg">
              <div>
                <div class="part">侧平板支撑</div>
                <div class="num">挺胸收腹，不要耸肩，保持均匀呼吸，每组坚持30秒，组间休息30秒。</div>
                 </div>
              <img src='./images/1.png' class="imgtwo">
            </div>
          </div>
          <div class="list" @click="showPage(4)">
            <div class="listone">
              <img src='./images/ddnman/5fxjf.jpeg' class="listimg">
              <div>
                <div class="part">反向卷腹</div>
                <div class="num">每组10~20个，组间休息30秒。</div>
                 </div>
              <img src='./images/1.png' class="imgtwo">
            </div>
          </div>
           <div class="list" @click="showPage(5)">
            <div class="listone">
              <img src='./images/ddnman/6bbxl.jpeg' class="listimg">
              <div>
                <div class="part">下背部拉伸</div>
                <div class="num">每组10~20个，组间休息30秒。</div>
                 </div>
              <img src='./images/1.png' class="imgtwo">
            </div>
          </div>
  
        </div>
      </div>
      <!--zhizuo-->
      <!--zhizuo2-->
      <div class="toper"  v-if="isShowPage" :style="{background:'url('+imgurl[pageIndex]+') no-repeat center',height:clientHeight}">
        <div class="surface" v-bind:style="{ height: clientHeight}">
          <div class="close" @click="close">×</div>
          <template v-if="pageIndex==0"> 
            <div class="title">空中单车</div>
             <div class="center-pic">
            <div :style="{background:'url('+imgurl[pageIndex]+') no-repeat center'}"  class="imgurl"  v-show="hide">
           <img src="./images/btn_home_videoplay_normal@2x.png" class="start"  @click="start" > 
           </div>
            <video controls="controls" webkit-playsinline style="width:100%;" loop>
            <source src="http://img1.fshtop.com/1501747221600.mp4" type="video/mp4" />
            </video>
            </div>
            <ul class="list-text">
              <li>仰卧于瑜伽垫上，双手置于耳朵两侧；</li>
              <li>腹肌发力，带动上半身卷起；用肘部去碰另一侧膝盖内侧；不要用手发力拉动颈部</li>
              <li>双脚交替在空中做蹬自行车动作；动作过程中着重感受腹部的卷缩。</li>
              <li>Tips：每组两侧各10~20个，组间休息30秒。</li>
            </ul>
          </template>
          <template v-if="pageIndex==1"> 
            <div class="title">十字挺身</div>
           <div class="center-pic">
            <div :style="{background:'url('+imgurl[pageIndex]+') no-repeat center'}"  class="imgurl" v-show="hide">
           <img src="./images/btn_home_videoplay_normal@2x.png" class="start"  @click="start" > 
           </div>
           <video controls="controls" webkit-playsinline style="width:100%;" loop>
            <source src="http://img1.fshtop.com/1501747229606.mp4" type="video/mp4" />
            </video>
            </div>
            <ul class="list-text">
              <li>两臂向前伸，俯卧在瑜伽垫上；</li>
              <li>左臂和右腿同时向上抬，感受背部的收缩紧绷，坚持3秒；</li>
              <li>放下换左腿和右臂，算一次。</li>
              <li>Tips：每组12个，组间休息30秒。。</li>
            </ul>
          </template>
          <template v-if="pageIndex==2"> 
            <div class="title">平板支撑</div>
              <div class="center-pic">
            <div :style="{background:'url('+imgurl[pageIndex]+') no-repeat center'}"  class="imgurl" v-show="hide">
           <img src="./images/btn_home_videoplay_normal@2x.png" class="start"  @click="start" > 
           </div>
           <video controls="controls" webkit-playsinline style="width:100%;" loop>
            <source src="http://img1.fshtop.com/1501747227662.mp4" type="video/mp4" />
            </video>
            </div>
            <ul class="list-text">
              <li>脚尖踩地，伸直躯干，头、肩、胯、踝处于同一直线；</li>
              <li>挺胸收腹，臀部夹紧，下巴微收，保持大臂垂直地面，均匀呼吸。</li>
              <li>Tips：力竭为止，不要耸肩塌腰，每组坚持30秒，组间休息30秒。</li>
            </ul>
          </template>
          <template v-if="pageIndex==3"> 
            <div class="title">侧平板支撑</div>
              <div class="center-pic">
            <div :style="{background:'url('+imgurl[pageIndex]+') no-repeat center'}"  class="imgurl" v-show="hide">
           <img src="./images/btn_home_videoplay_normal@2x.png" class="start"  @click="start" > 
           </div>
          <video controls="controls" webkit-playsinline style="width:100%;" loop>
            <source src="http://img1.fshtop.com/1501747260606.mp4" type="video/mp4" />
            </video>
            </div>
            <ul class="list-text">
              <li>手肘小臂支撑地面把身体撑起；</li>
              <li>肩、胯部、膝、脚踝保持一条直线，另一只手臂叉腰位于侧腹部。</li>
              <li>Tips：挺胸收腹，不要耸肩，保持均匀呼吸，每组坚持30秒，组间休息30秒。</li>
            </ul>
          </template>
          <template v-if="pageIndex==4"> 
            <div class="title">反向卷腹</div>
              <div class="center-pic">
            <div :style="{background:'url('+imgurl[pageIndex]+') no-repeat center'}"  class="imgurl" v-show="hide">
           <img src="./images/btn_home_videoplay_normal@2x.png" class="start"  @click="start" > 
           </div>
          <video controls="controls" webkit-playsinline style="width:100%;" loop>
            <source src="http://img1.fshtop.com/1501747260556.mp4" type="video/mp4" />
            </video>
            </div>
            <ul class="list-text">
              <li>上身平躺在垫上，双手放平在两旁、手掌向下；</li>
              <li>双腿屈膝抬高，大腿垂直于地板；</li>
              <li>呼气，同时卷起下腹，慢慢将膝盖带到胸前；</li>
              <li>静上一秒，然后吸气，用腹部的力把脚带回起始动作。</li>
              <li>Tips：每组10~20个，组间休息30秒。</li>
            </ul>
          </template>
           <template v-if="pageIndex==5"> 
            <div class="title">下背部拉伸</div>
              <div class="center-pic">
            <div :style="{background:'url('+imgurl[pageIndex]+') no-repeat center'}"  class="imgurl" v-show="hide">
           <img src="./images/btn_home_videoplay_normal@2x.png" class="start"  @click="start" > 
           </div>
            <video controls="controls" webkit-playsinline style="width:100%;" loop>
            <source src="http://img1.fshtop.com/1501747283556.mp4" type="video/mp4" />
            </video>
            </div>
            <ul class="list-text">
              <li>双手抱膝盖，将膝盖向腹部拉起，达到最大幅度。</li>
              <li>Tips：每组做30~60秒，组间不休息。</li>
            </ul>
          </template>
          <div class="swiper" >
            <div class="scroll-ul">
              <div class="li">
                <div class="sdd" v-show="pageIndex==0"></div>
                <div class="pic" @click="showPage(0)"><img class="last-img" src='./images/ddnman/1kzdc.jpeg'></div>
              </div>
              <div class="li">
                <div class="sdd" v-show="pageIndex==1"></div>
                <div class="pic" @click="showPage(1)"><img class="last-img" src='./images/ddnman/2szts.jpeg'></div>
              </div>
              <div class="li">
                <div class="sdd" v-show="pageIndex==2"></div>
                <div class="pic" @click="showPage(2)"><img class="last-img" src='./images/ddnman/3pbzc.jpeg'></div>
              </div>
              <div class="li">
                <div class="sdd" v-show="pageIndex==3"></div>
                <div class="pic" @click="showPage(3)"><img class="last-img" src='./images/ddnman/4cpbzc.jpeg'></div>
              </div>
              <div class="li">
                <div class="sdd" v-show="pageIndex==4"></div>
                <div class="pic" @click="showPage(4)"><img class="last-img" src='./images/ddnman/5fxjf.jpeg'></div>
              </div>
              <div class="li">
                <div class="sdd" v-show="pageIndex==5"></div>
                <div class="pic" @click="showPage(5)"><img class="last-img" src='./images/ddnman/6bbxl.jpeg'></div>
              </div>
            </div>
          </div>
        </div>
      </div>
  
      <!--zhizuo2-->
    </div>
  
  </div>
</template>


<script>
import $ from 'zepto'
import client from '../../../common/utils/client';
import Bridge from '../../../common/utils/Bridge';
import apiConfig from '../../../common/api.config';
import { changeTitle } from '../../../common/utils/hack';
import logo from '../../../assets/ic_launcher_app.png';
export default {
  data() {
    return {
      dataContent: '8',
      getData: [{ show: true }, { show: false }, { show: false }],
      loadError: '8',
      dataContent: '8',
      isShowPage: false,
      clientHeight: "6rem",
      pageIndex: 0,
      hide:true,
      imgurl: [
        require('./images/ddnman/1kzdc.jpeg'),
        require('./images/ddnman/2szts.jpeg'),
        require('./images/ddnman/3pbzc.jpeg'),
        require('./images/ddnman/4cpbzc.jpeg'),
        require('./images/ddnman/5fxjf.jpeg'),
        require('./images/ddnman/6bbxl.jpeg'),
      ],
      backObj: {
        height: 'auto',
        background: 'url(http://img1.imgtn.bdimg.com/it/u=449909535,3737323816&fm=26&gp=0.jpg) no-repeat center'
      }
    }
  },

  components: {

  },
  created() {
    changeTitle('运动健身计划');
  },
  methods: {
    close () {
      this.isShowPage = false;
      this.hide=true;
    },
      start(){
    this.hide=false;
    this.video = document.querySelector('video')
    this.video.style.display = 'block';
    this.video.play();
  },
    showPage(pageIndex) {
       this.video = document.querySelector('video');
      if(this.video){
        this.video.pause();
      }
      this.pageIndex = pageIndex;
      this.isShowPage = true;
      this.hide=true;

            setTimeout(() => {
        let sdd = $(".swiper").scrollLeft();
        console.log(sdd)
  
        switch (this.pageIndex)
        {
        case 5:
          $(".swiper").scrollLeft(175);
          break;
          
        }
       }, 100)
    }
  },
  mounted() {
    const clientH = $(window).height();
    this.clientHeight = this.backObj.height = clientH + 'px';
    this.margintop=this.clientHeight-5.5+'px';
  },
  updated() {
  }
};


</script>



<style lang="less">

</style>