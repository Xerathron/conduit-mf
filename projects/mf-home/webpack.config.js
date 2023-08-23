const webpack = require('webpack');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');

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
        '@angular/core': { singleton: true, eager: true },
        // bugfix for https://github.com/webpack/webpack/issues/13457
        "@angular/common": { singleton: true, eager: true, strictVersion: true, requiredVersion: '16.0.1' },
        "@angular/common/http": { singleton: true, eager: true, strictVersion: true, requiredVersion: '16.0.1' },
        '@angular/router': { singleton: true, eager: true },
      },
    }),
  ],
};
