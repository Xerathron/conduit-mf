import { state } from "@angular/animations";
import { NetworkErrorComponent } from "../error_handling/components/error-handling/network-error-component/network-error.component";
import { ServerErrorComponent } from "../error_handling/components/error-handling/sever-error-component/server-error.component";
import { StateErrorComponent } from "../error_handling/components/error-handling/state-error-component/state-error.component";
import { RetryRecoveryComponent } from "../error_handling/components/error-recovery/retry.recovery/retry.recovery.component";
import { AxiosErrorKeys, ErrorComponent, ErrorComponentMapType, MergedErrorMap, WebpackErrorKeys } from "shared";

const networkErrorGroup: ErrorComponent = {
  errorComponent: NetworkErrorComponent,
  recovery: {
    component: RetryRecoveryComponent,
    button_name: 'Retry now'
  }
}

const serverErrorGroup: ErrorComponent = {
  errorComponent: ServerErrorComponent,
  recovery: {
    component: RetryRecoveryComponent,
    button_name: 'Retry now'
  }
}

const stateErrorGroup: ErrorComponent = {
  errorComponent: StateErrorComponent,
}

const AxiosErrorComponentMap: ErrorComponentMapType<AxiosErrorKeys> = {
  ERR_NETWORK: networkErrorGroup,
  ETIMEDOUT: networkErrorGroup,
  ERR_FR_TOO_MANY_REDIRECTS: networkErrorGroup,
  ECONNABORTED: networkErrorGroup,
  "401": stateErrorGroup,
  "409": networkErrorGroup,
  "425": networkErrorGroup,
  "429": networkErrorGroup,
  "500": serverErrorGroup,
  "502": serverErrorGroup,
  "503": serverErrorGroup,
  "504": serverErrorGroup,
  "506": serverErrorGroup,
  "507": serverErrorGroup,
};

const WebpackErrorComponentMap: ErrorComponentMapType<WebpackErrorKeys> = {
    ERR_CHUNK: { errorComponent: NetworkErrorComponent },
    ERR_CONTAINER: { errorComponent: NetworkErrorComponent },
};


export const RawErrorMap: MergedErrorMap = {
  ...AxiosErrorComponentMap,
  ...WebpackErrorComponentMap,
}
