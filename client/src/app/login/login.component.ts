import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service'; // Authentication service
import { MessageService } from 'primeng/api'; // PrimeNG MessageService for toasts
import { Router } from '@angular/router';
import { StorageService } from '../services/storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  providers: [MessageService],
})
export class LoginComponent {
  isLoading: boolean = false;
  email: string = '';
  password: string = '';

  constructor(
    private authService: AuthService,
    private messageService: MessageService,
    private router: Router,
    private storageService: StorageService
  ) {}

  onLogin() {
    const loginCredentials = {
      email: this.email,
      password: this.password,
    };

    console.log('Login data being sent:', loginCredentials);

    this.authService.login(loginCredentials).subscribe(
      (response) => {
        const token = response.access_token;

        if(token){
          this.storageService.setItem('access_token', token);
          console.log('Login successful', response);
          this.showSuccess(); // Show success toast
          this.isLoading = true;
          setTimeout(() => {
            this.isLoading = false;
            this.router.navigate(['/interior-design']);
          }, 1000);
        }else{
          console.error('No token found in the response');
        }

      },
      (error) => {
        console.error('Login failed', error);
        this.isLoading = false;
        this.handleError(error); // Show specific error message
      }
    );
  }

  // Success toast
  showSuccess() {
    this.messageService.add({
      severity: 'success',
      summary: 'Succès',
      detail: 'Connexion réussie!',
    });
  }

  // Error handling based on error type
  handleError(error: any) {
    if (error.status === 401) {
      this.showError('Email ou mot de passe incorrect. Veuillez réessayer.'); // 401 Unauthorized
    } else if (error.status === 500) {
      this.showError(
        'Erreur interne du serveur. Veuillez réessayer plus tard.'
      ); // 500 Internal Server Error
    } else {
      this.showError("Une erreur inconnue s'est produite."); // Unknown error
    }
  }

  // Error toast
  showError(message: string) {
    this.messageService.add({
      severity: 'error',
      summary: 'Erreur',
      detail: message,
    });
  }
}
