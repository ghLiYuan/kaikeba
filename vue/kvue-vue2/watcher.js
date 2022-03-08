import Dep from './dep';
export default class Watcher {
  constructor(vm, updateFn) {
    this.vm = vm;
    this.updateFn = updateFn;
    // 触发getter，在getter中收集watcher进dep
    Dep.target = this;
    this.get();
    Dep.target = null;
  }
  // 依赖收集
  // todo: 可进行排队，实现异步批量更新
  get() {
    this.updateFn.call(this.vm);
  }
  update() {
    this.get();
  }
}