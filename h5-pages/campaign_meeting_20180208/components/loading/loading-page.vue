<template>
    <tween :name="'fade-out'" :autoplay="false" v-if="showLoading" :play="play">
        <div class="page" id="loadingPage">
            <div class="loading-block">
                <p>loading...{{percent}}%</p>
                <!-- <img :src="img" style="width:2.56rem"> -->
            </div>
        </div>
    </tween>
</template>

<script>
import Res from '../../../common/utils/res';
import resources from '../../config/resource';
import { tween } from '../../../common/components/';
// import loading1 from '../../images/loading1.jpg';
export default {
    components: { tween },
    data() {
        return {
            showLoading: true,
            play: false,
            percent: 0,
            // img: loading1,
        }
    },
    created() {
        let path = this.$route.path;
        let imgs;
        if (path == '/' || path == '/home') {
            imgs = Object.assign(resources.common, resources.user);
        } else {
            imgs = Object.assign(resources.common, resources.friend);
        }
        let params = location.href.split('?');
        Res.loadImg({
            imgs: imgs,
            progress: (percent) => {
                this.percent = percent;
            },
            callback: () => {
                console.log('done');
                setTimeout(() => {
                    $('#btnMusic').addClass('active');
                }, 1500)
                let urlParams = params.length > 1 ? '?' + params[1] : '';
                this.$router.replace('/home' + urlParams);
            }
        })
    }
}
</script>

<style lang="less" scoped>
.loading-block {
    position: relative;
    width: 100%;
    height: 2rem;
    top: 50%;
    margin-top: -1rem;
    text-align: center;
    line-height: 0.36rem;
    font-size: 0.14rem;
}
</style>
