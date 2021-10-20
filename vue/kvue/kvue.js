
function reactive(obj, key, val) {
    if (typeof val === 'object')
        observe(val);

    // 一个 key 对应一个 dep 管理更新函数
    const dep = new Dep();

    Object.defineProperty(obj, key, {
        get() {
            // console.log(`get ${key} ${val}`);
            Dep.target && dep.addDep(Dep.target);
            return val;
        },
        set(newVal) {
            if (newVal !== val) {
                if (typeof newVal === 'object')
                    observe(newVal);
                // console.log(`set ${key} ${newVal}`);
                dep.notify();
                val = newVal;
            }
        }
    })
}

function observe(obj) {
    if (typeof obj !== 'object' || obj === null)
        return;
    Object.keys(obj).forEach(k => {
        reactive(obj, k, obj[k]);
    })
}

function proxy(vm) {
    Object.keys(vm.$data).forEach(key => {
        Object.defineProperty(vm, key, {
            get() {
                return vm.$data[key];
            },
            set(newVal) {
                vm.$data[key] = newVal;
            }
        })
    })
}

class Watcher {
    constructor(vm, key, updateFn) {
        this.vm = vm;
        this.key = key;
        this.updateFn = updateFn;
        // 触发getter，在getter中收集watcher进dep
        Dep.target = this;
        this.vm[this.key];
        Dep.target = null;
    }
    update() {
        this.updateFn.call(this.vm, this.vm[this.key]);
    }
}
class Dep {
    constructor() {
        this.deps = [];
    }
    addDep(dep) {
        this.deps.push(dep);
    }
    notify() {
        this.deps.forEach(dep => dep.update())
    }
}
class Observer {

}

class Compile {
    constructor(el, vm) {
        this.$el = document.querySelector(el);
        this.$vm = vm;
        if (this.$el) {
            this.compile(this.$el);
        }
    }
    compile(node) {
        node.childNodes.forEach(childNode => {
            // console.log(childNode.toString(), childNode.nodeType)
            if (childNode.nodeType === 3 && /\{\{(.*)\}\}/.test(childNode.textContent)) {
                this.compileText(childNode);
            } else if (childNode.nodeType === 1) {
                // 匹配指令
                // v-text
                this.compileElement(childNode);
            }
            if (childNode.childNodes?.length) {
                this.compile(childNode);
            }
        })
    }
    compileText(node) {
        const key = RegExp.$1.trim();
        this.text(node, key);
    }
    compileElement(node) {
        for (let attr of node.attributes) {
            if (attr.name.startsWith('v-')) {
                const key = attr.value;
                let directive = attr.name.substring(2);
                this[directive] && this[directive](node, key);
            }
        }
    }
    // 约定指令的节点处理方法名 v-text
    text(node, key) {
        this.update(node, key, 'text');
    }
    html(node, key) {
        this.update(node, key, 'html');
    }
    model(node, key) {
        debugger;

    }
    update(node, key, directive) {
        const fn = this[`${directive}Updater`];
        fn && fn(node, this.$vm[key]);
        // 增加一个 watcher
        new Watcher(this.$vm, key, function(val) {
            fn && fn(node, val);
        });
    }
    textUpdater(node, val) {
        node.textContent = val;
    }
    htmlUpdater(node, val) {
        node.innerHTML = val;
    }

}

class KVue {
    constructor(options) {
        this.$el = options.el;
        this.$data = options.data;
        observe(this.$data);
        proxy(this);
        new Compile(this.$el, this);
    }


}