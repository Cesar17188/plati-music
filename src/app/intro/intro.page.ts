import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-intro',
  templateUrl: './intro.page.html',
  styleUrls: ['./intro.page.scss'],
})
export class IntroPage {

  slideOps = {
    initialSlide: 0,
    slidesPerView: 1,
    centeredSlides: true,
    speed: 400,
  };

  slides = [
    {
      imageSrc: 'assets/img/logo.png',
      imageAlt: 'Platzi Music Logo',
      title: 'Escucha tu música',
      subtitle: 'EN CUALQUIER LUGAR',
      description:
        'Los mejores álbunes, las mejores canciones. Escucha y comparte en cualquier momento, a todas horas.',
      icon: 'play',
    },
    {
      imageSrc: 'assets/img/logo.png',
      imageAlt: 'Platzi Music Logo',
      title: 'Disfruta de nuestro reproductor',
      subtitle: 'DE VIDEOS INCREÍBLES',
      description:
        'Entra la modo video de nuestro reproductor y obtén acceso a clips. documentales y making offs increíbles de tu artista favorito',
      icon: 'videocam',
    },
    {
      imageSrc: 'assets/img/logo.png',
      imageAlt: 'Platzi Music Logo',
      title: 'Accede al exclusivo',
      subtitle: 'MODO DEPORTE',
      description:
        'Crea una playlist basada en tu actividad física. Ten reportes y acceso a lo que necesites, integrado con GPS!',
      icon: 'bicycle',
    },
    {
      imageSrc: 'assets/img/logo.png',
      imageAlt: 'Platzi Music Logo',
      title: 'Busca nuevas canciones',
      subtitle: 'EN LA RADIO DE TU AUTOR FAVORITO',
      description:
        'Mira las playlist que se generan con los ritnos y generos parecidos a los de autor favorito',
      icon: 'albums',
    },
  ];

  constructor(
    private router: Router,
    private storage: Storage,
    ) { }


  finish() {
    this.storage.create();
    this.storage.set('isIntroShowed', true);
    this.router.navigateByUrl('/login');
  }

}
