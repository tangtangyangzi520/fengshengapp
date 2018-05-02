<template>
    <div class="reason">
		<div class="reason-title">
            <img src="../../assets/List.png" />
            <p class="reason-title-f">上榜</p>
            <p class="reason-title-s">理由</p>
        </div>
		<div class="reason-list">
            <ul>
                <li v-for="(item,index) in reasons" v-if="index<3"><span>{{item.pcrReason}}</span></li>
            </ul>
        </div>
	</div>
</template>

<script>
export default {

    props: ['reasons'],

    data () {
        return {
        }
    },
    created: function(){
    },
    mounted(){
        document.querySelector('.reason-list').addEventListener('touchmove',function(e){
            e.stopPropagation();
        })
    },
    methods:{
       
    }
}
</script>

<style lang="less">
@import '../../common/styles/index.less';
.reason {
    display: flex;
    min-height: 170/@r;
    margin: 20/@r 0;
    background-color: #ffffff;
    border-top: 0.5/@r solid #e4e4e4;
    border-bottom: 0.5/@r solid #e4e4e4;
    .reason-title {
        width: 200/@r;
        text-align: center;
        img {
            width: 38/@r;
            height: 47/@r;
        }
        .reason-title-f {
            margin: 0;
            padding: 0;
            color: #f93473;
            font-size: 28/@r;
            font-weight: 500;
        }
        .reason-title-s {
            margin: 0;
            padding: 0;
            color: #f93473;
            font-size: 28/@r;
            font-weight: 500;
        }
    }
    .reason-list {
        flex-grow: 2;
        ul {
            li {
                padding-top: 8/@r;
                color: #f93473;
                span {
                    color: #4a4a4a;
                }
            }
        }
    }
}
</style>
