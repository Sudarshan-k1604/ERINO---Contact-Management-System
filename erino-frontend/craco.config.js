module.exports = {
    webpack: {
      configure: (webpackConfig) => {
        webpackConfig.resolve.fallback = {
          stream: require.resolve('stream-browserify'),
          os: require.resolve('os-browserify/browser'),
        };
        return webpackConfig;
    }
    }
  };
  