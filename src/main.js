// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import BootstrapVue from 'bootstrap-vue'
import io from 'socket.io-client'
import YTPlayer from 'yt-player'
import PlayerApi from './PlayerApi'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import 'font-awesome/css/font-awesome.css'

import './assets/style.scss'

Vue.use(BootstrapVue)
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  data: {
    queue: [],
    playerApi: null
  },
  router: router,
  components: { App },
  template: '<App/>',
  method: {
  },
  created: function () {
    this.$socket = io('')
    this.$socket.on('connect', () => { console.log('connected socket') })
    this.playerApi = new PlayerApi(this.$socket, function () {
      // this is a getter for the youtube player iframe api
      var youtubePlayer = new YTPlayer('#player')
      youtubePlayer.setVolume(100)
      return youtubePlayer
    })
    this.playerApi.initialize()
  }
})
