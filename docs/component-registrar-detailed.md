# Component Registrar


It'll basically find every `.vue` file in its given entry directory (by a global constant named `VUE_REGISTRAR_COMPONENTS_DIR`) and registers them globally according to its path.

## Default naming rule
You can customize how component names should be registered (see options section) however the default name generator will compute the name according to component file name and its containing directory. They'll be name in _FullCamelCase_ mode. Here are some examples:  
```
src/components
├── MainContainer.vue           -> MainContainer
├── content
│   └── Container.vue           -> ContentContainer
└── sidebar
    ├── Section.vue             -> SidebarSection
    └── section
        ├── Background.vue      -> SidebarSectionBackground
        └── Item.vue            -> SidebarSectionItem
```

## Options

Component Registrar accepts following options:

#### customNameGenerator
A custom component name generator function which will be used instead of default one explained in _Default naming rule_ section.   
A destructive object with following properties will be passed to your function:
 * filename: Actual filename of the component (e.g.: `./sidebar/section/Background.vue`)
 * component: Actual content of the component
 * suggestedName: Suggested name according to default naming rule (e.g.: `SidebarSectionBackground`)

?> Your function must return a string

 Example:
 ```javascript
Vue.use(componentRegistrar, {
    customNameGenerator: ( { filename, component, suggestedName } ) => {
      return `Modified${suggestedName}`
    }
})
// Result: ModifiedSidebarSectionBackground, ...
```