import register from './register'

export default {
  install (Vue, { customNameGenerator } = {}) {
    if (!VUE_REGISTRAR_COMPONENTS_DIR) { throw Error('vue-registrar: VUE_REGISTRAR_COMPONENTS_DIR is not defined. To resolve the issue, see: ') }
    const requireContext = require.context(VUE_REGISTRAR_COMPONENTS_DIR, true, /\.vue$/)
    register({ Vue, requireContext, customNameGenerator })
  }
}
