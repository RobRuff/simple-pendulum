const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: './index.ts',
  module: {
    rules: [
      {
        test: /\.(ts|js)x?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
  output: {
    path: path.join(__dirname, './dist'),
    publicPath: '/',
    filename: 'bundle.js',
  },
  devServer: {
    static: './dist',
  },
  plugins: [new HtmlWebpackPlugin({
      template: './index.html',
    })
  ],
};