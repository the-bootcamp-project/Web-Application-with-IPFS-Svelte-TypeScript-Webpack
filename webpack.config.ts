import path from 'path';
import Webpack from 'webpack';
import WebpackDev from 'webpack-dev-server';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import CspHtmlWebpackPlugin from 'csp-html-webpack-plugin';

import marked from 'marked';
const renderer = new marked.Renderer();
import toml from 'toml';
import yaml from 'yamljs';
import json5 from 'json5';
import SveltePreprocess from 'svelte-preprocess';
import Autoprefixer from 'autoprefixer';

const loadersRulesInclude = [
    path.resolve(__dirname, 'src'),
]
const loadersRulesExclude = [
    path.resolve(__dirname, 'node_modules'),
]

const mode = process.env['NODE_ENV'] ?? 'development';
const isProduction = mode === 'production';
const isDevelopment = !isProduction;

const config: Configuration = {
	target: isDevelopment ? 'web' : 'browserslist',

	mode:       isProduction    ? 'production' : 'development',
    devtool:    isDevelopment   ? 'eval-cheap-module-source-map' : undefined,

    context: __dirname, // to automatically find tsconfig.json

    entry: path.resolve(__dirname, 'src', 'index.ts'),
    output: { filename: 'index.js', path: path.resolve(__dirname, 'dist'), clean: true },

    resolve: {
        alias: {
            svelte: path.resolve('node_modules', 'svelte')
        },
        extensions: ['.mjs', '.js', '.ts', '.svelte'],
        mainFields: ['svelte', 'browser', 'module', 'main']
    },

    module: {
        rules: [
            /* Images */        { test: /\.(png|svg|jpg|jpeg|gif)$/i, type: 'asset/resource', include: loadersRulesInclude, exclude: loadersRulesExclude },
            /* Fonts */         { test: /\.(woff|woff2|eot|ttf|otf)$/i, type: 'asset/resource', include: loadersRulesInclude, exclude: loadersRulesExclude },
            /* HTML */          { test: /\.html$/i, loader: "html-loader", include: loadersRulesInclude, exclude: loadersRulesExclude },
            /* Markdown */      { test: /\.md$/, use: [{ loader: "html-loader" },{ loader: "markdown-loader", options: { pedantic: true, renderer }}], include: loadersRulesInclude, exclude: loadersRulesExclude },
            /* Toml */          { test: /\.toml$/i, type: 'json', parser: { parse: toml.parse }, include: loadersRulesInclude, exclude: loadersRulesExclude },
            /* Yaml */          { test: /\.yaml$/i, type: 'json', parser: { parse: yaml.parse }, include: loadersRulesInclude, exclude: loadersRulesExclude },
            /* Json */          { test: /\.json5$/i, type: 'json', parser: { parse: json5.parse }, include: loadersRulesInclude, exclude: loadersRulesExclude },
            /* TypeScript */    { test: /\.ts?$/, loader: "ts-loader", options: { happyPackMode: true, transpileOnly: true }, include: loadersRulesInclude, exclude: loadersRulesExclude }, // transpileOnly - disable type checker - we will use it in fork plugin
            /* Svelte */        { test: /\.svelte$/, use: { loader: 'svelte-loader', options: { emitCss: isProduction, preprocess: SveltePreprocess({ scss: true, sass: true, postcss: { plugins: [Autoprefixer] } }) } }, include: loadersRulesInclude, exclude: loadersRulesExclude },
            /* Styles */        { test: /\.(css|scss|sass)$/, use: ['css-loader', { loader: 'postcss-loader', options: { postcssOptions: { plugins: [Autoprefixer] } } }, 'sass-loader'], include: loadersRulesInclude, exclude: loadersRulesExclude },
            /* Svelte */        { test: /node_modules\/svelte\/.*\.mjs$/, resolve: { fullySpecified: false } } // required to prevent errors from Svelte on Webpack 5+, omit on Webpack 4
        ],
    },

    plugins: [
        new HtmlWebpackPlugin(),
        new CspHtmlWebpackPlugin({ 'script-src': '', 'style-src': '' })
    ],

    devServer: {
        hot: true,
        stats: 'errors-only',
        contentBase: 'public',
        watchContentBase: true
    },
};

/**
 * This interface combines configuration from `webpack` and `webpack-dev-server`. You can add or override properties in this interface to change the config object type used above.
 */
export interface Configuration extends Webpack.Configuration, WebpackDev.Configuration {}

export default config;
