const path = require('path');

/**
 * Metro configuration for React Native
 * https://github.com/facebook/react-native
 *
 * @format
 */

module.exports = {
  resetCache: true,
  resolver: {
    extraNodeModules: new Proxy(
      /** TESTING INTEGRATION WITH OTHER PROJECTS
       * This proxying prevents the `module unresolved` errors you may get when testing integration with other projects
       */
      {
        /* Proxy 'target' doesn't need to be passed in here, as Metro handles it */
      },
      {
        get: (target, name) => path.join(process.cwd(), `node_modules/${name}`),
      },
    ),
  },
  transformer: {
    getTransformOptions: async () => ({
      transform: {
        experimentalImportSupport: false,
        inlineRequires: true,
      },
    }),
  },
};
