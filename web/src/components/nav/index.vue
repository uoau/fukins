<template>
    <div class="m-nav">
        <!-- Logo -->
        <Logo />
        <!-- 栏目 -->
        <div class="m-list">
            <div 
                v-for="(group,index1) in nav"
                :key="index1"
                class="group"
            >
                <div class="group-title">{{ group.name }}</div>
                <div class="group-box">
                    <div 
                        v-for="(item,index2) in group.list"
                        :key="index2"
                        class="item"
                        :class="{
                            'is-active': $route.path === item.to
                        }"
                        @click="clickNavItem(item)"
                    >
                        <AmIcon :name="item.icon" size="18px"/>
                        <span>{{ item.name }}</span>
                    </div>
                </div>
            </div>
        </div>

        <!-- 日志卡片 -->
        <div class="m-log-card">
            <div class="hd">
                <div class="left">任务日志</div>
                <div class="right">
                    <AmIcon name="setting" />
                </div>
            </div>
            <div class="bd">
                <div class="progress"><i></i></div>
                <div class="tip">12.2M / 100M</div>
            </div>
        </div>
        <!-- 用户信息 -->
        <div class="m-user-card">
            <div class="left">
                <div>A</div>
            </div>
            <div class="right">
                <span>Admin</span>
                <a>退出</a>
            </div>
        </div>
    </div>    
</template>

<script>
import Logo from '../logo';
export default {
    components: {
        Logo,
    },
    data(){
        return {
            nav: [{
                name: '功能',
                list:[{
                    name: '任务列表',
                    icon: 'commode2',
                    to: '/task-list'
                }]
            },
            {
                name: '其他',
                list:[{
                    name: '全局配置',
                    icon: 'component',
                    to: '/global-config'
                },{
                    name: '新手教程',
                    icon: 'commode2',
                    to: '/task-list2'
                }]
            }]
        }
    },
    methods: {
        clickNavItem(item){
            this.$router.push({
                path: item.to,
            })
        }
    }
}
</script>

<style lang="less">
.m-nav {
    width: 100%;
    height: 100%;
    background: #202831;
    display: flex;
    flex-direction: column;
    border-right: 1px solid var(--border);
    .m-logo {
        padding: 32px 32px;
        color: #fff;
        font-size: 24px;
        font-weight: bold;
    }
    .m-list {
        flex: 1;
        .group {
            margin-bottom: 24px;
            .group-title {
                font-size: 12px;
                font-weight: bold;
                color: #999;
                margin-bottom: 8px;
                padding: 0 40px;
            }
            .group-box {
                .item {
                    height: 32px;
                    display: flex;
                    align-items: center;
                    margin-bottom: 8px;
                    transform: background .2s;
                    padding: 0 40px;
                    cursor: pointer;
                    .am-icon {
                        color: #c1c6c8;
                        margin-right: 8px;
                        background: #40464c;
                        border-radius: 50%;
                        padding: 6px;
                        width: 28px;
                        height: 28px;
                    }
                    >span {
                        color: #c1c6c8;
                        font-size: 14px;
                    }
                    &.is-active {
                        background: #5471f9;
                        // border-top: 1px solid var(--border);
                        // border-bottom: 1px solid var(--border);
                        .am-icon {
                            color: #fff;
                            background: none;
                        }
                        >span {
                            color: #fff;
                        }
                    }
                    &:hover {
                        background: #444;
                    }
                }
            }
        }
    }
    .m-log-card {
        padding: 24px 40px;
        background: #141a1f;
        .hd {
            display: flex;
            justify-content: space-between;
            margin-bottom: 8px;
            .left {
                font-size: 12px;
                font-weight: bold;
                color: #999;
            }
        }
        .bd {
            display: flex;
            flex-direction: column;
            .progress {
                width: 100%;
                height: 4px;
                background: #ddd;
                margin-bottom: 4px;
                display: flex;
                border-radius: 4px;
                overflow: hidden;
                i {
                    width: 60%;
                    height: 100%;
                    background: #24af60;
                    display: inline-flex;
                    border-radius: 4px;
                }
            }
            .tip {
                font-size: 14px;
                color: #bbb;
            }
        }
    }
    .m-user-card {
        display: flex;
        padding: 16px 40px;
        width: 100%;
        align-items: center;
        background: #141a1f;
        .left {
            margin-right: 8px;
            div {
                width: 30px;
                height: 30px;
                border-radius: 50%;
                background: #5471f9;
                color: #fff;
                display: flex;
                align-items: center;
                justify-content: center;
            }
        }
        .right {
            display: flex;
            font-size: 14px;
            align-items: baseline;
            span {
                font-weight: 600;
                color: #fff;
            }
            a {
                color: #fff;
                font-size: 13px;
                margin-left: 8px;
            }
        }
    }
}
</style>