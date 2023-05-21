import Vue from 'vue'
import './plugins/axios'
import App from './App.vue'
import router from './router'
import store from './store'
import Vant from 'vant';
import 'vant/lib/index.css';
import "@/assets/iconfont/iconfont.css"
import "@/assets/reset.css"
import "@/assets/backgroundClip.css"
Vue.use(Vant);
import { Tabbar, TabbarItem,Search ,Swipe,NavBar , SwipeItem,Lazyload,Loading   } from 'vant';
Vue.use(Tabbar).use(TabbarItem);
Vue.use(Search);
Vue.use(Swipe).use(SwipeItem);
Vue.use(Loading);
Vue.use(Lazyload);
Vue.use(NavBar )
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
