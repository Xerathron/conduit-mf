import { APP_INITIALIZER, ErrorHandler, NgModule } from "@angular/core";
import { Router, RouterModule } from "@angular/router";
import { SharedModule } from "shared";
import { CustomErrorHandler } from "./error.handler";

@NgModule({
  declarations: [],
  imports: [SharedModule, RouterModule],
  exports: [RouterModule],
  providers: [
    {
      provide: ErrorHandler,
      useClass: CustomErrorHandler,
    },
  ]
})
export class ErrorModule {}
