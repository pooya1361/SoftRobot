var webpack = require('webpack');
var path = require('path');
var BrowserSyncPlugin = require('browser-sync-webpack-plugin');
var CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');
var SplitByPathPlugin = require('webpack-split-by-path');

function makeConfig(options) {
  var entry = {
    'client': ['babel-polyfill', './src/client/app.js'],
  };

  var outputFolder = '/public/build';
  var buildPath = __dirname + outputFolder;

  var output = {
    filename: '[name].js',
    publicPath: `${ outputFolder }/`,
  };
  output.path = buildPath;

  /** Plugins **/
  var plugins = [];
  plugins.push(new webpack.DefinePlugin({
    '__SERVER__': false,
    '__CLIENT__': true
  }));
  plugins.push(new webpack.DefinePlugin({
    '__DEBUG__': options.debug,
  }));
  // Set loader debug and minimize mode
  plugins.push(new webpack.LoaderOptionsPlugin({
    minimize: options.minimize,
    debug: options.debug,
  }));

  // make sure all imports are Case Sensitive
  plugins.push(new CaseSensitivePathsPlugin());

  // this plugin is only active if webpack is running in watch mode
  // https://github.com/Va1/browser-sync-webpack-plugin#usage
  plugins.push(new BrowserSyncPlugin({
    host: 'localhost',
    port: 3003,
    proxy: 'localhost:3000',
    open: false
  }));

  if (options.minimize) {
    plugins.push(new webpack.NoErrorsPlugin());
    plugins.push(new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    }));
    plugins.push(new webpack.optimize.UglifyJsPlugin({
      sourceMap: options.debug,
    }));
  }

  plugins.push(new SplitByPathPlugin([
    // Put everything that is loaded from node_modules
    // in a separate chunk
    {
      name: 'vendor',
      path: path.join(__dirname, 'node_modules')
    },
  ], { manifest: 'app-manifest' }));

  /** /Plugins **/

  /** Rules **/
  var rules = [];
  rules.push({
    test: /\.jsx?$/,
    exclude: /node_modules/,
    loader: 'babel-loader',
  });
  /** /Rules **/

  var module = {
    rules: rules,
  };

  var resolve = {
    extensions: ['.js', '.json'],
    modules: [
      path.resolve(__dirname),
      'node_modules',
    ],
  };

  var externals = {
    'config': 'config'
  }

  return {
    entry: entry,
    output: output,
    plugins: plugins,
    module: module,
    resolve: resolve,
    externals: externals,
  };
}

module.exports = makeConfig;
