import {Component} from '@angular/core';
import {NgForm} from '@angular/forms';
import {AuthService} from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html'
})
export class AuthComponent {
  isLoginMode = true;
  isLoading = false;
  error: string = null;
  info: string = null;

  constructor(private authService: AuthService) {
  }

  onSwitchMode(): void {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(authForm: NgForm): void {
    if (!authForm.valid) {
      return;
    }

    const username = authForm.form.value.username;
    const pass = authForm.form.value.password;

    // let authObsv: Observable<object>;

    this.isLoading = true;
    if (this.isLoginMode) {
      this.authService.login(username, pass).subscribe(responseData => {
        this.isLoading = false;
      }, error => {
        console.log(error);
        this.error = 'Invalid login or password';
        this.isLoading = false;
      });
    } else {
      this.authService.signup(username, pass).subscribe(responseData => {
        console.log(responseData.status);
        if (responseData.status === 201) {
          this.info = 'Successful signup';
          this.onSwitchMode();
        }
        this.isLoading = false;
      }, error => {
        console.log(error);
        this.error = error.error.message;
        this.isLoading = false;
      });
    }
    // authObsv.subscribe(responseData => {
    //   console.log(responseData);
    //   this.isLoading = false;
    // }, error => {
    //   console.log(error);
    //   this.error = 'An error occurred';
    //   this.isLoading = false;
    // });

    authForm.reset();
  }
}
