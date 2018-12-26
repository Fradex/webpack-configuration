const path = require('path');
const glob = require("glob-all");
const CleanWebpackPlugin = require('clean-webpack-plugin');
const webpack = require('webpack');

var excludeFilePatterns = [
	'!./WebResources/new_/js/lib/**', '!**/(*.min).js',
	'!./WebResources/new_/js/common/Norbit.Crm.Soglasie.Common.Require.js'
];
var includeFilePatterns = ['./WebResources/new_/js/**/*.js'];

const entry = glob.sync(includeFilePatterns.concat(excludeFilePatterns))
	.reduce((x, y) => Object.assign(x,
			{
				[y.replace('.js', '').replace('/','')]: y
			}),
		{});

module.exports = {
	entry: entry,
	devtool: 'inline-source-map',
	optimization: {
		minimize: false
	},
	output: {
		path: path.resolve(__dirname, 'dist-dev'),
		filename: '[name].bundle.js'
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
		new webpack.ProvidePlugin({
			Promise: ['Promise']
		}),
		new CleanWebpackPlugin(["dist-dev"])
	]
};