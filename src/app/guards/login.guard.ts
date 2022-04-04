import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Storage } from '@ionic/storage-angular';


@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {
  constructor(
    private storage: Storage,
    private router: Router,
  ) {
    // fundamental para poder ejecutar una solicitud de información al local storage
    this.storage.create();
  }
  async canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,): Promise<boolean> {
    const isUserLoggedIn = await this.storage.get('isUserLoggedIn');
    if(isUserLoggedIn) {
      return true;
    } else {
      this.router.navigateByUrl('/login');
    }
  }
}
