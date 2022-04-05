import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';

import { AuthenticateService } from '../services/authenticate.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  registerForm: FormGroup;
  validationsMessages = {
    apellido: [
      {type: 'required', message: 'El apellido es requerido'},
      {type: 'minlength', message: 'El apellido es muy corto'},
    ],
    nombre: [
      {type: 'required', message: 'El nombre es requerido'},
      {type: 'minlength', message: 'Este nombre es muy corto'},
    ],
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
    this.registerForm = this.formBuilder.group({
      nombre: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(3)
      ])),
      apellido: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(3)
      ])),
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

  ngOnInit(): void {
    this.storage.create();
  }

  register(userData) {
    this.authService.registerUser(userData).then(() => {
      this.goToLogin();
    });
  }

  goToLogin() {
    this.navCtrl.navigateBack('/login');
  }
}
