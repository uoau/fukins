const router = require("koa-router")();
const Page = require('./controller/page');
const Task = require('./controller/task');
const TaskLog = require('./controller/task-log');
const Account = require('./controller/account');

// 页面
router.get("/", Page.home); // 首页

// 登录
router.post("/api/login",Account.login);

// webhook
router.post("/api/t/webhook/:taskName", Task.triggerGetWebhook);
router.get("/api/t/webhook/:taskName", Task.triggerGetWebhook);

// 任务
router.get("/api/t/tasks", Task.getTasks); // 获取任务列表
router.get("/api/t/task/config/:taskName", Task.getTaskConfig); // 获取任务配置
router.post("/api/t/task/config", Task.editTask); // 新增/编辑任务
router.del("/api/t/task/config", Task.delTask); // 删除任务

router.delete("/api/t/task/log", TaskLog.delLog); // 删除日志
router.post("/api/t/task/config", TaskLog.getTaskLog); // 获取日志详情

router.post("/api/t/task/start", Task.startTask); // 立即构建

module.exports = router;
