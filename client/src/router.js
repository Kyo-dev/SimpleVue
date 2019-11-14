import Vue from 'vue'
import Router from 'vue-router'
import store from './store/store'

Vue.use(Router)

let router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import(/* webpackChunkName: "home" */ './views/Home.vue'),
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/login',
      name: 'login',
      component: () => import(/* webpackChunkName: "login" */ './views/Login.vue')
    },
    {
      path: '/empleado',
      name: 'empleado',
      component: () => import(/* webpackChunkName: "employee" */ './views/Employee.vue'),
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/bonos',
      name: 'bonos',
      component: () => import(/* webpackChunkName: "bonus" */ './views/Bonus.vue'),
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/permisos',
      name: 'permisos',
      component: () => import(/* webpackChunkName: "permits" */ './views/Permits.vue'),
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/incremento-salarial',
      name: 'incrementoSalarial',
      component: () => import(/* webpackChunkName: "incremento" */ './views/SalaryIncrease.vue'),
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/horas-extra',
      name: 'horasExtra',
      component: () => import(/* webpackChunkName: "overtime" */ './views/Overtime.vue'),
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/vacaciones',
      name: 'vacaciones',
      component: () => import(/* webpackChunkName: "holiday" */ './views/Holiday.vue'),
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/404Page',
      name: '404page',
      component: () => import(/* webpackChunkName: "login" */ './views/404Page.vue')
    },
    {
      path: '*',
      redirect: '/404Page',
    }
  ]
})

router.beforeEach((to, from, next) => {
  if(to.matched.some(record => record.meta.requiresAuth)) {
    if (store.getters.isLoggedIn) {
      next()
      return
    }
    next('/login') 
  } else {
    next() 
  }
})

export default router