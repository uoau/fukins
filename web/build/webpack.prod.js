const path = require('path');
const { merge } = require('webpack-merge');
const baseConfig = require('./webpack.common.js');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const TerserPlugin = require("terser-webpack-plugin");

const prodConfig = {
	mode:'production',
	output: {
		filename: '[name].[hash:8].js',
		path: path.join(__dirname, '../dist')
	},
	plugins:[
        new HtmlWebpackPlugin({
            template : path.join(__dirname,`../src/index.html`),
            filename : `index.html`
        }),
		new CleanWebpackPlugin(),
        new webpack.DefinePlugin({
			'process.env.NODE_ENV':  JSON.stringify('production')
		}),
	],
}

module.exports = merge(baseConfig, prodConfig);