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
      { tag: 'h2', props: {}, childs: this.counter },
      { tag: 'h2', props: {}, childs: this.counter * 2 },
      { tag: 'h2', props: {}, childs: this.counter * 3 },
    ])
  }
})
setInterval(() => {
  app.counter++
}, 1000);