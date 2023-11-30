import Vue from 'vue'
import VueRouter from 'vue-router'
import Main from '../views/my-main.vue'
// import Home from '../views/my-home.vue'
// import User from '../views/my-user.vue'
// import Mall from '../views/my-mall.vue'
// import PageOne from '../views/my-pageone.vue'
// import PageTwo from '../views/my-pagetwo.vue'
import Vending from '../components/my-vendingMachine.vue'
import Login from '../views/my-login.vue'
import Cookie from 'js-cookie'

Vue.use(VueRouter)

//忘了new 直接炸裂
const router = new VueRouter({
  routes: [
    {
      path: '/', component: Main, name: 'main', redirect: 'login', children: [
        // { path: 'home', name: 'home', component: Home },
        // { path: 'user', name: 'user', component: User },
        // { path: 'mall', name: 'mall', component: Mall },
        // { path: 'page1', name: 'page1', component: PageOne },
        // { path: 'page2', name: 'page2', component: PageTwo },
      ]
    },
    { path: '/login', name: 'login', component: Login },
    { path: '/vending', name: 'vending', component: Vending },
  ]
})

router.beforeEach((to, from, next) => {
  const token = Cookie.get('token')
  if (!token && to.path !== '/login' && to.path !== '/vending') {
    next({ name: 'login' })
  } else if (token && to.path == '/login') {
    next({ name: 'home' })
  } else {
    next()
  }
})



export default router