'use strict'
function toAttr(attributes) {
  if (typeof attributes === 'object')
    return attributes

  return {
    name: attributes,
  }
}

function create(attributes, fn) {
  fn.attributes = toAttr(attributes)
  return fn
}

function anonymous(fn) {
  let name = 'test-' + Math.random()
  return create(name, fn)
}

let noopPlugin = (server, opts, next) => next()

function noop(name) {
  if (!name) return anonymous(noopPlugin)

  return create(name, noopPlugin)
}

exports.anonymous = anonymous
exports.create = create
exports.noop = noop
