const httpServer = require('./service/http');
// const taskDealer = require('./service/task-dealer');
const ws = require('./service/websocket');

const { exec } = require('child_process');

exec('git --version & ls & sleep 3', (error, stdout, stderr) => {
    if (error) {
      console.error(`执行的错误: ${error}`);
      return;
    }
    console.log(`stdout: ${stdout}`);
    console.error(`stderr: ${stderr}`);
});
console.log(123)


const FUKINS = {
    httpServer,
    // taskDealer,
    ws,
};
this.FUKINS = FUKINS;
