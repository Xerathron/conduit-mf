import { HttpClientModule } from "@angular/common/http";
import { APP_INITIALIZER, NgModule } from "@angular/core";
import { Router, RouterModule } from "@angular/router";
import { ErrorRoutes } from "../utils/error-routing.table";
import { ErrorRecoveryResolver } from "../resolver/error-recovery.resolver";
import { LOCAL_STORAGE } from "ngx-webstorage-service";
import { initializeRouteReminder } from "../factory/route-reminder.factory";


@NgModule({
  imports: [RouterModule.forChild(ErrorRoutes), HttpClientModule],
  exports: [RouterModule],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: initializeRouteReminder,
      deps: [Router, LOCAL_STORAGE],
      multi: true,
    },
  ]
})
export class ErrorRoutingModule {}
