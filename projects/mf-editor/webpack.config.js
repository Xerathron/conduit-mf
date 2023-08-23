const webpack = require('webpack');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');

module.exports = {
  output: {
    publicPath: 'http://localhost:4206/',
    uniqueName: 'mf-editor',
    scriptType: 'text/javascript',
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'editor',
      filename: 'remoteEntry.js',
      exposes: {
        EditorModule: './projects/mf-editor/src/app/editor/editor.module.ts',
      },
      shared: {
        '@angular/core': { singleton: true, eager: true },
        // bugfix for https://github.com/webpack/webpack/issues/13457
        "@angular/common": { singleton: true, eager: true, strictVersion: true, requiredVersion: '16.0.1' },
        "@angular/common/http": { singleton: true, eager: true, strictVersion: true, requiredVersion: '16.0.1' },
        '@angular/router': { singleton: true, eager: true },
      },
    }),
  ],
};
