import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { UserService } from 'shared';
import { Observable } from 'rxjs';

import { take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class HomeAuthResolver implements Resolve<boolean> {
  constructor(
    private router: Router,
    private userService: UserService
  ) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    return this.userService.isAuthenticated.pipe(take(1));
  }
}
