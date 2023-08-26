import { Component, Inject, OnDestroy, OnInit } from "@angular/core";
import { LOCAL_STORAGE, StorageService } from "ngx-webstorage-service";

@Component({
  selector: "app-error-root",
  templateUrl: "./error-root.component.html",
  styleUrls: ["./error-root.component.scss"],
})
export class ErrorRootComponent implements OnDestroy {

  constructor(
    @Inject(LOCAL_STORAGE) private storage: StorageService,
  ) {}

  /**
   * Generic cleanup
   *
   * Removes mf-error-load whenever the users moves out of
   * the /error/ page scope
   */
  ngOnDestroy(): void {
    this.storage.remove("mf-error-load");
  }
}
