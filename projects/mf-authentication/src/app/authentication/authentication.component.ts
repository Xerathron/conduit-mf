import { Location } from "@angular/common";
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { Router } from "@angular/router";
import { Errors, UserService } from "shared";

@Component({
  selector: "app-authentication-page",
  templateUrl: "./authentication.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthenticationComponent implements OnInit {
  authType: String = "";
  title: String = "";
  errors: Errors = { errors: {} };
  isSubmitting = false;
  authForm: FormGroup;

  constructor(
    private location: Location,
    private router: Router,
    private userService: UserService,
    private fb: FormBuilder,
    private cd: ChangeDetectorRef
  ) {
    // use FormBuilder to create a form group
    this.authForm = this.fb.group({
      email: ["", Validators.required],
      password: ["", Validators.required],
    });
  }

  ngOnInit() {
    const path = this.location.path();

    // determine whether its the login or the register page
    const isLogin = path.includes("login");

    // Set a title and authType for the page accordingly
    this.title = isLogin ? "Sign in" : "Sign up";
    this.authType = isLogin ? "login" : "register";

    // add form control for username if this is the register page
    if (!isLogin) {
      this.authForm.addControl("username", new FormControl());
    }
    this.cd.markForCheck();
  }

  submitForm() {
    this.isSubmitting = true;
    this.errors = { errors: {} };

    const credentials = this.authForm.value;
    this.userService.attemptAuth(this.authType, credentials).subscribe(
      (data) => this.router.navigateByUrl("/"),
      (err) => {
        this.errors = err;
        this.isSubmitting = false;
        this.cd.markForCheck();
      }
    );
  }
}
