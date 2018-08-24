const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const Dotenv = require('dotenv-webpack');

module.exports = {
    entry: "./src/index.js",
    mode: 'development',
    watch: true,
	output: {
        filename: "./assets/bundle.js"
    },
    devServer: {
        contentBase: path.join(__dirname, 'src'),
        compress: true,
        port: 9000
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: './src/index.html'
        }),
        new Dotenv({
            path: './src/.env'
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
                use: ['style-loader', 'postcss-loader']
            }
        ]
    }
}