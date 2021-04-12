<template>
    <div class="page-task-config">
        <PageHeader :title="pageTitle" />
        <div class="l-inner">
            <!-- 内容 -->
            <div class="m-content">
                <AmForm position="top">
                    <h5>基础信息</h5>
                    <div class="row">
                        <AmFormItem label="任务名称" style="flex: 1;margin-right: 16px;">
                            <AmInput v-model="config.name" />
                        </AmFormItem>
                        <AmFormItem label="任务ID" style="flex: 1;">
                            <AmInput v-model="config.id" />
                        </AmFormItem>
                    </div>
                    <AmFormItem label="使用说明">
                        <AmTextarea autosize v-model="config.usage"/>
                    </AmFormItem>

                    <h5>触发器</h5>
                    <AmFormItem label="触发方式">
                        <AmRadio v-model="config.triggerType" label="1">Web Hook</AmRadio>
                        <AmRadio v-model="config.triggerType" label="2">轮询</AmRadio>
                        <AmRadio v-model="config.triggerType" label="3">手动触发</AmRadio>
                    </AmFormItem>
                    <!-- webhook 方式 -->
                    <template v-if="config.triggerType === '1'">
                        <div class="row">
                            <AmFormItem label="请求方式" style="width: 160px;margin-right: 8px;">
                                <AmSelect v-model="config.webhookMethod">
                                    <AmOption
                                        v-for="(item,index) in webhookMethodOptions"
                                        :key="index"
                                        :item="item"
                                    >{{ item.label }}</AmOption>
                                </AmSelect>
                            </AmFormItem>
                            <AmFormItem label="请求地址" style="flex: 1;">
                                <AmInput v-model="webhookUrl"/>
                            </AmFormItem>
                        </div>
                        <AmFormItem label="参数(JSON格式)">
                            <AmTextarea autosize v-model="config.triggerCode"/>
                        </AmFormItem>
                    </template>
                    <!-- 轮询方式 -->
                    <template v-if="config.triggerType === '2'">
                        <AmFormItem label="计时器">
                            <div class="column">
                                <AmTextarea v-model="config.scheduleSet"/>
                            </div>
                        </AmFormItem>
                        <AmFormItem label="轮询代码">
                            <AmTextarea autosize v-model="config.scheduleCode"/>
                        </AmFormItem>
                    </template>

                    <h5>执行代码</h5>

                    <div 
                        class="m-pipeline-box" 
                        v-for="(item,index) in config.pipeline"
                        :key="item"
                    >
                        <div class="hd">
                            <div class="left">
                                <AmInput v-model="item.name"/>
                            </div>
                            <div class="right">
                                <AmIconButton icon-size="16px" icon-name="ic_add_box" size="small" @click="addPipeline(index)"/>
                                <AmIconButton icon-size="16px" icon-name="delete-bin-6-fill" size="small" @click="delPipeline(index)"/>
                            </div>
                        </div>
                        <div class="bd">
                            <AmTextarea autosize v-model="item.sh"/>
                        </div>
                    </div>
                </AmForm>
            </div>

            <div class="m-control-bar">
                <AmButton type="primary" size="big" @click="save">保存配置</AmButton>
            </div>
        </div>
    </div>
</template>

<script>
import PageHeader from '../../components/page-header';
import { get, post } from '@/utils/fetch';

export default {
    components: {
        PageHeader,
    },
    data(){
        return {
            pageTitle: '任务配置',
            mode: 'add',
            loading: false,

            webhookMethodOptions: [{
                value: 'GET',
                label: 'GET',
            },{
                value: 'POST',
                label: 'POST',
            }],
            config: {
                // 基础信息
                id: '',
                name: '',
                usage: '',

                // 触发器
                triggerType: '1',
                // webhook
                webhookMethod: 'GET',
                webhookParams: '',
                // 轮询
                scheduleSet: '', // 轮询设置
                scheduleCode: '', // 轮询执行代码

                // 执行代码
                pipeline: [{
                    name: '',
                    sh: '',
                }], // 执行代码
            }
        }
    },
    computed: {
        webhookUrl(){
            return `${window.location}/api/webhook/${this.config.id}`;
        }
    },
    created(){
        const taskId = this.$route.query.taskid;
        if(!taskId){
            this.pageTitle = '新建任务';
            this.mode = 'add';
        }else {
            this.getTaskConfig(taskId);
            this.mode = 'edit';
        }
    },
    methods: {
        async getTaskConfig(taskId){
            this.loading = true;
            const res = await get(`http://localhost:9400/api/task/config/${taskId}`);
            this.config = {
                ...this.config,
                ...res.data.config,
                id: taskId,
            }
            this.loading = false;
        },
        async save() {
            const res = await post(`http://localhost:9400/api/task/config`,this.config);
            console.log(res);
        },
        addPipeline(index){
            this.config.pipeline.splice(index+1,0,{
                name: '',
                sh: '',
            })
        },
        async delPipeline(index){
            if(this.config.pipeline.length < 2) {
                this.$message.fail('至少需要一个');
                return;
            }
            await this.$dialog({
                content: '你确定删除吗?'
            });
            this.config.pipeline.splice(index,1);
        }
    }
}
</script>

<style lang="less">
.page-task-config {
    .l-inner {
        width: 800px;
        margin: auto;
        display: flex;
        flex-direction: column;
        padding-bottom: 100px;
    }
    .m-fast-nav {
        width: 100%;
        h5 {
            font-size: 14px;
            margin-bottom: 16px;
        }
        ul {
            li {
                font-size: 14px;
                line-height: 20px;
                padding: 4px 0;
                color: #666;
                &.is-active {
                    color: #000;
                    font-weight: bold;
                }
            }
        }
    }
    .m-content {
        flex: 1;
        background: #fff;
        border: 1px solid var(--border);
        padding: 16px;
        .am-form {
            width: 100%;
            > h5 {
                margin-bottom: 8px;
                font-size: 14px;
                margin-top: 40px;
                border-radius: 3px;
                position: relative;
                &:before {
                    content: '';
                    display: inline-flex;
                    width: 4px;
                    height: 16px;
                    background: var(--primary);
                    position: absolute;
                    top: 0;
                    bottom: 0;
                    left: -16px;
                    margin: auto;
                }
                &:first-child {
                    margin-top: 0;
                }
            }
            &-item.is-top {
                margin-bottom: 0px;
                display: flex;
                flex-direction: column;
                &__hd {
                    color: #666;
                    font-size: 12px;
                    font-weight: bold;
                }
                &__bd {
                    width: 100%;
                }
            }
            .am-input {
                width: 100%;
            }
            .am-textarea {
                width: 100%;
            }
            .am-select {
                width: 100%;
            }
            .row {
                display: flex;
            }
            .column {
                width: 100%;
                display: flex;
                flex-direction: column;
            }
            .example {
                width: 100%;
                padding: 12px;
                background: #e2f1ff;
                color: #37558e;
                font-size: 14px;
                margin-top: 12px;
                border-radius: 4px;
            }
        }
    }

    .m-pipeline-box {
        display: flex;
        flex-direction: column;
        background: #4c5054;
        border-radius: 3px;
        margin-bottom: 12px;
        .hd {
            display: flex;
            justify-content: space-between;
            padding: 4px;
            // border-bottom: 1px solid #666;
            .left {

            }
            .right {
                display: flex;
                align-items: center;
                display: none;
                .am-icon-button {
                    color: #eee;
                    border: none;
                    margin-right: 4px;
                    &:hover {
                        background: #2c2e33;
                    }
                    &.is-down {
                        background: #4c5054;
                    }
                }
            }
        }
        .bd {
            padding: 8px;
            padding-top: 0;
            .am-textarea {
                background: #2c2e33;
            }
        }
        &:hover {
            .hd {
                .right {
                    display: flex;
                }
            }
        }
        .am-input,.am-textarea {
            border: none;
            input,textarea {
                background: none;
                color: #fff;
            }
        }
    }

    .m-control-bar {
        margin-top: 24px;
    }
}
</style>