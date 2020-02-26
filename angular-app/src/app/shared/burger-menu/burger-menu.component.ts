import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {AuthentificationService} from '../../core/service/authentification.service';

@Component({
  selector: 'app-burger-menu',
  templateUrl: './burger-menu.component.html',
  styleUrls: ['./burger-menu.component.scss']
})
export class BurgerMenuComponent implements OnInit {

  constructor(private router: Router,
              private auth: AuthentificationService) { }

  ngOnInit() {
  }

  btnClick(page) {
    this.router.navigateByUrl(page);
  }

  btnClickLogout() {
    this.auth.logout();
  }
}
