import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase} from '@angular/fire/database';
import {Observable} from "rxjs";
import { AuthentificationService } from 'src/app/core/service/authentification.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-connexion',
  templateUrl: './connexion.component.html',
  styleUrls: ['./connexion.component.scss']
})
export class ConnexionComponent implements OnInit{
  authError: any;

  constructor(private router: Router,
              private auth: AuthentificationService) { }

  ngOnInit() {
    this.auth.eventAuthErrors.subscribe( data => {
      this.authError = data;
    });
  }

  login(frm) {
    this.auth.login(frm.value.email, frm.value.password);
  }

  btnClick(page) {
    this.router.navigateByUrl(page);
  }


}
