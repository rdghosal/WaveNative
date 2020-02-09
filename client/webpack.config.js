const webpack = require('webpack');
const path = require('path');

const config = {
    entry: __dirname + '//js//index.jsx',
    output: {
        path: __dirname + '//dist',
        publicPath: '//dist',
        filename: 'bundle.js'

    },
    resolve: {
        extensions: ['.js', '.jsx', '.css', '.jpg']
    },
    plugins: [
        new webpack.ProvidePlugin({
            Promise: 'es6-promise-promise',
        })
    ],
    module: {
        rules: [
            {
                test: /\.jsx?/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'babel-loader',
                    }
                ]
            },
            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader'],
            },
            {
                test: /\.(png|svg|jpg|gif)$/i,
                use: [
                    {
                      loader: 'file-loader',
                      options: {
                          name: '[name].[ext]',
                          outputPath: '//img',
                          publicPath: '//img'
                      }
                    }
                 ]
           },     
           {
               test: /\.(png|jpg|gif)$/i,
               use: [
               { 
                   loader: 'url-loader',
                   options: {
                       limit: 30000,
                   },
               }],
           },
        ]
    }
};

module.exports = config;
