const fs = require('fs');
const path = require('path');
const shell = require('shelljs');
const { runPromiseByQueue } = require('../utils/index');

/*
 * 推送任务给 taskDealer
 */
process.on('message',async (task) => {
    // 执行代码
    const log = {
        date: new Date(),
        list: [],
    };
    await runPromiseByQueue(task.pipeline.map((pipe)=>{
        return async () => {
            const pipeLog = {};
            pipeLog.output = '';
            pipeLog.name = pipe.name;
            const shs = pipe.sh.split(/\n/);
            await runPromiseByQueue(shs.map((sh)=>{
                return async () => {
                    pipeLog.output += await shell.exec(pipe.sh);
                }
            }))
            log.list.push(pipeLog);
        }
    }));
    process.send(log);
})