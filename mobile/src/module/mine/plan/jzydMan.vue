<template>
  <div>
    <div class="loading-page" v-if="!dataContent&&!loadError"></div>
    <div class="loaderror-page" v-if="!dataContent&&loadError">{{loadError.msg}}</div>
    <div class="content-preload" :class="{show:dataContent}">
      <!--zhizuo-->
      <div class='cover'>
        <img src='./images/jzman/1ywjd.jpeg' class="shipuimg">
        <div class="text">
          <nobr class="desc">肌肉力量训练：</nobr>每周2~5次，每次5个动作，每个动作至少做1组。推荐5类动作自由组合，供参考：仰卧剪刀腿+鸭子散步+俯卧登山+仰卧后撑+俯卧登山&哑铃推举</div>
        <div class="text">
          <nobr class="desc">注意事项:</nobr>建议在运动前后进行5~10min的整理活动，如肢体拉伸、有氧运动，有利于提高身体协调性，帮助减少肌肉疲劳。 运动量由小到大，循序渐进，持之以恒。以汗出但不大汗淋漓，运动后不头晕乏力为度
        </div>
        <div class="middle">
          <div class='small-title'><span style="color:#23A492;padding-right:0.04rem;">A</span>平坦腹部</div>
          <div class="list" @click="showPage(0)">
            <div class="listone">
              <img src='./images/jzman/1ywjd.jpeg' class="listimg">
              <div>
                <div class="part">仰卧剪刀腿</div>
                <div class="num">注意动作时肩膀与背部都要平贴在地面</div>
              </div>
              <img src='./images/1.png' class="imgtwo">
            </div>
          </div>

          <div class="list" @click="showPage(1)">
            <div class="listone">
              <img src='./images/jzman/2xtjf.jpeg' class="listimg">
              <div>
                <div class="part">悬腿卷腹</div>
                <div class="num">每组10~15个，组间休息30秒。</div>
              </div>
              <img src='./images/1.png' class="imgtwo">
            </div>
          </div>
          <div class="list" @click="showPage(2)">
            <div class="listone">
              <img src='./images/jzman/3axzc.jpeg' class="listimg">
              <div>
                <div class="part">A形支撑</div>
                <div class="num">每组30~60秒，组间休息30秒。</div>
              </div>
              <img src='./images/1.png' class="imgtwo">
            </div>
          </div>
          <div class='small-title'><span style="color:#23A492;padding-right:0.04rem;">B</span>性感臀部</div>
          <div class="list" @click="showPage(3)">
            <div class="listone">
              <img src='./images/jzman/4yzsb.jpeg' class="listimg">
              <div>
                <div class="part">鸭子散步</div>
                <div class="num">每组30~60秒，组间休息30秒。</div>
              </div>
              <img src='./images/1.png' class="imgtwo">
            </div>
          </div>
          <div class="list" @click="showPage(4)">
            <div class="listone">
              <img src='./images/jzman/5zysd.jpeg' class="listimg">
              <div>
                <div class="part">左右深蹲</div>
                <div class="num">每组30~60秒，组间休息30秒。</div>
              </div>
              <img src='./images/1.png' class="imgtwo">
            </div>
          </div>
          <div class="list" @click="showPage(5)">
            <div class="listone">
              <img src='./images/jzman/6ylgb.jpeg' class="listimg">
              <div>
                <div class="part">哑铃弓步走</div>
                <div class="num">每组30~60秒，组间休息30秒。</div>
              </div>
              <img src='./images/1.png' class="imgtwo">
            </div>
          </div>
          <div class='small-title'><span style="color:#23A492;padding-right:0.04rem;">C</span>紧致大腿</div>
          <div class="list" @click="showPage(6)">
            <div class="listone">
              <img src='./images/jzman/7fwds.jpeg' class="listimg">
              <div>
                <div class="part">俯卧登山</div>
                <div class="num">每组30~60秒，组间休息30秒。</div>
              </div>
              <img src='./images/1.png' class="imgtwo">
            </div>
          </div>
          <div class="list" @click="showPage(7)">
            <div class="listone">
              <img src='./images/jzman/8tysd.jpeg' class="listimg">
              <div>
                <div class="part">跳跃式深蹲</div>
                <div class="num">每组30~60秒，组间休息30秒。</div>
              </div>
              <img src='./images/1.png' class="imgtwo">
            </div>
          </div>
          <div class="list" @click="showPage(8)">
            <div class="listone">
              <img src='./images/jzman/9pxxz.jpeg' class="listimg">
              <div>
                <div class="part">螃蟹行走</div>
                <div class="num">每组30~60秒，组间休息30秒。</div>
              </div>
              <img src='./images/1.png' class="imgtwo">
            </div>
          </div>
          <div class='small-title'><span style="color:#23A492;padding-right:0.04rem;">D</span>窈窕双臂</div>
          <div class="list" @click="showPage(9)">
            <div class="listone">
              <img src='./images/jzman/10ywhc.jpeg' class="listimg">
              <div>
                <div class="part">仰卧后撑</div>
                <div class="num">每组10~15下，组间休息30秒。</div>
              </div>
              <img src='./images/1.png' class="imgtwo">
            </div>
          </div>
          <div class="list" @click="showPage(10)">
            <div class="listone">
              <img src='./images/jzman/11hjt.jpeg' class="listimg">
              <div>
                <div class="part">火箭推</div>
                <div class="num">每组10~15个，组间休息30秒。</div>
              </div>
              <img src='./images/1.png' class="imgtwo">
            </div>
          </div>
          <div class="list" @click="showPage(11)">
            <div class="listone">
              <img src='./images/jzman/12jtzc.jpeg' class="listimg">
              <div>
                <div class="part">交替支撑</div>
                <div class="num">每组30~60秒，组间休息30秒。</div>
              </div>
              <img src='./images/1.png' class="imgtwo">
            </div>
          </div>
           <div class='small-title'><span style="color:#23A492;padding-right:0.04rem;">E</span>有型背部</div>
          <div class="list" @click="showPage(12)">
            <div class="listone">
              <img src='./images/jzman/13yltj.jpeg' class="listimg">
              <div>
                <div class="part">俯卧登山+哑铃推举</div>
                <div class="num">手肘不用伸直，每组8~12个，组间休息30秒。</div>
              </div>
              <img src='./images/1.png' class="imgtwo">
            </div>
          </div>
          <div class="list" @click="showPage(13)">
            <div class="listone">
              <img src='./images/jzman/14gtsd.jpeg' class="listimg">
              <div>
                <div class="part">过头深蹲</div>
                <div class="num">不要含胸弓背，每组8~12个，组间休息30秒。</div>
              </div>
              <img src='./images/1.png' class="imgtwo">

            </div>
          </div>

        </div>
      </div>
      <!--zhizuo-->
      <!--zhizuo2-->
      <div class="toper" v-if="isShowPage" :style="{background:'url('+imgurl[pageIndex]+') no-repeat center',height:clientHeight}">
        <div class="surface" v-bind:style="{ height: clientHeight}">
          <div class="close" @click="close">×</div>
          <template v-if="pageIndex==0">
            <div class="title">仰卧剪刀腿</div>
            <div class="center-pic">
              <div :style="{background:'url('+imgurl[pageIndex]+') no-repeat center'}" class="imgurl" v-show="hide">
                <img src="./images/btn_home_videoplay_normal@2x.png" class="start" @click="start">
              </div>
              <video controls="controls" webkit-playsinline style="width:100%;" loop>
                <source src="http://img1.fshtop.com/1501748653390.mp4" type="video/mp4" />
              </video>
            </div>
            <ul class="list-text">
              <li>平躺，双腿伸直，两手放在骨盆两侧；</li>
              <li>双腿往上抬高，与地面垂直；</li>
              <li>动作开始时将双腿伸直互相交叉开合，每组做10~12次。</li>
              <li>Tips：注意动作时肩膀与背部都要平贴在地面</li>
            </ul>
          </template>
          <template v-if="pageIndex==1">
            <div class="title">悬腿卷腹</div>
            <div class="center-pic">
              <div :style="{background:'url('+imgurl[pageIndex]+') no-repeat center'}" class="imgurl" v-show="hide">
                <img src="./images/btn_home_videoplay_normal@2x.png" class="start" @click="start">
              </div>
              <video controls="controls" webkit-playsinline style="width:100%;" loop>
                <source src="http://img1.fshtop.com/1501747028442.mp4" type="video/mp4" />
              </video>
            </div>
            <ul class="list-text">
              <li>双手轻扶耳朵，仰卧在瑜伽垫上；膝盖弯曲，双脚不固定；</li>
              <li>腹肌收缩发力，拉动双腿和上半身向内贴近，上半身脊椎弯曲呈“C”字形；</li>
              <li>Tips：每组10~15个，组间休息30秒。</li>
            </ul>
          </template>
          <template v-if="pageIndex==2">
            <div class="title">A形支撑</div>
            <div class="center-pic">
              <div :style="{background:'url('+imgurl[pageIndex]+') no-repeat center'}" class="imgurl" v-show="hide">
                <img src="./images/btn_home_videoplay_normal@2x.png" class="start" @click="start">
              </div>
              <video controls="controls" webkit-playsinline style="width:100%;" loop>
                <source src="http://img1.fshtop.com/1501747223460.mp4" type="video/mp4" />
              </video>
            </div>
            <ul class="list-text">
              <li>平板支撑，臀部往上呈A字型；</li>
              <li>臀部降低，回到平板姿势。</li>
              <li>Tips：每组30~60秒，组间休息30秒。</li>
            </ul>
          </template>
          <template v-if="pageIndex==3">
            <div class="title">鸭子散步</div>
            <div class="center-pic">
              <div :style="{background:'url('+imgurl[pageIndex]+') no-repeat center'}" class="imgurl" v-show="hide">
                <img src="./images/btn_home_videoplay_normal@2x.png" class="start" @click="start">
              </div>
              <video controls="controls" webkit-playsinline style="width:100%;" loop>
                <source src="http://img1.fshtop.com/1501747035981.mp4" type="video/mp4" />
              </video>
            </div>
            <ul class="list-text">
              <li>下蹲、背部挺直；</li>
              <li>保持下蹲姿势，向前迈步走。</li>
              <li>Tips：每组30~60秒，组间休息30秒。</li>
            </ul>
          </template>
          <template v-if="pageIndex==4">
            <div class="title">左右深蹲</div>
            <div class="center-pic">
              <div :style="{background:'url('+imgurl[pageIndex]+') no-repeat center'}" class="imgurl" v-show="hide">
                <img src="./images/btn_home_videoplay_normal@2x.png" class="start" @click="start">
              </div>
              <video controls="controls" webkit-playsinline style="width:100%;" loop>
                <source src="http://img1.fshtop.com/1501747174096.mp4" type="video/mp4" />
              </video>
            </div>
            <ul class="list-text">
              <li>往左边跨步，下蹲，背部挺直；</li>
              <li>起立，回到起始位置，向右重复同样动作。</li>
              <li>Tips：每组30~60秒，组间休息30秒。</li>
            </ul>
          </template>
          <template v-if="pageIndex==5">
            <div class="title">哑铃弓步走</div>
            <div class="center-pic">
              <div :style="{background:'url('+imgurl[pageIndex]+') no-repeat center'}" class="imgurl" v-show="hide">
                <img src="./images/btn_home_videoplay_normal@2x.png" class="start" @click="start">
              </div>
              <video controls="controls" webkit-playsinline style="width:100%;" loop>
                <source src="http://img1.fshtop.com/1501747174788.mp4" type="video/mp4" />
              </video>
            </div>
            <ul class="list-text">
              <li>手持哑铃、后脚膝盖靠近地面，弓步往前行走。</li>
              <li>Tips：每组30~60秒，组间休息30秒。</li>
            </ul>
          </template>
          <template v-if="pageIndex==6">
            <div class="title">俯卧登山</div>
            <div class="center-pic">
              <div :style="{background:'url('+imgurl[pageIndex]+') no-repeat center'}" class="imgurl" v-show="hide">
                <img src="./images/btn_home_videoplay_normal@2x.png" class="start" @click="start">
              </div>
              <video controls="controls" webkit-playsinline style="width:100%;" loop>
                <source src="http://img1.fshtop.com/1501843029285.mp4" type="video/mp4" />
              </video>
            </div>
            <ul class="list-text">
              <li>俯卧撑起，双腿膝盖交替靠近胸部。</li>
              <li>Tips：每组30~60秒，组间休息30秒。</li>
            </ul>
          </template>
          <template v-if="pageIndex==7">
            <div class="title">跳跃式深蹲</div>
            <div class="center-pic">
              <div :style="{background:'url('+imgurl[pageIndex]+') no-repeat center'}" class="imgurl" v-show="hide">
                <img src="./images/btn_home_videoplay_normal@2x.png" class="start" @click="start">
              </div>
              <video controls="controls" webkit-playsinline style="width:100%;" loop>
                <source src="http://img1.fshtop.com/1501747174014.mp4" type="video/mp4" />
              </video>
            </div>
            <ul class="list-text">
              <li>下蹲，背部挺直；</li>
              <li>向上跳跃，落地时顺势下蹲；</li>
              <li>Tips：每组30~60秒，组间休息30秒。</li>
            </ul>
          </template>
          <template v-if="pageIndex==8">
            <div class="title">螃蟹行走</div>
            <div class="center-pic">
              <div :style="{background:'url('+imgurl[pageIndex]+') no-repeat center'}" class="imgurl" v-show="hide">
                <img src="./images/btn_home_videoplay_normal@2x.png" class="start" @click="start">
              </div>
              <video controls="controls" webkit-playsinline style="width:100%;" loop>
                <source src="http://img1.fshtop.com/1501747034796.mp4" type="video/mp4" />
              </video>
            </div>
            <ul class="list-text">
              <li>下蹲，背部挺直；</li>
              <li>侧面移动。</li>
              <li>Tips：每组30~60秒，组间休息30秒。</li>
            </ul>
          </template>
          <template v-if="pageIndex==9">
            <div class="title">仰卧后撑</div>
            <div class="center-pic">
              <div :style="{background:'url('+imgurl[pageIndex]+') no-repeat center'}" class="imgurl" v-show="hide">
                <img src="./images/btn_home_videoplay_normal@2x.png" class="start" @click="start">
              </div>
              <video controls="controls" webkit-playsinline style="width:100%;" loop>
                <source src="http://img1.fshtop.com/1501747023567.mp4" type="video/mp4" />
              </video>
            </div>
            <ul class="list-text">
              <li>绷紧肩部，双手比肩稍宽撑在凳子边缘，不压迫手腕，手肘微曲，手肘朝后。</li>
              <li>缓慢曲肘，背部贴住凳子边缘下落至上臂与地面平行位置，稍作停顿。</li>
              <li>发力垂直撑起身体至起始位置，在最高点手肘微曲。</li>
              <li>Tips：每组10~15下，组间休息30秒。</li>
            </ul>
          </template>
          <template v-if="pageIndex==10">
            <div class="title">火箭推</div>
            <div class="center-pic">
              <div :style="{background:'url('+imgurl[pageIndex]+') no-repeat center'}" class="imgurl" v-show="hide">
                <img src="./images/btn_home_videoplay_normal@2x.png" class="start" @click="start">
              </div>
              <video controls="controls" webkit-playsinline style="width:100%;" loop>
                <source src="http://img1.fshtop.com/1501747031174.mp4" type="video/mp4" />
              </video>
            </div>
            <ul class="list-text">
              <li>手持哑铃下蹲；</li>
              <li>臀腿爆发力往上伸直，顺势伸直手臂举起哑铃。</li>
              <li>Tips：每组10~15个，组间休息30秒。</li>
            </ul>
          </template>
          <template v-if="pageIndex==11">
            <div class="title">交替支撑</div>
            <div class="center-pic">
              <div :style="{background:'url('+imgurl[pageIndex]+') no-repeat center'}" class="imgurl" v-show="hide">
                <img src="./images/btn_home_videoplay_normal@2x.png" class="start" @click="start">
              </div>
              <video controls="controls" webkit-playsinline style="width:100%;" loop>
                <source src="http://img1.fshtop.com/1501747223021.mp4" type="video/mp4" />
              </video>
            </div>
            <ul class="list-text">
              <li>平板支撑，双手交替撑直</li>
              <li>回到平板姿势</li>
              <li>Tips：每组30~60秒，组间休息30秒。</li>
            </ul>
          </template>
          <template v-if="pageIndex==12">
            <div class="title">俯卧登山+哑铃推举</div>
            <div class="center-pic">
              <div :style="{background:'url('+imgurl[pageIndex]+') no-repeat center'}" class="imgurl" v-show="hide">
                <img src="./images/btn_home_videoplay_normal@2x.png" class="start" @click="start">
              </div>
              <video controls="controls" webkit-playsinline style="width:100%;" loop>
                <source src="http://img1.fshtop.com/1501817699835.mp4" type="video/mp4" />
              </video>
            </div>
            <ul class="list-text">
              <li>手持哑铃、后脚膝盖靠近地面，弓步往前行走。</li>
              <li>俯卧撑起，双腿膝盖交替靠近胸部；</li>
              <li>大臂发力，将哑铃举至头顶。</li>
              <li>Tips：手肘不用伸直，每组8~12个，组间休息30秒。</li>
            </ul>
          </template>
          <template v-if="pageIndex==13">
            <div class="title">过头深蹲</div>
            <div class="center-pic">
              <div :style="{background:'url('+imgurl[pageIndex]+') no-repeat center'}" class="imgurl" v-show="hide">
                <img src="./images/btn_home_videoplay_normal@2x.png" class="start" @click="start">
              </div>
              <video controls="controls" webkit-playsinline style="width:100%;" loop>
                <source src="http://img1.fshtop.com/1501747027737.mp4" type="video/mp4" />
              </video>
            </div>
            <ul class="list-text">
              <li>保持背部挺直，臀部向后撅起，屈膝下蹲至大腿平行于地面，保持2~3秒；；</li>
              <li>Tips：每组30~60秒，组间休息30秒。</li>
              <li>下蹲过程中尽量做到臀腿发力，蹬地起身，返回起始位置，重复。</li>
              <li>Tips：不要含胸弓背，每组8~12个，组间休息30秒。</li>
            </ul>
          </template>
          <template v-if="pageIndex==14">
            <div class="title">哑铃弓步走</div>
            <div class="center-pic">
              <div :style="{background:'url('+imgurl[pageIndex]+') no-repeat center'}" class="imgurl" v-show="hide">
                <img src="./images/btn_home_videoplay_normal@2x.png" class="start" @click="start">
              </div>
              <video controls="controls" webkit-playsinline style="width:100%;" loop>
                <source src="http://img1.fshtop.com/1501747174788.mp4" type="video/mp4" />
              </video>
            </div>
            <ul class="list-text">
              <li>手持哑铃、后脚膝盖靠近地面，弓步往前行走。</li>
              <li>Tips：每组30~60秒，组间休息30秒。</li>
            </ul>
          </template>
          <div class="swiper">
            <div class="scroll-ul">
              <div class="li">
                <div class="sdd" v-show="pageIndex==0"></div>
                <div class="pic" @click="showPage(0)"><img class="last-img" src='./images/jzman/1ywjd.jpeg'></div>
              </div>
              <div class="li">
                <div class="sdd" v-show="pageIndex==1"></div>
                <div class="pic" @click="showPage(1)"><img class="last-img" src='./images/jzman/2xtjf.jpeg'></div>
              </div>
              <div class="li">
                <div class="sdd" v-show="pageIndex==2"></div>
                <div class="pic" @click="showPage(2)"><img class="last-img" src='./images/jzman/3axzc.jpeg'></div>
              </div>
              <div class="li">
                <div class="sdd" v-show="pageIndex==3"></div>
                <div class="pic" @click="showPage(3)"><img class="last-img" src='./images/jzman/4yzsb.jpeg'></div>
              </div>
              <div class="li">
                <div class="sdd" v-show="pageIndex==4"></div>
                <div class="pic" @click="showPage(4)"><img class="last-img" src='./images/jzman/5zysd.jpeg'></div>
              </div>
              <div class="li">
                <div class="sdd" v-show="pageIndex==5"></div>
                <div class="pic" @click="showPage(5)"><img class="last-img" src='./images/jzman/6ylgb.jpeg'></div>
              </div>
              <div class="li">
                <div class="sdd" v-show="pageIndex==6"></div>
                <div class="pic" @click="showPage(6)"><img class="last-img" src='./images/jzman/7fwds.jpeg'></div>
              </div>
              <div class="li">
                <div class="sdd" v-show="pageIndex==7"></div>
                <div class="pic" @click="showPage(7)"><img class="last-img" src='./images/jzman/8tysd.jpeg'></div>
              </div>
              <div class="li">
                <div class="sdd" v-show="pageIndex==8"></div>
                <div class="pic" @click="showPage(8)"><img class="last-img" src='./images/jzman/9pxxz.jpeg'></div>
              </div>
              <div class="li">
                <div class="sdd" v-show="pageIndex==9"></div>
                <div class="pic" @click="showPage(9)"><img class="last-img" src='./images/jzman/10ywhc.jpeg'></div>
              </div>
              <div class="li">
                <div class="sdd" v-show="pageIndex==10"></div>
                <div class="pic" @click="showPage(10)"><img class="last-img" src='./images/jzman/11hjt.jpeg'></div>
              </div>
              <div class="li">
                <div class="sdd" v-show="pageIndex==11"></div>
                <div class="pic" @click="showPage(11)"><img class="last-img" src='./images/jzman/12jtzc.jpeg'></div>
              </div>
              <div class="li">
                <div class="sdd" v-show="pageIndex==12"></div>
                <div class="pic" @click="showPage(12)"><img class="last-img" src='./images/jzman/13yltj.jpeg'></div>
              </div>
              <div class="li">
                <div class="sdd" v-show="pageIndex==13"></div>
                <div class="pic" @click="showPage(13)"><img class="last-img" src='./images/jzman/14gtsd.jpeg'></div>
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
      hide: true,
      clientHeight: "6rem",
      pageIndex: 0,
      imgurl: [
        require('./images/jzman/1ywjd.jpeg'),
        require('./images/jzman/2xtjf.jpeg'),
        require('./images/jzman/3axzc.jpeg'),
        require('./images/jzman/4yzsb.jpeg'),
        require('./images/jzman/5zysd.jpeg'),
        require('./images/jzman/6ylgb.jpeg'),
        require('./images/jzman/7fwds.jpeg'),
        require('./images/jzman/8tysd.jpeg'),
        require('./images/jzman/9pxxz.jpeg'),
        require('./images/jzman/10ywhc.jpeg'),
        require('./images/jzman/11hjt.jpeg'),
        require('./images/jzman/12jtzc.jpeg'),
        require('./images/jzman/13yltj.jpeg'),
        require('./images/jzman/14gtsd.jpeg')
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
    close() {
      this.isShowPage = false;
      this.local = true
    },
    start() {
      this.hide = false;
      this.video = document.querySelector('video')
      this.video.style.display = 'block';
      this.video.play();
    },

    showPage(pageIndex) {
      this.video = document.querySelector('video');
      if (this.video) {
        this.video.pause();
      }
      this.pageIndex = pageIndex;
      this.isShowPage = true;
      this.hide = true;

      setTimeout(() => {
        let sdd = $(".swiper").scrollLeft();
        console.log(sdd)

        switch (this.pageIndex) {
          case 5:
            $(".swiper").scrollLeft(175);
            break;
          case 6:
            $(".swiper").scrollLeft(240);
            break;
          case 7:
            $(".swiper").scrollLeft(300);
            break;
          case 8:
            $(".swiper").scrollLeft(360);
            break;
          case 9:
            $(".swiper").scrollLeft(420);
            break;
          case 10:
            $(".swiper").scrollLeft(480);
            break;
          case 11:
            $(".swiper").scrollLeft(540);
            break;
          case 12:
            $(".swiper").scrollLeft(600);
            break;
          case 13:
            $(".swiper").scrollLeft(640);
            break;
          case 14:
            $(".swiper").scrollLeft(680);
            break;

        }
      }, 100)
    }
  },
  mounted() {
    const clientH = $(window).height();
    this.clientHeight = this.backObj.height = clientH + 'px';
  },
  updated() {
  }
};


</script>



<style lang="less">

</style>