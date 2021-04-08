const fs = require('fs');
const path = require('path');
const { runPromiseByQueue } = require('../utils/index');

/*
 * [DEL] 删除日志
 */
module.exports.delLog = async (ctx) => {
    const { taskId, logDateList } = ctx.request.body;
    await runPromiseByQueue(logDateList.map((logDate) => {
        return async ()=>{
            await fs.unlinkSync(path.join(__dirname, '../../data/logs', `${taskId}|${logDate}.json`));    
        } 
    }));

    ctx.success();
}

/**
 * [POST] 获取日志内容 
 */
 module.exports.getTaskLog = async (ctx) => {
    const { taskId,logDate } = ctx.request.body;
    const log = await fs.readFileSync(path.join(__dirname, `../../data/tasks/${taskId}|${logDate}.json`));
    
    ctx.success({
        log,
    });
}