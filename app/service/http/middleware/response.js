
/**
 * response响应 中间件封装
 */
async function response(ctx, next) {
    ctx.success = function (data, msg) {
        ctx.type = "json";
        ctx.body = {
            code: 200,
            msg: msg || 'success',
            data: data,
        };
    };

    ctx.fail = function (msg, code) {
        ctx.type = "json";
        ctx.body = {
            code: code || 10000,
            msg: msg || 'fail',
        };
    };

    await next();
};
  
module.exports = response;
  