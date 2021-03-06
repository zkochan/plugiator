const sinon = require('sinon')
const chai = require('chai')
import * as plugiator from '../index'
const expect = chai.expect

chai.use(require('sinon-chai'))

describe('plugiator', function() {
  it('should create plugin', function() {
    let spy = sinon.spy((server, opts, next) => next())
    let plugin = plugiator.create('foo', spy)

    expect(plugin).to.be.a('function')
    expect(plugin.attributes).to.exist
    expect(plugin.attributes.name).to.eq('foo')

    let noopSpy = sinon.spy()
    plugin({}, {}, noopSpy)

    expect(spy).to.have.been.calledOnce
    expect(noopSpy).to.have.been.calledWithExactly()
  })

  it('should create plugin with passed in attributes', function() {
    let spy = sinon.spy((server, opts, next) => next())
    let attributes = {
      name: 'foo',
      version: '43.2.13',
    }
    let plugin = plugiator.create(attributes, spy)

    expect(plugin).to.be.a('function')
    expect(plugin.attributes).to.exist
    expect(plugin.attributes.name).to.eq(attributes.name)
    expect(plugin.attributes.version).to.eq(attributes.version)

    let noopSpy = sinon.spy()
    plugin({}, {}, noopSpy)

    expect(spy).to.have.been.calledOnce
    expect(noopSpy).to.have.been.calledWithExactly()
  })

  it('should create anonymous plugin', function() {
    let spy = sinon.spy((server, opts, next) => next())
    let plugin = plugiator.anonymous(spy)

    expect(plugin).to.be.a('function')
    expect(plugin.attributes).to.exist
    expect(plugin.attributes.name).to.exist

    let noopSpy = sinon.spy()
    plugin({}, {}, noopSpy)

    expect(spy).to.have.been.calledOnce
    expect(noopSpy).to.have.been.calledWithExactly()
  })

  it('should create named noop plugin', function() {
    let plugin = plugiator.noop('noop')

    expect(plugin).to.be.a('function')
    expect(plugin.attributes).to.exist
    expect(plugin.attributes.name).to.eq('noop')

    let noopSpy = sinon.spy()
    plugin({}, {}, noopSpy)

    expect(noopSpy).to.have.been.calledWithExactly()
  })

  it('should create anonymous noop plugin', function() {
    let plugin = plugiator.noop()

    expect(plugin).to.be.a('function')
    expect(plugin.attributes).to.exist
    expect(plugin.attributes.name).to.exist

    let noopSpy = sinon.spy()
    plugin({}, {}, noopSpy)

    expect(noopSpy).to.have.been.calledWithExactly()
  })

  it('should create anonymous noop plugins with different names', function() {
    const plugin1 = plugiator.noop()
    const plugin2 = plugiator.noop()

    expect(plugin1.attributes.name).to.not.eq(plugin2.attributes.name)
  })
})
