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
            // 初始更新
            const parent = this.$el.parentElement;
            const el = this.createElement(vnode);
            parent.insertBefore(el, this.$el.nextSibling);
            parent.removeChild(this.$el);
            this.$el = el;
            this.prevnode = vnode;
        } else {
            // patch
            this.patch(this.prevnode, vnode);
        }
    }
    createElement(vnode) {
        const { tag, props, childs } = vnode;
        const el = document.createElement(tag);
        if (['string', 'number'].includes(typeof childs)) {
            el.innerText = childs.toString();
        }
        return el;
    }
    patch(oldVnode, vnode) {
        // todo: 参考源码写diff算法
        if (oldVnode.tag === vnode.tag) {
            if (['string', 'number'].includes(typeof vnode.childs)) {
                this.$el.innerText = vnode.childs;
            }
        }
    }
    $mount(selector) {
        this.$el = document.querySelector(selector) || null;
        this.updateComponent();
    }
}

