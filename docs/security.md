# Security

```bash
yarn add --dev csp-html-webpack-plugin @types/csp-html-webpack-plugin
```

```javascript
const CspHtmlWebpackPlugin = require('csp-html-webpack-plugin');

module.exports = {

    plugins: [
        new HtmlWebpackPlugin(),
        new CspHtmlWebpackPlugin({ 'script-src': '', 'style-src': '' }),

    ],

};
```
