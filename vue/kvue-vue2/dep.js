export default class Dep {
  constructor() {
    this.deps = new Set;
  }
  addDep(wathcer) {
    this.deps.add(wathcer);
  }
  notify() {
    console.log(this.deps)
    this.deps.forEach(dep => dep.update())
  }
}