import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { IndexComponent } from './index/index.component';
import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { InteriorDesignComponent } from './interior-design/interior-design.component';
import { QuestionnaireComponent } from './questionnaire/questionnaire.component';
import { NavbarComponent } from './index/navbar/navbar.component';
import { FirstComponentComponent } from './index/first-component/first-component.component';
import { PresentationProjectComponent } from './index/presentation-project/presentation-project.component';
import { GalarieProjectComponent } from './index/galarie-project/galarie-project.component';
import { FooterComponent } from './index/footer/footer.component';

@NgModule({
  declarations: [
    AppComponent,
    IndexComponent,
    LoginComponent,
    SignUpComponent,
    InteriorDesignComponent,
    QuestionnaireComponent,
    NavbarComponent,
    FirstComponentComponent,
    PresentationProjectComponent,
    GalarieProjectComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [
    provideClientHydration()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
