function reactive(obj, key) {
    Object.defineProperty(obj, key, {
        get() {
            // debugger;
            console.log('get ', key)
        },
        set(newVal) {
            debugger;
            console.log('set ', key);
            return newVal
        }
    })
}

function observe(obj) {
    Object.keys(obj).forEach(k => {
        reactive(obj, k)
    })
}

class KVue {
    constructor(options) {
        this.$el = options.el;
        this.$data = options.data;
        observe(this.$data);
        const dom = document.querySelector(this.$el);
        this.compile(dom);
    }
    compile(node) {
        console.log(node.childNodes)
        node.childNodes.forEach(node => {
            if (node.nodeType === 3 && /\{\{(.*)\}\}/.test(node.textContent)) {
                this.text(node);
            }
            if (node.childNodes.length) {
                this.compile(node);
            }
        })
    }
    text(node) {
        const key = RegExp.$1.trim();
        node.innerText = this.$data[key];
    }
}