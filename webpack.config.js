const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

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
        new MiniCssExtractPlugin({
            filename: 'style.[hash].css',
        }),
        new HtmlWebpackPlugin({
            inject: false,
            hash: true,
            template: './src/index.html',
            filename: 'index.html'
        }),
    ],

    mode: 'development',
    devtool: 'eval'
};