import { SocialAuthService, SocialUser } from "@abacritt/angularx-social-login";
import { Component, HostBinding, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "src/app/services/auth.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  
  constructor(private router: Router, private authService: AuthService, private auth: SocialAuthService) { }

  user: SocialUser = {} as SocialUser;
  loggedIn: boolean = false;
  
  ngOnInit() {
    this.auth.authState.subscribe((user) => {
      this.user = user;
      this.loggedIn = (user != null);
      console.log(this.user)
      this.authService.loginWithGoogle(this.user);
      this.goto();
    });
  }

  goto() {
    if (this.authService.loggedIn) {
      return this.router.navigate(['/home']);
    } else {
      return this.router.navigate(['/login']);
    }
  }
}