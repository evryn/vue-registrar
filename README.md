<p align="center">
  <a href="https://amirrezanasiri.github.io/vue-registrar/">
    <img alt="vue-registrar" src="./docs/assets/logo.png" width="150">
  </a>
  <h1 align="center">Vue Registrar</h1>
</p>

<p align="center">
  A dynamic component registrar and Vuex module assembler
</p>

<p align="center">
    <a href="https://www.npmjs.com/package/vue-registrar"><img src="https://img.shields.io/npm/dt/vue-registrar.svg"></a>
    <a href="https://travis-ci.org/AmirrezaNasiri/vue-registrar"><img src="https://travis-ci.org/AmirrezaNasiri/vue-registrar.svg?branch=master"></a>
    <img src="https://img.shields.io/david/AmirrezaNasiri/vue-registrar.svg">
    <img src="https://img.shields.io/github/last-commit/AmirrezaNasiri/vue-registrar.svg">
    <a href="https://standardjs.com/"><img src="https://img.shields.io/badge/code%20style-standard-brightgreen.svg"></a>
</p>
<br>

A Vue.js package that makes your code a lot cleaner and much more understandable.

## Quick Start
🔥 Let just <a href="https://amirrezanasiri.github.io/vue-registrar/#/getting-started/installation"><strong>get started!</strong></a>!

## What is this technically?
Vue Registrar is consisted of two modules that:
 * Registers all common components globally and stops need for importing them manually;
 * Assembles all your vuex modules in a nested manner.   
 
 <a href="https://amirrezanasiri.github.io/vue-registrar/#/getting-started/installation"><strong>See Documents.</strong></a>
 
## Why should I use it?
No more words! see yourself:   

### Using Component Registrar
![vue-dynamic-component-registrar](./docs/assets/component-registrar-usage.png)

If you're familiar with following structure, you'll need it:
```vue
// hello-world.vue
<template> ... </template>
<script>
import Something from './path/to/it'
export default {
  components: { Something }
}
</script>
```
Because by using this, you just need to consider your template:
```vue
// hello-world.vue
<template> ... </template>
```

### Using Vuex Module Assembler
![vuex-dynamic-nested-module-assembler](./docs/assets/vuex-module-assembler-usage.png)

If you're using Vuex modules (especially in a nested or namespaced manner) like this, you'll need it:
```javascript
// store.js
import moduleAlphaState from './path/to/moduleAlpha/state'
import moduleAlphaActions from './path/to/moduleAlpha/actions'
import moduleBeta from './path/to/moduleBeta'

export default {
  a: {
    state: moduleAlphaState,
    actions: moduleAlphaActions,
    namespaced: true,
    modules: {
      nestedB: moduleBeta
    }
  }
}
</script>
```
Because using this, you don't need to do that! just follow a directory structure!
```
vuex-modules/
└── a
    ├── actions.js
    ├── state.js
    └── b
        ├── actions.js
        ├── getters.js
        ├── mutations.js
        └── state.js
```

## Contribution
Any kind of help is appreciated! Feel free to report bugs, extend functionality and features. Pull Requests will be reviewed as soon as possible.

## License
Code is licensed under the [MIT License](LICENSE).

# See Also
* [ByteGate](https://bytegate.ir/) (our blog)
* [تبدیل PDF به ورد](http://delix.ir/) (our sponsored service)
