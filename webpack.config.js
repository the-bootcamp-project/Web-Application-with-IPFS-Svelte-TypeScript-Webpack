const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
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
	mode: isProduction ? 'production' : 'development',
    devtool: 'inline-source-map',

    entry: './src/index.ts',
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, 'dist'),
        clean: true,
    },
    resolve: {
        alias: {
            svelte: path.resolve('node_modules', 'svelte')
        },
        extensions: ['.mjs', '.js', '.ts', '.svelte'],
        mainFields: ['svelte', 'browser', 'module', 'main']
    },
    module: {
        rules: [
            { test: /\.(png|svg|jpg|jpeg|gif)$/i, type: 'asset/resource' },
            { test: /\.(woff|woff2|eot|ttf|otf)$/i, type: 'asset/resource' },
            { test: /\.html$/i, loader: "html-loader" },
            { test: /\.md$/, use: [{ loader: "html-loader" },{ loader: "markdown-loader", options: { pedantic: true, renderer }}]},
            { test: /\.toml$/i, type: 'json', parser: { parse: toml.parse } },
            { test: /\.yaml$/i, type: 'json', parser: { parse: yaml.parse } },
            { test: /\.json5$/i, type: 'json', parser: { parse: json5.parse } },
            { test: /\.ts?$/, loader: "ts-loader" },
            { test: /\.svelte$/ ,use: { loader: 'svelte-loader', options: { emitCss: isProduction, preprocess: SveltePreprocess({ scss: true, sass: true, postcss: { plugins: [Autoprefixer] } }) } } },
            { test: /\.(scss|sass)$/, use: [ 'css-loader', { loader: 'postcss-loader', options: { postcssOptions: { plugins: [Autoprefixer] } } }, 'sass-loader'] },
            { test: /\.css$/, use: 'css-loader' },
            { test: /node_modules\/svelte\/.*\.mjs$/, resolve: { fullySpecified: false } } // required to prevent errors from Svelte on Webpack 5+, omit on Webpack 4
        ],
    },
    plugins: [
        new HtmlWebpackPlugin()
    ],
    devServer: { static: './dist' },
};
