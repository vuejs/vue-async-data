var Vue = require('vue')
var asyncData = require('../')

Vue.use(asyncData)

Vue.component('test', {

  template:
    '<div v-if="!$loadingAsyncData">loaded message: {{msg.text}}</div>' +
    '<div v-if="$loadingAsyncData">loading...</div>',

  data: function () {
    return {
      msg: {}
    }
  },

  asyncData: function (resolve, reject) {
    // resolve data asynchronously
    setTimeout(function () {
      resolve({
        msg: {
          text: 'hihihi'
        }
      })
    }, 1000)

    // OR: return a promise (see examples below)
  }
})

new Vue({ el: '#el '})

// --- Promise Examples ---

// mock a service
var msgService = {
  get: function (id) {
    return new Promise(function (resolve, reject) {
      setTimeout(function () {
        resolve({
          text: 'hihihi from ' + id
        })
      }, 1000)
    })
  }
}

// in your asyncData function:
function asyncData () {
  return msgService.get(1).then(function (msg) {
    return {
      msg: msg
    }
  })
}

// parallel data fetching with multiple requests:
function asyncDataParallel () {
  return Promise.all([
    msgService.get(1),
    msgService.get(2)
  ]).then(function (msgs) {
    return {
      a: msgs[0],
      b: msgs[1]
    }
  })
}
