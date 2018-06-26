<template>
  <div id="header">
    <div class="ytp--searchbar">
      <form v-on:submit.prevent="onSubmit">
        <input ref="searchBox" class="searchbar--input" @focus="hasFocus = true" @blur="closeAutotomplete()" @input="searchInput" v-model="search" type="search" placeholder="Search for a Song, Album or Artist" aria-label="Search">
        <i class="icon-ytp--search"></i>
        <div class="search-actions-container">
          <i v-show="search.length && !loading" @click="clearSearch()" class="icon-ytp--remove"></i>
          <i v-show="loading" class="icon-ytp--loading"></i>
        </div>
        <div v-show="hasFocus && suggestions.length > 0" class="suggestions">
          <div @click="useAutocomplete(suggestion)" v-for="suggestion in suggestions" class="suggestion" :key="suggestion">
            {{suggestion}}
          </div>
        </div>
      </form>
    </div>
    <div class="transmit-btn-container">
      <button v-show="!playerApi.isMusicServerSet || playerApi.isMusicServer"
              @click="playerApi.convertIntoMusicServer()"
              :class="{active: playerApi.isMusicServer}"
              class="btn btn-sm">
              <i class="icon-ytp--transmit"></i>
      </button>
    </div>
    <!-- <div class="ytp--player-control">
      <i @click="playerApi.prevTrack()" class="icon-ytp--previous"></i>
      <i v-if="playerApi.isPaused" @click="playerApi.play()" class="icon-ytp--play player-actions-main"></i>
      <i v-if="!playerApi.isPaused" @click="playerApi.pause()" class="icon-ytp--pause player-actions-main"></i>
      <i @click="playerApi.nextTrack()" class="icon-ytp--next"></i>
      <i v-show="!playerApi.isMusicServerSet || playerApi.isMusicServer" @click="playerApi.convertIntoMusicServer()" :class="{active: playerApi.isMusicServer}" class="icon-ytp--transmit"></i>
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
    </div> -->
  </div>
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
      if (this.search.length > 1) {
        this.playerApi.search(this.search)
        this.$refs.searchBox.blur()
      }
    }
  }
}
</script>
