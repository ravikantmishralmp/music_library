const { merge } = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { ModuleFederationPlugin } = require('webpack').container;
const commonConfig = require('./webpack.common');
const packageJson = require('./../package.json');

const path = require('path');

const devConfig = {
  entry: './src/index.tsx',
  mode: 'development',
  devServer: {
    port: 3002,
    hot: true,
    historyApiFallback: {
      index: '/index.html',
    },
    watchFiles: {
      paths: ['src/**/*'],
      options: {
        usePolling: true,
        interval: 1000,
      },
    },
  },
  devtool: 'source-map',
  output: {
    publicPath: 'http://localhost:3002/',
    path: path.resolve(__dirname, 'dist'),
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'songLibrary', // Ensure this matches container remotes
      filename: 'remoteEntry.js',
      exposes: {
        './LibraryApp': './src/bootstrap', // Verify this path
      },
      shared: {
        react: { singleton: true, requiredVersion: packageJson.dependencies.react },
        'react-dom': { singleton: true, requiredVersion: packageJson.dependencies['react-dom'] },
        'react-redux': { singleton: true, requiredVersion: packageJson.dependencies['react-redux'] },
        '@mui/material': { singleton: true, requiredVersion: packageJson.dependencies['@mui/material'] },
      },
    }),
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
  ],
};

module.exports = merge(commonConfig, devConfig);
