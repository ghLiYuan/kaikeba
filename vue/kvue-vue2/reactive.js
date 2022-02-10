import Dep from './dep';
function reactive(obj, key, val) {
  if (typeof val === 'object')
    observe(val);

  // 一个 key 对应一个 dep 管理更新函数
  const dep = new Dep();

  Object.defineProperty(obj, key, {
    get() {
      console.log(`get ${key} ${val}`);
      Dep.target && dep.addDep(Dep.target);
      return val;
    },
    set(newVal) {
      if (newVal !== val) {
        if (typeof newVal === 'object')
          observe(newVal);
        console.log(`set ${key} ${newVal}`);
        val = newVal;
        dep.notify();
      }
    }
  })
}

class Observer {

}

export function observe(obj) {
  if (typeof obj !== 'object' || obj === null)
    return;
  Object.keys(obj).forEach(k => {
    reactive(obj, k, obj[k]);
  })
}