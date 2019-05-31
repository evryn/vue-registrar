# Common Problems

This page covers most of the problems that may occur using the packages and of course their solutions.  
Most of the problems are cause because of wrong `DefinePlugin` usage.  
So consider the following code inside `vue.config.js` file in your root as general solution; we'll talk why you're facing some errors or warnings:
```javascript
// vue.config.js
const webpack = require('webpack')
module.exports = {
  // ...
  configureWebpack: {
    plugins: [
      // ...
      new webpack.DefinePlugin({
        VUE_REGISTRAR_COMPONENTS_DIR  : JSON.stringify(`${__dirname}/src/components`),
        VUE_REGISTRAR_VUEX_MODULES_DIR: JSON.stringify(`${__dirname}/src/vuex-modules`)
      })
    ],
  }
}
```
!> If the file `vue.config.js` doesn't exist in the root of project, simply create a file with that name. Vue should automatically consider that.

## Webpack warning: Critical dependency

If you face any warning in the output of your build like this:
```
warning  in ./node_modules/vue-registrar/component-registrar/index.js
Critical dependency: require function is used in a way in which dependencies cannot be statically extracted
```
Or
```
warning  in ./node_modules/vue-registrar/vuex-module-assembler/index.js
Critical dependency: require function is used in a way in which dependencies cannot be statically extracted
```

### Causes:
* Global constants are not defined:
This means that one or both of global webpack constants are not defined. They are:
* `VUE_REGISTRAR_COMPONENTS_DIR`: Required for component registrar feature
* `VUE_REGISTRAR_VUEX_MODULES_DIR`: Required for vuex module assembler feature

* Global constants are not wapped by `JSON.stringify`:
Without using `JSON.stringify` to specify their value, webpack will NOT replace constants their string values we are needed.  
It may even cause the builder to throw a `SyntaxError: Unexpected token` error too.


### Solution:
+ Double check that you're defining whatever constraint required.
+ Make sure that you're wrapping the whole string inside `JSON.stringfy`.


## Webpack Error: [Something] was not found
You may also face following errors too:
```
These relative modules were not found:

* ./src/components in ./node_modules/vue-registrar/component-registrar/index.js
* ./src/store/modules in ./node_modules/vue-registrar/vuex-module-assembler/index.js
```

Or 
```
These dependencies were not found:

* @/src/components in ./node_modules/vue-registrar/component-registrar/index.js
* @/src/store/modules in ./node_modules/vue-registrar/vuex-module-assembler/index.js
```
### Cause:
The cause is pretty simple. The way `DefinePlugin` passes strings are not what we're expected. This means:  
* No aliases will be resolved (i.e. `@/path/in/project` doesn't exist since `@` is not resolved to project root)
* Passed paths are relative to the module files not your project root (i.e. neither `/path/in/project` nor `./path/in/project` exists in perspective of module root)

### Solution:
+ Use `__dirname`  to refer your projects root. So the sub-directories would be for example `${__dirname}/src/sub-dir`.

## Still not working?
If it still throws the same warning messages, it might be a problem with your `vue.config.js` file that is not being read correctly. Check out if your Vue.js version is old enough not to consider `vue.config.js`. In this case `webpack.config.js` file might be your solution.  
And of course, don't hesitate to [submit an issue](https://github.com/AmirrezaNasiri/vue-registrar/issues) if you're still facing problems.
