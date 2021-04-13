// 权限中间件
const jwt = require('jsonwebtoken');
const config = require('../../../../data/config/global');
const fs = require('fs');

function auth(ctx, next) {
    if ((/\/api\/t\//).test(ctx.url)) {
        // 需要token
        const token = ctx.request.header.authorization;
        console.log(token);
        let account = '';
        try {
            account = jwt.verify(token, config.secret).account;
        } catch (err) {
            ctx.fail('登录已失效', null, 20001);
            return;
        }
        let accountList = await fs.readFileSync(path.join(__dirname, '../../../../data/config/account.json'));
        accountList = JSON.parse(accountJson);
        if(accountList.findIndex(i => i.account === account) < 0){
            ctx.fail('登录已失效');
            return;
        }
    } else if ((/\/user\//).test(ctx.url)) {
        // 用户登录后才能用的接口
        ctx.redirect('/login');
    }
    await next();
};

module.exports = auth;

