const Koa = require("koa");
const bodyParser = require("koa-bodyparser");
const routes = require("./routes").routes();
const cors = require('koa2-cors');
const response = require("./middleware/response");
const auth = require("./middleware/auth");

const app = new Koa();
app
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
    .use(auth)
    .use(bodyParser())
    .use(routes);
app.listen(9400);

module.exports = app;
