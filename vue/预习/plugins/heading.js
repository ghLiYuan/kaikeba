const heading = {
    install(Vue) {
        Vue.component('heading', {
            functional: true,
            props: {
                title: String,
                level: String,
                icon: String,
            },
            render(h, context) {
                console.log(context);
                let children = [];
                const { icon, title, level } = context.props;
                if (icon) {
                    children.push(h(
                        'svg',
                        { class: 'icon' },
                        [ h('use', { attrs: { 'xlink:href': `#icon-${icon}` } }) ]
                    ))
                }
                children = children.concat(context.children);
                let vnode = h(
                    'h' + level,
                    { attrs: { title: title } },
                    children
                )
                console.log(vnode);
                return vnode;
            }
        })
    }
}

Vue.use(heading);