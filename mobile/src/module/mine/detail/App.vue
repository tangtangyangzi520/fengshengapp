<template>
  <div>
    <!-- 
      uTarget=4 903091956140351667
      uTarget=1 902706374868344939
     -->
    <div class="loading-page" v-if="!bodyBase&&!loadError"></div>
    <div class="loaderror-page" v-if="!bodyBase&&loadError">{{loadError.msg}}</div>
    <div class="content-preload" :class="{show:bodyBase}">
      <!-- 爱分享 -->
      <card :title="''"></card>
      <div class="share-bannar" v-if="!isDevice"></div>
      <div class="gradient" v-if="isDevice"></div>
      <div class="mine-detail">
        <!--该怎么吃-->
        <div class="mine-box eat slideInRight animated">
          <div class="tit-touch" @click="toggle(eatData,1)">
            <i class="tit-icon"></i>
            <p class="tit">饮食方案</p>
            <p class="sub-tit" v-if="isYoung">每天均衡膳食建议</p>
            <p class="sub-tit" v-else-if="uTarget==1">建议摄入
              <span>{{bodyBase[0].sCal}}kcal</span>怎么吃才健康扛饿？</p>
            <p class="sub-tit" v-else-if="uTarget==2">每天摄入
              <span>{{bodyBase[0].sCal}}Kcal</span>怎么吃可增强肌肉？</p>
            <p class="sub-tit" v-else-if="uTarget==3">每天摄入
              <span>{{bodyBase[0].sCal}}kcal</span>怎么吃可有效塑形？</p>
            <p class="sub-tit" v-else-if="uTarget==4">每天摄入
              <span>{{bodyBase[0].sCal}}kcal</span>怎么吃才健康扛饿？</p>
            <!-- 困扰 1-睡得很好;2-辗转难眠;3-凌晨醒;4-杂梦纷呈;5-睡足仍困倦;6-更年期睡不好;7-老人睡得少;8-家有小夜猫;9-快速倒时差 -->
            <p class="sub-tit" v-if="targetType=='sleep'&&targetId==6">我该怎么吃，才能解决更年期睡不好？</p>
            <p class="sub-tit" v-if="targetType=='sleep'&&targetId==8">我该怎么吃，才能解决家有小夜猫？</p>
            <p class="sub-tit" v-if="targetType=='sleep'&&targetId==7">我该怎么吃，才能解决老人睡得少？</p>
            <p class="sub-tit" v-if="targetType=='sleep'&&targetId==3">我该怎么吃，才能解决凌晨醒？</p>
            <p class="sub-tit" v-if="targetType=='sleep'&&targetId==9">我该怎么吃，才能快速倒时差？</p>
            <p class="sub-tit" v-if="targetType=='sleep'&&targetId==4">我该怎么吃，才能解决杂梦纷呈？</p>
            <p class="sub-tit" v-if="targetType=='sleep'&&targetId==5">我该怎么吃，才能解决睡足仍困？</p>
            <p class="sub-tit" v-if="targetType=='sleep'&&targetId==2">我该怎么吃，才能解决辗转难眠？</p>
          </div>
          <div class="show-box" v-show="eatData.show">
            <template v-if="!targetType">
            <!--假如是成年人 成年人公用区块-->
            <section v-if="!isYoung">
              <ul class="list-text">
                <li>早午晚三餐摄入热量比约为3:4:3（单位:kcal）</li>
              </ul>
              <div class="percent-bar">
                <span>
                  <i></i>{{parseInt(bodyBase[0].sCal*3/10)}}</span>
                <span>
                  <i></i>{{parseInt(bodyBase[0].sCal*4/10)}}</span>
                <span>
                  <i></i>{{parseInt(bodyBase[0].sCal*3/10)}}</span>
              </div>
              <!--推荐食谱-->
              <div class="recommend food">
                 <ul class="list-text bottom-dis">
                  <li>推荐食谱</li>
                </ul>
                <ul class="recommend-list food">
                  <li @click="goFood(1)">
                    <span>饭食党</span>
                  </li>
                  <li @click="goFood(2)">
                    <span>面食党</span>
                  </li>
                </ul>
              </div>
            </section>
            <!--假如是成年人-->
            <section v-if="!isYoung">
              <!--减脂区块-->
              <section v-if="uTarget==1&&uTarget!=4">
                <ul class="list-text">
                  <li>保证每天摄入三种来源的蛋白质（男:65克以上；女:55克以上）（请参考以下搭配）</li>
                </ul>
                <div class="mix-box">
                  <h5>参考一</h5>
                  <div class="recipe">
                    <ul class="recipe-list">
                      <li>
                        <span class="one-milk"></span>
                        <span>牛奶
                          <b>500克</b>
                        </span>
                      </li>
                      <li>
                        <span class="one-fish"></span>
                        <span>鱼肉
                          <b>200克</b>
                        </span>
                      </li>
                      <li>
                        <span class="one-tofu"></span>
                        <span>豆腐
                          <b>200克</b>
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>

                <div class="mix-box">
                  <h5>参考二</h5>
                  <div class="recipe">
                    <ul class="recipe-list">
                      <li>
                        <span class="two-soy"></span>
                        <span>豆浆
                          <b>500克</b>
                        </span>
                      </li>
                      <li>
                        <span class="two-pork"></span>
                        <span>瘦肉
                          <b>200克</b>
                        </span>
                      </li>
                      <li>
                        <span class="two-egg"></span>
                        <span>鸡蛋
                          <b>1个</b>
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>

                <ul class="list-text">
                  <li>吃一些富含膳食纤维、升血糖速度慢的食物，如
                    <a>玉米</a>，
                    <a>红薯</a>等，保证血糖水平稳定、肠道通畅</li>
                  <li>丰富饮食，每天保证至少
                    <a>三种颜色蔬果蔬菜</a>摄入，蔬菜摄入量每天300~500克，水果摄入量每天200~350克，补充维生素</li>
                  <li>烹调方式最好以蒸、煮为主，少油、少盐、少糖</li>
                </ul>
              </section>
              <!--增肌/塑形区块-->
              <section v-if="uTarget!=1">
                <ul class="list-text">
                  <li>保证每天摄入三种以上优质蛋白，建议蛋白质摄入量每公斤体重1.5～2克（肝肾代谢障碍人士，具体蛋白质补充请咨询医生/健康管理师）</li>
                </ul>
                <div class="mix-box">
                  <h5>富含优质蛋白食物推荐表
                    <a>（数据为每100克的蛋白含量）</a>
                  </h5>
                  <div class="recipe muscle">
                    <ul class="recipe-list">
                      <li>
                        <span class="one-milk"></span>
                        <span>牛奶
                          <b>3克</b>
                        </span>
                      </li>
                      <li>
                        <span class="two-egg"></span>
                        <span>鸡蛋
                          <b>13.3克</b>
                        </span>
                      </li>
                      <li>
                        <span class="beef"></span>
                        <span>牛肉
                          <b>20.2克</b>
                        </span>
                      </li>
                    </ul>
                    <ul class="recipe-list">
                      <li>
                        <span class="chicken"></span>
                        <span>鸡肉
                          <b>19.3克</b>
                        </span>
                      </li>
                      <li>
                        <span class="two-pork"></span>
                        <span>猪肉
                          <b>20.3克</b>
                        </span>
                      </li>
                      <li>
                        <span class="mutton"></span>
                        <span>羊肉
                          <b>20.5克</b>
                        </span>
                      </li>
                    </ul>
                    <ul class="recipe-list">
                      <li>
                        <span class="one-fish"></span>
                        <span>鱼肉
                          <b>16克</b>
                        </span>
                      </li>
                      <li>
                        <span class="shrimp"></span>
                        <span>河虾
                          <b>16.4克</b>
                        </span>
                      </li>
                      <li>
                        <span class="one-tofu"></span>
                        <span>豆腐
                          <b>3.7克</b>
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>

                <ul class="list-text">
                  <li>除了蛋白质，剩下的热量缺口主要是以碳水化合物（
                    <a>主食，蔬果</a>）来补充，保证蔬菜摄入量每天300~500克，水果摄入量每天200~350克，特别是力量训练前补充升血糖速度快的食物，如
                    <a>馒头，香蕉</a>，可帮助提升糖原储备，获得更好的运动效果</li>
                  <li>在力量训练后立刻补充升血糖速度快的食物（
                    <a>如燕麦片</a>、
                    <a>白米饭</a>、
                    <a>白粥</a>、
                    <a>蜂蜜等</a>）+优质蛋白，可减少肌肉损失和帮助受损的肌肉纤维修复</li>
                  <li>日常饮食脂肪以补充不饱和脂肪酸为主，如
                    <a>鸡蛋黄</a>、
                    <a>坚果</a>、
                    <a>橄榄油</a>、
                    <a>山茶油</a>、
                    <a>深海鱼</a>等均富含优质不饱和脂肪酸</li>
                </ul>
              </section>

              <!-- 保持健康 -->
              <section v-if="uTarget==4">
                <ul class="list-text">
                  <li>为达到保持身体健康和维持正常的生理活动目的，每天的饮食要遵守下面5个原则</li>
                </ul>
                <ul class="list-text small">
                  <li>1. 每天至少摄入三种来源的蛋白质（男：65克以上；女：55克以上）（请参考以下搭配）</li>
                </ul>
                <div class="mix-box">
                  <h5>参考一</h5>
                  <div class="recipe">
                    <ul class="recipe-list">
                      <li>
                        <span class="one-milk"></span>
                        <span>牛奶
                          <b>500克</b>
                        </span>
                      </li>
                      <li>
                        <span class="one-fish"></span>
                        <span>鱼肉
                          <b>200克</b>
                        </span>
                      </li>
                      <li>
                        <span class="one-tofu"></span>
                        <span>豆腐
                          <b>200克</b>
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>

                <div class="mix-box">
                  <h5>参考二</h5>
                  <div class="recipe">
                    <ul class="recipe-list">
                      <li>
                        <span class="two-soy"></span>
                        <span>豆浆
                          <b>500克</b>
                        </span>
                      </li>
                      <li>
                        <span class="two-pork"></span>
                        <span>瘦肉
                          <b>200克</b>
                        </span>
                      </li>
                      <li>
                        <span class="two-egg"></span>
                        <span>鸡蛋
                          <b>1个</b>
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>

                <ul class="list-text small">
                  <li>2. 每天至少摄入三种以上蔬菜300-500克，蔬菜颜色多样化</li>
                  <li>3. 天天吃水果，保证每天摄入200g～350g新鲜水果，果汁不能代替鲜果</li>
                  <li>4. 升糖指数（GI值）低的食物搭配慢卡路里的食物</li>
                </ul>
                <ul class="list-text small bottom">
                  <li>升糖指数（GI值）低的食物如下</li>
                </ul>
                <div class="candy">
                  <ul class="rice">
                    <li>
                      <div class="one-rice wugu"></div>
                      <div class="one-desc">
                        <span class="desc-title">五谷薯类</span>：全谷物、糙米、燕麦、小米、红薯、芋头</div>
                    </li>
                    <li>
                      <div class="one-rice shucai"></div>
                      <div class="one-desc">
                        <span class="desc-title">蔬果</span>：芦荟、萝卜、豆芽菜、绿叶蔬菜、橙子、西柚、蓝莓、柠檬</div>
                    </li>
                    <li>
                      <div class="one-rice doulei"></div>
                      <div class="one-desc">
                        <span class="desc-title">豆类坚果</span>：黄豆、绿豆、眉豆、红腰果、开心果、杏仁、核桃</div>
                    </li>
                  </ul>
                </div>
                <ul class="list-text small bottom">
                  <li>慢卡路里的食物如下</li>
                </ul>
                <div class="candy">
                  <ul class="rice">
                    <li>
                      <div class="one-rice danbai"></div>
                      <div class="one-desc">
                        <span class="desc-title">富含优质蛋白</span> ：鸡蛋、鱼肉、牛奶、牛肉、鸡胸肉、豆制品</div>
                    </li>
                    <li>
                      <div class="one-rice zhifangsuan"></div>
                      <div class="one-desc">
                        <span class="desc-title">富含不饱和脂肪酸</span>： 三文鱼、沙丁鱼、带鱼、橄榄油、菜籽油、巴旦木等</div>
                    </li>
                  </ul>
                </div>
                <ul class="list-text small">
                  <li>5. 每日摄入坚果10克左右，常见坚果如板栗，核桃，腰果，开心果等</li>
                </ul>
              </section>

              <!---->
              <!--补钙-->
              <div id="calcium" v-if="eatData.calcium">
                <div class="to-do-box">
                  <h5>骨骼含量偏低的你，怎么吃才能补钙？</h5>
                </div>
                <ul class="list-text">
                  <!--减脂-->
                  <li v-if="uTarget==1">按照自己的身体情况适当多吃一些补充富含钙质的食物，如
                    <a>牛奶</a>、
                    <a>豆腐</a>、
                    <a>坚果</a>、
                    <a>豆类</a>等，特别是
                    <a>虾皮</a>
                  </li>
                  <li v-else>按照自己的身体情况适当多吃一些富含钙质的食物，如
                    <a>牛奶</a>、
                    <a>豆腐</a>、
                    <a>坚果</a>、
                    <a>豆类</a>、
                    <a>虾皮</a>等，同时补充富含镁的食品，如
                    <a>紫菜</a>，
                    <a>香蕉</a>等</li>
                  <li>保证每天到户外去活动一会儿进行适当的户外活动，接受一定量的阳光照射，能够帮我们使人体内的维生素 D 原自行转换为变成活性的维生素 D，促进钙的吸收</li>
                  <li>营养品方面，补充含有有机钙或螯合钙的产品，合适的钙磷比，更有助于钙质吸收。</li>
                </ul>
              </div>
            </section>
            <!--假如是青少年-->
            <section v-if="isYoung">
              <ul class="list-text">
                <li>每日至少三种蛋白质来源，如
                  <a>蛋</a>、
                  <a>肉</a>、
                  <a>奶</a>等</li>
                <li>补充不饱和脂肪酸，减少饱和脂肪酸的摄入</li>
                <li>每天膳食建议摄入量</li>
              </ul>
              <div class="mix-box">
                <div class="recipe">
                  <ul class="recipe-list young">
                    <li>
                      <span class="grain"></span>
                      <span>
                        <p>谷物类／薯类</p>
                        <b>250～400克</b>
                      </span>
                    </li>
                    <li>
                      <span class="vegetable"></span>
                      <span>
                        <p>五色蔬菜</p>
                        <b>300～500克</b>
                      </span>
                    </li>
                    <li>
                      <span class="fruit"></span>
                      <span>
                        <p>新鲜水果</p>
                        <b>200～350克</b>
                      </span>
                    </li>
                  </ul>
                </div>
              </div>

              <ul class="list-text">
                <li>少油盐少煎炸少精制糖。每天食盐摄入量不超过6g，每天烹调油25~30g</li>
                <li style="margin:0">每天饮水800~1400ml，不喝或少喝含糖饮料，禁止饮酒</li>
              </ul>
            </section>
            </template>
            <foods v-if="targetType=='sleep'"></foods>
          </div>
        </div>

        <!--该怎么运动-->
        <div class="mine-box sport slideInRight animated">
          <div class="tit-touch" @click="toggle(sportData,2)">
            <i class="tit-icon"></i>
            <p class="tit">行动方案</p>
            <p class="sub-tit" v-if="isYoung">每天如何运动提升体质？</p>
            <p class="sub-tit" v-else-if="uTarget==1">每天运动消耗
              <span>{{bodyBase[1].sCal}}kcal</span> 怎么重点瘦肚子？</p>
            <p class="sub-tit" v-else-if="uTarget==2">每天运动如何有效增肌？</p>
            <p class="sub-tit" v-else-if="uTarget==3">每天运动如何有效塑形？</p>
            <p class="sub-tit" v-else-if="uTarget==4">每天运动消耗
              <span>{{bodyBase[1].sCal}}kcal</span> 如何保持健康？</p>
            <p class="sub-tit" v-if="targetType=='sleep'&&targetId==6">我该怎么行动，才能解决更年期睡不好？</p>
            <p class="sub-tit" v-if="targetType=='sleep'&&targetId==8">我该怎么行动，才能解决家有小夜猫？</p>
            <p class="sub-tit" v-if="targetType=='sleep'&&targetId==7">我该怎么行动，才能解决老人睡得少？</p>
            <p class="sub-tit" v-if="targetType=='sleep'&&targetId==3">我该怎么行动，才能解决凌晨醒？</p>
            <p class="sub-tit" v-if="targetType=='sleep'&&targetId==9">我该怎么行动，才能快速倒时差？</p>
            <p class="sub-tit" v-if="targetType=='sleep'&&targetId==4">我该怎么行动，才能解决杂梦纷呈？</p>
            <p class="sub-tit" v-if="targetType=='sleep'&&targetId==5">我该怎么行动，才能解决睡足仍困？</p>
            <p class="sub-tit" v-if="targetType=='sleep'&&targetId==2">我该怎么行动，才能解决辗转难眠？</p>
          </div>
          <div class="show-box" v-show="sportData.show">
            <template v-if="!targetType">
            <!--假如是成年人-->
            <section v-if="!isYoung">
              <!--推荐计划-->
              <div class="recommend" v-if="uTarget==1">
                <h6>推荐力量训练计划</h6>
                <ul class="recommend-list sport">
                  <li class="reduce" v-if="uTarget==1" @click="goPlan('减脂运动计划','jzydWomen')">
                    <span>减脂运动计划</span>
                  </li>
                  <li class="flesh" v-if="uTarget==2" @click="goPlan('增肌运动计划','zjydMan')">
                    <span>增肌运动计划</span>
                  </li>
                  <li class="slim" v-if="uTarget==3" @click="goPlan('塑形运动计划','sxydWomen')">
                    <span>塑形运动计划</span>
                  </li>
                  <li class="baibai" v-if="sportData.goodBye" @click="goPlan('大肚腩拜拜计划','ddnWomen')">
                    <span>大肚腩拜拜计划</span>
                  </li>
                </ul>
              </div>
              <!--减脂-->
              <section v-if="uTarget==1">
                <ul class="list-text new-add">
                  <li>减脂运动训练说明：每周做2~3次，下面5个动作是一整套，每个动作每组要做8~12次，每个动作至少要做1组，顺序不限。推荐5个参考动作供：
                    <a>仰卧剪刀腿</a>+
                    <a>地板哑铃卧推</a>+
                    <a>悬腿卷腹</a>+
                    <a>仰卧后撑</a>+
                    <a>深蹲</a>
                  </li>
                </ul>
                <ul class="list-text">
                  <li>燃脂心率为 {{sportData.sport.heartMin}}~{{sportData.sport.heartMax}} 次/分钟</li>
                  <li>您需要通过运动减掉{{sportData.sport.sCal}} 千卡/天</li>
                  <li>每周3~5次有氧耐力运动（每次从下表中选一项）</li>
                </ul>
                <div id="sport-out" v-for="item in sportData.sport.detail">
                  <div class="sport-box" v-if="item.sportType==1">
                    <li class="running">
                    </li>
                    <li>
                      <div>
                        <span>{{item.sportName}}</span>
                        <span>（慢跑每小时6~8公里）</span>
                      </div>
                    </li>
                    <li>
                      <span>{{item.sportDuration}}</span>
                      <span>分钟</span>
                    </li>
                  </div>
                  <div class="sport-box" v-if="item.sportType==2">
                    <li class="swimming">
                    </li>
                    <li>
                      <div>
                        <span>{{item.sportName}}</span>
                        <span>（每分钟游50米）</span>
                      </div>
                    </li>
                    <li>
                      <div>
                        <span>{{item.sportDuration}}</span>
                        <span>分钟</span>
                      </div>
                    </li>
                  </div>
                  <div class="sport-box" v-if="item.sportType==3">
                    <li class="badminton">
                    </li>
                    <li>
                      <div>
                        <span>{{item.sportName}}</span>
                        <span>（群体，单打或双打）</span>
                      </div>
                    </li>
                    <li>
                      <span>{{item.sportDuration}}</span>
                      <span>分钟</span>
                    </li>
                  </div>
                  <div class="sport-box" v-if="item.sportType==4">
                    <li class="dance">
                    </li>
                    <li>
                      <div>
                        <span>{{item.sportName}}</span>
                        <span>（一般舞蹈，微微出汗）</span>
                      </div>
                    </li>
                    <li>
                      <span>{{item.sportDuration}}</span>
                      <span>分钟</span>
                    </li>
                  </div>
                  <div class="sport-box" v-if="item.sportType==5">
                    <li class="yoga">
                    </li>
                    <li>
                      <div>
                        <span>{{item.sportName}}</span>
                        <span>（强度不大，微微出汗）</span>
                      </div>
                    </li>
                    <li>
                      <span>{{item.sportDuration}}</span>
                      <span>分钟</span>
                    </li>
                  </div>
                  <div class="sport-box" v-if="item.sportType==6">
                    <li class="taiji">
                    </li>
                    <li>
                      <div>
                        <span>{{item.sportName}}</span>
                        <span>（强度不大，微微出汗）</span>
                      </div>
                    </li>
                    <li>
                      <span>{{item.sportDuration}}</span>
                      <span>分钟</span>
                    </li>
                  </div>
                </div>
              </section>
              <!--增肌/塑形-->
              <section v-if="uTarget!=1">
                <ul class="list-text new-add" v-if="uTarget==2">
                  <li>增肌运动训练说明：每周2~4次，每次4个动作，每个动作8~12次/组，每个动作至少做3组。推荐4个动作自由组合，供参考：
                    <a>宽跪俯卧撑</a>+
                    <a>反手俯身哑铃划船</a>+
                    <a>酒杯深蹲</a>+
                    <a>哑铃后撤箭步蹲</a>
                  </li>
                </ul>
                <ul class="list-text new-add" v-if="uTarget==3">
                  <li>塑形运动训练说明：每周2~4次，每次4个动作，每个动作8~12次/组，每个动作至少做3组。推荐4个动作自由组合，供参考：
                    <a>跪姿俯卧撑</a>+
                    <a>正手俯身哑铃划船</a>+
                    <a>静态臀桥</a>+
                    <a>哑铃后撤箭步蹲</a>
                  </li>
                </ul>
                <ul class="list-text">
                  <li>有效{{uTarget==2?'增肌':'塑形'}}心率为需达{{sportData.sport.heartMin}}次/分钟</li>
                  <li>每周适度进行肌肉力量训练、拉伸运动、有氧耐力运动</li>
                </ul>
              </section>

              <!-- 保持健康 -->
              <section v-if="uTarget==4">
                <ul class="list-text">
                  <li>根据美国运动医学学会建议，想维持正常体重，保持健康的你，每天需步行8000步以上，日推荐消耗热量≥200千卡，想走出健康，你可以这么做：</li>
                </ul>
                <ul class="list-text list-refer small">
                  <li>参考一</li>
                  <li>每天以中等速度（100步/分钟），累计行走30~60分钟，心率达到{{sportData.sport.heartMin}}（50%HRmax）</li>
                </ul>
                <ul class="list-text list-refer small">
                  <li>参考二</li>
                  <li>每天以较快速度（120步/分钟），累计行走20~60分钟，心率达到{{sportData.sport.heartMax}}（60%HRmax）</li>
                </ul>
                <!-- <ul class="list-text list-refer small">
                  <li>参考三</li>
                  <li>
                    <P>以上两种速度交替步行，累计达到30分钟</p>
                    <p>记得每次步行至少要持续10分钟，才能达到促进健康的效果喔~</p>
                  </li>
                </ul> -->
                <ul class="list-text">
                  <li>你以中等速度（100步/分钟）步行1000步，大约等于下面一项有氧运动进行X分钟，若今天步行数不够，不妨用有氧运动来凑喔~</li>
                </ul>
                <div id="sport-out">
                  <div class="sport-box">
                    <li class="running">
                    </li>
                    <li>
                      <div>
                        <span>慢跑</span>
                        <span>（慢跑每小时6~8公里）</span>
                      </div>
                    </li>
                    <li>
                      <span>{{sportData.sport.detail[0].sportDuration}}</span>
                      <span>分钟</span>
                    </li>
                  </div>
                  <div class="sport-box">
                    <li class="swimming">
                    </li>
                    <li>
                      <div>
                        <span>慢速游泳</span>
                        <span>（每分钟游50米）</span>
                      </div>
                    </li>
                    <li>
                      <div>
                        <span>{{sportData.sport.detail[1].sportDuration}}</span>
                        <span>分钟</span>
                      </div>
                    </li>
                  </div>
                  <div class="sport-box">
                    <li class="badminton">
                    </li>
                    <li>
                      <div>
                        <span>羽毛球</span>
                        <span>（群体，单打或双打）</span>
                      </div>
                    </li>
                    <li>
                      <span>{{sportData.sport.detail[2].sportDuration}}</span>
                      <span>分钟</span>
                    </li>
                  </div>
                  <div class="sport-box">
                    <li class="dance">
                    </li>
                    <li>
                      <div>
                        <span>现代舞</span>
                        <span>（一般舞蹈，微微出汗）</span>
                      </div>
                    </li>
                    <li>
                      <span>{{sportData.sport.detail[3].sportDuration}}</span>
                      <span>分钟</span>
                    </li>
                  </div>
                  <div class="sport-box">
                    <li class="yoga">
                    </li>
                    <li>
                      <div>
                        <span>瑜伽</span>
                        <span>（强度不大，微微出汗）</span>
                      </div>
                    </li>
                    <li>
                      <span>{{sportData.sport.detail[4].sportDuration}}</span>
                      <span>分钟</span>
                    </li>
                  </div>
                  <div class="sport-box">
                    <li class="taiji">
                    </li>
                    <li>
                      <div>
                        <span>太极</span>
                        <span>（强度不大，微微出汗）</span>
                      </div>
                    </li>
                    <li>
                      <span>{{sportData.sport.detail[5].sportDuration}}</span>
                      <span>分钟</span>
                    </li>
                  </div>
                  <div class="sport-box">
                    <li class="bike">
                    </li>
                    <li>
                      <div>
                        <span>骑车</span>
                        <span>（休闲，骑行上下班）</span>
                      </div>
                    </li>
                    <li>
                      <span>{{sportData.sport.detail[6].sportDuration}}</span>
                      <span>分钟</span>
                    </li>
                  </div>
                </div>
                <ul class="list-text">
                  <li>除了有氧运动，你也可以选择力量训练，包括各种持器械体操、抗阻力训练项目，如哑铃、拉力器、健身器，这些力量练习是延缓衰老、保持活力的重要手段</li>
                </ul>
                <div class="recommend " v-if="uTarget!==1">
                <ul class="list-text bottom-dis">
                  <li>推荐力量训练计划</li>
                </ul>
                  <ul class="recommend-list sport">
                    <li class="reduce"  @click="goPlan('减脂运动计划','jzydWomen')">
                      <span>减脂运动计划</span>
                    </li>
                    <li class="flesh" v-if="uTarget==2" @click="goPlan('增肌运动计划','zjydMan')">
                      <span>增肌运动计划</span>
                    </li>
                    <li class="slim" v-if="uTarget==3" @click="goPlan('塑形运动计划','sxydWomen')">
                      <span>塑形运动计划</span>
                    </li>
                    <li class="baibai" v-if="sportData.goodBye" @click="goPlan('大肚腩拜拜计划','ddnWomen')">
                      <span>大肚腩拜拜计划</span>
                    </li>
                  </ul>
                </div>
                <ul class="list-text becare" v-if="uTarget!==1">
                  <li>注意事项：</li>
                  <li>
                    1. 建议在运动前后进行5-10分钟的整理活动，如肢体拉伸、有氧运动，有利于提高身体协调性，帮助减少肌肉疲劳
                  </li>
                  <li>
                    2. 运动量由小到大，循序渐进，持之以恒，以汗出但不大汗淋漓，运动后不头晕发力为度
                  </li>
                </ul>
              </section>
            </section>
            <!--假如是青年-->
            <section v-if="isYoung">
              <ul class="list-text">
                <li>保证每周3~5次有氧运动（以下运动三选一）</li>
              </ul>
              <div id="sport-out">
                <div class="sport-box">
                  <li class="running">
                  </li>
                  <li>
                    <div>
                      <span>慢跑</span>
                      <span>（每小时跑6~8公里）</span>
                    </div>
                  </li>
                  <li>
                    <span>54</span>
                    <span>分钟</span>
                  </li>
                </div>
                <div class="sport-box">
                  <li class="swimming">
                  </li>
                  <li>
                    <div>
                      <span>慢速游泳</span>
                      <span>（每分钟游50米）</span>
                    </div>
                  </li>
                  <li>
                    <span>48</span>
                    <span>分钟</span>
                  </li>
                </div>
                <div class="sport-box">
                  <li class="badminton">
                  </li>
                  <li>
                    <div>
                      <span>羽毛球</span>
                      <span>（群体，单打或双打）</span>
                    </div>
                  </li>
                  <li>
                    <span>85</span>
                    <span>分钟</span>
                  </li>
                </div>
              </div>
              <ul class="list-text">
                <li>专业器械力量训练（以下项目二选一）</li>
              </ul>
              <div id="sport-out">
                <div class="sport-box">
                  <li class="barbell">
                  </li>
                  <li>
                    <span>杠铃</span>
                  </li>
                  <li>
                    <span>1~3</span>
                    <span>次</span>
                  </li>
                </div>
                <div class="sport-box">
                  <li class="dumbbell">
                  </li>
                  <li>
                    <span>哑铃</span>
                  </li>
                  <li>
                    <span>1~3</span>
                    <span>次</span>
                  </li>
                </div>
              </div>
              <ul class="list-text">
                <li style="margin:0">增加户外活动时间，有助于维生素D体内合成，还可有效减缓近视的发生和发展</li>
              </ul>
            </section>
            </template>
            <sport v-if="targetType=='sleep'"></sport>
          </div>
        </div>

        <!--健康加速器-->
        <div class="mine-box speeder slideInRight animated" v-if="!isYoung">
          <div class="tit-touch" @click="toggle(speederData,3)">
            <i class="tit-icon"></i>
            <p class="tit">健康加速器</p>
            <p class="sub-tit">让你更快达到目标的健康好物</p>
          </div>
          <div class="show-box" v-show="speederData.show">
            <template v-if="!targetType">
            <section v-if="uTarget==1">
              <!--控制热量-->
              <div class="goto-tap heat" @click="moreHeat(2062007,'控制热量')"></div>
              <div class="product-box heat">
                <ul class="product-list">
                  <li v-for="item in speederData.heat" v-if="item.display" @click="goLink(item)">
                    <span class="pic" :style="{background: 'url(\''+item.mediumHomeIcons+'\') no-repeat center'}"></span>
                    <span class="text-group">
                      <p>
                        <i :class="[item.componentType==13?'own guide':'own']">{{item.componentType==13?'导购':'自营'}}</i>{{item.title}}</p>
                      <p v-if="item.componentType!=13">
                        <b v-if="item.goodsInfo">
                          <big>¥{{item.goodsInfo.preferentialPrice}}</big>
                          <s>¥{{item.goodsInfo.oldPrice}}</s>
                        </b>
                        <a class="buy-btn" @click.stop="goBuy(item)">立即抢</a>
                      </p>
                    </span>
                  </li>
                </ul>
                <div class="refer-more">
                  <a @click="moreHeat(2062007,'控制热量')">查看更多</a>
                </div>
              </div>
              <!--燃脂瘦身-->
              <div class="goto-tap slim" @click="moreHeat(2062008,'燃脂瘦身')"></div>
              <div class="product-box slim">
                <ul class="product-list">
                  <li v-for="item in speederData.slim" v-if="item.display" @click="goLink(item)">
                    <span class="pic" :style="{background: 'url(\''+item.mediumHomeIcons+'\') no-repeat center'}"></span>
                    <span class="text-group">
                      <p>
                        <i :class="[item.componentType==13?'own guide':'own']">{{item.componentType==13?'导购':'自营'}}</i>{{item.title}}</p>
                      <p v-if="item.componentType!=13">
                        <b v-if="item.goodsInfo">
                          <big>¥{{item.goodsInfo.preferentialPrice}}</big>
                          <s>¥{{item.goodsInfo.oldPrice}}</s>
                        </b>
                        <a class="buy-btn" @click.stop="goBuy(item)">立即抢</a>
                      </p>
                    </span>
                  </li>
                </ul>
                <div class="refer-more">
                  <a @click="moreHeat(2062008,'燃脂瘦身')">查看更多</a>
                </div>
              </div>
              <!--排毒-->
              <div v-if="speederData.paidu" class="goto-tap paidu" @click="moreHeat(2062009,'清肠排毒')"></div>
              <div class="product-box paidu">
                <ul class="product-list">
                  <li v-for="item in speederData.paidu" v-if="item.display" @click="goLink(item)">
                    <span class="pic" :style="{background: 'url(\''+item.mediumHomeIcons+'\') no-repeat center'}"></span>
                    <span class="text-group">
                      <p>
                        <i :class="[item.componentType==13?'own guide':'own']">{{item.componentType==13?'导购':'自营'}}</i>{{item.title}}</p>
                      <p v-if="item.componentType!=13">
                        <b v-if="item.goodsInfo">
                          <big>¥{{item.goodsInfo.preferentialPrice}}</big>
                          <s>¥{{item.goodsInfo.oldPrice}}</s>
                        </b>
                        <a class="buy-btn" @click.stop="goBuy(item)">立即抢</a>
                      </p>
                    </span>
                  </li>
                </ul>
                <div v-if="speederData.paidu" class="refer-more">
                  <a @click="moreHeat(2062009,'清肠排毒')">查看更多</a>
                </div>
              </div>
              <!--纤体-->
              <div class="goto-tap qianti" @click="moreHeat(2062010,'纤体瘦身')"></div>
              <div class="product-box qianti">
                <ul class="product-list">
                  <li v-for="item in speederData.qianti" v-if="item.display" @click="goLink(item)">
                    <span class="pic" :style="{background: 'url(\''+item.mediumHomeIcons+'\') no-repeat center'}"></span>
                    <span class="text-group">
                      <p>
                        <i :class="[item.componentType==13?'own guide':'own']">{{item.componentType==13?'导购':'自营'}}</i>{{item.title}}</p>
                      <p v-if="item.componentType!=13">
                        <b v-if="item.goodsInfo">
                          <big>¥{{item.goodsInfo.preferentialPrice}}</big>
                          <s>¥{{item.goodsInfo.oldPrice}}</s>
                        </b>
                        <a class="buy-btn" @click.stop="goBuy(item)">立即抢</a>
                      </p>
                    </span>
                  </li>
                </ul>
                <div class="refer-more">
                  <a @click="moreHeat(2062010,'纤体瘦身')">查看更多</a>
                </div>
              </div>
            </section>
            <section v-if="uTarget==2||uTarget==3">
              <!--运动前-->
              <div class="goto-tap before-sport" @click="moreHeat(2062015,'运动前补充剂')"></div>
              <div class="product-box sport">
                <ul class="product-list">
                  <li v-for="item in speederData.beforeSport" v-if="item.display" @click="goLink(item)">
                    <span class="pic" :style="{background: 'url(\''+item.mediumHomeIcons+'\') no-repeat center'}"></span>
                    <span class="text-group">
                      <p>
                        <i :class="[item.componentType==13?'own guide':'own']">{{item.componentType==13?'导购':'自营'}}</i>{{item.title}}</p>
                      <p v-if="item.componentType!=13">
                        <b v-if="item.goodsInfo">
                          <big>¥{{item.goodsInfo.preferentialPrice}}</big>
                          <s>¥{{item.goodsInfo.oldPrice}}</s>
                        </b>
                        <a class="buy-btn" @click.stop="goBuy(item)">立即抢</a>
                      </p>
                    </span>
                  </li>
                </ul>
                <div class="refer-more">
                  <a @click="moreHeat(2062015,'运动前补充剂')">查看更多</a>
                </div>
              </div>
              <!--运动后-->
              <div class="goto-tap after-sport" @click="moreHeat(2062011,'运动后补充剂')"></div>
              <div class="product-box sport">
                <ul class="product-list">
                  <li v-for="item in speederData.afterSport" v-if="item.display" @click="goLink(item)">
                    <span class="pic" :style="{background: 'url(\''+item.mediumHomeIcons+'\') no-repeat center'}"></span>
                    <span class="text-group">
                      <p>
                        <i :class="[item.componentType==13?'own guide':'own']">{{item.componentType==13?'导购':'自营'}}</i>{{item.title}}</p>
                      <p v-if="item.componentType!=13">
                        <b v-if="item.goodsInfo">
                          <big>¥{{item.goodsInfo.preferentialPrice}}</big>
                          <s>¥{{item.goodsInfo.oldPrice}}</s>
                        </b>
                        <a class="buy-btn" @click.stop="goBuy(item)">立即抢</a>
                      </p>
                    </span>
                  </li>
                </ul>
                <div class="refer-more">
                  <a @click="moreHeat(2062011,'运动后补充剂')">查看更多</a>
                </div>
              </div>
              <!--增肌-->
              <div class="goto-tap zengji" @click="moreHeat(2062012,'增肌塑形')"></div>
              <div class="product-box sport">
                <ul class="product-list">
                  <li v-for="item in speederData.zengji" v-if="item.display" @click="goLink(item)">
                    <span class="pic" :style="{background: 'url(\''+item.mediumHomeIcons+'\') no-repeat center'}"></span>
                    <span class="text-group">
                      <p>
                        <i :class="[item.componentType==13?'own guide':'own']">{{item.componentType==13?'导购':'自营'}}</i>{{item.title}}</p>
                      <p v-if="item.componentType!=13">
                        <b v-if="item.goodsInfo">
                          <big>¥{{item.goodsInfo.preferentialPrice}}</big>
                          <s>¥{{item.goodsInfo.oldPrice}}</s>
                        </b>
                        <a class="buy-btn" @click.stop="goBuy(item)">立即抢</a>
                      </p>
                    </span>
                  </li>
                </ul>
                <div class="refer-more">
                  <a @click="moreHeat(2062012,'增肌塑形')">查看更多</a>
                </div>
              </div>
            </section>
            <section v-if="sportData.goodBye&&uTarget!=4">
              <div class="goto-tap shoufu" @click="moreHeat(2062013,'收腹美腰')"></div>
              <div class="product-box shoufu">
                <ul class="product-list">
                  <li v-for="item in speederData.shoufu" v-if="item.display" @click="goLink(item)">
                    <span class="pic" :style="{background: 'url(\''+item.mediumHomeIcons+'\') no-repeat center'}"></span>
                    <span class="text-group">
                      <p>
                        <i :class="[item.componentType==13?'own guide':'own']">{{item.componentType==13?'导购':'自营'}}</i>{{item.title}}</p>
                      <p v-if="item.componentType!=13">
                        <b v-if="item.goodsInfo">
                          <big>¥{{item.goodsInfo.preferentialPrice}}</big>
                          <s>¥{{item.goodsInfo.oldPrice}}</s>
                        </b>
                        <a class="buy-btn" @click.stop="goBuy(item)">立即抢</a>
                      </p>
                    </span>
                  </li>
                </ul>
                <div class="refer-more">
                  <a @click="moreHeat(2062013,'收腹美腰')">查看更多</a>
                </div>
              </div>
            </section>
            <section v-if="uTarget==4">
              <div class="goto-tap baochijiankang" @click="moreHeat(1,'保持健康')"></div>
              <div class="product-box baochijiankang">
                <ul class="product-list">
                  <li v-for="item in speederData.baochijiankang" v-if="item.display" @click="goLink(item)">
                    <span class="pic" :style="{background: 'url(\''+item.mediumHomeIcons+'\') no-repeat center'}"></span>
                    <span class="text-group">
                      <p>
                        <i :class="[item.componentType==13?'own guide':'own']">{{item.componentType==13?'导购':'自营'}}</i>{{item.title}}</p>
                      <p v-if="item.componentType!=13">
                        <b v-if="item.goodsInfo">
                          <big>¥{{item.goodsInfo.preferentialPrice}}</big>
                          <s>¥{{item.goodsInfo.oldPrice}}</s>
                        </b>
                        <a class="buy-btn" @click.stop="goBuy(item)">立即抢</a>
                      </p>
                    </span>
                  </li>
                </ul>
                <div class="refer-more">
                  <a @click="moreHeat(1,'保持健康')">查看更多</a>
                </div>
              </div>
              <div class="goto-tap jiankangshipin" @click="moreHeat(2,'健康食品')"></div>
              <div class="product-box jiankangshipin">
                <ul class="product-list">
                  <li v-for="item in speederData.jiankangshipin" v-if="item.display" @click="goLink(item)">
                    <span class="pic" :style="{background: 'url(\''+item.mediumHomeIcons+'\') no-repeat center'}"></span>
                    <span class="text-group">
                      <p>
                        <i :class="[item.componentType==13?'own guide':'own']">{{item.componentType==13?'导购':'自营'}}</i>{{item.title}}</p>
                      <p v-if="item.componentType!=13">
                        <b v-if="item.goodsInfo">
                          <big>¥{{item.goodsInfo.preferentialPrice}}</big>
                          <s>¥{{item.goodsInfo.oldPrice}}</s>
                        </b>
                        <a class="buy-btn" @click.stop="goBuy(item)">立即抢</a>
                      </p>
                    </span>
                  </li>
                </ul>
                <div class="refer-more">
                  <a @click="moreHeat(2,'健康食品')">查看更多</a>
                </div>
              </div>
            </section>
            <section v-if="eatData.calcium">
              <div class="goto-tap bugai" @click="moreHeat(2062014,'补钙健骨')"></div>
              <div class="product-box bugai">
                <ul class="product-list">
                  <li v-for="item in speederData.bugai" v-if="item.display" @click="goLink(item)">
                    <span class="pic" :style="{background: 'url(\''+item.mediumHomeIcons+'\') no-repeat center'}"></span>
                    <span class="text-group">
                      <p>
                        <i :class="[item.componentType==13?'own guide':'own']">{{item.componentType==13?'导购':'自营'}}</i>{{item.title}}</p>
                      <p v-if="item.componentType!=13">
                        <b v-if="item.goodsInfo">
                          <big>¥{{item.goodsInfo.preferentialPrice}}</big>
                          <s>¥{{item.goodsInfo.oldPrice}}</s>
                        </b>
                        <a class="buy-btn" @click.stop="goBuy(item)">立即抢</a>
                      </p>
                    </span>
                  </li>
                </ul>
                <div class="refer-more">
                  <a @click="moreHeat(2062014,'补钙健骨')">查看更多</a>
                </div>
              </div>
            </section>
            </template>
            <template v-if="targetType=='sleep'">
              <section>
                <div class="goto-tap yingyangbaojian" @click="moreZTHeat(1)"></div>
                <div class="product-box bugai">
                  <ul class="product-list">
                    <li v-for="item in ztJiaSuQi.list1" @click="goLink(item)">
                      <span class="pic" :style="{background: 'url(\''+item.mediumHomeIcons+'\') no-repeat center'}"></span>
                      <span class="text-group">
                        <p>
                          <i :class="[item.componentType==13?'own guide':'own']">{{item.componentType==13?'导购':'自营'}}</i>{{item.title}}</p>
                        <p v-if="item.componentType!=13">
                          <b v-if="item.goodsInfo">
                            <big>¥{{item.goodsInfo.preferentialPrice}}</big>
                            <s>¥{{item.goodsInfo.oldPrice}}</s>
                          </b>
                          <a class="buy-btn" @click.stop="goBuy(item)">立即抢</a>
                        </p>
                      </span>
                    </li>
                  </ul>
                  <div class="refer-more">
                    <a @click="moreZTHeat(1)">查看更多</a>
                  </div>
                </div>
              </section>
              <section>
                <div class="goto-tap waiyongliliao" @click="moreZTHeat(2)"></div>
                <div class="product-box bugai">
                  <ul class="product-list">
                    <li v-for="item in ztJiaSuQi.list2" @click="goLink(item)">
                      <span class="pic" :style="{background: 'url(\''+item.mediumHomeIcons+'\') no-repeat center'}"></span>
                      <span class="text-group">
                        <p>
                          <i :class="[item.componentType==13?'own guide':'own']">{{item.componentType==13?'导购':'自营'}}</i>{{item.title}}</p>
                        <p v-if="item.componentType!=13">
                          <b v-if="item.goodsInfo">
                            <big>¥{{item.goodsInfo.preferentialPrice}}</big>
                            <s>¥{{item.goodsInfo.oldPrice}}</s>
                          </b>
                          <a class="buy-btn" @click.stop="goBuy(item)">立即抢</a>
                        </p>
                      </span>
                    </li>
                  </ul>
                  <div class="refer-more">
                    <a @click="moreZTHeat(2)">查看更多</a>
                  </div>
                </div>
              </section>
            </template>
          </div>
        </div>

        <div class="tips" v-if="isDevice">
          <p>友情提示：</p>
          <p>APP内任意数据或建议仅供参考，均不代替诊疗机构的专业诊断。特殊人群如体弱老人、孕妇、哺乳妇女、患病需要服药人群（糖尿病、高血压、脂肪肝、高尿酸血症等），建议咨询医生或专业人士</p>
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
import { changeTitle } from "../../../common/utils/hack";
import logo from "../../../assets/ic_launcher_app.png";
import Card from "../../../components/Card/index.vue";
import tracker from "../../../common/utils/tracker";
import foods from "./foods.vue";
import sport from "./sport.vue";
export default {
  data() {
    return {
      loadError: null,
      eatData: { show: true, food: {}, calcium: false }, //膳食,calcium补钙
      sportData: { show: true, data: [], sport: {}, goodBye: false }, //运动
      speederData: {
        show: true,
        heat: [],
        slim: [],
        paidu: [],
        qianti: [],
        beforeSport: [],
        afterSport: [],
        zengji: [],
        shoufu: [],
        bugai: []
      }, //控制热量、减脂瘦身数据
      bodyBase: [{ sCal: 0 }, { sCal: 0 }], //基础数据
      isYoung: false, //是否为青少年
      uTarget: "", //基础类型( 用户目标 1-减脂;2-增肌;3-塑形,4-保持健康 )
      isDevice: client.getQueryString("device"),
      dataSeqId: client.getQueryString("dataSeqId"), //设备ID
      memberId: +client.getQueryString("memberId"),
      shareId: client.getQueryString("shareId"),
      targetType: client.getQueryString("type"),
      targetId: client.getQueryString("target"),
      ztJiaSuQi: {
        fenceId1: 0,
        fenceId2: 0,
        fenceName: "",
        list1: [],
        list2: []
      },
      userinfo: {}
    };
  },
  components: {
    Card,
    sport,
    foods
  },
  created() {
    let fsAgent = navigator.userAgent.toLowerCase();
    if (/fstop/.test(fsAgent)||client.getQueryString('device')) {
      this.isDevice = true;
    }
    changeTitle("健康解决方案");
    if (!this.targetType) {
      //体脂称基础数据
      client
        .getData(apiConfig.API_BODY_BASE + "?dataSeqId=" + this.dataSeqId, {})
        .then(
          data => {
            if (data.code != 200) {
              this.loadError = {
                msg: data.msg
              };
              return;
            }
            this.bodyBase = data.data.plans;
            this.uTarget = data.data.uTarget;
            if (data.data.uType == 1) {
              this.isYoung = true;
            } else {
              //获取用户目标
              this.getTarget(this.uTarget);
            }
          },
          data => {
            this.loadError = {
              msg: "网络连接错误"
            };
          }
        );
    }
  },
  methods: {
    toggle(item, type) {
      item.show == false ? (item.show = true) : (item.show = false);
      /*this.getHeight();*/
      //type 用来tracker区分传递类型
      let contents = "饮食方案";
      if (type == 2) {
        contents = "行动方案";
      } else if (type == 3) {
        contents = "健康加速器";
      }
      tracker.trackData({ content: contents });
    },
    getTarget(uTarget) {
      console.log("获取用户目标:", uTarget);
      const planData = {
        dataSeqId: this.dataSeqId,
        uTarget: uTarget
      };
      client.postData(apiConfig.API_BODY_DETAIL, planData).then(
        data => {
          if (data.code != 200) {
            return;
          }
          this.sportData.data = data.data.sportPlan;
          data.data.foodPlan.forEach(item => {
            //取类型planType为1 膳食
            if (item.planType == 1) {
              this.eatData.food = item;
            }
            //3 补钙
            if (item.planType == 3) {
              this.eatData.calcium = item;
            }
          });
          //console.log(this.eatData);
          this.sportData.data.forEach(item => {
            //取类型planType为2 运动
            if (item.planType == 2) {
              this.sportData.sport = item;
            }
            //4 大肚腩拜拜
            if (item.planType == 4) {
              this.sportData.goodBye = true;
            }
          });
          //console.log('运动数据',this.sportData);
          //获取商品
          setTimeout(() => {
            this.useRecommond();
          }, 400);
        },
        data => {}
      );
    },
    //获取推荐商品公用方法
    getRecommond(tagId, srcData) {
      const fenceId = this.translateId(tagId);
      //控制热量
      const recommondData = {
        currentPage: 1,
        fenceId: fenceId,
        pageSize: 2
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
              if (index < 2) {
                item.display = true;
              }
            });
            this.speederData[srcData] = infos;
            console.log(infos);
          },
          data => {}
        );
    },
    //根据枕头解决方案获取加速器商品列表
    getZTType() {
      // 困扰 1-睡得很好;2-辗转难眠;3-凌晨醒;4-杂梦纷呈;5-睡足仍困倦;6-更年期睡不好;7-老人睡得少;8-家有小夜猫;9-快速倒时差
      let id1,id2,name;
      if(this.targetId==2){
        id1 = 717;
        id2 = 725;
        name = '辗转难眠';
      }
      if(this.targetId==3){
        id1 = 713;
        id2 = 721;
        name = '凌晨醒';
      }
      if(this.targetId==4){
        id1 = 715;
        id2 = 723;
        name = '杂梦纷呈';
      }
      if(this.targetId==5){
        id1 = 716;
        id2 = 724;
        name = '睡足仍困倦';
      }
      if(this.targetId==6){
        id1 = 710;
        id2 = 718;
        name = '更年期睡不好';
      }
      if(this.targetId==7){
        id1 = 712;
        id2 = 720;
        name = '老人睡得少';
      }
      if(this.targetId==8){
        id1 = 711;
        id2 = 719;
        name = '家有小夜猫';
      }
      if(this.targetId==9){
        id1 = 714;
        id2 = 722;
        name = '快速倒时差';
      }
      this.ztJiaSuQi.fenceId1 = id1;
      this.ztJiaSuQi.fenceId2 = id2;
      this.ztJiaSuQi.fenceName = name;
      this.getZTRecommond(id1, 1);
      this.getZTRecommond(id2, 2);
    },
    moreZTHeat(type) {
      const fenceId =
        type == 1 ? this.ztJiaSuQi.fenceId1 : this.ztJiaSuQi.fenceId2;
      const title =
        type == 1 ? this.ztJiaSuQi.fenceName1 : this.ztJiaSuQi.fenceName2;
      const theUrl =
        apiConfig.JUMP_LINK + "views/mine/goods.html?fenceId=" + fenceId;
      //tracker
      tracker.trackData({ content: title });
      if (this.isDevice) {
        Bridge.handlerHtmlMessage({
          type: 2,
          data: { url: theUrl, canShare: true, title: title }
        });
      } else {
        setTimeout(() => {
          location.href = theUrl;
        }, 100);
      }
    },
    //获取枕头加速器商品列表
    getZTRecommond(fenceId, type) {
      //控制热量
      const recommondData = {
        currentPage: 1,
        fenceId: fenceId,
        pageSize: 2
      };
      client.postData(apiConfig.API_RECOMMOND, recommondData, {
          deviceId: window.userinfo.deviceId
        })
        .then(
          data => {
            if (data.code != 200) {
              return;
            }
            data.data = data.data.splice(0,2);
            let infos = data.data;
            infos.forEach((item, index) => {
              if (index < 2) {
                item.display = true;
              }
            });
            if (type == 1) {
              this.ztJiaSuQi.list1 = infos;
            }
            if (type == 2) {
              this.ztJiaSuQi.list2 = infos;
            }
          },
          data => {}
        );
    },
    //判断调用推荐商品
    useRecommond() {
      //相关商品推荐
      //>>减脂
      if (this.uTarget == 1) {
        //控制热量
        this.getRecommond(2062007, "heat");
        //燃脂瘦身
        this.getRecommond(2062008, "slim");
        //排毒
        this.getRecommond(2062009, "paidu");
        //纤体
        this.getRecommond(2062010, "qianti");
      } else if (this.uTarget == 2 || this.uTarget == 3) {
        //>>增肌
        //运动前
        this.getRecommond(2062015, "beforeSport");
        //运动后
        this.getRecommond(2062011, "afterSport");
        //增肌
        this.getRecommond(2062012, "zengji");
      }
      if (this.sportData.goodBye && this.uTarget != 4) {
        //收腹
        this.getRecommond(2062013, "shoufu");
      }
      if (this.uTarget == 4) {
        //保持健康
        this.getRecommond(1, "baochijiankang");
        //健康食品
        this.getRecommond(2, "jiankangshipin");
      }
      if (this.eatData.calcium) {
        //补钙
        this.getRecommond(2062014, "bugai");
      }
    },
    //食谱推荐
    goFood(type) {
      const jumpUrl =
        apiConfig.JUMP_LINK +
        "views/mine/dietary.html?foodType=" +
        type +
        "&cal=" +
        this.bodyBase[0].sCal +
        "&uTarget=" +
        this.uTarget +
        "&memberId=" +
        this.memberId;
      const titles = type == 1 ? "饭食党食谱" : "面食党食谱";
      //tracker
      tracker.trackData({ content: titles });
      if (this.isDevice) {
        Bridge.handlerHtmlMessage({
          type: 2,
          data: { url: jumpUrl, canShare: true, title: titles }
        });
      } else {
        setTimeout(() => {
          location.href = jumpUrl;
        }, 100);
      }
    },
    //运动计划
    goPlan(titles, pages) {
      //tracker
      tracker.trackData({ content: titles });
      const jumpUrl =
        apiConfig.JUMP_LINK + "views/mine/plan.html?page=" + pages;
      if (this.isDevice) {
        Bridge.handlerHtmlMessage({
          type: 2,
          data: { url: jumpUrl, canShare: true, title: titles }
        });
      } else {
        setTimeout(() => {
          location.href = jumpUrl;
        }, 100);
      }
    },
    //查看更多商品
    moreHeat(id, title) {
      const fenceId = this.translateId(id);
      const theUrl =
        apiConfig.JUMP_LINK +
        "views/mine/goods.html?fenceId=" +
        fenceId +
        "&tagId=" +
        id;
      //tracker
      tracker.trackData({ content: title });
      if (this.isDevice) {
        Bridge.handlerHtmlMessage({
          type: 2,
          data: { url: theUrl, canShare: true, title: title }
        });
      } else {
        setTimeout(() => {
          location.href = theUrl;
        }, 100);
      }
    },
    goBuy(item) {
      this.goLink(item);
    },
    // 跳转文章详情
    goLink(item) {
      //tracker
      tracker.trackData({ component_id: item.componentId, content: "健康加速器商品" });
      if (this.isDevice || client.getQueryString("device")) {
        this.getMoreMsg(item.componentId);
      } else {
        setTimeout(() => {
          location.href = item.saleUrl;
        }, 100);
      }
    },
    //调取组件更多信息传递给原生APP
    getMoreMsg(componentId) {
      client
        .postData(
          apiConfig.API_MORE_DETAIL,
          { componentId: componentId },
          { deviceId: window.userinfo.deviceId }
        )
        .then(
          data => {
            if (data.code != 200) {
              return;
            }
            let componentData = data.data;
            Bridge.handlerHtmlMessage({
              type: 9,
              data: { component: componentData }
            });
          },
          data => {}
        );
    },
    getHeight() {
      /*if(this.isDevice&&client.IS_IOS){
        setTimeout(()=>{
          let iosHeight=$(document).height();
          Bridge.handlerHtmlMessage({ type: 13, data: { height: iosHeight} });
        },400)
      }*/
    },
    translateId(tagId) {
      switch (tagId) {
        case 2062007:
          return 701;
        case 2062008:
          return 702;
        case 2062009:
          return 703;
        case 2062010:
          return 704;
        case 2062011:
          return 705;
        case 2062015:
          return 706;
        case 2062012:
          return 707;
        case 2062013:
          return 708;
        case 2062014:
          return 709;
        case 1:
          return 710;
        case 2:
          return 711;
      }
    }
  },
  mounted() {
    /*this.getHeight();*/
    tracker.firstRead({ id: 218, title: "", page_name: "数据展示页" });
    tracker.scrollCase({ event_name: "数据展示页" });
    if (this.targetType) {
       this.userinfo = {targetType:1,test:31}
      if (this.isDevice) {
        this.userinfo = {targetType:1,test:32}
        Bridge.handlerHtmlMessage({ type: 4, data: {} }, dataUser => {
        this.userinfo = {targetType:1,test:33}
          window.userinfo = dataUser.data;
          this.userinfo = window.userinfo;
          this.getZTType();
        });
      } else {
        this.getZTType();
      }
    }
  },
  updated() {}
};
</script>
<style lang="less">
@import "./index.less";
</style>