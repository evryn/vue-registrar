# Using Component Registrar

You're about to end importing and registering `.vue` components locally. In order to do so, you'll need to:

## Preparing Module
### 1. Define entry point
Consider a specific directory to put your common components there. For example:
```
.       <--- Root of your project
├── dist
├── public
└── src
    ├── assets
    ├── vuex-modules
    ├── components      <--- For example, put your common components here.
    ├── plugins
    └── views
```

In this example, `` `${__dirname}/src/components` `` will be the component registrar entry directory.

Component registrar is going to use a global webpack related constant named `VUE_REGISTRAR_COMPONENTS_DIR` to specify its entry path.  
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
        VUE_REGISTRAR_COMPONENTS_DIR  : JSON.stringify(`${__dirname}/src/components`),
        // VUE_REGISTRAR_VUEX_MODULES_DIR: JSON.stringify(`${__dirname}/src/vuex-modules`)
      })
    ],
  }
}
```

### 2. Register module
2- In your vue application entry file (usually `src/main.js`), use the registrar:
```javascript
// src/main.js
import Vue from 'vue'
import componentRegistrar from 'vue-registrar/component-registrar'

Vue.use(componentRegistrar, {}) // See `Component Registrar Feature` section for available options.
// ... rest of your main.js
```

!> Don't import from `'vue-registrar'` itself. Always use `'vue-registrar/component-registrar'`.


## Add your components

Put everything you want inside the entry directory of registrar:
```
src/components
├── MainContainer.vue
├── content
│   └── Container.vue
└── sidebar
    ├── Section.vue
    └── section
        ├── Background.vue
        └── Item.vue
```

And use them wherever you want without registering any of them:

?> See how component names are defined and change it if you need: [Component Registrar Feature](../component-registrar-detailed.md)

```vue
<template>
  <main-container>
    <section>
      <section-title>Something</section-title>
      <section-content>
        Hello World
        <section-content-button>
          Say Goodbye
        </section-content-button>
      </section-content>
    </section>
  </main-container>
</template>
```