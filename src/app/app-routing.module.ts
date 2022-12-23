import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { ProgramdetailsComponent } from './pages/programdetails/programdetails.component';
import { ProgramsComponent } from './pages/programs/programs.component';

const routes: Routes = [
  { path: 'programs', component: ProgramsComponent },
  { path: 'programdetails/:id', component: ProgramdetailsComponent },
  { path: 'login', component: LoginComponent },
  { path: '', component: ProgramsComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
