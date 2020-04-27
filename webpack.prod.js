const path = require('path');
const common = require('./webpack.common');
const merge = require('webpack-merge');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = merge(common, {
  mode: 'production',
  output: {
    filename: 'js/[name].[contentHash].bundle.js',
    path: path.resolve(__dirname, 'app'),
  },
  module: {
    rules: [
      // { test: /\.css$/, use: ['style-loader', 'css-loader'] }, // only css files
      {
        test: /\.s[ac]ss$/,
        use: [
          MiniCssExtractPlugin.loader, //3. Extract css into files
          'css-loader', //2. Translates CSS into CommonJS
          'sass-loader', //1. Compiles Sass to CSS
        ],
      },
    ],
  },
  optimization: {
    minimizer: [
      new OptimizeCssAssetsPlugin(), //minifying css files
      new TerserPlugin(), //minifying js files
      new HtmlWebpackPlugin({
        template: './src/template.index.html',
        minify: {
          removeAttributeQuotes: true,
          collapseWhitespace: true,
          removeComments: true,
        },
      }),
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({ filename: '[name].[contentHash].css' }),
    new CleanWebpackPlugin(), //clean hashed bundle files
  ],
});
