const webpack = require('webpack');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');

const deps = require('../../package.json').dependencies;

module.exports = {
  output: {
    publicPath: 'http://localhost:4206/',
    uniqueName: 'mf-editor',
    scriptType: 'text/javascript',
  },
  optimization: {
    runtimeChunk: false,
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'editor',
      filename: 'remoteEntry.js',
      exposes: {
        EditorModule: './projects/mf-editor/src/app/editor/editor.module.ts',
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
