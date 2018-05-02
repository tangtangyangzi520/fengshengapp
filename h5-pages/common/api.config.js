import client from "./utils/client";

//统计tracker接口
let TRACKER = "http://tracker.fshtop.com/sts/flume/post";
let staticWeb = 'http://m.fshtop.com/json/';

//文章接口服务
let API_HOST_ARTICLE = 'http://api.fshtop.com/cms-api/';
let API_HOST_CMS = 'http://api.fshtop.com/cms-manager/';

//体脂称、相关商品推荐
let API_HEALTH = 'http://api.fshtop.com/cms-api/';
let API_BODY = 'http://api.fshtop.com/intelligence-api/';

//积分街扩
let API_MISSION = 'http://api.fshtop.com/mission-api/';

//文章统一链接跳转
let JUMP_LINK = 'http://' + location.hostname + '/vue/mobile/dist/';


//年会用户授权
let ANNUAL_MEETING = 'http://192.168.7.213:8111/annual-meeting/';

if (/http:\/\/t/.test(location.href)) {
    //测试环境
    API_HOST_ARTICLE = 'http://tapi.fshtop.com/cms-api/';
    API_HOST_CMS = 'http://tmanagerapi.fshtop.com/cms-manager/';
    TRACKER = "http://tracker.fshtop.com/sts/flume/post";
    staticWeb = 'http://tstaticweb.fshtop.com/json/';
    API_HEALTH = 'http://tcmsapi.fshtop.com/cms-api/';
    API_BODY = 'http://tapi.fshtop.com/intelligence-api/';
    API_MISSION = 'http://tapi.fshtop.com/mission-api/';
    ANNUAL_MEETING = 'http://192.168.7.213:8111//annual-meeting/';
} else if (/http:\/\/m/.test(location.href)) {
    //正式环境
    API_HOST_ARTICLE = 'http://api.fshtop.com/cms-api/';
    API_HOST_CMS = 'http://api.fshtop.com/cms-manager/';
} else if (/http:\/\/cms/.test(location.href)) {
    //正式环境
    API_HOST_ARTICLE = 'http://api.fshtop.com/cms-api/';
    API_HOST_CMS = 'http://api.fshtop.com/cms-manager/';
} else {
    //开发环境
    /*API_HOST_ARTICLE = 'http://192.168.7.202:8082/cms-api/';
    API_HOST_CMS = 'http://192.168.7.202:8086/cms-manager/';*/
    //测试环境
    API_HOST_ARTICLE = 'http://tapi.fshtop.com/cms-api/';
    API_HOST_CMS = 'http://tmanagerapi.fshtop.com/cms-manager/';
    // API_HOST_CMS = "http://192.168.133.196:8086/cms-manager/";
    TRACKER = "http://tracker.fshtop.com/sts/flume/post";
    staticWeb = 'http://tstaticweb.fshtop.com/json/';
    API_HEALTH = 'http://api.fshtop.com/cms-api/';
    API_BODY = 'http://tapi.fshtop.com/intelligence-api/';
    JUMP_LINK = 'http://' + location.hostname + ':' + location.port + '/';
    API_MISSION = 'http://tapi.fshtop.com/mission-api/';
    ANNUAL_MEETING = 'http://192.168.7.213:8111/annual-meeting/';
}
ANNUAL_MEETING = 'http://192.168.7.213:8111/annual-meeting/';
//分享授权
const API_SIGNATURE_GET = API_HOST_ARTICLE + "html5/1.0.0/wechat/share";
//文章详情
const API_ARTICLE_GET = API_HOST_ARTICLE + "html5/1.0.0/getArticle";
//根据痛点关联推荐
const API_ARTICLE_PAINRELATES = API_HOST_ARTICLE + "html5/1.0.0/relateArticle";
//获取组件子组件
const API_COMPONENT_CHILDREN = API_HOST_ARTICLE + "component/1.0.0/getChildren";
//添加良方
const API_PRESCRIPTION_ADD = API_HOST_ARTICLE + "prescription/1.0.0/add";

//请求爱分享数据
const API_MEMBER_SHARE = API_HOST_ARTICLE + "html5/1.0.0/memberShare";
//获取openId
const API_GET_OPENID = API_HOST_ARTICLE + "wechat/1.0.0/getUserInfoByCode";

//预览效果请求接口
const CMS_GET_ARTICLE = API_HOST_CMS + 'component/getArticle';
const CMS_GET_MERCHANDISE = API_HOST_CMS + 'merchandise/get';

//请求良方分享
const API_RECIPE = API_HOST_ARTICLE + "html5/1.0.0/preShare";

const IOS_STATUS = API_HOST_ARTICLE + "app/1.0.0/getExceptionStatus";

//体脂称基础数据接口
const API_BODY_BASE = API_BODY + 'cf/suggestion/1.0.0/list';
const API_BODY_DETAIL = API_BODY + 'cf/suggestion/1.0.0/detail';
//体脂称膳食接口
const API_FOOD_PLAN = API_BODY + 'cf/suggestion/1.0.0/food';
//推荐商品接口
const API_RECOMMOND = API_HEALTH + 'goods/2.0.0/getContentListFence';
//作者关注
const API_FOCUS = API_HEALTH + 'behavior/1.0.0/behaviorStatus';
//榜单商品接口
const API_RANKING = API_HEALTH + 'goods/2.0.0/getContentListFence';
//榜单值得买栏目接口,查看更多商品
const API_MENU = API_HEALTH + 'fence/2.0.0/getTagByFence';
//获取组件详情传递给原生app 
const API_MORE_DETAIL = API_HEALTH + 'component/2.0.0/detail';
//活动商品
const API_ACTIVITY = API_HEALTH + 'campaign/2.0.0/campaignList';

//积分接口
const API_GET_MEMBER_WEEK_MISSION = API_MISSION + 'mission/1.0.0/getMemberWeekMission';
const API_GET_WEEK_MISSION_POINT = API_MISSION + 'mission/1.0.0/getWeekMissionPoint';
const API_GET_MEMBER_POINT = API_MISSION + 'mission/1.0.0/getMemberExpPointStatistics';
const API_GET_WEEK_MISSION_PRIZE = API_MISSION + 'mission/1.0.0/getWeekMissionPrize';

//异常指标商品推荐
const API_HEALTH_RECOMMOND = API_BODY + 'cf/quota/1.0.0/recommend';
const API_REPORT_TREND_MONTH = API_BODY + 'cf/report/1.0.0/trend/month';
const API_REPORT_TREND = API_BODY + 'cf/report/1.0.0/trend';

// 年会冲顶活动

//检查openid是否注册过
const API_CHECK_OPENID = ANNUAL_MEETING + 'member/1.0.0/checkOpenid';
//若无注册过，就注册一个新的
const API_REGISTER_TOKEN = ANNUAL_MEETING + 'member/1.0.0/register';
//获取部门列表
const API_DEPARTMENT_LIST = ANNUAL_MEETING + 'partySeating/getDepartments';
//获取位置
const API_PEOPLE_TPOSITION = ANNUAL_MEETING + 'partySeating/getSeating';
//获取在线人数
const API_GET_ONLINE_PERSON = ANNUAL_MEETING + 'admin/1.0.0/getOnlinePerson';
//生成题目
const API_PICKUP = ANNUAL_MEETING + 'admin/1.0.0/pickup';
//获取所有批次的题目
const API_PICKUP_ALL = ANNUAL_MEETING + 'admin/1.0.0/pickupall';
//派发题目
const API_NEXT_QUESTION = ANNUAL_MEETING + 'admin/1.0.0/getNextQuestion';
//公布答案
const API_PUBLISH_ANSWER = ANNUAL_MEETING + 'admin/1.0.0/publishAnswer';
//公布胜利选手
const API_PUBLISH_WINNER = ANNUAL_MEETING + 'admin/1.0.0/publishWinner';
//投票结果
const API_VOTERESULT = ANNUAL_MEETING + 'vote/1.0.0/result';
//开始投票
const API_VOTEOPERATE = ANNUAL_MEETING + 'vote/1.0.0/operate';
//用户投票
const API_VOTESELECT = ANNUAL_MEETING + 'vote/1.0.0/select';
export default {
    API_ARTICLE_GET,
    API_ARTICLE_PAINRELATES,
    API_COMPONENT_CHILDREN,
    API_PRESCRIPTION_ADD,
    API_MEMBER_SHARE,
    CMS_GET_ARTICLE,
    JUMP_LINK,
    API_RECIPE,
    IOS_STATUS,
    TRACKER,
    API_SIGNATURE_GET,
    staticWeb,
    API_RECOMMOND,
    API_FOOD_PLAN,
    API_BODY_BASE,
    API_BODY_DETAIL,
    API_RANKING,
    API_MENU,
    API_FOCUS,
    API_MORE_DETAIL,
    API_GET_MEMBER_WEEK_MISSION,
    API_GET_WEEK_MISSION_POINT,
    API_GET_MEMBER_POINT,
    API_GET_WEEK_MISSION_PRIZE,
    API_HEALTH_RECOMMOND,
    API_REPORT_TREND_MONTH,
    API_REPORT_TREND,
    API_ACTIVITY,
    API_GET_OPENID,
    API_CHECK_OPENID,
    API_REGISTER_TOKEN,
    API_DEPARTMENT_LIST,
    API_PEOPLE_TPOSITION,
    API_GET_ONLINE_PERSON,
    API_PICKUP,
    API_PICKUP_ALL,
    API_NEXT_QUESTION,
    API_PUBLISH_ANSWER,
    API_PUBLISH_WINNER,
    API_VOTERESULT,
    API_VOTEOPERATE,
    API_VOTESELECT
}