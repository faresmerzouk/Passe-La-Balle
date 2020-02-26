import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';

import { AgmCoreModule } from '@agm/core';
import { AngularFirestoreModule} from '@angular/fire/firestore';
import { environment} from '../environments/environment';
import { ConnexionComponent } from './public/connexion/connexion.component';
import { RegistrationComponent } from './public/registration/registration.component';
import { SharedModule } from './shared/shared.module';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { SplashScreenComponent } from './public/splash-screen/splash-screen.component';


@NgModule({
  declarations: [
    AppComponent,
    ConnexionComponent,
    RegistrationComponent,
    SplashScreenComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAAHrCiuFw3dv3piR8ATE_o57wlx3eVMSc'
    }),
    AngularFireAuthModule,
    AngularFirestoreModule,
    SharedModule,
    NoopAnimationsModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
