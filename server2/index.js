const Koa = require("koa");
const bodyParser = require("koa-bodyparser");
const routes = require("./routes").routes();
const cors = require('koa2-cors');
const response = require("./middleware/response");
const WebSocket = require('ws');
const app = {};
this.app = app;

// task dealer server
app.taskDealer = require('./roles/task-dealer');

// ws server
app.ws = new WebSocket.Server({
    port: 9401
});

// http server
app.httpServer = new Koa();
app.httpServer
    .use(cors({
        origin: function(){
            return '*';
        },
        exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'],
        maxAge: 5,
        credentials: true,
        allowMethods: ['GET', 'POST', 'DELETE'],
        allowHeaders: ['Content-Type', 'Authorization', 'Accept'],
    }))
    .use(response)
    .use(bodyParser())
    .use(routes);
app.httpServer.listen(9400);
console.log(this);

