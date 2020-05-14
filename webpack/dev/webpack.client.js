const path = require('path');
const merge = require('webpack-merge');
const baseConfig = require('./webpack.base');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const { styles } = require( '@ckeditor/ckeditor5-dev-utils' );
const MiniCssExtractPlugin = require( 'mini-css-extract-plugin' );
const CKEditorWebpackPlugin = require('@ckeditor/ckeditor5-dev-webpack-plugin');
const entryPoints = require("./../EntryPoints");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const extractSass = new ExtractTextPlugin({
    filename: "[name].css",
    disable: process.env.NODE_ENV !== "production"
});

const config = {

    //Tell webpack the root file of our
    //server Application
    target: 'web',
    entry: path.resolve(__dirname, '../../client/index.js'),
    module:{
        rules: [
            {
                test: /\.js?$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                options: {
                    caller: { name: "web" }
                }
            },
            {
                test: /\.(scss)$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader',{
                    loader: `postcss-loader`,
                    options: {
                        options: {},
                    }
                },'sass-loader']
            },
            {
                test: /ckeditor5-[^/\\]+[/\\]theme[/\\]icons[/\\][^/\\]+\.svg$/,
                use: [ 'raw-loader' ]
            },
            {
                test: /\.css$/,
                exclude: [
                    /\.module\.css$/,
                    /ckeditor5-[^/\\]+[/\\]theme[/\\].+\.css$/,
                ],
            },
            {
                test: /ckeditor5-[^/\\]+[/\\]theme[/\\].+\.css$/,
                use: [
                    {
                        loader: 'style-loader',
                        options: {
                            injectType: 'singletonStyleTag',
                            attributes: {
                                'data-cke': true
                            }
                        }
                    },
                    {
                        loader: 'postcss-loader',
                        options: styles.getPostCssConfig( {
                            themeImporter: {
                                themePath: require.resolve( '@ckeditor/ckeditor5-theme-lark' )
                            },
                            minify: true
                        } )
                    },
                ]
            }
        ]
    },
    // Tell webpack where to put the output file
    // that is generated

    output: {
        publicPath: "/static/",
        filename: '[name].bundle.js',
        // chunkFilename: '[name].bundle.js',
        path: path.resolve(__dirname, '../../client-build'),
    },
    optimization: {
        splitChunks: {
          // include all types of chunks
          chunks: 'all'
        },
        runtimeChunk: true,
    },
    plugins: [
        // extractSass,
        new CleanWebpackPlugin(),
        new CKEditorWebpackPlugin({
            language: 'en'
        }),
        new MiniCssExtractPlugin({
            filename: '[name].css',
            chunkFilename: '[id].css',
            ignoreOrder: false,
        })
    ],
};

// console.log(JSON.stringify(merge.smart(config,baseConfig)));
module.exports = merge.smart(baseConfig,config);
