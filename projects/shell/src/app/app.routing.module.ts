import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { loadRemoteModule } from "./utils/micro-frontend-loader.utils";


@NgModule({
  imports: [RouterModule.forRoot([])],
  exports: [RouterModule],

  providers: [
  ]
})
export class AppRoutingModule {}
