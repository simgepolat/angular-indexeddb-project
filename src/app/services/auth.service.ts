import { SocialUser } from '@abacritt/angularx-social-login';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  loggedIn: boolean = false;

  constructor(private router: Router) { }

  loginWithGoogle(user: SocialUser): void {
      localStorage.setItem('user', JSON.stringify(user));
      this.isLoggedIn();
  }

  logout(): void {
    localStorage.removeItem('user');
    this.router.navigate(['/login']);
  }

  isLoggedIn(): boolean{
      if(this.getUser()!=null){
          return this.loggedIn=true;
      }return false;
  }
  
  getUser(): any {
    return JSON.parse(localStorage.getItem('user') || '{}');
  }
}


    
  
    