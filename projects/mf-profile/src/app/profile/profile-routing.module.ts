import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileArticlesComponent } from './profile-articles.component';
import { ProfileFavoritesComponent } from './profile-favorites.component';
import { ProfileResolver } from './profile-resolver.service';
import { ProfileComponent } from './profile.component';
import { ApiService, UserService } from 'shared';
import { HttpClient, HttpClientModule } from '@angular/common/http';


const routes: Routes = [
  {
    path: ':username',
    component: ProfileComponent,
    resolve: {
      profile: ProfileResolver
    },
    children: [
      {
        path: '',
        component: ProfileArticlesComponent
      },
      {
        path: 'favorites',
        component: ProfileFavoritesComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes), HttpClientModule],
  exports: [RouterModule],
})
export class ProfileRoutingModule {}
