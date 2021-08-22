const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CspHtmlWebpackPlugin = require('csp-html-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

const marked = require("marked");
const renderer = new marked.Renderer();
const toml = require('toml');
const yaml = require('yamljs');
const json5 = require('json5');
const SveltePreprocess = require('svelte-preprocess');
const Autoprefixer  = require('autoprefixer');

const mode = process.env.NODE_ENV ?? 'development';
const isProduction = mode === 'production';
const isDevelopment = !isProduction;

module.exports = {
    target: 'browserslist',

	mode:       isProduction    ? 'production' : 'development',
    devtool:    isDevelopment   ? 'eval-cheap-module-source-map' : undefined,
    context: __dirname, // to automatically find tsconfig.json

    entry: path.resolve(__dirname, 'src', 'index.ts'),
    output: { filename: 'main.js', path: path.resolve(__dirname, 'dist'), clean: true },

    resolve: {
        alias: {
            svelte: path.resolve('node_modules', 'svelte')
        },
        extensions: ['.mjs', '.js', '.ts', '.svelte'],
        mainFields: ['svelte', 'browser', 'module', 'main']
    },

    module: {
        rules: [
            /* Images */        { test: /\.(png|svg|jpg|jpeg|gif)$/i, include: path.resolve(__dirname, 'src'), exclude: /node_modules/, type: 'asset/resource' },
            /* Fonts */         { test: /\.(woff|woff2|eot|ttf|otf)$/i, include: path.resolve(__dirname, 'src'), exclude: /node_modules/, type: 'asset/resource' },
            /* HTML */          { test: /\.html$/i, include: path.resolve(__dirname, 'src'), exclude: /node_modules/, loader: "html-loader" },
            /* Markdown */      { test: /\.md$/, include: path.resolve(__dirname, 'src'), exclude: /node_modules/, use: [{ loader: "html-loader" },{ loader: "markdown-loader", options: { pedantic: true, renderer }}]},
            /* Toml */          { test: /\.toml$/i, include: path.resolve(__dirname, 'src'), exclude: /node_modules/, type: 'json', parser: { parse: toml.parse } },
            /* Yaml */          { test: /\.yaml$/i, include: path.resolve(__dirname, 'src'), exclude: /node_modules/, type: 'json', parser: { parse: yaml.parse } },
            /* Json */          { test: /\.json5$/i, include: path.resolve(__dirname, 'src'), exclude: /node_modules/, type: 'json', parser: { parse: json5.parse } },
            /* TypeScript */    { test: /\.ts?$/, include: path.resolve(__dirname, 'src'), exclude: /node_modules/, loader: "ts-loader", options: { happyPackMode: true, transpileOnly: true } }, // transpileOnly - disable type checker - we will use it in fork plugin
            /* Svelte */        { test: /\.svelte$/, include: path.resolve(__dirname, 'src'), exclude: /node_modules/,use: { loader: 'svelte-loader', options: { emitCss: isProduction, preprocess: SveltePreprocess({ scss: true, sass: true, postcss: { plugins: [Autoprefixer] } }) } } },
            /* Styles */        { test: /\.(css|scss|sass)$/, include: path.resolve(__dirname, 'src'), exclude: /node_modules/, use: ['css-loader', { loader: 'postcss-loader', options: { postcssOptions: { plugins: [Autoprefixer] } } }, 'sass-loader'] },
            /* Svelte */        { test: /node_modules\/svelte\/.*\.mjs$/, resolve: { fullySpecified: false } } // required to prevent errors from Svelte on Webpack 5+, omit on Webpack 4
        ],
    },

    plugins: [
        new HtmlWebpackPlugin(),
        new CspHtmlWebpackPlugin({ 'script-src': '', 'style-src': '' }),
        new ForkTsCheckerWebpackPlugin({ eslint: { files: './src/**/*.{ts,js}' } })
    ],

    devServer: { static: './dist' },
};
