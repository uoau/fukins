import Vue from 'vue';
import VueRouter from 'vue-router';
import routes from './routes';
import '../../../all-mine/lib/index.css';
import '@/index.less';
import allMine from '../../../all-mine/lib/index';
import App from './app.vue';

Vue.use(allMine);
Vue.use(VueRouter);

const app = new Vue({
    router: new VueRouter({
        routes,
        mode: 'hash',
    }),
    render: (h) => h(App),
}).$mount('#app');

