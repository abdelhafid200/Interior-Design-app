// auth.guard.ts
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    const isAuthenticated = this.authService.isAuthenticated();
    console.log('Is Authenticated:', isAuthenticated);
    
    if (isAuthenticated) {
      return true;
    } else {
      console.log('User is not authenticated, redirecting to login.');
      this.router.navigate(['/login']);
      return false;
    }
  }
  
}
