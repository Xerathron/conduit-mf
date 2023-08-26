import { Routes } from "@angular/router";
import { NetworkErrorComponent } from "../error_handling/components/error-handling/network-error-component/network-error.component";
import { ErrorRootComponent } from "../error_handling/error-root.component";
import { ErrorGuard } from "../guard/error.guard";
import { ErrorRecoveryResolver } from "../resolver/error-recovery.resolver";

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
        path: "network_error",
        component: NetworkErrorComponent,
      },
    ],
  },
];
