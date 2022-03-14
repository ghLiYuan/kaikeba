export default function (oldVnode, vnode, $el) {
  if (oldVnode.nodeType) {
    // 初始更新
    const el = createElm(vnode);
    insert(oldVnode, el);
  } else {
    // todo: 参考源码写diff算法
    if (oldVnode.tag === vnode.tag) {
      const oldCh = oldVnode.childs;
      const ch = vnode.childs;
      if (isTextCh(ch)) {
        if (oldCh !== ch) {
          $el.innerText = ch.toString();
        }
      } else {
        if (oldCh && ch) {
          updateChildren(oldVnode.$el, oldCh, ch);
        }
      }
      vnode.$el = $el;
    } else {
      const el = createElm(vnode);
      insert($el, el);
    }
  }

}

function updateChildren(parentElm, oldCh, ch) {
  for (const _vnode of oldCh) {
    parentElm.removeChild(_vnode.$el);
  }
  for (const _vnode of ch) {
    parentElm.appendChild(createElm(_vnode));
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
  if (isTextCh(childs)) {
    el.innerText = childs.toString();
  } else if (Array.isArray(childs)) {
    for (const _vnode of childs) {
      el.appendChild(createElm(_vnode));
    }
  }
  vnode.$el = el;
  return el;
}

function isTextCh(ch) {
  return (['string', 'number'].includes(typeof ch))
}