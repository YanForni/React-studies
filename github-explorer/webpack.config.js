const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ReactRefreshWepackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

const isDevelopment = process.env.NODE_ENV !== "production"

module.exports = {
  mode: isDevelopment ? 'development' : 'production', 
  devtool: isDevelopment ? 'eval-source-map' : 'source-map',
  entry: path.resolve(__dirname, 'src', 'index.jsx'),
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  devServer: {
    static: {
     directory: path.resolve(__dirname, 'public'),
    },
    hot: true
  },
  plugins: [
    isDevelopment && new ReactRefreshWepackPlugin(),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'public', 'index.html')
    })
  ].filter(Boolean),
  module: {
    rules: [
      {
        test: /\.jsx$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        use: ["style-loader", "css-loader", "sass-loader"] 
      },

    ],
  }
};
