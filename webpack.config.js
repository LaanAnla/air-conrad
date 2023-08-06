const webpack = require('webpack');
const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");


const dirApp = path.resolve(__dirname, 'app');
const dirShared = path.resolve(__dirname, 'shared');
const dirStyles = path.resolve(__dirname, 'styles');

module.exports = {
    entry: [
      path.join(dirApp, 'index.js'),
      path.join(dirStyles, 'index.scss')
    ],
    resolve: {
      alias: {
        dirApp: dirApp,
        dirShared: dirShared,
        dirStyles: dirStyles,
      },
    },
    plugins: [
      new CleanWebpackPlugin(),
      new CopyPlugin({
        patterns: [
          { from: dirShared, 
            to: "",
            filter: (resourcePath) => {
              return !resourcePath.match(/\.(png|jpe?g|svg|gif|webp)$/);
            }, },
        ],
      }),
      new MiniCssExtractPlugin({
        filename: '[name].css',
        chunkFilename: '[id].css',
      })
    ],
    module: {
      rules: [
        {
          test: /\.s[ac]ss$/i,
          use: [
            {
              loader: MiniCssExtractPlugin.loader,
                  options: {
                  publicPath: "",
              },
            },
              "css-loader",
              "postcss-loader",
              "sass-loader",
          ]
        },
        {
          test: /\.(png|jpe?g|svg|gif|svg|webp)$/,
          type: "asset/resource",
          generator: {
          filename: "images/[hash][ext]"
          }
        },
        {
          test: /\.(mp4)$/,
          type: "asset/resource",
          generator: {
          filename: "videos/[hash][ext]"
          }
        },
        {
          test: /\.(woff|woff2|eot|ttf|otf)$/i,
          type: 'asset/resource',
          generator: {
            filename: 'fonts/[name].[hash].[ext]',
          },
        },
        {
          test: /\.(glsl|frag|vert)$/,
          type: "asset/source",
          exclude: /node_modules/,
        },
        {
          test: /\.m?js$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
            options: {
              presets: ['@babel/preset-env']
            }
          }
        }
      ],
    },
};




