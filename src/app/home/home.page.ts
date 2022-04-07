import { Component } from '@angular/core';

import { PlatziMusicService } from '../services/platzi-music.service';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  artists: any[] = [];
  songs: any[] = [];
  albums: any[] = [];

  slideOps = {
    initialSlide: 2,
    slidesPerView: 4,
    centeredSlides: true,
    speed: 400
  };
  constructor(
    private musicService: PlatziMusicService
  ) {}

  ionViewDidEnter() {
    this.fetchNewReleases();
  }

  fetchNewReleases() {
    this.musicService.getNewreleases()
    .subscribe(release => {
      this.artists = release.albums.items;
      this.songs = this.artists.filter(e => e.album_type ==='single');
      this.albums = this.artists.filter(e => e.album_type ==='album');
      console.log(this.artists);
    });
  }
}
