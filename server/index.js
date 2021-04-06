const Koa = require("koa");
const bodyParser = require("koa-bodyparser");
const routes = require("./routes").routes();
const cors = require('koa2-cors');

const app = new Koa();
app
    .use(cors())
    .use(bodyParser())
    .use(routes);

app.listen(9400);
