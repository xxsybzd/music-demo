import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from "@/views/Home.vue"

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    redirect:"/home",
    component: Home
  },
  {
    path: '/home',
    component: Home
  },
  {
    path: '/podcast',
    name: 'podcast',
    component: () => import('@/views/Podcast.vue')
  },
  {
    path: '/songlist',
    name: 'songlist',
    component: () => import('@/views/SongList.vue')
  }
]

const router = new VueRouter({
  mode: 'hash',
  routes
})

export default router
