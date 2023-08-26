import { Inject, Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { LOCAL_STORAGE, StorageService } from 'ngx-webstorage-service';
import { Observable } from "rxjs";
import { MF_ERROR_LOAD_TOKEN } from "../error_handling/error.handler";

/**
 * Guard to prevent user to directly access error pages
 * Mostly rejected by not existing mf-error-load
 */
@Injectable({
    providedIn: 'root'
})
export class ErrorGuard implements CanActivate {
    constructor(@Inject(LOCAL_STORAGE) private storage: StorageService,
    private router: Router) {}
    
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        if (!this.storage.get('last-route') || !this.storage.get(MF_ERROR_LOAD_TOKEN)) {
            this.router.navigate(['/'])
            return false;
        }

        return true;
    }
}