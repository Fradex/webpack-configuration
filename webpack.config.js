const path = require('path');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const webpack = require('webpack');

const glob = require("glob-all");
const CleanWebpackPlugin = require('clean-webpack-plugin');
var excludeFilePatterns = ["!./new_/js/lib/**", "!**/(*.min).js"];
var includeFilePatterns = ["./new_/js/**/*.js"];

const entry = glob.sync(includeFilePatterns.concat(excludeFilePatterns))
	.reduce((x, y) => Object.assign(x,
			{
				[y.replace('.js', '')]: y
			}),
		{});

module.exports = {
	entry: entry,
	optimization: {
		minimize: true
	},
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: '[name].min.js'
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /(node_modules|bower_components)/,
				use: [
					{
						loader: 'babel-loader',
						options: {
							presets: ['env']
						}
					},
					"eslint-loader"
				]
			}
		]
	},
	plugins: [
		new webpack.ProvidePlugin({
			$: 'jquery',
			jQuery: 'jquery'
		}),
		new UglifyJsPlugin({
			test: /\.js($|\?)/i
		}),
		new webpack.ProvidePlugin({
			Promise: ['Promise']
		}),
		new CleanWebpackPlugin(['dist'])
	]
};