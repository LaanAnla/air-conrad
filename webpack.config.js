const webpack = require('webpack');
const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const TerserPlugin = require("terser-webpack-plugin");


const dirApp = path.resolve(__dirname, 'app');
const dirShared = path.resolve(__dirname, 'shared');
const dirSharedImg = path.resolve(__dirname, 'shared/images');
const dirSharedFonts = path.resolve(__dirname, 'shared/fonts')
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
        dirSharedImg: dirSharedImg,
        dirSharedFonts: dirSharedFonts,
        dirStyles: dirStyles,
      },
    },
    optimization: {
      minimize: true,
      minimizer: [new TerserPlugin()]
    },
    plugins: [
      new CleanWebpackPlugin(),
      new CopyPlugin({
        patterns: [
          { from: dirShared, to: "" },
          { from: dirSharedImg, to:"images"},
          { from: dirSharedFonts, to:"fonts"}
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
          {
            loader: "css-loader",
            options: {
              url: false,
            },
          },
            "postcss-loader",
            "sass-loader",
          ]
        },
        {
          test: /\.(png|jpe?g|svg|gif|svg|webp|)$/,
          type: "asset/resource",
          generator: {
          filename: 'images/[hash][ext]'
          }
        },
        {
          test: /\.(mp4)$/,
          type: "asset/resource",
          // generator: {
          // filename: "videos/[hash][ext]"
          // }
        },
        {
          test: /\.(woff|woff2|eot|ttf|otf)$/i,
          type: 'asset/resource',
          // generator: {
          //   filename: 'fonts/[name].[hash].[ext]',
          // },
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




