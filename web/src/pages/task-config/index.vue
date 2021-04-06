<template>
    <div class="page-task-config">
        <div class="l-inner">
            <div class="l-top">
                <PageHeader title="任务配置" />
            </div>
            <div class="l-bottom">
                <div class="l-left">
                    <!-- 快速导航 -->
                    <div class="m-fast-nav">
                        <h5>配置导航</h5>
                        <ul>
                            <li>基础配置</li>
                            <li class="is-active">触发器</li>
                            <li>执行代码</li>
                        </ul>
                    </div>
                </div>
                <div class="l-right">
                    <!-- 内容 -->
                    <div class="m-content">
                        <AmForm position="top">
                            <h5>基础信息</h5>
                            <AmFormItem label="任务名称">
                                <AmInput v-model="config.name"/>
                            </AmFormItem>
                            <AmFormItem label="使用说明">
                                <AmTextarea auto-size v-model="config.usage"/>
                            </AmFormItem>
                            <h5>触发器</h5>
                            <AmFormItem label="触发方式">
                                <AmRadio v-model="triggerType" label="1">Web Hook</AmRadio>
                                <AmRadio v-model="triggerType" label="2">轮询</AmRadio>
                                <AmRadio v-model="triggerType" label="3">手动触发</AmRadio>
                            </AmFormItem>
                            <AmFormItem label="请求方式">
                                <AmSelect>
                                    <AmOption>GET</AmOption>
                                    <AmOption>POST</AmOption>
                                </AmSelect>
                            </AmFormItem>
                            <AmFormItem label="请求地址">
                                <AmInput />
                            </AmFormItem>

                            <!-- <AmFormItem label="请求方式">
                                <div>
                                    <AmSelect>
                                        <AmOption>GET</AmOption>
                                        <AmOption>POST</AmOption>
                                    </AmSelect>
                                    <AmInput readonly/>
                                </div>
                                <div>
                                    
                                </div>
                                <div>通过主动调用 [post]http://127.0.0.1:9002/api/webhook/</div>
                            </AmFormItem> -->

                            <AmFormItem label="任务描述">
                                <AmTextarea />
                            </AmFormItem>
                            <blank></blank>
                            <h5>执行代码</h5>
                            <AmFormItem label="执行代码">
                                <AmTextarea />
                            </AmFormItem>
                        </AmForm>
                    </div>

                    <div class="m-control-bar">
                        <AmButton type="primary" size="big">保存配置</AmButton>
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
            config: {
                name: '任务名称',
                usage: '用法',
                triggerType: '1',
            }
        }
    },
}
</script>

<style lang="less">
.page-task-config {
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
    .l-left {
        width: 160px;
    }
    .l-right {
        flex: 1;
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
        .am-form {
            width: 100%;
            > h5 {
                margin-bottom: 0px;
                font-size: 14px;
                margin-top: 40px;
                &:first-child {
                    margin-top: 0;
                }
            }
            &-item {
                margin-bottom: 0;
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
        }
    }

    .m-control-bar {
        margin-top: 24px;
    }
}
</style>