const API_ENV = require('./helpers/getEnv')('API');
const APP_ENV = require('./helpers/getEnv')('APP');

const siteTitle = 'TCP';
const host = APP_ENV.get('HOST') || '127.0.0.1'; //ip to bind for webpack-dev-server
const port = APP_ENV.get('PORT') || 80; //port for webpack-dev-server
const api_host = API_ENV.get('HOST') || 'localhost';
const api_port = API_ENV.get('PORT') || 81;

import path from "path";
import npmInstallPlugin from "npm-install-webpack-plugin";
import webpack from "webpack";
import CleanPlugin from "clean-webpack-plugin";
import HtmlWebpackPlugin from "html-webpack-plugin";
// import _ from "lodash";
import merge from 'webpack-merge';
import ExtractTextPlugin from "extract-text-webpack-plugin";
import nodeExternals from 'webpack-node-externals';
// import 'whatwg-fetch';

const pkg = require('./prod_package.json');


var TARGET = process.env.npm_lifecycle_event;

const PATHS = {
  app: path.join(__dirname,'Frontend','app'),
  build: path.join(__dirname, 'Frontend','build')
};

var common = {
  resolve:{
    extensions: ['','.js','.jsx']
  },
  output: {
    filename: '[name].js',
    path: PATHS.build
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loaders: ['babel?cacheDirectory'],
        include: PATHS.app
      },
      {
        test: /\.json$/,
        loaders: ['json-loader'],
        include: PATHS.app
      }
    ]

  },
  plugins: []
};

var dev = {
  entry: {
    app: PATHS.app
  },
  devtool: 'eval-source-map',
  devServer: {
    // historyApiFallback: {index: path.join(PATHS.build, 'index.html')},
    historyApiFallback: true,
    hot: true,
    stats: 'errors-only',
    inline: true,
    progress: true,
    host: host,
    port: 80,
    proxy: {
      "/api" : {
        target : {
          host : api_host,
          protocol : 'http:',
          port : api_port
        },
        pathRewrite: {'^/api' : ''}
      }
    }
  },
  module: {
    loaders: [
      {
        test: /\.css$/,
        loaders: ['style', 'css'],
        include: PATHS.app
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/,
        loaders: ['file-loader'],
        include: PATHS.app
      }
    ]
  },
  output: {
    publicPath: "/"
  },
  plugins: [
    new npmInstallPlugin({
      save: true
    }),
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      template: path.join('Frontend','dev.ejs'),
      title: siteTitle,
      appMountId: 'app',
      inject: false,
      mobile: true
    })
  ]
};

var build = {
  // entry: {
  //   app: PATHS.app,
  //   vendor: Object.keys(pkg.vendor),
  //   externals: Object.keys(pkg.externals)
  // },
  entry: {
    app: PATHS.app,
    vendor: pkg.vendor
  },
  externals: [nodeExternals({whitelist: pkg.vendor})],
  plugins: [
    new CleanPlugin([PATHS.build]),
    new webpack.optimize.CommonsChunkPlugin({
      names: ['vendor','manifest']
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': '"production"'
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    }),
    new ExtractTextPlugin('[name].[chunkhash].css'),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.AggressiveMergingPlugin(),
    new HtmlWebpackPlugin({
      template: path.join('Frontend','prod.ejs'),
      title: siteTitle,
      appMountId: 'app',
      inject: false,
      mobile: true
    })
  ],
  output: {
    chunkFilename: '[chunkhash].js',
    filename: '[name].[chunkhash].js',
    path: PATHS.build
  },
  module: {
      loaders: [
        {
          test: /\.css$/,
          loader: ExtractTextPlugin.extract('style', 'css'),
          include: PATHS.app
        },
        {
          test: /\.png$/,
          loaders: ['file-loader']
        }
      ]
    }
};

// function arrayConcat(objValue, srcValue) {
//   if(_.isArray(objValue)){
//     return objValue.concat(srcValue);
//   }
// }
//
// if(TARGET === 'build'){
//   module.exports = _.mergeWith({},common,build,arrayConcat);
// }
//
// if(TARGET === 'dev'){
//   module.exports = _.mergeWith({},common,dev,arrayConcat);
// }

if(TARGET === 'build'){
  module.exports = merge(common,build);
}

if(TARGET === 'dev'){
  module.exports = merge(common,dev);
}
