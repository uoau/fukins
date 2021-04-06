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
                    'is-active': index === 0
                }"
            >
                <AmIcon name="close" />
                <span>{{ item.name }}</span>
            </div>
        </div>
    </div>    
</template>

<script>
export default {
    data(){
        return {
            nav: [{
                name: '任务列表',
            }, {
                name: '全局配置'
            }]
        }
    },
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
            .am-icon {
                color: #fff;
                margin-right: 8px;
            }
            >span {
                color: #fff;
                font-size: 14px;
            }
            &.is-active {
                background: #444;
                border-radius: 4px;
                .am-icon {
        
                }
                >span {

                }
            }
        }
    }
}
</style>