import taskList from './pages/task-list';
import taskConfig from './pages/task-config';
import taskLog from './pages/task-log';

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
]