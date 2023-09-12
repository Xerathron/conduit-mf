import { Component } from "@angular/core";
import { ErrorHandlingComponent } from "shared";

@Component({
  selector: "app-generic-error",
  templateUrl: "./generic-error.component.html",
})
export class GenericErrorComponent implements ErrorHandlingComponent {
  constructor() {}
}
