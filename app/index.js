const httpServer = require('./service/http');
const taskDealer = require('./service/task-dealer');
const ws = require('./service/websocket');

const FUKINS = {
    httpServer,
    taskDealer,
    ws,
};

global.FUKINS = FUKINS;
