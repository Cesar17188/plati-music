import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';

import { SongsModalPage } from '../songs-modal/songs-modal.page';

import { PlatziMusicService } from '../services/platzi-music.service';

interface Song {
  name?: string;
  playing: boolean;
  // eslint-disable-next-line @typescript-eslint/naming-convention
  preview_url?: string;
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
    name: '',
    playing:false,
    // eslint-disable-next-line @typescript-eslint/naming-convention
    preview_url: ''
  };
  currentSong: HTMLAudioElement;
  newTime: any;

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

  showAlbums(album) {
    this.musicService.getAlbumTracks(album.id)
    .subscribe(songs => {
      this.modalAlbum(songs, album);
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

  async modalAlbum(songs, album) {
    const modal = await this.modalController.create({
      component: SongsModalPage,
      componentProps: {
        songs: songs.items,
        artist: album.name
      }
    });

    modal.onDidDismiss().then(dataReturned => {
      this.song = dataReturned.data;
    });
    return modal.present();
  }

  play(){
    this.currentSong = new Audio(this.song.preview_url);
    this.currentSong.play();
    this.currentSong.addEventListener('timeupdate', () => {
      this.newTime = (this.currentSong.currentTime * (this.currentSong.duration / 10)) / 100;
    });
    this.song.playing=true;
  }
  pause(){
    this.currentSong.pause();
    this.song.playing=false;
  }

  parseTime(time='0.00') {
    if (time) {
      const partTime = parseInt(time.toString().split('.')[0], 10);
      let minutes = Math.floor(partTime/60).toString();
      if(minutes.length === 1) {
        minutes = '0'+minutes;
      }
      let seconds = (partTime%60).toString();
      if(seconds.length === 1) {
        seconds = '0'+seconds;
      }
      return minutes + ':' + seconds;
    }
  }
}
