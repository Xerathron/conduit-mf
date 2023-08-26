import { NetworkErrorComponent } from "../error_handling/components/error-handling/network-error-component/network-error.component";
import { RetryRecoveryComponent } from "../error_handling/components/error-recovery/retry-solve-component/retry-recovery.component";
import { AxiosErrorKeys, ErrorRouteMapType, MergedErrorMap, WebpackErrorKeys } from "../models/error-routing.model";

const AxiosErrorRouteMap: ErrorRouteMapType<AxiosErrorKeys> = {
    ERR_FR_TOO_MANY_REDIRECTS: { errorHandler: NetworkErrorComponent },
    ERR_BAD_OPTION_VALUE: { errorHandler: NetworkErrorComponent },
    ERR_BAD_OPTION: { errorHandler: NetworkErrorComponent },
    ERR_DEPRECATED: { errorHandler: NetworkErrorComponent },
    ERR_NETWORK: { errorHandler: NetworkErrorComponent, recovery: RetryRecoveryComponent },
    ERR_BAD_RESPONSE: { errorHandler: NetworkErrorComponent },
    ERR_BAD_REQUEST: { errorHandler: NetworkErrorComponent },
    ERR_NOT_SUPPORT: { errorHandler: NetworkErrorComponent },
    ERR_INVALID_URL: { errorHandler: NetworkErrorComponent },
    ERR_CANCELED: { errorHandler: NetworkErrorComponent },
    ECONNABORTED: { errorHandler: NetworkErrorComponent },
    ETIMEDOUT: { errorHandler: NetworkErrorComponent },
};
  
const WebpackErrorRouteMap: ErrorRouteMapType<WebpackErrorKeys> = {
    ERR_CHUNK: { errorHandler: NetworkErrorComponent },
    ERR_CONTAINER: { errorHandler: NetworkErrorComponent },
};


export const RawErrorMap: MergedErrorMap = {
  ...AxiosErrorRouteMap,
  ...WebpackErrorRouteMap,
}