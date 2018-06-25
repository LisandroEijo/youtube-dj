<template>
  <div class="ytp--controls">
    <div class="ytp--player-control">
      <i @click="playerApi.prevTrack()" class="icon-ytp--previous"></i>
      <i v-if="playerApi.isPaused" @click="playerApi.play()" class="icon-ytp--play ytp--player-control-main"></i>
      <i v-if="!playerApi.isPaused" @click="playerApi.pause()" class="icon-ytp--pause ytp--player-control-main"></i>
      <i @click="playerApi.nextTrack()" class="icon-ytp--next"></i>
    </div>
    <div class="ytp--progress-bar">
      <div class="time-container">
        <span class="time-actual">{{playerApi.getTimePlayeDisplay()}}</span>
        <span class="time-total">{{playerApi.getTrackLengthDisplay()}}</span>
      </div>
      <b-progress :max="playerApi.trackLength">
        <b-progress-bar :value="playerApi.timePlayed">
        </b-progress-bar>
      </b-progress>
    </div>
  </div>
</template>
<script>
export default {
  name: 'PlayerControl',
  data: function () {
    return {
      playerApi: this.$root.playerApi
    }
  }
}
</script>
