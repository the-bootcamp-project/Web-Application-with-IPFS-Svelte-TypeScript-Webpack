import _ from 'lodash'
import { default as path } from 'path'
import type Webpack from 'webpack'
import type WebpackDev from 'webpack-dev-server'
import CopyPlugin from 'copy-webpack-plugin'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import CspHtmlWebpackPlugin from 'csp-html-webpack-plugin'
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin'

import { WebpackConfigProd, WebpackConfigDev } from '@bootcamp-project/webpack-config'
import { WebpackSvelteDev, WebpackSvelteProd } from '@bootcamp-project/svelte-config'

const SRC_DIR = path.resolve(__dirname, 'src')
const DEST_DIR = path.resolve(__dirname, 'build')
const DEP_DIR = path.resolve(__dirname, 'node_modules')
const TEMPLATES_DIR = path.resolve(SRC_DIR, 'templates')

const mode = process.env['NODE_ENV'] ?? 'development'
const isProduction = mode === 'production'

const DEV_CSP = { 'script-src': ["'self'", "'unsafe-eval'"], 'style-src': ["'self'"] }
const PROD_CSP = { 'script-src': ["'self'"], 'style-src': ["'self'"] }
const CSP = isProduction ? PROD_CSP : DEV_CSP

export const WebpackConfig: Webpack.Configuration | WebpackDev.Configuration = {
    context: path.resolve(__dirname),

    entry: {
        /* App Pages */
        index: path.resolve(SRC_DIR, 'App.ts')
    },

    output: { filename: '[name].js', path: DEST_DIR, clean: true },

    module: {
        rules: [
            { test: /\.jsx?$/, loader: 'babel-loader', exclude: /node_modules/ },
            { test: /\.tsx?$/, loader: 'ts-loader', options: { transpileOnly: true }, exclude: /node_modules/ },
            { test: /node_modules\/svelte\/.*\.mjs$/, resolve: { fullySpecified: false } },
            { test: /\.css$/, use: { loader: "postcss-loader" } }
        ]
    },

    plugins: [
        /* Application Pages */
        new HtmlWebpackPlugin({ title: 'index', filename: 'index.html', template: path.resolve(TEMPLATES_DIR, 'default.html'), chunks: ['index'] }),
        /* Generate Content Security Policy Meta Tags */
        new CspHtmlWebpackPlugin(CSP),
        new CopyPlugin({
            patterns: [
                /* Copy _locales */
                { from: path.resolve('i18n'), to: path.resolve(DEST_DIR, 'i18n'), force: true }
            ]
        }),
        new ForkTsCheckerWebpackPlugin({ typescript: { enabled: true, configFile: path.resolve(__dirname, 'tsconfig.json') } }),
    ]
};

export const WebpackDevMode: Webpack.Configuration | WebpackDev.Configuration = _.merge(WebpackConfig, {
    ...WebpackConfigDev,

    module: {
        rules: [
            { test: /\.svelte$/, use: { loader: 'svelte-loader', options: WebpackSvelteDev } }
        ]
    }
})

export const WebpackProdMode: Webpack.Configuration | WebpackDev.Configuration = _.merge(WebpackConfig, {
    ...WebpackConfigProd,

    module: {
        rules: [
            { test: /\.svelte$/, use: { loader: 'svelte-loader', options: WebpackSvelteProd } }
        ]
    }
})
