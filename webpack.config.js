const fs = require('fs')
const path = require('path')
const HTMLWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const isDev = process.env.NODE_ENV === 'development'

// const filename = ext => isDev ? `[name].${ext}` : `[name].[hash].${ext}`
const filename = ext => `[name].[hash].${ext}`

const PATHS = {
    src: path.join(__dirname, './src'),
    dist: path.join(__dirname, './dist')
}
const PAGES_DIR = `${PATHS.src}/pug/pages/`
const PAGES = fs.readdirSync(PAGES_DIR).filter(filename => filename.endsWith('.pug'))
console.log(PAGES)

module.exports = {
    context: path.resolve(__dirname, 'src'),
    mode: 'development',
    entry: './index.js',
    output: {
        filename: filename('js'),
        path: path.resolve(__dirname, 'dist')
    },
    devServer: {
        port: 4200,

    },
    plugins: [

        // new CleanWebpackPlugin(),

        ...PAGES.map(page => new HTMLWebpackPlugin({
            template: `pug/pages/${page}`,
            filename: `./${page.replace(/\.pug/, '.html')}`,
            // filename: filename('html'),
            minify: {
                collapseWhitespace: !isDev
            }
        })),
        new MiniCssExtractPlugin({
            filename: filename('css'),
        })
    ],

    module: {
        rules: [
            {
                test: /\.pug$/,
                use: ['pug-loader']
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.s[ac]ss$/,
                use: ['style-loader', 'css-loader', 'sass-loader']
            },

        ]
    }
}