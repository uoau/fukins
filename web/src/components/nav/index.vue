<template>
    <div class="m-nav">
        <!-- Logo -->
        <Logo />
        <!-- 栏目 -->
        <div class="m-nav__list">
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
                            'is-active': checkActive(item)
                        }"
                        @click="clickNavItem(item)"
                    >
                        <AmIcon :name="item.icon" size="18px"/>
                        <span>{{ item.name }}</span>
                    </div>
                </div>
            </div>
        </div>

        <div class="m-nav__bottom">
            <!-- 日志卡片 -->
            <div class="m-nav__log-card">
                <div class="hd">
                    <div class="left">任务日志 12.2M / 100M</div>
                    <div class="right">
                        <!-- <AmIcon name="setting" /> -->
                        清理
                    </div>
                </div>
                <div class="bd">
                    <div class="progress"><i></i></div>
                    <!-- <div class="tip">12.2M / 100M</div> -->
                </div>
            </div>
            <!-- 用户信息 -->
            <div class="m-nav__user-card">
                <div class="left">
                    <div>A</div>
                    <span>Admin</span>
                </div>
                <div class="right">
                    <AmIconButton icon-name="close"></AmIconButton>
                </div>
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
                    to: '/task-list',
                    child: [
                        '/task-list',
                        '/task-config',
                        '/task-logs',
                        '/task-log'
                    ]
                }]
            },
            {
                name: '其他',
                list:[{
                    name: '全局配置',
                    icon: 'component',
                    to: '/global-config',
                    child: [
                        '/global-config',
                    ]
                },{
                    name: '新手教程',
                    icon: 'commode2',
                    to: '/readme',
                    child: [
                        '/readme',
                    ]
                }]
            }]
        }
    },
    methods: {
        clickNavItem(item){
            this.$router.push({
                path: item.to,
            })
        },
        checkActive(item) {
            const index = item.child.findIndex((i)=> {
                return this.$route.path.indexOf(i) > -1;
            })
            if(index > -1) {
                return true;
            }
            return false;
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
    &__list {
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
                    height: 34px;
                    display: flex;
                    align-items: center;
                    margin-bottom: 8px;
                    transition: background .2s;
                    padding: 0 40px;
                    cursor: pointer;
                    .am-icon {
                        color: #c1c6c8;
                        margin-right: 8px;
                        background: #33414e;
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
                        .am-icon {
                            color: #fff;
                            background: none;
                        }
                        >span {
                            color: #fff;
                        }
                    }
                    &:not(.is-active):hover {
                        background: #33414e;
                    }
                }
            }
        }
    }

    &__bottom {
        background: #141a1f;
        padding: 24px 0;
    }
    &__log-card {
        padding: 0 40px;
        margin-bottom: 24px;
        .hd {
            display: flex;
            justify-content: space-between;
            margin-bottom: 8px;
            .left {
                font-size: 12px;
                font-weight: bold;
                color: #999;
            }
            .right {
                
            }
        }
        .bd {
            display: flex;
            flex-direction: column;
            .progress {
                width: 100%;
                height: 4px;
                background: #445565;
                margin-bottom: 4px;
                display: flex;
                border-radius: 4px;
                overflow: hidden;
                i {
                    width: 60%;
                    height: 100%;
                    background: #5dca73;
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
    &__user-card {
        display: flex;
        padding: 0 40px;
        width: 100%;
        align-items: center;
        justify-content: space-between;
        .left {
            margin-right: 8px;
            display: flex;
            align-items: center;
            div {
                width: 30px;
                height: 30px;
                border-radius: 50%;
                background: #5471f9;
                color: #fff;
                display: flex;
                align-items: center;
                justify-content: center;
                margin-right: 8px;
            }
            span {
                font-size: 14px;
                font-weight: 600;
                color: #fff;
            }
        }
        .right {
            display: flex;
            font-size: 14px;
            align-items: baseline;
            .am-icon-button {
                border: none;
                color: #999;
                background: #000;
            }
        }
    }
}
</style>