let Vue;
class Store {
    constructor(props) {
        this.mutations = props.mutations;
        this.actions = props.actions;
        // this.state = props.state;
        Vue.util.defineReactive(this, 'state', props.state);
        this.commit = this.commit.bind(this);
        this.dispatch = this.dispatch.bind(this);

        this.getters = Object.create(null);
        Object.keys(props.getters).forEach(k => {
            console.log(k)
            Object.defineProperty(this.getters, k, {
                get() {
                    return props.getters[k].apply(this, [props.state]);
                }
            })
        })
    }
    commit(type) {
        // mutations
        let entry = this.mutations[type];
        entry && entry(this.state);
    }
    dispatch(type) {
        // actions
        let entry = this.actions[type];
        entry && entry({
            commit: this.commit,
            state: this.state
        });
    }
}
Store.install = function (_Vue) {
    Vue = _Vue;
    Vue.mixin({
        beforeCreate() {
            if (this.$options.store) {
                Vue.prototype.$store = this.$options.store;
            }
        }
    })
}


export default {
    Store,
    install: Store.install
}