var path = require('path');
var webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    entry: {
        main: './src/main/main.js',
        not_found: './src/404/not_found.js'
    },
    output: {
        path: path.resolve(__dirname + '/dist'),
        filename: '[name].js',
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: 'src/main/main.html',
            chunks: ['main'],
            inject: false
        }),
        new HtmlWebpackPlugin({
            filename: '404.html',
            template: 'src/404/not_found.html',
            chunks: ['not_found'],
            inject: false
        }),
        new MiniCssExtractPlugin(),
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery"
        })
    ],
    module: {
        rules: [
        {
            test: /\.css$/i,
            use: ["style-loader", "css-loader"]
        },
        {
            test: /\.vue$/,
            loader: 'vue'
        },
        {
            test: /\.m?js$/,
            exclude: /node_modules/,
            use: {
              loader: 'babel-loader',
              options: {
                presets: [
                  ['@babel/preset-env']
                ]
              }
            }
        },
        {
            test: /\.tsx?$/,
            use: 'ts-loader',
            exclude: /node_modules/,
        }
        ]
    },
    resolve: {
//        extensions: [ '.tsx', '.ts', '.js' ],
        alias: {
            'jquery': "jquery/src/jquery"
        }
    }
};
