import { inject, Injectable } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

export const authGuard = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.loggedIn) {
    return router.navigate(['/home']);
  } else {
    return router.navigate(['/login']);
  }
  
};
