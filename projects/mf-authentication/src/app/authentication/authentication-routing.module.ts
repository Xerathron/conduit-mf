import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthenticationComponent } from './authentication.component';
import { NoAuthGuard } from './no-auth-guard.service';

const routes: Routes = [{ path: '', component: AuthenticationComponent, canActivate: [NoAuthGuard] }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuhtenticationRoutingModule {}
