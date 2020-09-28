import { Component, OnInit } from '@angular/core';
import { ConstantValues} from '../constants';
import { NgForm } from '@angular/forms';
import { AuthService, AuthResponseData } from './auth.service';
import { Observable, Subscription } from 'rxjs';
import { Router } from '@angular/router';


@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})

export class AuthComponent implements OnInit {
  // variables
   logoImagePath  = ConstantValues.logoImagePath;

   isLoginMode = true;
   isLoading = false;
   error: string = null;

   private closeSub: Subscription;

  constructor(
    private authService: AuthService,
    private router: Router,
  ) { }

  ngOnInit(): void {
  }
  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }
    const email = form.value.email;
    const password = form.value.password;
    //at last for both sign up & login will give some same observable 
    let authObs: Observable<AuthResponseData>;


    this.isLoading = true;

    if (this.isLoginMode) {
      authObs = this.authService.login(email, password);
    } else {
      authObs = this.authService.signup(email, password);
    }

    authObs.subscribe(
      resData => {
        //console.log(resData);
        this.isLoading = false;
        this.router.navigate(['/blogs']);

      },
      errorMessage => {
        console.log(errorMessage);
        this.error = errorMessage;
       // this.showErrorAlert(errorMessage);
        this.isLoading = false;
      }
    );

    form.reset();
  }
  onHandleError() {
    this.error = null;
  }

  ngOnDestroy() {
    if (this.closeSub) {
      this.closeSub.unsubscribe();
    }
  }
  firebaseLogin(e , p){
    this.authService.firebaseLogin(e,p);
  }

}
