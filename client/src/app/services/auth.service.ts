import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import  { Observable } from 'rxjs'
import { RegisterDto } from '../dto/Register.model'
import { JwtHelperService} from '@auth0/angular-jwt'
import { Router } from '@angular/router';
import { StorageService } from './storage.service';

@Injectable({
    providedIn: 'root' 
})

export class AuthService{
    private apiLogin = "http://localhost:5000/auth/login";
    private apiRegister = "http://localhost:5000/auth/register";
    private apiPreferences = "http://127.0.0.1:5000/auth/preferences";

    constructor(
      private http : HttpClient,
      private jwtHelper: JwtHelperService,
      private router : Router,
      private storageService : StorageService
      
    ){}


    register(userData: { first_name: string; last_name: string; email: string; password: string; }) {
        return this.http.post(this.apiRegister, userData, {
          headers: new HttpHeaders({
            'Content-Type': 'application/json'
          })
        });
    }  
    
    login(credentials: { email: string, password: string }): Observable<any> {
        return this.http.post(`${this.apiLogin}`, credentials); // Make HTTP POST request for login
      }


     
      // isAuthenticated(): boolean {
      //   if (typeof window !== 'undefined' && window.localStorage) { // Vérifier si localStorage est disponible
      //     const token = localStorage.getItem('access_token');
      //     return token ? !this.jwtHelper.isTokenExpired(token) : false;
      //   }
      //   return false;
      // }


      isAuthenticated(): boolean {
        if (typeof window !== 'undefined') { // Vérifier si on est dans le navigateur
          const token = this.storageService.getItem('access_token');
          return token ? !this.jwtHelper.isTokenExpired(token) : false;
        } else {
          // Si dans l'environnement serveur, vous pouvez retourner false ou utiliser une autre stratégie
          return false;
        }
      }
      
      

      
      submitPreferences(preferences: any) {
        return this.http.post(this.apiPreferences, preferences);
    }


    logout(){
      this.storageService.removeItem('access_token');
      this.router.navigate(['/login'])
    }

    getToken(){
      return this.storageService.getItem('access_token')
    }







}