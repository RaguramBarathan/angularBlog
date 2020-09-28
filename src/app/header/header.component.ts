import { Component, OnDestroy, OnInit } from '@angular/core';
import { ConstantValues } from '../constants';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit , OnDestroy {
  // variables
  public imagePath: string = "";
  isAuthenticated = false;
  private userSub: Subscription;
  
  constructor(
    private authService: AuthService
   ) { 
    this.imagePath = ConstantValues.logoImagePath; 
  }

  ngOnInit(): void {
    //once user is tored in auth , it will triggered
    this.userSub = this.authService.user.subscribe(user => {
      this.isAuthenticated = !!user;
      // console.log(!user);
      // console.log(!!user);
    });
  }
  
  onLogout() {
    this.authService.logout();
  }
  ngOnDestroy() {
    this.userSub.unsubscribe();
  }
}
