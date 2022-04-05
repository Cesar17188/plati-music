import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class AuthenticateService {

  userData;

  constructor(
    private storage: Storage
  ) { }

  async loginUser(credentials) {
    this.userData = await this.storage.get('user');
    return new Promise((accept, reject) => {
      credentials.password = btoa(credentials.password);
      console.log(credentials);
      console.log(this.userData);
      if(credentials.email === this.userData.email && credentials.password === this.userData.password) {
        accept('Login correcto');
      } else {
        reject('Login incorrecto');
      }
    });
  }

  registerUser(userData) {
    userData.password = btoa(userData.password);
    return this.storage.set('user', userData);
  }
}
