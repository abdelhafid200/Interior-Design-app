import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { StepperModule } from 'primeng/stepper';
import { CheckboxModule } from 'primeng/checkbox';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { RadioButtonModule } from 'primeng/radiobutton';
import { FloatLabelModule } from 'primeng/floatlabel';


@Component({
  selector: 'app-preferences',
  templateUrl: './preferences.component.html',
  styleUrls: ['./preferences.component.css'],
  standalone: true,
  imports: [ButtonModule, StepperModule, CheckboxModule, 
    InputTextModule, FormsModule, RadioButtonModule,
    FloatLabelModule
  ],
  styles: [
    `
      .p-stepper {
        width: 100%;
      max-width: 600PX;
      margin: 0 auto;
      margin-top: 63PX;
      }
      .form-group {
        margin-bottom: 20px;
      }
      .summary {
        text-align: center;
      }
    `
  ]
})
export class PreferencesComponent {
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
  other_objects : string | undefined;
  other_elements: string | undefined;
  other_styles: string | undefined;
  other_disposition: string | undefined;
  other_ambiance: string | undefined;
  value_email?: string;
  value_name?:string;
  value_couleurs_non?: string;
  value_couleurs?:string;
  votre_meuble?: string;

}
