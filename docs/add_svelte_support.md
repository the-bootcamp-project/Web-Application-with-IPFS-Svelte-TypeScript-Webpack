# Add Svelte Support

```bash
yarn add cross-env
```

```json
{
    "scripts": {
        "build": "cross-env NODE_ENV=production webpack",
        "watch": "webpack --watch",
        "preview": "webpack serve --open",
        "test": "echo \"Error: no test specified\" && exit 1"
    },
}
```

```bash
yarn add --dev svelte svelte-loader svelte-preprocess css-loader sass sass-loader postcss postcss-loader autoprefixer
```

```javascript
mode: isProduction ? 'production' : 'development',
...
resolve: {
    alias: {
        svelte: path.resolve('node_modules', 'svelte')
    },
    extensions: ['.mjs', '.js', '.ts', '.svelte'],
    mainFields: ['svelte', 'browser', 'module', 'main']
},
module: {
    rules: [
        ...
        { test: /\.svelte$/ ,use: { loader: 'svelte-loader', options: { emitCss: isProduction, preprocess: SveltePreprocess({ scss: true, sass: true, postcss: { plugins: [Autoprefixer] } }) } } },
        { test: /\.(scss|sass)$/, use: [ 'css-loader', { loader: 'postcss-loader', options: { postcssOptions: { plugins: [Autoprefixer] } } }, 'sass-loader'] },
        { test: /\.css$/, use: 'css-loader' },
        { test: /node_modules\/svelte\/.*\.mjs$/, resolve: { fullySpecified: false } } // required to prevent errors from Svelte on Webpack 5+, omit on Webpack 4
    ],
},
```

```typescript
import App from './components/main/App.svelte';

const app = new App({
    target: document.body
});

export default app;
```

```html
<script lang="ts">
    let name: string = 'world';
</script>

<main>
    <h1>Hello {name}!</h1>
    <p>Visit the <a href="https://svelte.dev/tutorial">Svelte tutorial</a> to learn how to build Svelte apps.</p>
</main>

<style lang="scss">
    main {
        text-align: center;
        padding: 1em;
        max-width: 240px;
        margin: 0 auto;

        h1 {
            color: #ff3e00;
            text-transform: uppercase;
            font-size: 4em;
            font-weight: 100;
        }

        @media (min-width: 640px) {
            max-width: none;
        }
    }
</style>
```

```json
{
  "compilerOptions": {
    /* Visit https://aka.ms/tsconfig.json to read more about this file */

    /* Basic Options */
    // "incremental": true,                         /* Enable incremental compilation */
    "target": "ES2015",                             /* Specify ECMAScript target version: 'ES3' (default), 'ES5', 'ES2015', 'ES2016', 'ES2017', 'ES2018', 'ES2019', 'ES2020', 'ES2021', or 'ESNEXT'. */
    "module": "es2015",                             /* Specify module code generation: 'none', 'commonjs', 'amd', 'system', 'umd', 'es2015', 'es2020', or 'ESNext'. */

    "types": ["svelte","svelte/store","svelte/motion","svelte/transition","svelte/animate","svelte/easing"], /* Type declaration files to be included in compilation. */

  },
  "exclude": ["node_modules/*"],
}
```
