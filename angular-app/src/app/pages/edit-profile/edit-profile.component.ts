import { Component, OnInit } from '@angular/core';
import {faArrowLeft, faUserCircle} from '@fortawesome/free-solid-svg-icons';
import {isNullOrUndefined} from 'util';
import {Router} from '@angular/router';
import {UserService} from '../../core/service/user.service';
import {AuthentificationService} from '../../core/service/authentification.service';
import {FormBuilder, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent implements OnInit {
  userName: string;
  userMail: string;

  editProfileForm: FormGroup;

  faArrowLeft = faArrowLeft;
  faUserCircle = faUserCircle;

  constructor(private router: Router,
              private userService: UserService,
              private auth: AuthentificationService,
              private fb: FormBuilder) { }

  ngOnInit() {
    // Récupère les informations actuelles de l'utilisateur connecté (nom et mail) pour les afficher dans la vue.
    this.userService.getConnectedUser()
      .subscribe(user => {
        if (!isNullOrUndefined(user)) {
          this.userName = user.name;
          this.userMail = user.mail;
        }
      });
    // Nous initialisons le formGroup pour récupérer les champs de nouveau nom,
    // de nouveau mail, de nouveau mot-de-passe et de confirmation du nouveau mot-de-passe.
    this.editProfileForm = this.fb.group({
      newName: [''],
      newMail: [''],
      newPwd: [''],
      confNewPwd: ['']
    });
  }

  /**
   * Méthode permettant la redirection vers la page profil.
   * @param pages le chemin de la page pour la redirection.
   */
  btnClickPages(pages) {
    this.router.navigateByUrl(pages);
  }

  /**
   * Cette méthode permet de valider le formulaire de modification du profil.
   * Elle vérifie les valeurs rentrées et change les champs nécessaires.
   * A la fin, la méthode redirige l'utilisateur vers sa page profil.
   */
  btnClickSubmit() {
    if (this.editProfileForm.value.newPwd !== '') {
      if (this.editProfileForm.value.newPwd === this.editProfileForm.value.confNewPwd) {
        this.auth.updateUserPassword(this.editProfileForm.value.newPwd);
      } else {
        console.log('Need to confirm password');
      }
    }
    if (this.editProfileForm.value.newName === '') {this.editProfileForm.patchValue({newName: this.userName}); }
    if (this.editProfileForm.value.newMail === '') {this.editProfileForm.patchValue({newMail: this.userMail}); }
    this.userService.updateUserInfo(this.editProfileForm.value.newName, this.editProfileForm.value.newMail);
    this.auth.updateUserMail(this.editProfileForm.value.newMail).then(res => this.router.navigateByUrl('/pages/profile'));
  }

}
