import { Router, NavigationStart } from "@angular/router";
import { StorageService } from "ngx-webstorage-service";
import { filter } from "rxjs/operators";

export const ROUTE_TOKEN = "last-route";


/**
 * Size of the routes array - 1
 */
export const LAST_ROUTE_INDEX = 1;

export const initializeRouteReminder = (
  router: Router,
  storage: StorageService
) => {
  /**
   * Insert new route to array.
   * The array size is limited to 2 routes.
   *
   * @param routes Array with current routes
   * @param route new route
   * @returns New array
   */
  const addRoute = (routes: Array<string>, route: string): Array<string> => {
    if (routes.length >= 2) {
      routes.shift();
    }
    routes.push(route);

    return routes;
  };

  return () =>
    new Promise<void>((resolve) => {
      router.events
        .pipe(filter((event) => event instanceof NavigationStart))
        .subscribe((event: NavigationStart) => {
          if (event.url.includes("/error")) {
            return;
          }

          let routes: Array<string> = storage.get(ROUTE_TOKEN) || [];
          // true if user reloads the page manually or presses the reconnection button
          if (routes[LAST_ROUTE_INDEX] === event.url) {
            return;
          }

          routes = addRoute(routes, event.url);
          storage.set(ROUTE_TOKEN, routes);
        });

      resolve();
    });
};
