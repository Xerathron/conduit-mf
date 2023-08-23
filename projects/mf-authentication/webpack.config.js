const webpack = require('webpack');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');

module.exports = {
  output: {
    publicPath: 'http://localhost:4202/',
    uniqueName: 'mf-authentication',
    scriptType: 'text/javascript',
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'authentication',
      filename: 'remoteEntry.js',
      exposes: {
        AuthenticationModule: './projects/mf-authentication/src/app/authentication/authentication.module.ts',
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
