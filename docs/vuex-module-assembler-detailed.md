# Vuex Module Assembler

The assembler is a function that must be imported from 'vue-registrar/vuex-module-assembler'. The returned value is an object of assembled modules which is ready to be used inside a `Vuex.Store` instance.
```javascript
import moduleAssembler from 'vue-registrar/vuex-module-assembler'
const modules = moduleAssembler( /* optional options; see below. */ )
/*
...
const store new Vuex.Store({
  modules,
  ...
})
 */
```

It'll basically create a namespaced module according to nested directory names it faces in its given entry directory (by a global constant named `VUE_REGISTRAR_VUEX_MODULES_DIR`). After so, it'll try to find any `.js` file inside the directories and will register their contents as current module (current dir) body.

## Default naming rule
As it's just been told, every directory will be a nested namespaced module of its parent directory and every `.js` file will be added to its body. Name of `.js` files will represent their key and their content will be the keys' value. For example:
```
src/vuex-modules
└── a
    ├── actions.js
    └── state.js
```

```javascript
// a/actions.js
export default {
  doSomething () { return true }
}
```

```javascript
// a/state.js
export default {
  name: 'Superman'
}
```

Will be assembled like this:
```javascript
return {
    a: {
        namespaced: true,
        state: {
          name: 'Superman'
        },
        actions: {
          doSomething () { return true }
        },
    }
}
```


## Options

Vuex module assembler accepts following options:

#### modules
If you have predefined custom modules in any manner, pass it as destructive `modules` option. The assembler will extend it.

For example:
 ```javascript
let modules = {
  bozgolakh: {
    namespaced: true,
    state: {
      health: 12
    },
    mutations: {
      SET_HEALTH: () => {}
    },
    actions: {
      attack: () => {},
      move: () => {}
    },
    getters: {
      getId: () => {}
    }
  }
}

modules = moduleAssembler({ modules })
// Result: assembled module merged with predefined modules.
```