import Watcher from './watcher';
import { observe } from './reactive';
import patch from './patch';
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

        this.prevnode = null;

        observe(this.$data);
        proxy(this);

        if (options.el) {
            this.$mount(options.el);
        }
        new Watcher(this, this.updateComponent)
    }
    updateComponent() {
        if (this.$options.render) {
            const vnode = this.$options.render.call(this, this.$createElement);
            this._update(vnode)
        }
    }
    $createElement(tag, props, childs) {
        return { tag, props, childs }
    }
    _update(vnode) {
        if (!this.prevnode) {
            patch(this.$el, vnode);
        } else {
            patch(this.prevnode, vnode, this.prevnode.$el);
        }
        this.prevnode = vnode;
    }
    $mount(selector) {
        this.$el = document.querySelector(selector) || null;
        this.updateComponent();
    }
}


