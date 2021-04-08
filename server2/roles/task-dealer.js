const fork = require('child_process').fork;	
const path = require('path');
const runShWork = fork(path.join(__dirname, '../works/run-sh'));

/* 
 * 任务处理者
 */
class TaskDealer {
    constructor(){
        this.taskList = [];
        this.taskState = 'pending'; // pending running

        runShWork.on('message', log => {	
            console.log('# 任务完成',log);
            // 执行完成
            this.nextTask();	
        });
    }
    addTask(task){
        console.log('# 新增任务', task);
        if(this.taskList.findIndex((t) => t.taskId === task.taskId) > -1){
            return '任务正在执行';
        }
        this.taskList.push(task);
        this.nextTask();
    }
    async runTask(task){
        this.taskState = 'pending';
        runShWork.send(task);
    }
    nextTask(){
        if(this.taskState === 'pending' && this.taskList.length){
            this.runTask(this.taskList[0]);
        }
    }
}
const taskDealer = new TaskDealer();

module.exports = taskDealer;

