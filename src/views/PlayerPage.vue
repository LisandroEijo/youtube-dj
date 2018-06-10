<template>
  <div>
    <b-container fluid>
      <Nav></Nav>
      <b-row>
        <b-col md="7">
          <SearchResults></SearchResults>
        </b-col>
        <b-col md="5" class="p-0">
          <div v-show="playerApi.isMusicServer" id="player"></div>
          <div v-show="!playerApi.isMusicServer" class="cover">
            <div>{{playerApi.trackDetails.title}}</div>
            <img v-show="!playerApi.trackDetails.thumbnail" src="@/assets/main-bg.png">
            <img :src="playerApi.trackDetails.thumbnail">
          </div>
          <Queue></Queue>
        </b-col>
      </b-row>
    </b-container>
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
