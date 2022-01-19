var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ProgressBarPlugin = require('progress-bar-webpack-plugin');

module.exports = {
	entry: './test/test.js',
	output: {
		path: path.resolve(__dirname, 'build'),
		filename: 'main.bundle.js'
	},
	mode: "development",
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: [
							[require.resolve('@babel/preset-env'), {
								exclude: ["transform-regenerator"],
							}],
							'@babel/preset-react'
						],
						plugins: ["@babel/plugin-proposal-class-properties"]
					},
				},
			},
			{
				test: /\.css$/,
				loader: 'style-loader'
			},
			{
				test: /\.css$/,
				loader: 'css-loader',
				options: {
					modules: {
						localIdentName: "[path][name]__[local]--[hash:base64:5]",
					},
				},
			}
		]
	},
	stats: {
		colors: true
	},
	devtool: 'eval-source-map',
	plugins: [
		new HtmlWebpackPlugin({
			template: "./test/index.tmpl.html"
		}),
		new ProgressBarPlugin()
	]
};