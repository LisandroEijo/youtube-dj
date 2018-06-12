<template>
  <div>
    <div v-show="playerApi.searching" style="text-align: center" class="py-2">Loading...</div>
    <div class="search-results" v-show="playerApi.searchResults.length">
      <p>Search results</p>
      <transition-group name="search-results" tag="div">
        <div class="result" v-for="item in playerApi.searchResults" :key="item.id.videoId" v-if="!playerApi.isInQueue(item.id.videoId)">
          <img :src="item.snippet.thumbnails.default.url" />
          <div class="p-2">
            <div class="info">{{item.snippet.title}}</div>
            <b-button @click="playerApi.queueTrack(item.id.videoId)" :size="'sm'" :variant="'link'">Queue</b-button>
            <b-button @click="playerApi.queueTrackNext(item.id.videoId)" :size="'sm'" :variant="'link'">Next</b-button>
          </div>
        </div>
      </transition-group>
    </div>
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
