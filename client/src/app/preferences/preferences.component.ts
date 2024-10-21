import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { StepperModule } from 'primeng/stepper';
import { CheckboxModule } from 'primeng/checkbox';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { RadioButtonModule } from 'primeng/radiobutton';
import { FloatLabelModule } from 'primeng/floatlabel';
import { DialogModule } from 'primeng/dialog';
import { AuthService } from '../services/auth.service';
import { UserService } from '../shared/user.service';
import { BehaviorSubject } from 'rxjs';



@Component({
  selector: 'app-preferences',
  templateUrl: './preferences.component.html',
  styleUrls: ['./preferences.component.css'],
  standalone: true,
  imports: [
    ButtonModule,
    StepperModule,
    CheckboxModule,
    InputTextModule,
    FormsModule,
    RadioButtonModule,
    FloatLabelModule,
    DialogModule
  ],
  styles: [
    `
      .p-stepper {
        width: 100%;
        max-width: 600px;
        margin: 0 auto;
        margin-top: 63px;
      }
      .form-group {
        margin-bottom: 20px;
      }
      .summary {
        text-align: center;
      }
    `,
  ],
})
export class PreferencesComponent implements OnInit {


  userId : number | null = null

  ngOnInit(): void {
    // this.userId = this.userService.getUserId();
      this.userId = 69;
    console.log('User ID in preferences component:', this.userId);
      
      if (!this.userId) {
        console.error('No user ID found, redirecting to register.');
       
      }
  }
  
  @Output() preferencesSubmitted = new EventEmitter<any>();



  

  preference1: string = '';
  option1: boolean = false;
  option2: boolean = false;
  Mobilier!: string;
  Taille!: string;
  Style!: string;
  Disposition!: string;
  Ambiance!: string;
  Eclairage!: string;
  ingredient!: string;
  Elements!: string;
  value: string | undefined;
  other_eclairage: string | undefined;
  other_objects: string | undefined;
  other_elements: string | undefined;
  other_styles: string | undefined;
  other_disposition: string | undefined;
  other_ambiance: string | undefined;
  value_email?: string;
  value_name?: string;
  value_couleurs_non?: string;
  value_couleurs?: string;
  votre_meuble?: string;
  budget?: string;
  additionalNotes?: string;

  constructor(
    private authServices : AuthService,
    private userService : UserService,
  ){}

  visible: boolean = false;

  showDialog() {
    // Check for user ID when opening the dialog
    this.userId = this.userService.getUserId(); 
    console.log('User ID in preferences component:', this.userId); 
    
    if (!this.userId) {
        console.error('No user ID found !!!!!!!!!!!!, redirecting to register.');
        // Redirect to register or handle the case where userId is not found
        return; 
    }

    this.visible = true; // Show dialog only if user ID is present
}



    onSubmit(){


      if (!this.userId) {
        console.error('No user ID found. Cannot submit preferences.');
        return;
      }


      const preferences = {
        user_id: this.userId,
        style: this.Style,
        colors: this.value_couleurs,
        disliked_colors: this.value_couleurs_non,
        furniture: this.votre_meuble,
        size: this.Taille,
        layout: this.Disposition,
        budget: this.budget,
        additional_notes: this.additionalNotes,
    };



    console.log('User preferences:', preferences);
    console.log('Submitting preferences with user ID:', this.userId);

    this.authServices.submitPreferences(preferences).subscribe(
      (response) => {
        console.log('Preferences submitted successfully', response);
        this.preferencesSubmitted.emit(preferences);
      },
      (error) => {
        console.error('Error submitting preferences', error);

      }
    );

    }



}
