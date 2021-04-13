import Vue from 'vue';
import VueRouter from 'vue-router';
import routes from './routes';
import '../../../all-mine/lib/index.css';
import '@/index.less';
import allMine from '../../../all-mine/packages/index';
import App from './app.vue';
import createWebSocket from './utils/websocket';

Vue.use(allMine);
Vue.use(VueRouter);

window.ws = createWebSocket('ws://localhost:9401');

new Vue({
    router: new VueRouter({
        routes,
        mode: 'hash',
    }),
    render: (h) => h(App),
}).$mount('#app');