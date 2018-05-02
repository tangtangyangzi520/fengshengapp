<template>
  <div>
    <div class="loading-page" v-if="!dataContent&&!loadError"></div>
    <div class="loaderror-page" v-if="!dataContent&&loadError">{{loadError.msg}}</div>
    <div class="content-preload" :class="{show:dataContent}">
      <!--zhizuo-->
      <div>
        <img src='./images/sxman/1a.jpeg' class="shipuimg">
        <div class="text">
          <nobr class="desc">肌肉力量训练：</nobr>每周2~4次，每次5个动作，每每个动作至少做3组。推荐5类动作自由组合，供参考：宽跪俯卧撑+俯身哑铃低位划船+酒杯深蹲+哑铃弯举+俄罗斯转体</div>
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
              <img src='./images/zjman/1a.jpeg' class="listimg">
              <div>
                <div class="part">宽跪俯卧撑</div>
                <div class="num">每次10个，做3组，组间休息30秒。</div>
              </div>
              <img src='./images/1.png' class="imgtwo">
            </div>
          </div>
  
          <div class="list" @click="showPage(1,$event)">
            <div class="listone">
              <img src='./images/zjman/2b.jpeg' class="listimg">
              <div>
                <div class="part">仰卧后撑</div>
                <div class="num">每组10~15下，组间休息30秒。</div>
              </div>
              <img src='./images/1.png' class="imgtwo">
            </div>
          </div>
          <div class="list" @click="showPage(2,$event)">
            <div class="listone">
              <img src='./images/zjman/3c.jpeg' class="listimg">
              <div>
                <div class="part">哑铃侧平举</div>
                <div class="num">每组10~15下，组间休息30秒。</div>
              </div>
              <img src='./images/1.png' class="imgtwo">
            </div>
          </div>
          <div class='small-title'><span style="color:#23A492;padding-right:0.04rem;">B</span>有型背部</div>
          <div class="list" @click="showPage(3,$event)">
            <div class="listone">
              <img src='./images/zjman/4d.jpeg' class="listimg">
              <div>
                <div class="part">俯身哑铃低位划船</div>
                <div class="num">不要耸肩，每次10~15个，做3组，组间休息30秒。</div>
              </div>
              <img src='./images/1.png' class="imgtwo">
            </div>
          </div>
          <div class="list" @click="showPage(4,$event)">
            <div class="listone">
              <img src='./images/zjman/5e.jpeg' class="listimg">
              <div>
                <div class="part">俯身哑铃中位划船</div>
                <div class="num">不要耸肩，每次10~15个，做3组，组间休息30秒。</div>
              </div>
              <img src='./images/1.png' class="imgtwo">
            </div>
          </div>
          <div class="list" @click="showPage(5,$event)">
            <div class="listone">
              <img src='./images/zjman/6f.jpeg' class="listimg">
              <div>
                <div class="part">俯身哑铃高位划船</div>
                <div class="num">不要耸肩，每次10~15个，做3组，组间休息30秒。</div>
              </div>
              <img src='./images/1.png' class="imgtwo">
            </div>
          </div>
          <div class='small-title'><span style="color:#23A492;padding-right:0.04rem;">C</span>强壮臀腿</div>
          <div class="list" @click="showPage(6,$event)">
            <div class="listone">
              <img src='./images/zjman/7g.jpeg' class="listimg">
              <div>
                <div class="part">酒杯深蹲</div>
                <div class="num">每组10~15个，每次3组，组间休息30秒。</div>
              </div>
              <img src='./images/1.png' class="imgtwo">
            </div>
          </div>
          <div class="list" @click="showPage(7,$event)">
            <div class="listone">
              <img src='./images/zjman/8h.jpeg' class="listimg">
              <div>
                <div class="part">哑铃后撤箭步蹲</div>
                <div class="num">每组两边各10次，共3组，组间休息30秒。</div>
              </div>
              <img src='./images/1.png' class="imgtwo">
            </div>
          </div>
          <div class="list" @click="showPage(8,$event)">
            <div class="listone">
              <img src='./images/zjman/9i.jpeg' class="listimg">
              <div>
                <div class="part">单腿深蹲</div>
                <div class="num">左右腿各8次，记一组训练。做3组，组间休息30秒。</div>
              </div>
              <img src='./images/1.png' class="imgtwo">
            </div>
          </div>
          <div class='small-title'><span style="color:#23A492;padding-right:0.04rem;">D</span>强壮手臂</div>
          <div class="list" @click="showPage(9,$event)">
            <div class="listone">
              <img src='./images/zjman/10j.jpeg' class="listimg">
              <div>
                <div class="part">哑铃弯举</div>
                <div class="num">8~12次为1组，做3组，组间休息30秒。</div>
              </div>
              <img src='./images/1.png' class="imgtwo">
            </div>
          </div>
          <div class="list" @click="showPage(10,$event)">
            <div class="listone">
              <img src='./images/zjman/11k.jpeg' class="listimg">
              <div>
                <div class="part">锤式哑铃弯举</div>
                <div class="num">8~12次为一组，做3组，组间休息30秒。</div>
              </div>
              <img src='./images/1.png' class="imgtwo">
            </div>
          </div>
          <div class="list" @click="showPage(11,$event)">
            <div class="listone">
              <img src='./images/zjman/12l.jpeg' class="listimg">
              <div>
                <div class="part">窄距俯卧撑</div>
                <div class="num">每次10个，做3组，组间休息30秒。两臂屈肘时两上臂靠近体侧内夹。</div>
              </div>
              <img src='./images/1.png' class="imgtwo">
            </div>
          </div>
          <div class='small-title'><span style="color:#23A492;padding-right:0.04rem;">E</span>紧实腹部</div>
          <div class="list" @click="showPage(12,$event)">
            <div class="listone">
              <img src='./images/zjman/13m.jpeg' class="listimg">
              <div>
                <div class="part">俄罗斯转体</div>
                <div class="num">左右侧各8次，记一组训练。做3组，组间休息30秒。</div>
              </div>
              <img src='./images/1.png' class="imgtwo">
            </div>
          </div>
          <div class="list" @click="showPage(13,$event)">
            <div class="listone">
              <img src='./images/zjman/14n.jpeg' class="listimg">
              <div>
                <div class="part">仰卧卷腹</div>
                <div class="num">下背部不离地，8~12次为1组，做3组，组间休息30秒。</div>
              </div>
              <img src='./images/1.png' class="imgtwo">
            </div>
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
          <div class="title">宽跪俯卧撑</div>
          <div class="center-pic">
            <div :style="{background:'url('+imgurl[pageIndex]+') no-repeat center'}" class="imgurl" v-show="hide">
              <img src="./images/btn_home_videoplay_normal@2x.png" class="start" @click="start">
            </div>
            <video controls="controls" webkit-playsinline style="width:100%; display:none" loop>
              <source src="http://img1.fshtop.com/1501747706758.mp4" type="video/mp4" />
            </video>
          </div>
          <ul class="list-text">
            <li>双手距离1.5倍肩宽；腹、背、臀绷紧，身体呈一条直线；</li>
            <li>胸部发力撑起，重心置于掌根；保持腹、背、臀、核心等部位肌肉的紧绷状态；</li>
            <li>顶峰收缩，保持肘部微微弯曲，感受胸肌持续发力，坚持1~2秒。</li>
            <li>Tips：每次10个，做3组，组间休息30秒。</li>
          </ul>
        </template>
        <template v-if="pageIndex==1">
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
        <template v-if="pageIndex==2">
          <div class="title">哑铃侧平举</div>
          <div class="center-pic">
            <div :style="{background:'url('+imgurl[pageIndex]+') no-repeat center'}" class="imgurl" v-show="hide">
              <img src="./images/btn_home_videoplay_normal@2x.png" class="start" @click="start">
            </div>
            <video controls="controls" webkit-playsinline style="width:100%;" loop>
              <source src="http://img1.fshtop.com/1502074878522.mp4" type="video/mp4" />
            </video>
          </div>
          <ul class="list-text">
            <li>两脚稍分站立，背部挺直，双臂垂直于身体两侧，双手抓握哑铃；</li>
            <li>开始：向侧上方平举哑铃至双肩水平，肘部微屈；</li>
            <li>结束：返回起始位置。</li>
            <li>Tips：每组10~15下，组间休息30秒。</li>
          </ul>
        </template>
        <template v-if="pageIndex==3">
          <div class="title">俯身哑铃低位划船</div>
          <div class="center-pic">
            <div :style="{background:'url('+imgurl[pageIndex]+') no-repeat center'}" class="imgurl" v-show="hide">
              <img src="./images/btn_home_videoplay_normal@2x.png" class="start" @click="start">
            </div>
            <video controls="controls" webkit-playsinline style="width:100%;" loop>
              <source src="http://img1.fshtop.com/1501747686594.mp4" type="video/mp4" />
            </video>
          </div>
          <ul class="list-text">
            <li>俯身站立，腰腹收紧，背部挺直，膝盖微屈；双手持哑铃自然下垂，掌心相对；</li>
            <li>保持上身不动，双臂沿体侧上拉哑铃至最高点；感受背部肌群的顶峰收缩，停顿1~2秒，缓慢放下。</li>
            <li>Tips：不要耸肩，每次10~15个，做3组，组间休息30秒。</li>
          </ul>
        </template>
        <template v-if="pageIndex==4">
          <div class="title">俯身哑铃中位划船</div>
          <div class="center-pic">
            <div :style="{background:'url('+imgurl[pageIndex]+') no-repeat center'}" class="imgurl" v-show="hide">
              <img src="./images/btn_home_videoplay_normal@2x.png" class="start" @click="start">
            </div>
            <video controls="controls" webkit-playsinline style="width:100%;" loop>
              <source src="http://img1.fshtop.com/1501747714067.mp4" type="video/mp4" />
            </video>
          </div>
          <ul class="list-text">
            <li>俯身站立，腰腹收紧，背部挺直，膝盖微屈；双手持哑铃自然下垂，掌心相对；</li>
            <li>保持上身不动，双臂与身体形成45°夹角，上臂上拉哑铃至最高点；感受背部肌群的顶峰收缩，停顿1~2秒，缓慢放下。</li>
            <li>Tips：不要耸肩，每次10~15个，做3组，组间休息30秒。</li>
  
          </ul>
        </template>
        <template v-if="pageIndex==5">
          <div class="title">俯身哑铃高位划船</div>
          <div class="center-pic">
            <div :style="{background:'url('+imgurl[pageIndex]+') no-repeat center'}" class="imgurl" v-show="hide">
              <img src="./images/btn_home_videoplay_normal@2x.png" class="start" @click="start">
            </div>
            <video controls="controls" webkit-playsinline style="width:100%;" loop>
              <source src="http://img1.fshtop.com/1501748390765.mp4" type="video/mp4" />
            </video>
          </div>
          <ul class="list-text">
            <li>俯身站立，腰腹收紧，背部挺直，膝盖微屈；双手持哑铃自然下垂，掌心相对；</li>
            <li>保持上身不动，双臂与身体形成90°夹角，上臂上拉哑铃至最高点；感受背部肌群的顶峰收缩，停顿1~2秒，缓慢放下。</li>
            <li>Tips：不要耸肩，每次10~15个，做3组，组间休息30秒。</li>
          </ul>
        </template>
        <template v-if="pageIndex==6">
          <div class="title">酒杯深蹲</div>
          <div class="center-pic">
            <div :style="{background:'url('+imgurl[pageIndex]+') no-repeat center'}" class="imgurl" v-show="hide">
              <img src="./images/btn_home_videoplay_normal@2x.png" class="start" @click="start">
            </div>
            <video controls="controls" webkit-playsinline style="width:100%;" loop>
              <source src="http://img1.fshtop.com/1501748390271.mp4" type="video/mp4" />
            </video>
          </div>
          <ul class="list-text">
            <li>自然站立，双脚略比肩宽，双手持一哑铃置于胸前；</li>
            <li>保持背部挺直，臀部向后撅起，屈膝下蹲至大腿平行于地面，保持2~3秒，感受目标肌群的持续发力；</li>
            <li>下蹲过程中尽量做到平稳可控，控制肌肉发力；臀腿发力，蹬地起身，返回起始位置，重复；运动过程中保持腰背绷紧、上半身紧张的状态，切勿含胸和弓背。</li>
            <li>Tips：每组10~15个，每次3组，组间休息30秒。</li>
          </ul>
        </template>
        <template v-if="pageIndex==7">
          <div class="title">哑铃后撤箭步蹲</div>
          <div class="center-pic">
            <div :style="{background:'url('+imgurl[pageIndex]+') no-repeat center'}" class="imgurl" v-show="hide">
              <img src="./images/btn_home_videoplay_normal@2x.png" class="start" @click="start">
            </div>
            <video controls="controls" webkit-playsinline style="width:100%;" loop>
              <source src="http://img1.fshtop.com/1501748390044.mp4" type="video/mp4" />
            </video>
          </div>
          <ul class="list-text">
            <li>上半身挺直，哑铃置于身体两侧，重心位于两脚中间；</li>
            <li>下蹲时前侧大腿与身体成90°，后侧大腿与地面成45°，保持每次步幅大小相同。站起时呼气，下蹲时吸气。蹲起时，前腿臀部及大腿前侧有收缩发力感，臀部更加明显。</li>
            <li>然后换左侧，动作相同。</li>
            <li>Tips：每组两边各10次，共3组，组间休息30秒。</li>
          </ul>
        </template>
        <template v-if="pageIndex==8">
          <div class="title">单腿深蹲</div>
          <div class="center-pic">
            <div :style="{background:'url('+imgurl[pageIndex]+') no-repeat center'}" class="imgurl" v-show="hide">
              <img src="./images/btn_home_videoplay_normal@2x.png" class="start" @click="start">
            </div>
            <video controls="controls" webkit-playsinline style="width:100%;" loop>
              <source src="http://img1.fshtop.com/1501748419491.mp4" type="video/mp4" />
            </video>
          </div>
          <ul class="list-text">
            <li>右腿支撑地面，脚尖膝盖超前；</li>
            <li>抬起左腿，身体渐低；</li>
            <li>大腿发力站起，然后换左腿，动作相同。</li>
            <li>Tips：左右腿各8次，记一组训练。做3组，组间休息30秒。</li>
          </ul>
        </template>
        <template v-if="pageIndex==9">
          <div class="title">哑铃弯举</div>
          <div class="center-pic">
            <div :style="{background:'url('+imgurl[pageIndex]+') no-repeat center'}" class="imgurl" v-show="hide">
              <img src="./images/btn_home_videoplay_normal@2x.png" class="start" @click="start">
            </div>
            <video controls="controls" webkit-playsinline style="width:100%;" loop>
              <source src="http://img1.fshtop.com/1501748399076.mp4" type="video/mp4" />
            </video>
          </div>
          <ul class="list-text">
            <li>两手各持一哑铃放于体侧，屈臂将哑铃举起；</li>
            <li>前臂与上臂尽量靠拢，停顿1~3秒，放下哑铃至两臂伸直。</li>
            <li>Tips：8~12次为1组，做3组，组间休息30秒。</li>
          </ul>
        </template>
        <template v-if="pageIndex==10">
          <div class="title">锤式哑铃弯举</div>
          <div class="center-pic">
            <div :style="{background:'url('+imgurl[pageIndex]+') no-repeat center'}" class="imgurl" v-show="hide">
              <img src="./images/btn_home_videoplay_normal@2x.png" class="start" @click="start">
            </div>
            <video controls="controls" webkit-playsinline style="width:100%;" loop>
              <source src="http://img1.fshtop.com/1502075184083.mp4" type="video/mp4" />
            </video>
          </div>
          <ul class="list-text">
            <li>手持哑铃垂于体侧，掌心相对，上臂紧贴体侧，肘关节是惟一运动的关节。</li>
            <li>用力向上弯举，可感受到肱二头肌外侧膨胀隆起。最高点进行顶峰收缩，并坚持片刻，然后缓慢还原，最低点时手臂完全伸直。</li>
            <li>Tips： 8~12次为一组，做3组，组间休息30秒。</li>
          </ul>
        </template>
        <template v-if="pageIndex==11">
          <div class="title">窄距俯卧撑</div>
          <div class="center-pic">
            <div :style="{background:'url('+imgurl[pageIndex]+') no-repeat center'}" class="imgurl" v-show="hide">
              <img src="./images/btn_home_videoplay_normal@2x.png" class="start" @click="start">
            </div>
            <video controls="controls" webkit-playsinline style="width:100%;" loop>
              <source src="http://img1.fshtop.com/1501748427546.mp4" type="video/mp4" />
            </video>
          </div>
          <ul class="list-text">
            <li>双手距离比肩窄；腹、背、臀绷紧，身体呈一条直线；</li>
            <li>胸部发力撑起，重心置于掌根；保持腹、背、臀、核心等部位肌肉的紧绷状态；</li>
            <li>顶峰收缩，保持肘部微微弯曲，感受胸肌持续发力，坚持1~2秒。</li>
            <li>Tips：每次10个，做3组，组间休息30秒。两臂屈肘时两上臂靠近体侧内夹。</li>
          </ul>
        </template>
        <template v-if="pageIndex==12">
          <div class="title">俄罗斯转体</div>
          <div class="center-pic">
            <div :style="{background:'url('+imgurl[pageIndex]+') no-repeat center'}" class="imgurl" v-show="hide">
              <img src="./images/btn_home_videoplay_normal@2x.png" class="start" @click="start">
            </div>
            <video controls="controls" webkit-playsinline style="width:100%;" loop>
              <source src="http://img1.fshtop.com/1501748426453.mp4" type="video/mp4" />
            </video>
          </div>
          <ul class="list-text">
            <li>躺在地上，双脚交叉起来，背部保持平坦。膝盖微微弯曲。双脚扭在一起可以保持稳定性</li>
            <li>下半身不动提升你的上身，创建与你的大腿一个虚构的V形。双臂完全伸展在你面前垂直于你的身体，双手紧握杠铃。</li>
            <li>注意力集中在腹肌上，收紧腹肌，同时腰腹收缩向右扭动你的身体，直到手臂与地面平行，同时呼气。保持腹肌持续收缩，然后回到起始位置。然后移动到另一侧进行你右侧的相同动作。</li>
            <li>Tips：左右侧各8次，记一组训练。做3组，组间休息30秒。</li>
          </ul>
        </template>
        <template v-if="pageIndex==13">
          <div class="title">仰卧卷腹</div>
          <div class="center-pic">
            <div :style="{background:'url('+imgurl[pageIndex]+') no-repeat center'}" class="imgurl" v-show="hide">
              <img src="./images/btn_home_videoplay_normal@2x.png" class="start" @click="start">
            </div>
            <video controls="controls" webkit-playsinline style="width:100%;" loop>
              <source src="http://img1.fshtop.com/1501748450705.mp4" type="video/mp4" />
            </video>
          </div>
          <ul class="list-text">
            <li>身体仰卧于地垫上，膝部屈曲成90度左右，放松背肌和脊柱，两腿并拢并伸直，脚部平放在地上；</li>
            <li>双手轻抚耳侧，利用腹部收缩的力量抬起上背卷曲身体，再慢慢还原。</li>
            <li>Tips：下背部不离地，8~12次为1组，做3组，组间休息30秒。</li>
          </ul>
        </template>
        <template v-if="pageIndex==14">
          <div class="title">侧面卷腹</div>
          <div class="center-pic">
            <div :style="{background:'url('+imgurl[pageIndex]+') no-repeat center'}" class="imgurl" v-show="hide">
              <img src="./images/btn_home_videoplay_normal@2x.png" class="start" @click="start">
            </div>
            <video controls="controls" webkit-playsinline style="width:100%;" loop>
              <source src="http://img1.fshtop.com/1501747639026.mp4" type="video/mp4" />
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
          <div class="scroll-ul" id="scroll">
            <div class="li">
              <div class="sdd" v-show="pageIndex==0"></div>
              <div class="pic" @click="showPage(0,$event,'yes')">
                <img class="last-img" src='./images/zjman/1a.jpeg'>
              </div>
            </div>
            <div class="li">
              <div class="sdd" v-show="pageIndex==1"></div>
              <div class="pic" @click="showPage(1,$event,'yes')">
                <img class="last-img" src='./images/zjman/2b.jpeg'>
              </div>
            </div>
            <div class="li">
              <div class="sdd" v-show="pageIndex==2"></div>
              <div class="pic" @click="showPage(2,$event,'yes')">
                <img class="last-img" src='./images/zjman/3c.jpeg'>
              </div>
            </div>
            <div class="li">
              <div class="sdd" v-show="pageIndex==3"></div>
              <div class="pic" @click="showPage(3,$event,'yes')">
                <img class="last-img" src='./images/zjman/4d.jpeg'>
              </div>
            </div>
            <div class="li">
              <div class="sdd" v-show="pageIndex==4"></div>
              <div class="pic" @click="showPage(4,$event,'yes')">
                <img class="last-img" src='./images/zjman/5e.jpeg'>
              </div>
            </div>
            <div class="li">
              <div class="sdd" v-show="pageIndex==5"></div>
              <div class="pic" @click="showPage(5,$event,'yes')">
                <img class="last-img" src='./images/zjman/6f.jpeg'>
              </div>
            </div>
            <div class="li">
              <div class="sdd" v-show="pageIndex==6"></div>
              <div class="pic" @click="showPage(6,$event,'yes')">
                <img class="last-img" src='./images/zjman/7g.jpeg'>
              </div>
            </div>
            <div class="li">
              <div class="sdd" v-show="pageIndex==7"></div>
              <div class="pic" @click="showPage(7,$event,'yes')">
                <img class="last-img" src='./images/zjman/8h.jpeg'>
              </div>
            </div>
            <div class="li">
              <div class="sdd" v-show="pageIndex==8"></div>
              <div class="pic" @click="showPage(8,$event,'yes')">
                <img class="last-img" src='./images/zjman/9i.jpeg'>
              </div>
            </div>
            <div class="li">
              <div class="sdd" v-show="pageIndex==9"></div>
              <div class="pic" @click="showPage(9,$event,'yes')">
                <img class="last-img" src='./images/zjman/10j.jpeg'>
              </div>
            </div>
            <div class="li">
              <div class="sdd" v-show="pageIndex==10"></div>
              <div class="pic" @click="showPage(10,$event,'yes')">
                <img class="last-img" src='./images/zjman/11k.jpeg'>
              </div>
            </div>
            <div class="li">
              <div class="sdd" v-show="pageIndex==11"></div>
              <div class="pic" @click="showPage(11,$event,'yes')">
                <img class="last-img" src='./images/zjman/12l.jpeg'>
              </div>
            </div>
            <div class="li">
              <div class="sdd" v-show="pageIndex==12"></div>
              <div class="pic" @click="showPage(12,$event,'yes')">
                <img class="last-img" src='./images/zjman/13m.jpeg'>
              </div>
            </div>
            <div class="li">
              <div class="sdd" v-show="pageIndex==13"></div>
              <div class="pic" @click="showPage(13,$event,'yes')">
                <img class="last-img" src='./images/zjman/14n.jpeg'>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  
    <!--zhizuo2-->
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
      isShowPage: false,
      clientHeight: "6rem",
      pageIndex: 0,
      hide: true,
      imgurl: [
        require('./images/zjman/1a.jpeg'),
        require('./images/zjman/2b.jpeg'),
        require('./images/zjman/3c.jpeg'),
        require('./images/zjman/4d.jpeg'),
        require('./images/zjman/5e.jpeg'),
        require('./images/zjman/6f.jpeg'),
        require('./images/zjman/7g.jpeg'),
        require('./images/zjman/8h.jpeg'),
        require('./images/zjman/9i.jpeg'),
        require('./images/zjman/10j.jpeg'),
        require('./images/zjman/11k.jpeg'),
        require('./images/zjman/12l.jpeg'),
        require('./images/zjman/13m.jpeg'),
        require('./images/zjman/14n.jpeg')
      ],
      video: '',
      backObj: {
        height: 'auto',
        background: 'url(http://img1.imgtn.bdimg.com/it/u=449909535,3737323816&fm=26&gp=0.jpg) no-repeat center'
      },
    }
  },
  components: {

  },
  created() {
    changeTitle('增肌运动计划');
  },
  methods: {
    close() {
      this.isShowPage = false;
    },
    start() {
      this.hide = false;
      this.video = document.querySelector('video')
      console.log(this.video)
      this.video.style.display = 'block';
      this.video.play();
    },

    showPage(pageIndex,event,types) {
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
      }, 100);
      //tracker
      setTimeout(()=>{
          let objs = event.target,
          className = $(objs).attr('class');
          let titles='';
          if(types){
            titles= $('.surface').find('.title').html();
            console.log();
          }else{
            if(className == 'list'){
                titles = $(objs).find('.part').html();
            }else{
                titles = $(objs).parents('.list').find('.part').html();
            }
          }
          tracker.trackData({content:titles});
          tracker.firstRead({ id: 218, title:'',page_name:titles });
      },300);
    }
  },
  mounted() {
    const clientH = $(window).height();
    this.clientHeight = this.backObj.height = clientH + 'px';
    tracker.firstRead({ id: 218, title:'',page_name:'增肌运动计划' });
    tracker.scrollCase({ event_name:'增肌运动计划'});
  },
  updated() {

  }
};


</script>



<style lang="less">

</style>