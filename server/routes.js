const router = require("koa-router")();
const Page = require('./controller/page');
const Task = require('./controller/task');

// 页面
router.get("/", Page.home); // 首页

// githook
// router.post("/api/githook/:taskName", task.githook);

// 任务
router.get("/api/tasks", Task.getTasks); // 任务列表
router.get("/api/task/config/:taskName", Task.getTaskConfig); // 任务配置
router.post("/api/task/start", Task.startTask); // 立即构建

// 二期接口
// router.del("/api/task/:id", article.deleteTask); // 删除任务
// router.post("/api/task/:id/logs", ); // 日志列表
// router.post("/api/task/:id/log/:logid", ); // 日志详情

module.exports = router;
