import {Component, OnInit} from '@angular/core';
import {Validators, FormGroup, FormBuilder} from '@angular/forms';
import {Router} from '@angular/router';
import {AuthentificationService} from 'src/app/core/service/authentification.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

  authError: any;

  constructor(private router: Router,
    private auth: AuthentificationService) { }

  ngOnInit() {
    this.auth.eventAuthErrors.subscribe(data => {
      this.authError = data;
    });
  }

  createUser(frm) {
    const form = frm.value;
    form.activities = {};
    this.auth.createUser(form);
  }

  btnClick(page) {
    this.router.navigateByUrl(page);
  }

}
