<template>
    <div class="page-task-list">
        <div class="l-inner">
            <PageHeader title="任务列表" />

            <div class="m-control-bar">
                <div class="left">
                    <AmButton type="primary" @click="toTaskConfig">新增任务</AmButton>
                </div>
                <div class="right">
                    <AmInput />
                </div>
            </div>
            <div class="m-list">
                <div 
                    class="item" 
                    v-for="(item,index) in dealedList"
                    :key="index"
                >
                    <div class="left">
                        <h4>{{ item.name }}<i>WebHook任务</i></h4>
                        <ul>
                            <li>
                                <span>状态</span>
                                <p>
                                    <i></i>
                                    <span>监听中</span>
                                </p>
                            </li>
                            <li>
                                <span>最近执行</span>
                                <p>
                                    <span>2020-03-16 12:00:00</span>
                                    <span>执行失败</span>
                                    <AmButton type="text">查看</AmButton>
                                </p>
                            </li>
                        </ul>
                    </div>
                    <div class="right">
                        <AmButton type="primary" @click="run">立即执行</AmButton>
                        <AmButton @click="toTaskConfig">修改配置</AmButton>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import PageHeader from '../../components/page-header';
import { get } from '@/utils/fetch';

export default {
    components: {
        PageHeader,
    },
    data(){
        return {
            list: [
                {name: '小红', age: 12},
                {name: '小蓝', age: 13},
                {name: '小蓝', age: 13},
            ]
        }
    },
    computed: {
        dealedList(){
            return this.list;
        }
    },
    created(){
        this.getTaskList();
    },
    methods: {
        async getTaskList(){
            const res = await get('http://localhost:9400/api/tasks');
            this.list = res;
        },
        run(){
            
        },
        toTaskConfig(name){
            const params = {
                path: '/task-config',
            };
            if(name) {
                params.query = {
                    taskname: name,
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
                            i {
                                display: inline-flex;
                                width: 10px;
                                height: 10px;
                                border-radius: 50%;
                                background: red;
                                margin-right: 4px;
                            }
                        }
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