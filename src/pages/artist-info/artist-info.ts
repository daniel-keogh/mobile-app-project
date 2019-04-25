import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, AlertController } from 'ionic-angular';
import { SimilarArtistsProvider } from '../../providers/similar-artists/similar-artists';
import { OpenExternallyProvider } from '../../providers/open-externally/open-externally';
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

  loadFailed: boolean;

  constructor(public navCtrl: NavController, public navParams: NavParams, private similarArtistsProvider: SimilarArtistsProvider, public modalCtrl: ModalController, public alertCtrl: AlertController, private openExternallyProvider: OpenExternallyProvider) {
    this.artist = navParams.get('artist');
  }

  ionViewDidLoad() {
    this.segment = "thisArtist";
    this.loadArtistInfo();
  }

  loadArtistInfo() {
    this.similarArtistsProvider.getArtistInfo(this.artist).subscribe((data) => {

      if (data.artist != undefined) {
        this.artistInfo = data.artist;
        this.artistImg = data.artist.image[4]['#text'];
  
        this.bioContent = this.cleanText(data.artist.bio.content);
        this.bioSummary = this.cleanText(data.artist.bio.summary);
        this.bio = this.bioSummary;

        this.loadTopAlbums();
        this.loadTopTracks();
        this.loadSimilarArtists();

        this.loadFailed = false;
      }
      else {
        this.loadFailed = true;
        this.failureToLoadAlert();
      }
    });
  }

  loadSimilarArtists() {
    this.similarArtistsProvider.getSimilar(this.artist).subscribe((data) => {
        this.similarArtists = data.similarartists.artist;
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

  failureToLoadAlert() {
    const alert = this.alertCtrl.create({
      title: "Error",
      subTitle: "Failed to find any information about this artist.",
      buttons: [
        {
          text: 'OK',
          handler: () => {this.navCtrl.pop();} // leave the current page
        }
      ]
    });
    alert.present();
  }

  // show more or less text each time the button is clicked
  showMoreLess() {
    this.bio = (this.bio == this.bioSummary) ? this.bioContent : this.bioSummary;
  }

  // Removes HTML tags from text.
  // Source: https://stackoverflow.com/a/5002161
  cleanText(text: string): string {
    return text.replace(/<\/?[^>]+(>|$)/g, "");
  }

  // Open a modal page to see more info about the album
  viewAlbum(album: string) {
    const modal = this.modalCtrl.create(AlbumModalPage, {
      artistName : this.artist,
      albumName : album
    });
    modal.present();
  }

  viewArtist(artistName: string) {
    this.navCtrl.push(ArtistInfoPage, {
      artist : artistName,
    });
  }

  presentActionSheet(artist: string, track: string) {
    this.openExternallyProvider.presentOpenExternallyActionSheet(artist, track);
  }
}
