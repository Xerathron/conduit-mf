import { Component, Inject, OnInit } from "@angular/core";
import { LOCAL_STORAGE, StorageService } from "ngx-webstorage-service";
import { ErrorHandlingComponent, MfLoadError } from "shared";
import { MF_ERROR_LOAD_TOKEN } from "projects/shell/src/app/token/error.token";

@Component({
  selector: "app-state-error",
  templateUrl: "./state-error.component.html",
  styleUrls: ["./state-error.component.scss"],
})
export class StateErrorComponent implements OnInit, ErrorHandlingComponent {
  public error: MfLoadError;

  constructor(
    @Inject(LOCAL_STORAGE) private storage: StorageService,
  ) {}

  ngOnInit(): void {
    this.error = this.storage.get(MF_ERROR_LOAD_TOKEN);
  }
}
