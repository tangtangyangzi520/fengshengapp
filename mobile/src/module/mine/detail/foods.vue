<template>
  <div>
    <!-- 困扰 1-睡得很好;2-辗转难眠;3-凌晨醒;4-杂梦纷呈;5-睡足仍困倦;6-更年期睡不好;7-老人睡得少;8-家有小夜猫;9-快速倒时差 -->
    <!-- 更年期睡不好 -->
    <template v-if="targetId==6">
      <p class="health-des">睡眠是我们生活不可或缺的一部分，拥有高质量的睡眠也是健康的前提，而睡眠时间的长短因人而异，只要白天精神抖擞，不觉得昏昏欲睡，提不起劲，就可以称得上是健康的睡眠。如果你有
        <span class="imp-des">更年期睡不好</span>的问题，不妨改变一下饮食习惯</p>
      <div class="health-contain">
        <div class="health-part">1</div>
        <div class="health-all ">每天一杯豆浆</div>
      </div>
      <p class="good-des">豆浆富含大豆异黄酮。研究发现，女性每天摄入35~50mg大豆异黄酮，可减轻因更年期带来的潮热、情绪起伏、睡眠不良等问题</p>
      <p class="advice-tit">以下是含有35～50mg大豆异黄酮的食物：</p>
      <div class="advice-border">
        <div class="box-top">
          <div class="food-img1"><img src="./images/zt/food/bg_shipu_photo_doujiang@2x.jpg"></div>
          <div class="food-name food"> 一杯浓豆浆
            <span class="per">（250毫升）</span>
          </div>
        </div>
        <div class="box-top">
          <div class="food-img1"><img src="./images/zt/food/bg_shipu_photo_doufu@2x.jpg"></div>
          <div class="food-name food"> 一块豆腐
            <span class="per">（100克）</span>
          </div>
        </div>
        <div class="box-top">
          <div class="food-img1"><img src="./images/zt/food/bg_shipu_photo_bean@2x.jpg"></div>
          <div class="food-name food">青豆
            <span class="per">（50克）</span>
          </div>
        </div>
      </div>
      <div class="health-contain">
        <div class="health-part ">2</div>
        <div class="health-all ">鹿博士为您推荐十种助眠食物（点击查看具体功效）：</div>
      </div>
      <div class="scroll-view">
        <div class="right-advice" @click="showFoodsInfo(item,$event)" v-for="item in foods.gnqsbh">
          <div class="advice-img advice-one"><img :src="item.pic"></div>
          <div class="name-two">{{item.name}}</div>
        </div>
      </div>
      <div class="health-contain">
        <div class="health-part">3</div>
        <div class="health-all ">食谱推荐</div>
      </div>
      <div class="box-two">
        <div class="choose choose-one" @click="goLink">
          <img src="./images/zt/food/bg_howtoeat_small_sanwenyu_normal@2x.jpg">
        </div>
      </div>
    </template>
    <!-- 家有小夜猫 -->
    <template v-if="targetId==8">
      <p class="health-des">睡眠是我们生活不可或缺的一部分，拥有高质量的睡眠也是健康的前提，而睡眠时间的长短因人而异，只要白天精神抖擞，不觉得昏昏欲睡，提不起劲，就可以称得上是健康的睡眠。如果你有
        <span class="imp-des">家有小夜猫</span>的问题，不妨改变一下饮食习惯</p>
      <div class="health-contain">
        <div class="health-part">1</div>
        <div class="health-all ">鹿博士为您推荐十种助眠食物（点击查看具体功效）：</div>
      </div>
      <div class="scroll-view">
        <div class="right-advice" @click="showFoodsInfo(item,$event)" v-for="item in foods.jyxym">
          <div class="advice-img advice-one"><img :src="item.pic"></div>
          <div class="name-two">{{item.name}}</div>
        </div>
      </div>
      <div class="health-contain">
        <div class="health-part">2</div>
        <div class="health-all ">食谱推荐</div>
      </div>
      <div class="box-two">
        <div class="choose choose-one" @click="goLink">
          <img src="./images/zt/food/bg_howtoeat_small_sixijiaozi_normal@2x.jpg">
        </div>
      </div>
    </template>
    <!-- 老人睡得少 -->
    <template v-if="targetId==7">
      <p class="health-des">睡眠是我们生活不可或缺的一部分，拥有高质量的睡眠也是健康的前提，而睡眠时间的长短因人而异，只要白天精神抖擞，不觉得昏昏欲睡，提不起劲，就可以称得上是健康的睡眠。如果你有
        <span class="imp-des">老人睡得少</span>的问题，不妨改变一下饮食习惯</p>
      <div class="health-contain">
        <div class="health-part">1</div>
        <div class="health-all ">鹿博士为您推荐十种助眠食物（点击查看具体功效）：</div>
      </div>
      <div class="scroll-view">
        <div class="right-advice" @click="showFoodsInfo(item,$event)" v-for="item in foods.lrsds">
          <div class="advice-img advice-one"><img :src="item.pic"></div>
          <div class="name-two">{{item.name}}</div>
        </div>
      </div>
      <div class="health-contain">
        <div class="health-part">2</div>
        <div class="health-all ">食谱推荐</div>
      </div>
      <div class="box-two">
        <div class="choose choose-one" @click="goLink">
          <img src="./images/zt/food/bg_howtoeat_small_yenainangua_normal@2x.jpg">
        </div>
      </div>
    </template>
    <!-- 凌晨醒 -->
    <template v-if="targetId==3">
      <p class="health-des"><span class="imp-des">凌晨醒来</span>再也睡不着？快加入鹿博士改善早醒的行动方案吧。坚持一段时间， 相信能帮到你哦！当然，如果您的失眠情况十分严重，还是应
        </p>
      <div class="health-contain">
        <div class="health-part">1</div>
        <div class="health-all ">鹿博士为您推荐十种助眠食物（点击查看具体功效）：</div>
      </div>
      <div class="scroll-view">
        <div class="right-advice" @click="showFoodsInfo(item,$event)" v-for="item in foods.lcx">
          <div class="advice-img advice-one"><img :src="item.pic"></div>
          <div class="name-two">{{item.name}}</div>
        </div>
      </div>
      <div class="health-contain">
        <div class="health-part">2</div>
        <div class="health-all ">食谱推荐</div>
      </div>
      <div class="box-two">
        <div class="choose choose-one" @click="goLink">
          <img src="./images/zt/food/bg_howtoeat_small_yutangdigua_normal@2x.jpg">
        </div>
      </div>
    </template>
    <!-- 快速倒时差 -->
    <template v-if="targetId==9">
      <p class="health-des">睡眠是我们生活不可或缺的一部分，拥有高质量的睡眠也是健康的前提，而睡眠时间的长短因人而异，只要白天精神抖擞，不觉得昏昏欲睡，提不起劲，就可以称得上是健康的睡眠。如果你有<span class="imp-des">快速倒时差</span>的问题，不妨改变一下饮食习惯
        </p>
      <div class="health-contain">
        <div class="health-part">1</div>
        <div class="health-all ">鹿博士为您推荐十种助眠食物（点击查看具体功效）：</div>
      </div>
      <div class="scroll-view">
        <div class="right-advice" @click="showFoodsInfo(item,$event)" v-for="item in foods.ksdsc">
          <div class="advice-img advice-one"><img :src="item.pic"></div>
          <div class="name-two">{{item.name}}</div>
        </div>
      </div>
      <div class="health-contain">
        <div class="health-part">2</div>
        <div class="health-all ">食谱推荐</div>
      </div>
      <div class="box-two">
        <div class="choose choose-one" @click="goLink">
          <img src="./images/zt/food/bg_howtoeat_small_fanqiedan_normal@2x.jpg">
        </div>
      </div>
    </template>
    <!-- 杂梦纷繁 -->
    <template v-if="targetId==4">
      <p class="health-des">睡眠是我们生活不可或缺的一部分，拥有高质量的睡眠也是健康的前提，而睡眠时间的长短因人而异，只要白天精神抖擞，不觉得昏昏欲睡，提不起劲，就可以称得上是健康的睡眠。如果你有<span class="imp-des">杂梦纷呈</span>的问题，不妨改变一下饮食习惯
        </p>
      <div class="health-contain">
        <div class="health-part">1</div>
        <div class="health-all ">鹿博士为您推荐十种助眠食物（点击查看具体功效）：</div>
      </div>
      <div class="scroll-view">
        <div class="right-advice" @click="showFoodsInfo(item,$event)" v-for="item in foods.zmfc">
          <div class="advice-img advice-one"><img :src="item.pic"></div>
          <div class="name-two">{{item.name}}</div>
        </div>
      </div>
      <div class="health-contain">
        <div class="health-part">2</div>
        <div class="health-all ">食谱推荐</div>
      </div>
      <div class="box-two">
        <div class="choose choose-one" @click="goLink">
          <img src="./images/zt/food/bg_howtoeat_small_baihehuanghua_normal@2x.jpg">
        </div>
      </div>
    </template>
    <!-- 睡足仍困倦  -->
    <template v-if="targetId==5">      
      <p class="health-des">睡眠是我们生活不可或缺的一部分，拥有高质量的睡眠也是健康的前提，而睡眠时间的长短因人而异，只要白天精神抖擞，不觉得昏昏欲睡，提不起劲，就可以称得上是健康的睡眠。如果你有<span class="imp-des">睡足仍困倦</span>的问题，不妨改变一下饮食习惯</p>
      <div class="health-contain">
        <div class="health-part">1</div>
        <div class="health-all ">鹿博士为您推荐十种助眠食物（点击查看具体功效）：</div>
      </div>
      <div class="scroll-view">
        <div class="right-advice" @click="showFoodsInfo(item,$event)" v-for="item in foods.szrkj">
          <div class="advice-img advice-one"><img :src="item.pic"></div>
          <div class="name-two">{{item.name}}</div>
        </div>
      </div>
      <div class="health-contain">
        <div class="health-part">2</div>
        <div class="health-all ">食谱推荐</div>
      </div>
      <div class="box-two">
        <div class="choose choose-one" @click="goLink">
          <img src="./images/zt/food/bg_howtoeat_small_suanniqiezi_normal@2x.jpg">
        </div>
      </div>
    </template>
    <!-- 辗转难眠 -->
    <template v-if="targetId==2">
      <p class="health-des">睡眠是我们生活不可或缺的一部分，拥有高质量的睡眠也是健康的前提，而睡眠时间的长短因人而异，只要白天精神抖擞，不觉得昏昏欲睡，提不起劲，就可以称得上是健康的睡眠。如果你有<span class="imp-des">入睡困难</span>的问题，不妨改变一下饮食习惯
        </p>
      <div class="health-contain">
        <div class="health-part">1</div>
        <div class="health-all ">鹿博士为您推荐十种助眠食物（点击查看具体功效）：</div>
      </div>
      <div class="scroll-view">
        <div class="right-advice" @click="showFoodsInfo(item,$event)" v-for="item in foods.zznm">
          <div class="advice-img advice-one"><img :src="item.pic"></div>
          <div class="name-two">{{item.name}}</div>
        </div>
      </div>
      <div class="health-contain">
        <div class="health-part">2</div>
        <div class="health-all ">食谱推荐</div>
      </div>
      <div class="box-two">
        <div class="choose choose-one" @click="goLink">
          <img src="./images/zt/food/bg_howtoeat_small_jiroushala_normal@2x.jpg">
        </div>
      </div>
    </template>
    <!-- 食物解释弹窗 -->
    <transition name="fade-in-fast">
      <div class="alert" v-if="showFoodsInfoDialog" @click="hideFoodsInfoDialog">
        <div class="alert-border" style="margin-left:auto;margin-right: auto;" @click.stop="" :style="{'margin-top':dialogTop+'px'}">
          <div class="alert-tit">{{foodsItem.name}}</div>
          <div class="alert-img"><img :src="foodsItem.pic"></div>
          <div class="alert-desc">{{foodsItem.desc}}</div>
          <div class="alert-btn" @click="hideFoodsInfoDialog">我知道了</div>
        </div>
      </div>
    </transition>
  </div>
</template>


<script>
import $ from "zepto";
import client from "../../../common/utils/client";
import Bridge from "../../../common/utils/Bridge";
import apiConfig from "../../../common/api.config";
export default {
  data() {
    return {
      dialogTop: 0,
      targetType: client.getQueryString("type"),
      targetId: client.getQueryString("target"),
      showFoodsInfoDialog: false,
      foodsItem: null,
      components: [],
      isDevice: client.getQueryString("device"),
      foods: {
        zznm: [
          {name:'香蕉',pic:require('./images/zt/food/bg_shipu_photo_banana@2x.jpg'),desc:'除了能平稳血清素和褪黑素外，它还含有可具有让肌肉松弛效果的镁元素。'},
          {name:'温牛奶',pic:require('./images/zt/food/bg_shipu_photo_milk@2x.jpg'),desc:'含有一些色胺酸（具有镇静作用的一种氨基酸）和钙，钙有利于大脑充分利用色胺酸。'},
          {name:'土豆',pic:require('./images/zt/food/bg_shipu_photo_patato@2x.jpg'),desc:'它能清除掉对可诱发睡眠的色胺酸起干扰作用的酸。为了达到这种效果，你只要将烤马铃薯捣碎后掺入温牛奶中食用即可。'},
          {name:'蜂蜜',pic:require('./images/zt/food/bg_shipu_photo_honey@2x.jpg'),desc:'在温牛奶中或香草茶中放入少量蜂蜜，一些葡萄糖能促使你的大脑停止产生进食素，进食素是最近发现的一种与保持清醒有关的神经传递素。'},
          {name:'奇异果',pic:require('./images/zt/food/bg_shipu_photo_vc@2x.jpg'),desc:'失眠往往跟交感神经过度兴奋和中枢神经异常唤起有关，或者是受到大量分泌的压力激素所影响。奇异果中含有丰富的维生素C、钙和镁，能促进神经传导物质的传递与合成，尤其是钙更具有抑制交感神经及稳定情绪的功效。'},
          {name:'杏仁',pic:require('./images/zt/food/bg_shipu_photo_almond@2x.jpg'),desc:'它既含有色胺酸，又含有适量的肌肉松弛剂——镁。'},
          {name:'燕麦片',pic:require('./images/zt/food/bg_shipu_photo_oats@2x.jpg'),desc:'能诱使产生褪黑素，一小碗就能起到促进睡眠的效果，如果大量咀嚼燕麦片，效果会更佳。'},
          {name:'莲子',pic:require('./images/zt/food/bg_shipu_photo_lotus@2x.jpg'),desc:'莲子含有莲子碱、芳香甙等镇静成分，可增加5-羟色胺的供给，故能使人入睡。'},
          {name:'富含色氨酸的食物',pic:require('./images/zt/food/bg_shipu_photo_vbsix@2x.jpg'),desc:'睡眠关键的营养成分，是人体血清素产生的前提。色氨酸常见于火鸡、鸡肉、蛋类、番薯、奇亚籽、火麻仁、香蕉、南瓜子、杏仁、酸牛奶和绿叶蔬菜。'},
          {name:'富含Ω-3的食物',pic:require('./images/zt/food/bg_shipu_photo_tryptopan@2x.jpg'),desc:'牛津大学研究发现，Ω-3有助于人体获得更深度、更舒适的睡眠。富含Ω-3的食物来源包括奇亚籽、南瓜子、火麻仁、核桃、比目鱼、三文鱼和亚麻籽。'},
        ],
        lcx: [
          {name:'小米',pic:require('./images/zt/food/bg_shipu_photo_millet@2x.jpg'),desc:'机理：含有丰富的色氨酸，能促进大脑细胞分泌使人昏然欲睡的神经递质——五羟色氨，使大脑活动受到暂时抑制，因此容易入睡。历史：《黄帝内经》载有的“半夏秫米汤”就是现在的小米粥，是历代医家治疗失眠不寐的一个经典方剂。'},
          {name:'菊花茶',pic:require('./images/zt/food/bg_shipu_photo_chrysanthemum@2x.jpg'),desc:'有适度的镇静效果，对无法放松的神经或身体来说，它是完美的天然对抗手段。'},
          {name:'牛肉',pic:require('./images/zt/food/bg_shipu_photo_niurou.jpg'),desc:'牛肉补中益气、滋养脾胃、强健筋骨、化痰息风，含有丰富的蛋白质、色氨酸和元素硒，对应激引起的神经元损伤和抑郁行为具有保护作用，能有效改善因情绪抑郁带来的早醒问题。'},
          {name:'温牛奶',pic:require('./images/zt/food/bg_shipu_photo_milk@2x.jpg'),desc:'含有一些色胺酸（具有镇静作用的一种氨基酸）和钙，钙有利于大脑充分利用色胺酸。'},
          {name:'燕麦片',pic:require('./images/zt/food/bg_shipu_photo_oats@2x.jpg'),desc:'能诱使产生褪黑素，一小碗就能起到促进睡眠的效果，如果大量咀嚼燕麦片，效果会更佳。'},
          {name:'苹果',pic:require('./images/zt/food/bg_shipu_photo_apple@2x.jpg'),desc:'苹果补中益气，专治火盛脾虚，对阴虚火旺、肝胆不和、肠胃不畅引起的失眠有不错的疗效。苹果中的芳香成分中含有92%的醇类，其散发的浓郁香气，能对人的神经起到很好的镇静作用，使人快速入眠。'},
          {name:'鲜藕',pic:require('./images/zt/food/bg_shipu_photo_lotusroot@2x.jpg'),desc:'藕含有大量的碳水化合物及丰富的钙、磷、铁和多种维生素，具有清热、养血、除烦等功效，可治血虚失眠。'},
          {name:'富含VC的食物',pic:require('./images/zt/food/bg_shipu_photo_fiber@2x.jpg'),desc:'美国公共科学图书馆（PLOS）指出，血液中维生素C水平低的人群，遇到的睡眠问题越多，越容易在夜间醒来。富含VC的食物包括卡姆果、余甘子、针叶樱桃等高级食品，以及灯笼椒、绿叶蔬菜、猕猴桃、草莓、柑橘类、木瓜等日常食物。'},
          {name:'富含褪黑素的食物',pic:require('./images/zt/food/bg_shipu_photo_selenium@2x.jpg'),desc:'一些食物中本身含有少量褪黑激素。研究发现，一些食物有助于提升人体褪黑激素的产生。酸樱桃显然是褪黑激素含量最高的食物来源。不过，核桃、生姜和芦笋中也含有少量褪黑激素。有些食物能自然提升人体褪黑激素的水平，其中包括菠萝（在某项研究中处于首位）、西红柿、香蕉和橘子。'},
          {name:'富含镁元素的食物',pic:require('./images/zt/food/bg_shipu_photo_magnesium@2x.jpg'),desc:'镁元素是一种抗压矿物质，研究发现，提升体内的镁元素水平，几乎可以立即减少身体压力负荷，改善早醒的状况。绿叶蔬菜、南瓜子、芝麻等种子类，螺旋藻、巴西栗等超级食物，都是镁元素的集中来源。'},
        ],
        zmfc: [
          {name:'莲子',pic:require('./images/zt/food/bg_shipu_photo_lotus@2x.jpg'),desc:'莲子含有莲子碱、芳香甙等镇静成分，可增加5-羟色胺的供给，故能使人入睡。'},
          {name:'猪心',pic:require('./images/zt/food/bg_shipu_photo_porkheart@2x.jpg'),desc:'猪心性平味甘，具有养心安神、补血的功用。主治心悸心慌，失眠多梦，失眠易惊等。用法为煮食或水煎服内服。猪心常用助眠食补方有：灵芝猪心、党参当归炖猪心、豆豉酱猪心等。'},
          {name:'红枣',pic:require('./images/zt/food/bg_shipu_photo_reddate@2x.jpg'),desc:'红枣，味甘性温，主要功能为补中益气、养血安神，临床主要用于脾胃气虚、血虚萎黄、血虚失眠多梦等症的治疗。'},
          {name:'核桃',pic:require('./images/zt/food/bg_shipu_photo_hetao@2x.jpg'),desc:'核桃富含镁元素，研究发现，提升体内的镁元素水平，几乎可以立即减少身体压力负荷，改善多梦的状况。临床上，核桃也常被用来治疗神经衰弱、失眠、健忘、多梦等症状。'},
          {name:'温牛奶',pic:require('./images/zt/food/bg_shipu_photo_milk@2x.jpg'),desc:'含有一些色胺酸（具有镇静作用的一种氨基酸）和钙，钙有利于大脑充分利用色胺酸。'},
          {name:'苹果',pic:require('./images/zt/food/bg_shipu_photo_apple@2x.jpg'),desc:'苹果补中益气，专治火盛脾虚，对阴虚火旺、肝胆不和、肠胃不畅引起的失眠有不错的疗效。苹果中的芳香成分中含有92%的醇类，其散发的浓郁香气，能对人的神经起到很好的镇静作用，使人快速入眠。'},
          {name:'燕麦片',pic:require('./images/zt/food/bg_shipu_photo_oats@2x.jpg'),desc:'能诱使产生褪黑素，一小碗就能起到促进睡眠的效果，如果大量咀嚼燕麦片，效果会更佳。'},
          {name:'食醋',pic:require('./images/zt/food/bg_shipu_photo_vinegar@2x.jpg'),desc:'因工作或旅途劳累过度，杂梦缠身，夜难安眠，可用一汤匙食醋兑入温开水中慢服。饮后闭目养神，不久便会入睡。'},
          {name:'富含Ω-3的食物',pic:require('./images/zt/food/bg_shipu_photo_tryptopan@2x.jpg'),desc:'牛津大学研究发现，Ω-3有助于人体获得更深度、更舒适的睡眠。富含Ω-3的食物来源包括奇亚籽、南瓜子、火麻仁、核桃、比目鱼、三文鱼和亚麻籽。'},
          {name:'富含维生素B6的食物',pic:require('./images/zt/food/bg_shipu_photo_alphathree@2x.jpg'),desc:'这种必需的维生素有助于调节人体应激反应，放松人体神经系统。富含维生素B6的食物来源有香蕉、酸牛奶、腰果、花生酱、杏仁、牛油果、鱼类、番茄、菠菜、番薯、海菜和蛋类。'},
        ],
        szrkj: [
          {name:'温牛奶',pic:require('./images/zt/food/bg_shipu_photo_milk@2x.jpg'),desc:'含有一些色胺酸（具有镇静作用的一种氨基酸）和钙，钙有利于大脑充分利用色胺酸。'},
          {name:'奇异果',pic:require('./images/zt/food/bg_shipu_photo_vc@2x.jpg'),desc:'失眠往往跟交感神经过度兴奋和中枢神经异常唤起有关，或者是受到大量分泌的压力激素所影响。奇异果中含有丰富的维生素C、钙和镁，能促进神经传导物质的传递与合成，尤其是钙更具有抑制交感神经及稳定情绪的功效。'},
          {name:'红枣',pic:require('./images/zt/food/bg_shipu_photo_reddate@2x.jpg'),desc:'红枣，味甘性温，主要功能为补中益气、养血安神，临床主要用于脾胃气虚、血虚萎黄、血虚失眠多梦等症的治疗。'},
          {name:'黑芝麻',pic:require('./images/zt/food/bg_shipu_photo_sesame@2x.jpg'),desc:'黑芝麻含有多种矿物质、大量的钙、镁，能安定神经、帮助睡眠。对牛奶敏感的人可在睡前喝一小碗无糖芝麻糊。'},
          {name:'桑葚',pic:require('./images/zt/food/bg_shipu_photo_mulberry@2x.jpg'),desc:'目前水果及其制品中含天然铁最丰富的，每100克含铁42.5毫克，无愧于水果中“补血果”的称号；桑葚还含有强效抗氧化剂-白黎芦醇，能保护神经递质免遭氧化，排毒抗衰老。'},
          {name:'桂圆',pic:require('./images/zt/food/bg_shipu_photo_longan@2x.jpg'),desc:'桂圆性温味甘，益心脾，补气血，具有良好的滋养补益作用。将桑椹与桂元等组方为椹元茶饮用，对因气血不足导致的失眠问题有很好的调治作用。'},
          {name:'富含维生素D的食物',pic:require('./images/zt/food/bg_shipu_photo_vd@2x.jpg'),desc:'根据《临床睡眠医学》研究，维生素D缺乏和白天过度嗜睡有着强烈的关联。富含维生素D的食物来源较少，比如剑鱼、鲑鱼、金枪鱼、马鲛鱼、香菇、牡蛎等。不过，研究表明，提升VD水平的最佳方法，是适当地晒太阳。'},
          {name:'营养丰富且容易消化吸收的食物',pic:require('./images/zt/food/bg_shipu_photo_vbsix@2x.jpg'),desc:'如水果、杂粮、薯类、蔬菜、鱼肉、鸡肉等。补充七大营养素，改善气血不足，进而改善醒后不清/觉累的情况。'},
          {name:'富含硒元素的食物',pic:require('./images/zt/food/bg_shipu_photo_selenium@2x.jpg'),desc:'硒缺乏是造成睡眠异常的一个因素。它对人体免疫系统功能和甲状腺功能也非常重要。主要食物来源包括巴西栗、葵花子、牛肉、牡蛎、鸡肉和小型褐菇。'},
          {name:'富含Ω-3的食物',pic:require('./images/zt/food/bg_shipu_photo_tryptopan@2x.jpg'),desc:'牛津大学研究发现，Ω-3有助于人体获得更深度、更舒适的睡眠。富含Ω-3的食物来源包括奇亚籽、南瓜子、火麻仁、核桃、比目鱼、三文鱼和亚麻籽。'},
        ],
        gnqsbh: [
          {name:'助眠茶',pic:require('./images/zt/food/bg_shipu_photo_sleepingtea@2x.jpg'),desc:'下列药材中选择1~3种，随意搭配泡茶喝：啤酒花、缬草根、黄春菊、西番莲、玫瑰花、黄芩、蜜蜂花。'},
          {name:'黄豆',pic:require('./images/zt/food/bg_shipu_photo_soybean@2x.jpg'),desc:'富含的大豆异黄酮能直接影响到女性的雌激素分泌状况，对改善更年期睡眠障碍有很大好处。'},
          {name:'葛根',pic:require('./images/zt/food/bg_shipu_photo_pueraria@2x.jpg'),desc:'葛根含丰富的异黄酮成分，帮助增强女性内分泌功能，可用作食疗。'},
          {name:'小米',pic:require('./images/zt/food/bg_shipu_photo_millet@2x.jpg'),desc:'机理：含有丰富的色氨酸，能促进大脑细胞分泌使人昏然欲睡的神经递质——五羟色氨，使大脑活动受到暂时抑制，因此容易入睡。历史：《黄帝内经》载有的“半夏秫米汤”就是现在的小米粥，是历代医家治疗失眠不寐的一个经典方剂。'},
          {name:'温牛奶',pic:require('./images/zt/food/bg_shipu_photo_milk@2x.jpg'),desc:'含有一些色胺酸（具有镇静作用的一种氨基酸）和钙，钙有利于大脑充分利用色胺酸。'},
          {name:'葡萄',pic:require('./images/zt/food/bg_shipu_photo_grape@2x.jpg'),desc:'葡萄是二苯乙烯类雌激素的重要来源，能有效改善女性更年期因雌激素分泌下降，导致的失眠问题。'},
          {name:'燕麦片',pic:require('./images/zt/food/bg_shipu_photo_oats@2x.jpg'),desc:'能诱使产生褪黑素，一小碗就能起到促进睡眠的效果，如果大量咀嚼燕麦片，效果会更佳。'},
          {name:'黑芝麻',pic:require('./images/zt/food/bg_shipu_photo_sesame@2x.jpg'),desc:'黑芝麻含有多种矿物质、大量的钙、镁，能安定神经、帮助睡眠。对牛奶敏感的人可在睡前喝一小碗无糖芝麻糊。'},
          {name:'富含镁元素的食物',pic:require('./images/zt/food/bg_shipu_photo_magnesium@2x.jpg'),desc:'镁元素是一种抗压矿物质，研究发现，提升体内的镁元素水平，几乎可以立即减少身体压力负荷，改善早醒的状况。绿叶蔬菜、南瓜子、芝麻等种子类，螺旋藻、巴西栗等超级食物，都是镁元素的集中来源。'},
          {name:'富含Ω-3的食物',pic:require('./images/zt/food/bg_shipu_photo_tryptopan@2x.jpg'),desc:'牛津大学研究发现，Ω-3有助于人体获得更深度、更舒适的睡眠。富含Ω-3的食物来源包括奇亚籽、南瓜子、火麻仁、核桃、比目鱼、三文鱼和亚麻籽。'},
        ],
        lrsds: [
          {name:'小米',pic:require('./images/zt/food/bg_shipu_photo_millet@2x.jpg'),desc:'机理：含有丰富的色氨酸，能促进大脑细胞分泌使人昏然欲睡的神经递质——五羟色氨，使大脑活动受到暂时抑制，因此容易入睡。历史：《黄帝内经》载有的“半夏秫米汤”就是现在的小米粥，是历代医家治疗失眠不寐的一个经典方剂。'},
          {name:'温牛奶',pic:require('./images/zt/food/bg_shipu_photo_milk@2x.jpg'),desc:'含有一些色胺酸（具有镇静作用的一种氨基酸）和钙，钙有利于大脑充分利用色胺酸。'},
          {name:'杏仁',pic:require('./images/zt/food/bg_shipu_photo_almond@2x.jpg'),desc:'它既含有色胺酸，又含有适量的肌肉松弛剂——镁。'},
          {name:'助眠茶',pic:require('./images/zt/food/bg_shipu_photo_sleepingtea@2x.jpg'),desc:'下列药材中选择1~3种，随意搭配泡茶喝：啤酒花、缬草根、黄春菊、西番莲、玫瑰花、黄芩、蜜蜂花。'},
          {name:'蜂蜜',pic:require('./images/zt/food/bg_shipu_photo_honey@2x.jpg'),desc:'在温牛奶中或香草茶中放入少量蜂蜜，一些葡萄糖能促使你的大脑停止产生进食素，进食素是最近发现的一种与保持清醒有关的神经传递素。'},
          {name:'百合',pic:require('./images/zt/food/bg_shipu_photo_oats@2x.jpg'),desc:'百合含有少量淀粉、脂肪、蛋白质及微量生物碱，具有清热养阴，润肺安神的功效，是治疗老年人因神经衰弱而失眠的强壮滋补食物。'},
          {name:'亚麻籽/奇亚籽',pic:require('./images/zt/food/bg_shipu_photo_linseed@2x.jpg'),desc:'只要向你就寝前喝的小米粥中撒入2大汤匙这种有益健康的亚麻籽/奇亚籽就能起到预想中的效果。它们富含欧米加-3脂肪酸。'},
          {name:'富含褪黑素的食物',pic:require('./images/zt/food/bg_shipu_photo_selenium@2x.jpg'),desc:'一些食物中本身含有少量褪黑激素。研究发现，一些食物有助于提升人体褪黑激素的产生。酸樱桃显然是褪黑激素含量最高的食物来源。不过，核桃、生姜和芦笋中也含有少量褪黑激素。有些食物能自然提升人体褪黑激素的水平，其中包括菠萝（在某项研究中处于首位）、西红柿、香蕉和橘子。'},
          {name:'富含色氨酸的食物',pic:require('./images/zt/food/bg_shipu_photo_vbsix@2x.jpg'),desc:'睡眠关键的营养成分，是人体血清素产生的前提。色氨酸常见于火鸡、鸡肉、蛋类、番薯、奇亚籽、火麻仁、香蕉、南瓜子、杏仁、酸牛奶和绿叶蔬菜。'},
          {name:'富含益生菌与益生元的食物',pic:require('./images/zt/food/bg_shipu_photo_tryptopan@2x.jpg'),desc:'泡菜、腌菜、味增、酸牛奶（乳制品与非乳制品）、酸乳酒（乳制品与非乳制品）、红茶菌。通过改善肠道菌群，影响脑肠轴，进而改善多梦的情况。'},
        ],
        jyxym: [
          {name:'苹果',pic:require('./images/zt/food/bg_shipu_photo_apple@2x.jpg'),desc:'苹果补中益气，专治火盛脾虚，对阴虚火旺、肝胆不和、肠胃不畅引起的失眠有不错的疗效。苹果中的芳香成分中含有92%的醇类，其散发的浓郁香气，能对人的神经起到很好的镇静作用，使人快速入眠。'},
          {name:'核桃',pic:require('./images/zt/food/bg_shipu_photo_hetao@2x.jpg'),desc:'核桃富含镁元素，研究发现，提升体内的镁元素水平，几乎可以立即减少身体压力负荷，改善多梦的状况。临床上，核桃也常被用来治疗神经衰弱、失眠、健忘、多梦等症状。'},
          {name:'温牛奶',pic:require('./images/zt/food/bg_shipu_photo_milk@2x.jpg'),desc:'含有一些色胺酸（具有镇静作用的一种氨基酸）和钙，钙有利于大脑充分利用色胺酸。'},
          {name:'土豆',pic:require('./images/zt/food/bg_shipu_photo_patato@2x.jpg'),desc:'它能清除掉对可诱发睡眠的色胺酸起干扰作用的酸。为了达到这种效果，你只要将烤马铃薯捣碎后掺入温牛奶中食用即可。'},
          {name:'小米',pic:require('./images/zt/food/bg_shipu_photo_millet@2x.jpg'),desc:'机理：含有丰富的色氨酸，能促进大脑细胞分泌使人昏然欲睡的神经递质——五羟色氨，使大脑活动受到暂时抑制，因此容易入睡。历史：《黄帝内经》载有的“半夏秫米汤”就是现在的小米粥，是历代医家治疗失眠不寐的一个经典方剂。'},
          {name:'樱桃',pic:require('./images/zt/food/bg_shipu_photo_cherry@2x.jpg'),desc:'研究发现，仅一杯樱桃汁中所含的褪黑素，就足以“诱发”健康睡眠反应，提高睡眠质量。'},
          {name:'鸡肉',pic:require('./images/zt/food/bg_shipu_photo_chicken@2x.jpg'),desc:'鸡肉中含有色氨酸，有益改善睡眠。此外，鸡肉也是锌和维生素B6的良好来源，而这两种营养素也有助人体产生褪黑素。需要提醒的是，孩子晚餐吃太多鸡肉会摄入太多蛋白质，反会导致入睡困难，适量最好。'},
          {name:'富含益生菌与益生元的食物',pic:require('./images/zt/food/bg_shipu_photo_tryptopan@2x.jpg'),desc:'泡菜、腌菜、味增、酸牛奶（乳制品与非乳制品）、酸乳酒（乳制品与非乳制品）、红茶菌。通过改善肠道菌群，影响脑肠轴，进而改善多梦的情况。'},
          {name:'富含膳食纤维的食物',pic:require('./images/zt/food/bg_shipu_photo_vbsix@2x.jpg'),desc:'建议每天多摄入蔬菜水果、粗粮（糙米、玉米、小米、红薯、全麦面包等）等富含膳食纤维的食物，可促进小孩胃肠道蠕动，加快食物通过胃肠道，减少毒素吸收，保护肠道粘膜，进而改善睡眠。'},
          {name:'富含维生素D的食物',pic:require('./images/zt/food/bg_shipu_photo_vd@2x.jpg'),desc:'根据《临床睡眠医学》研究，维生素D缺乏和白天过度嗜睡有着强烈的关联。富含维生素D的食物来源较少，比如剑鱼、鲑鱼、金枪鱼、马鲛鱼、香菇、牡蛎等。不过，研究表明，提升VD水平的最佳方法，是适当地晒太阳。'},
        ],
        ksdsc: [
          {name:'助眠茶',pic:require('./images/zt/food/bg_shipu_photo_sleepingtea@2x.jpg'),desc:'下列药材中选择1~3种，随意搭配泡茶喝：啤酒花、缬草根、黄春菊、西番莲、玫瑰花、黄芩、蜜蜂花。'},
          {name:'小米',pic:require('./images/zt/food/bg_shipu_photo_millet@2x.jpg'),desc:'机理：含有丰富的色氨酸，能促进大脑细胞分泌使人昏然欲睡的神经递质——五羟色氨，使大脑活动受到暂时抑制，因此容易入睡。历史：《黄帝内经》载有的“半夏秫米汤”就是现在的小米粥，是历代医家治疗失眠不寐的一个经典方剂。'},
          {name:'香蕉',pic:require('./images/zt/food/bg_shipu_photo_banana@2x.jpg'),desc:'除了能平稳血清素和褪黑素外，它还含有可具有让肌肉松弛效果的镁元素。'},
          {name:'温牛奶',pic:require('./images/zt/food/bg_shipu_photo_milk@2x.jpg'),desc:'含有一些色胺酸（具有镇静作用的一种氨基酸）和钙，钙有利于大脑充分利用色胺酸。'},
          {name:'蜂蜜',pic:require('./images/zt/food/bg_shipu_photo_honey@2x.jpg'),desc:'在温牛奶中或香草茶中放入少量蜂蜜，一些葡萄糖能促使你的大脑停止产生进食素，进食素是最近发现的一种与保持清醒有关的神经传递素。'},
          {name:'燕麦片',pic:require('./images/zt/food/bg_shipu_photo_oats@2x.jpg'),desc:'能诱使产生褪黑素，一小碗就能起到促进睡眠的效果，如果大量咀嚼燕麦片，效果会更佳。'},
          {name:'亚麻籽/奇亚籽',pic:require('./images/zt/food/bg_shipu_photo_linseed@2x.jpg'),desc:'只要向你就寝前喝的小米粥中撒入2大汤匙这种有益健康的亚麻籽/奇亚籽就能起到预想中的效果。它们富含欧米加-3脂肪酸。'},
          {name:'莲子',pic:require('./images/zt/food/bg_shipu_photo_lotus@2x.jpg'),desc:'莲子含有莲子碱、芳香甙等镇静成分，可增加5-羟色胺的供给，故能使人入睡。'},
          {name:'富含益生菌与益生元的食物',pic:require('./images/zt/food/bg_shipu_photo_tryptopan@2x.jpg'),desc:'泡菜、腌菜、味增、酸牛奶（乳制品与非乳制品）、酸乳酒（乳制品与非乳制品）、红茶菌。通过改善肠道菌群，影响脑肠轴，进而改善多梦的情况。'},
          {name:'富含镁元素的食物',pic:require('./images/zt/food/bg_shipu_photo_magnesium@2x.jpg'),desc:'镁元素是一种抗压矿物质，研究发现，提升体内的镁元素水平，几乎可以立即减少身体压力负荷，改善早醒的状况。绿叶蔬菜、南瓜子、芝麻等种子类，螺旋藻、巴西栗等超级食物，都是镁元素的集中来源。'},
        ]

      }
    };
  },
  components: {},
  created() {
    
  },
  methods: {
    showFoodsInfo(item,event){
      this.dialogTop = event.clientY-50;
      this.foodsItem = item;
      this.showFoodsInfoDialog = true;
    },
    hideFoodsInfoDialog(){
      this.showFoodsInfoDialog = false;
    },
    getComponentInfo(id){
      this.componentId = id;
    },
    goLink(){
      if(this.isDevice){
        client.postData(apiConfig.API_MORE_DETAIL,{"componentId":this.componentId},{"deviceId":window.userinfo.deviceId}).then((data) => { 
            if (data.code != 200) {
              return
            }
            let componentData = data.data;
            Bridge.handlerHtmlMessage({ type: 9, data: { component: componentData } });
          }, (data) => {
        })
      }else{
        location.href = '../home/detail.html?componentId='+this.componentId;
      }
    }
  },
  mounted() {
    let fsAgent = navigator.userAgent.toLowerCase();
    if (/fstop/.test(fsAgent)||client.getQueryString('device')) {
      this.isDevice = true;
    }
    if (this.targetType) {
      if (this.isDevice) {
        Bridge.handlerHtmlMessage({ type: 4, data: {} }, dataUser => {
          window.userinfo = dataUser.data;
        });
      }
    }
        //2-辗转难眠;3-凌晨醒;4-杂梦纷呈;5-睡足仍困倦;6-更年期睡不好;7-老人睡得少;8-家有小夜猫;9-快速倒时差
    if(this.targetId==2){
      this.getComponentInfo('876995620005634289');
    }
    if(this.targetId==3){
      this.getComponentInfo('880293272390623362');
    }
    if(this.targetId==4){
      this.getComponentInfo('868274223150424540');
    }
    if(this.targetId==5){
      this.getComponentInfo('867960151838187781');
    }
    if(this.targetId==6){
      this.getComponentInfo('885311452842451388');
    }
    if(this.targetId==7){
      this.getComponentInfo('887873646863999085');
    }
    if(this.targetId==8){
      this.getComponentInfo('867960151838187699');
    }
    if(this.targetId==9){
      this.getComponentInfo('882437390223040513');
    }
    if (client.inFstop) {
      this.isDevice = true;
    }
  },
  updated() {}
};
</script>
<style lang="less">
@import "../../../common/css/common.less";

.box-top {
  display: -webkit-box;
}

.toggle-img {
  position: absolute;
  right: 0.15rem;
  width: 0.3rem;
  height: 0.3rem;
}

.alert {
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  position: fixed;
  left: 0px;
  top: 0px;
  z-index: 5555555554;
}

.health-des {
  font-size: 0.15rem;
  color: #333333;
}

.imp-des {
  color: #04c5b4;
}

.health-contain {
  margin-top: 0.25rem;
  display: -webkit-box;
}

.health-all {
  font-size: 0.15rem;
  color: #333333;
  margin-left: 0.05rem;
  margin-right: 0.1rem;
}

.health-part {
  width: 0.15rem;
  height: 0.15rem;
  line-height: 0.15rem;
  text-align: center;
  font-size: 0.12rem;
  border-radius: 50%;
  margin-top: 0.05rem;
  color: #ffffff;
  background: #f5a623;
}

.good-des {
  font-size: 0.15rem;
  color: #333333;
  margin-top: 0.1rem;
}

.advice-tit {
  font-size: 0.15rem;
  color: #333333;
  margin-top: 0.15rem;
}

.advice-border {
  border: 0.01rem solid #e6e6e6;
  border-radius: 0.05rem;
  margin-top: 0.05rem;
}

.food-img1 {
  width: 0.6rem;
  height: 0.6rem;
  margin: 0.2rem;
}

.food-name {
  font-size: 0.15rem;
  color: #333333;
  line-height: 1rem;
}

.food-name::before {
  width: 0.12rem;
  height: 0.21rem;
  line-height: 0.21rem;
  margin-right: 0.05rem;
  display: inline-block;
  content: "\2022";
  font-size: 0.2rem;
}

.food.food-name::before {
  color: #f5a623;
}

.per {
  font-size: 0.15rem;
  color: #999999;
}

.scroll-view {
  overflow-x: auto;
  display: -webkit-box;
  &::-webkit-scrollbar {
    height: 0;
    width: 0;
    -webkit-appearance: none;
    display: none !important;
    background: transparent !important;
  }
}

.advice-img {
  width: 0.6rem;
  height: 0.6rem;
}

.advice-one {
}

.name-two {
  font-size: 0.12rem;
  color: #333333;
  text-align: center;
  margin-top: 0.07rem;
}

.right-advice:not(:first-child) {
  margin-left: 0.1rem;
  width: 0.6rem;
}

.choose {
  width: 1.53rem;
  height: 0.9rem;
  position: relative;
  text-align: center;
}

.choose-one {
  background: url(images/bg_howtoeat_small_fanshidang_normal@2x.jpg);
  background-size: cover;
}

.good-advice {
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 0.29rem;
  font-size: 0.15rem;
  color: #ffffff;
}

.good-one {
  background: #ffba3c;
}

.good-two {
  background: #4a90e2;
}

.box-two {
  margin-top: 0.1rem;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.good-in {
  width: 0.18rem;
  height: 0.18rem;
  display: inline-block;
  background: #ffffff;
  border-radius: 50%;
  float: right;
  color: #ffba3c;
  text-align: center;
  line-height: 0.18rem;
  margin-top: 0.05rem;
  margin-right: 0.05rem;
}
</style>