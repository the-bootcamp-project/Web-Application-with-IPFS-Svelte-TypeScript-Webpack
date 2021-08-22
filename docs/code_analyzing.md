# Code Analyzing

```bash
yarn add --dev fork-ts-checker-webpack-plugin eslint @typescript-eslint/parser @typescript-eslint/eslint-plugin
```

```javascript
module.exports = {
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaVersion: 'browser',
        sourceType: 'module',
    },
    extends: [
        'plugin:@typescript-eslint/recommended',  // Uses the recommended rules from the @typescript-eslint/eslint-plugin
        'plugin:prettier/recommended',  // Enables eslint-plugin-prettier and displays prettier errors as ESLint errors. Make sure this is always the last configuration in the extends array.
    ],
    rules: {
        // place to specify ESLint rules - can be used to overwrite rules specified from the extended configs
        // e.g. "@typescript-eslint/explicit-function-return-type": "off",
    }
};

```

```javascript
plugins: [
    ...
    new ForkTsCheckerWebpackPlugin({ eslint: { files: './src/**/*.{ts,js}' } })
],
```

```javascript
"scripts": {
    ...
    "lint": "eslint src/**/*.{ts,js} --fix",
    ...
},
```

## Adding Prettier

```bash
yarn add --dev prettier eslint-config-prettier eslint-plugin-prettier
```

```javascript
module.exports =  {
    semi: true,
    trailingComma: 'all',
    singleQuote: true,
    printWidth: 120,
    tabWidth: 4,
};
```

## Adding Security Plugin

```bash
yarn add --dev eslint-plugin-security
```

```javascript
module.exports = {
    plugins: ["security"],
    extends: [

        "plugin:security/recommended"
    ],
};
```
