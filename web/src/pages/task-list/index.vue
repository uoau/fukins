<template>
    <div class="page-task-list">
        <PageHeader title="任务大厅" />
        
        <div class="l-inner">
            <div style="width: 100%;padding: 8px;background: #d8e5fd;font-size: 14px;margin-bottom: 16px;color: var(--primary);">
                有一个任务执行失败，点击查看
            </div>
            <div class="m-control-bar">
                <div class="left">
                    <AmButton @click="toTaskConfig('')" type="primary">新增任务</AmButton>
                </div>
                <div class="right">
                    <AmInput />
                </div>
            </div>

            <div class="m-table">
                <AmTable
                    :data="dealedList"
                >
                    <AmTableColumn label="状态" width="60px">
                        <template v-slot:default="row">
                            <StateBall state="success" />
                        </template>
                    </AmTableColumn>
                    <AmTableColumn label="项目">
                        <template v-slot:default="row">
                            <div>
                                <p style="font-size: 14px;margin-bottom: 8px;line-height: 20px;">监听 UtilsHub Git 推送</p>
                                <span style="font-size: 14px;color: #666;"><AmTag text="手动触发" /></span>
                            </div>
                        </template>
                    </AmTableColumn>
                    <AmTableColumn label="最新执行" width="240px">
                        <template v-slot:default="row">
                            <div>
                                <p style="font-size: 12px;color: #666;font-weight: bold;line-height: 20px;margin-bottom: 8px;">最近执行 更多</p>
                                <span style=""><StateBall state="success">2021-02-02 00:00:00 查看</StateBall></span>
                            </div>
                        </template>
                    </AmTableColumn>
                    <AmTableColumn label="操作" width="160px">
                        <template v-slot:default="row">
                            <AmButton type="text" icon-name="skip-forward-mini-fill">执行</AmButton>
                            <AmButton @click="toTaskConfig(row.id)" type="text" icon-name="component">配置</AmButton>
                        </template>
                    </AmTableColumn>
                </AmTable>
            </div>

            <!-- <div class="m-list" v-loading="loading">
                <div 
                    class="item" 
                    v-for="(item,index) in dealedList"
                    :key="index"
                >
                    <div class="left">
                        <h4>
                            <p>[{{ item.id }}] {{ item.name }}</p>
                            <AmTag text="WebHook"/>
                        </h4>




                        <!-- <ul>
                            <li>
                                <div class="hd">状态</div>
                                <div class="bd">
                                    <StateBall state="success">空闲</StateBall> 
                                </div>
                            </li>
                            <li>
                                <div class="hd">最近执行 <a>更多</a></div>
                                <div class="bd">
                                    <span>{{ item.taskLogList[0].start }}</span>
                                    <span>{{ item.taskLogList[0].state }}</span>
                                    <a>查看详情</a>
                                </div>
                            </li>
                        </ul> -->
                    <!-- </div>
                    <div class="right">
                        <AmButton type="primary" @click="run(item)">立即执行</AmButton>
                        <AmButton @click="toTaskConfig(item.id)">修改配置</AmButton>
                    </div>
                </div>
            </div> -->
        </div>
    </div>
</template>

<script>
import PageHeader from '../../components/page-header';
import StateBall from '../../components/state-ball';
import { get,post } from '@/utils/fetch';

export default {
    components: {
        PageHeader,
        StateBall,
    },
    data(){
        return {
            loading: false,
            list: []
        }
    },
    computed: {
        dealedList(){
            return this.list;
        }
    },
    created(){
        this.getTaskList();

        window.ws.add(this.handleWebSocket);
    },
    beforeDestroy() {
        window.ws.remove(this.handleWebSocket);
    },
    methods: {
        handleWebSocket(data){
            console.log(data);
        },
        async getTaskList(){
            this.loading = true;
            const res = await get('http://localhost:9400/api/tasks');
            this.list = [...res.data.list,...res.data.list,...res.data.list,...res.data.list,...res.data.list,...res.data.list];
            this.loading = false;
        },
        async run(item){
            const res = await post('http://localhost:9400/api/task/start',{
                taskId: item.id,
            });
            console.log(res);
        },
        toTaskConfig(id){
            const params = {
                path: '/task-config',
            };
            if(id) {
                params.query = {
                    taskid: id,
                }
            }
            this.$router.push(params);
        }
    }
}
</script>

<style lang="less">
.page-task-list {
    .l-inner {
        width: 800px;
        margin: auto;
    }
    .m-control-bar {
        display: flex;
        justify-content: space-between;
        // background: #f5f5f5;
        // border: 1px solid var(--border);
        // border-radius: 4px;
        // padding: 12px 16px;
        margin-bottom: 16px;
        .left {

        }
        .right {

        }
        .am-input {
            background: #fff;
        }
    }
    .m-list {
        position: relative;
        .item {
            padding: 16px 0;
            display: flex;
            border-bottom: 1px solid var(--border);
            .left {
                flex: 1;
                display: flex;
                flex-direction: column;
                h4 {
                    font-size: 16px;
                    height: 34px;
                    display: flex;
                    align-items: center;
                    margin-bottom: 4px;

                    i {
                        height: 18px;
                        border-radius: 3px;
                        background: #999;
                        color: #fff;
                        font-size: 12px;
                        display: inline-flex;
                        align-items: center;
                        padding: 0 6px;
                        margin-left: 8px;
                    }
                }
                ul {
                    display: flex;
                    li {
                        font-size: 14px;
                        line-height: 20px;
                        margin-right: 64px;
                        display: flex;
                        flex-direction: column;
                        .hd {
                            font-size: 12px;
                            color: #999;
                            font-weight: bold;
                        }
                        .bd {
                            display: flex;
                            align-items: center;
                            height: 34px;
                            span {
                                margin-right: 4px;
                            }
                        }
                    }
                }
                .status-ball {
                    display: inline-flex;
                    width: 10px;
                    height: 10px;
                    border-radius: 50%;
                    background: green;
                    margin-right: 4px;
                    &.running {
                        background: orange;
                    }
                    &.waitting {
                        background: green;
                    }
                }
            }
            .right {
                display: flex;
                flex-direction: column;
                .am-button {
                    margin-bottom: 12px;
                }
            }
        }
    }
}
</style>