import { Inject, Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { LOCAL_STORAGE, StorageService } from "ngx-webstorage-service";
import { RecoveryService } from "../models/error-handler.model";
import { LAST_ROUTE_INDEX } from "../factory/route-reminder.factory";

@Injectable({
  providedIn: "root",
})
export class RetryRecoveryService implements RecoveryService {
  constructor(
    private router: Router,
    @Inject(LOCAL_STORAGE) private storage: StorageService,
  ) {}

  /**
   * Tries to reload the latest page that causes an error.
   * It assumes that something external has changed e.g.
   * the network connection has been reestablished or
   * the server is available again.
   *
   * @returns Promise that resolves true on success and false on failure
   */
  public recover(): Promise<boolean> {
    return new Promise(async (resolve) => {
      const lastRoute = this.storage.get("last-route")[LAST_ROUTE_INDEX];
      let success;
      try {
        success =  await this.router.navigateByUrl(lastRoute);
      } catch (err) {
        success = false;
      }

      resolve(success);
    });
  }
}
