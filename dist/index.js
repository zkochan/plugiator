'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

exports.create = create;
exports.noop = noop;
function toAttr(attributes) {
  if ((typeof attributes === 'undefined' ? 'undefined' : _typeof(attributes)) === 'object') return attributes;

  return {
    name: attributes
  };
}

function create(attributes, fn) {
  fn.attributes = toAttr(attributes);
  return fn;
}

var anonymous = exports.anonymous = function anonymous(fn) {
  return create('test-' + Math.random(), fn);
};

var noopPlugin = function noopPlugin(server, opts, next) {
  return next();
};

function noop(name) {
  if (!name) return anonymous(noopPlugin);

  return create(name, noopPlugin);
}