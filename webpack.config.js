const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const WebpackMd5Hash = require('webpack-md5-hash');
const CleanWebpackPlugin = require('clean-webpack-plugin').CleanWebpackPlugin;

const pathTo = {
    docs: path.join(__dirname, 'docs'),
    app: path.join(__dirname, 'src', 'index.ts'),
    favicon: path.join(__dirname, 'src', 'favicon.ico'),
    template: path.join(__dirname, 'src', 'index.html'),
};

module.exports = {
    entry: {
        main: pathTo.app,
    },
    resolve: {
        extensions: ['.ts'],
    },
    output: {
        path: pathTo.docs,
        filename: '[name].[hash].js',
    },
    module: {
        rules: [
            {
                test: /\.ts$/i,
                loaders: 'ts-loader',
            },
            {
                test: /\.scss$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
            },
        ],
    },
    plugins: [
        new CleanWebpackPlugin({
            exclude: ['favicon.ico'],
        }),
        new MiniCssExtractPlugin({
            filename: 'style.[hash].css',
        }),
        new HtmlWebpackPlugin({
            inject: false,
            hash: true,
            template: pathTo.template,
            favicon: pathTo.favicon,
            filename: 'index.html',
        }),
        new WebpackMd5Hash(),
    ],

    mode: 'development',
    devtool: 'eval',
};
