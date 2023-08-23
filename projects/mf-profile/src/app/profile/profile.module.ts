import { NgModule } from '@angular/core';

import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'shared';
import { ProfileArticlesComponent } from './profile-articles.component';
import { ProfileFavoritesComponent } from './profile-favorites.component';
import { ProfileResolver } from './profile-resolver.service';
import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileComponent } from './profile.component';

@NgModule({
  imports: [
    SharedModule,
    ProfileRoutingModule,
    RouterModule,
  ],
  exports: [RouterModule],
  declarations: [
    ProfileArticlesComponent,
    ProfileComponent,
    ProfileFavoritesComponent
  ],
  providers: [
    ProfileResolver,
  ]
})
export class ProfileModule {}
