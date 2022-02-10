import Watcher from './watcher';
import { observe } from './reactive';
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


export default class KVue {
    constructor(options) {
        this.$data = options.data;
        this.$methods = options.methods;
        this.$options = options;
        observe(this.$data);
        proxy(this);

        if (options.el) {
            this.$mount(options.el);
        }
        new Watcher(this, this.updateComponent)
    }
    updateComponent() {
        if (this.$options.render) {
            this.$options.render.call(this.$createElement);
        }
    }
    $createElement(tag, props, childs) {
        this._update({ tag, props, childs })
    }
    _update(vnode) {

    }
    $mount(selector) {
        this.$el = document.querySelector(selector) || null;
        this.updateComponent();
    }
}

