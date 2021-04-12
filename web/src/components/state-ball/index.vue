<template>
    <div 
        class="m-state-ball"
        :class="{
            [`is-${state}`]: state,
        }"
    >
        <b class="m-state-ball__ball"><i></i></b>
        <p class="m-state-ball__text"><slot /></p>
    </div>
</template>

<script>
export default {
    props: {
        state: {
            type: String,
            default: '',
        }
    }
}
</script>

<style lang="less">
.m-state-ball {
    display: flex;
    align-items: center;
    &__ball {
        display: inline-flex;
        width: 10px;
        height: 10px;
        position: relative;
        i {
            display: inline-flex;
            width: 10px;
            height: 10px;
            border-radius: 50%;
        }
    }
    > p {
        font-size: 14px;
        margin-left: 4px;
    } 
    &.is-success {
        .m-state-ball__ball {
            i {
                background: #27ae60;
            }
        }
    }
    &.is-fail {
        .m-state-ball__ball {
            i {
                background: red;
            }
        }
    }
    &.is-running {
        .m-state-ball__ball {
            i {
                background: #f2b14a;
                z-index: 2;
            }
            &:before {
                content: '';
                display: inline-flex;
                position: absolute;
                left: 0;
                top: 0;
                width: 100%;
                height: 100%;
                border-radius: 50%;
                z-index: 1;
                animation: bigandsmall 2s infinite;
                border: 3px solid #f2b14a;
                box-sizing: border-box;
                transform: scale(0);
                
            }
        }
    }
    @keyframes bigandsmall {
        0% {
            transform: scale(0);
            opacity: 1;
        }
        100% {
            transform: scale(3);
            opacity: 0;
        }
      
    }
}
</style>