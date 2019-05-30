import assembler from './assembler'

export default ({ modules, excludedFiles } = {}) => {
  if (!VUE_REGISTRAR_VUEX_MODULES_DIR) { throw Error('vue-registrar: VUE_REGISTRAR_VUEX_MODULES_DIR is not defined. To resolve the issue, see: ') }
  const requireContext = require.context(VUE_REGISTRAR_VUEX_MODULES_DIR, true, /\.js$/)
  return assembler({ requireContext, modules, excludedFiles })
}
