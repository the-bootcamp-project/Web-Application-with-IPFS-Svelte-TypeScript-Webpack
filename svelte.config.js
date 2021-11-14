const preprocess = require('svelte-preprocess')
const tailwind = require('tailwindcss')
const autoprefixer = require('autoprefixer')

const mode = process.env['NODE_ENV'] ?? 'development'
const isProduction = mode === 'production'

module.exports = {
    compilerOptions: { dev: !isProduction },
    emitCss: isProduction,
    hotReload: !isProduction,
    preprocess: preprocess({
        sourceMap: !isProduction,
        postcss: { plugins: [tailwind,autoprefixer] }
    })
}
