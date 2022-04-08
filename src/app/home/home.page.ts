import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';

import { SongsModalPage } from '../songs-modal/songs-modal.page';

import { PlatziMusicService } from '../services/platzi-music.service';

interface Song {
  name?: string;
}

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  artists: any[] = [];
  songs: any[] = [];
  albums: any[] = [];
  song: Song = {
    name: ''
  };

  slideOps = {
    initialSlide: 2,
    slidesPerView: 4,
    centeredSlides: true,
    speed: 400
  };
  constructor(
    private musicService: PlatziMusicService,
    private modalController: ModalController
  ) {}

  ionViewDidEnter() {
    this.fetchNewReleases();
    this.fetchArtist();
  }

  fetchNewReleases() {
    this.musicService.getNewreleases()
    .subscribe(release => {
      const url = release.albums.items;
      this.songs = url.filter(e => e.album_type ==='single');
      this.albums = url.filter(e => e.album_type ==='album');
    });
  }

  fetchArtist() {
    this.artists = this.musicService.getArtists().items;
  }

  showSongs(artist) {
    this.musicService.getArtistTopTracks(artist.id)
    .subscribe(songs => {
      this.modalSong(songs, artist);
    }, error => {
      console.error(error);
    });
  }

  async modalSong(songs, artist) {
    const modal = await this.modalController.create({
      component: SongsModalPage,
      componentProps: {
        songs: songs.tracks,
        artist: artist.name
      }
    });

    modal.onDidDismiss().then(dataReturned => {
      this.song = dataReturned.data;
    });
    return modal.present();
  }
}
