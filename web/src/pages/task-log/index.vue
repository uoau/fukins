<template>
    <div class="page-task-log">
        <div class="l-inner">
            <div class="l-top">
                <PageHeader title="任务日志" />

                <div class="m-progress">
                    <div class="item" v-for="item in 5">
                        <div>{{ index }}</div>
                        <span>文案</span>
                    </div>
                </div>
            </div>
            <div class="l-bottom">
                <div class="m-log">
                    <div class="item">
                        <div class="hd">日志名</div>
                        <div class="bd">[nodemon] restarting due to changes...
[nodemon] starting `node ./server/index.js`
[nodemon] restarting due to changes...
[nodemon] starting `node ./server/index.js`</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import PageHeader from '../../components/page-header';

export default {
    components: {
        PageHeader,
    },
    data(){
        return {
            
        }
    },
}
</script>

<style lang="less">
.page-task-log {
    .l-inner {
        width: 800px;
        margin: auto;
        display: flex;
        flex-direction: column;
    }
    .l-top {

    }
    .l-bottom {
        display: flex;
    }

    .m-progress {
        .item {

        }
    }

}
</style>