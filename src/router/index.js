import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import WorkFlow from '../views/WorkFlow.vue'
import EditFlow from '../views/EditFlow.vue'

Vue.use(VueRouter)

const routes = [{
  path: '/',
  name: 'home',
  component: Home,
  redirect: '/editflow',
  children: [{
    path:'/editflow',
    name: 'EditFlow',
    component: EditFlow
  }, {
    path:'/workflow',
    name: 'WorkFlow',
    component: WorkFlow
  }]
}]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router