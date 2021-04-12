<template>
    <div class="page-task-log">
        <PageHeader title="任务日志" />

        <div class="l-inner">
            <div class="m-progress">
                <div class="item" v-for="item in 5" :key="item">
                    <div>{{ index }}</div>
                    <span>文案</span>
                </div>
            </div>

            <div class="m-log">
                <div class="item">
                    <div class="hd"><StateBall state="success">第一阶段：测试</StateBall></div>
                    <div class="bd">[nodemon] restarting due to changes...
[nodemon] starting `node ./server/index.js`
[nodemon] restarting due to changes...
[nodemon] starting `node ./server/index.js`</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import PageHeader from '../../components/page-header';
import StateBall from '../../components/state-ball';

export default {
    components: {
        PageHeader,
        StateBall,
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

    .m-progress {
        .item {

        }
    }

    .m-log {
        background: #fff;
        border: 1px solid var(--border);
        padding: 16px;
    }

}
</style>