<template>
  <b-row class="navheader p-2">
    <b-col md="5" align-self="center">
      <form v-on:submit.prevent="onSubmit">
        <input class="form-control" v-model="search" type="search" placeholder="Search" aria-label="Search">
      </form>
    </b-col>

    <b-col cols="6" md="3" align-self="center" class="player-actions">
      <i @click="playerApi.prevTrack()" class="fa fa-2x fa-backward"></i>
      <i v-if="playerApi.isPaused" @click="playerApi.play()" class="fa fa-2x fa-play-circle"></i>
      <i v-if="!playerApi.isPaused" @click="playerApi.pause()" class="fa fa-2x fa-pause-circle"></i>
      <i @click="playerApi.nextTrack()" class="fa fa-2x fa-forward"></i>
      <i @click="playerApi.convertIntoMusicServer()" class="fa fa-2x fa-server"></i>
    </b-col>

    <b-col cols="6" md="4" align-self="center">
      <b-progress :max="playerApi.trackLength">
        <b-progress-bar :value="playerApi.timePlayed">
          <span class="p-1">{{playerApi.getTimePlayeDisplay()}} of {{playerApi.getTrackLengthDisplay()}}</span>
        </b-progress-bar>
      </b-progress>
    </b-col>
  </b-row>
</template>

<script>
export default {
  name: 'Nav',
  data: function () {
    return {
      'search': '',
      playerApi: this.$root.playerApi
    }
  },
  methods: {
    'progress': function () {

    },
    'onSubmit': function () {
      this.playerApi.search(this.search)
    }
  }
}
</script>
