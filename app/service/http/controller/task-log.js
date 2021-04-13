const fs = require('fs');
const path = require('path');
const { runPromiseByQueue } = require('../../../utils/index');

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
 * [GET] 获取日志列表 
 */
 module.exports.getTaskLogs = async (ctx) => {
    const { taskId } = ctx.request.body;
    const taskLogFileNames = await fs.readdirSync(path.join(__dirname, `../../../../data/logs`));
    const taskLogList = taskLogFileNames
        .filter((taskLogFileName) => taskLogFileName.split('|')[0] === taskId)
        .map((taskLogFileName) =>{
            const taskLogMatch = taskLogFileName.match(/(.*)\.json/)[1].split('|');
            const start = taskLogMatch[1];
            const end = taskLogMatch[2];
            const state = !end ? 'running' : taskLogMatch[3]; // pending success fail
            return {
                taskLogFileName, 
                start,
                end,
                state,
            };
    }).sort((a,b)=>{
        return a.start - b.start;
    });

    ctx.success({
        list: taskLogList,
    });
}

/**
 * [POST] 获取日志详情
 */
 module.exports.getTaskLog = async (ctx) => {
    const { taskId,logDate } = ctx.request.body;
    const log = await fs.readFileSync(path.join(__dirname, `../../data/tasks/${taskId}|${logDate}.json`));
    
    ctx.success({
        log,
    });
}