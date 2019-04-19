import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SimilarArtistsProvider } from '../../providers/similar-artists/similar-artists';

import { ModalController } from 'ionic-angular';
import { AlbumModalPage } from '../album-modal/album-modal';

@IonicPage()
@Component({
  selector: 'page-artist-info',
  templateUrl: 'artist-info.html',
})
export class ArtistInfoPage {

  segment: any;
  artist: string;
  artistImg: any;
  artistInfo: any = [];

  bio: any;
  bioSummary: any = [];
  bioContent: any = [];

  similarArtists: any = [];

  topAlbums: any = [];
  topTracks: any = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, private similarArtistsProvider: SimilarArtistsProvider, public modalCtrl: ModalController) {
    this.artist = navParams.get('artist');
  }

  ionViewDidLoad() {
    this.segment = "thisArtist";

    this.loadTopAlbums();
    this.loadTopTracks();
    this.loadArtistInfo();

    this.similarArtistsProvider.getSimilar(this.artist).subscribe((data) => {
      this.similarArtists = data.similarartists.artist;
    });
  }

  loadArtistInfo() {
    this.similarArtistsProvider.getArtistInfo(this.artist).subscribe((data) => {
      this.artistInfo = data.artist;
      this.artistImg = data.artist.image[4]['#text'];
      this.bioContent = data.artist.bio.content;
      this.bioSummary = data.artist.bio.summary;
      this.bio = this.bioSummary;
    });
  }

  loadTopAlbums() {
    this.similarArtistsProvider.getTopAlbums(this.artist).subscribe((data) => {
      this.topAlbums = data.topalbums.album;
    });
  }

  loadTopTracks() {
    this.similarArtistsProvider.getTopTracks(this.artist).subscribe((data) => {
      this.topTracks = data.toptracks.track;
    });
  }

  showMoreLess() {
    this.bio = (this.bio == this.bioSummary) ? this.bioContent : this.bioSummary;
  }

  viewAlbum(album: string) {
    const modal = this.modalCtrl.create(AlbumModalPage, {
      artistName : this.artist,
      albumName : album
    });
    modal.present();
  }

  viewArtist(artistIndex: number) {
    let artistName: string = this.similarArtists[artistIndex].name;

    this.navCtrl.push(ArtistInfoPage, {
      artist : artistName
    });
  }
}
