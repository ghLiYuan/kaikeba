import KVue from './kvue';
var app = new KVue({
  el: '#app',
  data: {
    counter: 0
  },
  methods: {

  },
  render(h) {
    // h函数描述虚拟dom
    return h('h1', {}, [
      this.counter + ''
    ])
  }
})
setInterval(() => {
  app.counter++
}, 1000);