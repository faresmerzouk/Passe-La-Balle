import { Component, OnInit } from '@angular/core';
import {ActivityModel} from '../../core/model/activity.model';
import {UserService} from '../../core/service/user.service';
import {isNullOrUndefined} from 'util';
import {faPlus} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  activities: ActivityModel[];

  faPlus = faPlus;

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.userService.getConnectedUser()
    .subscribe(user => {
      if (!isNullOrUndefined(user)) {
        // Après avoir récupéré l'utilisateur connecté, nous recherchons ses activités.
        // Nous les trions par ordre croissant et nous les affichons sur la page d'accueil.
        this.activities = user.activities.sort((a, b) => {
          return a.datetime['seconds'] - b.datetime['seconds'];
        });
      }
    });
  }

}
