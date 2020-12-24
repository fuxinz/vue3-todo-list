import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'todo-list',
    // route level code-splitting
    // this generates a separate chunk (todo-list.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "todo-list" */ '../views/todo-list.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
