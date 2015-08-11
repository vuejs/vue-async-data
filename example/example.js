var Vue = require('vue')
var asyncData = require('../')

Vue.use(asyncData)

Vue.component('test', {

  template:
    '<div v-if="!$loadingAsyncData">loaded message: {{msg.id}} {{msg.text}}</div>' +
    '<div v-if="$loadingAsyncData">loading...</div>',

  props: ['msgId'],

  // reload data on msgId change
  watch: {
    msgId: 'reloadAsyncData'
  },

  data: function () {
    return {
      msg: {}
    }
  },

  asyncData: function (resolve, reject) {
    var id = this.msgId
    // resolve data asynchronously
    setTimeout(function () {
      resolve({
        msg: {
          id: id,
          text: 'hihihi'
        }
      })
    }, 1000)
    // OR: return a promise (see readme)
  }
})

var app = new Vue({
  el: '#el',
  data: {
    msgId: 123
  },
  methods: {
    reload: function () {
      this.msgId = Math.floor(Math.random() * 10000)
    }
  }
})
