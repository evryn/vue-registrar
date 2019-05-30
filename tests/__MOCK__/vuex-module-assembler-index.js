import assembler from '../../vuex-module-assembler/assembler'

export default ({ modules, excludedFiles, mockedDir }) => {
  const requireContext = require.context(`../../${mockedDir}`, true, /\.js$/)
  return assembler({ requireContext, modules, excludedFiles })
}
