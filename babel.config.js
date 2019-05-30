module.exports = {
  presets: ['@babel/preset-env'],
  'env': {
    'test': {
      'plugins': ['require-context-hook']
    }
  }
}
