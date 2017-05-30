module.exports = {
  'extends': [
    '@yepstr/eslint-config-yepstr',
  ],
  'globals': {
    '__CLIENT__': true,
    '__SERVER__': true,
    '__DEBUG__': true,
    '__APP__': true,
  },
  'env': {
    'jest': true,
  },
};
