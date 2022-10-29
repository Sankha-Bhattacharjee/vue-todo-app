import Vue from 'vue'
import VueRouter from 'vue-router'
import Todo from '../views/Todo.vue'
import About from '../views/About.vue'
import UserAuth from '../views/UserAuth.vue'
import store from '../store/index.js'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'Todo',
        component: Todo 
    },
    {
        path: '/about',
        name: 'About',
        component: About
    },
    {
        path: '/auth',
        name: 'UserAuth',
        component: UserAuth,
        meta: {requiresUnAuth: true}
    }
];

const router = new VueRouter({
    routes
});

router.beforeEach(function(to, from, next){
    if(to.meta.requiresUnAuth && store.getters.getIsAuthenticated){
        console.log("already logged in!");
        next('/');
    }else{
        next();
    }
});

export default router;