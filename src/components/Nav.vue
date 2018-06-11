<template>
  <b-row class="navheader p-2">
    <b-col md="5" align-self="center" class="p-1">
      <form v-on:submit.prevent="onSubmit">
        <input class="form-control" @focus="hasFocus = true" @blur="closeAutotomplete()" @input="searchInput" v-model="search" type="search" placeholder="Search" aria-label="Search">
        <i v-show="search.length && !loading" @click="clearSearch()" class="fa fa-2x fa-times"></i>
        <i v-show="loading" class="fa fa-2x fa-spinner fa-pulse"></i>
        <div v-show="hasFocus && suggestions.length > 0" class="suggestions">
          <div @click="useAutocomplete(suggestion)" v-for="suggestion in suggestions" class="suggestion" :key="suggestion">
            {{suggestion}}
          </div>
        </div>
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
import {debounce} from 'lodash/function'
export default {
  name: 'Nav',
  data: function () {
    return {
      'loading': false,
      'hasFocus': false,
      'suggestions': [],
      'search': '',
      playerApi: this.$root.playerApi
    }
  },
  methods: {
    'closeAutotomplete': function () {
      setTimeout(() => {
        this.hasFocus = false
      }, 200)
    },
    'searchInput': debounce(function () {
      if (this.search.length <= 3) { return }
      if (this.loading) { return }
      this.loading = true
      this.playerApi.getSuggestion(this.search).then(({data}) => {
        this.suggestions = data
      }).finally(() => {
        this.loading = false
      })
    }, 500),
    'useAutocomplete': function (search) {
      this.search = search
      this.playerApi.search(search)
    },
    'clearSearch': function () {
      this.search = ''
      this.suggestions = []
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
