# Expand our project

## Add Static Assets Support

```javascript
module: {
    rules: [
        { test: /\.(png|svg|jpg|jpeg|gif)$/i, type: 'asset/resource' },
        { test: /\.(woff|woff2|eot|ttf|otf)$/i, type: 'asset/resource' },
    ],
},
```

## Add HTML Support

```bash
yarn add --dev html-loader html-webpack-plugin
```

```javascript
module: {
    rules: [
        ...
        { test: /\.html$/i, loader: "html-loader" },
    ],
},
plugins: [
    new HtmlWebpackPlugin()
],
```

delete the `dist/index.html`

## Add Markdown Support

```bash
yarn add --dev markdown-loader @types/marked
```

```javascript
module: {
    rules: [
        ...
        { test: /\.md$/, use: [{ loader: "html-loader" },{ loader: "markdown-loader", options: { pedantic: true, renderer }}]},
    ],
},
```

## Add Support for configuration with Toml, Yaml and JSON

```bash
yarn add --dev toml yamljs @types/yamljs json5
```

```javascript
module: {
    rules: [
        ...
        { test: /\.toml$/i, type: 'json', parser: { parse: toml.parse } },
        { test: /\.yaml$/i, type: 'json', parser: { parse: yaml.parse } },
        { test: /\.json5$/i, type: 'json', parser: { parse: json5.parse } },
    ],
},
```

run `yarn run build` it should bundle the Source Code without any Error/Warning, double check with `yarn run preview` if you like what you see.
