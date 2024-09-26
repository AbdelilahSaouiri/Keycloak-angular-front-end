import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { NewUserComponent } from './components/new-user/new-user.component';
import { AuthGuard } from './guards/auth-guard.guard';

const routes: Routes = [
  {path:"" ,component:HomeComponent},
  {path:"new" ,component:NewUserComponent , canActivate:[AuthGuard] ,data :{ roles:['ADMIN']} },
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
