import { Injectable } from '@angular/core';
import { CanLoad, UrlSegment, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthentificationService } from '../service/authentification.service';
import { Route } from '@angular/compiler/src/core';

@Injectable({
  providedIn: 'root'
})
export class IsAuthenticatedGuard implements CanLoad {
  constructor(private userService: AuthentificationService, private router: Router) {}

  canLoad(
    route: Route,
    segments: UrlSegment[]
  ): Observable<boolean> | Promise<boolean> | boolean {
    if (!this.userService.isAuthenticated()) {
      this.router.navigateByUrl('/');
      return false;
    }
    return true;
  }

}
