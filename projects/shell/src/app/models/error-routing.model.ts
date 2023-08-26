import { AxiosError } from "axios";
import { ErrorHandlingComponent, RecoveryComponent, RecoveryService } from "../models/error-handler.model";
import { WebpackError } from "../models/mf-error-load.model";

/**
 * Contains all AxiosError keys
 *
 * Excludes {@link ErrorConstructor} and {@link AxiosError.from}
 */
export type AxiosErrorKeys = Exclude<
  keyof typeof AxiosError,
  keyof ErrorConstructor | "from"
>;

/**
 * Contains all WebpackError keys
 */
export type WebpackErrorKeys = keyof typeof WebpackError;

export type ErrorKeys = AxiosErrorKeys | WebpackErrorKeys;

/**
 * Generic ErrorMap that can be filled with either
 * {@link AxiosErrorKeys} or {@link WebpackErrorKeys}
 */
export type ErrorRouteMapType<T extends ErrorKeys> = Partial<
  Record<T, ErrorRoute>
>;

export type ErrorRoute = {
  errorHandler: ErrorHandlingComponent;
  recovery?: RecoveryComponent | any; // actually just RecoveryComponent but this wont work with typescript 
  path?: string;
};


export type MergedErrorMap = ErrorRouteMapType<AxiosErrorKeys & WebpackError>;