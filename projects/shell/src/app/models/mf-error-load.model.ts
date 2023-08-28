import { AxiosError } from "axios";
import { ErrorComponent } from "./error-routing.model";
import { MicroFrontend } from "./micro-frontend.model";

export enum WebpackError {
  ERR_CONTAINER = "ERR_CONTAINER",
  ERR_CHUNK = "ERR_CHUNK",
}

export class WebpackException implements Reason, Error {
  public message: string;
  public name: string;

  constructor(public error: Error, public code: WebpackError) {
    this.message = error.message;
    this.name = error.name;
  }
}

export declare type ErrorType = typeof WebpackException | typeof AxiosError;

/**
 * Gives the cause of the thrown error
 */
export interface Reason extends Error {
  code: string,
}

/**
 * The Baggage carries all information needed to process a
 * error properly that occurred loading a micro frontend
 */
export interface MfLoadError {
  /**
   * Contains the MicroFrontend that should be loaded
   * but causes a load failure
   */
  targetMf: MicroFrontend;


  /**
   * Holds an object containing information about the error cause.
   */
  reason: Reason;

  route?: ErrorComponent;
}
