import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndexComponent } from './index/index.component';
import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { InteriorDesignComponent } from './interior-design/interior-design.component';
import { QuestionnaireComponent } from './questionnaire/questionnaire.component';


const routes: Routes = [
  { path: '', component: IndexComponent },
  { path: 'login', component : LoginComponent},
  { path: 'sign-up', component : SignUpComponent},
  { path: 'interior-design', component : InteriorDesignComponent},
  { path: 'questionnaire', component : QuestionnaireComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
