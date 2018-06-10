import Vue from 'vue'
import Router from 'vue-router'
import PlayerPage from '@/views/PlayerPage'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'PlayerPage',
      component: PlayerPage
    }
  ]
})
