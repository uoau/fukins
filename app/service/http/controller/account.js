const fs = require('fs');
const config = require('../../../../data/config/global');
const jwt = require('jsonwebtoken');

module.exports.login = async (ctx) => {
    const { account, password } = ctx.request.body;
    // 读取文件
    let accountList = await fs.readFileSync(path.join(__dirname, '../../../../data/config/account.json'));
    accountList = JSON.parse(accountJson);
    const accountIndex = accountList.findIndex((i) => {
        return i.account === account && i.password === password;
    })
    if(accountIndex > -1) {
        const token = jwt.sign({
            account, 
        }, config.secret);
        ctx.success({
            token,
        });
        return;
    }
    ctx.fail();
}