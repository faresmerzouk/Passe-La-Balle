import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ConnexionComponent} from './public/connexion/connexion.component';
import { IsAuthenticatedGuard } from './core/guard/is-authenticated.guard';
import { RegistrationComponent } from './public/registration/registration.component';
import {IsUnauthenticatedGuard} from './core/guard/is- unauthenticated.guard';
import { SplashScreenComponent } from './public/splash-screen/splash-screen.component';


const routes: Routes = [
  {
    path: 'connexion',
    component: ConnexionComponent,
    canActivate: [IsUnauthenticatedGuard]
  },
  {
    path: 'registration',
    component: RegistrationComponent,
    canActivate: [IsUnauthenticatedGuard]
  },
  {
    path: 'splashscreen',
    component: SplashScreenComponent,
    canActivate: [IsUnauthenticatedGuard]
  },
  {
    path: 'pages',
    loadChildren: () => import('src/app/pages/pages.module').then(m => m.PagesModule),
    canLoad: [IsAuthenticatedGuard]
  },
  {
    path: '**',
    redirectTo: 'splashscreen'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
