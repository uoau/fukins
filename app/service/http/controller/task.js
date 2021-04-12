const fs = require('fs');
const path = require('path');
const shell = require('shelljs');
const { runPromiseByQueue } = require('../../../utils/index');

/**
 * [POST] 立即执行任务
 */
module.exports.startTask = async (ctx) => {
    const { taskId } = ctx.request.body;
    let taskConfig = await fs.readFileSync(path.join(__dirname, `../../../../data/tasks/${taskId}.json`));
    taskConfig = JSON.parse(taskConfig);
    const task = {
        taskId,
        pipeline: taskConfig.pipeline,
    };
    const failMsg = global.FUKINS.taskDealer.addTask(task);
    if(failMsg) {
        ctx.fail(failMsg);
        return;
    }
    ctx.success();
};

/**
 * [POST] 新增 / 修改任务
 */
module.exports.editTask = async (ctx) => {
    const {
        // 基础信息 
        id,
        name,
        usage,
        // 触发器
        triggerType,
        webhookMethod,
        webhookParams,
        scheduleSet,
        scheduleCode,
        // 执行代码
        pipeline,

        mode,
    } = ctx.request.body;

    console.log(name,id,usage);

    // 校验
    if(mode === 'add' && await fs.existsSync(path.join(__dirname, `../../../../data/tasks/${id}.json`))){
        ctx.fail('id已存在');
    }

    // 文件写入信息
    await fs.writeFileSync(
        path.join(__dirname, `../../../../data/tasks/${id}.json`), 
        JSON.stringify({
            name,
            usage,
            triggerType,
            webhookMethod,
            webhookParams,
            scheduleSet,
            scheduleCode,
            pipeline,
        },null,4),
    );
    ctx.success();
};


/**
 * [DEL] 删除任务
 */
 module.exports.delTask = async (ctx) => {
    const { taskId } = ctx.request.body;
    const taskLogFileNames = await fs.readdirSync(path.join(__dirname, `../../../../data/logs`));
    // 删除日志
    const thisTaskLogFileNames = taskLogFileNames
        .filter((taskLogFileName) => taskLogFileName.split('|')[0] === taskId);
    await runPromiseByQueue(thisTaskLogFileNames.map((thisTaskLogFileName) => {
        return async ()=>{
            await fs.unlinkSync(path.join(__dirname, '../../../../data/logs', thisTaskLogFileName));    
        } 
    }));
    // 删除配置
    await fs.unlinkSync(path.join(__dirname, '../../../../data/tasks', `${taskId}.json`));
    ctx.success();
};

/**
 * [GET] 获取所有任务信息
 */
 module.exports.getTasks = async (ctx) => {
    // 请求 data/tasks 文件下所有任务
    const taskFileNames = await fs.readdirSync(path.join(__dirname, `../../../../data/tasks`));
    const taskLogFileNames = await fs.readdirSync(path.join(__dirname, `../../../../data/logs`));
    const list = [];
    await runPromiseByQueue(taskFileNames.map((taskFileName)=>{
        return async ()=> {
            /*
             * taskId 任务id
             * name 任务名
             * triggerType 触发类型
             * taskLogList: [{ 日志列表
             *    state: '', // 状态 'running' 'end‘
             *    start: '', // 开始时间
             *    end: '',   // 结束时间
             * }]
             */
            const obj = {};
            const taskId = taskFileName.match(/(.*)\.json/)[1];
            let taskConfig = await fs.readFileSync(path.join(__dirname, `../../../../data/tasks/${taskFileName}`));
            taskConfig = JSON.parse(taskConfig);
            obj.id = taskId; // 任务id
            obj.name = taskConfig.name; // 任务名
            // 获取所有日志信息
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
            obj.taskLogList = taskLogList;
            obj.triggerType = taskConfig.triggerType; // trigger类型
            list.push(obj);
        }
    }));
    ctx.success({
        list,
    })
};

/**
 * [GET] 获取任务配置
 */
module.exports.getTaskConfig = async (ctx) => {
    const { taskName } = ctx.request.params;
    let taskConfig = await fs.readFileSync(path.join(__dirname, `../../../../data/tasks/${taskName}.json`));

    ctx.success({
        config: JSON.parse(taskConfig)
    })
};

/**
 * [GET] 触发webhook
 */
module.exports.triggerGetWebhook = async (ctx) => {

};

/**
 * [POST]] 触发webhook
 */
module.exports.triggerPostWebhook = async (ctx) => {

};