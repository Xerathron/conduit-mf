import { NetworkErrorComponent } from "../error_handling/components/error-handling/network-error-component/network-error.component";
import { RetryRecoveryComponent } from "../error_handling/components/error-recovery/retry.recovery/retry.recovery.component";
import { AxiosErrorKeys, ErrorComponent, ErrorComponentMapType, MergedErrorMap, RecoveryContainer, WebpackErrorKeys } from "../models/error-routing.model";

const networkErrorGroup: ErrorComponent = {
  errorComponent: NetworkErrorComponent,
  recovery: {
    component: RetryRecoveryComponent,
    button_name: 'Retry now'
  }
}

const AxiosErrorComponentMap: ErrorComponentMapType<AxiosErrorKeys> = {
  ERR_NETWORK: networkErrorGroup,
  ETIMEDOUT: networkErrorGroup,
  ERR_FR_TOO_MANY_REDIRECTS: networkErrorGroup,
  ECONNABORTED: networkErrorGroup,
};

const WebpackErrorComponentMap: ErrorComponentMapType<WebpackErrorKeys> = {
    ERR_CHUNK: { errorComponent: NetworkErrorComponent },
    ERR_CONTAINER: { errorComponent: NetworkErrorComponent },
};


export const RawErrorMap: MergedErrorMap = {
  ...AxiosErrorComponentMap,
  ...WebpackErrorComponentMap,
}
