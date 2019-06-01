# Using Vuex Module Assembler

You're about to organize your vuex modules or make them nested as long as you want.

?> Nesting means creating something like this: `$store.dispatch('admin/user/post/changeTitle')`

## Preparing Module
### 1. Define entry point
Consider a specific directory to put your vuex modules there. For example:
```
.       <--- Root of your project
├── dist
├── public
└── src
    ├── assets
    ├── vuex-modules    <--- For example, put your modules here.
    ├── components
    ├── plugins
    └── views
```

In this example, `` `${__dirname}/src/vuex-modules` `` will be the entry directory of vuex module assembler.

Vuex module assembler is going to use a global webpack related constant named `VUE_REGISTRAR_VUEX_MODULES_DIR` to specify its entry path.  
You'll need to define it using `DefinePlugin` webpack plugin in your `vue.config.js` in the root of your project.  

?> If you don't have `vue.config.js`, simply create it!

```javascript
// vue.config.js
const webpack = require('webpack')
module.exports = {
  // ...
  configureWebpack: {
    plugins: [
      new webpack.DefinePlugin({
        VUE_REGISTRAR_VUEX_MODULES_DIR: JSON.stringify(`${__dirname}/src/vuex-modules`)
        // VUE_REGISTRAR_COMPONENTS_DIR  : JSON.stringify(`${__dirname}/src/components`),
      })
    ],
  }
}
```

### 2. Import assembler
2- In your vue application's vuex store preparation file (usually `src/store.js`), use the assembler:
```javascript
// src/store.js
import Vue from 'vue'
import Vuex from 'vuex'
import moduleAssembler from 'vue-registrar/vuex-module-assembler'

const modules = moduleAssembler() // See `Vuex Module Assembler` section for available options.
Vue.use(Vuex)
const store = new Vuex.Store({
  // ...
  modules,
})

export default store
```

!> Don't import from `'vue-registrar'` itself. Always use `'vue-registrar/vuex-module-assembler'`.


Of course you need to use the created store in your Vue app:

```javascript
// src/main.js
import store from './store'
import Vue from 'vue'

new Vue({
  store,
  // ... other stuffs
  render: h => h(App)
}).$mount('#app')

```

## Add your modules

Put all of your vuex modules inside the entry directory of the assembler:
```
src/vuex-modules
├── admin
│   ├── discount
│   │   └── coupon
│   │       ├── actions.js
│   │       ├── getters.js
│   │       └── state.js
│   ├── state.js
│   └── user
│       ├── actions.js
│       ├── getters.js
│       ├── mutations.js
│       └── state.js
└── user
    ├── actions.js
    ├── getters.js
    ├── mutations.js
    └── state.js
```

And use them:   

?> See how module names and their properties are defined: [Vuex Module Assembler Feature](../vuex-module-assembler-detailed.md)
```vue
<script>
export default {
  // ...
  mounted() {
    console.log(this.$store.state.admin.discount.coupon.stateA)
    this.$store.dispatch('admin/discount/coupon/doSomething')
  }
}
</script>
```