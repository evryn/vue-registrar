import upperFirst from 'lodash.upperfirst'
import camelCase from 'lodash.camelcase'

export default ({ Vue, requireContext, customNameGenerator }) => {
  requireContext.keys().forEach((filename) => {
    const component = requireContext(filename)

    // Turn './some/kind/of/component.vue' to 'SomeKindOfComponent'
    let componentName = filename.replace(/^\.\//, '').replace(/\.\w+$/, '')
    componentName = upperFirst(camelCase(componentName))

    if (customNameGenerator) {
      componentName = customNameGenerator({
        filename,
        component,
        suggestedName: componentName
      })
      if (!componentName) { throw Error(`vue-registrar: Component name is empty. Are you sure you're returning a string in your custom name generator callback and it's not sync somehow?`) }
    }

    componentName = `${componentName}`

    if (Vue.options.components[componentName]) { throw Error(`vue-registrar: Component "${componentName}" has already been registered globally. You can't register two component with same name. Current component path failed to register: ${filename}`) }

    Vue.component(componentName, component.default || component)
  })
}
