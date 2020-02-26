import { Injectable, Input } from '@angular/core';
import { ActivityRequest } from '../model/activity-request.model';
import { GooglePlace } from '../model/google-place.model';
import { GoogleApisPlacesService } from './googleapis-places.service';
import { Results } from '../model/results.model';
import { UserService } from './user.service';
import { JoinResult } from '../model/join-result.model';
import { CreateResult } from '../model/create-result.model';
import {ActivityModel} from '../model/activity.model';

@Injectable({
  providedIn: 'root'
})
export class SearchResultsService {

  constructor(
    private googleApisPlacesService: GoogleApisPlacesService,
    private userService: UserService
  ) {}

  /**
   * Données de recherche d'activités
   * activityRequest.sport : string
   * activityRequest.lieu : string
   * activityRequest.datetime : Date
   */
  private activityRequest: ActivityRequest;
  private centerGeocode: string;
  private placesCorresponding: GooglePlace[] = [];
  private placesWithActivity: JoinResult[] = [];
  private placesWithoutActivity: CreateResult[] = [];
  private results: Results = new Results();

  /**
   * A partir d'une requête récupérée lors de la recherche, le service exécute des méthodes pour obtenir les résultats possible.
   * @param activityRequest la requête possédant le sport, le lieu et la date souhaitée par l'utilisateur.
   */
  public async launch(activityRequest: ActivityRequest): Promise<Results> {
    this.activityRequest = activityRequest;
    await this.findCenterGeocode();
    await this.findPlacesCorresponding();
    await this.differentiatePlacesByActivities();
    this.buildResults();
    return this.results;
  }

  /**
   * Cette méthode appelle celle du service GoogleApis-Places.
   * Nous obtenons un géocode que nous stockons dans une variable.
   */
  private async findCenterGeocode(): Promise<void> {
    this.centerGeocode = await this.googleApisPlacesService.getGeocodeBySportAndLieu(this.activityRequest.sport, this.activityRequest.lieu);
  }

  /**
   * Cette méthode appelle celle du service GoogleApis-Places.
   * Elle stocke dans la variable la liste des endroits possibles.
   */
  private async findPlacesCorresponding(): Promise<void> {
    this.placesCorresponding = await this.googleApisPlacesService.getPlacesByCenterAndSport(this.centerGeocode, this.activityRequest.sport);
  }

  /**
   * Cette méthode permet de lister les endroits où il existe des activités et les endroits où il n'y en a pas.
   */
  private async differentiatePlacesByActivities(): Promise<void> {
    // Nous récupérons toutes les activités pour une date données dans la base de données.
    await this.userService.getActivitiesByDate(this.activityRequest.datetime).toPromise().then(
      tabFirebase => {
        // Nous regardons dans la liste des endroits Google si des lieux ont déjà une activité grâce à leurs identifiants.
        const tabPlacesWithoutSports = this.placesCorresponding.map(place => place.id)
          .filter(id => tabFirebase.map(place => place.placeId).indexOf(id) === -1);
        this.placesCorresponding.forEach(
          placeGoogle => {
            if (tabPlacesWithoutSports.indexOf(placeGoogle.id) !== -1) {
              // Si dans la liste des endroits sans sport, l'endroit Google apparait, alors nous ajoutons l'endroit à la liste de création.
              const create = new CreateResult();
              create.name = placeGoogle.name;
              create.sport = this.activityRequest.sport;
              create.placeId = placeGoogle.id;
              create.geocode = placeGoogle.geocode;
              create.date = this.activityRequest.datetime;
              this.placesWithoutActivity.push(create);
            } else {
              // Sinon nous l'ajoutons à la liste des lieux ayant des activités déjà existantes.
              const join = new JoinResult();
              join.sport = this.activityRequest.sport;
              join.name = placeGoogle.name;
              join.date =  tabFirebase.filter(activity => activity.placeId === placeGoogle.id)[0].datetime;
              join.geocode = placeGoogle.geocode;
              join.id = placeGoogle.id;
              this.placesWithActivity.push(join);
            }
          }
        );
      });
  }

  /**
   * Cette méthode permet de rassembler les différents résultats dans un même modèle.
   */
  private buildResults(): void {
    this.results = new Results();
    this.results.join = this.placesWithActivity;
    this.results.create = this.placesWithoutActivity;
  }

}
