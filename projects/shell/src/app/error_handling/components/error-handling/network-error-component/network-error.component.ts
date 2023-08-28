import { Component, Inject, OnInit } from "@angular/core";
import { LOCAL_STORAGE, StorageService } from "ngx-webstorage-service";
import { ErrorHandlingComponent } from "projects/shell/src/app/models/error-handler.model";
import { MfLoadError } from "projects/shell/src/app/models/mf-error-load.model";
import { MF_ERROR_LOAD_TOKEN } from "projects/shell/src/app/token/error.token";

@Component({
  selector: "app-network-error",
  templateUrl: "./network-error.component.html",
  styleUrls: ["./network-error.component.scss"],
})
export class NetworkErrorComponent implements OnInit, ErrorHandlingComponent {
  public error: MfLoadError;

  constructor(
    @Inject(LOCAL_STORAGE) private storage: StorageService,
  ) {}

  ngOnInit(): void {
    this.error = this.storage.get(MF_ERROR_LOAD_TOKEN);
  }
}
