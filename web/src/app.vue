<template>
    <div class="app">
        <!-- 左布局 -->
        <div class="app-left">
            <Nav />
        </div>
        <!-- 右布局 -->
        <div class="app-right">
            <RouterView />
        </div>
    </div>
</template>

<script>
import Nav from './components/nav';
export default {
    components: {
        Nav,
    },
}
</script>

<style lang="less">
html, body {
    width: 100%;
    height: 100%;
}
.app {
    width: 100%;
    height: 100%;
    display: flex;
    background: #fff;
    padding-left: calc(100vw - 100% + 340px);
    .app-left {
        width: 340px;
        height: 100%;
        position: fixed;
        left: 0;
        top: 0;
    }
    .app-right {
        flex: 1;
        min-height: 100%;
    }
}
.fade-enter-active, .fade-leave-active {
  transition: opacity .3s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>