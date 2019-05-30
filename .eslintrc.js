module.exports = {
    "env": {
        "jest/globals": true
    },
    "extends": ["standard", "plugin:jest/recommended"],
    "plugins": ["jest"],
    "globals": {
        "VUE_REGISTRAR_COMPONENTS_DIR": "readonly",
        "VUE_REGISTRAR_VUEX_MODULES_DIR": "readonly",
        "Atomics": "readonly",
        "SharedArrayBuffer": "readonly"
    },
    "parserOptions": {
        "ecmaVersion": 2018,
        "sourceType": "module"
    },
    "rules": {
    }
};