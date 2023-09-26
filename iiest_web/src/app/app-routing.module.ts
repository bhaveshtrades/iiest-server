import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// import { LoginComponent } from './pages/login/login.component';
import { SignupComponent } from './pages/signup/signup.component';
import { HomeComponent } from './pages/home/home.component';
import { LandingpageComponent } from './pages/landingpage/landingpage.component'
import { authGuard } from './shared/auth.guard';
const routes: Routes = [
  { path: 'main', component: LandingpageComponent},
  { path: 'home', component: HomeComponent, canActivate:[authGuard]},
  // { path: 'login', component: LoginComponent },
  { path: 'staffentry', component: SignupComponent, canActivate:[authGuard]},
  { path: '', redirectTo: 'main', pathMatch: 'full' }, // Default route
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
