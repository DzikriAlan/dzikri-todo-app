
import { createRouter, createWebHistory } from 'vue-router';
import Login from '../pages/Login.vue';
import Register from '../pages/Register.vue';
import Checklists from '../pages/Checklists.vue';
import { requireAuth } from './auth';


const routes = [
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  },
  {
    path: '/checklists',
    name: 'Checklists',
    component: Checklists,
    beforeEnter: requireAuth,
  },
  { 
    path: '/', 
    redirect: '/checklists' 
  },
];


const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token');
  const isAuthPage = to.name === 'Login' || to.name === 'Register';

  if (!token && isProtected) {
    return next({ name: 'Login' });
  }
  if (token && isAuthPage) {
    return next({ name: 'Checklists' });
  }
  next();
});

export default router;
