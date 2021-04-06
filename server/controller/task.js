const fs = require('fs');
const path = require('path');
const shell = require('shelljs');
const { runPromiseByQueue } = require('../utils/index');

/**
 * [GET] 获取所有任务信息
 */
module.exports.getTasks = async (ctx) => {
    // 请求 data/tasks 文件下所有任务
    let taskFileNames = await fs.readdirSync(path.join(__dirname, `../../data/tasks`));
    const list = [];
    await runPromiseByQueue(taskFileNames.map((taskFileName)=>{
        return async ()=> {
            const obj = {};
            let taskConfig = await fs.readFileSync(path.join(__dirname, `../../data/tasks/${taskFileName}`));
            taskConfig = JSON.parse(taskConfig);
            obj.name = taskFileName.match(/(.*)(\.json)/)[1]; // 任务名
            obj.triggerType = taskConfig.triggerType; // trigger类型
            list.push(obj);
        }
    }));
    ctx.body = list;
};

/**
 * [GET] 获取任务配置
 */
module.exports.getTaskConfig = async (ctx) => {
    const { taskName } = ctx.request.params;
    let taskConfig = await fs.readFileSync(path.join(__dirname, `../../data/tasks/${taskName}.json`));

    ctx.body = taskConfig;
};

/**
 * [POST] 立即执行任务
 */
module.exports.startTask = async (ctx) => {
    const { taskName } = ctx.request.body;
    let taskConfig = await fs.readFileSync(path.join(__dirname, `../../data/tasks/${taskName}.json`));
    taskConfig = JSON.parse(taskConfig);
    const log = {
        date: new Date(),
        list: [],
    };
    await runPromiseByQueue(taskConfig.pipeline.map((pipe)=>{
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

    ctx.body = log;
};

/**
 * [DEL] 删除任务
 */
 module.exports.deletTask = async (ctx) => {

    ctx.body = log;
};