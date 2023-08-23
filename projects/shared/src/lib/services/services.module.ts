import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { HttpTokenInterceptor } from '../interceptors';
import { RouterModule } from '@angular/router';
import { ProfilesService } from './profiles.service';
import { ApiService } from './api.service';
import { ArticlesService } from './articles.service';
import { AuthGuard } from './auth-guard.service';
import { CommentsService } from './comments.service';
import { TagsService } from './tags.service';
import { UserService } from './user.service';

@NgModule({
  declarations: [],
  imports: [CommonModule, HttpClientModule, RouterModule],
  exports: [HttpClientModule, RouterModule],
  providers: [
    HttpClient, ApiService, UserService, ProfilesService, ArticlesService, CommentsService, AuthGuard, TagsService,
    { provide: HTTP_INTERCEPTORS, useClass: HttpTokenInterceptor, multi: true }
  ],
})
export class SharedServicesModule {}  