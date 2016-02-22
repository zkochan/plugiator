# plugiator

A hapi plugins creator

[![Dependency Status](https://david-dm.org/zkochan/plugiator/status.svg?style=flat)](https://david-dm.org/zkochan/plugiator)
[![Build Status](https://travis-ci.org/zkochan/plugiator.svg?branch=master)](https://travis-ci.org/zkochan/plugiator)
[![npm version](https://badge.fury.io/js/plugiator.svg)](http://badge.fury.io/js/plugiator)


## How to install it?

``` sh
npm install --save plugiator
```


# Usage

## `plugiator.create(attributes, register)`

Creates a plugin with the passed in attributes and register function.

```js
const plugiator = require('plugiator')

function register(server, opts, next) {
  server.decorate('server', 'foo', 'bar')
  next()
}

module.exports = plugiator.create({
  name: 'foo',
  version: '1.0.0',
}, register)

// or set just the name
module.exports = plugiator.create('foo', register)
```


## `plugiator.anonymous(register)`

Creates a plugin with the passed in register function and random attributes.
Might be useful for unit tests.

```js
function register(server, opts, next) {
  server.decorate('server', 'foo', 'bar')
  next()
}

module.exports = plugiator.anonymous(register)
```


## `plugiator.noop([attributes])`

Creates a plugin that does nothing.

```js
module.exports = plugiator.noop()

// can have attributes specified
module.exports = plugiator.noop('noop-plugin')

//or
module.exports = plugiator.noop({
  name: 'noop-plugin'
})
```


## License

MIT © [Zoltan Kochan](https://www.kochan.io)
