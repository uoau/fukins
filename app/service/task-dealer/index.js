const { runPromiseByQueue } = require('../../utils/index');
const { exec, spawnSync } = require('child_process');
const fs = require('fs');
const path = require('path');
const dayjs = require('dayjs');
const execSh = require("exec-sh");
const execa = require('execa');

// (async ()=> {
//     console.log('start');
//     await new Promise(async (resolve,reject) => {
//         const ls = execSh(`sleep 3
// node -v
// unddd zz`,true);
//         ls.stdout.on('data', (data) => {
//             console.log(`stdout: ${data}`);
//         });
//         ls.on('close', (code) => {
//         console.log(`子进程使用代码 ${code} 关闭所有 stdio`);
//         });

//         ls.stderr.on('data', (data) => {
//             console.log(`错误`,data);
//         });
        
//         ls.on('exit', (code) => {
//         console.log(`子进程使用代码 ${code} 退出`);
//         });

//         resolve();
//     });
//     console.log('end')
// })();

/* 
 * 任务处理者
 */
class TaskDealer {
    constructor(){
        this.taskList = [];
        this.taskState = 'pending'; // pending running
    }
    addTask(task){
        // console.log('# 新增任务', task);
        if(this.taskList.findIndex((t) => t.taskId === task.taskId) > -1){
            return '任务正在执行';
        }
        this.taskList.push(task);
        this.nextTask();
    }
    async runTask(task){
        this.taskState = 'pending';
        const taskId = task.taskId;
        const start = dayjs().valueOf();
        const filePath = path.join(__dirname, `../../../data/logs/${taskId}|${start}.json`);
        let fail = false;
        let log = {
            list: [],
        };
        console.log('# 任务处理开始');
        // 执行每个阶段
        for(let i =0; i< task.pipeline.length; i++) {
            const pipe = task.pipeline[i];
            const sh = pipe.sh;
            log.list[i] = {
                step: pipe.name,
                content: '',
            };
            // 执行sh
            try {
                await new Promise((resolve, reject) => {
                    const shProcess = execSh(sh, true);
                    shProcess.stdout.on('data',(data) => {
                        // 标准输出
                        log.list[i].content += data;
                    });
                    shProcess.stderr.on('data',(buffer) => {
                        // 错误输出
                        log.list[i].content += buffer.toString();
                    });
                    shProcess.on('exit',(code) => {
                        // 进程结束
                        console.log('# exit code',code);
                        if(code !== 0) {
                            reject();
                        }
                        resolve();
                    });
                    shProcess.on('error',(err) => {
                        // 发送错误
                        reject();
                    });
                })
            }catch(e) {
                fail = true;
            }
            // 写入日志
            await fs.writeFileSync(filePath, JSON.stringify(log, null, 4));
            if(fail) {
                break;
            }
        }
        // 在文件名写入结束日期，状态
        const end = dayjs().valueOf();
        await fs.renameSync(filePath, path.join(__dirname, `../../../data/logs/${taskId}|${start}|${end}|${fail ? 'fail':'success'}.json`));
        // 清除多余的日志文件
        console.log('# 任务处理结束');
        this.nextTask();
    }
    nextTask(){
        if(this.taskState === 'pending' && this.taskList.length){
            const task = this.taskList[0];
            this.taskList.splice(0,1);
            this.runTask(task);
        }
    }
}
const taskDealer = new TaskDealer();

module.exports = taskDealer;
