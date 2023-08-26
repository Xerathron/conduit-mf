import { ErrorHandler, Inject, Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { LOCAL_STORAGE, StorageService } from "ngx-webstorage-service";
import { MfLoadError } from "../models/mf-error-load.model";
import { ErrorRouterService } from "../services/error-router.service";

export const MF_ERROR_LOAD_TOKEN = "mf-error-load";

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
   * Filters orphan errors and invoke {@link routeNext}
   *
   * @param error any possible error. Could also contain dev errors
   * @returns
   */
  handleError(error: any) {
    if (!error.rejection) {
      // errors that does not belong to any micro-frontend load error
      console.error("Unknown error occurred: " + error);
      return;
    }

    this.routeNext(error.rejection);
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
