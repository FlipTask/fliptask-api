const ExtractTextPlugin = require("extract-text-webpack-plugin");
const CompressionPlugin = require('compression-webpack-plugin');
const extractSass = new ExtractTextPlugin({
    filename: "[name].css",
    disable: process.env.NODE_ENV === "development"
});
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const webpack = require('webpack');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const CopyWebpackPlugin = require('copy-webpack-plugin');
const Dotenv = require('dotenv-webpack');
module.exports = {
    //Tell webpack to run babel on every file it runs through
    devtool: "source-map",
    module: {
        rules: [
            {
                test: /\.js?$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                options: {
                    presets: ['es2015', 'react', 'stage-2']
                }
            }, {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: [
                        {
                            loader: "css-loader"
                        }, {
                            loader: "sass-loader"
                        }
                    ]
                })
            }
        ]
    },
    plugins: [
        new Dotenv({
            path: './env/prod.env', // load this now instead of the ones in '.env'
            safe: true, // load '.env.example' to verify the '.env' variables are all set. Can also be a string to a different file.
            systemvars: true, // load all the predefined 'process.env' variables which will trump anything local per dotenv specs.
            silent: true, // hide any errors
            defaults: false // load '.env.defaults' as the default values if empty.
        }),
        new webpack.EnvironmentPlugin({
            'HASH_ID': (new Date).getTime()
        }),
        extractSass,
        new UglifyJsPlugin(),
        new webpack
            .optimize
            .AggressiveMergingPlugin(),
        new CompressionPlugin({asset: "[path].gz[query]", algorithm: "gzip", test: /\.js$|\.css$|\.html$/, threshold: 10240, minRatio: 0.8}),
        // new BundleAnalyzerPlugin(),
    ]
};
