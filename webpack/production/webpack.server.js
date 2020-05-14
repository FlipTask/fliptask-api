const path = require('path');
const merge = require('webpack-merge');
const baseConfig = require('./webpack.base');
const webpackNodeExternals = require('webpack-node-externals');

const config = {

    // Inform webpack that we are building a bundle for 'nodeJs', rather than for
    // the browser

    target: 'node',
    node: {
        // Need this when working with express, otherwise the build fails
        __dirname: false, // if you don't put this is, __dirname
        __filename: false, // and __filename return blank or /
    },
    //Tell webpack the root file of our server Application

    entry: './server/index.js',

    // Tell webpack where to put the output file that is generated

    output: {
        filename: 'server.js',
        path: path.resolve(__dirname, '../../server-build')
    },

    externals: [webpackNodeExternals()]

};

module.exports = merge(baseConfig, config);
