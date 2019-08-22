const path = require('path')
const CopyPlugin = require('copy-webpack-plugin');

var config = {
  entry: {
    SimpleWebpack: path.resolve(__dirname, './src/server.js')
  },
  output: {
    filename: 'server.js',
    path: path.resolve(__dirname, 'dist'),
    libraryTarget: 'commonjs2',
  },
  externals: {
    './simple-webpack': {
      commonjs2: './simple-webpack'
    }
  },
  target: 'node',
  node: false,
  cache: false,
  mode: 'development',
  devtool: false,
  module: {
    rules: [{
        test: /\.js$/,
        use: {
          loader: 'babel-loader',
          options: {
            "presets": [
              ["@babel/preset-env", {
                "useBuiltIns": false,
                "targets": {
                  "node": "10.10.0"
                }
              }],
            ]
          }
        },
        exclude: [
          path.resolve(__dirname, 'node_modules/core-js')
        ]
      }
    ],
  },
  plugins: [
    new CopyPlugin([
      { from: 'src/simple-webpack', to: 'simple-webpack' },
    ]),
  ],
};

module.exports = config