<template>
    <div class="m-logo">
        <div class="logo">
            <i class="i1"></i>
            <i class="i2"></i>
            <i class="i3"></i>
        </div>
        <p>内务府</p>
    </div>
</template>

<style lang="less">
.m-logo {
    display: flex;
    align-items: center;
    .logo {
        width: 25px;
        height: 30px;
        position: relative;
        i {
            display: inline-flex;
        }
        .i1 {
            width: 25px;
            height: 30px;
            border-top: 3px solid #f55156;
            border-left: 3px solid #f55156;
            border-right: 3px solid #f55156;
        }
        .i2 {
            width: 3px;
            height: 10px;
            background: #f55156;
            position: absolute;
            transform: rotate(45deg);
            top: 10px;
            left: 8px;
        }
        .i3 {
            width: 3px;
            height: 10px;
            background: #f55156;
            position: absolute;
            transform: rotate(-45deg);
            top: 10px;
            right: 8px;
        }
    }
    p {
        font-size: 18px;
        font-weight: bold;
        margin-left: 12px;
        color: #fff;
    }
}
</style>