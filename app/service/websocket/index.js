const WebSocket = require('ws');

const ws = new WebSocket.Server({
    port: 9401
});

module.exports = ws;
