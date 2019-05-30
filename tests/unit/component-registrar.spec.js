import { createLocalVue } from '@vue/test-utils'
import TestHelpers from '../utilities/test-helpers.js'
import mockedComponentRegistrar from '../__MOCK__/component-registrar-index'
import realComponentRegistrar from '../../component-registrar'

describe('Vue Component Registrar', () => {
  let vue
  let h

  beforeEach(() => {
    vue = createLocalVue()
    h = new TestHelpers({ vue, expect })
  })

  it('should respect components path', () => {
    vue.use(mockedComponentRegistrar, {
      mockedDir: './tests/components/unique/sidebar'
    })
    h.componentNamed('MainContainer').shouldNotBeRegistered()
    h.componentNamed('ContentContainer').shouldNotBeRegistered()
    h.componentNamed('Section').shouldBeRegistered() // Note this one! this is not SidebarSection anymore because `sidebar` dir is its root.
  })

  it('should register unique components', () => {
    vue.use(mockedComponentRegistrar, {
      mockedDir: './tests/components/unique'
    })
    h.componentNamed('MainContainer').shouldBeRegistered()
    h.componentNamed('ContentContainer').shouldBeRegistered()
    h.componentNamed('SidebarSection').shouldBeRegistered()
    h.componentNamed('SidebarSectionItem').shouldBeRegistered()
    h.componentNamed('SidebarSectionBackground').shouldBeRegistered()
  })

  /**
   * Components with duplicated final name should throw error
   * For example in 'components/duplicated' dir, following registration will happen:
   * ./MainContent  ->  'MainContent'
   * ./main/content ->  'MainContent'
   */
  it('should not register duplicated components', () => {
    h.expectErrorMessage(() => {
      vue.use(mockedComponentRegistrar, {
        mockedDir: './tests/components/duplicated'
      })
    },
    'has already been registered globally')
  })

  it('should respect custom component name generator callback', () => {
    vue.use(mockedComponentRegistrar, {
      mockedDir: './tests/components/unique',
      customNameGenerator: ({ suggestedName }) => `Custom${suggestedName}`
    })
    h.componentNamed('CustomMainContainer').shouldBeRegistered()
    h.componentNamed('CustomContentContainer').shouldBeRegistered()
    h.componentNamed('CustomSidebarSection').shouldBeRegistered()
    h.componentNamed('CustomSidebarSectionItem').shouldBeRegistered()
    h.componentNamed('CustomSidebarSectionBackground').shouldBeRegistered()
  })

  it('should not proceed if no result is returned from custom component name generator', () => {
    h.expectErrorMessage(() => {
      vue.use(mockedComponentRegistrar, {
        mockedDir: './tests/components/unique',
        customNameGenerator: () => ''
      })
    },
    'Component name is empty')
    h.expectErrorMessage(() => {
      vue.use(mockedComponentRegistrar, {
        mockedDir: './tests/components/unique',
        customNameGenerator: () => { }
      })
    },
    'Component name is empty')
  })

  it('should not proceed if no VUE_REGISTRAR_COMPONENTS_PATH is set', () => {
    h.expectErrorMessage(
      () => { vue.use(realComponentRegistrar, {}) },
      'VUE_REGISTRAR_COMPONENTS_DIR is not defined')
  })
})
