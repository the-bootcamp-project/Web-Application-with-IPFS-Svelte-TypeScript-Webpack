import path from 'path'
import Webpack from 'webpack'
import WebpackDev from 'webpack-dev-server'
import SpeedMeasurePlugin from 'speed-measure-webpack-plugin'
import CspHtmlWebpackPlugin from 'csp-html-webpack-plugin'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import CopyPlugin from 'copy-webpack-plugin'
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin'
import SveltePreprocess from 'svelte-preprocess'
import Autoprefixer from 'autoprefixer'

const DIST_DIR  = path.resolve(__dirname,'dist')
const SRC_DIR   = path.resolve(__dirname,'src')
const DEP_DIR   = path.resolve(__dirname,'node_modules')
const COMPO_DIR = path.resolve(SRC_DIR,'components')

const mode = process.env['NODE_ENV'] ?? 'development'
const isProduction = mode === 'production'
const isDevelopment = !isProduction

const OVERWRITE_DIST = true

const smp = new SpeedMeasurePlugin({ disable: !process.env['MEASURE'] });
const config: Configuration = smp.wrap({
	mode:       isDevelopment ? 'development' : 'production',
	target:     isDevelopment ? 'web' : 'browserslist',
    devtool:    isDevelopment ? 'eval-cheap-module-source-map' : undefined,

    context:    path.resolve(__dirname),

    entry: path.resolve(__dirname, 'src', 'index.ts'),
    output: { filename: '[name].js', path: DIST_DIR, clean: OVERWRITE_DIST },

    resolve: {
        alias: { svelte: path.resolve(DEP_DIR,'svelte') },
        extensions: ['.mjs', '.js', '.ts', '.svelte'],
        mainFields: ['svelte', 'browser', 'module', 'main'],
        symlinks: false,
        cacheWithContext: false
    },

    module: {
        rules: [
            /* Loading TypeScript */    { test: /\.ts?$/, loader: 'ts-loader', options: { happyPackMode: true, transpileOnly: true }, include: [SRC_DIR], exclude: [DEP_DIR] },
            /* Loading Svelte */        { test: /\.svelte$/, use: { loader: 'svelte-loader', options: { emitCss: isProduction, preprocess: SveltePreprocess({ scss: true, sass: true, postcss: { plugins: [Autoprefixer] } }) } }, include: [SRC_DIR], exclude: [DEP_DIR] },
                                        // required to prevent errors from Svelte on Webpack 5+, omit on Webpack 4
            /* Loading Svelte */        { test: /node_modules\/svelte\/.*\.mjs$/, resolve: { fullySpecified: false } },
            /* Loading Styles */        { test: /\.(c|s(a|c))ss$/, use: ['css-loader', { loader: 'postcss-loader', options: { postcssOptions: { plugins: [Autoprefixer] } } }, 'sass-loader'], include: [SRC_DIR], exclude: [DEP_DIR] },
            /* Loading Images */        { test: /\.(png|svg|jpg|jpeg|gif)$/i, type: 'asset/resource', include: [SRC_DIR], exclude: [DEP_DIR] },
            /* Loading Fonts */         { test: /\.(woff|woff2|eot|ttf|otf)$/i, type: 'asset/resource', include: [SRC_DIR], exclude: [DEP_DIR] }
        ],
    },

    plugins: [
        new HtmlWebpackPlugin(),
        new CspHtmlWebpackPlugin({ 'script-src': '', 'style-src': '' })
    ],

    devServer: { hot: true, stats: 'errors-only', watchContentBase: true }
});

// This interface combines configuration from `webpack` and `webpack-dev-server`. You can add or override properties in this interface to change the config object type used above.
export interface Configuration extends Webpack.Configuration, WebpackDev.Configuration {}

export default config;
