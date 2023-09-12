import { ErrorHandler, NgModule } from "@angular/core";
import { SharedModule } from "shared";
import { NetworkErrorComponent } from "./components/error-handling/network-error-component/network-error.component";
import { RetryRecoveryComponent } from './components/error-recovery/retry.recovery/retry.recovery.component';
import { ErrorRootComponent } from "./error-root.component";
import { CustomErrorHandler } from "./error.handler";
import { ErrorRoutingModule } from "./error.router.module";
import { StateErrorComponent } from "./components/error-handling/state-error-component/state-error.component";
import { ServerErrorComponent } from "./components/error-handling/sever-error-component/server-error.component";
import { GenericErrorComponent } from "./components/error-handling/generic-error-component/generic-error.component";

@NgModule({
  declarations: [ErrorRootComponent, NetworkErrorComponent, RetryRecoveryComponent, StateErrorComponent, ServerErrorComponent, GenericErrorComponent],
  imports: [SharedModule, ErrorRoutingModule],
  providers: [
    {
      provide: ErrorHandler,
      useClass: CustomErrorHandler,
    },
  ]
})
export class ErrorModule {}
