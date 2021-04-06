<template>
    <div class="m-page-header">
        <div class="m-page-header__left">
            <h1>{{ title }}</h1>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        title: {
            type: String,
            default: '页面标题'
        }
    }
}
</script>

<style lang="less">
.m-page-header {
    padding: 24px 0 12px 0;
    margin-bottom: 24px;
    border-bottom: 1px solid var(--border);
    &__left {
        >h1 {
            font-size: 24px;
        }
    }
}
</style>