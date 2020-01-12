const webpack = require('webpack');

module.exports = {
  exportPathMap: () => ({
    '/': { page: '/' },
    '/projects': { page: '/projects', query: { code: '' } },
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
};
