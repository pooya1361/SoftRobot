var createConfig = require('./webpackConfigCreator');

module.exports = createConfig({
  minimize: false,
  debug: true,
});
