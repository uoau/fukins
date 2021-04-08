const path = require('path');
const { merge } = require('webpack-merge');
const baseConfig = require('./webpack.common.js');
const webpack = require('webpack');

const devConfig = {
    mode:'development',
    output: {
        filename: '[name].js',
        path: path.join(__dirname, '../dist')
    },
    devServer: {
        contentBase: path.join(__dirname, '../dist'),
        port: 9402,
        open: true,
    },
    plugins: [
        new webpack.DefinePlugin({
           'process.env.NODE_ENV':  JSON.stringify('development')
        })
    ]
}

module.exports = merge(baseConfig, devConfig);