import { ErrorHandler, Inject, Injectable } from "@angular/core";
import { Router } from "@angular/router";

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
  }
}
