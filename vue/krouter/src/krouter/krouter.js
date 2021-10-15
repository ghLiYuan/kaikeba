let Vue;
class VueRouter {
    constructor(props) {
        const { routes } = props;
        this.routes = routes;

        Vue.util.defineReactive(this, 'current', location.hash.slice(1) || '/');
        window.addEventListener('hashchange', () => {
            // 引用了 this.current 的render将执行
            this.current = location.hash.slice(1)
        })
    }
}

VueRouter.install = function (_Vue) {
    Vue = _Vue;
    Vue.mixin({
        beforeCreate() {
            if (this.$options.router) {
                Vue.prototype.$router = this.$options.router;
            }
        }
    })
    Vue.component('router-link', {
        props: {
            to: String,
        },
        render(h) {
            return h(
                'a',
                { attrs: { href: '#' + this.to } },
                this.$slots.default
            )
        }
    })
    Vue.component('router-view', {
        render(h) {
            // console.log('routerview render')
            // 根据当前 hash 渲染对应的组件
            let component;
            let route = this.$router.routes.find(o => o.path === this.$router.current);
            if (route) {
                component = route.component;
            }
            return h(
                component
            )
        },
    })
}

export default VueRouter;