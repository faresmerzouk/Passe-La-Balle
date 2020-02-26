import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {UserService} from '../../core/service/user.service';
import {isNullOrUndefined} from 'util';
import {faHome, faCogs, faUserCircle} from '@fortawesome/free-solid-svg-icons';



@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  userName: string;
  userMail: string;

  faHome = faHome;
  faCogs = faCogs;
  faUserCircle = faUserCircle;
  constructor(private router: Router, private userService: UserService) { }

  ngOnInit() {
    // Nous récupérons l'utilisateur connecté pour pouvoir afficher ses informations.
    this.userService.getConnectedUser()
    .subscribe(user => {
      if (!isNullOrUndefined(user)) {
        this.userName = user.name;
        this.userMail = user.mail;
      }
    });
  }

  /**
   * Cette méthode permet de rediriger l'utilisateur en fonction du bouton où il a appuyé.
   * Il est possible pour lui de retourner sur la page d'accueil ou alors d'accéder à la page pour modifier son profil.
   * @param pages le chemin de la page à accéder.
   */
  btnClick(pages) {
    this.router.navigateByUrl(pages);
  }
}
