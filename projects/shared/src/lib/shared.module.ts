import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { SharedComponentModule } from './components';
import { HttpTokenInterceptor } from './interceptors';
import { SharedServicesModule } from './services/services.module';

@NgModule({
  declarations: [],
  imports: [CommonModule, SharedComponentModule, SharedServicesModule],
  exports: [SharedComponentModule],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: HttpTokenInterceptor, multi: true }
  ],
})
export class SharedModule {}
