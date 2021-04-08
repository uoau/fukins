<template>
    <div class="m-nav">
        <!-- Logo -->
        <div class="m-logo">
            Fukins
        </div>
        <!-- 栏目 -->
        <div class="m-list">
            <div 
                v-for="(item,index) in nav"
                :key="index"
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

        <!--  -->
    </div>    
</template>

<script>
export default {
    data(){
        return {
            nav: [{
                name: '任务列表',
                icon: 'commode2',
                to: '/task-list'
            }, {
                name: '全局配置',
                icon: 'component',
                to: '/global-config'
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
    background: #2c2e34;
    .m-logo {
        padding: 32px;
        color: #fff;
        font-size: 24px;
        font-weight: bold;
    }
    .m-list {
        padding: 0 32px;
        .item {
            height: 40px;
            display: flex;
            align-items: center;
            padding: 0 8px;
            margin-bottom: 8px;
            border-radius: 4px;
            transform: background .2s;
            cursor: pointer;
            .am-icon {
                color: #878787;
                margin-right: 8px;
            }
            >span {
                color: #878787;
                font-size: 14px;
            }
            &.is-active {
                background: #444;
                .am-icon {
                    color: #fff;
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
</style>