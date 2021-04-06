<template>
    <div class="page-task-log">
        <div class="l-inner">
            <div class="l-top">
                <PageHeader title="任务日志" />
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
                            <h5>任务描述</h5>
                            <AmFormItem label="任务名称">
                                <AmInput />
                            </AmFormItem>
                            <AmFormItem label="使用说明">
                                <AmTextarea />
                            </AmFormItem>
                            <h5>触发器</h5>
                            <AmFormItem label="触发方式">
                                <AmRadio>Web Hook</AmRadio>
                                <AmRadio>轮询</AmRadio>
                                <AmRadio>手动</AmRadio>
                            </AmFormItem>
                            <AmFormItem label="任务描述">
                                <AmTextarea />
                            </AmFormItem>
                            <h5>执行代码</h5>
                            <AmFormItem label="执行代码">
                                <AmTextarea />
                            </AmFormItem>
                        </AmForm>
                    </div>

                    <div class="m-control">
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
                margin-bottom: 16px;
            }
            .am-form-item__bd {
                width: 100%;
            }
            .am-input {
                width: 100%;
            }
            .am-textarea {
                width: 100%;
            }
        }
    }
}
</style>