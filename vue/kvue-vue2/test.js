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
    // return h('h1', {}, this.counter)
    return h('h1', {}, [
      h('h2', {}, this.counter),
      h('h2', {}, this.counter * 2),
      h('h2', {}, this.counter * 3),
    ])
  }
})
setInterval(() => {
  app.counter++
}, 1000);