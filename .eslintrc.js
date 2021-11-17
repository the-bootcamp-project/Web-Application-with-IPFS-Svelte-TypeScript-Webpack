'use strict';

const ESlintConfig = require('@bootcamp-project/eslint-config/eslint.config')
module.exports = {
    ...ESlintConfig,
    rules: {
        // Place to specify ESLint rules. Can be used to overwrite rules specified from the extended configs
        // e.g. "@typescript-eslint/explicit-function-return-type": "off",
        // '@typescript-eslint/explicit-function-return-type': 'off',
        // '@typescript-eslint/no-unused-vars': 'off'
        // '@typescript-eslint/no-unsafe-assignment': 'off'
    }
}
