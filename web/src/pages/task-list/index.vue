<template>
    <div class="page-task-list">
        <div class="l-inner">
            <PageHeader title="任务列表" />

            <div class="m-control-bar">
                <div class="left">
                    <AmButton type="primary" @click="toTaskConfig('')">新增任务</AmButton>
                </div>
                <div class="right">
                    <AmInput />
                </div>
            </div>
            <div class="m-list" v-loading="loading">
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
                        <ul>
                            <li>
                                <span>状态</span>
                                <p>
                                    <i class="status-ball"></i>
                                    <span>监听中</span>
                                </p>
                            </li>
                            <li>
                                <span>最近执行 <a>更多</a></span>
                                <p>
                                    <span></span>
                                    <span>执行失败</span>
                                    <a>查看</a>
                                </p>
                            </li>
                        </ul>
                    </div>
                    <div class="right">
                        <AmButton type="primary" @click="run(item)">立即执行</AmButton>
                        <AmButton @click="toTaskConfig(item.id)">修改配置</AmButton>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import PageHeader from '../../components/page-header';
import { get,post } from '@/utils/fetch';

export default {
    components: {
        PageHeader,
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
            this.list = res.data.list;
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
        background: #f5f5f5;
        border: 1px solid var(--border);
        border-radius: 4px;
        padding: 12px 16px;
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
                        >span {
                            font-size: 12px;
                            color: #999;
                            font-weight: bold;
                        }
                        p {
                            display: flex;
                            align-items: center;
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
                    background: red;
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