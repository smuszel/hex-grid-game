const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const WebpackMd5Hash = require('webpack-md5-hash');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const pathTo = {
    dist: path.join(__dirname, 'dist'),
    app: path.join(__dirname, 'src', 'index.ts')
}

module.exports = {
    entry: {
        main: pathTo.app
    },

    resolve: {
        extensions: ['.ts']
    },

    output: {
        path: pathTo.dist,
        filename: '[name].[hash].js'
    },

    module: {
        rules: [
            {
                test: /\.ts$/i,
                loaders: 'ts-loader'
            },
            {
                test: /\.scss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'sass-loader'
                ]
            }
        ]
    },

    plugins: [
        new CleanWebpackPlugin('dist', {
            exclude: ['favicon.ico']
        }),
        new MiniCssExtractPlugin({
            filename: 'style.[hash].css',
        }),
        new HtmlWebpackPlugin({
            inject: false,
            hash: true,
            template: './src/index.html',
            filename: 'index.html'
        }),
        new WebpackMd5Hash()
    ],

    mode: 'development',
    devtool: 'eval'
};