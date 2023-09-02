const webpack = require('webpack');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');

const deps = require('../../package.json').dependencies;

module.exports = {
  output: {
    publicPath: 'http://localhost:4203/',
    uniqueName: 'mf-home',
    scriptType: 'text/javascript',
  },
  optimization: {
    runtimeChunk: false,
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'home',
      filename: 'remoteEntry.js',
      exposes: {
        HomeModule: './projects/mf-home/src/app/home/home.module.ts',
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
