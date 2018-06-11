<template>
  <div class="search-results" v-show="playerApi.searchResults.length">
    <p>Resultados de la busqueda:</p>
    <transition-group name="search-results" tag="div" class="list-unstyled">
      <b-media tag="li" class="my-4" v-for="item in playerApi.searchResults" :key="item.id.videoId" v-if="!playerApi.isInQueue(item.id.videoId)">
        <img slot="aside" :src="item.snippet.thumbnails.default.url" />
        <p>{{item.snippet.title}}</p>
        <b-button @click="playerApi.queueTrack(item.id.videoId)" :size="'sm'" :variant="'primary'">Queue</b-button>
        <b-button @click="playerApi.queueTrackNext(item.id.videoId)" :size="'sm'" :variant="'primary'">Next</b-button>
      </b-media>
    </transition-group>
  </div>
</template>

<script>
export default {
  name: 'SearchResults',
  data: function () {
    return {
      playerApi: this.$root.playerApi
    }
  }
}
</script>
