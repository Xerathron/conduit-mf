const webpack = require('webpack');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');

const deps = require('../../package.json').dependencies;

module.exports = {
  output: {
    publicPath: 'http://localhost:4205/',
    uniqueName: 'mf-settings',
    scriptType: 'text/javascript',
  },
  optimization: {
    runtimeChunk: false,
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'settings',
      filename: 'remoteEntry.js',
      exposes: {
        SettingsModule: './projects/mf-settings/src/app/settings/settings.module.ts',
      },
      shared: {
        ...deps,
        'shared': {
          import: 'shared',
          requiredVersion: require('../shared/package.json').version,
        },
      },
    }),
  ],
};
