import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  // Check if you can also place /authenticaiton as route here. Probably not bc you just can have subroutes handled by the mf so /authentication/login. But this is not the behavior the user expect 
  {
    path: 'login',
    loadChildren: () => import('./authentication/authentication.module').then(m => m.AuthenticationModule),
  },

  {
    path: 'register',
    loadChildren: () => import('./authentication/authentication.module').then(m => m.AuthenticationModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
