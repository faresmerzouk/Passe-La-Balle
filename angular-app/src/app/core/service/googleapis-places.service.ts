import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {GooglePlace} from '../model/google-place.model';

@Injectable({
  providedIn: 'root',
})
export class GoogleApisPlacesService {

  constructor(private http: HttpClient) {
  }

  private apiKey = 'AIzaSyAAHrCiuFw3dv3piR8ATE_o57wlx3eVMSc';

  static getGeocode(lat: number, lng: number): string {
    return lat + ',' + lng;
  }

  /**
   * Cette méthode fait appel à l'API Google Places.
   * Elle lance une requête avec le sport le lieu souhaité.
   * En résultat, nous obtenons un géocode.
   * @param sport le sport recherché
   * @param lieu le lieu recherché
   */
  public getGeocodeBySportAndLieu(sport: string, lieu: string): Promise<string> {
    let httpParams = new HttpParams();
    httpParams = httpParams.append('key', this.apiKey);
    httpParams = httpParams.append('input', encodeURI(`${sport} ${lieu}`));
    httpParams = httpParams.append('inputtype', 'textquery');
    httpParams = httpParams.append('language', 'fr');
    httpParams = httpParams.append('fields', 'geometry/location');
    return new Promise<string>(
      resolve => {
        this.http.get<any>('/googleapis/geocode', {params: httpParams}).subscribe(requestResult => {
          const geocode: string = GoogleApisPlacesService.getGeocode(
            requestResult.candidates[0].geometry.location.lat,
            requestResult.candidates[0].geometry.location.lng);
          resolve(geocode);
        });
      });
  }

  /**
   * Cette méthode demande à l'API Google Places les endroits répondant à la recherche "sport",
   * dans un rayon de cinq kilomètres à partir du géocode transmis.
   * Elle retourne une liste d'endroit Google où chacun possède un géocode, un nom et un identifiant d'endroit.
   * @param geocode le géocode de l'endroit voulu.
   * @param sport le sport recherché.
   */
  public getPlacesByCenterAndSport(geocode: string, sport: string): Promise<GooglePlace[]> {
    let httpParams = new HttpParams();
    httpParams = httpParams.append('key', this.apiKey);
    httpParams = httpParams.append('input', encodeURI(sport));
    httpParams = httpParams.append('radius', '5&');
    httpParams = httpParams.append('language', 'fr');
    httpParams = httpParams.append('location', geocode);
    return new Promise<GooglePlace[]>(
      resolve => {
        this.http.get<any>('/googleapis/places', {params: httpParams}).subscribe(requestResult => {
          const googlePlaces = requestResult.results.map(result => {
            return {
              id: result.place_id,
              name: result.name,
              geocode: GoogleApisPlacesService.getGeocode(result.geometry.location.lat, result.geometry.location.lng)
            };
          });
          resolve(googlePlaces);
        });
      });
  }
}
