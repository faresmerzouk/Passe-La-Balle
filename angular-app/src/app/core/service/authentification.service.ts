import { Injectable } from '@angular/core';

import { AngularFireAuth} from 'angularfire2/auth';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { isNullOrUndefined } from 'util';
import { UserModel } from '../model/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthentificationService {

  private eventAuthError = new BehaviorSubject<string>('');
  eventAuthErrors = this.eventAuthError.asObservable();
  private users: Observable<UserModel[]>;
  usersRef: AngularFirestoreCollection<UserModel>;

  constructor(
    private afAuth: AngularFireAuth,
    private db: AngularFirestore,
    private router: Router
  ) {
    this.usersRef = this.db.collection<UserModel>('users');
    this.users = this.usersRef.valueChanges();
    this.afAuth.authState.subscribe(user => {
      if (user) {
        // Si un utilisateur est connecté, alors nous stockons sa valeur dans le local storage.
        localStorage.setItem('user', JSON.stringify(user));
        JSON.parse(localStorage.getItem('user'));
      } else {
        localStorage.setItem('user', null);
        JSON.parse(localStorage.getItem('user'));
      }
    });
  }

  /**
   * Permet à un utilisateur de s'identifier s'il possède déjà un compte.
   * @param email l'email rentré par l'utilisateur.
   * @param password le mot-de-passe rentré par l'utilisateur.
   */
  login(email: string, password: string) {
    this.afAuth.auth.signInWithEmailAndPassword(email, password)
      .catch(error => {
        this.eventAuthError.next(error);
      })
      .then(userCredential => {
        if (userCredential) {
          this.router.navigate(['/pages/home']);
        }
      });
  }

  /**
   * Méthode qui permet d'ajouter un utilisateur en base de données.
   * @param user l'utilisateur à ajouter.
   */
  createUser(user) {
    this.afAuth.auth.createUserWithEmailAndPassword(user.email, user.password)
      .then(userCredential => {
        const IdcurrentUser = userCredential.user.uid;
        const item = {
          id: IdcurrentUser,
          name: user.firstName + ' ' + user.lastName,
          mail: user.email,
          activities: [],
        };
        this.usersRef.doc(IdcurrentUser).set(item);
        this.insertUserData(userCredential)
          .then(() => {
           this.router.navigate(['/pages/home']);
          });
      })
      .then(() => {
        this.router.navigate(['/pages/home']);
       })
      .catch( error => {
        this.eventAuthError.next(error);
      });
  }

  /**
   * Méthode appelée lors de la création d'un utilisateur.
   * Elle fait la liaison avec Firebase.
   * @param userCredential l'userCredential de Firebase
   */
  insertUserData(userCredential: firebase.auth.UserCredential) {
    return this.db.doc(`Users/${userCredential.user.uid}`).set({
      email: userCredential.user.email,
    });
  }

  /**
   * Permet de savoir si un utilisateur est connecté.
   */
  isAuthenticated(): boolean {
    const user = JSON.parse(localStorage.getItem('user'));
    return !isNullOrUndefined(user);
  }

  /**
   * Méthode qui permet à l'utilisateur de se déconnecter.
   */
  logout(): void {
    this.afAuth.auth.signOut();
    localStorage.removeItem('user');
    this.router.navigate(['admin/login']);
  }

  /**
   * Méthode qui permet la modification du mot-de-passe de l'utilisateur.
   * @param newPassword le nouveau mot-de-passe à mettre en base de données.
   */
  updateUserPassword(newPassword: string): void {
    const user = this.afAuth.auth.currentUser;
    user.updatePassword(newPassword);
  }

  /**
   * Méthode qui permet la modification du mail de l'utilisateur.
   * @param newMail le nouveau mail à mettre en base de données.
   */
  updateUserMail(newMail: string): Promise<void> {
    const user = this.afAuth.auth.currentUser;
    return user.updateEmail(newMail);
  }
}
