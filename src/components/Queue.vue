<template>
  <div class="queue">
    <transition-group name="queue-list" tag="div">
      <div v-for="(item, index) in playerApi.queue" :key="item.videoId"
          class="track" :class="{ active: playerApi.currentTrack == item.videoId}">
          <div class="title">
            {{item.title}}
          </div>
          <div>
            <div class="actions">
              <div class="left" @click="playerApi.queueChangeTo(index)">
                play
              </div>
              <div class="right" @click="playerApi.unqueueTrack(item.videoId)">
                remove
              </div>
            </div>
          </div>
      </div>
    </transition-group>
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
