import { Component } from "@angular/core";
import { ErrorHandlingComponent } from "../../../../models/error-handler.model";

@Component({
  selector: "app-generic-error",
  templateUrl: "./generic-error.component.html",
})
export class GenericErrorComponent implements ErrorHandlingComponent {
  constructor() {}
}
