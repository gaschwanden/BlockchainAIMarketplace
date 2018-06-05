const path = require('path')
const HtmlWebPackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')

module.exports = {
  entry: ['react-hot-loader/patch',
    'webpack/hot/only-dev-server',
    path.join(__dirname, 'src/js', 'index.js'),
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'build.js'
  },

  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader','css-loader'],
        include: [/src/, /node_modules/]
      }, {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ['es2015', 'react', 'stage-2']
        }
      }, {
        test: /\.json$/,
        loader: 'json-loader',
        include: '/build/contracts/'
      }, {
        test: /\.(png|jpg|gif)$/,
        use: [
            {
             loader: 'file-loader',
             options: {}
           }
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: "./dist/index.html",
      filename: "./index.html"
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin()
  ],
  devServer: {
    contentBase: path.join(__dirname, "dist"),
    publicPath: '/',
    port: 8080,
    historyApiFallback: true,
    hot: true
  }
}
