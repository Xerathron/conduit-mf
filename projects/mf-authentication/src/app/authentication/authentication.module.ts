import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { SharedModule } from "shared";
import { AuhtenticationRoutingModule } from "./authentication-routing.module";
import { AuthenticationComponent } from "./authentication.component";
import { NoAuthGuard } from "./no-auth-guard.service";


const EXPORTS = [];

@NgModule({
  declarations: [...EXPORTS, AuthenticationComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    AuhtenticationRoutingModule,
  ],
  exports: [...EXPORTS],
  providers: [NoAuthGuard]
})
export class AuthenticationModule {
  static exports = EXPORTS; // prevents from components being tree-shaked in production
}
