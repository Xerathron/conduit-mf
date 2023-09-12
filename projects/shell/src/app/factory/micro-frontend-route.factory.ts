import { Injectable, OnInit } from "@angular/core";
import { Router, Routes } from "@angular/router";
import { MfLoadError, MicroFrontend } from "shared";
import { loadRemoteModule } from "../utils/micro-frontend-loader.utils";
import { MicroFrontendRoutingTable } from "../utils/micro-frontend-routing.table";

@Injectable({
  providedIn: "root",
})
export class MicroFrontendRouteFactory {
  constructor(private router: Router) {
    this.addRoutes();
  }

  /**
   * Adding routes to global routing config
   */
  private addRoutes() {
    const routes: Routes = this.buildRoutes(MicroFrontendRoutingTable);
    this.router.config.push(...routes);
  }

  /**
   * Build routes out of {@link MicroFrontend} objects
   *
   * @param options Micro frontend routes
   * @returns new total routes
   */
  private buildRoutes(options: MicroFrontend[]): Routes {
    return options.map((o) => ({
      path: o.routePath,
      loadChildren: () =>
        loadRemoteModule(o)
          .then((m) => m[o.ngModuleName])
          .catch((error: any) => {
            // If it doesn't quack like a duck. Force it to do so
            if (!error.code) {
              error.code = error.message;
            }

            // intercept error flow to inject information
            throw { targetMf: o, reason: error } as MfLoadError;
          }),
    }));
  }
}
