import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { loadRemoteModule } from "./utils/micro-frontend-loader.utils";


const ROUTES: Routes = [
  {
    path: "",
    pathMatch: 'full',
    loadChildren: () =>
      loadRemoteModule({
        remoteEntry: "http://localhost:4203/remoteEntry.js",
        remoteName: "home",
        exposedModule: "HomeModule",
      }).then((m) => m.HomeModule),
  },

  {
    path: "profile",
    loadChildren: () =>
      loadRemoteModule({
        remoteEntry: "http://localhost:4201/remoteEntry.js",
        remoteName: "profile",
        exposedModule: "ProfileModule",
      }).then((m) => m.ProfileModule),
  },

  {
    path: "login",
    loadChildren: () =>
      loadRemoteModule({
        remoteEntry: "http://localhost:4202/remoteEntry.js",
        remoteName: "authentication",
        exposedModule: "AuthenticationModule",
      }).then((m) => m.AuthenticationModule),
  },

  {
    path: "register",
    loadChildren: () =>
      loadRemoteModule({
        remoteEntry: "http://localhost:4202/remoteEntry.js",
        remoteName: "authentication",
        exposedModule: "AuthenticationModule",
      }).then((m) => m.AuthenticationModule),
  },



  {
    path: "article",
    loadChildren: () =>
      loadRemoteModule({
        remoteEntry: "http://localhost:4204/remoteEntry.js",
        remoteName: "article",
        exposedModule: "ArticleModule",
      }).then((m) => m.ArticleModule),
  },

  {
    path: "settings",
    loadChildren: () =>
      loadRemoteModule({
        remoteEntry: "http://localhost:4205/remoteEntry.js",
        remoteName: "settings",
        exposedModule: "SettingsModule",
      }).then((m) => m.SettingsModule),
  },

  {
    path: "editor",
    loadChildren: () =>
      loadRemoteModule({
        remoteEntry: "http://localhost:4206/remoteEntry.js",
        remoteName: "editor",
        exposedModule: "EditorModule",
      }).then((m) => m.EditorModule),
  },
];


@NgModule({
  imports: [RouterModule.forRoot(ROUTES)],
  exports: [RouterModule],

  providers: [
  ]
})
export class AppRoutingModule {}
