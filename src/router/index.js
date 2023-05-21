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
  },
  {
    path: '/songdetail/:id',
    name: 'songdetail',
    props:true,
    component: () => import('@/views/SongDetail.vue'),
    meta:{
      hideTab:true
    },
  }
]

const router = new VueRouter({
  mode: 'hash',
  routes
})

export default router
