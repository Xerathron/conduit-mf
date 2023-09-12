import { ErrorHandler, Inject, Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { LOCAL_STORAGE, StorageService } from "ngx-webstorage-service";
import { MfLoadError } from "shared";
import { ErrorRouterService } from "../services/error-router.service";
import { MF_ERROR_LOAD_TOKEN } from "../token/error.token";


/**
 * Catches errors on lazy loading
 * modules, chunks, or remoteEntry points
 *
 * If the error is handable route to proper
 * Error handling component
 */
@Injectable({
  providedIn: "root",
})
export class CustomErrorHandler implements ErrorHandler {
  constructor(
    private router: Router,
    private errorRouter: ErrorRouterService,
    @Inject(LOCAL_STORAGE) private storage: StorageService<MfLoadError>
  ) {}

  /**
   * Handles errors by merging different error structure codes to the
   * same format.
   *
   * @param error any error. The structure should look like
   *  {rejection: {reason: any}} | {reason: any}
   */
  handleError(errorWrapper: any) {
    let error = errorWrapper.rejection || errorWrapper;
    if (!error?.reason) {
      // unknown error or error that does not match the known error structure
      throw errorWrapper;
    }

    this.routeNext(error);
  }

  /**
   * Determine the error route and navigate to it
   * Saves the given error to the local storage
   *
   * @param error containing additional information about the error cause
   */
  private routeNext(error: MfLoadError) {
    const route = this.errorRouter.getRoute(error.reason);
    error.route = route;

    this.storage.set(MF_ERROR_LOAD_TOKEN, error);
    this.router.navigate([route.path]);
  }
}
