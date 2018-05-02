<template>
  <div>
    <!-- 困扰 1-睡得很好;2-辗转难眠;3-凌晨醒;4-杂梦纷呈;5-睡足仍困倦;6-更年期睡不好;7-老人睡得少;8-家有小夜猫;9-快速倒时差 -->
    <!-- 更年期睡不好 -->
    <template v-if="targetId==6">
      <p class="health-des">如果您是40多岁的女性， 以往睡眠状况良好， 近期突然出现难以入睡或早醒后再睡不着等问题，就需要考虑是否是更年前期或更年期导致的睡眠不良。 鹿博士针对
        <span class="imp-des">更年期睡不好</span>的给出如下行动方案。希望能改善您的问题。当然，如果您的情况十分严重，还是应该去看医生
      </p>
      <div class="health-contain">
        <div class="health-part food-part">1</div>
        <div class="health-all ">爱上肚皮舞</div>
      </div>
      <div class="advice-border-two">
        <div>
          <div class="help-img" style="margin-top:0.5rem;"><img src="./images/zt/ic_howtorun_dupiwu_normal@2x.png"></div>
          <div class="sport-tit">肚皮舞</div>
        </div>
        <div>
          <div class="food-name-two ">增强身体的协调性 </div>
          <div class="food-name-two ">一种全身的舞蹈运动 </div>
          <div class="food-name-two ">使身材曲线更柔美 </div>
          <div class="food-name-two ">动作完全为女性设计 </div>
          <div class="food-name-two "> 舞动时会摩擦腹腔子宫器官，加速血液循环，调节内分泌系统 </div>
        </div>
      </div>
      <div class="health-contain">
        <div class="health-part food-part">2</div>
        <div class="health-all ">睡前瑜伽：十分钟，改善失眠与睡眠困扰</div>
      </div>
      <div class="advice-border-two">
        <div>
          <div class="help-img" style="margin-top:0.2rem;"><img src="./images/ic_howtorun_yoga_normal@2x.png"></div>
          <div class="sport-tit">瑜伽</div>
        </div>
        <div>
          <div class="youga-des">瑜伽修身养性，每个体位动作都蕴含不同的意义和功效，在练习时做到自己最大的极限即可。搭配一些轻柔的瑜伽音乐来做，助眠效果更好喔</div>
        </div>
      </div>
      <div class="health-contain">
        <div class="health-part food-part">3</div>
        <div class="health-all ">掌握这些技能能让你睡得更好（文章资讯）</div>
      </div>
      <div class="means-contain" @click="goComponent(item)" v-for="item in contentList" v-if="item.display">
        <div class="means" :style="{'background-image':'url('+item.mediumHomeIcons[0]+')'}"><span v-if="item.componentType==24">{{item.vedioInfo.totalPlayTime|totalPlayTimeFilter}}</span></div>
        <div class="means-des">
          <h3>{{item.title}}</h3>
          <div class="means-tags" v-if="item.componentType!=24&&item.tagList&&item.tagList.length!=0">
            <span v-for="titem in item.tagList">{{titem.tagName}}</span>
          </div>
          <div class="means-tags" v-else>{{item.vedioInfo.playNum|playNumFilter}}次播放</div>
        </div>
      </div>
    </template>
    <!-- 家有小夜猫 -->
    <template v-if="targetId==8">
      <p class="health-des">有宝宝的爸爸妈妈，都或多或少都有过
        <span class="imp-des">孩子睡不好</span>的烦恼，如入睡难、睡不安、打鼾、夜啼等，不妨加入鹿博士提供的改善
        <span class="imp-des">家有小夜猫</span>的行动方案。坚持一段时间，也许能让宝宝睡得好，大人更轻松
      </p>
      <div class="health-contain">
        <div class="health-part food-part">1</div>
        <div class="health-all ">常给孩子捏脊</div>
      </div>
      <p class="good-des">捏脊疗法可以刺激人体植物神经干和神经节，并整体、双向地调节内脏活动，进而改善睡眠。按以下指引捏脊，图一至图三完成为1次，建议每晚9次</p>
      <div class="advice-border ">
        <div class="health-over advice-center">
          <div class="help-img  nieji1"></div>
          <div class="help-des">1.从尾椎开始拇指往下压，食指、中指在上捏住脊柱的两旁的皮肤边提捏，边向前推进，由尾骶部捏到枕颈部</div>
        </div>
        <div class="health-over advice-center">
          <div class="help-img nieji2"></div>
          <div class="help-des">2.从肩颈部方向，拇指不可离开背部</div>
        </div>
        <div class="health-over advice-center">
          <div class="help-img nieji3"></div>
          <div class="help-des">3.至肩颈部时，手顺着脊椎滑下来</div>
        </div>
      </div>
      <div class="health-contain">
        <div class="health-part food-part">2</div>
        <div class="health-all ">睡前按摩孩子肚子</div>
      </div>
      <p class="good-des">孩子有可能因肚子胀气、便秘，或单纯腹绞痛而睡不着，可按摩肚子舒缓疼痛、促进睡眠，具体可按以下步骤进行</p>
      <div class="help-two"><div>
        <div class="help-img duzi past-top" style="margin-top:0.7rem;"></div></div><div>
        <div class="mean-flex">
          <div class="food-name-two ">大人双手洗净 </div>
          <div class="food-name-two ">孩子仰卧放松 </div>
          <div class="food-name-two ">左手按在孩子腹部，手心对肚脐，右手叠放在左手上</div>
          <div class="food-name-two ">按顺时针方向绕脐向外从小圈向大圈按摩，完成1组 </div>
          <div class="food-name-two "> 按揉时，用力适度，孩子呼吸自然 </div>
          <div class="food-name-two ">继续按上述方式按摩，总共9次</div>
        </div></div>
      </div>
      <div class="health-contain">
        <div class="health-part food-part">3</div>
        <div class="health-all ">让孩子乖乖就寝的小妙招</div>
      </div>
      <div class="help-two"><div>
        <div class="help-img moon past-top" style="margin-top:0.9rem;"></div></div><div>
        <div class="mean-flex">
          <div class="food-name-two advice-border-top">舒适的睡眠环境：昏暗、安静、通风、远离电子设备</div>
          <div class="food-name-two advice-border-top">规律的就寝步骤：洗澡、换睡衣、刷牙、说故事、道晚安</div>
          <div class="food-name-two advice-border-top">陪伴的角色替代（针对独睡孩子）：动物玩偶、柔软毛毯、安抚玩具</div>
          <div class="food-name-two advice-border-top">对等的奖励行为：当孩子表现良好时，可以在隔天早上让他选择想吃的早餐或想穿出门的衣服，让孩子打心底将「表现良好」与「奖励行为」画上等号，加速习惯的养成 </div>
        </div>
        </div>
      </div>
      <div class="health-contain">
        <div class="health-part food-part">4</div>
        <div class="health-all ">每天“日光浴”15分钟</div>
      </div>
      <div class="food-name-tit">阳光能帮助建立「生物钟」</div>
      <div class="food-name-tit">阳光能调节因情绪引起的睡眠问题</div>
      <div class="advice-border">
        <div class="health-over">
          <div>
          <div class="help-img sun past-top"></div></div><div>
          <div class="means-des">
            <div class="past">小贴士</div>
            <div class="min-past">1. 避开紫外线高峰期</div>
            <div class="help-grey">（10:00AM-14:00PM）</div>
            <div class="advice-border-top">2.做好防晒措施</div>
            <div class="advice-border-top">3.养成良好习惯</div>
            <div class="help-grey">（每天都去户外走走）</div>
          </div></div>
        </div>
      </div>
    </template>
    <!-- 老人睡得少 -->
    <template v-if="targetId==7">
      <p class="health-des">
        <span class="imp-des">老人晚上睡不着，早上醒得早？</span>可以加入鹿博士提供的改善
        <span class="imp-des">老人睡得少</span>的行动方案。坚持下来，也许能显著改善睡眠问题。当然，如果您的失眠情况十分严重，还是应该去看医生
      </p>
      <div class="health-contain">
        <div class="health-part food-part">1</div>
        <div class="health-all ">睡前热水泡脚</div>
      </div>
      <p class="good-des">泡脚能刺激温通足部穴位、引血下行、舒筋活络，是改善睡眠、消除疲劳的好方法</p>
      <div class="advice-border-two">
        <div><div class="help-img paojiao" style="margin-top:0.1rem;"></div></div>
        <div>
          <div class="food-name-two ">水温：40~42℃ </div>
          <div class="food-name-two ">时长：不超过半小时 </div>
          <div class="food-name-two ">器具：木桶最好</div>
        </div>
      </div>
      <div class="advice-border-two advice-border-top">
        <div>
          <div class="help-img xuewei " style="margin-top:0.5rem;"></div>
          <div class="sport-tit">涌泉穴</div>
        </div>
        <div>
          <div class="past past-top">小贴士</div>
          <div class="food-name-two ">糖尿病足患者、静脉曲张患者、足癣等皮肤病患者、儿童孕妇等人群泡脚需谨慎</div>
          <div class="food-name-two ">泡脚后按压涌泉穴
            <span class="imp-des">（位于足底前部凹陷处，第2、3趾趾缝头端与足跟连线的前1/3处）</span>几分钟，可以更好地促进足底血液循环，改善睡眠</div>
        </div>
      </div>
      <div class="health-contain">
        <div class="health-part food-part">2</div>
        <div class="health-all ">每天“日光浴”15分钟</div>
      </div>
      <div class="food-name-tit">阳光能帮助建立「生物钟」</div>
      <div class="food-name-tit">阳光能调节因情绪引起的睡眠问题</div>
      <div class="advice-border">
        <div class="health-over">
          <div>
          <div class="help-img sun " style="margin-top:0.4rem;"></div></div><div>
          <div class="means-des">
            <div class="past">小贴士</div>
            <div class="min-past">1. 避开紫外线高峰期</div>
            <div class="help-grey">（10:00AM-14:00PM）</div>
            <div class="advice-border-top">2.做好防晒措施</div>
            <div class="advice-border-top">3.养成良好习惯</div>
            <div class="help-grey">（每天都去户外走走）</div>
          </div>
          </div>
        </div>
      </div>
      <div class="health-contain">
        <div class="health-part food-part">3</div>
        <div class="health-all ">白天不多睡</div>
      </div>
      <div class="advice-border">
        <div class="health-over">
          <div>
          <div class="help-img"><img src="./images/zt/ic_howtorun_cannot_normal@2x.png"></div></div><div>
          <div class="means-des">
            <div>1. 午睡时间不要超1小时</div>
            <div class="advice-border-top">2.除非身体不适，不要增加白 天的睡眠时间
            </div>
          </div></div>
        </div>
      </div>
      <div class="health-contain">
        <div class="health-part food-part">4</div>
        <div class="health-all ">太极拳打起来</div>
      </div>
      <div class="advice-border-two"><div>
        <div class="and-one">
          <div class="help-img taiji2"></div>
          <div class="sport-tit">太极</div>
        </div></div><div>
        <div class="youga-more">练太极拳有使高度紧张的精神状态的得到恢复，阴阳达到平衡的功效</div></div>
      </div>
      <div class="health-contain">
        <div class="health-part food-part">5</div>
        <div class="health-all ">掌握这些技能能让你睡得更好（文章资讯）</div>
      </div>
      <div class="means-contain" @click="goComponent(item)" v-for="item in contentList" v-if="item.display">
        <div class="means" :style="{'background-image':'url('+item.mediumHomeIcons[0]+')'}"><span v-if="item.componentType==24">{{item.vedioInfo.totalPlayTime|totalPlayTimeFilter}}</span></div>
        <div class="means-des">
          <h3>{{item.title}}</h3>
          <div class="means-tags" v-if="item.componentType!=24&&item.tagList&&item.tagList.length!=0">
            <span v-for="titem in item.tagList">{{titem.tagName}}</span>
          </div>
          <div class="means-tags" v-else>{{item.vedioInfo.playNum|playNumFilter}}次播放</div>
        </div>
      </div>
    </template>
    <!-- 凌晨醒 -->
    <template v-if="targetId==3">
      <p class="health-des">
        <span class="imp-des">
          凌晨醒来</span>再也睡不着？快加入鹿博士改善早醒的行动方案吧。坚持一段时间， 相信能帮到你哦！当然，如果您的失眠情况十分严重，还是应该去看医生
      </p>
      <div class="health-contain">
        <div class="health-part food-part">1</div>
        <div class="health-all ">每天“日光浴”15分钟</div>
      </div>
      <div class="food-name-tit">阳光能帮助建立「生物钟」</div>
      <div class="food-name-tit">阳光能调节因情绪引起的睡眠问题</div>
      <div class="advice-border-two" style="padding: 0.1rem 0;">
        <div>
          <div class="help-img sun" style="margin-top:0.3rem;"></div></div><div>
          <div class="means-des">
            <div class="past">小贴士</div>
            <div class="min-past">1. 避开紫外线高峰期</div>
            <div class="help-grey">（10:00AM-14:00PM）</div>
            <div class="advice-border-top">2.做好防晒措施</div>
            <div class="advice-border-top">3.养成良好习惯</div>
            <div class="help-grey">（每天都去户外走走）</div>
          </div></div>
      </div>
      <div class="health-contain">
        <div class="health-part food-part">1</div>
        <div class="health-all ">在晚餐后进行适量低强度运动，如：</div>
      </div>
      <div class="advice-border ">
        <div class="pure-sport">
          <div>
            <div class="pure-img run2"></div>
            <div class="sport-tit ">慢跑</div>
          </div>
          <div>
            <div class="pure-img swimming2"></div>
            <div class="sport-tit">慢速游泳</div>
          </div>
          <div>
            <div class="pure-img ymq2"></div>
            <div class="sport-tit">羽毛球</div>
          </div>
        </div>
        <div class="pure-sport">
          <div>
            <div class="pure-img dance2"></div>
            <div class="sport-tit ">现代舞</div>
          </div>
          <div>
            <div class="pure-img bike2"></div>
            <div class="sport-tit">骑车</div>
          </div>
          <div>
            <div class="pure-img "><img src="./images/zt/ic_howtorun_jianzi_normal@2x.png"></div>
            <div class="sport-tit">踢毽子</div>
          </div>
        </div>
        <div class="pure-sport-left">
          <div class="past past-width">低强度判断标准：</div>
          <div class="food-name-two ">运动心率约在80~100次/分</div>
          <div class="food-name-two ">微微出汗但不大汗淋漓</div>
          <div class="food-name-two ">运动后不头晕乏力</div>
          <div class="pure-desc">低强度运动能促进大脑分泌出抑制兴奋的物质，改善睡眠，缓解疲劳</div>
        </div>
      </div>
      <div class="health-contain">
        <div class="health-part food-part">3</div>
        <div class="health-all ">睡前瑜伽：十分钟，改善失眠与睡眠困扰</div>
      </div>
      <div class="advice-border-two">
        <div>
          <div class="help-img yoga2 " style="margin-top:0.7rem;"></div>
          <div class="sport-tit">瑜伽</div>
        </div><div>
        <div class="youga-more">瑜伽强调专注当下，用心体会每一次缓慢深长的呼吸，排除一切杂念，把意识投入到身体的每一个部位，通过对身体的练习，唤醒潜在的向上的能量。在加上特有的“瑜伽冥想”和“瑜伽休息术”，好似做了一场“心灵SPA”，让人倍感平静和愉悦，只需15-20分钟，就能帮我们一夜好眠到天亮</div>
        </div>
      </div>
      <div class="health-contain">
        <div class="health-part food-part">4</div>
        <div class="health-all ">太极拳打起来</div>
      </div>
      <div class="advice-border-two">
        <div>
        <div class="and-one">
          <div class="help-img taiji2 "></div>
          <div class="sport-tit">太极</div>
        </div></div><div>
        <div class="youga-more">练太极拳有使高度紧张的精神状态的得到恢复，阴阳达到平衡的功效</div></div>
      </div>
      <div class="health-contain">
        <div class="health-part food-part">5</div>
        <div class="health-all ">睡前回忆令你幸福的/感恩的事</div>
      </div>
      <p class="pure-desc">心怀感恩时，人的脑波变得安定、心情变得平和、肌肉变得放松，有利于进入睡眠状态。不妨做个感恩罐，把感恩的事写成字条随时放进去，让值得感恩的事情不会被遗忘</p>
    </template>
    <!-- 快速倒时差 -->
    <template v-if="targetId==9">
      <p class="health-des">
        如果你因为旅游/出差的原因需要跨越多个时区，此时你正苦于因
        <span class="imp-des">倒时差</span>而出现的种种睡眠问题，下面鹿博士分享的几个有用的
        <span class="imp-des">快速倒时差</span>的行动方案，赶快GET起来吧
      </p>
      <div class="health-contain">
        <div class="health-part food-part">1</div>
        <div class="health-all ">节食+早餐法</div>
      </div>
      <div class="help-two">
        <div>
        <div class="help-img jinshi past-top" style="margin-top:0.7rem;"></div></div><div>
        <div class="mean-flex">
          <div class="food-name-two ">以抵达目的地后的首个早晨为起始点，向前计算16小时，这段时间不要进食任何东西，除了饮水。
            <span class="imp-des">（节食）</span>
          </div>
          <div class="food-name-two ">在进食的16小时的后6个小时中，尽量保持处于睡眠状态</div>
          <div class="food-name-two ">抵达目的地后，在你平常习惯的起床时间起床，然后吃一顿丰盛的
            <span class="imp-des">（早餐）</span>
          </div>
        </div></div>
      </div>
      <div class="health-contain">
        <div class="health-part food-part">2</div>
        <div class="health-all ">倒时差铁律</div>
      </div>
      <div class="help-two"><div>
        <div class="help-img shicha past-top" style="margin-top:0.5rem;"></div></div><div>
        <div class="mean-flex">
          <div class="food-name-two ">到达当地后，在非睡眠时间，再怎么困也不能睡</div>
          <div class="food-name-two ">如果到达的时间是当地的晚上，在飞机上一定不能睡</div>
          <div class="food-name-two ">上飞机前将时间调成目的地的时间，并严格按目的地时间作息</div>
        </div></div>
      </div>
      <div class="health-contain">
        <div class="health-part  food-part">3</div>
        <div class="health-all ">神奇的“维生素G”助你一夜好眠</div>
      </div>
      <div class="pure-desc ">
        <span class="imp-des">维生素G（Ground）：</span>光脚踩地10分钟</div>
      <div class="pure-desc ">
        <span class="imp-des">场地：</span>土壤、草地、沙滩、水泥、砖块、鹅卵石</div>
      <div class="pure-desc box-flex">
        <div class="imp-des imp-width">功效：</div>
        <div>赤脚接触地面有助调节自主神经，降低夜间皮质醇水平，改善睡眠</div>
      </div>
      <div class="help-two">
        <div>
        <div class="help-img jiaoyin help-top" style="margin-top:0.9rem;"></div></div><div>
        <div class="mean-flex pure-bottom past-top">
          <div class="past past-width ">维生素G踩石法</div>
          <div class="food-name-two ">选择公园、操场、住宅周围等铺设鹅卵石的地方</div>
          <div class="food-name-two ">赤脚在凹凸不平的鹅卵石上来回有节奏地踩踏走动</div>
          <div class="food-name-two ">每天踏石1至2次，每次15至20分钟左右</div>
          <div class="past advice-border-top">小贴士</div>
          <div class="pure-desc">踩踏鹅卵石时应避免皮肤直接接触鹅卵石，需穿上袜子踩踏</div>
        </div></div>
      </div>
      <div class="health-contain">
        <div class="health-part food-part">4</div>
        <div class="health-all ">掌握这些技能能让你睡得更好（文章资讯）</div>
      </div>
      <div class="means-contain" @click="goComponent(item)" v-for="item in contentList" v-if="item.display">
        <div class="means" :style="{'background-image':'url('+item.mediumHomeIcons[0]+')'}"><span v-if="item.componentType==24">{{item.vedioInfo.totalPlayTime|totalPlayTimeFilter}}</span></div>
        <div class="means-des">
          <h3>{{item.title}}</h3>
          <div class="means-tags" v-if="item.componentType!=24&&item.tagList&&item.tagList.length!=0">
            <span v-for="titem in item.tagList">{{titem.tagName}}</span>
          </div>
          <div class="means-tags" v-else>{{item.vedioInfo.playNum|playNumFilter}}次播放</div>
        </div>
      </div>
    </template>
    <!-- 杂梦纷繁 -->
    <template v-if="targetId==4">
      <p class="health-des">
        如果繁杂的梦境让您觉得疲累不堪、精力不济，欢迎加入鹿博士提供的
        <span class="imp-des">改善多梦</span>的行动方案。坚持一段时间，也许能显著改善您的
        <span class="imp-des">多梦</span>问题。当然，如果您的情况十分严重，还是应该去看医生
      </p>
      <div class="health-contain">
        <div class="health-part food-part">1</div>
        <div class="health-all ">软球腹部锻炼</div>
      </div>
      <p class="pure-desc">研究发现，迷走神经中大约90%的纤维会将信息从腹部带到大脑，因此，适当按摩腹壁，能激活迷走神经（副交感神经），进而改善睡眠</p>
      <div class="help-two"><div>
        <div class="help-img qiu past-top" style="margin-top:0.4rem;"></div></div><div>
        <div class="mean-flex">
          <div class="food-name-two ">买一个有点弹性的球，足球大小就可以</div>
          <div class="food-name-two ">球里充气不要太足</div>
          <div class="food-name-two ">直接前后滚动，不舒服是就停下来，调整呼吸，花5~10分钟“解开”腹部肌肉组织</div>
        </div></div>
      </div>
      <div class="health-contain">
        <div class="health-part food-part">2</div>
        <div class="health-all ">神奇的“维生素G”助你一夜好眠</div>
      </div>
      <div class="pure-desc ">
        <span class="imp-des">维生素G（Ground）：</span>光脚踩地10分钟</div>
      <div class="pure-desc ">
        <span class="imp-des">场地：</span>土壤、草地、沙滩、水泥、砖块、鹅卵石</div>
      <div class="pure-desc box-flex">
        <div class="imp-des imp-width">功效：</div>
        <div>赤脚接触地面有助调节自主神经，降低夜间皮质醇水平，改善睡眠</div>
      </div>
      <div class="help-two"><div>
        <div class="help-img jiaoyin help-top" style="margin-top:0.9rem;"></div></div><div>
        <div class="mean-flex pure-bottom past-top">
          <div class="past past-width ">维生素G踩石法</div>
          <div class="food-name-two ">选择公园、操场、住宅周围等铺设鹅卵石的地方</div>
          <div class="food-name-two ">赤脚在凹凸不平的鹅卵石上来回有节奏地踩踏走动</div>
          <div class="food-name-two ">每天踏石1至2次，每次15至20分钟左右</div>
          <div class="past advice-border-top">小贴士</div>
          <div class="pure-desc">踩踏鹅卵石时应避免皮肤直接接触鹅卵石，需穿上袜子踩踏</div>
        </div></div>
      </div>
      <div class="health-contain">
        <div class="health-part food-part">3</div>
        <div class="health-all ">睡前热水泡脚</div>
      </div>
      <p class="good-des">泡脚能刺激温通足部穴位、引血下行、舒筋活络，是改善睡眠、消除疲劳的好方法</p>
      <div class="help-two"><div>
        <div class="help-img paojiao past-top" style="margin-top:1rem;"></div></div><div>
        <div class="mean-flex pure-bottom">
          <div class="food-name-two ">水温：40~42℃ </div>
          <div class="food-name-two ">时长：不超过半小时 </div>
          <div class="food-name-two ">器具：木桶最好</div>
          <div class="past advice-border-top">小贴士</div>
          <div class="pure-desc">糖料病足患者、静脉曲张患者、足癣等皮肤病患者、儿童孕妇等人群泡脚需谨慎。
            <p>泡脚后按压涌泉穴（位于足底前部凹陷处，第2、3趾趾缝头端与足跟连线的1/3处）几分钟，可以更好地促进足底血液循环，改善睡眠</p>
          </div>
        </div></div>
      </div>
      <div class="health-contain">
        <div class="health-part food-part">4</div>
        <div class="health-all ">睡前宜与忌</div>
      </div>
      <div class="help-two" style="padding: 0.2rem 0;">
        <div>
          <div class="help-img"><img src="./images/zt/ic_howtorun_can_normal@2x.png" style="width:100%;"></div></div><div>
          <div class="means-des">
            <div>宜听舒缓的音乐/故事/美文等</div>
            <div class="advice-border-top">宜调呼吸</div>
            <div class="advice-border-top">宜做一组舒缓放松瑜伽或太极</div>
          </div>
        </div>
      </div>
      <div class="help-two" style="padding: 0.2rem 0;">
        <div>
          <div class="help-img"><img src="./images/zt/ic_howtorun_cannot_normal@2x.png" style="width:100%;"></div></div><div>
          <div class="means-des">
            <div>忌睡前兴奋或情绪激动</div>
            <div class="advice-border-top">忌思考问题，带着压力入睡</div>
            <div class="advice-border-top">忌睡前2小时吃刺激的或难消化的食物</div>
          </div>
        </div>
      </div>
    </template>
    <!-- 睡足仍困倦 -->
    <template v-if="targetId==5">
      <p class="health-des">
        <span class="imp-des">睡饱仍困倦</span>的您，千万不要陷入越睡越累的不良循环，可以加入鹿博士提供的
        <span class="imp-des">改善睡足仍困倦</span>的行动方案。坚持一段时间，也许能显著改善您的
        <span class="imp-des">睡足仍困倦</span>问题。当然，如果您的情况十分严重，还是应该去看医生
      </p>
      <div class="health-contain">
        <div class="health-part food-part">1</div>
        <div class="health-all ">晨起运动30分钟</div>
      </div>
      <p class="good-des">汗液是体内代谢产物以及某些化学毒素的排出的重要途径之一，运动形式不限，挑你喜欢，能坚持的</p>
      <div class="advice-border-two "><div>
        <div class="help-img run2" style="margin-top:0.2rem;"></div></div><div>
        <div>
          <div class="past past-width-two">运动标准：</div>
          <div class="food-name-two ">运动心率在120~150次/分</div>
          <div class="food-name-two ">全身出汗但不大汗淋漓</div>
          <div class="food-name-two ">运动后不头晕乏力</div>
        </div></div>
      </div>
      <div class="health-contain">
        <div class="health-part food-part">2</div>
        <div class="health-all ">神奇的“维生素G”助你一夜好眠</div>
      </div>
      <div class="pure-desc ">
        <span class="imp-des">维生素G（Ground）：</span>光脚踩地10分钟</div>
      <div class="pure-desc ">
        <span class="imp-des">场地：</span>土壤、草地、沙滩、水泥、砖块、鹅卵石</div>
      <div class="pure-desc box-flex">
        <div class="imp-des imp-width">功效：</div>
        <div>赤脚接触地面有助调节自主神经，降低夜间皮质醇水平，改善睡眠</div>
      </div>
      <div class="help-two"><div>
        <div class="help-img jiaoyin help-top" style="margin-top:0.9rem;"></div></div><div>
        <div class="mean-flex pure-bottom past-top">
          <div class="past past-width ">维生素G踩石法</div>
          <div class="food-name-two ">选择公园、操场、住宅周围等铺设鹅卵石的地方</div>
          <div class="food-name-two ">赤脚在凹凸不平的鹅卵石上来回有节奏地踩踏走动</div>
          <div class="food-name-two ">每天踏石1至2次，每次15至20分钟左右</div>
          <div class="past advice-border-top">小贴士</div>
          <div class="pure-desc">踩踏鹅卵石时应避免皮肤直接接触鹅卵石，需穿上袜子踩踏</div>
        </div></div>
      </div>
      <div class="health-contain">
        <div class="health-part food-part">4</div>
        <div class="health-all ">掌握这些技能能让你睡得更好（文章资讯）</div>
      </div>
      <div class="means-contain" @click="goComponent(item)" v-for="item in contentList" v-if="item.display">
        <div class="means" :style="{'background-image':'url('+item.mediumHomeIcons[0]+')'}"><span v-if="item.componentType==24">{{item.vedioInfo.totalPlayTime|totalPlayTimeFilter}}</span></div>
        <div class="means-des">
          <h3>{{item.title}}</h3>
          <div class="means-tags" v-if="item.componentType!=24&&item.tagList&&item.tagList.length!=0">
            <span v-for="titem in item.tagList">{{titem.tagName}}</span>
          </div>
          <div class="means-tags" v-else>{{item.vedioInfo.playNum|playNumFilter}}次播放</div>
        </div>
      </div>
    </template>
    <!-- 辗转难眠 -->
    <template v-if="targetId==2">
      <p class="health-des">
        如果数到一万头羊还睡不着，赶紧加入鹿博士改善
        <span class="imp-des">入睡困难</span>的行动方案吧。坚持一段时间，相信会有一定的改善。当然，如果您的失眠情况十分严重，还是应该去看医生
      </p>
      <div class="health-contain">
        <div class="health-part food-part">4</div>
        <div class="health-all ">睡眠铁律的可以与不可以</div>
      </div>
      <div class="advice-border-two "><div>
        <div class="help-img" style="margin-top:0.3rem;"><img src="./images/zt/ic_howtorun_can_normal@2x.png" style="width:100%;"></div></div><div>
        <div class="means-des and-two">
          <div>早上多晒晒太阳</div>
          <div class="advice-border-top">只有在瞌睡时，才能上床睡觉</div>
          <div class="advice-border-top">上床20分钟睡不着，就下床</div>
          <div class="advice-border-top line-spc">睡前30分钟，一起来听书吧</div>
        </div></div>
      </div>
      <div class="advice-border-two "><div>
        <div class="help-img" style="margin-top:0.3rem;"><img src="./images/zt/ic_howtorun_cannot_normal@2x.png" style="width:100%;"></div></div><div>
        <div class="means-des and-two">
          <div>不许上床，除了睡觉和爱爱</div>
          <div class="advice-border-top">不许赖床，闹钟叫醒就起来</div>
          <div class="advice-border-top">不许打盹，白天再困也别睡</div>
          <div class="advice-border-top">不要在床上看书和玩电子产品</div>
        </div></div>
      </div>
      <div class="health-contain">
        <div class="health-part food-part">2</div>
        <div class="health-all ">为了改善睡眠正确的方法是在晚餐后进行适量低强度的放松运动，避免流汗的剧烈锻炼，如</div>
      </div>
      <div class="advice-border ">
        <div class="pure-sport">
          <div>
            <div class="pure-img run2"></div>
            <div class="sport-tit ">慢跑</div>
          </div>
          <div>
            <div class="pure-img swimming2"></div>
            <div class="sport-tit">慢速游泳</div>
          </div>
          <div>
            <div class="pure-img ymq2"></div>
            <div class="sport-tit">羽毛球</div>
          </div>
        </div>
        <div class="pure-sport">
          <div>
            <div class="pure-img dance2"></div>
            <div class="sport-tit ">现代舞</div>
          </div>
          <div>
            <div class="pure-img yoga2"></div>
            <div class="sport-tit">瑜伽</div>
          </div>
          <div>
            <div class="pure-img taiji2"></div>
            <div class="sport-tit">太极</div>
          </div>
        </div>
        <div class="pure-sport">
          <div>
            <div class="pure-img bike2"></div>
            <div class="sport-tit ">骑车</div>
          </div>
          <div>
            <div class="pure-img tjz"><img src="./images/zt/ic_howtorun_jianzi_normal@2x.png"></div>
            <div class="sport-tit">踢毽子</div>
          </div>
          <div>
            <div class="pure-img "><img src="./images/zt/ic_howtorun_walking_normal@2x.png"></div>
            <div class="sport-tit">快走</div>
          </div>
        </div>
        <div class="pure-sport-left">
          <div class="past past-width">低强度判断标准：</div>
          <div class="food-name-two ">运动心率约在80~100次/分</div>
          <div class="food-name-two ">微微出汗但不大汗淋漓</div>
          <div class="food-name-two ">运动后不头晕乏力</div>
          <div class="pure-desc">低强度运动能促进大脑分泌出抑制兴奋的物质，改善睡眠，缓解疲劳</div>
        </div>
      </div>
      <div class="health-contain">
        <div class="health-part food-part">3</div>
        <div class="health-all ">掌握这些技能能让你睡得更好（文章资讯）</div>
      </div v-if="item.tagList&&item.tagList.length!=0">
      <div class="means-contain" @click="goComponent(item)" v-for="item in contentList" v-if="item.display">
        <div class="means" :style="{'background-image':'url('+item.mediumHomeIcons[0]+')'}"><span v-if="item.componentType==24">{{item.vedioInfo.totalPlayTime|totalPlayTimeFilter}}</span></div>
        <div class="means-des">
          <h3>{{item.title}}</h3>
          <div class="means-tags" v-if="item.componentType!=24&&item.tagList&&item.tagList.length!=0">
            <span v-for="titem in item.tagList">{{titem.tagName}}</span>
          </div>
          <div class="means-tags" v-else>{{item.vedioInfo.playNum|playNumFilter}}次播放</div>
        </div>
      </div>
    </template>
    <!-- 切换方案弹窗 -->
    <div class="alert" v-if="false">
      <div class="jiao"></div>
      <div class="alert-top">
        <div class="alert-part" @click="showPage(0)">减脂的解决方案
          <div class="sure-choose" v-show="showRight==0"></div>
        </div>
        <div class="alert-part" @click="showPage(1)">辗转难眠的解决方案
          <div class="sure-choose" v-show="showRight==1"></div>
        </div>
      </div>
    </div>
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
      showRight: 0,
      contentList: [],
      videoList: [],
      targetId: client.getQueryString("target"),
      isDevice: client.getQueryString("device"),
      userInfo: ""
    };
  },
  components: {},
  created() {
    let fsAgent = navigator.userAgent.toLowerCase();
    if (/fstop/.test(fsAgent) || client.getQueryString("device")) {
      this.isDevice = true;
    }
  },
  filters: {
    playNumFilter(num) {
      if (num < 1000) {
        return num;
      } else if (num >= 1000 && num < 9999) {
        return (num / 1000).toFixed(1) + "K";
      } else {
        return (num / 10000).toFixed(1) + "万";
      }
    },
    totalPlayTimeFilter(num) {
      if (num < 60) {
        return "00:" + client.intNum(num);
      } else if (num > 60 && num < 60 * 60) {
        let miniutes = client.intNum(parseInt(num / 60));
        return miniutes + ":" + client.intNum(num - miniutes * 60);
      } else {
        let hours = client.intNum(parseInt(num / 3600));
        let miniutes = client.intNum((num - hours * 3600) / 60);
        return (
          hours +
          ":" +
          miniutes +
          ":" +
          client.intNum(num - hours * 3600 - miniutes * 60)
        );
      }
    }
  },
  methods: {
    showPage(item) {
      this.showRight = item;
    },
    //根据枕头解决方案获取加速器商品列表
    getZTType() {
      // <!-- 困扰 1-睡得很好;2-辗转难眠;3-凌晨醒;4-杂梦纷呈;5-睡足仍困倦;6-更年期睡不好;7-老人睡得少;8-家有小夜猫;9-快速倒时差 -->
      if (this.targetId == 2) {
        this.getList(733, 1);
      }
      if (this.targetId == 5) {
        this.getList(732, 1);
      }
      if (this.targetId == 9) {
        this.getList(730, 1);
      }
      if (this.targetId == 7) {
        this.getList(728, 1);
      }
      if (this.targetId == 6) {
        this.getList(734, 1);
      }
    },
    goComponent(item) {
      if (client.inFstop) {
        Bridge.handlerHtmlMessage({
          type: 9,
          data: { component: item }
        });
      } else {
        setTimeout(() => {
          if (item.componentType == 15 || item.componentType == 13) {
            //良店或良品
            location.href =
              apiConfig.JUMP_LINK +
              "views/home/single.html?componentId=" +
              item.componentId;
          } else if (item.componentType == 24) {
            //视频详情
            location.href =
              apiConfig.JUMP_LINK +
              "views/video/detail.html?componentId=" +
              item.componentId;
          } else {
            //其他文章详情
            location.href =
              apiConfig.JUMP_LINK +
              "views/home/detail.html?componentId=" +
              item.componentId;
          }
        }, 100);
      }
    },
    getList(fenceId, type) {
      //控制热量
      const recommondData = {
        currentPage: 1,
        fenceId: fenceId,
        pageSize: 5
      };
      client
        .postData(apiConfig.API_RECOMMOND, recommondData, {
          deviceId: window.userinfo.deviceId
        })
        .then(
          data => {
            if (data.code != 200) {
              return;
            }
            let infos = data.data;
            infos.forEach((item, index) => {
              if (index < 5) {
                item.display = true;
              }
            });
            if (type == 1) {
              this.contentList = infos;
            }
            if (type == 2) {
              this.videoList = infos;
            }
          },
          data => {}
        );
    }
  },
  mounted() {
    setTimeout(() => {
      if (this.targetId) {
        if (this.isDevice) {
          Bridge.handlerHtmlMessage({ type: 4, data: {} }, dataUser => {
            window.userinfo = dataUser.data;
            this.getZTType();
          });
        } else {
          this.getZTType();
        }
      }
    }, 500);
  }
};
</script>
<style lang="less">
@import "../../../common/css/common.less";

.line-spc {
  width: 1.85rem;
  border-bottom: 0.01rem solid #333333;
}

.alert-border {
  width: 88%;
  background: #ffffff;
  border-radius: 4px;
  text-align: center;
  padding-bottom: 0.05rem;
}

.alert-tit {
  font-size: 0.16rem;
  color: #333333;
  padding-top: 0.25rem;
}

.alert-img {
  position: relative;
  margin: auto;
  width: 1rem;
  height: 1rem;
  margin-top: 0.15rem;
  background: url(images/zt/bg_shipu_photo_doujiang@2x.png) center center
    no-repeat;
}

.alert-desc {
  width: 84%;
  margin: 0.15rem 8% 0.25rem;
  font-size: 0.16rem;
  color: #333333;
  text-align: left;
}

.alert-btn {
  background: #04c5b4;
  border-radius: 0.02rem;
  width: 90%;
  height: 0.44rem;
  margin: 0 5% 0.15rem;
  font-size: 0.16rem;
  color: #ffffff;
  line-height: 0.44rem;
}

.alert-top {
  width: 90%;
  margin: 0.72rem 5%;
  background: #ffffff;
  border-radius: 4px;
  font-size: 0.18rem;
  color: #595959;
}

.alert-part {
  height: 0.66rem;
  line-height: 0.66rem;
  padding-left: 0.25rem;
}

.alert-part:nth-child(1) {
  border-bottom: 0.01rem solid #e6e6e6;
}

.jiao {
  height: 0;
  width: 0;
  border-left: 0.1rem solid transparent;
  border-right: 0.1rem solid transparent;
  border-bottom: 0.1rem solid #fff;
  position: absolute;
  left: 48%;
  top: 0.62rem;
}

.box-top {
  display: -webkit-box;
}

.imp-width {
  width: 0.7rem;
}

.toggle-img {
  position: absolute;
  right: 0.15rem;
  width: 0.3rem;
  height: 0.3rem;
}

.top-two {
  background: url(images/ic_howtorun_normal.png);
  background-size: cover;
}

.health-contain {
  margin-top: 0.25rem;
  display: -webkit-box;
}

.health-all {
  font-size: 0.15rem;
  color: #333333;
  margin-left: 0.05rem;
  margin-right: 0.2rem;
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
}

.food-part {
  background: #04c5b4;
}

.food-name-tit {
  font-size: 0.15rem;
  color: #333333;
  padding-left: 0.2rem;
  margin-right: 0.1rem;
  line-height: 0.2rem;
  margin-top: 0.05rem;
}

.food-name-tit::before {
  width: 0.18rem;
  margin-left: -0.18rem;
  display: inline-block;
  content: "\2022";
  font-size: 0.2rem;
  color: #04c5b4;
}

.food-name-two {
  font-size: 0.15rem;
  color: #333333;
  margin-top: 0.05rem;
  padding-left: 0.12rem;
  margin-right: 0.1rem;
  line-height: 0.2rem;
}

.food-name-two:nth-child(1) {
  margin-top: 0.2rem;
}

.food-name-two:last-child {
  margin-bottom: 0.2rem;
}

.food-name-two::before {
  width: 0.12rem;
  margin-left: -0.12rem;
  display: inline-block;
  content: "\2022";
  font-size: 0.2rem;
  color: #04c5b4;
}

.advice-border-two {
  border: 0.01rem solid #e6e6e6;
  border-radius: 0.05rem;
  margin-top: 0.05rem;
  overflow: hidden;
  & > div:nth-child(1) {
    width: 30%;
    float: left;
  }
  & > div:nth-child(2) {
    float: left;
    width: 70%;
  }
}

.youga-des {
  margin-top: 0.2rem;
  font-size: 0.15rem;
  color: #333333;
  margin-bottom: 0.2rem;
  margin-right: 0.1rem;
}

.big-arrow {
  float: right;
  font-size: 0.2rem;
  line-height: 0.1rem;
  margin-right: 0.1rem;
}

.means {
  width: 1.12rem;
  height: 0.75rem;
  background-size: cover;
  margin-bottom: 0.1rem;
  position: relative;
  span {
    display: inline-block;
    position: absolute;
    height: 0.26rem;
    left: 0.06rem;
    bottom: 0.06rem;
    line-height: 0.24rem;
    padding: 0 0.1rem;
    background: rgba(0,0,0,0.6);
    color: #FFF;
    font-size: 0.14rem;
    border-radius: 0.13rem;
  }
}

.means-des {
  position: relative;
  flex: 1;
  font-size: 0.15rem;
  color: #333333;
  width: 2.1rem;
  padding-left: 0.1rem;
  h3 {
    display: block;
    height: 0.6rem;
    line-height: 0.2rem;
    overflow: hidden;
    font-size: 0.15rem;
    color: #333;
  }
  .means-tags {
    position: absolute;
    bottom: 0.08rem;
    left: 0.1rem;
    font-size: 0.12rem;
    color: #9b9b9b;
    span {
      display: inline-block;
      padding: 0.02rem 0.03rem;
      margin-right: 0.05rem;
      background: #f3f3f3;
      font-size: 0.1rem;
      color: #999;
    }
  }
}

.means-contain {
  display: -webkit-box;
  margin-top: 0.17rem;
  border-bottom: 0.01rem solid #e6e6e6;
}

.health-over {
  margin-top: 0.2rem;
  overflow: hidden;
  & > div:nth-child(1) {
    width: 30%;
    float: left;
  }
  & > div:nth-child(2) {
    float: left;
    width: 70%;
  }
}

.health-over:last-child {
  margin-bottom: 0.2rem;
}

.help-img {
  width: 0.9rem;
  height: 0.9rem;
  margin-left: 0.05rem;
}

.help-des {
  flex: 1;
  font-size: 0.15rem;
  color: #333333;
  margin-right: 0.1rem;
}

.help-two {
  border: 0.01rem solid #e6e6e6;
  border-radius: 0.05rem;
  margin-right: 0.1rem;
  margin-top: 0.05rem;
  overflow: hidden;
  & > div:nth-child(1) {
    width: 30%;
    float: left;
  }
  & > div:nth-child(2) {
    float: left;
    width: 70%;
  }
}

.past {
  width: 0.6rem;
  height: 0.2rem;
  color: #ffffff;
  background: #04c5b4;
  border-radius: 0.1rem;
  font-size: 0.12rem;
  text-align: center;
  line-height: 0.2rem;
}

.advice-border {
  border: 0.01rem solid #e6e6e6;
  border-radius: 0.05rem;
  margin-top: 0.05rem;
}

.help-grey {
  color: #999999;
  margin-left: 0.1rem;
}

.pure-img {
  width: 0.9rem;
  height: 0.9rem;
  background-size: cover;
  img {
    width: 100%;
  }
}

.pure-sport {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-left: 0.075rem;
  margin-right: 0.075rem;
}

.advice-center {
  display: flex;
  flex-direction: row;
  align-items: center;
}

.past-width {
  width: 1.18rem;
}

.pure-sport-left {
  margin: 0.2rem 0.175rem;
}

.pure-desc {
  font-size: 0.15rem;
  text-align: left;
  margin-top: 0.05rem;
}

.youga-more {
  margin-top: 0.2rem;
  margin-bottom: 0.2rem;
  font-size: 0.15rem;
  margin-right: 0.1rem;
}

.sure-choose {
  width: 0.2rem;
  height: 0.2rem;
  background: url(images/zt/ic_change_choice@2x.png);
  background-size: cover;
  float: right;
  margin-top: 0.21rem;
  margin-right: 0.25rem;
}

.and-one {
  margin-top: 0.1rem;
  margin-bottom: 0.1rem;
}

.and-two {
  margin-top: 0.2rem;
  margin-bottom: 0.2rem;
}
.past-width-two {
  width: 0.8rem;
  margin-top: 0.2rem;
}

.mean-flex {
  flex: 1;
}

.sport-tit {
  font-size: 0.15rem;
  text-align: center;
}

.box-flex {
  display: flex;
  flex-direction: row;
}

.past-top {
  margin-top: 0.2rem;
}

.pure-bottom {
  margin-bottom: 0.2rem;
}

.advice-border-top {
  margin-top: 0.1rem;
}

.min-past {
  margin-top: 0.05rem;
}

.help-top {
  margin-top: 0.4rem;
}

.nieji1 {
  background: url(images/zt/ic_howtorun_nieji_one_normal@2x.png);
  background-size: cover;
}

.nieji2 {
  background: url(images/zt/ic_howtorun_nieji_two_normal@2x.png);
  background-size: cover;
}

.nieji3 {
  background: url(images/zt/ic_howtorun_nieji_three_normal@2x.png);
  background-size: cover;
}

.duzi {
  background: url(images/zt/ic_howtorun_duzi_normal@2x.png);
  background-size: cover;
}

.moon {
  background: url(images/zt/ic_howtorun_moon_normal@2x.png);
  background-size: cover;
}

.sun {
  background: url(images/zt/ic_howtorun_sun_normal.png);
  background-size: cover;
}

.paojiao {
  background: url(images/zt/ic_howtorun_paojiao_normal.png);
  background-size: cover;
}

.xuewei {
  background: url(images/zt/ic_howtorun_xuewei_normal.png);
  background-size: cover;
}

.taiji2 {
  background: url(images/ic_howtorun_taiji_normal@2x.png);
  background-size: cover;
}

.run2 {
  background: url(images/ic_howtorun_run_normal.png);
  background-size: cover;
}

.ymq2 {
  background: url(images/ic_howtorun_badminton_normal.png);
  background-size: cover;
}

.bike2 {
  background: url(images/ic_howtorun_bike_normal@2x.png);
  background-size: cover;
}

.dance2 {
  background: url(images/ic_howtorun_dance_normal@2x.png);
  background-size: cover;
}

.gangling2 {
  background: url(images/ic_howtorun_gangling_normal@2x.png);
  background-size: cover;
}

.swimming2 {
  background: url(images/ic_howtorun_swimming_normal.png);
  background-size: cover;
}

.yaling2 {
  background: url(images/ic_howtorun_yaling_normal@2x.png);
  background-size: cover;
}

.yoga2 {
  background: url(images/ic_howtorun_yoga_normal@2x.png);
  background-size: cover;
}

.jiaoyin {
  background: url(images/zt/ic_howtorun_jiaoyin_normal@2x.png);
  background-size: cover;
}

.shicha {
  background: url(images/zt/ic_howtorun_shicha_normal.png);
  background-size: cover;
}

.jinshi {
  background: url(images/zt/ic_howtorun_jinshi_normal@2x.png);
  background-size: cover;
}

.qiu {
  background: url(images/zt/ic_howtorun_qiu_normal@2x.png);
  background-size: cover;
}
</style>