import {Injectable} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {Observable} from 'rxjs';
import {UserModel} from '../model/user.model';
import {AngularFireAuth} from '@angular/fire/auth';
import {ActivityModel} from '../model/activity.model';
import {isNullOrUndefined} from 'util';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  ListofAllActivity: ActivityModel[] = [];
  ActivityById: ActivityModel;

  constructor(private afs: AngularFirestore,
              private afAuth: AngularFireAuth) {
  }

  /**
   * Cette méthode retourne l'utilisateur connecté.
   * Elle est asynchrone et permet, une fois terminée, de récupérer toutes les informations de l'utilisateur.
   */
  getConnectedUser(): Observable<UserModel> {
    return new Observable<UserModel>(observer => {
      this.afAuth.authState.subscribe(user => {
        if (!user) {
          observer.complete();
        } else {
          this.afs.collection<UserModel>('users',
            ref => ref.where('id', '==', user.uid)
          ).valueChanges().subscribe(users => {
            observer.next(users[0]);
            observer.complete();
          });
        }
      });
    });
  }

  /**
   * Cette méthode retourne toutes les activités présentes en base de données.
   * Cette méthode est asynchrone, elle retourne une liste d'activités
   */
  getAllActivities(): Observable<ActivityModel[]> {
    return new Observable<ActivityModel[]>(observer => {
      this.afs.collection<UserModel>('users').valueChanges().subscribe(users => {
        users.forEach(user => {
          user.activities.forEach(activity => {
            if (!isNullOrUndefined(activity)) {
              if (this.ListofAllActivity.indexOf(activity) === -1) {
                this.ListofAllActivity.push(activity);
              }
            }
          });
        });
        observer.next(this.ListofAllActivity);
        observer.complete();
      });

    });
  }

  /**
   * Cette méthode permet de récupérer un activité grâce à son identifiant.
   * Cette méthode est asynchrone.
   * Lorsqu'elle retourne un résultat, celui-ci contient toutes les informations relatives à l'activité recherchée.
   * @param id l'identifiant de l'activité recherchée.
   */
  getActivityById(id: string): Observable<ActivityModel> {
    return new Observable<ActivityModel>(observer => {
      this.afs.collection<UserModel>('users').valueChanges().subscribe(users => {
        users.forEach(user => {
          user.activities.forEach(activity => {
            if (!isNullOrUndefined(activity)) {
              if (activity.placeId === id) {
                this.ActivityById = activity;
              }
            }
          });
        });
        observer.next(this.ActivityById);
        observer.complete();
      });
    });
  }

  /**
   * Cette méthode permet de retourner tous les utilisateurs participants à une activité donnée.
   * Cette méthode est asynchrone et elle retourne une liste d'utilisateurs.
   * @param activityAsked l'activité où nous cherchons les utilisateurs inscrits.
   */
  getUsersInAnActivity(activityAsked: ActivityModel): Observable<UserModel[]> {
    const ListOfParticipants: UserModel[] = [];
    return new Observable<UserModel[]>(observer => {
      this.afs.collection<UserModel>('users').valueChanges().subscribe(users => {
        users.forEach(user => {
          user.activities.forEach(activity => {
            if (!isNullOrUndefined(activity)) {
              if (activity.placeId === activityAsked.placeId) {
                ListOfParticipants.push(user);
              }
            }
          });
        });
        observer.next(ListOfParticipants);
        observer.complete();
      });
    });
  }

  /**
   * Cette méthode permet de récupérer toutes les activités ayant lieu à un moment donnée.
   * Elle est asynchrone et retourne une liste d'activités ou une liste vide.
   * @param date la date où nous souhaitons trouver des activités.
   */
  getActivitiesByDate(date: Date): Observable<ActivityModel[]> {
    return new Observable<ActivityModel[]>(observer => {
      this.afs.collection<UserModel>('users').valueChanges().subscribe(users => {
          users.forEach(user => {
            user.activities.forEach(activity => {
              if (!isNullOrUndefined(activity)) {
                if (this.ListofAllActivity.indexOf(activity) === -1) {
                  this.ListofAllActivity.push(activity);
                }
              }
            });
          });
          const result = this.ListofAllActivity.filter(activity => {
            return ((activity.datetime['seconds'] * 1000) <= date.getTime()) &&
              (date.getTime() < ((activity.datetime['seconds']  + (activity.duree * 60)) * 1000));
          });
          observer.next(result);
          observer.complete();
        });
      });

  }

  /**
   * Cette méthode permet d'ajouter une activité donnée à l'utilisateur connecté.
   * Cette méthode est asynchrone.
   * @param activity l'activité à ajouter à l'utilisateur.
   */
  addActivityConnectedUser(activity: ActivityModel): Observable<any> {
    return new Observable<any>( observer => this.afAuth.authState.subscribe(user => {
      this.afs.collection<UserModel>('users').doc(user.uid)
        .get().subscribe(userF => {
        const userLocal = userF.data();
        userLocal.activities.push(Object.assign({}, activity));
        observer.next(this.afs.collection(`users`).doc(user.uid).update(userLocal).then());
        observer.complete();
      });
    }));
  }

  /**
   * Cette méthode permet de modifier certaines informations de l'utilisateur.
   * @param name le nouveau nom de l'utilisateur.
   * @param mail le nouveau mail de l'utilisateur.
   */
  updateUserInfo(name: string, mail: string): void {
    this.afAuth.authState.subscribe(user => {
      this.afs.collection<UserModel>('users').doc(user.uid)
        .get().subscribe(userF => {
        const userLocal = userF.data();
        userLocal.name = name;
        userLocal.mail = mail;
        this.afs.collection(`users`).doc(user.uid).update(userLocal).then();
      });
    });
  }

}
