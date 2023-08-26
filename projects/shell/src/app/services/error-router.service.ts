import { Injectable, OnInit } from "@angular/core";
import { Route } from "@angular/router";
import {
  ErrorKeys,
  ErrorRoute,
  MergedErrorMap,
} from "../models/error-routing.model";
import { Reason } from "../models/mf-error-load.model";
import { RawErrorMap } from "../utils/error-2-route.map";
import { ErrorRoutes } from "../utils/error-routing.table";
import { GenericErrorComponent } from "../error_handling/components/error-handling/generic-error-component/generic-error.component";
import { RecoveryComponent } from "../models/error-handler.model";

@Injectable({
  providedIn: "root",
})
export class ErrorRouterService {
  /** Error prefix path */
  private readonly prefix = ErrorRoutes[0].path + "/";
  private ErrorRouteMap: MergedErrorMap;

  private readonly genericRoute: ErrorRoute = {
    errorHandler: GenericErrorComponent,
    path: this.prefix,
  };

  constructor() {
    this.ErrorRouteMap = this.fullfilMap(RawErrorMap);
  }

  /**
   * Return the route that matches the reason.code
   * The routing table is {@link ErrorRouteMap}
   *
   * @Note If the route doesn't exist in the table fallback
   * to a generic error message that is contained in the 
   * {@link ErrorRootComponent}
   *
   * @param reason reason object why the error occurred
   * @returns error route appended by a root path prefix
   */
  getRoute(reason: Reason): ErrorRoute {
    return this.ErrorRouteMap[reason.code] || this.genericRoute;
  }

  getRecovery(error: Reason): RecoveryComponent | undefined {
    const key = Object.keys(this.ErrorRouteMap).find(
      (errorKey: ErrorKeys) => errorKey === error.code
    ) as ErrorKeys;

    return this.ErrorRouteMap[key]?.recovery;
  }

  /**
   * Resolve the path for the errorHandler component
   *
   * @param routes that will be
   * @returns final route map
   */
  private fullfilMap(routes: MergedErrorMap): MergedErrorMap {
    Object.keys(routes).forEach((key: ErrorKeys) => {
      routes[key].path = this.resolvePath(routes[key]);
    });

    return routes;
  }

  /**
   * Resolves the path for the current route.
   *
   * It tries to match the ErrorRoutes with the errorHandler
   * attribute of the current route.
   *
   * @throws if there is no match
   *
   * @param route route
   * @returns resolved path as string
   */
  private resolvePath(route: ErrorRoute): string {
    const staticRoute = ErrorRoutes[0].children.find(
      (_route: Route) => _route.component === route.errorHandler
    );

    if (!staticRoute) {
      throw Error(
        "The " +
          route.errorHandler +
          " component is defined in the ErrorRouteMap but not in the ErrorRoutes. Add the component there as a new children."
      );
    }

    return this.prefix + staticRoute.path;
  }
}
