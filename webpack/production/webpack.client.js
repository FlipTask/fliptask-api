const path = require('path');
const merge = require('webpack-merge');
const baseConfig = require('./webpack.base');
const webpack = require('webpack');

const config  = {

    //Tell webpack the root file of our
    //server Application

    entry: {
        app : './client/index.js',
    },
    // Tell webpack where to put the output file
    // that is generated

    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, '../../client-build'),
    }
};

module.exports = merge(baseConfig, config);
