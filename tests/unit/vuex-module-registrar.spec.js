import { createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import TestHelpers from '../utilities/test-helpers.js'
import mockedAssembleVuexModules from '../__MOCK__/vuex-module-assembler-index'

describe('Vuex Module Registrar', () => {
  let vue
  let h
  const moduleDir = {
    actions: [
      'admin/discount/coupon/insert',
      'admin/discount/coupon/update',
      'admin/user/delete',
      'admin/user/lock',
      'ticket/close',
      'ticket/sendReply',
      'user/changePassword',
      'user/logout'
    ],
    getters: [
      'admin/discount/coupon/usages',
      'admin/user/activities',
      'ticket/replies',
      'user/avatar'
    ],
    mutations: [
      'admin/user/GET_FULL_NAME',
      'ticket/CHANGE_SEEN_STATUS',
      'user/CHANGE_INVENTORY'
    ],
    state: [
      'admin.discount.coupon.created_at',
      'admin.discount.coupon.whatever',
      'admin.user.created_at',
      'admin.user.referer_id',
      'ticket.title',
      'user.name',
      'user.website',
      'user.github'
    ]
  }

  beforeEach(() => {
    vue = createLocalVue()
    vue.use(Vuex)
    h = new TestHelpers({ vue, expect })
  })

  it('should register nested modules completely', () => {
    const modules = mockedAssembleVuexModules({
      mockedDir: './tests/modules'
    })
    h.initStore({ modules })
      .containsActions([...moduleDir.actions])
      .notContainsActions([
        'user/delete',
        'user/lock',
        'user/close',
        'admin/discount/insert'
        // and more conflicted actions
      ])
      .containsGetters([...moduleDir.getters])
      .notContainsGetters([
        'admin/discount/usages',
        'admin/user/avatar',
        'ticket/usages',
        'user/activities'
        // and more conflicted getters
      ])
      .containsMutations([...moduleDir.mutations])
      .notContainsMutations([
        'user/GET_FULL_NAME',
        'admin/user/CHANGE_INVENTORY',
        'ticket/CHANGE_INVENTORY'
        // and more conflicted mutations
      ])
      .containsStates([...moduleDir.state])
      .notContainsStates([
        'admin.discount.created_at',
        'admin.user.name',
        'admin.user.title',
        'ticket.name',
        'user.referer_id'
        // and more conflicted states
      ])
  })

  it('should respect predefined namespaced modules', () => {
    let modules = {
      bozgolakh: {
        namespaced: true,
        state: {
          health: 12
        },
        mutations: {
          SET_HEALTH: () => {}
        },
        actions: {
          attack: () => {},
          move: () => {}
        },
        getters: {
          getId: () => {}
        }
      }
    }

    modules = mockedAssembleVuexModules({
      modules,
      mockedDir: './tests/modules'
    })
    h.initStore({ modules })
      .containsActions([
        ...moduleDir.actions,
        'bozgolakh/move',
        'bozgolakh/attack'
      ])
      .containsStates([
        ...moduleDir.state,
        'bozgolakh.health'
      ])
      .containsMutations([
        ...moduleDir.mutations,
        'bozgolakh/SET_HEALTH'
      ])
      .containsGetters([
        ...moduleDir.getters,
        'bozgolakh/getId'
      ])
  })

  it('should respect predefined non-namespaced modules', () => {
    let modules = {
      bozgolakh2: {
        state: {
          health: 12
        },
        mutations: {
          SET_HEALTH: () => {}
        },
        actions: {
          attack: () => {},
          move: () => {}
        },
        getters: {
          getId: () => {}
        }
      }
    }

    modules = mockedAssembleVuexModules({
      modules,
      mockedDir: './tests/modules'
    })
    h.initStore({ modules })
      .containsActions([
        ...moduleDir.actions,
        'move',
        'attack'
      ])
      .containsStates([
        ...moduleDir.state,
        'bozgolakh2.health'
      ])
      .containsMutations([
        ...moduleDir.mutations,
        'SET_HEALTH'
      ])
      .containsGetters([
        ...moduleDir.getters,
        'getId'
      ])
  })

  it('should respect module-independent root properties', () => {
    const modules = mockedAssembleVuexModules({
      mockedDir: './tests/modules'
    })
    h.initStore({
      modules,
      state: { appName: 'something' },
      actions: { closeApp: () => {} },
      mutations: { SET_APP_POINTS: () => {} },
      getters: { getLongAppName: () => {} }
    })
      .containsActions([
        ...moduleDir.actions,
        'closeApp'
      ])
      .containsStates([
        ...moduleDir.state,
        'appName'
      ])
      .containsMutations([
        ...moduleDir.mutations,
        'SET_APP_POINTS'
      ])
      .containsGetters([
        ...moduleDir.getters,
        'getLongAppName'
      ])
  })
})
