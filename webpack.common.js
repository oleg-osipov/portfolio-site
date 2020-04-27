const path = require('path');
const SpriteLoaderPlugin = require('svg-sprite-loader/plugin');

module.exports = {
  entry: { vendor: './src/js/vendor.js', main: './src/js/index.js' },

  module: {
    rules: [
      //JS Babel
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },

      //HTML loader
      {
        test: /\.html$/,
        use: {
          loader: 'html-loader',
          options: {
            esModule: false,
          },
        },
      },
      //FONTs
      {
        test: /\.(ttf|eot|woff|woff2)$/,
        use: {
          loader: 'file-loader',
          options: {
            name: 'fonts/[name].[ext]',
          },
        },
      },

      //IMAGES file-loader
      {
        test: /\.(png|jpeg|jpg|gif)$/,
        use: {
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
            outputPath: 'imgs',
            esModule: false,
          },
        },
      },
      //SPRITE_IMAGES SVG
      {
        test: /\.svg$/i,
        use: [
          {
            loader: 'svg-sprite-loader',
            options: {
              publicPath: '',
            },
          },
          { loader: 'svgo-loader' },
        ],
      },
    ],
  },
  plugins: [
    new SpriteLoaderPlugin({
      plainSprite: true,
      spriteAttrs: {
        id: 'icon_sprite',
      },
    }),
  ],
};
