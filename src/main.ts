import {createApp} from 'vue'
import App from './App.vue'
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import routes from './config/router';
import * as VueRouter from 'vue-router'
import {RouterOptions} from 'vue-router'
import * as ElementPlusIconsVue from '@element-plus/icons-vue';


const app = createApp(App);

const router = VueRouter.createRouter({
    history: VueRouter.createWebHashHistory(),
    routes,
} as unknown as RouterOptions)

// 注册所有图标组件
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component);
}
app.use(ElementPlus);
app.use(router);
app.mount('#app');
