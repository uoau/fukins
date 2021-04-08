const fs = require('fs');
const simpleGit = require('simple-git');
const shell = require('shelljs');

function runPromiseByQueue(promiseArr){
    await promiseArr.reduce((prePromise, nowPromise) => {
        return prePromise.then(() => nowPromise());
    }, Promise.resolve());
}

function init(app){
    app.fukinsTasks = {};
    // 获取 taskfile
    const taskFiles = await fs.readdirSync(path.join(__dirname, '../data/tasks'));
    await runPromiseByQueue(taskFiles.map((taskFile)=>{
        return async () => {
            // 文件名
            taskName = taskFile.name;
            // 任务配置\配置内容检测
            taskConfig = JSON.parse(taskFile);
            const { pipeline } = taskConfig;
            // 任务挂载
            app.fukinsTasks[taskName] = taskConfig;
            // 创建git仓库
            const git = simpleGit('/some/path', { binary: 'git' });
            taskConfig.schedule = schedule.scheduleJob('42 * * * *', function() {
                taskConfig.pipeline.
            });
            runPromiseByQueue(pipeline.map((pipe)=>{
                pipe.name // 流程名
                shell(pipe.sh); // 执行流水线代码
            }));
        }
    }));
}

module.exports = init;



init();
// 初始化
const fs = require('fs');
const taskFiles = await fs.readdirSync(path.join(__dirname, '../../data/tasks'));
taskFiles => task;

// 在workspace克隆仓库


// 生成一个计时器表
scheduleMap

// 轮询去执行git，看看版本是否有更新
const schedule = require('node-schedule');

