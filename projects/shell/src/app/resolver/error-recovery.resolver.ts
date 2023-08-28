import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { RecoveryComponent } from "../models/error-handler.model";
import { Observable } from "rxjs";
import { Inject, Injectable } from "@angular/core";
import { ErrorRouterService } from "../services/error-router.service";
import { LOCAL_STORAGE } from "ngx-webstorage-service";
import { MfLoadError } from "../models/mf-error-load.model";
import { MF_ERROR_LOAD_TOKEN } from "../token/error.token";

@Injectable({
    providedIn: 'root'
})
export class ErrorRecoveryResolver implements Resolve<RecoveryComponent> {
    constructor(@Inject(LOCAL_STORAGE) private storage: Storage, private errorRouter: ErrorRouterService) {}


    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): RecoveryComponent | Observable<RecoveryComponent> | Promise<RecoveryComponent> {
        return new Promise((resolve) => {
            const error: MfLoadError = this.storage['get'](MF_ERROR_LOAD_TOKEN);
            resolve(this.errorRouter.getRecovery(error.reason));
        });
    }

}
