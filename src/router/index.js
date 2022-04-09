import { createRouter, createWebHistory } from 'vue-router';
import Home from '../pages/Home/index.vue';
import Create from "../pages/Create/index.vue";
import Config from "../pages/Config/index.vue";
import ArticleList from '../pages/Articlelist/index.vue';
const routes = [
    {
        path: '/add',
        name: 'Add',
        component: Create
    },
    {
        path: '/config',
        name: 'Config',
        component: Config
    },
    {
        path: '/articlelist',
        name: 'ArticleList',
        component: ArticleList,
    },
    {
        path: '/',
        name: 'Home',
        component: Home
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router;
