import Dep from './dep';
export default class Watcher {
  constructor(vm, updateFn) {
    this.vm = vm;
    this.updateFn = updateFn;
    // 触发getter，在getter中收集watcher进dep
    Dep.target = this;
    updateFn.call(vm);
    Dep.target = null;
  }
  update() {
    // this.updateFn.call(this.vm, this.vm[this.key]);
    console.log('watcher update')
    this.updateFn.call(this.vm);
  }
}