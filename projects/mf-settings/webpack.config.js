const webpack = require('webpack');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');

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
        '@angular/core': { singleton: true, eager: true },
        // bugfix for https://github.com/webpack/webpack/issues/13457
        "@angular/common": { singleton: true, eager: true, strictVersion: true, requiredVersion: '16.0.1' },
        "@angular/common/http": { singleton: true, eager: true, strictVersion: true, requiredVersion: '16.0.1' },
        '@angular/router': { singleton: true, eager: true },
      },
    }),
  ],
};
