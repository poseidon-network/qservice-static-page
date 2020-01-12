const webpack = require('webpack');
const withTypescript = require('@zeit/next-typescript');

module.exports = withTypescript({
  exportPathMap: () => ({
    '/': { page: '/' },
  }),
  webpack(config) {
    config.plugins.push(
      new webpack.EnvironmentPlugin({
      }),
    );
    return config;
  },
  publicRuntimeConfig: {
    localeSubpaths:
      typeof process.env.LOCALE_SUBPATHS === 'string'
        ? process.env.LOCALE_SUBPATHS
        : 'none',
  },
});
