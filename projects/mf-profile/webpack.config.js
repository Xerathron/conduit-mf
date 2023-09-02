const webpack = require('webpack');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');

const deps = require('../../package.json').dependencies;


module.exports = {
  output: {
    publicPath: 'http://localhost:4201/',
    uniqueName: 'mf-profile',
    scriptType: 'text/javascript',
  },
  optimization: {
    runtimeChunk: false,
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'profile',
      filename: 'remoteEntry.js',
      exposes: {
        ProfileModule: './projects/mf-profile/src/app/profile/profile.module.ts',
      },
      shared: {
        ...deps,
        'shared': {
          import: 'shared',
          requiredVersion: require('../shared/package.json').version,
        },
      }
    }),
  ],
};
