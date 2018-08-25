const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const Dotenv = require('dotenv-webpack');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CleanWebpackPlugin = require('clean-webpack-plugin');
// const ExtractTextPlugin = require('extract-text-webpack-plugin')

module.exports = {
    entry: [
        "./src/index.js"
    ],
    mode: 'production',
    watch: false,
	output: {
        filename: "assets/bundle.js",
        path: path.resolve(__dirname, 'dist')
    },
    devtool: 'source-map',
    plugins: [
        new CleanWebpackPlugin('dist', {} ),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: './src/index.html'
        }),
        new Dotenv({
            path: './src/.env'
        }),

        new MiniCssExtractPlugin({
            filename: "./assets/style.css"
        })
    ],
    module : {
        rules : [
            {
                test : /\.js$/,
                exclude : /node_modules/,
                loader: 'babel-loader'
                // query : {
                //     presets: ["env"]
                // }
            },
            {
                test : /\.json$/,
                exclude : /node_modules/,
                loader: 'json-loader'
            },
            {
                test : /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    { loader: 'css-loader', options: { url: false, sourceMap: true } } 
                ]
            }
        ]
    }
}