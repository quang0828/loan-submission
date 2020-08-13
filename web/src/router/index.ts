import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import { Login, Loans, LoanCreate } from '../views';
import { getItem } from '@/utils/storage';

Vue.use(VueRouter)

  const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'login',
    component: Login,
  },
  {
    path: '/loans',
    name: 'loans',
    component: Loans,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/loan-create',
    name: 'loanCreate',
    component: LoanCreate,
    meta: {
      requiresAuth: true
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if(to.matched.some(record => record.meta.requiresAuth)) {
    if (!getItem('token')) {
      next({
        name: 'login',
        params: { nextUrl: to.fullPath }
      })
    } else {
      next()
    }
  } else if (to.matched.some(record => record.name === 'login')) {
    if (getItem('token')) {
      next({
        name: 'loans',
        params: { nextUrl: to.fullPath }
      })
    } else {
      next()
    }
  } else {
    next()
  }
});

export default router