import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, Router } from '@angular/router';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class IntroGuard implements CanActivate {
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
    const isIntroShowed = await this.storage.get('isIntroShowed');
    if(isIntroShowed) {
      return true;
    } else {
      this.router.navigateByUrl('/intro');
    }
  }
}
