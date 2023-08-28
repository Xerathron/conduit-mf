import { ErrorHandler, NgModule } from "@angular/core";
import { SharedModule } from "shared";
import { NetworkErrorComponent } from "./components/error-handling/network-error-component/network-error.component";
import { RetryRecoveryComponent } from './components/error-recovery/retry.recovery/retry.recovery.component';
import { ErrorRootComponent } from "./error-root.component";
import { CustomErrorHandler } from "./error.handler";
import { ErrorRoutingModule } from "./error.router.module";

@NgModule({
  declarations: [ErrorRootComponent, NetworkErrorComponent, RetryRecoveryComponent],
  imports: [SharedModule, ErrorRoutingModule],
  providers: [
    {
      provide: ErrorHandler,
      useClass: CustomErrorHandler,
    },
  ]
})
export class ErrorModule {}
