<template>
    <div class="page-task-log">
        <PageHeader title="TEST 执行记录" />

        <div class="l-inner">
            <div class="m-table">
                <AmTable
                    :data="list"
                >
                    <AmTableColumn label="状态" width="80px" prop="">
                        <template v-slot:default="row">
                            <StateBall state="running" />
                        </template>
                    </AmTableColumn>
                    <AmTableColumn label="开始于" width="200px">
                        <template v-slot:default="row">
                            2021-02-02 16:31:31
                        </template>
                    </AmTableColumn>
                    <AmTableColumn label="信息">
                        任务触发
                    </AmTableColumn>
                    <AmTableColumn label="耗时" width="100px">
                        2m 16s
                    </AmTableColumn>
                </AmTable>
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
           list: [{},{},{}] 
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

}
</style>