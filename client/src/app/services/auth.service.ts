import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import  { Observable } from 'rxjs'
import { RegisterDto } from '../dto/Register.model'

@Injectable({
    providedIn: 'root' 
})

export class AuthService{
    private apiLogin = "http://localhost:5000/auth/login";
    private apiRegister = "http://localhost:5000/auth/register";
    private apiPreferences = "http://127.0.0.1:5000/auth/preferences";

    constructor(private http : HttpClient){}


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

      
      submitPreferences(preferences: any) {
        return this.http.post(this.apiPreferences, preferences);
    }




}