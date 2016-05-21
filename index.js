'use strict'
function toAttr(attributes) {
  if (typeof attributes === 'object')
    return attributes

  return {
    name: attributes,
  }
}

export function create(attributes, fn) {
  fn.attributes = toAttr(attributes)
  return fn
}

export const anonymous = fn => create(`test-${Math.random()}`, fn)

export function noop(name) {
  const noopPlugin = (server, opts, next) => next()

  if (!name) return anonymous(noopPlugin)

  return create(name, noopPlugin)
}
