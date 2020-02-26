import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators, FormControl} from '@angular/forms';
import {MAT_DATE_LOCALE} from '@angular/material';
import {hours, minutes} from '../../shared/pattern-regex';
import {Router} from '@angular/router';
import {faArrowLeft, faMapMarkerAlt, faRunning, faClock, faCalendar} from '@fortawesome/free-solid-svg-icons';
import {SearchResultsService} from '../../core/service/search-results.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  providers: [
    {
      provide: MAT_DATE_LOCALE,
      useValue: 'fr-FR'
    }
  ]
})
export class SearchComponent implements OnInit {
  searchForm: FormGroup;
  startDate = new Date();

  faRunning = faRunning;
  faClock = faClock;
  faCalendar = faCalendar;
  faMap = faMapMarkerAlt;
  faArrow = faArrowLeft;

  constructor(private router: Router, private fb: FormBuilder, private service: SearchResultsService) { }

  ngOnInit() {
    // Nous initialisons le formGroup pour le formulaire de recherche.
    // Nous rendons les champs obligatoires et nous veillons à ce que les formats des heures et des minutes soient corrects.
    this.searchForm = this.fb.group({
      sportName: ['', Validators.required],
      placeName: ['', Validators.required],
      eventDate: ['', Validators.required],
      eventTimeHours: ['', [Validators.required, Validators.pattern(hours)]],
      eventTimeMinutes: ['', [Validators.required, Validators.pattern(minutes)]]
    });
  }

  /**
   * Retourne les éventuelles erreurs rencontrées dans le formulaire.
   */
  get errors() {
    return this.searchForm.controls;
  }

  /**
   * Méthode appelée lorsque l'utilisateur appuie sur "Rechercher".
   * Si tous les champs sont bien remplis, les informations sont transmis à la page recherche via des paramètres.
   */
  onFormSubmit() {
    if (this.searchForm.invalid) {
      return;
    } else {
      const formValue = this.searchForm.value;
      const dateBefore = formValue.eventDate;
      const dateForResearch = new Date(dateBefore.getFullYear(), dateBefore.getMonth(),
        dateBefore.getDate(), formValue.eventTimeHours, formValue.eventTimeMinutes);
      this.router.navigate(['/pages/results'],
        {queryParams : {lieu: formValue.placeName, sport: formValue.sportName, date: dateForResearch}});
    }
  }

  /**
   * Cette méthode permet de retourner sur la page d'accueil.
   */
  goToLastPage() {
    this.router.navigateByUrl('/pages/home');
  }
}
