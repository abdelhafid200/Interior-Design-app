import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndexComponent } from './index/index.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { InteriorDesignComponent } from './interior-design/interior-design.component';
import { QuestionnaireComponent } from './questionnaire/questionnaire.component';
import { PreferencesComponent } from './preferences/preferences.component';
import { AuthGuard } from './services/AuthGuard ';


const routes: Routes = [
  { path: '', component: IndexComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'questionnaire', component: QuestionnaireComponent },
  { path: 'preferences', component: PreferencesComponent },
  {
    path: 'interior-design',
    component: InteriorDesignComponent,
    canActivate: [AuthGuard],
  },
  { path: '**', redirectTo: '', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
