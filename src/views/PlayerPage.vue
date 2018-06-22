<template>
  <div>
    <div class="container-grid">
      <Nav></Nav>
      <SearchResults></SearchResults>
      <div class="sidebar">
        <div v-show="playerApi.isMusicServer" id="player"></div>
        <div v-show="!playerApi.isMusicServer" class="cover">
          <div>{{playerApi.trackDetails.title}}</div>
          <img v-show="!playerApi.trackDetails.thumbnail" src="@/assets/img/main-bg.png">
          <img :src="playerApi.trackDetails.thumbnail">
        </div>
        <Queue></Queue>
      </div>

    </div>
  </div>
</template>

<script>
import Nav from '../components/Nav.vue'
import Queue from '../components/Queue.vue'
import SearchResults from '../components/SearchResults.vue'
export default {
  name: 'PlayerPage',
  data: function () {
    return {
      playerApi: this.$root.playerApi
    }
  },
  components: {
    Nav,
    Queue,
    SearchResults
  }
}
</script>
<style>

</style>
