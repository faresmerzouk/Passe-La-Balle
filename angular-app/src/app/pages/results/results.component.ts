import { Component, OnInit } from '@angular/core';
import {ActivityRequest} from '../../core/model/activity-request.model';
import {ActivatedRoute, Router} from '@angular/router';
import {Results} from '../../core/model/results.model';
import {CreateResult} from '../../core/model/create-result.model';
import {JoinResult} from '../../core/model/join-result.model';
import {faArrowLeft, faPlus} from '@fortawesome/free-solid-svg-icons';
import {SearchResultsService} from '../../core/service/search-results.service';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss']
})
export class ResultsComponent implements OnInit {
  results: Results;
  create: CreateResult[];
  join: JoinResult[];

  sport: string;
  date: Date;

  faArrow = faArrowLeft;

  backgroundColor: string;
  zoom: number;
  animation: string;
  latitudeCenter: number;
  longitudeCenter: number;

  constructor(private route: ActivatedRoute, private router: Router, private searchService: SearchResultsService) {
    this.backgroundColor = '#97bda8';
    this.zoom = 12;
    this.animation = 'DROP';
  }

  ngOnInit() {
    this.route.queryParamMap.subscribe(params => {
      const request = new ActivityRequest();
      request.lieu = params.get('lieu');
      request.datetime = new Date(params.get('date'));
      request.sport = params.get('sport');
      // Nous récupérons les paramètres passés dans la page précédente et nous créons une ActivityRequest.
      this.sport = request.sport;
      this.date = request.datetime;
      // Nous transmettons au service de recherche l'ActivityRequest.
      this.searchService.launch(request).then(searchResult => {
        this.join = searchResult.join;
        console.log(this.join);
        this.create = searchResult.create;
        // Nous récupérons les résultats et les séparons en deux listes afin de les afficher.
        // Nous créons des marqueurs pour chacun d'entre eux et nous affichons une liste pour les activités à rejoindre.
        this.join.forEach(j => {
          j.geocodeLat = j.geocode.substring(0, 9);
          j.geocodeLng = j.geocode.substring(11, 18);
        });
        this.create.forEach(j => {
          j.geocodeLat = j.geocode.substring(0, 9);
          j.geocodeLng = j.geocode.substring(11, 18);
        });
      });

      this.latitudeCenter = 48.118004;
      this.longitudeCenter = -1.640878;
    });
  }

  /**
   * Cette méthode permet de revenir à la page précédente.
   */
  goToLastPage() {
    this.router.navigateByUrl('pages/search');
  }

  /**
   * Cette méthode permet de rediriger l'utilisateur vers la page rejoindre.
   * @param path le chemin de la page rejoindre.
   * @param id l'identifiant de l'activité à rejoindre.
   */
  navigateTo(path: string, id: string) {
    this.router.navigate([path], {queryParams: {id}});
  }

  /**
   * Cette méthode permet de rediriger l'utilisateur vers la page de création.
   * @param lieu le lieu du marker sélectionné sur la carte.
   * @param placeId l'identifiant du lieu sélectionné sur la carte.
   */
  addActivity(lieu: string, placeId: string) {
    this.router.navigate(['pages/create'], {queryParams: {lieu, sport: this.sport, date: this.date, placeId}});
  }
}
