import { Component, OnInit } from '@angular/core';
import {faArrowLeft, faCalendar, faClock, faEdit, faMapMarkerAlt, faRunning} from '@fortawesome/free-solid-svg-icons';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivityModel} from '../../core/model/activity.model';
import {UserService} from '../../core/service/user.service';
import { Location } from '@angular/common';



import {time} from '../../shared/pattern-regex';
@Component({
  selector: 'app-create-activity',
  templateUrl: './create-activity.component.html',
  styleUrls: ['./create-activity.component.scss']
})
export class CreateActivityComponent implements OnInit {

  faRunning = faRunning;
  faEdit = faEdit;
  faClock = faClock;
  faCalendar = faCalendar;
  faMap = faMapMarkerAlt;
  faArrow = faArrowLeft;
  addForm: FormGroup;
  activity: ActivityModel;

  constructor(private router: Router,
              private fb: FormBuilder,
              private route: ActivatedRoute,
              private userService: UserService,
              private location: Location) { }

  ngOnInit() {
    this.activity = new ActivityModel();
    // Nous initialisons le formGroup pour récupérer les champs de durée et de commentaire.
    this.addForm = this.fb.group({
      during: ['', [Validators.required, Validators.pattern(time)]],
      comment: ['']
    });
    // Nous récupérons les informations passés en paramètres
    // dans la page précédente et nous les ajoutons à une nouvelle activité.
    this.route.queryParamMap.subscribe(params => {
      this.activity.sport = params.get('sport');
      this.activity.lieu = params.get('lieu');
      this.activity.placeId = params.get('placeId');
      this.activity.datetime = new Date(params.get('date'));
    });
  }

  /**
   * Cette méthode permet de revenir à la page précédente.
   */
  goToLastPage() {
    this.location.back();
  }

  /**
   * Retourne les éventuelles erreurs rencontrées dans le formulaire.
   */
  get errors() {
    return this.addForm.controls;
  }

  /**
   * Cette méthode est appelée lorsque l'utilisateur appuie sur le bouton "créer".
   * Elle permet d'ajouter à l'activité les champs remplis dans le formulaire.
   * Puis, elle ajoute l'activité à la liste de l'utilisateur avec la méthode addActivityConnectedUser.
   * A la fin, la méthode redirige l'utilisateur vers la page d'accueil.
   */
  onFormSubmit() {
    if (this.addForm.invalid) {
      return;
    } else {
      const formValue = this.addForm.value;
      this.activity.commentaire = formValue.comment;
      this.activity.duree = formValue.during;
      this.userService.addActivityConnectedUser(this.activity).subscribe( res =>
        this.router.navigateByUrl('pages/home')
      );
    }
  }
}
