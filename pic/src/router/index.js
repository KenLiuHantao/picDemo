import Vue from 'vue'
import Router from 'vue-router'
import webHome from '../components/webHome'
import wapHome from '../components/wapHome'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/web/home',
      name:'webHome',
      component:webHome
    },{
      path: '/wap/home',
      name:'wapHome',
      component:wapHome
    },{
      path: '*',
      redirect:'/web/home',
    },
  ]
})
