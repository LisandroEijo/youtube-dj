<template>
  <div class="queue">
    <transition-group name="queue-list" tag="div">
      <div v-for="(item, index) in playerApi.queue" :key="item.videoId" class="track">
          <div class="track-info" :class="{ active: playerApi.currentTrack == item.videoId}">
            <div class="title">
              {{item.title}}
            </div>
          </div>
          <div class="actions">
            <div class="action" @click="playerApi.queueChangeTo(index)"><i class="fa fa-play-circle"></i></div>
            <div class="action" @click="playerApi.unqueueTrack(item.videoId)"><i class="fa fa-times"></i></div>
          </div>
      </div>
    </transition-group>
    <div v-show="playerApi.queue.length > 5" class="button" @click="playerApi.queueClear()">
      Clear Queue
    </div>
  </div>
</template>

<script>
export default {
  name: 'Queue',
  data: function () {
    return {
      playerApi: this.$root.playerApi
    }
  }
}
</script>
