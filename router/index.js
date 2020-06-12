import Vue from 'vue'
import VueRouter from 'vue-router'
import firebase from 'firebase'

import landingPage from '../components/landing/landing_page.vue'
import slogan from '../components/landing/branch/slogan.vue'
import login from '../components/landing/branch/login.vue'
import register from '../components/landing/branch/register.vue'
import resetPassword from '../components/landing/branch/auth/reset_password.vue'
import verifyEamil from '../components/landing/branch/auth/verify_email.vue'

import containerPage from '../components/main/container.vue'
import schedule from '../components/main/branch/schedule/schedule.vue'
import calendar from '../components/main/branch/calendar/calendar.vue'
import taskBoard from '../components/main/branch/task_management/task_board.vue'
import setting from '../components/main/branch/setting/setting.vue'
import timetable from '../components/main/branch/calendar/branch/timetable.vue'
import support from '../components/main/branch/support/support.vue'
import notFound from '../components/template/404error.vue'


import store from '../store/index.js'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'landingPage',
    component: landingPage,
    meta: { requiresAuth : false },
    children:[
      {
        path:'/',
        name:'slogan',
        component:slogan,
        meta: { requiresAuth : false },
      },
      {
        path:'login',
        name:'login',
        component:login,
        meta: { requiresAuth : false },
      },
      {
        path:'register',
        name:'register',
        component:register,
        meta: { requiresAuth : false },
      },
      {
        path:'resetPassword',
        name:'resetPassword',
        component:resetPassword ,
        meta: { requiresAuth : false },
      },      
      {
        path:'verifyEamil',
        name:'verifyEamil',
        component:verifyEamil ,
        meta: { requiresAuth : false },
      },         
    ]
  },
  {
    path:'/home',
    name:'container',
    component:containerPage,
    meta: { requiresAuth : true },
    children:[
      {
        path:'/',
        name:'home',
        component:schedule,
        meta: { requiresAuth : true },
      },
      {
        path:'calendar',
        name:'calendar',
        component:calendar,
        meta: { requiresAuth : true },
        children:[
          
        ]
      },
      {
        path:'timetable/:year/:month/:day',
        name:'timetable',
        component:timetable,
        meta: { requiresAuth : true },

      },
      {
        path:'taskBoard',
        name:'taskBoard',
        component:taskBoard,
        meta: { requiresAuth : true },
      },
      {
        path:'setting',
        name:'setting',
        component:setting,
        meta: { requiresAuth : true },
      },
      {
        path:'support',
        name:'support',
        component:support,
        meta: { requiresAuth : true },
      },     
    ]
  },
  {
    path:'*',
    name:'notFound',
    component:notFound,
    meta: { requiresAuth : false },    
  }


]

const router = new VueRouter({
  routes,
  mode:'history'
})

router.beforeEach((to,from,next) => {

  if(to.meta.requiresAuth){

    if(!firebase.auth().currentUser){
      next({path:'/'});
    }
    else{
      
      if(store.state.mobileMenuShow && window.matchMedia("(max-width: 550px)".matches)){
        store.commit('toggleMobileMenuStatus');
      }
      
      next();
    }
  }
  else{
    next();
  }
});
export default router
