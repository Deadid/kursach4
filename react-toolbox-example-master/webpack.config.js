const path = require('path');
const webpack = require('webpack');

const settings = {
  entry: {
    bundle: [
      'react-hot-loader/patch',
      './src/frontend/index.js'
    ]
  },
  output: {
    filename: '[name].js',
    publicPath: '/',
    path: path.resolve('build')
  },
  resolve: {
    extensions: ['.js', '.json', '.css']
  },
  devtool: 'eval-source-map',
  module: {
    rules: [
      {
        test: /\.js?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        options: {
          presets: [
            ['es2015', { modules: false }],
            'stage-0',
            'react'
          ],
          plugins: [
            'transform-node-env-inline',
            'transform-runtime'
          ],
          env: {
            development: {
              plugins: ['react-hot-loader/babel']
            }
          }
        }
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: true,
              sourceMap: true,
              importLoaders: 1,
              localIdentName: '[name]--[local]--[hash:base64:8]'
            }
          },
          'postcss-loader' // has separate config, see postcss.config.js nearby
        ]
      }
    ]
  },
  devServer: {
    contentBase: path.resolve('src/www'),
    publicPath: 'http://localhost:8008/', // full URL is necessary for Hot Module Replacement if additional path will be added.
    quiet: false,
    port: 8008,
    hot: true,
    historyApiFallback: true,
    inline: true,
    proxy: {
      '/files': {
        target: 'http://od.reyestr.court.gov.ua',
        secure: false
      }
    }
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    new webpack.LoaderOptionsPlugin({
      debug: true
    })
  ]
};

module.exports = settings;
