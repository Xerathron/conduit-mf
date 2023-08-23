const webpack = require('webpack');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');

module.exports = {
  output: {
    publicPath: 'http://localhost:4200/',
    uniqueName: 'shell',
    scriptType: 'text/javascript',
  },
  optimization: {
    runtimeChunk: false,
  },
  plugins: [
    new ModuleFederationPlugin({
      remotes: {
        profile: 'profile@http://localhost:4201/remoteEntry.js',
        authentication: 'authentication@http://localhost:4202/remoteEntry.js',
        home: 'home@http://localhost:4203/remoteEntry.js',
        article: 'article@http://localhost:4204/remoteEntry.js',
        settings: 'settings@http://localhost:4205/remoteEntry.js',
        editor: 'editor@http://localhost:4206/remoteEntry.js',
      },
      shared: {
        '@angular/core': { eager: true, singleton: true },
        // bugfix for https://github.com/webpack/webpack/issues/13457
        "@angular/common": { singleton: true, eager: true, strictVersion: true, requiredVersion: '16.0.1' },
        "@angular/common/http": { singleton: true, eager: true, strictVersion: true, requiredVersion: '16.0.1' },
        '@angular/router': { eager: true, singleton: true },
      },
    }),
  ],
};
