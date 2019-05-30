import Vuex from 'vuex'

class TestHelpers {
  constructor ({ vue, expect }) {
    this.vue = vue
    this.expect = expect
    this.componentName = this.component = null
  }

  expectErrorMessage (func, message) {
    try {
      func()
      this.expect('An error must be thrown but nothing has happened!').toBe(false)
    } catch (e) {
      this.expect(e.message).toContain(message)
    }
  }

  componentNamed (name) {
    this.componentName = name
    this.component = this.vue.options.components[this.componentName]
    return this
  }

  shouldBeRegistered () {
    this.expect(this.component).toBeTruthy()
  }

  shouldNotBeRegistered () {
    this.expect(this.component).toBeFalsy()
  }

  initStore ({
    modules, actions, mutations, state, getters
  }) {
    actions = actions || {}
    mutations = mutations || {}
    state = state || {}
    getters = getters || {}
    this._store = new Vuex.Store({
      modules, actions, mutations, state, getters
    })
    return this
  }

  store (store) {
    this._store = store
    return this
  }

  static keys (object) {
    return Object.keys(object)
  }

  containsActions (expected) {
    this.expect(TestHelpers.keys(this._store._actions)).toEqual(this.expect.arrayContaining(expected))
    return this
  }

  notContainsActions (unexpected) {
    this.expect(TestHelpers.keys(this._store._actions)).not.toEqual(this.expect.arrayContaining(unexpected))
    return this
  }

  containsMutations (expected) {
    this.expect(TestHelpers.keys(this._store._mutations)).toEqual(this.expect.arrayContaining(expected))
    return this
  }

  notContainsMutations (unexpected) {
    this.expect(TestHelpers.keys(this._store._mutations)).not.toEqual(this.expect.arrayContaining(unexpected))
    return this
  }

  containsStates (expected) {
    expected.forEach((s) => {
      this.expect(this._store.state).toHaveProperty(s)
    })
    return this
  }

  notContainsStates (unexpected) {
    unexpected.forEach((s) => {
      this.expect(this._store.state).not.toHaveProperty(s)
    })
    return this
  }

  containsGetters (expected) {
    this.expect(TestHelpers.keys(this._store.getters)).toEqual(this.expect.arrayContaining(expected))
    return this
  }

  notContainsGetters (unexpected) {
    this.expect(TestHelpers.keys(this._store.getters)).not.toEqual(this.expect.arrayContaining(unexpected))
    return this
  }
}

export default TestHelpers
