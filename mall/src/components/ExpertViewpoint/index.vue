<template>
    <div class="point">
		<p>专家观点：<span>{{this.option}}</span></p>
	</div>
</template>

<script>
export default {

    props: ['option'],

    data () {
        return {
        
        }
    },

    created: function(){
    },
    methods:{
        
    }
}
</script>

<style lang="less">
@import '../../common/styles/index.less';
.point {
    margin: 20/@r 0;
    background-color: #ffffff;
    padding: 20/@r;
    border-top: 0.5/@r solid #e4e4e4;
    border-bottom: 0.5/@r solid #e4e4e4;
    p {
        margin: 0;
        font-size: 26/@r;
        color: #04c5b4;
        font-weight: 500;
        line-height: 45/@r;
        span {
            color: #4a4a4a;
            font-weight: normal;
        }
    }
}
</style>
