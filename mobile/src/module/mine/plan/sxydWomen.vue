<template>
  <div>
    <div class="loading-page" v-if="!dataContent&&!loadError"></div>
    <div class="loaderror-page" v-if="!dataContent&&loadError">{{loadError.msg}}</div>
    <div class="content-preload" :class="{show:dataContent}">
      <!--zhizuo-->
      <div class='cover'>
        <img src='./images/sxwoman/1a.jpeg' class="shipuimg">
        <div class="text">
          <nobr class="desc">肌肉力量训练：</nobr>每周2~4次，每次5个动作，每个动作至少做3组。推荐5类动作自由组合，供参考：跪姿俯卧撑+俯身哑铃划船+单腿臀桥+哑铃后撤箭步蹲+两头起。</div>
        <div class="text">
          <nobr class="desc">注意事项:</nobr>建议在运动前后进行5~10min的整理活动，如肢体拉伸、有氧运动，有利于提高身体协调性，帮助减少肌肉疲劳。 运动量由小到大，循序渐进，持之以恒。以汗出但不大汗淋漓，运动后不头晕乏力为度
        </div>
        <div class="text">
          <nobr class="desc">有氧耐力运动指导建议：</nobr>把肌肉力量训练外的有氧耐力运动限制在每周2次，每次30分钟。这样既可以保持心血管系统的健康，又不会引起可能的肌肉损失，可选择慢跑、慢速游泳、打羽毛球等有氧耐力运动。 尽量避免把肌肉力量训练与有氧耐力运动在同一天进行，因为有氧耐力运动会消耗大量的热量，以致肌肉缺乏生长的机会，不利于塑形。
        </div>
        <div class="middle">
          <div class='small-title'><span style="color:#23A492;padding-right:0.04rem;">A</span>胸肌整体</div>
          <div class="list" @click="showPage(0,$event)">
            <div class="listone">
              <img src='./images/sxwoman/1a.jpeg' class="listimg">
              <div>
                <div class="part">跪姿俯卧撑</div>
                <div class="num">双手间距略宽于肩，以膝盖为支点跪在瑜伽垫上；不要耸肩，下巴微收，膝盖以上呈一条直线。每次10个，做3组，组间休息30秒。</div>
              </div>
              <img src='./images/1.png' class="imgtwo">
            </div>
          </div>
  
          <div class="list" @click="showPage(1,$event)">
            <div class="listone">
              <img src='./images/sxwoman/2b.jpeg' class="listimg">
              <div>
                <div class="part">地板哑铃卧推</div>
                <div class="num">每组10~15个，组间休息30秒。</div>
              </div>
              <img src='./images/1.png' class="imgtwo">
            </div>
          </div>
          <div class="list" @click="showPage(2,$event)">
            <div class="listone">
              <img src='./images/sxwoman/3c.jpeg' class="listimg">
              <div>
                <div class="part">站姿哑铃肩上推</div>
                <div class="num">每组10~20个，组间休息30秒。</div>
              </div>
              <img src='./images/1.png' class="imgtwo">
            </div>
          </div>
          <div class='small-title'><span style="color:#23A492;padding-right:0.04rem;">B</span>有型背部</div>
          <div class="list" @click="showPage(3,$event)">
            <div class="listone">
              <img src='./images/sxwoman/4d.jpeg' class="listimg">
              <div>
                <div class="part">俯身哑铃低位划船</div>
                <div class="num">不要耸肩，每次10~15个，做3组，组间休息30秒。</div>
              </div>
              <img src='./images/1.png' class="imgtwo">
            </div>
          </div>
          <div class="list" @click="showPage(4,$event)">
            <div class="listone">
              <img src='./images/sxwoman/5e.jpeg' class="listimg">
              <div>
                <div class="part">弹力带坐姿划船</div>
                <div class="num">往后拉时，肘尽量紧贴身体，不要耸肩。每次10~15个，做3组，组间不休息。</div>
              </div>
              <img src='./images/1.png' class="imgtwo">
            </div>
          </div>
          <div class="list" @click="showPage(5,$event)">
            <div class="listone">
              <img src='./images/sxwoman/6f.jpeg' class="listimg">
              <div>
                <div class="part">仰卧抬手</div>
                <div class="num">每次10~15个，做3组，组间不休息。</div>
              </div>
              <img src='./images/1.png' class="imgtwo">
            </div>
          </div>
          <div class='small-title'><span style="color:#23A492;padding-right:0.04rem;">C</span>性感臀部</div>
          <div class="list" @click="showPage(6,$event)">
            <div class="listone">
              <img src='./images/sxwoman/7g.jpeg' class="listimg">
              <div>
                <div class="part">单腿臀桥</div>
                <div class="num">左右一次为1组，每组30~60秒，做3组，组间不休息。</div>
              </div>
              <img src='./images/1.png' class="imgtwo">
            </div>
          </div>
          <div class="list" @click="showPage(7,$event)">
            <div class="listone">
              <img src='./images/sxwoman/8h.jpeg' class="listimg">
              <div>
                <div class="part">侧卧抬腿</div>
                <div class="num">左右一次为1组，做3组，组间不休息。</div>
              </div>
              <img src='./images/1.png' class="imgtwo">
            </div>
          </div>
          <div class="list" @click="showPage(8,$event)">
            <div class="listone">
              <img src='./images/sxwoman/9i.jpeg' class="listimg">
              <div>
                <div class="part">蚌式</div>
                <div class="num">左右一次为1组，做3组，组间不休息。</div>
              </div>
              <img src='./images/1.png' class="imgtwo">
            </div>
          </div>
          <div class='small-title'><span style="color:#23A492;padding-right:0.04rem;">D</span>紧致大腿</div>
          <div class="list" @click="showPage(9,$event)">
            <div class="listone">
              <img src='./images/sxwoman/10j.jpeg' class="listimg">
              <div>
                <div class="part">哑铃后撤箭步蹲</div>
                <div class="num">每组两边各10次，共3组，组间休息30秒。</div>
              </div>
              <img src='./images/1.png' class="imgtwo">
            </div>
          </div>
          <div class="list" @click="showPage(10,$event)">
            <div class="listone">
              <img src='./images/sxwoman/11k.jpeg' class="listimg">
              <div>
                <div class="part">保加利亚式箭步蹲</div>
                <div class="num">完成8次左腿箭步蹲，再换右腿8次，记一组训练。做3组，组间不休息。</div>
              </div>
              <img src='./images/1.png' class="imgtwo">
            </div>
          </div>
          <div class="list" @click="showPage(11,$event)">
            <div class="listone">
              <img src='./images/sxwoman/12l.jpeg' class="listimg">
              <div>
                <div class="part">侧弓步蹲</div>
                <div class="num">完成8次右腿及左腿侧弓步蹲，记一组训练。做3组，组间不休息。</div>
              </div>
              <img src='./images/1.png' class="imgtwo">
            </div>
          </div>
          <div class='small-title'><span style="color:#23A492;padding-right:0.04rem;">E</span>平坦腹部</div>
          <div class="list" @click="showPage(12,$event)">
            <div class="listone">
              <img src='./images/sxwoman/13m.jpeg' class="listimg">
              <div>
                <div class="part">两头起</div>
                <div class="num">10~15个为1组，做3组，组间休息30秒。</div>
              </div>
              <img src='./images/1.png' class="imgtwo">
            </div>
          </div>
          <div class="list" @click="showPage(13,$event)">
            <div class="listone">
              <img src='./images/sxwoman/14n.jpeg' class="listimg">
              <div>
                <div class="part">俯卧登山</div>
                <div class="num">完成8次左右腿交替为1组，做3组，组间休息30秒。</div>
              </div>
              <img src='./images/1.png' class="imgtwo">
            </div>
          </div>
          <div class="list" @click="showPage(14,$event)">
            <div class="listone">
              <img src='./images/sxwoman/15o.jpeg' class="listimg">
              <div>
                <div class="part">侧面卷腹</div>
                <div class="num">左右侧各8次，记一组训练。做3组，组间休息30秒</div>
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
            <div class="title">跪姿俯卧撑</div>
            <div class="center-pic">
              <div :style="{background:'url('+imgurl[pageIndex]+') no-repeat center'}" class="imgurl" v-show="hide">
                <img src="./images/btn_home_videoplay_normal@2x.png" class="start" @click="start">
              </div>
              <video controls="controls" webkit-playsinline style="width:100%;" loop>
                <source src="http://img1.fshtop.com/1501748852943.mp4" type="video/mp4" />
              </video>
            </div>
            <ul class="list-text">
              <li>腰腹收紧，膝盖跪地，下巴微收，手肘向斜后45度打开，俯卧垫上；</li>
              <li>胸肌发力撑起，直至手臂伸直，保持腹、背、臀等紧绷。</li>
              <li>Tips：双手间距略宽于肩，以膝盖为支点跪在瑜伽垫上；不要耸肩，下巴微收，膝盖以上呈一条直线。每次10个，做3组，组间休息30秒。</li>
            </ul>
          </template>
          <template v-if="pageIndex==1">
            <div class="title">地板哑铃卧推</div>
            <div class="center-pic">
              <div :style="{background:'url('+imgurl[pageIndex]+') no-repeat center'}" class="imgurl" v-show="hide">
                <img src="./images/btn_home_videoplay_normal@2x.png" class="start" @click="start">
              </div>
              <video controls="controls" webkit-playsinline style="width:100%;" loop>
                <source src="http://img1.fshtop.com/1501748853930.mp4" type="video/mp4" />
              </video>
            </div>
            <ul class="list-text">
              <li>平躺垫上，手持哑铃，大臂打开，与身体呈45度夹角，小臂垂直于地面；</li>
              <li>发力时上臂向身体靠紧，顶端保持1~2秒，再缓缓放下。</li>
              <li>Tips：每组10~15个，组间休息30秒。</li>
            </ul>
          </template>
          <template v-if="pageIndex==2">
            <div class="title">站姿哑铃肩上推</div>
            <div class="center-pic">
              <div :style="{background:'url('+imgurl[pageIndex]+') no-repeat center'}" class="imgurl" v-show="hide">
                <img src="./images/btn_home_videoplay_normal@2x.png" class="start" @click="start">
              </div>
              <video controls="controls" webkit-playsinline style="width:100%;" loop>
                <source src="http://img1.fshtop.com/1501748854210.mp4" type="video/mp4" />
              </video>
            </div>
            <ul class="list-text">
              <li>双脚与肩同宽站立地面，臀部夹紧；</li>
              <li>挺胸收腹，沉肩，向上推举哑铃至双臂完全伸直，使哑铃停于头上方约1秒，缓慢放落哑铃于准备姿势的胸前肩高位置。</li>
              <li>Tips：每组10~20个，组间休息30秒。</li>
            </ul>
          </template>
          <template v-if="pageIndex==3">
            <div class="title">俯身哑铃低位划船</div>
            <div class="center-pic">
              <div :style="{background:'url('+imgurl[pageIndex]+') no-repeat center'}" class="imgurl" v-show="hide">
                <img src="./images/btn_home_videoplay_normal@2x.png" class="start" @click="start">
              </div>
              <video controls="controls" webkit-playsinline style="width:100%;" loop>
                <source src="http://img1.fshtop.com/1501818040468.mp4" type="video/mp4" />
              </video>
            </div>
            <ul class="list-text">
              <li>下蹲、背部挺直；</li>
              <li>俯身站立，腰腹收紧，背部挺直，膝盖微屈；双手持哑铃自然下垂，掌心相对；</li>
              <li>保持上身不动，双臂沿体侧上拉哑铃至最高点；感受背部肌群的顶峰收缩，停顿1~2秒，缓慢放下。</li>
              <li>Tips：不要耸肩，每次10~15个，做3组，组间休息30秒。</li>
            </ul>
          </template>
          <template v-if="pageIndex==4">
            <div class="title">弹力带坐姿划船</div>
            <div class="center-pic">
              <div :style="{background:'url('+imgurl[pageIndex]+') no-repeat center'}" class="imgurl" v-show="hide">
                <img src="./images/btn_home_videoplay_normal@2x.png" class="start" @click="start">
              </div>
              <video controls="controls" webkit-playsinline style="width:100%;" loop>
                <source src="http://img1.fshtop.com/1501748878458.mp4" type="video/mp4" />
              </video>
            </div>
            <ul class="list-text">
              <li>上身挺直坐垫上，收缩腹部，身体略后倾；</li>
              <li>双腿屈髋屈膝，脚跟碰地，双腿平行，脚尖往上钩并将弹力带套双脚上；</li>
              <li>双手伸直向前在膝盖上方，双手握紧弹力带，掌心朝内。肩膀略往后收及往下压；</li>
              <li>呼气，双手往后拉至肚脐前方。吸气，缓慢回到开始姿势。</li>
              <li>Tips：往后拉时，肘尽量紧贴身体，不要耸肩。每次10~15个，做3组，组间不休息。</li>
            </ul>
          </template>
          <template v-if="pageIndex==5">
            <div class="title">仰卧抬手</div>
            <div class="center-pic">
              <div :style="{background:'url('+imgurl[pageIndex]+') no-repeat center'}" class="imgurl" v-show="hide">
                <img src="./images/btn_home_videoplay_normal@2x.png" class="start" @click="start">
              </div>
              <video controls="controls" webkit-playsinline style="width:100%;" loop>
                <source src="http://img1.fshtop.com/1501817752422.mp4" type="video/mp4" />
              </video>
            </div>
            <ul class="list-text">
              <li>俯卧垫子上，臀部收紧，上背部微微离开地面，微收下巴；</li>
              <li>双手与身体形成W字型，抬大臂离开地面，保持1秒，回到原来位置。</li>
              <li>Tips：每次10~15个，做3组，组间不休息。</li>
            </ul>
          </template>
          <template v-if="pageIndex==6">
            <div class="title">单腿臀桥</div>
            <div class="center-pic">
              <div :style="{background:'url('+imgurl[pageIndex]+') no-repeat center'}" class="imgurl" v-show="hide">
                <img src="./images/btn_home_videoplay_normal@2x.png" class="start" @click="start">
              </div>
              <video controls="controls" webkit-playsinline style="width:100%;" loop>
                <source src="http://img1.fshtop.com/1501748879067.mp4" type="video/mp4" />
              </video>
            </div>
            <ul class="list-text">
              <li>屈膝仰卧平躺、脚掌着地；</li>
              <li>收缩臀大肌，向上挺起臀部，直到膝、臀、肩在一条直线上；</li>
              <li>保持躯干姿势不变，右脚抬离地面，小腿大腿成90°，保持左边臀部紧张状态15~30秒，然后换左脚，动作相同。</li>
              <li>Tips：左右一次为1组，每组30~60秒，做3组，组间不休息。</li>
            </ul>
          </template>
          <template v-if="pageIndex==7">
            <div class="title">侧卧抬腿</div>
            <div class="center-pic">
              <div :style="{background:'url('+imgurl[pageIndex]+') no-repeat center'}" class="imgurl" v-show="hide">
                <img src="./images/btn_home_videoplay_normal@2x.png" class="start" @click="start">
              </div>
              <video controls="controls" webkit-playsinline style="width:100%;" loop>
                <source src="http://img1.fshtop.com/1501748886669.mp4" type="video/mp4" />
              </video>
            </div>
            <ul class="list-text">
              <li>双脚放进弹力圈内；</li>
              <li>右侧卧，右手支头，左手支撑，抬高左腿，最高点保持3秒，回落；</li>
              <li>然后换左侧，动作相同。</li>
              <li>Tip：左右一次为1组，做3组，组间不休息。</li>
            </ul>
          </template>
          <template v-if="pageIndex==8">
            <div class="title">蚌式</div>
            <div class="center-pic">
              <div :style="{background:'url('+imgurl[pageIndex]+') no-repeat center'}" class="imgurl" v-show="hide">
                <img src="./images/btn_home_videoplay_normal@2x.png" class="start" @click="start">
              </div>
              <video controls="controls" webkit-playsinline style="width:100%;" loop>
                <source src="http://img1.fshtop.com/1501748889002.mp4" type="video/mp4" />
              </video>
            </div>
            <ul class="list-text">
              <li>左侧卧，双脚放进弹力圈内；</li>
              <li>稳定住躯干，臀部发力将一侧腿部向外侧抬，膝盖弯曲的角度维持不变，坚持3秒，慢慢回落，重复动作。</li>
              <li>Tip：左右一次为1组，做3组，组间不休息。</li>
            </ul>
          </template>
          <template v-if="pageIndex==9">
            <div class="title">哑铃后撤箭步蹲</div>
            <div class="center-pic">
              <div :style="{background:'url('+imgurl[pageIndex]+') no-repeat center'}" class="imgurl" v-show="hide">
                <img src="./images/btn_home_videoplay_normal@2x.png" class="start" @click="start">
              </div>
              <video controls="controls" webkit-playsinline style="width:100%;" loop>
                <source src="http://img1.fshtop.com/1501748889803.mp4" type="video/mp4" />
              </video>
            </div>
            <ul class="list-text">
              <li>上半身挺直，哑铃置于身体两侧，重心位于两脚中间；</li>
              <li>下蹲时前侧大腿与身体成90°，后侧大腿与地面成45°。蹲起时，前腿臀部及大腿前侧有收缩发力感，臀部更加明显。</li>
              <li>Tips：每组两边各10次，共3组，组间休息30秒。</li>
            </ul>
          </template>
          <template v-if="pageIndex==10">
            <div class="title">保加利亚式箭步蹲</div>
            <div class="center-pic">
              <div :style="{background:'url('+imgurl[pageIndex]+') no-repeat center'}" class="imgurl" v-show="hide">
                <img src="./images/btn_home_videoplay_normal@2x.png" class="start" @click="start">
              </div>
              <video controls="controls" webkit-playsinline style="width:100%;" loop>
                <source src="http://img1.fshtop.com/1501748896246.mp4" type="video/mp4" />
              </video>
            </div>
            <ul class="list-text">
              <li>站凳前约1步远，屈右膝使右脚背搭凳上；</li>
              <li>躯干挺直，左膝弯曲使身体下降；</li>
              <li>伸左膝站直左腿，记作完成一次动作。</li>
              <li>Tips：完成8次左腿箭步蹲，再换右腿8次，记一组训练。做3组，组间不休息。</li>
            </ul>
          </template>
          <template v-if="pageIndex==11">
            <div class="title">侧弓步蹲</div>
            <div class="center-pic">
              <div :style="{background:'url('+imgurl[pageIndex]+') no-repeat center'}" class="imgurl" v-show="hide">
                <img src="./images/btn_home_videoplay_normal@2x.png" class="start" @click="start">
              </div>
              <video controls="controls" webkit-playsinline style="width:100%;" loop>
                <source src="http://img1.fshtop.com/1501748897422.mp4" type="video/mp4" />
              </video>
            </div>
            <ul class="list-text">
              <li>站立与肩同宽；</li>
              <li>右腿弓步侧跨一步，膝盖成直角，然后左腿重复。</li>
              <li>Tips：完成8次右腿及左腿侧弓步蹲，记一组训练。做3组，组间不休息。</li>
            </ul>
          </template>
          <template v-if="pageIndex==12">
            <div class="title">两头起</div>
            <div class="center-pic">
              <div :style="{background:'url('+imgurl[pageIndex]+') no-repeat center'}" class="imgurl" v-show="hide">
                <img src="./images/btn_home_videoplay_normal@2x.png" class="start" @click="start">
              </div>
              <video controls="controls" webkit-playsinline style="width:100%;" loop>
                <source src="http://img1.fshtop.com/1501748897755.mp4" type="video/mp4" />
              </video>
            </div>
            <ul class="list-text">
              <li>平躺地面，双臂伸直于头上方。腿伸直，拉长身体，从手指尖到脚尖成一条直线；</li>
              <li>控制身体，从髋关节抬起伸直的双腿，上身绷紧也向上抬使身体呈一个V字，停顿3秒后还原。</li>
              <li>Tips：10~15个为1组，做3组，组间休息30秒。</li>
            </ul>
          </template>
          <template v-if="pageIndex==13">
            <div class="title">俯卧登山</div>
            <div class="center-pic">
              <div :style="{background:'url('+imgurl[pageIndex]+') no-repeat center'}" class="imgurl" v-show="hide">
                <img src="./images/btn_home_videoplay_normal@2x.png" class="start" @click="start">
              </div>
              <video controls="controls" webkit-playsinline style="width:100%;" loop>
                <source src="http://img1.fshtop.com/1501748831727.mp4" type="video/mp4" />
              </video>
            </div>
            <ul class="list-text">
              <li>起始动作，如同俯卧撑一样，将全身重量置于手掌和脚趾上，确保身体为一直线；</li>
              <li>屈髋抬腿往前靠近胸部，保持背部平坦，腹部收紧，躯干稳定；</li>
              <li>往后放下，并换腿抬起，重复动作。</li>
              <li>Tips：完成8次左右腿交替为1组，做3组，组间休息30秒。</li>
            </ul>
          </template>
          <template v-if="pageIndex==14">
            <div class="title">侧面卷腹</div>
            <div class="center-pic">
              <div :style="{background:'url('+imgurl[pageIndex]+') no-repeat center'}" class="imgurl" v-show="hide">
                <img src="./images/btn_home_videoplay_normal@2x.png" class="start" @click="start">
              </div>
              <video controls="controls" webkit-playsinline style="width:100%;" loop>
                <source src="http://img1.fshtop.com/1501748904971.mp4" type="video/mp4" />
              </video>
            </div>
            <ul class="list-text">
              <li>左侧躺垫上，双脚弯曲；</li>
              <li>左手手掌支撑身体前面，右手轻抚耳朵；</li>
              <li>腹部用力抬起膝盖靠近胸部。</li>
              <li>Tips：左右侧各8次，记一组训练。做3组，组间休息30秒。</li>
            </ul>
          </template>
          <div class="swiper">
            <div class="scroll-ul">
              <div class="li">
                <div class="sdd" v-show="pageIndex==0"></div>
                <div class="pic" @click="showPage(0,$event,'yes')">
                  <img class="last-img" src='./images/sxwoman/1a.jpeg'>
                </div>
              </div>
              <div class="li">
                <div class="sdd" v-show="pageIndex==1"></div>
                <div class="pic" @click="showPage(1,$event,'yes')">
                  <img class="last-img" src='./images/sxwoman/2b.jpeg'>
                </div>
              </div>
              <div class="li">
                <div class="sdd" v-show="pageIndex==2"></div>
                <div class="pic" @click="showPage(2,$event,'yes')">
                  <img class="last-img" src='./images/sxwoman/3c.jpeg'>
                </div>
              </div>
              <div class="li">
                <div class="sdd" v-show="pageIndex==3"></div>
                <div class="pic" @click="showPage(3,$event,'yes')">
                  <img class="last-img" src='./images/sxwoman/4d.jpeg'>
                </div>
              </div>
              <div class="li">
                <div class="sdd" v-show="pageIndex==4"></div>
                <div class="pic" @click="showPage(4,$event,'yes')">
                  <img class="last-img" src='./images/sxwoman/5e.jpeg'>
                </div>
              </div>
              <div class="li">
                <div class="sdd" v-show="pageIndex==5"></div>
                <div class="pic" @click="showPage(5,$event,'yes')">
                  <img class="last-img" src='./images/sxwoman/6f.jpeg'>
                </div>
              </div>
              <div class="li">
                <div class="sdd" v-show="pageIndex==6"></div>
                <div class="pic" @click="showPage(6,$event,'yes')">
                  <img class="last-img" src='./images/sxwoman/7g.jpeg'>
                </div>
              </div>
              <div class="li">
                <div class="sdd" v-show="pageIndex==7"></div>
                <div class="pic" @click="showPage(7,$event,'yes')">
                  <img class="last-img" src='./images/sxwoman/8h.jpeg'>
                </div>
              </div>
              <div class="li">
                <div class="sdd" v-show="pageIndex==8"></div>
                <div class="pic" @click="showPage(8,$event,'yes')">
                  <img class="last-img" src='./images/sxwoman/9i.jpeg'>
                </div>
              </div>
              <div class="li">
                <div class="sdd" v-show="pageIndex==9"></div>
                <div class="pic" @click="showPage(9,$event,'yes')">
                  <img class="last-img" src='./images/sxwoman/10j.jpeg'>
                </div>
              </div>
              <div class="li">
                <div class="sdd" v-show="pageIndex==10"></div>
                <div class="pic" @click="showPage(10,$event,'yes')">
                  <img class="last-img" src='./images/sxwoman/11k.jpeg'>
                </div>
              </div>
              <div class="li">
                <div class="sdd" v-show="pageIndex==11"></div>
                <div class="pic" @click="showPage(11,$event,'yes')">
                  <img class="last-img" src='./images/sxwoman/12l.jpeg'>
                </div>
              </div>
              <div class="li">
                <div class="sdd" v-show="pageIndex==12"></div>
                <div class="pic" @click="showPage(12,$event,'yes')">
                  <img class="last-img" src='./images/sxwoman/13m.jpeg'>
                </div>
              </div>
              <div class="li">
                <div class="sdd" v-show="pageIndex==13"></div>
                <div class="pic" @click="showPage(13,$event,'yes')">
                  <img class="last-img" src='./images/sxwoman/14n.jpeg'>
                </div>
              </div>
              <div class="li">
                <div class="sdd" v-show="pageIndex==14"></div>
                <div class="pic" @click="showPage(14,$event,'yes')">
                  <img class="last-img" src='./images/sxwoman/15o.jpeg'>
                </div>
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
import tracker from '../../../common/utils/tracker';
export default {
  data() {
    return {
      dataContent: '8',
      getData: [{ show: true }, { show: false }, { show: false }],
      loadError: '8',
      dataContent: '8',
      local: true,
      isShowPage: false,
      hide: true,
      clientHeight: "6rem",
      pageIndex: 0,
      imgurl: [
        require('./images/sxwoman/1a.jpeg'),
        require('./images/sxwoman/2b.jpeg'),
        require('./images/sxwoman/3c.jpeg'),
        require('./images/sxwoman/4d.jpeg'),
        require('./images/sxwoman/5e.jpeg'),
        require('./images/sxwoman/6f.jpeg'),
        require('./images/sxwoman/7g.jpeg'),
        require('./images/sxwoman/8h.jpeg'),
        require('./images/sxwoman/9i.jpeg'),
        require('./images/sxwoman/10j.jpeg'),
        require('./images/sxwoman/11k.jpeg'),
        require('./images/sxwoman/12l.jpeg'),
        require('./images/sxwoman/13m.jpeg'),
        require('./images/sxwoman/14n.jpeg'),
        require('./images/sxwoman/15o.jpeg')
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
    changeTitle('塑形运动计划');
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
    showPage(pageIndex, event ,types) {
      this.video = document.querySelector('video');
      if (this.video) {
        this.video.pause();
      }
      this.pageIndex = pageIndex;
      this.isShowPage = true;
      this.hide = true;

      setTimeout(() => {
        let sdd = $(".swiper").scrollLeft();
        //console.log(sdd)

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
      }, 100);
      //tracker
      setTimeout(()=>{
          let objs = event.target,
          className = $(objs).attr('class');
          let titles='';
          if(types){
            titles= $('.surface').find('.title').html();
          }else{
            if(className == 'listone'){
                titles = $(objs).find('.part').html();
            }else{
                titles = $(objs).parents('.listone').find('.part').html();
            }
          }
          this.titles = titles;
          tracker.trackData({content:titles});
          //详情弹框页浏览tracker
          tracker.firstRead({ id: 218, title:'',page_name:titles });
      },300);
    }
  },
  mounted() {
    const clientH = $(window).height();
    this.clientHeight = this.backObj.height = clientH + 'px';
    tracker.firstRead({ id: 218, title:'',page_name:'塑形运动计划' });
    tracker.scrollCase({ event_name:'塑形运动计划'});
  },
  updated() {
  }
};


</script>



<style lang="less">

</style>