import { NgModule, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
// import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { IndexComponent } from './index/index.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { InteriorDesignComponent } from './interior-design/interior-design.component';
import { QuestionnaireComponent } from './questionnaire/questionnaire.component';
import { NavbarComponent } from './index/navbar/navbar.component';
import { FirstComponentComponent } from './index/first-component/first-component.component';
import { PresentationProjectComponent } from './index/presentation-project/presentation-project.component';
import { GalarieProjectComponent } from './index/galarie-project/galarie-project.component';
import { FooterComponent } from './index/footer/footer.component';
import { StepsModule } from 'primeng/steps';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { PreferencesComponent } from './preferences/preferences.component';
import { HttpClientModule, provideHttpClient, withFetch } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; // Nécessaire pour les animations
import { ToastModule } from 'primeng/toast'; // Importer le module Toast
import { ButtonModule } from 'primeng/button';
import { ToastComponent } from './toast/toast.component'; // Importer le module Button
import { MessageService } from 'primeng/api'; // Importer MessageService
import { DialogModule } from 'primeng/dialog';

@NgModule({
  declarations: [
    AppComponent,
    IndexComponent,
    LoginComponent,
    RegisterComponent,
    InteriorDesignComponent,
    QuestionnaireComponent,
    NavbarComponent,
    FirstComponentComponent,
    PresentationProjectComponent,
    GalarieProjectComponent,
    FooterComponent,
    ToastComponent,
    // PreferencesComponent
   
  ],
  imports: [
    DialogModule,
    BrowserModule,
    AppRoutingModule,
    StepsModule,
    ReactiveFormsModule,
    FormsModule,
    PreferencesComponent,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastModule, 
    ButtonModule, 
    
  ],
  providers: [
    provideClientHydration(),
    provideHttpClient(withFetch()),
    MessageService
    
  ],
  bootstrap: [AppComponent],
  // schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
  
})
export class AppModule { }
