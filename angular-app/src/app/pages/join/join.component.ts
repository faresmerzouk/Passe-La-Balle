import { Component, OnInit } from '@angular/core';
import {faArrowLeft, faMapMarkerAlt, faRunning, faEdit, faClock, faCalendar, faUserCircle} from '@fortawesome/free-solid-svg-icons';
import {UserModel} from '../../core/model/user.model';
import {ActivityModel} from '../../core/model/activity.model';
import {ActivatedRoute, Router} from '@angular/router';
import {UserService} from '../../core/service/user.service';
import {Location} from '@angular/common';

@Component({
  selector: 'app-join',
  templateUrl: './join.component.html',
  styleUrls: ['./join.component.scss']
})
export class JoinComponent implements OnInit {

  faRunning = faRunning;
  faEdit = faEdit;
  faClock = faClock;
  faCalendar = faCalendar;
  faMap = faMapMarkerAlt;
  faArrow = faArrowLeft;
  faUser = faUserCircle;

  activity: ActivityModel = new ActivityModel();
  PARTICIPANTS: UserModel[] = [];

  constructor(private route: ActivatedRoute,
              private userService: UserService,
              private location: Location,
              private router: Router) { }

  ngOnInit() {
    this.route.queryParamMap.subscribe(params => {
      this.userService.getActivityById(params.get('id')).subscribe(activity => {
        // Nous récupérons l'activité sélectionnée dans la page recherche.
        this.activity = activity;
        this.userService.getUsersInAnActivity(this.activity).subscribe(users => {
          // Nous cherchons les utilisateurs qui participent déjà à cette activité pour pouvoir les afficher.
          users.forEach(user => {
            this.PARTICIPANTS.push(user);
          });
        });
      });
    });
  }

  /**
   * Cette méthode permet de retourner à la page précédente.
   */
  goToLastPage() {
    this.location.back();
  }

  /**
   * Cette méthode est l'action réalisée lorsque l'utilisateur appuie sur le bouton.
   * Elle permet d'ajouter l'activité à la liste de l'utilisateur connecté.
   * A la fin, il est redirigé vers la page d'accueil.
   */
  joinActivity() {
    this.userService.addActivityConnectedUser(this.activity).subscribe(res => {
      this.router.navigateByUrl('pages/home');
    });
  }
}
