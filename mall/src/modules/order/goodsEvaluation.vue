<template>
    <div v-if="orderDetailData">
        <div class="loop" v-for="item in orderDetailData.orderDetailList" :key="item.id">
            <div class="good-top">
                <div class="goodsimg">
                    <img :src="item.detailSpu.spuPic" />
                </div>
                <div>
                    <div class="good-top-word">{{item.detailSpu.spuName}}</div>
                    <div class="view-right-bottom">
                        <div class="greystar" :class="{pinkstar:true}" v-for="i in item.rater" :key="i.id" @click="goodsScore(item,i)"></div>
                        <div class="greystar" v-for="i in (5-item.rater)" :key="i.id" @click="goodsScore(item,5-i)"></div>
                    </div>
                </div>
            </div>
            <textarea type="text" class="good-middle " v-model="item.comment" placeholder="亲，您的评价能帮助其他小伙伴哟~" @focus="$bridge.trackData({ id: '715003', title: '点击输入评价' });"></textarea>
            <div class="middle-add">
                <div class="add-draw" v-for="(itemImage,indImage) in item.images" :key="itemImage.id">
                    <img :src="itemImage" />
                    <div class="delete" @click='delImage(item,indImage)'>×</div>
                </div>
                <div class="good-add" v-if="item.images.length<4">
                    <div class="camera"></div>
                    <div class="addimg">添加图片</div>
                    <input type="file" @change="onFileChange($event,item)" accept="image/*" canTouch="true" multiple id="pic_src" class="pic_src">
                </div>
            </div>
            <div class="good-bottom">
                <span class="person-icon" :class="{active:item.active}" @click="anonymous(item)"></span>
                <span class="bottom-word" @click="anonymous(item)">匿名评价</span>
            </div>
            <div class="space-bottom"></div>
        </div>
        <div class="loop">
            <div class="good-last">店铺评分</div>
            <div class="assets">
                <div class="asset-word">描述相符</div>
                <div class="assetstar-first">
                    <div class="assetstar" :class="{pinkstar:true}" v-for="i in descriptiveStar" :key="i.id" @click="storeScore(1,i)"></div>
                    <div class="assetstar " v-for="i in (5 - descriptiveStar)" :key="i.id" @click="storeScore(1,i+descriptiveStar)"></div>
                </div>
            </div>
            <div class="assets">
                <div class="asset-word">物流服务</div>
                <div class="assetstar-first">
                    <div class="assetstar" :class="{pinkstar:true}" v-for="i in logisticsStar" :key="i.id" @click="storeScore(2,i)"></div>
                    <div class="assetstar " v-for="i in (5 - logisticsStar)" :key="i.id" @click="storeScore(2,i+logisticsStar)"></div>
                </div>
            </div>
            <div class="assets">
                <div class="asset-word">服务态度</div>
                <div class="assetstar-first">
                    <div class="assetstar" :class="{pinkstar:true}" v-for="i in serviceStar" :key="i.id" @click="storeScore(3,i)"></div>
                    <div class="assetstar " v-for="i in (5 - serviceStar)" :key="i.id" @click="storeScore(3,i+serviceStar)"></div>
                </div>
            </div>
            <div class="last-bottom">
                <a class="deliver" @click="comment">发表评价</a>
            </div>

        </div>
    </div>
</template>

<script>
import { Previewer, TransferDom, ButtonTab, ButtonTabItem } from 'vux'
import client from '../../common/utils/client';
import apiConfig from '../../common/api.config';
import $ from 'zepto';
export default {
    directives: {
        TransferDom
    },
    created() {
        this.$bridge.setTitle('商品评价');
        this.$bridge.firstRead({ id: '715', title: '商品发表评价页' });
        this.$vux.loading.show({
            text: '加载中'
        });
        this.getOrderData();
    },
    components: {
    },
    data() {
        return {
            descriptiveStar: 5,
            logisticsStar: 5,
            serviceStar: 5,
            images: [],
            orderDetailData: null,
        }
    },
    methods: {
        onFileChange(e,item) {
            this.$bridge.trackData({ id: '715004', title: '添加图片' });
            let files = e.target.files || e.dataTransfer.files;
            if (!files.length)return; 
            this.createImage(files,item);
        },
        createImage(file,item) {
            if(typeof FileReader==='undefined'){
                alert('您的浏览器不支持图片上传，请升级您的浏览器');
                return false;
            }
            let image = new Image();
            let vm = this;
            let leng=file.length;
            if(leng>4){
                this.$vux.alert.show({
                    title: '提示',
                    content: '只能选择4张以下的图片哦！'
                }); 
            } else {
                for(let i=0;i<leng;i++){
                    let reader = new FileReader();
                    reader.readAsDataURL(file[i]);
                    reader.onload =function(e){
                        let result = this.result;  
                        let img = new Image();
                        img.src = result;
                        img.onload = function() {
                            vm.uploadImage(vm.compress(img).split(",")[1],item.detailSku.skuId,item);
                        }
                        // vm.uploadImage(e.target.result.split(",")[1],item.detailSku.skuId,item);
                    }; 
                }
            }
        },
        delImage(item,index){
            item.images.splice(index,1);
        },
        uploadImage(base64,name,item) {
            this.$vux.loading.show();
            client.post(apiConfig.API_IMAGE_UPLOAD, {
                "bast64File": base64,
                "creator": 0,
                "fileName": name+"/"+new Date().getTime()+".jpg",
                "mediumType": 1,
                "storeType": 3
            }).then((data) => {
                this.$vux.loading.hide();
                if (data.code === 200) {
                    item.images.push(data.data.ossUrl);
                } else {
                    this.$vux.toast.text(data.msg, 'middle');
                }
            }, (data) => {
                this.$vux.loading.hide();
                this.$vux.toast.text(data.msg, 'middle');
            })
        },
        compress(img) {
            let canvas = document.createElement("canvas");
            let ctx = canvas.getContext('2d');
            let tCanvas = document.createElement("canvas");
            let tctx = tCanvas.getContext("2d");
            let width = img.width;
            let height = img.height;
            //如果图片大于四百万像素，计算压缩比并将大小压至400万以下
            let ratio;
            if ((ratio = width * height / 4000000) > 1) {
                ratio = Math.sqrt(ratio);
                width /= ratio;
                height /= ratio;
            } else {
                ratio = 1;
            }
            canvas.width = width;
            canvas.height = height;
            ctx.fillStyle = "#fff";
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            let count;
            if ((count = width * height / 1000000) > 1) {
                count = ~~(Math.sqrt(count) + 1);
                let nw = ~~(width / count);
                let nh = ~~(height / count);
                tCanvas.width = nw;
                tCanvas.height = nh;
                for (let i = 0; i < count; i++) {
                    for (let j = 0; j < count; j++) {
                        tctx.drawImage(img, i * nw * ratio, j * nh * ratio, nw * ratio, nh * ratio, 0, 0, nw, nh);
                        ctx.drawImage(tCanvas, i * nw, j * nh, nw, nh);
                    }
                }
            } else {
                ctx.drawImage(img, 0, 0, width, height);
            }
            //进行最小压缩
            let ndata = canvas.toDataURL('image/jpeg', 0.1);
            tCanvas.width = tCanvas.height = canvas.width = canvas.height = 0;
            return ndata;
        },
        getOrderData() {
            this.$vux.loading.show();
            client.post(apiConfig.API_SUB_ORDER_DETAIL_BY_ID+'?ordOrderId='+this.$route.params.orderId, {}).then((data) => {
                this.$vux.loading.hide();
                if (data.code === 200) {
                    let arr = [];
                    data.data.orderDetailList.forEach((val,ind)=>{
                        val.images = [];
                        val.rater = 5;
                        val.active = true;
                        val.comment = '';
                    });
                    this.orderDetailData = data.data;
                } else {
                    this.$vux.toast.text(data.msg, 'middle');
                }
            }, (data) => {
                this.$vux.loading.hide();
                this.$vux.toast.text(data.msg, 'middle');
            })
        },
        storeScore(n,index) {
            switch(n) {
                case 1:
                    this.$bridge.trackData({ id: '715006', title: '点击店铺评分-描述' });
                    this.descriptiveStar = index;
                    break;
                case 2:
                    this.$bridge.trackData({ id: '715007', title: '点击店铺评分-物流' });
                    this.logisticsStar = index;
                    break;
                case 3:
                    this.$bridge.trackData({ id: '715008', title: '点击店铺评分-服务' });
                    this.serviceStar = index;
                    break;
                default:
                    break;
            }
        },
        goodsScore(item,index) {
            this.$bridge.trackData({ id: '715002', title: '点击商品评价分数' });
            item.rater = index;
        },
        anonymous(item) {
            this.$bridge.trackData({ id: '715005', title: '点击匿名' });
            item.active = !item.active;
        },
        comment() {
            let comList = [];
            this.orderDetailData.orderDetailList.forEach((val,index)=>{
                comList.push({
                    "oicComment": val.comment,
                    "oicImg": val.images.toString(),
                    "oicImgStatus": val.images.length==0?0:1,
                    "oicLevel": "",
                    "oicMemberId": "",
                    "oicMemberNickname": "",
                    "oicOimId": val.ordId,
                    "oicShopId": 0,
                    "oicIsAnonymous": val.active?1:0,
                    "oicSkuId": val.detailSku.skuId,
                    "oicStarNum": val.rater,
                    "oicStatus": "",
                    "orsMemberImg": ""
                });
            });
            this.$vux.loading.show();
            client.post(apiConfig.API_GOODS_CREATE_COMMENT, comList).then((data) => {
                this.$vux.loading.hide();
                if (data.code === 200) {
                    this.$router.replace('/successEvaluation');
                } else {
                    this.$vux.toast.text(data.msg, 'middle');
                }
            }, (data) => {
                this.$vux.loading.hide();
                this.$vux.toast.text(data.msg, 'middle');
            });
        },
    },
    props: {

    },
    mounted() {
        $('html,body').css('background', '#ffffff');
    },
}
</script>

<style lang="less" scoped>
@import '../../common/styles/index.less';
.good-top {
    display: -webkit-box;
}

.goodsimg {
    margin: 30/@r 26/@r 30/@r 26/@r;
    height: 140/@r;
    width: 140/@r;
    border: 0.5/@r solid #e4e4e4;
    text-align: center;
    // background: url('http://img0.imgtn.bdimg.com/it/u=428549871,4004515111&fm=27&gp=0.jpg')no-repeat center center;
    // background-size: cover;
    img {
        margin-top: 2/@r;
        width: 136/@r;
        height: 136/@r;
    }
}

.good-top-word {
    margin-top: 48/@r;
    width: 500/@r;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

.view-right-bottom {
    margin-top: 20/@r;
    display: -webkit-box;
}

.greystar {
    width: 30/@r;
    height: 30/@r;
    margin-left: 18/@r;
    background: url("../../assets/star_normal@2x.png")no-repeat center center;
    background-size: contain;
    font-size: 28/@r;
    color: #4a4a4a;
}

.assetstar {
    width: 36/@r;
    height: 36/@r;
    margin-left: 18/@r;
    background: url("../../assets/star_normal@2x.png")no-repeat center center;
    background-size: contain;
    font-size: 28/@r;
    color: #4a4a4a;
}

.greystar:first-of-type {
    margin-left: 0/@r;
}

.assetstar-first {
    display: -webkit-box;
    margin-left: 40/@r;
}

.pinkstar {
    background: url("../../assets/stae_selected@2x.png")no-repeat center center;
    background-size: contain;
}

.good-middle {
    height: 240/@r;
    // background-color: #f6f3f3;
    background-color: #f7f7f7;
    width: 100%;
    border: none;
    outline: medium;
    resize: none;
    padding-left: 26/@r;
    padding-top: 8/@r;
    padding-right:26/@r!important;
    padding-bottom: 8/@r!important;
    box-sizing: border-box;
    line-height:40/@r;
}

.middle-add {
 
    margin-top:0/@r!important;
    .add-draw {
        width: 170/@r;
        height: 160/@r;
        margin: 20/@r 0 0 26/@r;
        float: left;
        position: relative;
        .delete {
            width: 35/@r;
            height: 35/@r;
            background: #000000;
            opacity: 0.7;
            border-radius: 100%;
            color: #ffffff;
            font-size: 35/@r;
            text-align: center;
            line-height: 33/@r;
            position: absolute;
            left: 150/@r;
            top: -10/@r;
        } 
        img {
            width: 170/@r;
            height: 160/@r;
        }
    }
    .good-add {
        float:left;
        width: 170/@r;
        height: 160/@r;
        margin: 20/@r 0 0 26/@r;
        background-size: contain;
        border:2/@r dashed   #b9b9b9;
        box-sizing: border-box;
        text-align: center;
        position: relative;
        .camera{
            width:54/@r;
            height:44/@r;
            background:url("../../assets/camera.png")no-repeat center center;
            background-size: contain;
            margin-left:55/@r;
            margin-top:37/@r;
        }
        .addimg{
            font-size: 22/@r;
            color:#9b9b9b;
            margin-top:22/@r;
        }
    }
}

.pic_src {
    width: 170/@r;
    height: 160/@r;
    position: absolute;
    z-index:666;
    left: 0;
    top: 0;
    opacity: 0;
}

.good-bottom {
    clear:both;
    line-height: 40/@r;
    margin-bottom: 26/@r;
    padding-top:26/@r;
    .bottom-word {
        position: relative;
        top: -10/@r;
        left: 13/@r;
    }
    .person-icon {
        width: 40/@r;
        height: 40/@r;
        border-radius: 50%;
        border: 0.05/@r solid #9b9b9b;
        display: inline-block;
        margin-left: 30/@r;
        &.active {
            width: 40/@r;
            height: 40/@r;
            border-radius: 50%;
            display: inline-block;
            border: none;
            background: url('../../assets/Check_selected@2x.png')no-repeat center center;
            background-size: contain;
        }
    }
}

.good-last {
    margin-top: 40/@r;
    height: 71/@r;
    line-height: 71/@r;
    padding-left: 26/@r;
    font-size: 28/@r;
    color: #4a4a4a;
    border-bottom: 2/@r solid #f6f3f3;
}

.assets {
    display: -webkit-box;
    margin-top: 35/@r;
    .asset-word {
        margin-left: 26/@r;
        font-size: 24/@r;
        color: #4a4a4a;
    }
}

.last-bottom {
    height: 167/@r;
    .deliver {
        margin-top: 40/@r;
        height: 50/@r;
        width: 140/@r;
        text-align: center;
        line-height: 50/@r;
        color: #f93473;
        border: 2/@r solid #f93473;
        display: block;
        float: right;
        margin-right: 26/@r;
        border-radius: 5/@r;
    }
}

.space-bottom {
    background-color: #f6f3f3;
    height: 20/@r;
}
</style>
