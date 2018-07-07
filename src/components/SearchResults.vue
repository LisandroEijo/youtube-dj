<template>
  <div id="main-section">
    <div v-show="playerApi.searching" style="text-align: center" class="py-2">Loading...</div>
    <div class="search-results" v-show="playerApi.searchResults.length">
      <transition-group name="search-results" tag="div">
        <div class="result" v-for="item in playerApi.searchResults" :key="item.id.videoId" v-if="!playerApi.isInQueue(item.id.videoId)">
          <img :src="item.snippet.thumbnails.default.url" />
          <div class="p-2">
            <div class="info">{{item.snippet.title}}</div>
            <span @click="playerApi.queueTrack(item.id.videoId)" class="result-action">
              <i class="icon-ytp--add-to-queue"></i> Add to Queue
            </span>
            <span @click="playerApi.queueTrackNext(item.id.videoId)"  class="result-action">
              <i class="icon-ytp--add-next"></i> Play Next
            </span>
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
