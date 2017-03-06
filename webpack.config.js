"use strict"

const webpack = require("webpack")
const ExtractTextPlugin = require("extract-text-webpack-plugin")
const CopyWebpackPlugin = require("copy-webpack-plugin")
const WebpackNotifierPlugin = require("webpack-notifier")

const DEV_SERVER_PORT = 4001
const OUTPUT_PATH = `${__dirname}/priv/static`
const OUTPUT_PUBLIC_PATH = `http://localhost:${DEV_SERVER_PORT}/`

module.exports = {
  entry: [
    "react-hot-loader/patch",
    `webpack-dev-server/client?http://localhost:${DEV_SERVER_PORT}/`,
    "webpack/hot/only-dev-server",
    "./web/static/css/app.css",
    "./web/static/js/app.js",
  ],
  output: {
    path: OUTPUT_PATH,
    filename: "js/app.js",
    publicPath: OUTPUT_PUBLIC_PATH,
  },
  devServer: {
    hot: true,
    port: DEV_SERVER_PORT,
    contentBase: OUTPUT_PATH,
    publicPath: OUTPUT_PUBLIC_PATH,
  },
  resolve: {
    modules: ["node_modules", __dirname + "/web/static/js"],
    extensions: [".js", ".jsx"],
    alias: {
      "react": "react/dist/react.min.js",
      "react-dom": "react-dom/dist/react-dom.min.js",
    },
  },
  module: {
    rules: [{
      test: /\.jsx?$/,
      use: [{
        loader: "babel-loader",
        query: {
          cacheDirectory: true
        },
      }],
    }, {
      test: /\.css$/,
      use: ExtractTextPlugin.extract({
        fallback: "style-loader",
        use: [
          {
            loader: 'css-loader',
            options: {
              camelCase: 'only', // remove dashed class names from style object
              modules: true,
              importLoaders: 1,
              localIdentName: '[name]__[local]___[hash:base64:5]'
            }
         }
       ]
      }),
    }]
  },
  devtool: "cheap-module-eval-source-map",
  plugins: [
    new webpack.NoEmitOnErrorsPlugin(),
    new WebpackNotifierPlugin({ skipFirstNotification: true }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    new ExtractTextPlugin({ filename: "css/app.css" }),
    new CopyWebpackPlugin([{ from: "./web/static/assets" }]),
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV)
      }
    }),
  ]
}
