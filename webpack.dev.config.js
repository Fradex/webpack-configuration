const path = require('path');
const glob = require("glob-all");
const CleanWebpackPlugin = require('clean-webpack-plugin');
const webpack = require('webpack');
const PostCompile = require('./webpack.plugin');
const PostCompileDetector = require('./src/postCompileDetector');

var excludeFilePatterns = [
	'!./WebResources/new_/js/lib/**','!./WebResources/new_/js/common/**', '!**/(*.min).js',
	'!./WebResources/new_/js/common/Norbit.Crm.Soglasie.Common.Require.js'
];
var includeFilePatterns = ['./WebResources/new_/js/**/*.js'];

const entry = glob.sync(includeFilePatterns.concat(excludeFilePatterns))
	.reduce((x, y) => Object.assign(x,
		{
			[y.replace('.js', '')]: y
		}),
		{});


module.exports = {
	entry: entry,
	//devtool: 'inline-source-map',
	optimization: {
		minimize: false
	},
	resolve: {
		extensions: ['.tsx', '.ts', '.js']
	},
	output: {
		path: path.resolve(__dirname, 'dist-dev'),
		sourceMapFilename: '[file].map',
		filename: '[name].js'
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
							presets: ['env'],
							plugins: [
								[
									"transform-runtime", {
										"regenerator": true,
									}
								]
							]
						}
					},
					"eslint-loader"
				]
			},
			{
				test: /\.ts?$/,
				use: 'ts-loader',
				exclude: /node_modules/
			},
		]
	},
	watch: true,
	plugins: [
		new webpack.ProvidePlugin({
			$: 'jquery',
			jQuery: 'jquery'
		}),
		new webpack.ProvidePlugin({
			Promise: ['Promise']
		}),
		new PostCompile(() => {
			var basePath = path.resolve(__dirname, 'dist-dev');
			new PostCompileDetector(entry, basePath).detectChanges();
		})
		//new CleanWebpackPlugin(["dist-dev"])
	]
};