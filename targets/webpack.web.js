/* eslint-disable @typescript-eslint/no-var-requires */

const path = require("path");
const { merge } = require("webpack-merge");
const common = require("../webpack.config.js");

const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CspHtmlWebpackPlugin = require("csp-html-webpack-plugin");

const BUILD_DIR = path.resolve("build", "web");

const SRC_DIR = path.resolve("src");

const PAGES_DIR = path.resolve(SRC_DIR, "pages");
const TEMPLATES_DIR = path.resolve(SRC_DIR, "templates");
const IMAGES_DIR = path.resolve(SRC_DIR, "assets", "images");

const PUBLIC_DIR = path.resolve(SRC_DIR, "assets", "public");

const CSP_RULES = {
    "base-uri": "'self'",
    "object-src": "'none'",
    "script-src": ["'self'"],
    "style-src": ["'unsafe-inline'", "'self'"],
    // 'script-src': ["'unsafe-inline'", "'self'", "'unsafe-eval'"],
    // 'style-src': ["'unsafe-inline'", "'self'", "'unsafe-eval'"]
};

module.exports = merge(common, {
    // devtool: 'cheap-module-source-map',

    entry: {
        // React Components
        index: path.resolve(PAGES_DIR, "index.tsx"),
        bookmarks: path.resolve(PAGES_DIR, "bookmarks.tsx"),
        insertBookmarks: path.resolve(PAGES_DIR, "insertBookmarks.tsx"),
        settings: path.resolve(PAGES_DIR, "settings.tsx"),
    },

    output: { path: BUILD_DIR, filename: "[name].js" },

    plugins: [
        new CleanWebpackPlugin({ verbose: false }),
        new CopyWebpackPlugin({ patterns: [{ from: IMAGES_DIR, to: BUILD_DIR }] }),
        new CopyWebpackPlugin({ patterns: [{ from: PUBLIC_DIR, to: BUILD_DIR }] }),
        // HTML Templates
        new HtmlWebpackPlugin({
            template: path.resolve(TEMPLATES_DIR, "index.html"),
            filename: "index.html",
            hash: true,
            cache: true,
            chunks: ["index"],
            excludeChunks: ["background"],
        }),
        new HtmlWebpackPlugin({
            template: path.resolve(TEMPLATES_DIR, "bookmarks.html"),
            filename: "bookmarks.html",
            hash: true,
            cache: true,
            chunks: ["bookmarks"],
            excludeChunks: ["background"],
        }),
        new HtmlWebpackPlugin({
            template: path.resolve(TEMPLATES_DIR, "insertBookmarks.html"),
            filename: "insertBookmarks.html",
            hash: true,
            cache: true,
            chunks: ["insertBookmarks"],
            excludeChunks: ["background"],
        }),
        new HtmlWebpackPlugin({
            template: path.resolve(TEMPLATES_DIR, "settings.html"),
            filename: "settings.html",
            hash: true,
            cache: true,
            chunks: ["settings"],
            excludeChunks: ["background"],
        }),
        // Content Security Policy
        new CspHtmlWebpackPlugin(CSP_RULES, {
            enabled: true,
            hashingMethod: "sha256",
            hashEnabled: { "script-src": true, "style-src": true },
            nonceEnabled: { "script-src": true, "style-src": true },
        }),
    ],
});
