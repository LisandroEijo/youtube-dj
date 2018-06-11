<template>
  <b-row class="navheader p-2">
    <b-col md="5" align-self="center" class="p-1">
      <form v-on:submit.prevent="onSubmit">
        <input class="form-control" v-model="search" type="search" placeholder="Search" aria-label="Search">
        <i @click="clearSearch()" class="fa fa-2x fa-times"></i>
      </form>
    </b-col>

    <b-col cols="12" sm="4" md="3" align-self="center" class="p-1 player-actions">
      <i @click="playerApi.prevTrack()" class="fa fa-2x fa-backward"></i>
      <i v-if="playerApi.isPaused" @click="playerApi.play()" class="fa fa-2x fa-play-circle"></i>
      <i v-if="!playerApi.isPaused" @click="playerApi.pause()" class="fa fa-2x fa-pause-circle"></i>
      <i @click="playerApi.nextTrack()" class="fa fa-2x fa-forward"></i>
      <i v-show="!playerApi.isMusicServerSet || playerApi.isMusicServer" @click="playerApi.convertIntoMusicServer()" :class="{active: playerApi.isMusicServer}" class="fa fa-2x fa-server"></i>
    </b-col>

    <b-col @click="seek" cols="12" sm="8" md="4" align-self="center" class="p-1">
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
    'clearSearch': function () {
      this.search = ''
      this.playerApi.clearSearch()
    },
    'seek': function (event) {
      var percentageToJump = event.offsetX * 100 / event.currentTarget.clientWidth
      this.playerApi.seekToPercentage(percentageToJump)
    },
    'onSubmit': function () {
      this.playerApi.search(this.search)
    }
  }
}
</script>
