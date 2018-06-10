import axios from 'axios'
import config from '@/config'

var HTTP = axios.create({
  baseURL: config.API_BASE
})

class PlayerApi {
  constructor (socket, youtubePlayerGetter) {
    this.socket = socket
    this.isPaused = true
    this.isMusicServer = false
    this.timePlayed = 0
    this.trackLength = 0
    this.trackDetails = {
      title: '',
      thumbnail: ''
    }
    this.currentTrack = null
    this.queueIndex = 0
    this.youtubePlayerGetter = youtubePlayerGetter
    this.youtubePlayer = null
    this.searchResults = []
    this.searching = false
    this.queue = []
  }

  getTimePlayeDisplay () {
    return this.parseTime(this.timePlayed)
  }
  getTrackLengthDisplay () {
    return this.parseTime(this.trackLength)
  }
  pad (padding, number) {
    // padding and number must be strings
    number = number.toString()
    if (number.length >= padding.length) {
      // no padding is necesary
      return number
    }
    return (padding + number).slice(-padding.length)
  }
  parseTime (trackLengthInSeconds) {
    var minutes = parseInt(trackLengthInSeconds / 60)
    var seconds = parseInt(trackLengthInSeconds % 60)
    return this.pad('00', minutes) + ':' + this.pad('00', seconds)
  }
  setUpdateToServer () {
    this.socket.emit('musicServer.update', {
      videoId: this.currentTrack,
      trackLength: this.trackLength,
      timePlayed: this.timePlayed,
      isPaused: this.isPaused
    })
  }

  initialize () {
    this.initializeSocket()
    this.getQueue()
    this.getCurrentTrack()
  }
  convertIntoMusicServer () {
    if (this.isMusicServer) { return }
    this.isMusicServer = true
    this.initializeYoutubePlayer()
    if (this.currentTrack !== null) {
      this.youtubePlayer.load(this.currentTrack, true)
      this.play()
    }
  }
  initializeYoutubePlayer () {
    var that = this
    this.youtubePlayer = this.youtubePlayerGetter()
    this.youtubePlayer.on('ended', () => {
      that.nextTrack()
      that.setUpdateToServer()
    })
    this.youtubePlayer.on('timeupdate', (seconds) => {
      that.timePlayed = seconds
      that.setUpdateToServer()
    })
    this.youtubePlayer.on('playing', () => {
      that.trackLength = that.youtubePlayer.getDuration()
      that.timePlayed = 0
      that.isPaused = false
      that.setUpdateToServer()
    })
  }
  initializeSocket () {
    var that = this
    this.socket.on('player.pause', function (data) {
      // console.log('player.pause')
      that.isPaused = true
      if (that.isMusicServer) {
        that.youtubePlayer.pause()
      }
    })
    this.socket.on('player.resume', function (data) {
      // console.log('player.resume')
      that.isPaused = false
      if (that.isMusicServer) {
        that.youtubePlayer.play()
      }
    })
    this.socket.on('player.play', function (data) {
      // console.log('player.play')
      if (that.isMusicServer && that.currentTrack !== data.videoId) {
        that.currentTrack = data.videoId
        that.isPaused = false
        that.youtubePlayer.load(that.currentTrack, true)
      }
    })
    this.socket.on('player.time', function (data) {
      // console.log('player.time')
      // console.log(data)
      if (that.isMusicServer) { return }
      if (that.currentTrack !== data.currentTrack) {
        // changed current song force update
        setTimeout(function () {
          that.getCurrentTrack()
        }, 100)
      }
      that.currentTrack = data.currentTrack
      that.timePlayed = data.timePlayed
      that.trackLength = data.trackLength
      that.isPaused = data.isPaused
    })

    this.socket.on('queue.swap', () => { that.getQueue() })
    this.socket.on('queue.replaced', () => { that.getQueue() })
    this.socket.on('queue.removed', () => { that.getQueue() })
    this.socket.on('queue.added', () => { that.getQueue() })
  }
  getCurrentTrack () {
    HTTP.get('/track/').then(({data}) => {
      this.trackDetails = data.details
      this.currentTrack = data.videoId
    })
  }
  queueTrack (videoId, title) {
    HTTP.post(config.API_QUEUE, {
      videoId: videoId,
      title: title
    })
  }
  unqueueTrack (videoId) {
    HTTP.post(config.API_UNQUEUE, {
      videoId: videoId
    })
  }

  play () {
    HTTP.post('/resume/')
  }

  pause () {
    HTTP.post('/pause/')
  }

  nextTrack () {
    HTTP.post('/next/')
  }

  prevTrack () {
    HTTP.post('/prev/')
  }

  isInQueue (videoId) {
    for (let i = 0; i < this.queue.length; i++) {
      if (this.queue[i].videoId === videoId) {
        return true
      }
    }
    return false
  }

  getQueue () {
    HTTP.get('/queue/').then(response => {
      this.queue = response.data
      return response.data
    })
  }

  queueChangeTo (queuePosition) {
    HTTP.post('/queue/changeto/', {
      position: queuePosition
    })
  }

  getSuggestion (q) {
    return HTTP.get('/suggestion/', {
      params: {
        search: q
      }
    })
  }

  search (querySring) {
    if (this.searching) {
      // avoid multiple searchs
      return
    }
    this.searching = true
    return HTTP.get(config.API_SEARCH, {
      params: {
        q: querySring
      }
    }).then(response => {
      this.searching = false
      this.searchResults = response.data
      return response.data
    }, error => {
      this.searching = false
      throw error
    })
  }
}

export default PlayerApi
