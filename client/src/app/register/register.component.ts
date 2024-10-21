import { Component } from '@angular/core';
import { RegisterDto } from '../dto/Register.model';
import { AuthService } from '../services/auth.service';
import { ToastService } from '../services/toast.service';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { UserService } from '../shared/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  registerDto: RegisterDto = new RegisterDto();
  isLoading: boolean = false; // To track the loading state
  displayPreferenceDialog: boolean = false;

  constructor(
    private authServices: AuthService,
    private messageService: MessageService,
    private router : Router,
    private userService : UserService
  ) {}


  

  onSubmit() {
    const user = {
      first_name: this.registerDto.first_name, // Correcting key to first_name
      last_name: this.registerDto.last_name, // Correcting key to last_name
      email: this.registerDto.email,
      password: this.registerDto.password,
    };




    console.log('User data being sent:', user); // Log the payload

    this.authServices.register(user).subscribe(
      (response : any) => {

        const userId = response.id; 
        console.log('Registered successfully', response);
        console.log("user id : ", userId)
        this.userService.setUserId(userId);
        console.log('User ID set in UserService:', this.userService.getUserId()); // Log to verify if user ID is stored correctly
        this.showSuccess(); 
        this.isLoading = true; 
        this.displayPreferenceDialog = true;
        setTimeout(() => {
          this.isLoading = false;
          // this.displayPreferenceDialog = false;
          // this.router.navigate(['/login']);
        }, 2000);
      },
      (error) => {
        console.error('Registration failed', error);
        this.isLoading = false; 
        this.handleError(error);
        
      }
    );
  }

    // Method to handle preferences submission
    handlePreferences(preferences: any) {
      console.log('User preferences:', preferences);
      this.showSuccessPreferences();
      this.displayPreferenceDialog = false; // Close the dialog
      this.isLoading=true
      setTimeout(()=> {

        this.isLoading= false
        this.router.navigate(['/login']); // Redirect to login
      }, 1000)
    }

   // Methods to display toast messages
   showSuccess() {
    this.messageService.add({ severity: 'success', summary: 'Succès', detail: 'Votre compte a été créé avec succès!' });
  }
   showSuccessPreferences() {
    this.messageService.add({ severity: 'success', summary: 'Succès', detail: 'Votre prefernecese ont été enregisterer avec succès!' });
  }

  login(){
    this.router.navigate(['/login'])
  }

  handleError(error: any) {
    let errorMessage = 'Une erreur inconnue s\'est produite.'; // Default error message

    // Check if there's a response message from the backend
    if (error.error && error.error.message) {
        errorMessage = error.error.message;
    }

    // Handle specific status codes and show more detailed messages if needed
    switch (error.status) {
        case 400:
            this.showError('Erreur de validation. Veuillez vérifier les informations saisies.');
            break;
        case 401:
            this.showError('Non autorisé. Veuillez vous connecter pour continuer.');
            break;
        case 409:
            this.showError('L\'adresse email existe déjà. Veuillez en choisir une autre.');
            break;
        case 500:
            this.showError('Erreur interne du serveur. Veuillez réessayer plus tard.');
            break;
        default:
            this.showError(errorMessage); // Display the specific error message from backend
            break;
    }
}

  showError(message : string) {
    this.messageService.add({ severity: 'error', summary: 'Erreur', detail: message });
  }
}
