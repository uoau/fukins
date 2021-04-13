<template>
    <div class="m-fold-bar">
        <div class="m-fold-bar__hd" @click="clickHd">
            <div class="m-fold-bar__hd-left">
                {{ title }}
            </div>
            <div class="m-fold-bar__hd-right">

            </div>
        </div>
        <div class="m-fold-bar__bd" v-show="show">
            <div class="m-fold-bar__bd-inner">
                <slot />
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        title: String,
    },
    data(){
        return {
            show: true, 
        }
    },
    methods: {
        clickHd(){
            this.show = !this.show;
        }
    }
}
</script>

<style lang="less">
.m-fold-bar {
    &__hd {
        font-size: 12px;
        font-weight: bold;
        background: #f7f7f7;
        padding: 6px;
        color: #333;
        border-bottom: 1px solid var(--border);
        &-left {

        }
        &-right {

        }
    }
    &__bd {
        &-inner {
            padding: 16px;
        }
    }
}
</style>