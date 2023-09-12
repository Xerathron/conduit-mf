import { MicroFrontend } from "shared";

/*
 * This is just an hardcoded list of remote microfrontends, but could easily be updated
 * to load the config from a database or external file
 */
export const MicroFrontendRoutingTable: MicroFrontend[] = [
  {
    // For Loading
    remoteEntry: "http://localhost:4201/remoteEntry.js",
    remoteName: "profile",
    exposedModule: "ProfileModule",

    // For Routing, enabling us to ngFor over the microfrontends and dynamically create links for the routes
    displayName: "Profile",
    routePath: "profile",
    ngModuleName: "ProfileModule",
  },

  {
    remoteEntry: "http://localhost:4202/remoteEntry.js",
    remoteName: "authentication",
    exposedModule: "AuthenticationModule",

    displayName: "Authentication",
    routePath: "login",
    ngModuleName: "AuthenticationModule",
  },

  {
    remoteEntry: "http://localhost:4202/remoteEntry.js",
    remoteName: "authentication",
    exposedModule: "AuthenticationModule",

    displayName: "Authentication",
    routePath: "register",
    ngModuleName: "AuthenticationModule",
  },

  {
    remoteEntry: "http://localhost:4203/remoteEntry.js",
    remoteName: "home",
    exposedModule: "HomeModule",

    displayName: "Home",
    routePath: "",
    ngModuleName: "HomeModule",
  },

  {
    remoteEntry: "http://localhost:4204/remoteEntry.js",
    remoteName: "article",
    exposedModule: "ArticleModule",

    displayName: "Article",
    routePath: "article",
    ngModuleName: "ArticleModule",
  },

  {
    remoteEntry: "http://localhost:4205/remoteEntry.js",
    remoteName: "settings",
    exposedModule: "SettingsModule",

    displayName: "Settings",
    routePath: "settings",
    ngModuleName: "SettingsModule",
  },
  {
    remoteEntry: "http://localhost:4206/remoteEntry.js",
    remoteName: "editor",
    exposedModule: "EditorModule",

    displayName: "Editor",
    routePath: "editor",
    ngModuleName: "EditorModule",
  },
];
