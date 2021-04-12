<template>
    <div class="page-login">
        <div class="m-login">
            <Logo />
            <!-- <div class="title">登录</div> -->
            <AmForm position="top">
                <AmFormItem label="账号">
                    <AmInput v-model="account"/>
                </AmFormItem>
                <AmFormItem label="密码">
                    <AmInput v-model="password"/>
                </AmFormItem>
            </AmForm>
            <AmButton type="primary" class="submit" @click="submit">登录</AmButton>
            <p class="intro">账号在 data/config/account.json 配置</p>
        </div>
    </div>
</template>

<script>
import Logo from '../../components/logo';
import { post } from '@/utils/fetch';

export default {
    components: {
        Logo,
    },
    data(){
        return {
            account: '',
            password: '',
        }
    },
    methods: {
        async submit(){
            const res = await post('http://localhost:9400/api/login',{
                account: this.account,
                password: this.password,
            });
            localStorage.setItem('token', res.token);
        }
    }
}
</script>

<style lang="less">
.page-login {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    .m-login {
        width: 350px;
        height: 450px;
        background: #fff;
        padding: 40px;
        // border-radius: 10px;
        // border: 1px solid #ddd;
        .m-logo {
            margin-bottom: 24px;
        }
        .title {
            font-size: 20px;
            margin-bottom: 24px;
        }
        .intro {
            font-size: 14px;
            margin-bottom: 8px;
            color: #999;
            margin-top: 8px;
        }
        .am-form {
            &-item {
                &__bd {
                    width: 100%;
                    .am-input {
                        width: 100%;
                    }
                }
            }
        }
        .submit {
            width: 100%;
        }
    }
}
</style>