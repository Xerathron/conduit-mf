import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routing.module';
import { SharedModule } from 'shared';
import { MicroFrontendRouteFactory } from './factory/micro-frontend-route.factory';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    SharedModule,
    BrowserModule,
    AppRoutingModule
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: () => (): Promise<void> => Promise.resolve(),
      deps: [MicroFrontendRouteFactory],
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
