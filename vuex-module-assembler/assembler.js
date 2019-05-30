export default ({ requireContext, modules, excludedFiles }) => {
  modules = modules || {}

  requireContext.keys().forEach((filename) => {
    if (excludedFiles && excludedFiles.includes(filename)) return

    const path = filename.replace(/(\.\/|\.js)/g, '').replace(/(\\)/g, '/').split('/')
    const max = path.length - 1

    // It'll go through all parts of a path and register the module.
    path.reduce((accumulator, current, index) => {
      if (index === max) {
        accumulator[current] = requireContext(filename).default
      } else if (max - index === 1 && !accumulator[current]) {
        accumulator[current] = { namespaced: true }
      } else if (!accumulator[current]) {
        accumulator[current] = { namespaced: true, modules: {} }
      }
      return accumulator[current].modules || accumulator[current]
    }, modules)
  })

  return modules
}
