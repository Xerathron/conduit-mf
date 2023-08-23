import { NavigationStart, Router } from "@angular/router";
import { StorageService } from "ngx-webstorage-service";
import { UserService } from "../services";
import { filter } from "rxjs/operators";

/**
 * Invokes the UserService populate() function on startup
 * 
 * This method depends on UserService. Remember to use this in your module:
 * 
 *  @example
 *   providers: [{
        provide: APP_INITIALIZER,
        useFactory: initializeUserService,
        deps: [UserService],
        multi: true
    }]
 */
export const initializeUserService = (userService: UserService) => {
  return () =>
    new Promise<void>((resolve) => {
      userService.populate();
      resolve();
    });
};
