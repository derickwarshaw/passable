'use strict';

const webpack = require('webpack'),
    path = require('path');

const UglifyJsPlugin = webpack.optimize.UglifyJsPlugin,
    env = process.env.WEBPACK_ENV,
    plugins = [];

let outputFile,
    outputDir,
    libraryName = 'Passable',
    entrySuffix = '';

if (env === 'dev') {
    outputFile = `${libraryName}.js`;
    outputDir = 'dev';
} else {
    plugins.push(new UglifyJsPlugin({
        minimize: true,
        sourceMap: true
    }));

    outputFile = libraryName;
    if (env === 'ieold') {
        outputFile += '-ieold';
        entrySuffix = '-ieold';
    }
    outputFile += '.min.js';

    outputDir = 'dist';
}

const config = {
    entry: `${__dirname}/src/index${entrySuffix}.js`,
    devtool: 'source-map',
    output: {
        path: `${__dirname}/${outputDir}`,
        filename: outputFile,
        library: libraryName,
        libraryTarget: 'umd'
    },
    module: {
        loaders: [{
            test: /\.js$/,
            loaders: ['babel-loader'],
            exclude: /(node_modules)/
        }]
    },
    resolve: {
        alias: {
            Root: path.resolve('./src'),
            Helpers: path.resolve('./src/helpers'),
            Constants: path.resolve('./src/constants')
        }
    },
    plugins
};

module.exports = config;