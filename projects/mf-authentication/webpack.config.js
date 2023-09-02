const webpack = require('webpack');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');

const deps = require('../../package.json').dependencies;


module.exports = {
  output: {
    publicPath: 'http://localhost:4202/',
    uniqueName: 'mf-authentication',
    scriptType: 'text/javascript',
  },
  optimization: {
    runtimeChunk: false,
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'authentication',
      filename: 'remoteEntry.js',
      exposes: {
        AuthenticationModule: './projects/mf-authentication/src/app/authentication/authentication.module.ts',
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
