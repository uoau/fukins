import taskList from './pages/task-list';
import taskConfig from './pages/task-config';
import taskLog from './pages/task-log';
import taskLogs from './pages/task-logs';
import login from './pages/login';

export default [
    {
        path: '/',
        redirect: {
            path: '/task-config',
        },
    },
    {
        path: '/task-list',
        component: taskList,
    },
    {
        path: '/task-config',
        component: taskConfig,
    },
    {
        path: '/task-log',
        component: taskLog,
    },
    {
        path: '/task-logs',
        component: taskLogs,
    },
    {
        path: '/login',
        component: login,
    },
]