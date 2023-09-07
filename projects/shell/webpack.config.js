const webpack = require("webpack");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");

const deps = Object.fromEntries(
  Object.entries(require("../../package.json").dependencies).filter(
    ([key]) =>
      !(
        key.includes("@angular/common") ||
        key.includes("@angular/platform") ||
        key.includes("rxjs") ||
        key.includes("tslib") ||
        key.includes("zone.js")
      )
  )
);

module.exports = {
  output: {
    publicPath: "http://localhost:4200/",
    uniqueName: "shell",
    scriptType: "text/javascript",
  },
  optimization: {
    runtimeChunk: false,
  },
  plugins: [
    new ModuleFederationPlugin({
      remotes: {
        profile: "profile@http://localhost:4201/remoteEntry.js",
        authentication: "authentication@http://localhost:4202/remoteEntry.js",
        home: "home@http://localhost:4203/remoteEntry.js",
        article: "article@http://localhost:4204/remoteEntry.js",
        settings: "settings@http://localhost:4205/remoteEntry.js",
        editor: "editor@http://localhost:4206/remoteEntry.js",
      },
      shared: {
        ...deps,
        // bugfix for https://github.com/webpack/webpack/issues/13457
        "@angular/common": {singleton: true, eager: true, strictVersion: true, requiredVersion: "16.0.1",},
        "@angular/common/http": {singleton: true, eager: true, strictVersion: true, requiredVersion: "16.0.1",},
        shared: {
          import: "shared",
          requiredVersion: require("../shared/package.json").version,
        },
      },
    }),
  ],
};
