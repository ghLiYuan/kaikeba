export default function (oldVnode, vnode, $el) {
  if (oldVnode.nodeType) {
    // 初始更新
    const el = createElm(vnode);
    vnode.$el = el;
    insert(oldVnode, el);
  } else {
    // todo: 参考源码写diff算法
    if (oldVnode.tag === vnode.tag) {
      const oldCh = oldVnode.childs;
      const ch = vnode.childs;
      if (['string', 'number'].includes(typeof ch)) {
        $el.innerText = ch.toString();
      } else {

      }
      vnode.$el = $el;
    } else {
      const el = createElm(vnode);
      vnode.$el = el;
      insert($el, el);
    }
  }

}

function insert($el, el) {
  const parent = $el.parentElement;
  parent.insertBefore(el, $el.nextSibling);
  parent.removeChild($el);
}

function createElm(vnode) {
  const { tag, props, childs } = vnode;
  const el = document.createElement(tag);
  return el;
}