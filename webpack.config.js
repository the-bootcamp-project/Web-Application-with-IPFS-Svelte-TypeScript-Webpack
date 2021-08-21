const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const marked = require("marked");
const renderer = new marked.Renderer();
const toml = require('toml');
const yaml = require('yamljs');
const json5 = require('json5');

module.exports = {
    mode: 'development',
    devtool: 'inline-source-map',
    entry: './src/index.ts',
    output: {
        filename: 'main.js', path: path.resolve(__dirname, 'dist'),
        clean: true,
    },
    resolve: {
        extensions: [".ts", ".js"] // Add `.ts` as a resolvable extension.
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
            { test: /\.ts?$/, loader: "ts-loader" }
        ],
    },
    plugins: [
        new HtmlWebpackPlugin()
    ],
    devServer: { static: './dist' },
};
