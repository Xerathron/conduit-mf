import { Routes } from "@angular/router";
import { NetworkErrorComponent } from "../error_handling/components/error-handling/network-error-component/network-error.component";
import { ErrorRootComponent } from "../error_handling/error-root.component";
import { ErrorGuard } from "../guard/error.guard";
import { ErrorRecoveryResolver } from "../resolver/error-recovery.resolver";
import { GenericErrorComponent } from "../error_handling/components/error-handling/generic-error-component/generic-error.component";
import { ServerErrorComponent } from "../error_handling/components/error-handling/sever-error-component/server-error.component";
import { StateErrorComponent } from "../error_handling/components/error-handling/state-error-component/state-error.component";

export const ErrorRoutes: Routes = [
  {
    path: "error",
    component: ErrorRootComponent,
    canActivate: [ErrorGuard],
    resolve: {
      recovery: ErrorRecoveryResolver,
    },

    children: [
      {
        path: "",
        pathMatch: 'full',
        component: GenericErrorComponent,
      },

      {
        path: "network_error",
        component: NetworkErrorComponent,
      },

      {
        path: "server_error",
        component: ServerErrorComponent,
      },

      {
        path: "state_error",
        component: StateErrorComponent,
      },
    ],
  },
];
