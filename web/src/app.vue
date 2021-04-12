<template>
    <div class="app">
        <div class="app-inner">
            <!-- 左布局 -->
            <div class="app-left">
                <Nav />
            </div>
            <!-- 右布局 -->
            <div class="app-right">
                <RouterView />
            </div>
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
    overflow: hidden;
}
.app {
    background: #f3f4f7;
    height: 100%;
    overflow: auto;
    .app-inner {
        width: 100%;
        padding-left: calc(100vw - 100% + 320px);
    }
    .app-left {
        width: 320px;
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