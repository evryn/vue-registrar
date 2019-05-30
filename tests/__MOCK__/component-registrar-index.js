import register from '../../component-registrar/register'

export default {
  install (Vue, { mockedDir, customNameGenerator }) {
    const requireContext = require.context(`../../${mockedDir}`, true, /\.vue$/)
    register({ Vue, requireContext, customNameGenerator })
  }
}
