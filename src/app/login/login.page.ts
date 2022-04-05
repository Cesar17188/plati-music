import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';

import { AuthenticateService } from '../services/authenticate.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  loginForm: FormGroup;
  validationsMessages = {
    email: [
      {type: 'required', message: 'El email es requerido'},
      {type: 'pattern', message: 'Este no es un email valido'},
    ],
    password: [
      {type: 'required', message: 'El password es requerido'},
      {type: 'minlength', message: 'Este password es muy corto'},
    ],
  };

  errorMessage = '';

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthenticateService,
    private navCtrl: NavController,
    private storage: Storage
  ) {
    this.loginForm = this.formBuilder.group({
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])),
      password: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(5)
      ]))
    });
  }

  async ngOnInit() {
    await this.storage.create();
  }

  loginUser(credentials) {
    this.authService.loginUser(credentials).then(ress => {
      this.errorMessage='';
      this.storage.set('isUserLoggedIn', true);
      this.navCtrl.navigateForward('/menu/home');
    }).catch(err => {
      this.errorMessage = err;
    });
  }

  goToRegister() {
    this.navCtrl.navigateForward('/register');
  }

}
